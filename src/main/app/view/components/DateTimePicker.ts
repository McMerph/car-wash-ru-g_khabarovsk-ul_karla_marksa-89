import AvailabilityHandler from "../../model/AvailabilityHandler";
import Time from "../../model/Time";
import DateSlider from "./DatePicker/DateSlider";
import DatePicker from "./DatePicker/index";
import DateTimePickerState from "./DateTimePickerState";
import IDateObserver from "./IDateObserver";
import IMonthObserver from "./IMonthObserver";
import TimePicker from "./TimePicker/index";
import TimeSlider from "./TimePicker/TimeSlider";

interface IDateTimePickerParameters {

    timeSlider: TimeSlider;
    dateSlider: DateSlider;
    dateTimePickerState: DateTimePickerState;

}

export default class DateTimePicker implements IMonthObserver, IDateObserver {

    private readonly timePicker: TimePicker;
    private readonly datePicker: DatePicker;
    private readonly dateTimePickerState: DateTimePickerState;

    public constructor(parameters: IDateTimePickerParameters) {
        const { timeSlider, dateSlider, dateTimePickerState } = parameters;
        this.dateTimePickerState = dateTimePickerState;
        dateTimePickerState.addMonthObserver(this);
        dateTimePickerState.addDateObserver(this);

        this.timePicker = new TimePicker(dateTimePickerState, timeSlider);
        this.datePicker = new DatePicker(dateTimePickerState, dateSlider);
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

    public getDatePicker(): DatePicker {
        return this.datePicker;
    }

    public getTimePicker(): TimePicker {
        return this.timePicker;
    }

}
