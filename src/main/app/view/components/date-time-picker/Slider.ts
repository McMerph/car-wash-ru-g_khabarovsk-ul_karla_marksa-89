import * as Swiper from "swiper/dist/js/swiper.min.js";
import CLASS_NAMES from "../../constants/class-names";
import DICTIONARY from "../../constants/dictionary";
import SliderUtils from "./utils/SliderUtils";

export default abstract class Slider {

    private readonly slider: any;
    private readonly sliderContainer: HTMLElement;
    private readonly previousControl: HTMLElement;
    private readonly nextControl: HTMLElement;

    public constructor(sliderOptions: any) {
        this.sliderContainer = this.generateContainer();
        this.slider = new Swiper(this.sliderContainer, sliderOptions);
        this.previousControl = this.generatePreviousControl();
        this.nextControl = this.generateNextControl();
    }

    public appendSlide(node: Node): void {
        this.slider.appendSlide(SliderUtils.getSlide(node));
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

    protected generateContainer(): HTMLElement {
        const wrapper: HTMLDivElement = document.createElement("div");
        wrapper.classList.add(CLASS_NAMES.SWIPER.WRAPPER);

        const container: HTMLDivElement = document.createElement("div");
        container.classList.add(CLASS_NAMES.SWIPER.CONTAINER);
        container.appendChild(wrapper);

        return container;
    }

    protected getSlide(child: Node): HTMLElement {
        const slide = document.createElement("div");
        slide.classList.add(CLASS_NAMES.SWIPER.SLIDE);
        slide.appendChild(child);

        return slide;
    }

    protected generatePreviousControl(): HTMLElement {
        const previousButton: HTMLButtonElement = document.createElement("button");
        previousButton.setAttribute("aria-label", DICTIONARY.BACK);
        previousButton.onclick = () => this.slider.slidePrev();

        return previousButton;
    }

    protected generateNextControl(): HTMLElement {
        const nextButton: HTMLButtonElement = document.createElement("button");
        nextButton.setAttribute("aria-label", DICTIONARY.NEXT);
        nextButton.onclick = () => this.slider.slideNext();

        return nextButton;
    }

}
