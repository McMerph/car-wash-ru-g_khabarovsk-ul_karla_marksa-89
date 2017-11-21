import Week from './Week';

export default class WeeksProducer {

    public getWeeks(): Week[] {
        const weeks: Week[] = [];
        const lastDate: Date = this.getLastDate();
        const weeksCount: number = this.getWeeksCount();
        const endDayOfFirstWeek: number = this.getEndDayOfFirstWeek();
        for (let i = 0; i < weeksCount; i++) {
            weeks.push({
                startDate: i === 0 ? 1 : endDayOfFirstWeek + 1 + (i - 1) * 7,
                startDay: i === 0 ? this.getFirstDay() : 1,
                endDay: i === weeksCount - 1 ? this.normalizeDay(lastDate.getDay()) : 7
            });
        }

        return weeks;
    }

    private getWeeksCount(): number {
        const endDayOfFirstWeek = this.getEndDayOfFirstWeek();

        const lastDate = this.getLastDate();
        const daysCount = lastDate.getDate();
        return Math.ceil((daysCount - endDayOfFirstWeek) / 7) + 1;
    }

    private getEndDayOfFirstWeek() {
        return 7 - this.getFirstDay() + 1;
    }

    private getFirstDay(): number {
        const firstDate = this.getFirstDate();
        return firstDate.getDay() === 0 ? 7 : firstDate.getDay();
    }

    private getFirstDate() {
        return new Date(this.month.getFullYear(), this.month.getMonth(), 1);
    }

    private getLastDate() {
        return new Date(this.month.getFullYear(), this.month.getMonth() + 1, 0);
    }

    private normalizeDay(day: number): number {
        return day === 0 ? 7 : day;
    }

}
