import AvailabilityHandler from '../../../../model/AvailabilityHandler';
import DateUtils from '../../../../model/utils/DateUtils';
import DateOfMonthObserver from '../../observers/DateOfMonthObserver';
import PickerValuesHandler from '../../PickerValuesHandler';
import ButtonsUtils from '../../utils/ButtonsUtils';

export default class DateOfMonthPickerValuesHandler extends PickerValuesHandler<Date> {

    private static readonly PAST_CLASS: string = 'past';
    private static readonly TODAY_CLASS: string = 'today';

    private availabilityHandler: AvailabilityHandler;
    private dateOfMonthObservers: DateOfMonthObserver[] = [];

    public constructor(month: Date, availabilityHandler: AvailabilityHandler) {
        super(DateUtils.getDatesOfMonth(month));
        this.availabilityHandler = availabilityHandler;
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

    protected getRepresentation(dateOfMonth: Date): string {
        return dateOfMonth.getDate().toString();
    }

    protected isDisabled(dateOfMonth: Date): boolean {
        return this.availabilityHandler.isDisabledDate(dateOfMonth.valueOf());
    }

    protected valuesEquals(dateOfMonth1: Date, dateOfMonth2: Date): boolean {
        return DateUtils.equalsDateOfMonth(dateOfMonth1, dateOfMonth2);
    }

    protected getPickButton(date: Date): HTMLButtonElement {
        const button: HTMLButtonElement = super.getPickButton(date);
        if (this.isDisabled(date)) {
            ButtonsUtils.disableButtons(button);
        }
        if (DateUtils.isPast(date)) {
            button.classList.add(DateOfMonthPickerValuesHandler.PAST_CLASS);
        }
        if (DateUtils.equalsDateOfMonth(date, new Date())) {
            button.classList.add(DateOfMonthPickerValuesHandler.TODAY_CLASS);
        }

        return button;
    }

}
