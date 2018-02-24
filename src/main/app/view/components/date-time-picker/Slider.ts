import * as Swiper from "swiper/dist/js/swiper.min.js";
import CLASS_NAMES from "../../constants/class-names";
import DICTIONARY from "../../constants/dictionary";

export default abstract class Slider {

    protected static generateContainer(): HTMLElement {
        const wrapper: HTMLDivElement = document.createElement("div");
        wrapper.classList.add(CLASS_NAMES.SWIPER.WRAPPER);

        const container: HTMLDivElement = document.createElement("div");
        container.classList.add(CLASS_NAMES.SWIPER.CONTAINER);
        container.appendChild(wrapper);

        return container;
    }

    protected static getSlide(child: Node): HTMLElement {
        const slide = document.createElement("div");
        slide.classList.add(CLASS_NAMES.SWIPER.SLIDE);
        slide.appendChild(child);

        return slide;
    }

    private readonly slider: any;
    private readonly sliderContainer: HTMLElement;
    private readonly previousControl: HTMLElement;
    private readonly nextControl: HTMLElement;

    public constructor(sliderOptions: any) {
        this.sliderContainer = Slider.generateContainer();
        this.slider = new Swiper(this.sliderContainer, sliderOptions);
        this.previousControl = this.generatePreviousControl();
        this.nextControl = this.generateNextControl();
    }

    public removeAllSlides(): void {
        this.slider.removeAllSlides();
    }

    public appendSlide(node: Node): void {
        this.slider.appendSlide(Slider.getSlide(node));
    }

    public update(): void {
        this.slider.update();
    }

    /**
     * Run transition to the slide with index number equal to 'index' parameter
     * for the duration equal to 'speed' parameter.
     * @param {number} index index number of slide
     * @param {number} speed transition duration (in ms). Optional
     * @param {boolean} runCallbacks Set it to false (by default it is true) and
     * transition will not produce transition events. Optional
     */
    public slideTo(index: number, speed?: number, runCallbacks?: boolean): void {
        this.slider.slideTo(index, speed, runCallbacks);
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

    protected generatePreviousControl(): HTMLElement {
        const previousButton: HTMLButtonElement = document.createElement("button");
        previousButton.setAttribute("aria-label", DICTIONARY.BACK);
        previousButton.classList.add(
            CLASS_NAMES.NAVIGATION_BLOCK.NAME,
            CLASS_NAMES.ICON_BLOCK,
        );
        previousButton.onclick = () => this.slider.slidePrev();

        return previousButton;
    }

    protected generateNextControl(): HTMLElement {
        const nextButton: HTMLButtonElement = document.createElement("button");
        nextButton.setAttribute("aria-label", DICTIONARY.NEXT);
        nextButton.classList.add(
            CLASS_NAMES.NAVIGATION_BLOCK.NAME,
            CLASS_NAMES.ICON_BLOCK,
        );
        nextButton.onclick = () => this.slider.slideNext();

        return nextButton;
    }

}
