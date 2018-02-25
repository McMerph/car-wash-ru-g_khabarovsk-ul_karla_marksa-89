import AvailabilityHandler from "../../model/AvailabilityHandler";
import Time from "../../model/Time";
import IDateObserver from "./IDateObserver";
import IMonthObserver from "./IMonthObserver";

export default class DateTimePickerState {

    private readonly availabilityHandler: AvailabilityHandler;

    private datePicked: boolean = false;
    private timePicked: boolean = false;
    private month: Date;
    private date: Date;
    private time: Time;

    private monthObservers: IMonthObserver[] = [];
    private dateObservers: IDateObserver[] = [];

    public constructor(availabilityHandler: AvailabilityHandler) {
        this.availabilityHandler = availabilityHandler;
        this.month = availabilityHandler.getNearest().dateOfMonth;
    }

    public addMonthObserver(observer: IMonthObserver) {
        this.monthObservers.push(observer);
    }

    public removeMonthObserver(observer: IMonthObserver) {
        const index: number = this.monthObservers.indexOf(observer);
        this.monthObservers.splice(index, 1);
    }

    public addDateObserver(observer: IDateObserver) {
        this.dateObservers.push(observer);
    }

    public removeDateObserver(observer: IDateObserver) {
        const index: number = this.dateObservers.indexOf(observer);
        this.dateObservers.splice(index, 1);
    }

    public getPreviousMonth(): Date {
        return new Date(this.month.getFullYear(), this.month.getMonth() - 1);
    }

    public getNextMonth(): Date {
        return new Date(this.month.getFullYear(), this.month.getMonth() + 1);
    }

    public previousMonth(): void {
        this.setMonth(this.getPreviousMonth());
    }

    public nextMonth(): void {
        this.setMonth(this.getNextMonth());
    }

    public getCheckInTimes(): Time[] {
        return this.availabilityHandler.getCheckInTimes();
    }

    public getCheckInTimesCount(): number {
        return this.availabilityHandler.getCheckInTimes().length;
    }

    public isPicked(): boolean {
        return this.datePicked && this.timePicked;
    }

    public getPicked(): Date {
        return new Date(
            this.date.getFullYear(), this.date.getMonth(), this.date.getDate(),
            this.time.getHours(), this.time.getMinutes(),
        );
    }

    public unSetTime(): void {
        this.timePicked = false;
    }

    public getAvailabilityHandler(): AvailabilityHandler {
        return this.availabilityHandler;
    }

    public getMonth(): Date {
        return this.month;
    }

    public getDate(): Date {
        return this.date;
    }

    public getTime(): Time {
        return this.time;
    }

    public setMonth(month: Date) {
        this.month = month;
        this.monthObservers.forEach((observer) => observer.onMonthChange());
    }

    public setDate(date: Date) {
        this.datePicked = true;
        this.date = date;
        this.dateObservers.forEach((observer) => observer.onDatePick());
    }

    public setTime(time: Time) {
        this.timePicked = true;
        this.time = time;
    }

}
