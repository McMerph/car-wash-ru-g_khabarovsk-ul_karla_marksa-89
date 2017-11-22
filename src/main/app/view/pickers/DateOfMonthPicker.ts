import AvailabilityHandler from '../../model/AvailabilityHandler';
import DateUtils from '../../model/utils/DateUtils';
import DateOfMonthObserver from './DateOfMonthObserver';
import DirectPicker from './DirectPicker';
import Week from './Week';
import WeeksProducer from './WeeksProducer';

export default class DateOfMonthPicker extends DirectPicker<Date> {

    private month: Date;
    private availabilityHandler: AvailabilityHandler;

    private dateOfMonthObservers: DateOfMonthObserver[] = [];

    public constructor(month: Date, availabilityHandler: AvailabilityHandler) {
        super(DateUtils.getDates(month));
        this.availabilityHandler = availabilityHandler;
        this.month = month;
    }

    protected isDisabled(dateOfMonth: Date): boolean {
        return this.availabilityHandler.isDisabledDate(dateOfMonth.valueOf());
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
        this.generatePickButtons();

        const layout: HTMLDivElement = document.createElement('div');
        layout.classList.add('month');

        layout.appendChild(this.getMonthHeader());
        const weeks: Week[] = new WeeksProducer(this.month).getWeeks();
        weeks.forEach((week) => layout.appendChild(this.getWeekLayout(week)));

        return layout;
    }

    protected getRepresentation(date: Date): string {
        return date.getDate().toString();
    }

    protected valuesEquals(date1: Date, date2: Date): boolean {
        return DateUtils.equalsDateOfMonth(date1, date2);
    }

    protected getPickButton(date: Date): HTMLButtonElement {
        const button: HTMLButtonElement = super.getPickButton(date);
        if (this.isDisabled(date)) {
            button.classList.add(DirectPicker.DISABLED_CLASS);
        }
        if (DateUtils.isPast(date)) {
            button.classList.add('past');
        }
        if (DateUtils.equalsDateOfMonth(date, new Date())) {
            button.classList.add('today');
        }

        return button;
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
