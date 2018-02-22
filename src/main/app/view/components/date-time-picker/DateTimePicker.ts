import AvailabilityHandler from "../../../model/AvailabilityHandler";
import Time from "../../../model/Time";
import CLASS_NAMES from "../../constants/class-names";
import DatePicker from "./date-picker/DatePicker";
import DateSlider from "./date-picker/DateSlider";
import DateTimePickerState from "./DateTimePickerState";
import ILayout from "./ILayout";
import IDateObserver from "./observers/IDateObserver";
import IMonthObserver from "./observers/IMonthObserver";
import TimePicker from "./time-picker/TimePicker";
import TimeSlider from "./time-picker/TimeSlider";

import "./date-time-picker.pcss";

export default class DateTimePicker implements ILayout, IMonthObserver, IDateObserver {

    private readonly timePicker: TimePicker;
    private readonly datePicker: DatePicker;
    private readonly dateTimePickerState: DateTimePickerState;

    public constructor(timeSlider: TimeSlider, dateSlider: DateSlider, dateTimePickerState: DateTimePickerState) {
        this.dateTimePickerState = dateTimePickerState;
        dateTimePickerState.addMonthObserver(this);
        dateTimePickerState.addDateObserver(this);

        this.timePicker = new TimePicker(dateTimePickerState, timeSlider);
        this.datePicker = new DatePicker(dateTimePickerState, dateSlider);
    }

    public getLayout(): HTMLElement {
        const layout: HTMLElement = document.createElement("div");
        layout.classList.add(CLASS_NAMES.DATE_TIME_PICKER);
        layout.appendChild(this.datePicker.getLayout());
        layout.appendChild(this.timePicker.getLayout());

        return layout;
    }

    public onMonthChange(): void {
        this.timePicker.disable([]);
    }

    public onDatePick(): void {
        const availabilityHandler: AvailabilityHandler = this.dateTimePickerState.getAvailabilityHandler();
        const pickedDateOfMonth = this.dateTimePickerState.getDate().valueOf();
        const disabledTimes: Time[] = availabilityHandler.getDisabledTimes(pickedDateOfMonth);
        this.timePicker.disable(disabledTimes);
    }

    public pickNearest(): void {
        const availabilityHandler: AvailabilityHandler = this.dateTimePickerState.getAvailabilityHandler();
        const { dateOfMonth, time } = availabilityHandler.getNearest();
        this.timePicker.pick(time);
        this.datePicker.pick(dateOfMonth);
    }

    public isPicked(): boolean {
        return this.dateTimePickerState.isPicked();
    }

    public getPickedDateTime(): Date {
        return this.dateTimePickerState.getPicked();
    }

}
