import AvailabilityHandler from '../../../model/AvailabilityHandler';
import DateUtils from '../../../model/utils/DateUtils';
import DateOfMonthObserver from '../observers/DateOfMonthObserver';
import MonthObserver from '../observers/MonthObserver';
import Picker from '../Picker';
import DateOfMonthPicker from './date-of-month-picker/DateOfMonthPicker';
import DatePickerLayout from './DatePickerLayout';

import './date-picker.pcss';

// TODO Check current time. Re-render on change
export default class DatePicker implements Picker<Date>, DateOfMonthObserver {

    private monthObservers: MonthObserver[] = [];
    private dateOfMonthObservers: DateOfMonthObserver[] = [];

    private availabilityHandler: AvailabilityHandler;

    private month: Date;

    private layout: DatePickerLayout;
    private dateOfMonthPicker: DateOfMonthPicker;

    public constructor(initialMonth: Date, availabilityHandler: AvailabilityHandler) {
        this.month = initialMonth;
        this.availabilityHandler = availabilityHandler;
        this.layout = new DatePickerLayout(this);

        this.updateMonth(this.month);
    }

    public onDateOfMonthPick(): void {
        this.dateOfMonthObservers.forEach((observer) => observer.onDateOfMonthPick());
    }

    public addDateOfMonthObserver(observer: DateOfMonthObserver) {
        this.dateOfMonthObservers.push(observer);
    }

    public removeDateOfMonthObserver(observer: DateOfMonthObserver) {
        const index: number = this.dateOfMonthObservers.indexOf(observer);
        this.dateOfMonthObservers.splice(index, 1);
    }

    public addMonthObserver(observer: MonthObserver) {
        this.monthObservers.push(observer);
    }

    public removeMonthObserver(observer: MonthObserver) {
        const index: number = this.monthObservers.indexOf(observer);
        this.monthObservers.splice(index, 1);
    }

    // TODO Use ButtonsPickerLayout?
    public getLayout(): HTMLElement {
        return this.layout.getLayout();
    }

    public pick(date: Date): void {
        if (!DateUtils.equalsMonth(date, this.month)) {
            this.updateMonth(date, true);
        }
        this.dateOfMonthPicker.pick(date);
    }

    public updateSlider(): void {
        this.layout.updateSlider();
    }

    public getPreviousMonthLayout(): Node {
        return new DateOfMonthPicker(DateUtils.getPreviousMonth(this.month), this.availabilityHandler).getLayout();
    }

    public getCurrentMonthLayout(): Node {
        return this.dateOfMonthPicker.getLayout();
    }

    public getNextMonthLayout(): Node {
        return new DateOfMonthPicker(DateUtils.getNextMonth(this.month), this.availabilityHandler).getLayout();
    }

    public isPicked(): boolean {
        return this.dateOfMonthPicker.isPicked();
    }

    public getPickedValue(): Date {
        return this.dateOfMonthPicker.getPickedValue();
    }

    public getMonth(): Date {
        return this.month;
    }

    public setMonth(month: Date) {
        this.month = month;
    }

    private updateMonth(month: Date, animated?: boolean): void {
        this.month = month;
        this.dateOfMonthPicker = new DateOfMonthPicker(month, this.availabilityHandler);
        this.dateOfMonthPicker.addDateOfMonthObserver(this);

        this.layout.updateMonth(this.month);

        this.monthObservers.forEach((observer) => observer.onMonthChange());
    }

}
