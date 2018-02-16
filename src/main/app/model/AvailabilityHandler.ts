import {inArray, isNotDuplicate} from "../Utils";
import IAvailability from "./api/IAvailability";
import Time from "./Time";
import DateUtils from "./utils/DateUtils";

export default class AvailabilityHandler {

    private readonly checkInTimes: Time[];
    private readonly disabledDates: number[];
    private readonly disabledTimestamps: number[];

    public constructor(availability: IAvailability) {
        this.checkInTimes = availability.checkInTimes.map((time) => new Time(time));
        this.disabledTimestamps = this.getDisabledTimestamps(availability);
        this.disabledDates = this.getDisabledDates();
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

    public getDisabledTimes(dateOfMonth: number): Time[] {
        const date: Date = new Date(dateOfMonth);
        date.setDate(date.getDate() + 1);
        const nextDateOfMonth: number = date.valueOf();
        return this.disabledTimestamps
            .filter((disabledTimestamp) =>
                disabledTimestamp >= dateOfMonth && disabledTimestamp < nextDateOfMonth)
            .map((disabledTimestamp) => new Time(new Date(disabledTimestamp)));
    }

    public isDisabledDate(dateOfMonth: number): boolean {
        return inArray(dateOfMonth, this.disabledDates);
    }

    public isDisabledTimestamp(timestamp: number): boolean {
        return inArray(timestamp, this.disabledTimestamps);
    }

    public getCheckInTimes(): Time[] {
        return this.checkInTimes;
    }

    private getDisabledTimestamps(availability: IAvailability): number[] {
        return availability.noService.map((timestamp) =>
            this.generateTimestamp({
                date: new Date(timestamp.year, timestamp.month, timestamp.day).valueOf(),
                time: new Time(timestamp.time),
            }));
    }

    private getDisabledDates(): number[] {
        return this.disabledTimestamps
            .map((disabledTimestamp) => DateUtils.getDateWithoutTime(new Date(disabledTimestamp)))
            .filter(isNotDuplicate)
            .filter((dateWithDisabledTime) => this.checkInTimes.every((checkInTime) =>
                this.isDisabledTimestamp(this.generateTimestamp({
                    date: dateWithDisabledTime,
                    time: checkInTime,
                })),
            ));
    }

    private generateTimestamp(parameters: { date: number, time: Time }): number {
        const {date, time} = parameters;
        const timestamp: Date = new Date(date);
        timestamp.setHours(time.getHours());
        timestamp.setMinutes(time.getMinutes());

        return timestamp.valueOf();
    }

    private getCheckInTimesOfDate(dateOfMonth: number): Time[] {
        let checkInTimesOfDate: Time[] = this.checkInTimes;
        const currentDate: Date = new Date();
        if (DateUtils.equalsDateOfMonth(new Date(dateOfMonth), currentDate)) {
            const currentTime = new Time({hours: currentDate.getHours(), minutes: currentDate.getMinutes()});
            checkInTimesOfDate = checkInTimesOfDate.filter((time) => time.compareTo(currentTime) > 0);
        }
        const disabledTimes: Time[] = this.getDisabledTimes(dateOfMonth);

        return checkInTimesOfDate.filter((checkInTimeOfDate) =>
            !disabledTimes.some((disabledTime) => disabledTime.equals(checkInTimeOfDate)));
    }

}
