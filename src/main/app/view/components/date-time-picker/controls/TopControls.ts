import DatePicker from "../date-picker/DatePicker";
import SliderUtils from "../utils/SliderUtils";
import { CONTROLS_TOP_CLASS, NAVIGATION_CLASS, NAVIGATION_CLASS_DISABLED, NAVIGATION_CLASS_TO_TOP } from "./index";

// TODO Implement ILayout interface with getLayout() method?
export default class TopControls {
    private static readonly MONTHS_NAMES: string[] = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    private static readonly YEARS_OFFSET: number = 5;

    private static readonly SELECT_CLASS = "picker__chooser";
    private static readonly NAVIGATION_CLASS = "picker__navigation";

    private readonly datePicker: DatePicker;
    private readonly dateSlider: any;

    private layout: HTMLElement;

    private previousTimeControl: HTMLButtonElement;

    private monthSelect: HTMLSelectElement;
    private yearSelect: HTMLSelectElement;
    private previousDateButton: HTMLButtonElement;
    private nextDateButton: HTMLButtonElement;

    public constructor(datePicker: DatePicker, dateSlider: any, timeSlider: any) {
        this.datePicker = datePicker;
        this.dateSlider = dateSlider;

        this.previousTimeControl = SliderUtils.getPreviousButton(timeSlider);
        this.previousTimeControl.classList.add(
            NAVIGATION_CLASS,
            NAVIGATION_CLASS_DISABLED,
            NAVIGATION_CLASS_TO_TOP,
        );

        this.monthSelect = this.getMonthSelect();
        this.yearSelect = this.getYearSelect();
        this.previousDateButton = SliderUtils.getPreviousButton(this.dateSlider);
        this.previousDateButton.classList.add(
            "picker__navigation",
            "picker__navigation_to-left",
        );
        this.nextDateButton = SliderUtils.getNextButton(this.dateSlider);
        this.nextDateButton.classList.add(
            TopControls.NAVIGATION_CLASS,
            "date-picker__navigation_to-right",
        );

        this.layout = document.createElement("div");
        this.layout.classList.add(CONTROLS_TOP_CLASS);
        this.layout.appendChild(this.getDateControls());
        this.layout.appendChild(this.previousTimeControl);
    }

    public getLayout(): HTMLElement {
        return this.layout;
    }

    public getDateControls(): HTMLElement {
        const dateControls: HTMLDivElement = document.createElement("div");
        dateControls.classList.add("date-picker__controls");
        dateControls.appendChild(this.previousDateButton);
        dateControls.appendChild(this.monthSelect);
        dateControls.appendChild(this.yearSelect);
        dateControls.appendChild(this.nextDateButton);

        return dateControls;
    }

    public updateSelects(month: Date) {
        // TODO Remove if?
        if (this.yearSelect.parentNode) {
            const yearSelect: HTMLSelectElement = this.getYearSelect();
            this.yearSelect.parentNode.replaceChild(yearSelect, this.yearSelect);
            this.yearSelect = yearSelect;
        }

        this.monthSelect.value = month.getMonth().toString(10);
        this.yearSelect.value = month.getFullYear().toString(10);
    }

    public getPreviousTimeControl(): HTMLElement {
        return this.previousTimeControl;
    }

    private getMonthSelect(): HTMLSelectElement {
        const monthSelect: HTMLSelectElement = document.createElement("select");
        monthSelect.classList.add(TopControls.SELECT_CLASS);
        TopControls.MONTHS_NAMES.forEach((monthName, monthIndex) => {
            monthSelect.options.add(this.getMonthOption(monthName, monthIndex));
        });
        monthSelect.addEventListener("change", () => {
            this.datePicker.changeMonthOfTheYear(parseInt(monthSelect.value, 10));
        });

        return monthSelect;
    }

    private getMonthOption(monthName: string, monthIndex: number): HTMLOptionElement {
        const option: HTMLOptionElement = document.createElement("option");
        option.value = monthIndex.toString();
        option.text = monthName;
        if (this.datePicker.sameMonthOfTheYear(monthIndex)) {
            option.selected = true;
        }

        return option;
    }

    private getYearSelect(): HTMLSelectElement {
        const yearSelect: HTMLSelectElement = document.createElement("select");
        yearSelect.classList.add(TopControls.SELECT_CLASS);
        this.getSelectableYears().forEach((year) => {
            yearSelect.options.add(this.getYearOption(year));
        });
        yearSelect.addEventListener("change", () => {
            this.datePicker.changeYear(parseInt(yearSelect.value, 10));
        });

        return yearSelect;
    }

    private getSelectableYears(): string[] {
        const minYear: number = this.datePicker.getMonth().getFullYear() - TopControls.YEARS_OFFSET;
        const maxYear: number = this.datePicker.getMonth().getFullYear() + TopControls.YEARS_OFFSET;
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
        if (this.datePicker.sameYear(parseInt(year, 10))) {
            option.selected = true;
        }

        return option;
    }

}
