import * as Slider from 'swiper/dist/js/swiper.min.js';
import Time from '../../model/Time';
import DirectPicker from './DirectPicker';
import SliderUtils from './utils/SliderUtils';

// TODO Check current time. Re-render on change
export default class TimePicker extends DirectPicker<Time> {

    private static readonly ID: string = 'time-picker';

    private disabledTimes: Time[] = [];

    // tslint:updateDisabled-next-line:no-any
    private slider: any;
    private previousButton: HTMLButtonElement;
    private nextButton: HTMLButtonElement;
    private sliderContainer: HTMLElement;

    public constructor(availableTimes: Time[]) {
        super(availableTimes);

        this.previousButton = this.getPreviousButton();
        this.nextButton = this.getNextButton();
        this.sliderContainer = SliderUtils.getContainer();
    }

    public clearDisabled(): void {
        this.enableButtons(...this.pickButtons);
    }

    public updateDisabled(...times: Time[]): void {
        this.disabledTimes = times;
        this.enableButtons(...this.pickButtons);
        times.forEach((valueToDisable) => {
            const index: number = this.indexOf(valueToDisable);
            if (index !== -1) {
                this.disableButtons(this.pickButtons[index]);
            }
        });
        if (this.picked && this.isDisabled(this.pickedValue)) {
            this.unPick();
        }
    }

    protected isDisabled(time: Time): boolean {
        return this.disabledTimes.some((disabledTime) => disabledTime.equals(time));
    }

    public getLayout(): HTMLElement {
        this.generatePickButtons();
        this.initializeSlider();

        const layout: HTMLElement = document.createElement('div');
        layout.id = TimePicker.ID;

        layout.appendChild(this.previousButton);
        layout.appendChild(this.sliderContainer);
        layout.appendChild(this.nextButton);

        return layout;
    }

    // TODO Delete?
    public setSlidesPerView(amount: number): void {
        Object.assign(this.slider.params, {slidesPerView: amount});
    }

    public slideTo(time: Time) {
        this.pick(time);
        this.slider.slideTo(this.indexOf(time));
    }

    public updateSlider(): void {
        this.slider.update();
    }

    protected getRepresentation(time: Time): string {
        return time.getRepresentation();
    }

    protected valuesEquals(time1: Time, time2: Time): boolean {
        return time1.equals(time2);
    }

    private getPreviousButton(): HTMLButtonElement {
        const previousButton: HTMLButtonElement = DirectPicker.getPreviousButton();
        previousButton.onclick = () => this.slider.slidePrev();

        return previousButton;
    }

    private getNextButton(): HTMLButtonElement {
        const nextButton: HTMLButtonElement = DirectPicker.getNextButton();
        nextButton.onclick = () => this.slider.slideNext();

        return nextButton;
    }

    private initializeSlider(): void {
        this.slider = new Slider(this.sliderContainer, {
            direction: 'vertical',
            mousewheel: true,
            slidesPerView: 5,
            grabCursor: true
        });
        this.pickButtons.forEach((button) => this.slider.appendSlide(SliderUtils.getSlide(button)));

        this.handleNavigation();
    }

    private handleNavigation(): void {
        this.slider.on('slideChange', () => {
            if (this.slider.activeIndex <= 0) {
                this.enableButtons(this.nextButton);
                this.disableButtons(this.previousButton);
            } else if (this.slider.activeIndex >= this.values.length - this.slider.params.slidesPerView) {
                this.enableButtons(this.previousButton);
                this.disableButtons(this.nextButton);
            } else {
                this.enableButtons(this.previousButton, this.nextButton);
            }
        });
    }

}
