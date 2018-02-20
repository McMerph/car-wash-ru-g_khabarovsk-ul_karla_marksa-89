import * as Slider from "swiper/dist/js/swiper.min.js";
import Time from "../../../../model/Time";
import CLASS_NAMES from "../../../constants/class-names";
import DICTIONARY from "../../../constants/dictionary";
import DirectPicker from "../DirectPicker";
import SliderUtils from "../utils/SliderUtils";

import "./time-picker.pcss";

// TODO Check current time. Re-render on change
export default class TimePicker extends DirectPicker<Time> {

    private times: Time[];

    private previousTimeControl: HTMLElement;
    private nextTimeControl: HTMLElement;

    // TODO Move to DirectPicker class?
    private slider: any;

    // TODO Move to DirectPicker class?
    private sliderContainer: HTMLElement;

    public constructor(times: Time[]) {
        super(times);
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

    public pick(time: Time): void {
        super.pick(time);
        const index: number = this.indexOf(time);
        if (index !== -1 && !this.isDisabled(time)) {
            this.slider.slideTo(index);
        }
    }

    public updateSlider(): void {
        this.slider.update();
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

    private isSliderInTheEnd(): boolean {
        return this.slider.activeIndex >= this.times.length - this.slider.params.slidesPerView;
    }

}
