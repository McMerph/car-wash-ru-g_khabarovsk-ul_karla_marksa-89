import Time from "../../../model/Time";
import IDateObserver from "./observers/IDateObserver";
import IMonthObserver from "./observers/IMonthObserver";

export default class DateTimePickerState {

    private month: Date;
    private datePicked: boolean = false;
    private timePicked: boolean = false;
    private date: Date;
    private time: Time;

    private monthObservers: IMonthObserver[] = [];
    private dateObservers: IDateObserver[] = [];

    public constructor(month: Date) {
        this.month = month;
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

    public isPicked(): boolean {
        return this.datePicked && this.timePicked;
    }

    public unSetTime(): void {
        this.timePicked = false;
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
