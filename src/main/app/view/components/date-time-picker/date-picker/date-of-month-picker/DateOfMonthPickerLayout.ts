import DateUtils from "../../../../../model/utils/DateUtils";
import CLASS_NAMES from "../../../../constants/class-names";
import DICTIONARY from "../../../../constants/dictionary";
import ButtonsPickerLayout from "../../ButtonsPickerLayout";
import ButtonsUtils from "../../utils/ButtonsUtils";
import DateOfMonthPicker from "./DateOfMonthPicker";
import IWeek from "./IWeek";
import WeeksProducer from "./WeeksProducer";

// TODO Merge with DateOfMonthPicker?
export default class DateOfMonthPickerLayout extends ButtonsPickerLayout<Date> {

    private month: Date;

    public constructor(picker: DateOfMonthPicker, month: Date) {
        super(picker);
        this.month = month;
    }

    public getLayout(): HTMLElement {
        const layout: HTMLDivElement = document.createElement("div");
        layout.classList.add(CLASS_NAMES.DATE_PICKER.MONTH);

        layout.appendChild(this.getMonthHeader());
        const weeks: IWeek[] = new WeeksProducer(this.month).getWeeks();
        const dates: HTMLDivElement = document.createElement("div");
        dates.classList.add(CLASS_NAMES.DATE_PICKER.DATES);
        weeks.forEach((week) => dates.appendChild(this.getWeekLayout(week)));
        layout.appendChild(dates);

        return layout;
    }

    protected produceButton(picker: DateOfMonthPicker, date: Date): HTMLButtonElement {
        const button: HTMLButtonElement = super.produceButton(picker, date);
        button.classList.add(CLASS_NAMES.PICK_CONTROL.DATE);
        if (this.picker.isDisabled(date)) {
            ButtonsUtils.disableButtons(button);
        }
        if (DateUtils.isPast(date)) {
            button.classList.add(CLASS_NAMES.PICK_CONTROL.PAST);
        }
        if (DateUtils.equalsDateOfMonth(date, new Date())) {
            button.classList.add(CLASS_NAMES.PICK_CONTROL.TODAY);
        }

        return button;
    }

    private getMonthHeader(): HTMLElement {
        const header: HTMLElement = document.createElement("header");
        header.classList.add(CLASS_NAMES.DATE_PICKER.MONTH_HEADER);
        DICTIONARY.DAYS_NAMES.forEach((dayName) => {
            const cell: HTMLDivElement = document.createElement("div");
            cell.classList.add(
                CLASS_NAMES.DATE_PICKER.CELL.MAIN,
                CLASS_NAMES.DATE_PICKER.CELL.DAY,
            );
            cell.appendChild(document.createTextNode(dayName));
            header.appendChild(cell);
        });
        return header;
    }

    private getWeekLayout(week: IWeek): HTMLElement {
        const weekLayout: HTMLDivElement = document.createElement("div");
        weekLayout.classList.add(CLASS_NAMES.DATE_PICKER.WEEK);
        for (let i = 1; i <= 7; i++) {
            weekLayout.appendChild(this.getDayLayout(week, i));
        }

        return weekLayout;
    }

    private getDayLayout(week: IWeek, day: number): HTMLDivElement {
        const dayLayout: HTMLDivElement = document.createElement("div");
        dayLayout.classList.add(
            CLASS_NAMES.DATE_PICKER.CELL.MAIN,
            CLASS_NAMES.DATE_PICKER.CELL.DATE,
        );
        const isDayExists: boolean = (week.startDay <= day) && (week.endDay >= day);
        if (isDayExists) {
            dayLayout.appendChild(this.buttons[week.startDate - week.startDay + day - 1]);
        } else {
            dayLayout.setAttribute("aria-label", DICTIONARY.DATE_IS_NOT_IN_THIS_MONTH);
        }

        return dayLayout;
    }

}
