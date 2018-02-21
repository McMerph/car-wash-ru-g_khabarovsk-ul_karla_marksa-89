import * as Slider from "swiper/dist/js/swiper.min.js";
import CLASS_NAMES from "../../../constants/class-names";
import DICTIONARY from "../../../constants/dictionary";
import SETTINGS from "../../../constants/settings";
import MonthHandler from "../MonthHandler";
import IMonthObserver from "../observers/IMonthObserver";
import SliderUtils from "../utils/SliderUtils";

// TODO Extend SliderUtils class?
export default class DateSlider implements IMonthObserver {

    private readonly slider: any;
    private readonly sliderContainer: HTMLElement;
    private readonly monthHandler: MonthHandler;

    private monthChooser: HTMLSelectElement;
    private yearChooser: HTMLSelectElement;
    private previousControl: HTMLElement;
    private nextControl: HTMLElement;

    // private blockSlideChangeTransitionEnd: boolean = false;

    // TODO Use it?
    private block: boolean = false;

    public setBlock(): void {
        this.block = true;
    }

    public unSetBlock(): void {
        this.block = false;
    }

    public constructor(monthHandler: MonthHandler) {
        this.monthHandler = monthHandler;
        monthHandler.addMonthObserver(this);
        this.sliderContainer = SliderUtils.getContainer();
        this.slider = this.generateSlider();
        this.monthChooser = this.generateMonthChooser();
        this.yearChooser = this.generateYearChooser();
        this.previousControl = this.generatePreviousControl();
        this.nextControl = this.generateNextControl();

        // this.handleSlideChange();
        this.handleSlideChangeTransitionEnd();
    }

    public onMonthChange(): void {
        this.updateSelects();
    }

    private updateSelects() {
        // TODO Remove if?
        if (this.yearChooser.parentNode) {
            const yearChooser: HTMLSelectElement = this.generateYearChooser();
            this.yearChooser.parentNode.replaceChild(yearChooser, this.yearChooser);
            this.yearChooser = yearChooser;
        }

        this.monthChooser.value = this.monthHandler.getMonth().getMonth().toString(10);
        this.yearChooser.value = this.monthHandler.getMonth().getFullYear().toString(10);
    }

    public appendSlide(node: Node): void {
        this.slider.appendSlide(SliderUtils.getSlide(node));
    }

    public getSlider(): any {
        return this.slider;
    }

    public getSliderContainer(): HTMLElement {
        return this.sliderContainer;
    }

    public getMonthChooser(): HTMLElement {
        return this.monthChooser;
    }

    public getYearChooser(): HTMLSelectElement {
        return this.yearChooser;
    }

    public getPreviousControl(): HTMLElement {
        return this.previousControl;
    }

    public getNextControl(): HTMLElement {
        return this.nextControl;
    }

    private sameYear(year: number): boolean {
        return this.monthHandler.getMonth().getFullYear() === year;
    }

    private sameMonthOfTheYear(monthIndex: number): boolean {
        return this.monthHandler.getMonth().getMonth() === monthIndex;
    }

    private changeMonthOfTheYear(monthIndex: number): void {
        this.monthHandler.setMonth(new Date(this.monthHandler.getMonth().getFullYear(), monthIndex));
    }

    private changeYear(year: number): void {
        this.monthHandler.setMonth(new Date(year, this.monthHandler.getMonth().getMonth()));
    }

    private generateSlider(): any {
        return new Slider(this.sliderContainer, {
            grabCursor: true,
            spaceBetween: SETTINGS.SPACE_BETWEEN_MONTHS_SLIDES,
        });
    }

    private generateMonthChooser(): HTMLSelectElement {
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

    private generateYearChooser(): HTMLSelectElement {
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
        const minYear: number = this.monthHandler.getMonth().getFullYear() - SETTINGS.YEARS_OFFSET;
        const maxYear: number = this.monthHandler.getMonth().getFullYear() + SETTINGS.YEARS_OFFSET;
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
        const previousControl = SliderUtils.getPreviousControl(this.slider);
        previousControl.classList.add(
            CLASS_NAMES.NAVIGATION.MAIN,
            CLASS_NAMES.NAVIGATION.TO_LEFT,
        );

        return previousControl;
    }

    private generateNextControl(): HTMLElement {
        const nextControl = SliderUtils.getNextControl(this.slider);
        nextControl.classList.add(
            CLASS_NAMES.NAVIGATION.MAIN,
            CLASS_NAMES.NAVIGATION.TO_RIGHT,
        );

        return nextControl;
    }

    // private handleSlideChange() {
    //     this.slider.on("slideChange", () => {
    //         if (!this.block) {
    //             console.log("slideChange()");
    //             this.blockSlideChangeTransitionEnd = false;
    //             if (this.slider.activeIndex === 0) {
    //                 this.updateSelects(this.monthHandler.getPreviousMonth());
    //             } else if (this.slider.activeIndex === 1) {
    //                 this.updateSelects(this.monthHandler.getMonth());
    //             } else if (this.slider.activeIndex === 2) {
    //                 this.updateSelects(this.monthHandler.getNextMonth());
    //             }
    //         }
    //     });
    // }

    private handleSlideChangeTransitionEnd() {
        this.slider.on("slideChangeTransitionEnd", () => {
            if (!this.block) {
                console.log("slideChangeTransitionEnd()");
                console.log(this.monthHandler.getMonth());

                // if (!this.blockSlideChangeTransitionEnd) {
                // this.blockSlideChangeTransitionEnd = true;
                if (this.slider.activeIndex === 0) {
                    this.monthHandler.previous();
                } else if (this.slider.activeIndex === 2) {
                    this.monthHandler.next();
                }
            }
            // }
        });
    }

}
