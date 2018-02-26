import IApi from "../../../model/api/IApi";
import IAvailability from "../../../model/api/IAvailability";
import MockApi from "../../../model/api/MockApi";
import AvailabilityHandler from "../../../model/AvailabilityHandler";
import Time from "../../../model/Time";
import CLASS_NAMES from "../../constants/ClassNames";
import DICTIONARY from "../../constants/Dictionary";
import DateSlider from "../DatePicker/DateSlider";
import DatePicker from "../DatePicker/index";
import DateTimePickerState from "../DateTimePickerState";
import IDateObserver from "../IDateObserver";
import ILayout from "../ILayout";
import IMonthObserver from "../IMonthObserver";
import MonthControls from "../MonthControls/index";
import TimePicker from "../TimePicker/index";
import TimeSlider from "../TimePicker/TimeSlider";

export default class DateTimePicker implements ILayout, IMonthObserver, IDateObserver {

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

    public getLayout(): HTMLElement {
        const layout: HTMLElement = document.createElement("div");
        layout.classList.add(CLASS_NAMES.DATE_TIME_PICKER_BLOCK.NAME);
        layout.dataset.legend = DICTIONARY.DATE_TIME_PICKER_LEGEND;

        layout.appendChild(this.generateTopControls());
        layout.appendChild(this.generateDateTimePickerMain());
        layout.appendChild(this.generateBottomControls());

        return layout;
    }

    public updateSliders(): void {
        this.timeSlider.update();
        this.dateSlider.update();
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

    private generateTopControls(): HTMLElement {
        const topControls: HTMLDivElement = document.createElement("div");
        topControls.classList.add(CLASS_NAMES.DATE_TIME_PICKER_BLOCK.ELEMENTS.ROW.NAME);
        const montControlsLayout: HTMLElement = new MonthControls(this.dateSlider).getLayout();
        montControlsLayout.classList.add(CLASS_NAMES.DATE_TIME_PICKER_BLOCK.ELEMENTS.LEFT);
        topControls.appendChild(montControlsLayout);
        const timeSliderPreviousControl: HTMLElement = this.timeSlider.getPreviousControl();
        timeSliderPreviousControl.classList.add(CLASS_NAMES.DATE_TIME_PICKER_BLOCK.ELEMENTS.RIGHT);
        topControls.appendChild(timeSliderPreviousControl);

        return topControls;
    }

    private generateDateTimePickerMain(): HTMLElement {
        const dateTimePickerMain: HTMLElement = document.createElement("div");
        dateTimePickerMain.classList.add(
            CLASS_NAMES.DATE_TIME_PICKER_BLOCK.ELEMENTS.ROW.NAME,
            CLASS_NAMES.DATE_TIME_PICKER_BLOCK.ELEMENTS.ROW.MODIFIERS.MAIN,
        );
        const datePickerLayout = this.datePicker.getLayout();
        datePickerLayout.classList.add(CLASS_NAMES.DATE_TIME_PICKER_BLOCK.ELEMENTS.LEFT);
        const timePickerLayout = this.timePicker.getLayout();
        timePickerLayout.classList.add(CLASS_NAMES.DATE_TIME_PICKER_BLOCK.ELEMENTS.RIGHT);
        dateTimePickerMain.appendChild(datePickerLayout);
        dateTimePickerMain.appendChild(timePickerLayout);

        return dateTimePickerMain;
    }

    private generateBottomControls() {
        const bottomControls = document.createElement("div");
        bottomControls.classList.add(CLASS_NAMES.DATE_TIME_PICKER_BLOCK.ELEMENTS.ROW.NAME);
        const timeSliderNextControl = this.timeSlider.getNextControl();
        timeSliderNextControl.classList.add(CLASS_NAMES.DATE_TIME_PICKER_BLOCK.ELEMENTS.RIGHT);
        bottomControls.appendChild(timeSliderNextControl);

        return bottomControls;
    }

}
