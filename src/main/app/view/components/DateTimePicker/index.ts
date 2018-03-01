import AvailabilityHandler from "../../../model/AvailabilityHandler";
import Time from "../../../model/Time";
import CLASS_NAMES from "../../constants/ClassNames";
import DICTIONARY from "../../constants/Dictionary";
import DatePicker from "../DatePicker/index";
import DateTimePickerState from "../DateTimePickerState";
import IDateObserver from "../IDateObserver";
import ILayout from "../ILayout";
import IMonthObserver from "../IMonthObserver";
import TimePicker from "../TimePicker/index";

export default class DateTimePicker implements ILayout, IMonthObserver, IDateObserver {

    private readonly timePicker: TimePicker;
    private readonly datePicker: DatePicker;
    private readonly dateTimePickerState: DateTimePickerState;

    public constructor(availabilityHandler: AvailabilityHandler) {
        this.dateTimePickerState = new DateTimePickerState(availabilityHandler);

        this.dateTimePickerState.addMonthObserver(this);
        this.dateTimePickerState.addDateObserver(this);

        this.timePicker = new TimePicker(this.dateTimePickerState);
        this.datePicker = new DatePicker(this.dateTimePickerState);
    }

    public getLayout(): HTMLElement {
        const layout: HTMLElement = document.createElement("div");
        layout.classList.add(CLASS_NAMES.DATE_TIME_PICKER_BLOCK.NAME);
        layout.appendChild(this.generateTopControls());
        layout.appendChild(this.generateDateTimePickerAspectRatio());
        layout.appendChild(this.generateBottomControls());

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
        this.datePicker.pick(dateOfMonth);
        this.timePicker.pick(time);
    }

    public updateSliders(): void {
        this.datePicker.updateSlider();
        this.timePicker.updateSlider();
    }

    public isPicked(): boolean {
        return this.dateTimePickerState.isPicked();
    }

    public getPickedDateTime(): Date {
        return this.dateTimePickerState.getPicked();
    }

    public getTime(): Time {
        return this.dateTimePickerState.getTime();
    }

    private generateTopControls(): HTMLElement {
        const topControls: HTMLDivElement = document.createElement("div");
        topControls.classList.add(CLASS_NAMES.DATE_TIME_PICKER_BLOCK.ELEMENTS.ROW.NAME);
        const monthControls: HTMLElement = this.datePicker.getMonthControls();
        monthControls.classList.add(
            CLASS_NAMES.DATE_TIME_PICKER_BLOCK.ELEMENTS.MONTH_CONTROLS,
            CLASS_NAMES.DATE_TIME_PICKER_BLOCK.ELEMENTS.LEFT,
        );
        topControls.appendChild(monthControls);
        const timeSliderPreviousControl: HTMLElement = this.timePicker.getPreviousControl();
        timeSliderPreviousControl.classList.add(CLASS_NAMES.DATE_TIME_PICKER_BLOCK.ELEMENTS.RIGHT);
        topControls.appendChild(timeSliderPreviousControl);

        return topControls;
    }

    private generateDateTimePickerAspectRatio(): HTMLElement {
        const dateTimePickerAspectRatio: HTMLElement = document.createElement("div");
        dateTimePickerAspectRatio.classList.add(CLASS_NAMES.DATE_TIME_PICKER_BLOCK.ELEMENTS.ASPECT_RATIO);
        dateTimePickerAspectRatio.appendChild(this.generateDateTimePickerMain());

        return dateTimePickerAspectRatio;
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
        bottomControls.classList.add(
            CLASS_NAMES.DATE_TIME_PICKER_BLOCK.ELEMENTS.ROW.NAME,
            CLASS_NAMES.DATE_TIME_PICKER_BLOCK.ELEMENTS.ROW.MODIFIERS.BOTTOM,
        );
        const legend: HTMLSpanElement = document.createElement("span");
        legend.classList.add(CLASS_NAMES.DATE_TIME_PICKER_BLOCK.ELEMENTS.LEGEND);
        legend.textContent = DICTIONARY.DATE_TIME_PICKER_LEGEND;
        const timeSliderNextControl = this.timePicker.getNextControl();
        timeSliderNextControl.classList.add(CLASS_NAMES.DATE_TIME_PICKER_BLOCK.ELEMENTS.RIGHT);
        bottomControls.appendChild(legend);
        bottomControls.appendChild(timeSliderNextControl);

        return bottomControls;
    }

}
