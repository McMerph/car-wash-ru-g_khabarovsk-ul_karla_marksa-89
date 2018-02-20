import * as Slider from "swiper/dist/js/swiper.min.js";
import SliderUtils from "../utils/SliderUtils";
import DatePicker from "./DatePicker";
import DatePickerControlsLayout from "../controls/DatePickerControlsLayout";

export default class DatePickerLayout {

    private static readonly CLASS_NAME: string = "date-picker";
    private static readonly SPACE_BETWEEN_SLIDES: number = 25;

    private readonly picker: DatePicker;

    private topControls: DatePickerControlsLayout;

    private slider: any;
    private blockSlideChangeTransitionEnd: boolean = false;

    private sliderContainer: HTMLElement;

    public constructor(picker: DatePicker) {
        this.picker = picker;
        this.sliderContainer = SliderUtils.getContainer();
        this.sliderContainer.classList.add("date-picker__main");
        this.handleSlider(this.sliderContainer);
    }

    public getLayout(): HTMLElement {
        const layout: HTMLElement = document.createElement("div");
        layout.classList.add(DatePickerLayout.CLASS_NAME);
        layout.appendChild(this.sliderContainer);

        return layout;
    }

    public update(animated?: boolean): void {
        this.slider.removeAllSlides();
        this.slider.appendSlide(SliderUtils.getSlide(this.picker.getPreviousMonthLayout()));
        this.slider.appendSlide(SliderUtils.getSlide(this.picker.getCurrentMonthLayout()));
        this.slider.appendSlide(SliderUtils.getSlide(this.picker.getNextMonthLayout()));
        this.slider.slideTo(1, animated ? undefined : 0);
        this.updateSlider();

        // TODO Remove if?
        if (this.topControls) {
            this.topControls.updateSelects(this.picker.getMonth());
        }
    }

    public updateSlider(): void {
        this.slider.update();
    }

    public getSlider(): any {
        return this.slider;
    }

    public setControlsLayout(controlsLayout: DatePickerControlsLayout) {
        this.topControls = controlsLayout;
    }

    private handleSlider(sliderContainer: HTMLElement) {
        this.slider = new Slider(sliderContainer, {
            grabCursor: true,
            spaceBetween: DatePickerLayout.SPACE_BETWEEN_SLIDES,
        });
        this.handleSlideChange();
        this.handleSlideChangeTransitionEnd();
    }

    private handleSlideChangeTransitionEnd() {
        this.slider.on("slideChangeTransitionEnd", () => {
            if (!this.blockSlideChangeTransitionEnd) {
                this.blockSlideChangeTransitionEnd = true;
                if (this.slider.activeIndex === 0) {
                    this.picker.toPreviousMonth();
                } else if (this.slider.activeIndex === 2) {
                    this.picker.toNextMonth();
                }
            }
        });
    }

    private handleSlideChange() {
        this.slider.on("slideChange", () => {
            this.blockSlideChangeTransitionEnd = false;
            if (this.slider.activeIndex === 0) {
                // TODO Remove if?
                if (this.topControls) {
                    this.topControls.updateSelects(this.picker.getPreviousMonth());
                }
            } else if (this.slider.activeIndex === 1) {
                // TODO Remove if?
                if (this.topControls) {
                    this.topControls.updateSelects(this.picker.getMonth());
                }
            } else if (this.slider.activeIndex === 2) {
                // TODO Remove if?
                if (this.topControls) {
                    this.topControls.updateSelects(this.picker.getNextMonth());
                }
            }
        });
    }

}
