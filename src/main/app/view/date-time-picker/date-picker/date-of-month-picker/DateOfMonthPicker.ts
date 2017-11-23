import AvailabilityHandler from '../../../../model/AvailabilityHandler';
import DateOfMonthObserver from '../../observers/DateOfMonthObserver';
import Picker from '../../Picker';
import DateOfMonthPickerValuesHandler from './DateOfMonthPickerValuesHandler ';
import Week from './Week';
import WeeksProducer from './WeeksProducer';

export default class DateOfMonthPicker implements Picker<Date> {

    private valuesHandler: DateOfMonthPickerValuesHandler;

    private month: Date;

    public constructor(month: Date, availabilityHandler: AvailabilityHandler) {
        this.month = month;
        this.valuesHandler = new DateOfMonthPickerValuesHandler(month, availabilityHandler);
        this.valuesHandler.generateButtons();
    }

    public isPicked(): boolean {
        return this.valuesHandler.isPicked();
    }

    public getPickedValue(): Date {
        return this.valuesHandler.getPickedValue();
    }

    public getLayout(): HTMLElement {
        const layout: HTMLDivElement = document.createElement('div');
        layout.classList.add('month');

        layout.appendChild(this.getMonthHeader());
        const weeks: Week[] = new WeeksProducer(this.month).getWeeks();
        weeks.forEach((week) => layout.appendChild(this.getWeekLayout(week)));

        return layout;
    }

    public pick(dateOfMonth: Date) {
        this.valuesHandler.pick(dateOfMonth);
    }

    public addDateOfMonthObserver(observer: DateOfMonthObserver): void {
        this.valuesHandler.addDateOfMonthObserver(observer);
    }

    public removeDateOfMonthObserver(observer: DateOfMonthObserver): void {
        this.valuesHandler.removeDateOfMonthObserver(observer);
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
            dayLayout.appendChild(this.valuesHandler.getButtons()[week.startDate - week.startDay + day - 1]);
        } else {
            dayLayout.setAttribute('aria-label', 'Данный день не из выбранного месяца');
        }

        return dayLayout;
    }

}
