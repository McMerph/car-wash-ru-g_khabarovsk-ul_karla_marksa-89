import AvailabilityHandler from '../../../../model/AvailabilityHandler';
import DateUtils from '../../../../model/utils/DateUtils';
import DirectPicker from '../../DirectPicker';
import DateOfMonthObserver from '../../observers/DateOfMonthObserver';
import DateOfMonthPickerLayout from './DateOfMonthPickerLayout';

export default class DateOfMonthPicker extends DirectPicker<Date> {

    // TODO Move to parent class?
    private dateOfMonthObservers: DateOfMonthObserver[] = [];

    public constructor(month: Date, availabilityHandler: AvailabilityHandler) {
        super(DateUtils.getDatesOfMonth(month));
        this.layout = new DateOfMonthPickerLayout(this, month);
    }

    public getRepresentation(dateOfMonth: Date): string {
        return dateOfMonth.getDate().toString();
    }

    public pick(dateOfMonth: Date): void {
        super.pick(dateOfMonth);
        this.dateOfMonthObservers.forEach((observer) => observer.onDateOfMonthPick());
    }

    public addDateOfMonthObserver(observer: DateOfMonthObserver): void {
        this.dateOfMonthObservers.push(observer);
    }

    public removeDateOfMonthObserver(observer: DateOfMonthObserver): void {
        const index: number = this.dateOfMonthObservers.indexOf(observer);
        this.dateOfMonthObservers.splice(index, 1);
    }

    protected valuesEquals(dateOfMonth1: Date, dateOfMonth2: Date): boolean {
        return DateUtils.equalsDateOfMonth(dateOfMonth1, dateOfMonth2);
    }

}
