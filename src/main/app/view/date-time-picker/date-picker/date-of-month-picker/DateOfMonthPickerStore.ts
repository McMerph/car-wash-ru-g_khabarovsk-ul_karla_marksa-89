import AvailabilityHandler from '../../../../model/AvailabilityHandler';
import DateUtils from '../../../../model/utils/DateUtils';
import DateOfMonthObserver from '../../observers/DateOfMonthObserver';
import PickerStore from '../../PickerStore';

export default class DateOfMonthPickerStore extends PickerStore<Date> {

    private availabilityHandler: AvailabilityHandler;

    // TODO Move to parent class?
    private dateOfMonthObservers: DateOfMonthObserver[] = [];

    public constructor(month: Date, availabilityHandler: AvailabilityHandler) {
        super(DateUtils.getDatesOfMonth(month));
        this.availabilityHandler = availabilityHandler;
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

    protected isDisabled(dateOfMonth: Date): boolean {
        return this.availabilityHandler.isDisabledDate(dateOfMonth.valueOf());
    }

    protected valuesEquals(dateOfMonth1: Date, dateOfMonth2: Date): boolean {
        return DateUtils.equalsDateOfMonth(dateOfMonth1, dateOfMonth2);
    }

}
