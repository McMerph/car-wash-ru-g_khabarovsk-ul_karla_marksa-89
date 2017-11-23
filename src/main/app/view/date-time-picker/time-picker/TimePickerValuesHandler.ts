import Time from '../../../model/Time';
import PickerValuesHandler from '../PickerValuesHandler';
import ButtonsUtils from '../utils/ButtonsUtils';

export default class TimePickerValuesHandler extends PickerValuesHandler<Time> {

    private disabledTimes: Time[] = [];

    public constructor(times: Time[]) {
        super(times);
    }

    public setDisabledTimes(disabledTimes: Time[]): void {
        this.disabledTimes = disabledTimes;

        ButtonsUtils.enableButtons(...this.getButtons());
        disabledTimes.forEach((valueToDisable) => {
            const index: number = this.indexOf(valueToDisable);
            if (index !== -1) {
                ButtonsUtils.disableButtons(this.getButtons()[index]);
            }
        });
        if (this.isPicked() && this.isDisabled(this.getPickedValue())) {
            this.unPick();
        }
    }

    protected getRepresentation(time: Time): string {
        return time.getRepresentation();
    }

    protected isDisabled(time: Time): boolean {
        return this.disabledTimes.some((disabledTime) => disabledTime.equals(time));
    }

    protected valuesEquals(time1: Time, time2: Time): boolean {
        return time1.equals(time2);
    }

}
