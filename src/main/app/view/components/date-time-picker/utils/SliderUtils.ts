import { CLASS_NAMES, DICTIONARY } from "../../../constants";

export default class SliderUtils {

    public static getContainer(): HTMLElement {
        const wrapper: HTMLDivElement = document.createElement("div");
        wrapper.classList.add(CLASS_NAMES.SWIPER.WRAPPER);

        const container: HTMLDivElement = document.createElement("div");
        container.classList.add(CLASS_NAMES.SWIPER.CONTAINER);
        container.appendChild(wrapper);

        return container;
    }

    public static getSlide(child: Node): HTMLElement {
        const slide = document.createElement("div");
        slide.classList.add(CLASS_NAMES.SWIPER.SLIDE);
        slide.appendChild(child);
        return slide;
    }

    public static getPreviousButton(slider: any): HTMLButtonElement {
        const previousButton: HTMLButtonElement = document.createElement("button");
        previousButton.setAttribute("aria-label", DICTIONARY.BACK);
        previousButton.onclick = () => slider.slidePrev();

        return previousButton;
    }

    public static getNextButton(slider: any): HTMLButtonElement {
        const nextButton: HTMLButtonElement = document.createElement("button");
        nextButton.setAttribute("aria-label", DICTIONARY.NEXT);
        nextButton.onclick = () => slider.slideNext();

        return nextButton;
    }

}
