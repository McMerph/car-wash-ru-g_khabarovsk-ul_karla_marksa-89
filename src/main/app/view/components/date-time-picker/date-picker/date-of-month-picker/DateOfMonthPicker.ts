import AvailabilityHandler from "../../../../../model/AvailabilityHandler";
import DateUtils from "../../../../../model/utils/DateUtils";
import CLASS_NAMES from "../../../../constants/class-names";
import DICTIONARY from "../../../../constants/dictionary";
import DirectPicker from "../../DirectPicker";
import IDateObserver from "../../observers/IDateObserver";
import IWeek from "./IWeek";
import WeeksProducer from "./WeeksProducer";

export default class DateOfMonthPicker extends DirectPicker<Date> {

    private month: Date;

    // TODO Move to parent class? Introduce DateHandler class?
    private dateObservers: IDateObserver[] = [];

    public constructor(month: Date, availabilityHandler: AvailabilityHandler) {
        // TODO Move DateUtils.getDatesOfMonth(month) to new instance creation method?
        super(DateUtils.getDatesOfMonth(month));
        this.month = month;

        this.disable(DateUtils.getDatesOfMonth(month)
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
        this.dateObservers.forEach((observer) => observer.onDatePick());
    }

    public addDateObserver(observer: IDateObserver): void {
        this.dateObservers.push(observer);
    }

    public removeDateObserver(observer: IDateObserver): void {
        const index: number = this.dateObservers.indexOf(observer);
        this.dateObservers.splice(index, 1);
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
        if (DateUtils.isPast(date)) {
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
