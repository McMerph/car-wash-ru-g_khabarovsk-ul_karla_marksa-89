import DateUtils from "../../../../../model/utils/DateUtils";
import IWeek from "./IWeek";

export default class WeeksProducer {

    private static normalizeDay(day: number): number {
        return day === 0 ? 7 : day;
    }

    private readonly month: Date;

    public constructor(month: Date) {
        this.month = month;
    }

    public getWeeks(): IWeek[] {
        const weeks: IWeek[] = [];
        const lastDate: Date = DateUtils.getLastDateOfMonth(this.month);
        const weeksCount: number = this.getWeeksCount();
        const endDayOfFirstWeek: number = this.getEndDayOfFirstWeek();
        for (let i = 0; i < weeksCount; i++) {
            weeks.push({
                endDay: i === weeksCount - 1 ? WeeksProducer.normalizeDay(lastDate.getDay()) : 7,
                startDate: i === 0 ? 1 : endDayOfFirstWeek + 1 + (i - 1) * 7,
                startDay: i === 0 ? this.getFirstDay() : 1,
            });
        }

        return weeks;
    }

    private getWeeksCount(): number {
        const endDayOfFirstWeek = this.getEndDayOfFirstWeek();
        const lastDate: Date = DateUtils.getLastDateOfMonth(this.month);
        const daysCount = lastDate.getDate();

        return Math.ceil((daysCount - endDayOfFirstWeek) / 7) + 1;
    }

    private getEndDayOfFirstWeek() {
        return 7 - this.getFirstDay() + 1;
    }

    private getFirstDay(): number {
        return WeeksProducer.normalizeDay(this.getFirstDate().getDay());
    }

    private getFirstDate() {
        return new Date(this.month.getFullYear(), this.month.getMonth(), 1);
    }

}
