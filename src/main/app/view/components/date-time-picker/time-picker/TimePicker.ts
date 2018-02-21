import Time from "../../../../model/Time";
import CLASS_NAMES from "../../../constants/class-names";
import DICTIONARY from "../../../constants/dictionary";
import DirectPicker from "../DirectPicker";
import SliderUtils from "../utils/SliderUtils";
import TimeSlider from "./TimeSlider";

import "./time-picker.pcss";

// TODO Check current time. Re-render on change
export default class TimePicker extends DirectPicker<Time> {

    private readonly slider: TimeSlider;

    public constructor(times: Time[], slider: TimeSlider) {
        super(times);
        this.slider = slider;
    }

    public getLayout(): HTMLElement {
        const layout: HTMLDivElement = document.createElement("div");
        layout.classList.add(CLASS_NAMES.TIME_PICKER.MAIN);

        // TODO Declare appendSlide() method to TimeSlider class?
        this.buttons.forEach((button) => this.slider.getSlider().appendSlide(SliderUtils.getSlide(button)));

        const caption: HTMLDivElement = document.createElement("div");
        caption.classList.add(CLASS_NAMES.TIME_PICKER.CAPTION);
        caption.textContent = DICTIONARY.TIME;

        layout.appendChild(caption);
        layout.appendChild(this.slider.getSliderContainer());

        return layout;
    }

    public pick(time: Time): void {
        super.pick(time);
        const index: number = this.indexOf(time);
        if (index !== -1 && !this.isDisabled(time)) {
            // TODO Declare slideTo() method to TimeSlider class?
            this.slider.getSlider().slideTo(index);
        }
    }

    public updateSlider(): void {
        // TODO Declare update() method to TimeSlider class?
        this.slider.getSlider().update();
    }

    protected getRepresentation(time: Time): string {
        return time.getRepresentation();
    }

    protected produceButton(time: Time): HTMLButtonElement {
        const button: HTMLButtonElement = super.produceButton(time);
        button.classList.add(CLASS_NAMES.PICK_CONTROL.TIME);

        return button;
    }

    protected valuesEquals(time1: Time, time2: Time): boolean {
        return time1.equals(time2);
    }

}
