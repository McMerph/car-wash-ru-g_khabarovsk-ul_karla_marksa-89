import IMonthObserver from "./observers/IMonthObserver";

export default class PickerState {

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

    public getPreviousMonth(): Date {
        return new Date(this.month.getFullYear(), this.month.getMonth() - 1);
    }

    public getNextMonth(): Date {
        return new Date(this.month.getFullYear(), this.month.getMonth() + 1);
    }

    public previous(): void {
        this.setMonth(this.getPreviousMonth());
    }

    public next(): void {
        this.setMonth(this.getNextMonth());
    }

    public getMonth(): Date {
        return this.month;
    }

    public setMonth(month: Date) {
        this.month = month;
        this.monthObservers.forEach((observer) => observer.onMonthChange());
    }

}
