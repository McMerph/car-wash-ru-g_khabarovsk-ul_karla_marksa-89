import AvailabilityHandler from "../../../model/AvailabilityHandler";
import Time from "../../../model/Time";
import DatePicker from "./date-picker/DatePicker";
import IPicker from "./IPicker";
import DateOfMonthObserver from "./observers/IDateOfMonthObserver";
import MonthObserver from "./observers/IMonthObserver";
import TimePicker from "./time-picker/TimePicker";

import "./date-time-picker.pcss";

// TODO Rename to TimestampPicker?
export default class DateTimePicker implements IPicker<Date>, MonthObserver, DateOfMonthObserver {

    private static readonly ID: string = "date-time-picker";

    private readonly timePicker: TimePicker;
    private readonly datePicker: DatePicker;

    private readonly availabilityHandler: AvailabilityHandler;

    public constructor(availabilityHandler: AvailabilityHandler) {
        this.availabilityHandler = availabilityHandler;

        const nearest: { dateOfMonth: Date; time: Time } = this.availabilityHandler.getNearestAvailableTimestamp();
        this.datePicker = new DatePicker(nearest.dateOfMonth, availabilityHandler);
        this.timePicker = new TimePicker(this.availabilityHandler.getCheckInTimes());

        this.datePicker.addMonthObserver(this);
        this.datePicker.addDateOfMonthObserver(this);
    }

    public onMonthChange(): void {
        this.timePicker.disable([]);
    }

    public onDateOfMonthPick(): void {
        const pickedDateOfMonth = this.datePicker.getPickedValue().valueOf();
        const disabledTimes: Time[] = this.availabilityHandler.getDisabledTimes(pickedDateOfMonth);
        this.timePicker.disable(disabledTimes);
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
        const layout: HTMLElement = document.createElement("div");
        layout.id = DateTimePicker.ID;
        layout.appendChild(this.datePicker.getLayout());
        layout.appendChild(this.timePicker.getLayout());

        return layout;
    }

    public pickNearest(): void {
        const nearest: { dateOfMonth: Date; time: Time } = this.availabilityHandler.getNearestAvailableTimestamp();
        this.datePicker.pick(nearest.dateOfMonth);
        this.timePicker.pick(nearest.time);
    }

    public updateSliders(): void {
        this.timePicker.updateSlider();
        this.datePicker.updateSlider();
    }

}
