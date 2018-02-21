import CLASS_NAMES from "../../../constants/class-names";
import DICTIONARY from "../../../constants/dictionary";
import SETTINGS from "../../../constants/settings";
import DateTimePickerState from "../DateTimePickerState";
import IMonthObserver from "../observers/IMonthObserver";
import Slider from "../Slider";

// TODO Extend SliderUtils class?
export default class DateSlider extends Slider implements IMonthObserver {

    private readonly dateTimePickerState: DateTimePickerState;

    private monthChooser: HTMLSelectElement;
    private yearChooser: HTMLSelectElement;

    public constructor(dateTimePickerState: DateTimePickerState) {
        super({
            grabCursor: true,
            spaceBetween: SETTINGS.SPACE_BETWEEN_MONTHS_SLIDES,
        });
        this.dateTimePickerState = dateTimePickerState;

        this.monthChooser = this.generateMonthChooser();
        this.yearChooser = this.generateYearChooser();
        this.handleSlideChangeTransitionEnd();
        this.dateTimePickerState.addMonthObserver(this);
    }

    public onMonthChange(): void {
        this.updateSelects();
    }

    public getMonthChooser(): HTMLElement {
        return this.monthChooser;
    }

    public getYearChooser(): HTMLSelectElement {
        return this.yearChooser;
    }

    protected generatePreviousControl(): HTMLElement {
        const previousControl = super.generatePreviousControl();
        previousControl.classList.add(
            CLASS_NAMES.NAVIGATION.MAIN,
            CLASS_NAMES.NAVIGATION.TO_LEFT,
        );

        return previousControl;
    }

    protected generateNextControl(): HTMLElement {
        const nextControl = super.generateNextControl();
        nextControl.classList.add(
            CLASS_NAMES.NAVIGATION.MAIN,
            CLASS_NAMES.NAVIGATION.TO_RIGHT,
        );

        return nextControl;
    }

    private updateSelects() {
        // TODO Remove if?
        if (this.yearChooser.parentNode) {
            const yearChooser: HTMLSelectElement = this.generateYearChooser();
            this.yearChooser.parentNode.replaceChild(yearChooser, this.yearChooser);
            this.yearChooser = yearChooser;
        }

        this.monthChooser.value = this.dateTimePickerState.getMonth().getMonth().toString(10);
        this.yearChooser.value = this.dateTimePickerState.getMonth().getFullYear().toString(10);
    }

    private sameYear(year: number): boolean {
        return this.dateTimePickerState.getMonth().getFullYear() === year;
    }

    private sameMonthOfTheYear(monthIndex: number): boolean {
        return this.dateTimePickerState.getMonth().getMonth() === monthIndex;
    }

    private changeMonthOfTheYear(monthIndex: number): void {
        this.dateTimePickerState.setMonth(new Date(this.dateTimePickerState.getMonth().getFullYear(), monthIndex));
    }

    private changeYear(year: number): void {
        this.dateTimePickerState.setMonth(new Date(year, this.dateTimePickerState.getMonth().getMonth()));
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
        const minYear: number = this.dateTimePickerState.getMonth().getFullYear() - SETTINGS.YEARS_OFFSET;
        const maxYear: number = this.dateTimePickerState.getMonth().getFullYear() + SETTINGS.YEARS_OFFSET;
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

    private handleSlideChangeTransitionEnd() {
        this.getSlider().on("slideChangeTransitionEnd", () => {
            if (this.getSlider().activeIndex === 0) {
                this.dateTimePickerState.previousMonth();
            } else if (this.getSlider().activeIndex === 2) {
                this.dateTimePickerState.nextMonth();
            }
        });
    }

}
