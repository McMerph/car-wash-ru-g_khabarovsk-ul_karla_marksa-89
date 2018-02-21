import AvailabilityHandler from "../../../model/AvailabilityHandler";
import Time from "../../../model/Time";
import CLASS_NAMES from "../../constants/class-names";
import DatePicker from "./date-picker/DatePicker";
import DateSlider from "./date-picker/DateSlider";
import IPicker from "./IPicker";
import MonthHandler from "./MonthHandler";
import IDateObserver from "./observers/IDateObserver";
import IMonthObserver from "./observers/IMonthObserver";
import TimePicker from "./time-picker/TimePicker";
import TimeSlider from "./time-picker/TimeSlider";

import "./date-time-picker.pcss";

// TODO Rename to TimestampPicker?
export default class DateTimePicker implements IPicker<Date>, IMonthObserver, IDateObserver {

    private readonly timePicker: TimePicker;
    private readonly datePicker: DatePicker;

    private readonly availabilityHandler: AvailabilityHandler;

    public constructor(availabilityHandler: AvailabilityHandler, timeSlider: TimeSlider, dateSlider: DateSlider, monthHandler: MonthHandler) {
        this.availabilityHandler = availabilityHandler;
        monthHandler.addMonthObserver(this);

        this.timePicker = new TimePicker(availabilityHandler.getCheckInTimes(), timeSlider);
        this.datePicker = new DatePicker(monthHandler, availabilityHandler, dateSlider);

        this.datePicker.addDateObserver(this);
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
        layout.classList.add(CLASS_NAMES.DATE_TIME_PICKER);
        layout.appendChild(this.datePicker.getLayout());
        layout.appendChild(this.timePicker.getLayout());

        return layout;
    }

    public onMonthChange(): void {
        // TODO Delete
        // console.log("DateTimePicker.onMonthChange()");

        this.timePicker.disable([]);
    }

    public onDatePick(): void {
        const pickedDateOfMonth = this.datePicker.getPickedValue().valueOf();
        const disabledTimes: Time[] = this.availabilityHandler.getDisabledTimes(pickedDateOfMonth);
        this.timePicker.disable(disabledTimes);
    }

    public pickNearest(): void {
        const { dateOfMonth, time } = this.availabilityHandler.getNearestAvailableTimestamp();
        this.datePicker.pick(dateOfMonth);
        this.timePicker.pick(time);
    }

}
