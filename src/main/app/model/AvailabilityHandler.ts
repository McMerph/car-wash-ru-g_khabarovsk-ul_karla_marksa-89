import Availability from './api/Availability';
import Time from './Time';
import DateUtils from './utils/DateUtils';

export default class AvailabilityHandler {

    private readonly checkInTimes: Time[];
    private readonly disabledTimeStamps: Map<number, Time[]> = new Map<number, Time[]>();

    public constructor(availability: Availability) {
        availability.noService.forEach((timestamp) => {
            const dateWithNoServiceTime: Date = new Date(timestamp.year, timestamp.month, timestamp.day);
            if (this.disabledTimeStamps.has(dateWithNoServiceTime.valueOf())) {
                (this.disabledTimeStamps.get(dateWithNoServiceTime.valueOf()) as Time[]).push(new Time(timestamp.time));
            } else {
                this.disabledTimeStamps.set(dateWithNoServiceTime.valueOf(), [new Time(timestamp.time)]);
            }
        });

        this.checkInTimes = availability.checkInTimes.map((time) => new Time(time));
    }

    public getNearestAvailableTimestamp(): { date: Date, time: Time } {
        const date: Date = DateUtils.getCurrentDateOfMonth();
        while (true) {
            const checkInTimes: Time[] = this.getCheckInTimesOfDate(date);
            if (checkInTimes.length > 0) {
                return {date, time: checkInTimes[0]};
            }
            date.setDate(date.getDate() + 1);
        }
    }

    // TODO Delete? Return valueOf()?
    // public getNearestAvailableTimestamp(): Date {
    //     const date: Date = DateUtils.getCurrentDateOfMonth();
    //     while (true) {
    //         const serviceTimes: Time[] = this.getCheckInTimesOfDate(date);
    //         if (serviceTimes.length > 0) {
    //             date.setHours(serviceTimes[0].getHours());
    //             date.setMinutes(serviceTimes[0].getMinutes());
    //             return date;
    //         }
    //         date.setDate(date.getDate() + 1);
    //     }
    // }

    // TODO Delete?
    public getNoServiceDates(): Date[] {
        const datesWithNoServiceTime: Date[] = Array.from(this.disabledTimeStamps.keys()).map((valueOf) => new Date(valueOf));
        const uniqueDatesWithNoServiceTime: Date[] = DateUtils.getUniqueDatesOfMonth(datesWithNoServiceTime);

        return uniqueDatesWithNoServiceTime
            .filter((date) => {
                const noServiceTimes: Time[] = this.getNoServiceTimes(date);
                return noServiceTimes.length === this.checkInTimes.length &&
                    noServiceTimes.every((time1) => this.checkInTimes.some((time2) => time1.equals(time2)));
            });
    }

    // TODO Use it?
    public isDisabled(dateOfMonth: Date, time?: Time): boolean {
        const checkInTimesOfDate: Time[] = this.getCheckInTimesOfDate(dateOfMonth);
        const dateDisabled: boolean = checkInTimesOfDate.length === 0;
        if (time) {
            return dateDisabled && checkInTimesOfDate.some((checkInTime) => checkInTime.equals(time));
        } else {
            return dateDisabled;
        }
    }

    public getCheckInTimes(): Time[] {
        return this.checkInTimes;
    }

    public getDisabledTimeStamps(): Map<number, Time[]> {
        return this.disabledTimeStamps;
    }

    private getCheckInTimesOfDate(date: Date): Time[] {
        let checkInTimes: Time[] = this.checkInTimes;
        if (DateUtils.equalsDateOfMonth(date, new Date())) {
            const currentDate: Date = new Date();
            const currentTime = new Time({hours: currentDate.getHours(), minutes: currentDate.getMinutes()});
            checkInTimes = checkInTimes.filter((time) => time.compareTo(currentTime) > 0);
        }
        const noServiceTimes: Time[] = this.getNoServiceTimes(date);

        return checkInTimes.filter((time) => !Time.contains(noServiceTimes, time));
    }

    private getNoServiceTimes(date: Date): Time[] {
        return this.disabledTimeStamps.get(date.valueOf()) || [];
    }

}
