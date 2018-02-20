import CLASS_NAMES from "../../constants/class-names";
import IPicker from "./IPicker";
import IPickerObserver from "./observers/IPickerObserver";

// TODO Delete? Use only PickerStore class?
// TODO Rename to ButtonsPicker?
export default abstract class DirectPicker<T> implements IPicker<T>, IPickerObserver {

    protected buttons: HTMLButtonElement[];

    private readonly values: T[];
    private picked: boolean;
    private pickedValue: T;
    private disabledValues: T[] = [];
    private pickerObservers: IPickerObserver[] = [];

    public constructor(values: T[]) {
        this.values = values;
        this.picked = false;

        this.pickerObservers.push(this);
    }

    public abstract getRepresentation(value: T): string;

    public abstract getLayout(): HTMLElement;

    public isPicked(): boolean {
        return this.picked;
    }

    public getPickedValue(): T {
        return this.pickedValue;
    }

    public onPick(index: number) {
        this.buttons.forEach((button) => button.classList.remove(CLASS_NAMES.PICK_CONTROL.PICKED));
        this.buttons[index].classList.add(CLASS_NAMES.PICK_CONTROL.PICKED);
    }

    public onUnpick() {
        this.buttons.forEach((button) => button.classList.remove(CLASS_NAMES.PICK_CONTROL.PICKED));
    }

    public addPickerObserver(pickerObserver: IPickerObserver): void {
        this.pickerObservers.push(pickerObserver);
    }

    public removePickerObserver(pickerObserver: IPickerObserver): void {
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
        this.disableButtons(disabledIndices);
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

    public generateButtons() {
        this.buttons = this.values.map((value) => this.produceButton(this, value));
    }

    public disableButtons(indices: number[]) {
        this.buttons.forEach((button) => button.classList.remove(CLASS_NAMES.PICK_CONTROL.DISABLED));
        indices.forEach((index) => this.buttons[index].classList.add(CLASS_NAMES.PICK_CONTROL.DISABLED));
    }

    protected produceButton(picker: DirectPicker<T>, value: T): HTMLButtonElement {
        const button: HTMLButtonElement = document.createElement("button");
        button.tabIndex = 0;
        button.textContent = picker.getRepresentation(value);
        button.onclick = () => picker.pick(value);
        button.classList.add(CLASS_NAMES.PICK_CONTROL.MAIN);

        return button;
    }

    protected abstract valuesEquals(value1: T, value2: T): boolean;

}
