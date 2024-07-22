import { Server, Socket } from "socket.io";
import { RoomCache } from "./structures/room-cache";
import { Profile } from "./types";
import { getRandomSentence } from "./utils/randomSentences";
import { ExtendedTimer } from "./utils/timeoutTimePassed";

export const cache = new RoomCache();

export const InitSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("new connection established", socket.id);
    socket.on("join-room", (room_id, profile) => {
      console.log("new player joined", room_id, profile.id);
      if (!room_id) {
        return socket.emit("error", "Incorrect room id");
      }
      socket.join(room_id);
      if (cache.hasRoom(room_id)) {
        const cachedRoom = cache.getRoom(room_id);
        if (!cachedRoom) {
          return socket.emit("error", "Room not found");
        }
      } else {
        cache.setRoom(room_id, {
          id: room_id,
          io: io,
          owner: socket.id,
          status: "NOT_STARTED",
          sentence: "",
          participants: [],
          timer: null,
          interval: null,
        });
      }
      PlayerInit(profile, room_id, socket);
    });
  });
};

const PlayerInit = (profile: Profile, room_id: string, socket: Socket) => {
  const cachedRoom = cache.getRoom(room_id);
  if (cachedRoom.status != "NOT_STARTED") {
    return socket.emit("error", "Game started already, wait for a bit.");
  }
  const foundIndex = cachedRoom.participants.findIndex(
    (p) => p.profile.id == profile.id,
  );
  if (foundIndex != -1)
    cachedRoom.participants[foundIndex] = {
      profile,
      score: { input: "", wordsPerMinute: 0, accuracy: 100 },
      socket_id: socket.id,
    };
  else {
    cachedRoom.participants.push({
      profile,
      score: { input: "", wordsPerMinute: 0, accuracy: 100 },
      socket_id: socket.id,
    });
  }
  cachedRoom.io.to(cachedRoom.id).emit("player-join", 
    profile,
    { input: "", wordsPerMinute: 0, accuracy: 100 },
    socket.id,
  );
  socket.emit(
    "players",
    cachedRoom.participants,
  );
  socket.emit("new-owner", cachedRoom.owner);

  socket.on("start-new-game", () => {
    if (cachedRoom.status !== "NOT_STARTED") {
      return socket.emit(
        "error",
        "Game is not in its initial state, wait for a bit.",
      );
    }
    cachedRoom.status = "IN_PROGRESS";
    console.log("startNewGame");

    cachedRoom.sentence = getRandomSentence();
    cachedRoom.io.to(room_id).emit("game-started", cachedRoom.sentence);

    cachedRoom.interval = setInterval(() => {
        cachedRoom.io.to(room_id).emit("time-passing", cachedRoom.timer.getTimePassed());
    }, 1000);

    cachedRoom.timer = new ExtendedTimer(() => {
        clearInterval(cachedRoom.interval);
      cachedRoom.status = "NOT_STARTED";
      cachedRoom.io.to(room_id).emit("game-finished");
      cachedRoom.participants.forEach(p => p.score.input = "");
      cachedRoom.io.to(room_id).emit("players", cachedRoom.participants);
    }, 60000);
  });

  socket.on("player-typing", (input: string) => {
    if (cachedRoom.status !== "IN_PROGRESS") {
      socket.emit("error", "Wait for the game to start!");
    }

    const sentenceWords = cachedRoom.sentence.split(" ");
    const typedInSentenceWords = input.split(" ");

    let correctWords = 0;
    let mistakeLetters = 0;
    let totalCharacters = typedInSentenceWords.length;

    const minLength = Math.min(
      sentenceWords.length,
      typedInSentenceWords.length,
    );

    for (let i = 0; i < minLength; i++) {
      if (typedInSentenceWords[i] === sentenceWords[i]) {
        correctWords++;
      } else {
        for (let j = 0; j < typedInSentenceWords[i].length; j++) {
          if (typedInSentenceWords[i][j] != sentenceWords[i][j]) {
            mistakeLetters += 1;
          }
        }
        break;
      }
    }

    const wordsPerMinute = correctWords * 60 / cachedRoom.timer.getTimePassed() * 1000;
    const accuracy = (1 - mistakeLetters / totalCharacters) * 100;

    const foundProfile = cachedRoom.participants.find(
      (p) => p.socket_id === socket.id,
    );

    if (foundProfile) {
      foundProfile.score = { input, wordsPerMinute, accuracy };
      cachedRoom.io.to(room_id).emit("player-score-updated", foundProfile.socket_id, foundProfile.score);
    }
  });

  socket.on("player-leave", () => {
    if(socket.id === cachedRoom.owner) {
        // If owner left
        cachedRoom.participants = cachedRoom.participants.filter(p => p.socket_id !== socket.id);

        if(cachedRoom.participants.length === 0) {
            cache.removeRoom(cachedRoom.id);
        }
        else {
            cachedRoom.owner = cachedRoom.participants[0].socket_id;
            cachedRoom.io.to(cachedRoom.id).emit("new-owner", cachedRoom.owner);
        }
    }
    socket.leave(room_id);
    cachedRoom.participants = cachedRoom.participants.filter(p => p.socket_id !== socket.id)
    cachedRoom.io.to(room_id).emit("player-left", socket.id);
  });

  socket.on("disconnect", () => {
    if(socket.id === cachedRoom.owner) {
        // If owner left
        cachedRoom.participants = cachedRoom.participants.filter(p => p.socket_id !== socket.id);
        
        if(cachedRoom.participants.length === 0) {
            cache.removeRoom(cachedRoom.id);
        }
        else {
            cachedRoom.owner = cachedRoom.participants[0].socket_id;
            cachedRoom.io.to(cachedRoom.id).emit("new-owner", cachedRoom.owner);
        }
    }
    socket.leave(room_id);
    cachedRoom.participants = cachedRoom.participants.filter(p => p.socket_id !== socket.id)
    });
};
