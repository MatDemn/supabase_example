export const formatTime = (time: number) => {
    const timeRounded = Math.floor(time / 1000);
    const seconds = (timeRounded)%60;
    const minutes = Math.floor(timeRounded / 60);
    return minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
}