import IMonthObserver from "./observers/IMonthObserver";

export default class MonthHandler {

    private month: Date;
    private monthObservers: IMonthObserver[] = [];

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

    public getMonth(): Date {
        return this.month;
    }

    public setMonth(month: Date) {
        this.month = month;
        this.monthObservers.forEach((observer) => observer.onMonthChange());
    }

}
