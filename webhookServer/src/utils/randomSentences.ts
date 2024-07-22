import { LoremIpsum } from "lorem-ipsum";

export const getRandomSentence = (): string => {
    const lorem = new LoremIpsum({
        sentencesPerParagraph: {
            min: 16,
            max: 64
        } ,
        wordsPerSentence: {
            max: 16,
            min: 4
        }
    });
    return lorem.generateSentences(20);
}