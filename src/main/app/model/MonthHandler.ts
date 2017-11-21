// TODO Merge with DateUtils class?

export default class MonthHandler {

    private readonly month: Date;

    public constructor(month: Date) {
        this.month = month;
    }

    public getDates(): Date[] {
        const dates: Date[] = [];
        for (let i = 0; i < this.getLastDate().getDate(); i++) {
            dates.push(new Date(this.month.getFullYear(), this.month.getMonth(), i + 1));
        }

        return dates;
    }

    public sameMonthIndex(monthIndex: number): boolean {
        return monthIndex === this.month.getMonth();
    }

    public sameYearIndex(yearIndex: number): boolean {
        return yearIndex === this.month.getFullYear();
    }

    public getPreviousMonth(): Date {
        return new Date(this.month.getFullYear(), this.month.getMonth() - 1);
    }

    public getNextMonth(): Date {
        return new Date(this.month.getFullYear(), this.month.getMonth() + 1);
    }

    public getMonth(): Date {
        return this.month;
    }

}
