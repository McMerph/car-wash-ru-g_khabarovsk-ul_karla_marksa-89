import * as Slider from "swiper/dist/js/swiper.min.js";
import SliderUtils from "../utils/SliderUtils";
import DatePicker from "./DatePicker";

// TODO Extends ButtonsPickerLayout?
export default class DatePickerLayout {

    private static readonly ID: string = "date-picker";
    private static readonly YEAR_SELECT_CLASS = "year";
    private static readonly MONTH_SELECT_CLASS = "month";
    private static readonly MONTHS_NAMES: string[] = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    private static readonly SPACE_BETWEEN_SLIDES: number = 25;
    private static readonly YEARS_OFFSET: number = 5;

    private readonly picker: DatePicker;

    // tslint:disable-next-line:no-any
    private slider: any;
    private blockSlideChangeTransitionEnd: boolean = false;

    private monthSelect: HTMLSelectElement;
    private yearSelect: HTMLSelectElement;
    private sliderContainer: HTMLElement;
    private previousButton: HTMLButtonElement;
    private nextButton: HTMLButtonElement;

    public constructor(picker: DatePicker) {
        this.picker = picker;
        this.monthSelect = this.getMonthSelect();
        this.yearSelect = this.getYearSelect();
        this.sliderContainer = SliderUtils.getContainer();
        this.handleSlider(this.sliderContainer);
        this.previousButton = SliderUtils.getPreviousButton(this.slider);
        this.nextButton = SliderUtils.getNextButton(this.slider);
    }

    public getLayout(): HTMLElement {
        const layout: HTMLElement = document.createElement("div");
        layout.id = DatePickerLayout.ID;

        const controls: HTMLDivElement = document.createElement("div");
        controls.classList.add("controls");
        controls.appendChild(this.previousButton);
        controls.appendChild(this.monthSelect);
        controls.appendChild(this.yearSelect);
        controls.appendChild(this.nextButton);

        layout.appendChild(controls);
        // TODO Delete?
        // layout.appendChild(this.previousButton);
        // layout.appendChild(this.monthSelect);
        // layout.appendChild(this.yearSelect);
        // layout.appendChild(this.nextButton);
        layout.appendChild(this.sliderContainer);

        return layout;
    }

    public update(animated?: boolean): void {
        this.slider.removeAllSlides();
        this.slider.appendSlide(SliderUtils.getSlide(this.picker.getPreviousMonthLayout()));
        this.slider.appendSlide(SliderUtils.getSlide(this.picker.getCurrentMonthLayout()));
        this.slider.appendSlide(SliderUtils.getSlide(this.picker.getNextMonthLayout()));
        this.slider.slideTo(1, animated ? undefined : 0);
        this.updateSlider();

        if (this.yearSelect.parentNode) {
            const yearSelect: HTMLSelectElement = this.getYearSelect();
            this.yearSelect.parentNode.replaceChild(yearSelect, this.yearSelect);
            this.yearSelect = yearSelect;
        }
    }

    public updateSlider(): void {
        this.slider.update();
    }

    private handleSlider(sliderContainer: HTMLElement) {
        this.slider = new Slider(sliderContainer, {
            grabCursor: true,
            spaceBetween: DatePickerLayout.SPACE_BETWEEN_SLIDES,
        });
        this.handleSlideChange();
        this.handleSlideChangeTransitionEnd();
    }

    private handleSlideChangeTransitionEnd() {
        this.slider.on("slideChangeTransitionEnd", () => {
            if (!this.blockSlideChangeTransitionEnd) {
                this.blockSlideChangeTransitionEnd = true;
                if (this.slider.activeIndex === 0) {
                    this.picker.toPreviousMonth();
                } else if (this.slider.activeIndex === 2) {
                    this.picker.toNextMonth();
                }
            }
        });
    }

    private handleSlideChange() {
        this.slider.on("slideChange", () => {
            this.blockSlideChangeTransitionEnd = false;
            if (this.slider.activeIndex === 0) {
                this.updateSelects(this.picker.getPreviousMonth());
            } else if (this.slider.activeIndex === 1) {
                this.updateSelects(this.picker.getMonth());
            } else if (this.slider.activeIndex === 2) {
                this.updateSelects(this.picker.getNextMonth());
            }
        });
    }

    private updateSelects(month: Date) {
        this.monthSelect.value = month.getMonth().toString(10);
        this.yearSelect.value = month.getFullYear().toString(10);
    }

    private getMonthSelect(): HTMLSelectElement {
        const monthSelect: HTMLSelectElement = document.createElement("select");
        monthSelect.classList.add(DatePickerLayout.MONTH_SELECT_CLASS);
        DatePickerLayout.MONTHS_NAMES.forEach((monthName, monthIndex) => {
            monthSelect.options.add(this.getMonthOption(monthName, monthIndex));
        });
        monthSelect.addEventListener("change", () => {
            this.picker.changeMonthOfTheYear(parseInt(monthSelect.value, 10));
        });

        return monthSelect;
    }

    private getMonthOption(monthName: string, monthIndex: number): HTMLOptionElement {
        const option: HTMLOptionElement = document.createElement("option");
        option.value = monthIndex.toString();
        option.text = monthName;
        if (this.picker.sameMonthOfTheYear(monthIndex)) {
            option.selected = true;
        }

        return option;
    }

    private getYearSelect(): HTMLSelectElement {
        const yearSelect: HTMLSelectElement = document.createElement("select");
        yearSelect.classList.add(DatePickerLayout.YEAR_SELECT_CLASS);
        this.getSelectableYears().forEach((year) => {
            yearSelect.options.add(this.getYearOption(year));
        });
        yearSelect.addEventListener("change", () => {
            this.picker.changeYear(parseInt(yearSelect.value, 10));
        });

        return yearSelect;
    }

    private getSelectableYears(): string[] {
        const minYear: number = this.picker.getMonth().getFullYear() - DatePickerLayout.YEARS_OFFSET;
        const maxYear: number = this.picker.getMonth().getFullYear() + DatePickerLayout.YEARS_OFFSET;
        const years: string[] = [];
        for (let i = minYear; i <= maxYear; i++) {
            years.push(i.toString(10));
        }

        return years;
    }

    private getYearOption(year: string): HTMLOptionElement {
        const option = document.createElement("option");
        option.value = year;
        option.text = year;
        if (this.picker.sameYear(parseInt(year, 10))) {
            option.selected = true;
        }

        return option;
    }

}
