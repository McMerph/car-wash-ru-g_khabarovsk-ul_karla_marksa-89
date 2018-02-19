import DateUtils from "../../../../../model/utils/DateUtils";
import ButtonsPickerLayout from "../../ButtonsPickerLayout";
import ButtonsUtils from "../../utils/ButtonsUtils";
import DateOfMonthPicker from "./DateOfMonthPicker";
import IWeek from "./IWeek";
import WeeksProducer from "./WeeksProducer";

export default class DateOfMonthPickerLayout extends ButtonsPickerLayout<Date> {

    private static readonly PAST_CLASS: string = "pick-control_past";
    private static readonly TODAY_CLASS: string = "pick-control_today";
    private static readonly DATES_CLASS: string = "date-picker__dates";
    private static readonly CELL_CLASS: string = "date-picker__cell";
    private static readonly DAY_CELL_CLASS: string = "date-picker__cell_day";
    private static readonly DATE_CELL_CLASS: string = "date-picker__cell_date";

    private month: Date;

    public constructor(picker: DateOfMonthPicker, month: Date) {
        super(picker);
        this.month = month;
    }

    public getLayout(): HTMLElement {
        const layout: HTMLDivElement = document.createElement("div");
        layout.classList.add("date-picker__month");

        layout.appendChild(this.getMonthHeader());
        const weeks: IWeek[] = new WeeksProducer(this.month).getWeeks();
        const dates: HTMLDivElement = document.createElement("div");
        dates.classList.add(DateOfMonthPickerLayout.DATES_CLASS);
        weeks.forEach((week) => dates.appendChild(this.getWeekLayout(week)));
        layout.appendChild(dates);

        return layout;
    }

    protected produceButton(picker: DateOfMonthPicker, date: Date): HTMLButtonElement {
        const button: HTMLButtonElement = super.produceButton(picker, date);
        button.classList.add("pick-control_date");
        if (this.picker.isDisabled(date)) {
            ButtonsUtils.disableButtons(button);
        }
        if (DateUtils.isPast(date)) {
            button.classList.add(DateOfMonthPickerLayout.PAST_CLASS);
        }
        if (DateUtils.equalsDateOfMonth(date, new Date())) {
            button.classList.add(DateOfMonthPickerLayout.TODAY_CLASS);
        }

        return button;
    }

    private getMonthHeader(): HTMLElement {
        const header: HTMLElement = document.createElement("header");
        header.classList.add("date-picker__month-header");
        ["пн", "вт", "ср", "чт", "пт", "сб", "вс"].forEach((dayName) => {
            const cell: HTMLDivElement = document.createElement("div");
            cell.classList.add(DateOfMonthPickerLayout.CELL_CLASS, DateOfMonthPickerLayout.DAY_CELL_CLASS);
            cell.appendChild(document.createTextNode(dayName));
            header.appendChild(cell);
        });
        return header;
    }

    private getWeekLayout(week: IWeek): HTMLElement {
        const weekLayout: HTMLDivElement = document.createElement("div");
        weekLayout.classList.add("date-picker__week");
        for (let i = 1; i <= 7; i++) {
            weekLayout.appendChild(this.getDayLayout(week, i));
        }

        return weekLayout;
    }

    private getDayLayout(week: IWeek, day: number): HTMLDivElement {
        const dayLayout: HTMLDivElement = document.createElement("div");
        dayLayout.classList.add(DateOfMonthPickerLayout.CELL_CLASS, DateOfMonthPickerLayout.DATE_CELL_CLASS);
        const isDayExists: boolean = (week.startDay <= day) && (week.endDay >= day);
        if (isDayExists) {
            dayLayout.appendChild(this.buttons[week.startDate - week.startDay + day - 1]);
        } else {
            dayLayout.setAttribute("aria-label", "Данный день не из выбранного месяца");
        }

        return dayLayout;
    }

}
