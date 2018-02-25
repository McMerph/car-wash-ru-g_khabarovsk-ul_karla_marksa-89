import DateUtils from "../../../model/utils/DateUtils";
import CLASS_NAMES from "../../constants/ClassNames";
import DateTimePickerState from "../DateTimePickerState";
import ILayout from "../ILayout";
import IMonthObserver from "../IMonthObserver";
import DateOfMonthPicker from "./DateOfMonthPicker";
import DateSlider from "./DateSlider";

// TODO Check current time. Re-render on change
export default class DatePicker implements ILayout, IMonthObserver {

    private dateTimePickerState: DateTimePickerState;

    private dateOfPreviousMonthPicker: DateOfMonthPicker;
    private dateOfMonthPicker: DateOfMonthPicker;
    private dateOfNextMonthPicker: DateOfMonthPicker;

    private readonly slider: DateSlider;

    public constructor(dateTimePickerState: DateTimePickerState, slider: DateSlider) {
        this.dateTimePickerState = dateTimePickerState;
        this.dateTimePickerState.addMonthObserver(this);
        this.slider = slider;
        this.onMonthChange();
    }

    public getLayout(): HTMLElement {
        const layout: HTMLElement = document.createElement("div");
        layout.classList.add(CLASS_NAMES.DATE_PICKER_BLOCK.NAME);
        layout.appendChild(this.slider.getSliderContainer());

        return layout;
    }

    public onMonthChange(): void {
        // TODO Not working. Why?
        // this.dateOfMonthPicker.removeDateObserver(this);
        this.dateOfPreviousMonthPicker = new DateOfMonthPicker(
            this.dateTimePickerState.getPreviousMonth(),
            this.dateTimePickerState,
        );
        this.dateOfMonthPicker = new DateOfMonthPicker(
            this.dateTimePickerState.getMonth(),
            this.dateTimePickerState,
        );
        this.dateOfNextMonthPicker = new DateOfMonthPicker(
            this.dateTimePickerState.getNextMonth(),
            this.dateTimePickerState,
        );

        // TODO Update always animated?
        this.renderSlider(false);
    }

    public pick(date: Date): void {
        if (!DateUtils.equalsMonth(date, this.dateTimePickerState.getMonth())) {
            this.dateTimePickerState.setMonth(date);
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