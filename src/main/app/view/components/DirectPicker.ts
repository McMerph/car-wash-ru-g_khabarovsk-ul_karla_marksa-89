import CLASS_NAMES from "../constants/ClassNames";
import ILayout from "./ILayout";

export default abstract class DirectPicker<T> implements ILayout {

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

    // TODO Return index?
    public pick(value: T): void {
        const index: number = this.indexOf(value);
        if (index !== -1 && !this.isDisabled(value)) {
            this.picked = true;
            this.pickedValue = value;
            this.buttons.forEach((button) => button.classList.remove(CLASS_NAMES.PICK_CONTROL_BLOCK.MODIFIERS.PICKED));
            this.buttons[index].classList.add(CLASS_NAMES.PICK_CONTROL_BLOCK.MODIFIERS.PICKED);
        }
    }

    public disable(values: T[]): boolean {
        this.disabledValues = values;
        if (this.picked && this.isDisabled(this.pickedValue)) {
            this.picked = false;
            this.buttons.forEach((button) => button.classList.remove(CLASS_NAMES.PICK_CONTROL_BLOCK.MODIFIERS.PICKED));
        }
        const disabledIndices = this.disabledValues
            .map((valueToDisable) => this.indexOf(valueToDisable))
            .filter((index) => index !== -1);
        this.disableButtons(disabledIndices);

        return this.picked;
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
        button.classList.add(CLASS_NAMES.PICK_CONTROL_BLOCK.NAME);

        return button;
    }

    private disableButtons(indices: number[]): void {
        this.buttons.forEach((button) =>
            button.classList.remove(CLASS_NAMES.PICK_CONTROL_BLOCK.MODIFIERS.DISABLED));
        indices.forEach((index) =>
            this.buttons[index].classList.add(CLASS_NAMES.PICK_CONTROL_BLOCK.MODIFIERS.DISABLED));
    }

}
