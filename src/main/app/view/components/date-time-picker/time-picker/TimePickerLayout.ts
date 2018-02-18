import * as Slider from "swiper/dist/js/swiper.min.js";
import Time from "../../../../model/Time";
import ButtonsPickerLayout from "../ButtonsPickerLayout";
import SliderUtils from "../utils/SliderUtils";
import TimePicker from "./TimePicker";

export default class TimePickerLayout extends ButtonsPickerLayout<Time> {

    private static readonly CLASS: string = "time-picker";
    private static readonly DISABLED_NAVIGATION_CLASS: string = "time-picker__navigation_disabled";

    private times: Time[];

    // tslint:disable-next-line:no-any
    private slider: any;
    private previousButton: HTMLButtonElement;
    private nextButton: HTMLButtonElement;
    private sliderContainer: HTMLElement;

    public constructor(picker: TimePicker, times: Time[]) {
        super(picker);
        this.times = times;
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

        this.sliderContainer = SliderUtils.getContainer();
        this.sliderContainer.classList.add("time-picker__controls");
        this.slider = new Slider(this.sliderContainer, {
            direction: "vertical",
            grabCursor: true,
            mousewheel: true,
            slidesPerView: 5,
        });
        this.buttons.forEach((button) => this.slider.appendSlide(SliderUtils.getSlide(button)));
        this.previousButton = SliderUtils.getPreviousButton(this.slider);
        this.previousButton.classList.add(
            "time-picker__navigation",
            "time-picker__navigation_previous",
            TimePickerLayout.DISABLED_NAVIGATION_CLASS,
        );
        this.nextButton = SliderUtils.getNextButton(this.slider);
        this.nextButton.classList.add(
            "time-picker__navigation",
            "time-picker__navigation_next",
        );
        this.handleNavigation();

        const caption: HTMLDivElement = document.createElement("div");
        caption.classList.add("time-picker__caption");
        caption.textContent = "время";

        layout.appendChild(this.previousButton);
        layout.appendChild(caption);
        layout.appendChild(this.sliderContainer);
        layout.appendChild(this.nextButton);

        return layout;
    }

    protected produceButton(picker: TimePicker, time: Time): HTMLButtonElement {
        const button: HTMLButtonElement = super.produceButton(picker, time);
        button.classList.add("pick-control_time");

        return button;
    }

    private handleNavigation(): void {
        this.slider.on("slideChange", () => {
            if (this.slider.activeIndex <= 0) {
                this.nextButton.classList.remove(TimePickerLayout.DISABLED_NAVIGATION_CLASS);
                this.previousButton.classList.add(TimePickerLayout.DISABLED_NAVIGATION_CLASS);
            } else if (this.isSliderInTheEnd()) {
                this.previousButton.classList.remove(TimePickerLayout.DISABLED_NAVIGATION_CLASS);
                this.nextButton.classList.add(TimePickerLayout.DISABLED_NAVIGATION_CLASS);
            } else {
                this.previousButton.classList.remove(TimePickerLayout.DISABLED_NAVIGATION_CLASS);
                this.nextButton.classList.remove(TimePickerLayout.DISABLED_NAVIGATION_CLASS);
            }
        });
    }

    private isSliderInTheEnd(): boolean {
        return this.slider.activeIndex >= this.times.length - this.slider.params.slidesPerView;
    }

}
