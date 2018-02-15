import ButtonsPickerLayout from "./ButtonsPickerLayout";
import Picker from "./Picker";
import PickerObserver from "./PickerObserver";

// TODO Delete? Use only PickerStore class?
// TODO Rename to ButtonsPicker?
export default abstract class DirectPicker<T> implements Picker<T> {

    protected layout: ButtonsPickerLayout<T>;

    private readonly values: T[];

    private picked: boolean;
    private pickedValue: T;
    private disabledValues: T[] = [];

    private pickerObservers: PickerObserver[] = [];

    public abstract getRepresentation(value: T): string;

    protected abstract valuesEquals(value1: T, value2: T): boolean;

    public constructor(values: T[]) {
        this.values = values;
        this.picked = false;
    }

    public addPickerObserver(pickerObserver: PickerObserver): void {
        this.pickerObservers.push(pickerObserver);
    }

    public removePickerObserver(pickerObserver: PickerObserver): void {
        const index: number = this.pickerObservers.indexOf(pickerObserver);
        this.pickerObservers.splice(index, 1);
    }

    public pick(valueToPick: T): void {
        const index: number = this.indexOf(valueToPick);
        if (index !== -1 && !this.isDisabled(valueToPick)) {
            this.picked = true;
            this.pickedValue = valueToPick;
            this.pickerObservers.forEach((observer) => observer.onPick(index));
        }
    }

    public pickByIndex(index: number): void {
        this.pick(this.values[index]);
    }

    public unPick(): void {
        this.picked = false;
        this.pickerObservers.forEach((observer) => observer.onUnpick());
    }

    public disable(values: T[]) {
        this.disabledValues = values;
        if (this.isPicked() && this.isDisabled(this.getPickedValue())) {
            this.unPick();
        }
        const disabledIndices = this.disabledValues
            .map((valueToDisable) => this.indexOf(valueToDisable))
            .filter((index) => index !== -1);
        this.layout.disable(disabledIndices);
    }

    public getValues(): T[] {
        return this.values;
    }

    public isPicked(): boolean {
        return this.picked;
    }

    public getPickedValue(): T {
        return this.pickedValue;
    }

    public getDisabledValues(): T[] {
        return this.disabledValues;
    }

    public indexOf(value: T): number {
        let index: number = -1;
        for (let i = 0; i < this.values.length; i++) {
            if (this.valuesEquals(this.values[i], value)) {
                index = i;
            }
        }

        return index;
    }

    public isDisabled(valueToCheck: T): boolean {
        return this.disabledValues.some((value) => this.valuesEquals(value, valueToCheck));
    }

    public getLayout(): HTMLElement {
        return this.layout.getLayout();
    }

}
