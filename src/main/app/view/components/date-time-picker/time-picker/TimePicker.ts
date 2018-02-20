import * as Slider from "swiper/dist/js/swiper.min.js";
import Time from "../../../../model/Time";
import CLASS_NAMES from "../../../constants/class-names";
import DICTIONARY from "../../../constants/dictionary";
import DirectPicker from "../DirectPicker";
import SliderUtils from "../utils/SliderUtils";

import "./time-picker.pcss";

// TODO Check current time. Re-render on change
// TODO Merge with TimePickerLayout?
export default class TimePicker extends DirectPicker<Time> {

    private times: Time[];

    private previousTimeControl: HTMLElement;
    private nextTimeControl: HTMLElement;

    private slider: any;
    private sliderContainer: HTMLElement;

    public constructor(times: Time[]) {
        super(times);
        this.generateButtons();

        this.times = times;

        this.sliderContainer = SliderUtils.getContainer();
        this.slider = new Slider(this.sliderContainer, {
            direction: "vertical",
            grabCursor: true,
            mousewheel: true,
            slidesPerView: 5,
            spaceBetween: 1,
        });
    }

    public getRepresentation(time: Time): string {
        return time.getRepresentation();
    }

    public onPick(index: number): void {
        super.onPick(index);
        this.slider.slideTo(index);
    }

    public updateSlider(): void {
        this.slider.update();
    }

    // TODO Delete?
    public setSlidesPerView(amount: number): void {
        Object.assign(this.slider.params, {slidesPerView: amount});
    }

    public getLayout(): HTMLElement {
        const layout: HTMLDivElement = document.createElement("div");
        layout.classList.add(CLASS_NAMES.TIME_PICKER.MAIN);

        this.buttons.forEach((button) => this.slider.appendSlide(SliderUtils.getSlide(button)));
        this.handleNavigation();

        const caption: HTMLDivElement = document.createElement("div");
        caption.classList.add(CLASS_NAMES.TIME_PICKER.CAPTION);
        caption.textContent = DICTIONARY.TIME;

        layout.appendChild(caption);
        layout.appendChild(this.sliderContainer);

        return layout;
    }

    public handleNavigation(): void {
        this.slider.on("slideChange", () => {
            if (this.slider.activeIndex <= 0) {
                // TODO Remove if?
                if (this.nextTimeControl) {
                    this.nextTimeControl.classList.remove(CLASS_NAMES.NAVIGATION.DISABLED);
                }
                // TODO Remove if?
                if (this.previousTimeControl) {
                    this.previousTimeControl.classList.add(CLASS_NAMES.NAVIGATION.DISABLED);
                }
            } else if (this.isSliderInTheEnd()) {
                // TODO Remove if?
                if (this.previousTimeControl) {
                    this.previousTimeControl.classList.remove(CLASS_NAMES.NAVIGATION.DISABLED);
                }
                // TODO Remove if?
                if (this.nextTimeControl) {
                    this.nextTimeControl.classList.add(CLASS_NAMES.NAVIGATION.DISABLED);
                }
            } else {
                // TODO Remove if?
                if (this.nextTimeControl) {
                    this.nextTimeControl.classList.remove(CLASS_NAMES.NAVIGATION.DISABLED);
                }
                // TODO Remove if?
                if (this.previousTimeControl) {
                    this.previousTimeControl.classList.remove(CLASS_NAMES.NAVIGATION.DISABLED);
                }
            }
        });
    }

    public getSlider(): any {
        return this.slider;
    }

    public setPreviousTimeControl(previousTimeControl: HTMLElement) {
        this.previousTimeControl = previousTimeControl;
    }

    public setNextTimeControl(nextTimeControl: HTMLElement) {
        this.nextTimeControl = nextTimeControl;
    }

    protected produceButton(picker: TimePicker, time: Time): HTMLButtonElement {
        const button: HTMLButtonElement = super.produceButton(picker, time);
        button.classList.add(CLASS_NAMES.PICK_CONTROL.TIME);

        return button;
    }

    protected valuesEquals(time1: Time, time2: Time): boolean {
        return time1.equals(time2);
    }

    private isSliderInTheEnd(): boolean {
        return this.slider.activeIndex >= this.times.length - this.slider.params.slidesPerView;
    }

}
