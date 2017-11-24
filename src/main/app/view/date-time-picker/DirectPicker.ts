import Picker from './Picker';
import PickerLayout from './PickerLayout';
import PickerObserver from './PickerObserver';

// TODO Delete? Use only PickerStore class?
export default abstract class DirectPicker<T> implements Picker<T> {

    protected layout: PickerLayout<T>;

    private readonly values: T[];

    private picked: boolean;
    private pickedValue: T;
    private disabled: T[] = [];

    private observers: PickerObserver[] = [];

    public abstract getRepresentation(value: T): string;

    protected abstract valuesEquals(value1: T, value2: T): boolean;

    public constructor(values: T[]) {
        this.values = values;
        this.picked = false;
    }

    public addObserver(observer: PickerObserver): void {
        this.observers.push(observer);
    }

    public removeObserver(observer: PickerObserver): void {
        const index: number = this.observers.indexOf(observer);
        this.observers.splice(index, 1);
    }

    public pick(valueToPick: T): void {
        const index: number = this.indexOf(valueToPick);

        // TODO Delete?
        console.log('valueToPick: ', valueToPick);

        // TODO Move to controller?
        if (index !== -1 && !this.isDisabled(valueToPick)) {
            this.picked = true;
            this.pickedValue = valueToPick;
            this.observers.forEach((observer) => observer.onPick(index));
        }
    }

    public pickByIndex(index: number): void {
        this.pick(this.values[index]);
    }

    public unPick(): void {
        this.picked = false;
        this.observers.forEach((observer) => observer.onUnpick());
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

    public setDisabled(disabled: T[]) {
        this.disabled = disabled;
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
        return this.disabled.some((value) => this.valuesEquals(value, valueToCheck));
    }

    public getLayout(): HTMLElement {
        return this.layout.getLayout();
    }

}
