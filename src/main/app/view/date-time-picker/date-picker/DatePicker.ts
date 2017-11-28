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

    private dateOfPreviousMonthPicker: DateOfMonthPicker;
    private dateOfMonthPicker: DateOfMonthPicker;
    private dateOfNextMonthPicker: DateOfMonthPicker;

    public constructor(initialMonth: Date, availabilityHandler: AvailabilityHandler) {
        this.month = initialMonth;
        this.availabilityHandler = availabilityHandler;
        this.layout = new DatePickerLayout(this);

        this.updateMonth(initialMonth);
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
        return this.dateOfPreviousMonthPicker.getLayout();
        // return new DateOfMonthPicker(DateUtils.getPreviousMonth(this.month), this.availabilityHandler).getLayout();
    }

    public getCurrentMonthLayout(): Node {
        return this.dateOfMonthPicker.getLayout();
    }

    public getNextMonthLayout(): Node {
        return this.dateOfNextMonthPicker.getLayout();
        // return new DateOfMonthPicker(DateUtils.getNextMonth(this.month), this.availabilityHandler).getLayout();
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

    public getPreviousMonth(): Date {
        return DateUtils.getPreviousMonth(this.month);
    }

    public getNextMonth(): Date {
        return DateUtils.getNextMonth(this.month);
    }

    public toPreviousMonth(animated?: boolean): void {
        this.updateMonth(DateUtils.getPreviousMonth(this.month));
    }

    public toNextMonth(animated?: boolean): void {
        this.updateMonth(DateUtils.getNextMonth(this.month));
    }

    public changeMonthOfTheYear(monthIndex: number): void {
        this.updateMonth(new Date(this.month.getFullYear(), monthIndex));
    }

    public changeYear(year: number): void {
        this.updateMonth(new Date(year, this.month.getMonth()));
    }

    public sameMonthOfTheYear(monthIndex: number): boolean {
        return this.month.getMonth() === monthIndex;
    }

    public sameYear(year: number): boolean {
        return this.month.getFullYear() === year;
    }

    private updateMonth(month: Date, animated?: boolean): void {
        this.month = month;
        this.dateOfPreviousMonthPicker = new DateOfMonthPicker(this.getPreviousMonth(), this.availabilityHandler);
        this.dateOfMonthPicker = new DateOfMonthPicker(month, this.availabilityHandler);
        this.dateOfNextMonthPicker = new DateOfMonthPicker(this.getNextMonth(), this.availabilityHandler);
        this.dateOfMonthPicker.addDateOfMonthObserver(this);

        this.monthObservers.forEach((observer) => observer.onMonthChange());

        this.layout.update(animated);
    }

}
