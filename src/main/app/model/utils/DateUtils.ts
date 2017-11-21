export default class DateUtils {

    public static getUniqueDatesOfMonth(dates: Date[]): Date[] {
        const uniqueDates: Date[] = [];
        dates.forEach((date) => {
            if (uniqueDates.every((uniqueDate) => !DateUtils.equalsDateOfMonth(uniqueDate, date))) {
                uniqueDates.push(date);
            }
        });

        return uniqueDates;
    }

    public static isPast(date: Date): boolean {
        const current: Date = new Date();
        const currentDate = new Date(current.getFullYear(), current.getMonth(), current.getDate());

        return date && date < currentDate;
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

    public static getCurrentDateOfMonth(): Date {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = currentDate.getDate();

        return new Date(year, month, date);
    }

}
