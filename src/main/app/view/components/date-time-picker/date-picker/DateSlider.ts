import * as Slider from "swiper/dist/js/swiper.min.js";
import CLASS_NAMES from "../../../constants/class-names";
import DICTIONARY from "../../../constants/dictionary";
import SETTINGS from "../../../constants/settings";
import SliderUtils from "../utils/SliderUtils";

// TODO Extend SliderUtils class?
export default class DateSlider {

    private readonly slider: any;
    private readonly sliderContainer: HTMLElement;

    // TODO HTMLSelectElement vs HTMLElement
    private monthSelect: HTMLSelectElement;

    // TODO HTMLSelectElement vs HTMLElement
    private yearSelect: HTMLSelectElement;

    private previousControl: HTMLElement;
    private nextControl: HTMLElement;

    // TODO Get rid of it? Observer pattern?
    private toPreviousMonth: (animated?: boolean) => void;

    // TODO Get rid of it? Observer pattern?
    private toNextMonth: (animated?: boolean) => void;

    // TODO Get rid of it? Observer pattern?
    private changeMonthOfTheYear: (monthIndex: number) => void;

    // TODO Get rid of it? Observer pattern?
    private sameMonthOfTheYear: (monthIndex: number) => boolean;

    // TODO Get rid of it? Observer pattern?
    private changeYear: (year: number) => void;

    // TODO Get rid of it? Observer pattern?
    private getPreviousMonth: () => Date;

    // TODO Get rid of it? Observer pattern?
    private getMonth: () => Date;

    // TODO Get rid of it? Observer pattern?
    private getNextMonth: () => Date;

    // TODO Get rid of it? Observer pattern?
    private sameYear: (year: number) => boolean;

    private blockSlideChangeTransitionEnd: boolean = false;

    public constructor() {
        this.sliderContainer = SliderUtils.getContainer();
        this.slider = this.generateSlider();
        this.monthSelect = this.generateMonthSelect();
        this.yearSelect = this.generateYearSelect();
        this.previousControl = this.generatePreviousControl();
        this.nextControl = this.generateNextControl();

        this.handleSlideChange();
        this.handleSlideChangeTransitionEnd();
    }

    public getSlider(): any {
        return this.slider;
    }

    public getSliderContainer(): HTMLElement {
        return this.sliderContainer;
    }

    public getMonthSelect(): HTMLSelectElement {
        return this.monthSelect;
    }

    public getYearSelect(): HTMLSelectElement {
        return this.yearSelect;
    }

    public getPreviousControl(): HTMLElement {
        return this.previousControl;
    }

    public getNextControl(): HTMLElement {
        return this.nextControl;
    }

    public setToPreviousMonth(toPreviousMonth: (animated?: boolean) => void): void {
        this.toPreviousMonth = toPreviousMonth;
    }

    public setToNextMonth(toNextMonth: (animated?: boolean) => void): void {
        this.toNextMonth = toNextMonth;
    }

    public setChangeMonthOfTheYear(changeMonthOfTheYear: (monthIndex: number) => void): void {
        this.changeMonthOfTheYear = changeMonthOfTheYear;
    }

    public setSameMonthOfTheYear(sameMonthOfTheYear: (monthIndex: number) => boolean): void {
        this.sameMonthOfTheYear = sameMonthOfTheYear;
    }

    public setChangeYear(changeYear: (year: number) => void): void {
        this.changeYear = changeYear;
    }

    public setGetPreviousMonth(getPreviousMonth: () => Date): void {
        this.getPreviousMonth = getPreviousMonth;
    }

    public setGetMonth(getMonth: () => Date): void {
        this.getMonth = getMonth;
    }

    public setGetNextMonth(getNextMonth: () => Date): void {
        this.getNextMonth = getNextMonth;
    }

    public setSameYear(sameYear: (year: number) => boolean): void {
        this.sameYear = sameYear;
    }

    private generateSlider(): any {
        return new Slider(this.sliderContainer, {
            grabCursor: true,
            spaceBetween: SETTINGS.SPACE_BETWEEN_MONTHS_SLIDES,
        });
    }

    private generateMonthSelect(): HTMLSelectElement {
        const monthSelect: HTMLSelectElement = document.createElement("select");
        monthSelect.classList.add(CLASS_NAMES.CHOOSER);
        DICTIONARY.MONTHS_NAMES.forEach((monthName, monthIndex) => {
            monthSelect.options.add(this.getMonthOption(monthName, monthIndex));
        });
        monthSelect.addEventListener("change", () => {
            this.changeMonthOfTheYear(parseInt(monthSelect.value, 10));
        });

        return monthSelect;
    }

    private getMonthOption(monthName: string, monthIndex: number): HTMLOptionElement {
        const option: HTMLOptionElement = document.createElement("option");
        option.value = monthIndex.toString();
        option.text = monthName;
        if (this.sameMonthOfTheYear(monthIndex)) {
            option.selected = true;
        }

        return option;
    }

    private generateYearSelect(): HTMLSelectElement {
        const yearSelect: HTMLSelectElement = document.createElement("select");
        yearSelect.classList.add(CLASS_NAMES.CHOOSER);
        this.getSelectableYears().forEach((year) => {
            yearSelect.options.add(this.getYearOption(year));
        });
        yearSelect.addEventListener("change", () => {
            this.changeYear(parseInt(yearSelect.value, 10));
        });

        return yearSelect;
    }

    private getSelectableYears(): string[] {
        const minYear: number = this.getMonth().getFullYear() - SETTINGS.YEARS_OFFSET;
        const maxYear: number = this.getMonth().getFullYear() + SETTINGS.YEARS_OFFSET;
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
        if (this.sameYear(parseInt(year, 10))) {
            option.selected = true;
        }

        return option;
    }

    private generatePreviousControl(): HTMLElement {
        const previousControl = SliderUtils.getPreviousButton(this.slider);
        previousControl.classList.add(
            CLASS_NAMES.NAVIGATION.MAIN,
            CLASS_NAMES.NAVIGATION.TO_LEFT,
        );

        return previousControl;
    }

    private generateNextControl(): HTMLElement {
        const nextControl = SliderUtils.getNextButton(this.slider);
        nextControl.classList.add(
            CLASS_NAMES.NAVIGATION.MAIN,
            CLASS_NAMES.NAVIGATION.TO_RIGHT,
        );

        return nextControl;
    }

    private handleSlideChangeTransitionEnd() {
        this.slider.on("slideChangeTransitionEnd", () => {
            if (!this.blockSlideChangeTransitionEnd) {
                this.blockSlideChangeTransitionEnd = true;
                if (this.slider.activeIndex === 0) {
                    this.toPreviousMonth();
                } else if (this.slider.activeIndex === 2) {
                    this.toNextMonth();
                }
            }
        });
    }

    private handleSlideChange() {
        this.slider.on("slideChange", () => {
            this.blockSlideChangeTransitionEnd = false;
            if (this.slider.activeIndex === 0) {
                this.updateSelects(this.getPreviousMonth());
            } else if (this.slider.activeIndex === 1) {
                this.updateSelects(this.getMonth());

            } else if (this.slider.activeIndex === 2) {
                this.updateSelects(this.getNextMonth());
            }
        });
    }

    private updateSelects(month: Date) {
        // TODO Remove if?
        if (this.yearSelect.parentNode) {
            const yearSelect: HTMLSelectElement = this.generateYearSelect();
            this.yearSelect.parentNode.replaceChild(yearSelect, this.yearSelect);
            this.yearSelect = yearSelect;
        }

        this.monthSelect.value = month.getMonth().toString(10);
        this.yearSelect.value = month.getFullYear().toString(10);
    }

}
