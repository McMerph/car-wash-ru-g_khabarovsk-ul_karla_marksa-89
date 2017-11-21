export default class Time {

    private hours: number;
    private minutes: number;

    // TODO Introduce TimeUtils class?
    public static equalsArrays(array1: Time[], array2: Time[]): boolean {
        return array1.length === array2.length &&
            array1.every((time1) => array2.some((time2) => time1.equals(time2)));
    }

    // TODO Introduce TimeUtils class? Delete?
    public static contains(times: Time[], timeToCheck: Time): boolean {
        return times.some((time) => time.equals(timeToCheck));
    }

    public constructor(parameter: { hours: number; minutes: number; } | string) {
        if (typeof parameter === 'string') {
            const timeData: string[] = parameter.split(':');
            this.hours = parseInt(timeData[0], 10);
            this.minutes = parseInt(timeData[1], 10);
        } else {
            this.hours = parameter.hours;
            this.minutes = parameter.minutes;
        }
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

    public getRepresentation(): string {
        return `${this.hours}:${this.minutes.toFixed().padStart(2, '0')}`;
    }

    public getHours(): number {
        return this.hours;
    }

    public getMinutes(): number {
        return this.minutes;
    }

}
