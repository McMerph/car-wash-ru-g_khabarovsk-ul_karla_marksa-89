import * as Slider from "swiper/dist/js/swiper.min.js";
import { CLASS_NAMES, SETTINGS } from "../../../constants";
import TopControls from "../controls/TopControls";
import SliderUtils from "../utils/SliderUtils";
import DatePicker from "./DatePicker";

export default class DatePickerLayout {

    private readonly picker: DatePicker;

    private topControls: TopControls;

    private slider: any;
    private blockSlideChangeTransitionEnd: boolean = false;

    private sliderContainer: HTMLElement;

    public constructor(picker: DatePicker) {
        this.picker = picker;
        this.sliderContainer = SliderUtils.getContainer();
        this.handleSlider(this.sliderContainer);
    }

    public getLayout(): HTMLElement {
        const layout: HTMLElement = document.createElement("div");
        layout.classList.add(CLASS_NAMES.DATE_PICKER.MAIN);
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

    public setTopControls(topControls: TopControls) {
        this.topControls = topControls;
    }

    private handleSlider(sliderContainer: HTMLElement) {
        this.slider = new Slider(sliderContainer, {
            grabCursor: true,
            spaceBetween: SETTINGS.SPACE_BETWEEN_MONTHS_SLIDES,
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
