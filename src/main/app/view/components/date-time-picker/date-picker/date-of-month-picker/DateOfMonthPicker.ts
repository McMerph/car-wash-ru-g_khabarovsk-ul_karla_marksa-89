import AvailabilityHandler from "../../../../../model/AvailabilityHandler";
import DateUtils from "../../../../../model/utils/DateUtils";
import CLASS_NAMES from "../../../../constants/class-names";
import DICTIONARY from "../../../../constants/dictionary";
import DateTimePickerState from "../../DateTimePickerState";
import DirectPicker from "../../DirectPicker";
import IWeek from "./IWeek";
import WeeksProducer from "./WeeksProducer";

export default class DateOfMonthPicker extends DirectPicker<Date> {

    private static getDatesOfMonth(month: Date): Date[] {
        const dates: Date[] = [];
        for (let i = 0; i < DateUtils.getLastDateOfMonth(month).getDate(); i++) {
            dates.push(new Date(month.getFullYear(), month.getMonth(), i + 1));
        }

        return dates;
    }

    private month: Date;
    private dateTimePickerState: DateTimePickerState;

    public constructor(month: Date, dateTimePickerState: DateTimePickerState) {
        super(DateOfMonthPicker.getDatesOfMonth(month));
        this.month = month;
        this.dateTimePickerState = dateTimePickerState;

        const availabilityHandler: AvailabilityHandler = dateTimePickerState.getAvailabilityHandler();
        this.disable(DateOfMonthPicker.getDatesOfMonth(month)
            .filter((dateOfMonth) => availabilityHandler.isDisabledDate(dateOfMonth.valueOf())));
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

    public pick(dateOfMonth: Date): void {
        super.pick(dateOfMonth);
        this.dateTimePickerState.setDate(dateOfMonth);
    }

    protected getRepresentation(dateOfMonth: Date): string {
        return dateOfMonth.getDate().toString();
    }

    protected produceButton(date: Date): HTMLButtonElement {
        const button: HTMLButtonElement = super.produceButton(date);
        button.classList.add(CLASS_NAMES.PICK_CONTROL.DATE);
        if (this.isDisabled(date)) {
            button.classList.add(CLASS_NAMES.PICK_CONTROL.DISABLED);
        }
        if (date && date.valueOf() < DateUtils.getTodayWithoutTime()) {
            button.classList.add(CLASS_NAMES.PICK_CONTROL.PAST);
        }
        if (DateUtils.equalsDateOfMonth(date, new Date())) {
            button.classList.add(CLASS_NAMES.PICK_CONTROL.TODAY);
        }

        return button;
    }

    protected valuesEquals(dateOfMonth1: Date, dateOfMonth2: Date): boolean {
        return DateUtils.equalsDateOfMonth(dateOfMonth1, dateOfMonth2);
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
