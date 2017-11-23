import * as Slider from 'swiper/dist/js/swiper.min.js';
import Time from '../../../model/Time';
import Picker from '../Picker';
import ButtonsUtils from '../utils/ButtonsUtils';
import SliderUtils from '../utils/SliderUtils';
import TimePickerValuesHandler from './TimePickerValuesHandler';

import './time-picker.pcss';

// TODO Check current time. Re-render on change
export default class TimePicker implements Picker<Time> {

    private static readonly ID: string = 'time-picker';

    private valuesHandler: TimePickerValuesHandler;

    // tslint:disable-next-line:no-any
    private slider: any;
    private previousButton: HTMLButtonElement;
    private nextButton: HTMLButtonElement;
    private sliderContainer: HTMLElement;

    public constructor(times: Time[]) {
        this.valuesHandler = new TimePickerValuesHandler(times);
        this.valuesHandler.generateButtons();
    }

    public isPicked(): boolean {
        return this.valuesHandler.isPicked();
    }

    public getPickedValue(): Time {
        return this.valuesHandler.getPickedValue();
    }

    public pick(time: Time): void {
        this.valuesHandler.pick(time);
    }

    // TODO Rename to enableAll() or something like that?
    public clearDisabled(): void {
        this.valuesHandler.setDisabledTimes([]);
    }

    public updateDisabled(...disabledTimes: Time[]): void {
        this.valuesHandler.setDisabledTimes(disabledTimes);
    }

    public getLayout(): HTMLElement {
        this.sliderContainer = SliderUtils.getContainer();
        this.slider = new Slider(this.sliderContainer, {
            direction: 'vertical',
            mousewheel: true,
            slidesPerView: 5,
            grabCursor: true
        });
        this.valuesHandler.getButtons().forEach((button) => this.slider.appendSlide(SliderUtils.getSlide(button)));
        this.previousButton = SliderUtils.getPreviousButton(this.slider);
        this.nextButton = SliderUtils.getNextButton(this.slider);
        this.handleNavigation();

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
        this.slider.slideTo(this.valuesHandler.indexOf(time));
    }

    public updateSlider(): void {
        this.slider.update();
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
        return this.slider.activeIndex >= this.valuesHandler.getValues().length - this.slider.params.slidesPerView;
    }

}
