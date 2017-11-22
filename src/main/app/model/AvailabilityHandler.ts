import Availability from './api/Availability';
import Time from './Time';
import DateUtils from './utils/DateUtils';

export default class AvailabilityHandler {

    private readonly checkInTimes: Time[];

    // TODO Delete?
    private readonly disabledTimeStamps: Map<number, Time[]> = new Map<number, Time[]>();

    private readonly disabledDates: Set<number> = new Set<number>();
    private readonly disabledTimestamps: number[];

    public constructor(availability: Availability) {
        this.checkInTimes = availability.checkInTimes.map((time) => new Time(time));

        this.disabledTimestamps = availability.noService.map((timestamp) => {
            const date: Date = new Date(timestamp.year, timestamp.month, timestamp.day);
            const time: Time = new Time(timestamp.time);
            return date.valueOf() + time.toMilliseconds();
        });

        this.disabledTimestamps.map((timestamp) => DateUtils.getDateWithoutTime(new Date(timestamp)))
            .forEach((dateWithDisabledTime) => {
                const dateToCheck: Date = new Date(dateWithDisabledTime);
                const everyTime: boolean = this.checkInTimes.every((checkInTime) => {
                    dateToCheck.setHours(checkInTime.getHours());
                    dateToCheck.setMinutes(checkInTime.getMinutes());
                    return this.disabledTimestamps.indexOf(dateToCheck.valueOf()) !== -1;
                });
                if (everyTime) {
                    this.disabledDates.add(dateWithDisabledTime);
                }
            });

        availability.noService.forEach((timestamp) => {
            const dateWithNoServiceTime: Date = new Date(timestamp.year, timestamp.month, timestamp.day);
            if (this.disabledTimeStamps.has(dateWithNoServiceTime.valueOf())) {
                (this.disabledTimeStamps.get(dateWithNoServiceTime.valueOf()) as Time[]).push(new Time(timestamp.time));
            } else {
                this.disabledTimeStamps.set(dateWithNoServiceTime.valueOf(), [new Time(timestamp.time)]);
            }
        });
    }

    public getNearestAvailableTimestamp(): { dateOfMonth: Date, time: Time } {
        const date: Date = new Date(DateUtils.getTodayWithoutTime());
        while (true) {
            const checkInTimes: Time[] = this.getCheckInTimesOfDate(date.valueOf());
            if (checkInTimes.length > 0) {
                return {dateOfMonth: date, time: checkInTimes[0]};
            }
            date.setDate(date.getDate() + 1);
        }
    }

    public isDisabledDate(dateOfMonth: number): boolean {
        return this.disabledDates.has(dateOfMonth);
    }

    public isDisabledTimestamp(timestamp: number): boolean {
        return this.disabledTimestamps.indexOf(timestamp) !== -1;
    }

    public getDisabledTimes(dateOfMonth: number): Time[] {
        return this.disabledTimeStamps.get(dateOfMonth) || [];
    }

    public getCheckInTimes(): Time[] {
        return this.checkInTimes;
    }

    private getCheckInTimesOfDate(dateOfMonth: number): Time[] {
        let checkInTimesOfDate: Time[] = this.checkInTimes;
        if (DateUtils.equalsDateOfMonth(new Date(dateOfMonth), new Date())) {
            const currentDate: Date = new Date();
            const currentTime = new Time({hours: currentDate.getHours(), minutes: currentDate.getMinutes()});
            checkInTimesOfDate = checkInTimesOfDate.filter((time) => time.compareTo(currentTime) > 0);
        }
        const disabledTimes: Time[] = this.getDisabledTimes(dateOfMonth);

        return checkInTimesOfDate.filter((checkInTimeOfDate) =>
            !disabledTimes.some((disabledTime) => disabledTime.equals(checkInTimeOfDate)));
    }

}
