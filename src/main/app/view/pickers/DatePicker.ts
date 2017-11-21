import * as Slider from 'swiper/dist/js/swiper.min.js';
import AvailabilityHandler from '../../model/AvailabilityHandler';
import MonthHandler from '../../model/MonthHandler';
import DateUtils from '../../model/utils/DateUtils';
import DateOfMonthPicker from './DateOfMonthPicker';
import DateTimePicker from './DateTimePicker';
import MonthObserver from './MonthObserver';
import Picker from './Picker';
import SliderUtils from './utils/SliderUtils';

// TODO Check current time. Re-render on change
export default class DatePicker implements Picker<Date> {

    private static readonly ID: string = 'date-picker';
    private static readonly MONTHS_NAMES: string[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    private static readonly SPACE_BETWEEN_SLIDES: number = 25;

    private monthObservers: MonthObserver[] = [];

    private availabilityHandler: AvailabilityHandler;

    private monthHandler: MonthHandler;

    private dateOfMonthPicker: DateOfMonthPicker;
    private monthSelect: HTMLSelectElement;
    private yearSelect: HTMLSelectElement;
    private sliderContainer: HTMLElement;

    // tslint:updateDisabled-next-line:no-any
    private slider: any;

    private blockSlideChangeTransitionEnd: boolean = false;

    private dateTimePicker: DateTimePicker;

    public constructor(initialMonth: Date, dateTimePicker: DateTimePicker, availabilityHandler: AvailabilityHandler) {
        this.availabilityHandler = availabilityHandler;
        this.dateTimePicker = dateTimePicker;
        this.monthHandler = new MonthHandler(initialMonth);
        this.monthSelect = this.getMonthSelect();
        this.yearSelect = this.getYearSelect();
        this.sliderContainer = SliderUtils.getContainer();

        this.handleSlider();
        this.updateMonth(this.monthHandler.getMonth());
    }

    public addMonthObserver(observer: MonthObserver) {
        this.monthObservers.push(observer);
    }

    // TODO Check? Is it working?
    public removeMonthObserver(observer: MonthObserver) {
        const index: number = this.monthObservers.indexOf(observer);
        this.monthObservers.splice(index, 1);
    }

    // public updateDisabled(...dates: Date[]): void {
    //     this.dateOfMonthPicker.updateDisabled(...dates);
    // }

    public getLayout(): HTMLElement {
        const layout: HTMLElement = document.createElement('div');
        layout.id = DatePicker.ID;
        layout.appendChild(this.monthSelect);
        layout.appendChild(this.yearSelect);
        layout.appendChild(this.sliderContainer);

        return layout;
    }

    public pick(date: Date): void {
        if (!DateUtils.equalsMonth(date, this.monthHandler.getMonth())) {
            this.updateMonth(date, true);
        }
        this.dateOfMonthPicker.pick(date);
    }

    public updateSlider(): void {
        this.slider.update();
    }

    public isPicked(): boolean {
        return this.dateOfMonthPicker.isPicked();
    }

    public getPickedValue(): Date {
        return this.dateOfMonthPicker.getPickedValue();
    }

    private handleSlider() {
        this.slider = new Slider(this.sliderContainer, {
            grabCursor: true,
            spaceBetween: DatePicker.SPACE_BETWEEN_SLIDES
        });
        this.handleSlideChange();
        this.handleSlideChangeTransitionEnd();
    }

    private handleSlideChangeTransitionEnd() {
        this.slider.on('slideChangeTransitionEnd', () => {
            if (!this.blockSlideChangeTransitionEnd) {
                this.blockSlideChangeTransitionEnd = true;
                if (this.slider.activeIndex === 0) {
                    this.updateMonth(this.monthHandler.getPreviousMonth());
                } else if (this.slider.activeIndex === 2) {
                    this.updateMonth(this.monthHandler.getNextMonth());
                }
            }
        });
    }

    private handleSlideChange() {
        this.slider.on('slideChange', () => {
            this.blockSlideChangeTransitionEnd = false;
            if (this.slider.activeIndex === 0) {
                this.updateSelects(this.monthHandler.getPreviousMonth());
            } else if (this.slider.activeIndex === 1) {
                this.updateSelects(this.monthHandler.getMonth());
            } else if (this.slider.activeIndex === 2) {
                this.updateSelects(this.monthHandler.getNextMonth());
            }
        });
    }

    private updateSelects(date: Date) {
        this.monthSelect.value = date.getMonth().toString(10);
        this.yearSelect.value = date.getFullYear().toString(10);
    }

    private getPreviousSlide() {
        return new DateOfMonthPicker(this.monthHandler.getPreviousMonth(), this.availabilityHandler).getLayout();
    }

    private getNextSlide() {
        return new DateOfMonthPicker(this.monthHandler.getNextMonth(), this.availabilityHandler).getLayout();
    }

    private getMonthSelect(): HTMLSelectElement {
        const monthSelect: HTMLSelectElement = document.createElement('select');
        DatePicker.MONTHS_NAMES.forEach((monthName, monthIndex) => {
            monthSelect.options.add(this.getMonthOption(monthName, monthIndex));
        });
        monthSelect.addEventListener('change', () => {
            this.updateMonth(new Date(this.monthHandler.getMonth().getFullYear(), parseInt(monthSelect.value, 10)));
        });

        return monthSelect;
    }

    private getMonthOption(monthName: string, monthIndex: number): HTMLOptionElement {
        const option: HTMLOptionElement = document.createElement('option');
        option.value = monthIndex.toString();
        option.text = monthName;
        if (this.monthHandler.sameMonthIndex(monthIndex)) {
            option.selected = true;
        }

        return option;
    }

    private getYearSelect(): HTMLSelectElement {
        const yearSelect: HTMLSelectElement = document.createElement('select');
        this.getSelectableYears().forEach((year) => {
            yearSelect.options.add(this.getYearOption(year));
        });
        yearSelect.addEventListener('change', () => {
            this.updateMonth(new Date(parseInt(yearSelect.value, 10), this.monthHandler.getMonth().getMonth()));
        });

        return yearSelect;
    }

    private getSelectableYears(): string[] {
        const minYear: number = this.monthHandler.getMonth().getFullYear() - 10;
        const maxYear: number = this.monthHandler.getMonth().getFullYear() + 10;
        const years: string[] = [];
        for (let i = minYear; i <= maxYear; i++) {
            years.push(i.toString(10));
        }

        return years;
    }

    private getYearOption(year: string): HTMLOptionElement {
        const option = document.createElement('option');
        option.value = year;
        option.text = year;
        if (this.monthHandler.sameYearIndex(parseInt(year, 10))) {
            option.selected = true;
        }

        return option;
    }

    private updateMonth(month: Date, animated?: boolean): void {
        this.monthHandler = new MonthHandler(month);
        this.dateOfMonthPicker = new DateOfMonthPicker(month, this.availabilityHandler);
        this.dateOfMonthPicker.addDateOfMonthObserver(this.dateTimePicker);

        this.slider.removeAllSlides();
        this.slider.appendSlide(SliderUtils.getSlide(this.getPreviousSlide()));
        this.slider.appendSlide(SliderUtils.getSlide(this.dateOfMonthPicker.getLayout()));
        this.slider.appendSlide(SliderUtils.getSlide(this.getNextSlide()));
        this.slider.slideTo(1, animated ? undefined : 0);
        this.slider.update();

        this.monthObservers.forEach((observer) => observer.onMonthChange(month));
    }

}
