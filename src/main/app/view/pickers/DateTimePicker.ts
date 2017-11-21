import AvailabilityHandler from '../../model/AvailabilityHandler';
import Time from '../../model/Time';
import DateOfMonthObserver from './DateOfMonthObserver';
import DatePicker from './DatePicker';
import MonthObserver from './MonthObserver';
import Picker from './Picker';
import TimePicker from './TimePicker';

import './style/date-time-picker.pcss';

// TODO Rename to TimestampPicker?
export default class DateTimePicker implements Picker<Date>, MonthObserver, DateOfMonthObserver {

    private static readonly ID: string = 'date-time-picker';

    private readonly timePicker: TimePicker;
    private readonly datePicker: DatePicker;

    private readonly availabilityHandler: AvailabilityHandler;

    public constructor(availabilityHandler: AvailabilityHandler) {
        this.availabilityHandler = availabilityHandler;

        const nearest: { date: Date; time: Time } = this.availabilityHandler.getNearestAvailableTimestamp();
        this.datePicker = new DatePicker(nearest.date, this, availabilityHandler);
        // TODO Move to constructor?
        // this.datePicker.disable(...this.availabilityHandler.getNoServiceDates());
        this.timePicker = new TimePicker(this.availabilityHandler.getCheckInTimes(), availabilityHandler);

        this.datePicker.addMonthObserver(this);
    }

    public onMonthChange(): void {
        // this.datePicker.disable(...this.availabilityHandler.getNoServiceDates());
        // this.timePicker.clearDisabled();
    }

    public onDateOfMonthPick(): void {
        // const disabledTimeStamps: Map<number, Time[]> = this.availabilityHandler.getDisabledTimeStamps();
        // const disabledTimes: Time[] = disabledTimeStamps.get(this.datePicker.getPickedValue().valueOf()) || [];
        // this.timePicker.disable(...disabledTimes);
        // console.log('disabledTimes:', disabledTimes);
    }

    public isPicked(): boolean {
        return this.datePicker.isPicked() && this.timePicker.isPicked();
    }

    public getPickedValue(): Date {
        const month: Date = this.datePicker.getPickedValue();
        const time: Time = this.timePicker.getPickedValue();

        return new Date(month.getFullYear(), month.getMonth(), month.getDate(), time.getHours(), time.getMinutes());
    }

    public getLayout(): HTMLElement {
        const layout: HTMLElement = document.createElement('div');
        layout.id = DateTimePicker.ID;
        layout.appendChild(this.datePicker.getLayout());
        layout.appendChild(this.timePicker.getLayout());

        return layout;
    }

    // TODO Delete?
    public pick(dateOfMonth: Date, time: Time): void {
        this.datePicker.pick(dateOfMonth);
        this.timePicker.pick(time);
    }

    public updateSliders(): void {
        this.timePicker.updateSlider();
        this.datePicker.updateSlider();
    }

}
