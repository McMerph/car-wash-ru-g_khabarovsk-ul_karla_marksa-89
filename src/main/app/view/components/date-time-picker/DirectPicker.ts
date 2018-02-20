import CLASS_NAMES from "../../constants/class-names";
import IPicker from "./IPicker";

export default abstract class DirectPicker<T> implements IPicker<T> {

    protected buttons: HTMLButtonElement[];

    private readonly values: T[];
    private picked: boolean = false;
    private pickedValue: T;
    private disabledValues: T[] = [];

    public constructor(values: T[]) {
        this.values = values;
        this.buttons = this.values.map((value) => this.produceButton(this, value));
    }

    public abstract getRepresentation(value: T): string;

    public abstract getLayout(): HTMLElement;

    public isPicked(): boolean {
        return this.picked;
    }

    public getPickedValue(): T {
        return this.pickedValue;
    }

    public pick(value: T): void {
        const index: number = this.indexOf(value);
        if (index !== -1 && !this.isDisabled(value)) {
            this.picked = true;
            this.pickedValue = value;
            this.buttons.forEach((button) => button.classList.remove(CLASS_NAMES.PICK_CONTROL.PICKED));
            this.buttons[index].classList.add(CLASS_NAMES.PICK_CONTROL.PICKED);
        }
    }

    public disable(values: T[]) {
        this.disabledValues = values;
        if (this.isPicked() && this.isDisabled(this.getPickedValue())) {
            this.picked = false;
            this.buttons.forEach((button) => button.classList.remove(CLASS_NAMES.PICK_CONTROL.PICKED));
        }
        const disabledIndices = this.disabledValues
            .map((valueToDisable) => this.indexOf(valueToDisable))
            .filter((index) => index !== -1);
        this.disableButtons(disabledIndices);
    }

    protected isDisabled(valueToCheck: T): boolean {
        return this.disabledValues.some((value) => this.valuesEquals(value, valueToCheck));
    }

    protected indexOf(value: T): number {
        let index: number = -1;
        for (let i = 0; i < this.values.length; i++) {
            if (this.valuesEquals(this.values[i], value)) {
                index = i;
            }
        }

        return index;
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

    private disableButtons(indices: number[]): void {
        this.buttons.forEach((button) => button.classList.remove(CLASS_NAMES.PICK_CONTROL.DISABLED));
        indices.forEach((index) => this.buttons[index].classList.add(CLASS_NAMES.PICK_CONTROL.DISABLED));
    }

}
