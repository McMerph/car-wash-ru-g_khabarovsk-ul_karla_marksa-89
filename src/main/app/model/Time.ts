export default class Time {

    private hours: number;
    private minutes: number;

    public constructor(parameter: { hours: number; minutes: number; } | string | Date) {
        if (typeof parameter === 'string') {
            const timeData: string[] = parameter.split(':');
            this.hours = parseInt(timeData[0], 10);
            this.minutes = parseInt(timeData[1], 10);
        } else if (parameter instanceof Date) {
            this.hours = parameter.getHours();
            this.minutes = parameter.getMinutes();
        } else {
            this.hours = parameter.hours;
            this.minutes = parameter.minutes;
        }
    }

    public getRepresentation(): string {
        return `${this.hours}:${this.minutes.toFixed().padStart(2, '0')}`;
    }

    public compareTo(time: Time): number {
        let result = 0;
        if (!this.equals(time)) {
            if (this.hours === time.hours) {
                result = this.minutes - time.minutes;
            } else {
                result = this.hours - time.hours;
            }
        }

        return result;
    }

    public equals(otherTime: Time): boolean {
        return otherTime && this.hours === otherTime.hours && this.minutes === otherTime.minutes;
    }

    public getHours(): number {
        return this.hours;
    }

    public getMinutes(): number {
        return this.minutes;
    }

}
