import MonthHandler, { Week } from '../../model/MonthHandler';
import DateUtils from '../../model/utils/DateUtils';
import DateOfMonthObserver from './DateOfMonthObserver';
import DirectPicker from './DirectPicker';

export default class DateOfMonthPicker extends DirectPicker<Date> {

    private month: Date;

    private dateOfMonthObservers: DateOfMonthObserver[] = [];

    public constructor(month: Date) {
        super(new MonthHandler(month).getDates());
        this.month = month;
    }

    public addDateOfMonthObserver(observer: DateOfMonthObserver) {
        this.dateOfMonthObservers.push(observer);
    }

    // TODO Check? Is it working?
    public removeDateOfMonthObserver(observer: DateOfMonthObserver) {
        const index: number = this.dateOfMonthObservers.indexOf(observer);
        this.dateOfMonthObservers.splice(index, 1);
    }

    public pick(dateOfMonth: Date): void {
        super.pick(dateOfMonth);
        this.dateOfMonthObservers.forEach((observer) => observer.onDateOfMonthPick());
    }

    public getLayout(): HTMLElement {
        const layout: HTMLDivElement = document.createElement('div');
        layout.classList.add('month');

        layout.appendChild(this.getMonthHeader());
        const weeks: Week[] = new MonthHandler(this.month).getWeeks();
        weeks.forEach((week) => layout.appendChild(this.getWeekLayout(week)));

        return layout;
    }

    protected getRepresentation(date: Date): string {
        return date.getDate().toString();
    }

    protected valuesEquals(date1: Date, date2: Date): boolean {
        return DateUtils.equalsDateOfMonth(date1, date2);
    }

    protected getClassesNames(date: Date): string[] {
        const classesNames: string[] = super.getClassesNames(date);
        if (DateUtils.isPast(date)) {
            classesNames.push('past');
        }
        if (DateUtils.equalsDateOfMonth(date, new Date())) {
            classesNames.push('today');
        }
        return classesNames;
    }

    private getMonthHeader(): HTMLElement {
        const header: HTMLElement = document.createElement('header');
        ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].forEach((dayName) =>
            header.appendChild(document.createElement('div'))
                .appendChild(document.createTextNode(dayName))
        );

        return header;
    }

    private getWeekLayout(week: Week): HTMLElement {
        const weekLayout: HTMLDivElement = document.createElement('div');
        weekLayout.classList.add('week');
        for (let i = 1; i <= 7; i++) {
            weekLayout.appendChild(this.getDayLayout(week, i));
        }

        return weekLayout;
    }

    private getDayLayout(week: Week, day: number): HTMLDivElement {
        const dayLayout: HTMLDivElement = document.createElement('div');
        const isDayExists: boolean = (week.startDay <= day) && (week.endDay >= day);
        if (isDayExists) {
            dayLayout.appendChild(this.pickButtons[week.startDate - week.startDay + day - 1]);
        } else {
            dayLayout.setAttribute('aria-label', 'Данный день не из выбранного месяца');
        }

        return dayLayout;
    }

}
