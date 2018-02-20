import * as Slider from "swiper/dist/js/swiper.min.js";
import Time from "../../../../model/Time";
import ButtonsPickerLayout from "../ButtonsPickerLayout";
import SliderUtils from "../utils/SliderUtils";
import TimePicker from "./TimePicker";
import TimePickerNextControlLayout from "./TimePickerNextControlLayout";
import TimePickerPreviousControlLayout from "./TimePickerPreviousControlLayout";

export default class TimePickerLayout extends ButtonsPickerLayout<Time> {

    private static readonly CLASS: string = "time-picker";
    private static readonly DISABLED_NAVIGATION_CLASS: string = "picker__navigation_disabled";

    private times: Time[];

    private previousControlLayout: TimePickerPreviousControlLayout;
    private nextControlLayout: TimePickerNextControlLayout;

    private slider: any;
    private sliderContainer: HTMLElement;

    public constructor(picker: TimePicker, times: Time[]) {
        super(picker);
        this.times = times;

        this.sliderContainer = SliderUtils.getContainer();
        this.sliderContainer.classList.add("time-picker__main");
        this.slider = new Slider(this.sliderContainer, {
            direction: "vertical",
            grabCursor: true,
            mousewheel: true,
            slidesOffsetBefore: 1,
            slidesPerView: 5,
            spaceBetween: 1,
        });
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
        layout.classList.add(TimePickerLayout.CLASS);

        this.buttons.forEach((button) => this.slider.appendSlide(SliderUtils.getSlide(button)));
        this.handleNavigation();

        const caption: HTMLDivElement = document.createElement("div");
        caption.classList.add("time-picker__caption");
        caption.textContent = "время";

        layout.appendChild(caption);
        layout.appendChild(this.sliderContainer);

        return layout;
    }

    public handleNavigation(): void {
        this.slider.on("slideChange", () => {
            if (this.slider.activeIndex <= 0) {
                // TODO Remove if?
                if (this.nextControlLayout) {
                    this.nextControlLayout.getControl().classList.remove(TimePickerLayout.DISABLED_NAVIGATION_CLASS);
                }
                // TODO Remove if?
                if (this.previousControlLayout) {
                    this.previousControlLayout.getControl().classList.add(TimePickerLayout.DISABLED_NAVIGATION_CLASS);
                }
            } else if (this.isSliderInTheEnd()) {
                // TODO Remove if?
                if (this.previousControlLayout) {
                    this.previousControlLayout.getControl().classList.remove(TimePickerLayout.DISABLED_NAVIGATION_CLASS);
                }
                // TODO Remove if?
                if (this.nextControlLayout) {
                    this.nextControlLayout.getControl().classList.add(TimePickerLayout.DISABLED_NAVIGATION_CLASS);
                }
            } else {
                // TODO Remove if?
                if (this.previousControlLayout) {
                    this.previousControlLayout.getControl().classList.remove(TimePickerLayout.DISABLED_NAVIGATION_CLASS);
                }
                // TODO Remove if?
                if (this.nextControlLayout) {
                    this.nextControlLayout.getControl().classList.remove(TimePickerLayout.DISABLED_NAVIGATION_CLASS);
                }
            }
        });
    }

    public getSlider(): any {
        return this.slider;
    }

    public setPreviousControlLayout(previousControlLayout: TimePickerPreviousControlLayout) {
        this.previousControlLayout = previousControlLayout;
    }

    public setNextControlLayout(nextControlLayout: TimePickerNextControlLayout) {
        this.nextControlLayout = nextControlLayout;
    }

    protected produceButton(picker: TimePicker, time: Time): HTMLButtonElement {
        const button: HTMLButtonElement = super.produceButton(picker, time);
        button.classList.add("pick-control_time");

        return button;
    }

    private isSliderInTheEnd(): boolean {
        return this.slider.activeIndex >= this.times.length - this.slider.params.slidesPerView;
    }

}
