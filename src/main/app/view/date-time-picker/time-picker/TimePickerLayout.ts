import * as Slider from 'swiper/dist/js/swiper.min.js';
import Time from '../../../model/Time';
import ButtonsPickerLayout from '../ButtonsPickerLayout';
import ButtonsUtils from '../utils/ButtonsUtils';
import SliderUtils from '../utils/SliderUtils';
import TimePicker from './TimePicker';

export default class TimePickerLayout extends ButtonsPickerLayout<Time> {

    private static readonly ID: string = 'time-picker';

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
        const layout: HTMLDivElement = document.createElement('div');
        layout.id = TimePickerLayout.ID;

        this.sliderContainer = SliderUtils.getContainer();
        this.slider = new Slider(this.sliderContainer, {
            direction: 'vertical',
            mousewheel: true,
            slidesPerView: 5,
            grabCursor: true
        });
        this.buttons.forEach((button) => this.slider.appendSlide(SliderUtils.getSlide(button)));
        this.previousButton = SliderUtils.getPreviousButton(this.slider);
        ButtonsUtils.disableButtons(this.previousButton);
        this.nextButton = SliderUtils.getNextButton(this.slider);
        this.handleNavigation();

        const caption: HTMLDivElement = document.createElement('div');
        caption.classList.add('caption');
        caption.textContent = 'время';

        layout.appendChild(this.previousButton);
        layout.appendChild(caption);
        layout.appendChild(this.sliderContainer);
        layout.appendChild(this.nextButton);

        return layout;
    }

    private handleNavigation(): void {
        this.slider.on('slideChange', () => {
            if (this.slider.activeIndex <= 0) {
                ButtonsUtils.enableButtons(this.nextButton);
                ButtonsUtils.disableButtons(this.previousButton);
            } else if (this.isSliderInTheEnd()) {
                ButtonsUtils.enableButtons(this.previousButton);
                ButtonsUtils.disableButtons(this.nextButton);
            } else {
                ButtonsUtils.enableButtons(this.previousButton, this.nextButton);
            }
        });
    }

    private isSliderInTheEnd(): boolean {
        return this.slider.activeIndex >= this.times.length - this.slider.params.slidesPerView;
    }

}
