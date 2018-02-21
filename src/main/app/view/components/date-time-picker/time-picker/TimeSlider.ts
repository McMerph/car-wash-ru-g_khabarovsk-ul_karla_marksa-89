import * as Slider from "swiper/dist/js/swiper.min.js";
import CLASS_NAMES from "../../../constants/class-names";
import SliderUtils from "../utils/SliderUtils";

// TODO Extend SliderUtils class?
export default class TimeSlider {

    private readonly itemsCount: number;

    private readonly slider: any;
    private readonly sliderContainer: HTMLElement;
    private readonly previousControl: HTMLElement;
    private readonly nextControl: HTMLElement;

    public constructor(itemsCount: number) {
        this.itemsCount = itemsCount;
        this.sliderContainer = SliderUtils.getContainer();
        this.slider = this.generateSlider();
        this.previousControl = this.generatePreviousControl();
        this.nextControl = this.generateNextControl();
        this.handleNavigation();
    }

    public getSlider(): any {
        return this.slider;
    }

    public getSliderContainer(): HTMLElement {
        return this.sliderContainer;
    }

    public getPreviousControl(): HTMLElement {
        return this.previousControl;
    }

    public getNextControl(): HTMLElement {
        return this.nextControl;
    }

    private generateSlider(): any {
        return new Slider(this.sliderContainer, {
            direction: "vertical",
            grabCursor: true,
            mousewheel: true,
            slidesPerView: 5,
            spaceBetween: 1,
        });
    }

    private generatePreviousControl(): HTMLElement {
        const previousControl = SliderUtils.getPreviousButton(this.slider);
        previousControl.classList.add(
            CLASS_NAMES.NAVIGATION.MAIN,
            CLASS_NAMES.NAVIGATION.DISABLED,
            CLASS_NAMES.NAVIGATION.TO_TOP,
        );

        return previousControl;
    }

    private generateNextControl(): HTMLElement {
        const nextControl = SliderUtils.getNextButton(this.slider);
        nextControl.classList.add(
            CLASS_NAMES.NAVIGATION.MAIN,
            CLASS_NAMES.NAVIGATION.TO_BOTTOM,
        );

        return nextControl;
    }

    private handleNavigation(): void {
        this.slider.on("slideChange", () => {
            if (this.slider.activeIndex <= 0) {
                this.nextControl.classList.remove(CLASS_NAMES.NAVIGATION.DISABLED);
                this.previousControl.classList.add(CLASS_NAMES.NAVIGATION.DISABLED);
            } else if (this.isSliderInTheEnd()) {
                this.previousControl.classList.remove(CLASS_NAMES.NAVIGATION.DISABLED);
                this.nextControl.classList.add(CLASS_NAMES.NAVIGATION.DISABLED);
            } else {
                this.nextControl.classList.remove(CLASS_NAMES.NAVIGATION.DISABLED);
                this.previousControl.classList.remove(CLASS_NAMES.NAVIGATION.DISABLED);
            }
        });
    }

    private isSliderInTheEnd(): boolean {
        return this.slider.activeIndex >= this.itemsCount - this.slider.params.slidesPerView;
    }

}
