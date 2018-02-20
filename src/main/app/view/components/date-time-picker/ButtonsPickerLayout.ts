import CLASS_NAMES from "../../constants/class-names";
import DirectPicker from "./DirectPicker";
import IPickerObserver from "./observers/IPickerObserver";
import ButtonsUtils from "./utils/ButtonsUtils";

// TODO Rename to PickerLayout? ButtonsPicker?
export default abstract class ButtonsPickerLayout<T> implements IPickerObserver {

    protected picker: DirectPicker<T>;
    protected buttons: HTMLButtonElement[];

    public constructor(picker: DirectPicker<T>) {
        this.picker = picker;
        picker.addPickerObserver(this);
    }

    public abstract getLayout(): HTMLElement;

    public onPick(index: number) {
        this.buttons.forEach((button) => button.classList.remove(CLASS_NAMES.PICK_CONTROL.PICKED));
        this.buttons[index].classList.add(CLASS_NAMES.PICK_CONTROL.PICKED);
    }

    public onUnpick() {
        this.buttons.forEach((button) => button.classList.remove(CLASS_NAMES.PICK_CONTROL.PICKED));
    }

    public generateButtons() {
        this.buttons = this.picker.getValues().map((value) => this.produceButton(this.picker, value));
    }

    public disable(indices: number[]) {
        ButtonsUtils.enableButtons(...this.buttons);
        ButtonsUtils.disableButtons(...indices.map((index) => this.buttons[index]));
    }

    protected produceButton(picker: DirectPicker<T>, value: T): HTMLButtonElement {
        const button: HTMLButtonElement = document.createElement("button");
        button.tabIndex = 0;
        button.textContent = picker.getRepresentation(value);
        button.onclick = () => picker.pick(value);
        button.classList.add(CLASS_NAMES.PICK_CONTROL.MAIN);

        return button;
    }

}
