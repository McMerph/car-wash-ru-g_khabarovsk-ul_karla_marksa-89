import IApi from "../../model/api/IApi";
import IAvailability from "../../model/api/IAvailability";
import MockApi from "../../model/api/MockApi";
import AvailabilityHandler from "../../model/AvailabilityHandler";
import Time from "../../model/Time";
import DateSlider from "./DatePicker/DateSlider";
import DatePicker from "./DatePicker/index";
import DateTimePickerState from "./DateTimePickerState";
import IDateObserver from "./IDateObserver";
import IMonthObserver from "./IMonthObserver";
import TimePicker from "./TimePicker/index";
import TimeSlider from "./TimePicker/TimeSlider";

// TODO implements ILayout
export default class DateTimePicker implements IMonthObserver, IDateObserver {

    private readonly timePicker: TimePicker;
    private readonly datePicker: DatePicker;
    private readonly dateTimePickerState: DateTimePickerState;

    private readonly timeSlider: TimeSlider;
    private readonly dateSlider: DateSlider;

    public constructor() {
        // TODO Change to real API
        const api: IApi = new MockApi();
        const availability: IAvailability = api.retrieveAvailability();
        const availabilityHandler: AvailabilityHandler = new AvailabilityHandler(availability);
        this.dateTimePickerState = new DateTimePickerState(availabilityHandler);

        this.timeSlider = new TimeSlider(this.dateTimePickerState);
        this.dateSlider = new DateSlider(this.dateTimePickerState);

        this.dateTimePickerState.addMonthObserver(this);
        this.dateTimePickerState.addDateObserver(this);

        this.timePicker = new TimePicker(this.dateTimePickerState, this.timeSlider);
        this.datePicker = new DatePicker(this.dateTimePickerState, this.dateSlider);
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

    public getDateSlider(): DateSlider {
        return this.dateSlider;
    }

    public getTimeSlider(): TimeSlider {
        return this.timeSlider;
    }

}
