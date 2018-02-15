export default class SliderUtils {

    public static getContainer(): HTMLElement {
        const wrapper: HTMLDivElement = document.createElement("div");
        wrapper.classList.add(SliderUtils.WRAPPER_CLASS);

        const container: HTMLDivElement = document.createElement("div");
        container.classList.add(SliderUtils.CONTAINER_CLASS);
        container.appendChild(wrapper);

        return container;
    }

    public static getSlide(child: Node): HTMLElement {
        const slide = document.createElement("div");
        slide.classList.add(SliderUtils.SLIDE_CLASS);
        slide.appendChild(child);
        return slide;
    }

    // tslint:disable-next-line:no-any
    public static getPreviousButton(slider: any): HTMLButtonElement {
        const previousButton: HTMLButtonElement = document.createElement("button");
        previousButton.setAttribute("aria-label", "Назад");
        previousButton.classList.add(SliderUtils.TO_PREVIOUS_CLASS);
        previousButton.onclick = () => slider.slidePrev();

        return previousButton;
    }

    // tslint:disable-next-line:no-any
    public static getNextButton(slider: any): HTMLButtonElement {
        const nextButton: HTMLButtonElement = document.createElement("button");
        nextButton.setAttribute("aria-label", "Далее");
        nextButton.classList.add(SliderUtils.TO_NEXT_CLASS);
        nextButton.onclick = () => slider.slideNext();

        return nextButton;
    }

    private static readonly CONTAINER_CLASS = "swiper-container";
    private static readonly WRAPPER_CLASS = "swiper-wrapper";
    private static readonly SLIDE_CLASS = "swiper-slide";

    private static readonly TO_PREVIOUS_CLASS = "previous";
    private static readonly TO_NEXT_CLASS = "next";

}
