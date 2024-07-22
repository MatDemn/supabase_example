export class ExtendedTimer {
    startTime: Date;
    totalTime: number;
    timer: NodeJS.Timeout;

    constructor(callback, totalTime) {
        this.startTime = new Date();
        this.totalTime = totalTime;
        this.timer = setTimeout(callback, totalTime);
    }

    // Output is in milliseconds
    getTimePassed(): number {
        return new Date().getTime() - this.startTime.getTime();
    }
}