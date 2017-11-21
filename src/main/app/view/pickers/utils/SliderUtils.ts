export default class SliderUtils {

    private static readonly CONTAINER_CLASS = 'swiper-container';
    private static readonly WRAPPER_CLASS = 'swiper-wrapper';
    private static readonly SLIDE_CLASS = 'swiper-slide';

    public static getContainer(): HTMLDivElement {
        const wrapper: HTMLDivElement = document.createElement('div');
        wrapper.classList.add(SliderUtils.WRAPPER_CLASS);

        const container: HTMLDivElement = document.createElement('div');
        container.classList.add(SliderUtils.CONTAINER_CLASS);
        container.appendChild(wrapper);

        return container;
    }

    public static getSlide(child: Node): HTMLDivElement {
        const slide = document.createElement('div');
        slide.classList.add(SliderUtils.SLIDE_CLASS);
        slide.appendChild(child);
        return slide;
    }

}
