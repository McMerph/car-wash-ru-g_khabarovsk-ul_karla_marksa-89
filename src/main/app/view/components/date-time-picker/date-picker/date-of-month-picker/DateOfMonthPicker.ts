import AvailabilityHandler from "../../../../../model/AvailabilityHandler";
import DateUtils from "../../../../../model/utils/DateUtils";
import DirectPicker from "../../DirectPicker";
import IDateOfMonthObserver from "../../observers/IDateOfMonthObserver";
import DateOfMonthPickerLayout from "./DateOfMonthPickerLayout";

// TODO Merge with DateOfMonthPickerLayout?
export default class DateOfMonthPicker extends DirectPicker<Date> {

    // TODO Move to parent class?
    private dateOfMonthObservers: IDateOfMonthObserver[] = [];

    public constructor(month: Date, availabilityHandler: AvailabilityHandler) {
        // TODO Move DateUtils.getDatesOfMonth(month) to new instance creation method?
        super(DateUtils.getDatesOfMonth(month));
        this.layout = new DateOfMonthPickerLayout(this, month);
        this.layout.generateButtons();
        this.disable(DateUtils.getDatesOfMonth(month)
            .filter((dateOfMonth) => availabilityHandler.isDisabledDate(dateOfMonth.valueOf())));
    }

    public getRepresentation(dateOfMonth: Date): string {
        return dateOfMonth.getDate().toString();
    }

    public pick(dateOfMonth: Date): void {
        super.pick(dateOfMonth);
        this.dateOfMonthObservers.forEach((observer) => observer.onDateOfMonthPick());
    }

    public addDateOfMonthObserver(observer: IDateOfMonthObserver): void {
        this.dateOfMonthObservers.push(observer);
    }

    public removeDateOfMonthObserver(observer: IDateOfMonthObserver): void {
        const index: number = this.dateOfMonthObservers.indexOf(observer);
        this.dateOfMonthObservers.splice(index, 1);
    }

    protected valuesEquals(dateOfMonth1: Date, dateOfMonth2: Date): boolean {
        return DateUtils.equalsDateOfMonth(dateOfMonth1, dateOfMonth2);
    }

}
