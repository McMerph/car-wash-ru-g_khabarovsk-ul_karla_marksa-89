export default class DateUtils {

    public static getPreviousMonth(month: Date): Date {
        return new Date(month.getFullYear(), month.getMonth() - 1);
    }

    public static getNextMonth(month: Date): Date {
        return new Date(month.getFullYear(), month.getMonth() + 1);
    }

    public static getDatesOfMonth(month: Date): Date[] {
        const dates: Date[] = [];
        for (let i = 0; i < DateUtils.getLastDateOfMonth(month).getDate(); i++) {
            dates.push(new Date(month.getFullYear(), month.getMonth(), i + 1));
        }

        return dates;
    }

    public static getLastDateOfMonth(month: Date): Date {
        return new Date(month.getFullYear(), month.getMonth() + 1, 0);
    }

    public static isPast(date: Date): boolean {
        return date && date.valueOf() < this.getTodayWithoutTime();
    }

    public static equalsDateOfMonth(date1: Date, date2: Date): boolean {
        return this.equalsMonth(date1, date2) &&
            date1.getDate() === date2.getDate();
    }

    public static equalsMonth(date1: Date, date2: Date): boolean {
        return date1 && date2 &&
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth();
    }

    public static getTodayWithoutTime(): number {
        return DateUtils.getDateWithoutTime(new Date());
    }

    public static getTomorrowWithoutTime(): number {
        const date = new Date();
        date.setDate(date.getDate() + 1);

        return this.getDateWithoutTime(date);
    }

    public static getDateWithoutTime(date: Date): number {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate()).valueOf();
    }

}
