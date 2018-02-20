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
        this.buttons = this.values.map((value) => this.produceButton(value));
    }

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

    public getValues(): T[] {
        return this.values;
    }

    protected abstract getRepresentation(value: T): string;

    protected abstract valuesEquals(value1: T, value2: T): boolean;

    protected isDisabled(value: T): boolean {
        return this.disabledValues.some((v) => this.valuesEquals(value, v));
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

    protected produceButton(value: T): HTMLButtonElement {
        const button: HTMLButtonElement = document.createElement("button");
        button.tabIndex = 0;
        button.textContent = this.getRepresentation(value);
        button.onclick = () => this.pick(value);
        button.classList.add(CLASS_NAMES.PICK_CONTROL.MAIN);

        return button;
    }

    private disableButtons(indices: number[]): void {
        this.buttons.forEach((button) => button.classList.remove(CLASS_NAMES.PICK_CONTROL.DISABLED));
        indices.forEach((index) => this.buttons[index].classList.add(CLASS_NAMES.PICK_CONTROL.DISABLED));
    }

}
