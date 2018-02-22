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

    private readonly availabilityHandler: AvailabilityHandler;

    public constructor(availabilityHandler: AvailabilityHandler, timeSlider: TimeSlider, dateSlider: DateSlider, dateTimePickerState: DateTimePickerState) {
        this.dateTimePickerState = dateTimePickerState;
        this.availabilityHandler = availabilityHandler;
        dateTimePickerState.addMonthObserver(this);
        dateTimePickerState.addDateObserver(this);

        this.timePicker = new TimePicker(dateTimePickerState, availabilityHandler.getCheckInTimes(), timeSlider);
        this.datePicker = new DatePicker(dateTimePickerState, availabilityHandler, dateSlider);
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
        const pickedDateOfMonth = this.dateTimePickerState.getDate().valueOf();
        const disabledTimes: Time[] = this.availabilityHandler.getDisabledTimes(pickedDateOfMonth);
        this.timePicker.disable(disabledTimes);
    }

    public pickNearest(): void {
        const { dateOfMonth, time } = this.availabilityHandler.getNearest();
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
