import AvailabilityHandler from "../../../../model/AvailabilityHandler";
import DateUtils from "../../../../model/utils/DateUtils";
import CLASS_NAMES from "../../../constants/class-names";
import IPicker from "../IPicker";
import IMonthObserver from "../observers/IMonthObserver";
import PickerState from "../PickerState";
import DateOfMonthPicker from "./date-of-month-picker/DateOfMonthPicker";
import DateSlider from "./DateSlider";

import "./date-picker.pcss";

// TODO Check current time. Re-render on change
export default class DatePicker implements IPicker<Date>, IMonthObserver {

    private readonly availabilityHandler: AvailabilityHandler;

    private pickerState: PickerState;

    private dateOfPreviousMonthPicker: DateOfMonthPicker;
    private dateOfMonthPicker: DateOfMonthPicker;
    private dateOfNextMonthPicker: DateOfMonthPicker;

    private readonly slider: DateSlider;

    public constructor(pickerState: PickerState, availabilityHandler: AvailabilityHandler, slider: DateSlider) {
        this.pickerState = pickerState;
        this.pickerState.addMonthObserver(this);

        this.availabilityHandler = availabilityHandler;
        this.slider = slider;

        this.onMonthChange();
    }

    public isPicked(): boolean {
        return this.dateOfMonthPicker.isPicked();
    }

    public getPickedValue(): Date {
        return this.dateOfMonthPicker.getPickedValue();
    }

    public getLayout(): HTMLElement {
        const layout: HTMLElement = document.createElement("div");
        layout.classList.add(CLASS_NAMES.DATE_PICKER.MAIN);
        layout.appendChild(this.slider.getSliderContainer());

        return layout;
    }

    public onMonthChange(): void {
        // TODO Not working. Why?
        // this.dateOfMonthPicker.removeDateObserver(this);
        this.dateOfPreviousMonthPicker = new DateOfMonthPicker(
            this.pickerState.getPreviousMonth(),
            this.availabilityHandler,
            this.pickerState,
        );
        this.dateOfMonthPicker = new DateOfMonthPicker(
            this.pickerState.getMonth(),
            this.availabilityHandler,
            this.pickerState,
        );
        this.dateOfNextMonthPicker = new DateOfMonthPicker(
            this.pickerState.getNextMonth(),
            this.availabilityHandler,
            this.pickerState,
        );

        // TODO Update always animated?
        this.renderSlider(false);
    }

    public pick(date: Date): void {
        if (!DateUtils.equalsMonth(date, this.pickerState.getMonth())) {
            this.pickerState.setMonth(date);
        }
        this.dateOfMonthPicker.pick(date);
    }

    private renderSlider(animated?: boolean): void {
        this.slider.removeAllSlides();

        this.slider.appendSlide(this.dateOfPreviousMonthPicker.getLayout());
        this.slider.appendSlide(this.dateOfMonthPicker.getLayout());
        this.slider.appendSlide(this.dateOfNextMonthPicker.getLayout());

        this.slider.update();

        this.slider.slideTo(1, animated ? undefined : 0, false);
    }

}
