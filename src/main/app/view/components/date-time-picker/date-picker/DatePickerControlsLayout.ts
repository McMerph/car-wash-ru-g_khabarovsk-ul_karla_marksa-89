import SliderUtils from "../utils/SliderUtils";
import DatePicker from "./DatePicker";

export default class DatePickerControlsLayout {
    private static readonly MONTHS_NAMES: string[] = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    private static readonly YEARS_OFFSET: number = 5;

    private static readonly SELECT_CLASS = "picker__chooser";
    private static readonly NAVIGATION_CLASS = "picker__navigation";

    private readonly picker: DatePicker;

    private slider: any;
    private monthSelect: HTMLSelectElement;
    private yearSelect: HTMLSelectElement;
    private previousButton: HTMLButtonElement;
    private nextButton: HTMLButtonElement;

    public constructor(picker: DatePicker, slider: any) {
        this.picker = picker;
        this.slider = slider;

        this.monthSelect = this.getMonthSelect();
        this.yearSelect = this.getYearSelect();
        this.previousButton = SliderUtils.getPreviousButton(this.slider);
        this.previousButton.classList.add(
            "picker__navigation",
            "picker__navigation_to-left",
        );
        this.nextButton = SliderUtils.getNextButton(this.slider);
        this.nextButton.classList.add(
            DatePickerControlsLayout.NAVIGATION_CLASS,
            "date-picker__navigation_to-right",
        );
    }

    public getLayout(): HTMLElement {
        const controls: HTMLDivElement = document.createElement("div");
        controls.classList.add("date-picker__controls");
        controls.appendChild(this.previousButton);
        controls.appendChild(this.monthSelect);
        controls.appendChild(this.yearSelect);
        controls.appendChild(this.nextButton);

        return controls;
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

    private getMonthSelect(): HTMLSelectElement {
        const monthSelect: HTMLSelectElement = document.createElement("select");
        monthSelect.classList.add(DatePickerControlsLayout.SELECT_CLASS);
        DatePickerControlsLayout.MONTHS_NAMES.forEach((monthName, monthIndex) => {
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
        yearSelect.classList.add(DatePickerControlsLayout.SELECT_CLASS);
        this.getSelectableYears().forEach((year) => {
            yearSelect.options.add(this.getYearOption(year));
        });
        yearSelect.addEventListener("change", () => {
            this.picker.changeYear(parseInt(yearSelect.value, 10));
        });

        return yearSelect;
    }

    private getSelectableYears(): string[] {
        const minYear: number = this.picker.getMonth().getFullYear() - DatePickerControlsLayout.YEARS_OFFSET;
        const maxYear: number = this.picker.getMonth().getFullYear() + DatePickerControlsLayout.YEARS_OFFSET;
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
