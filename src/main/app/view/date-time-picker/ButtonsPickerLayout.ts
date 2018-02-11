import DirectPicker from './DirectPicker';
import PickerStoreObserver from './PickerObserver';
import ButtonsUtils from './utils/ButtonsUtils';

// TODO Rename to ButtonsPickerLayout?
export default abstract class ButtonsPickerLayout<T> implements PickerStoreObserver {

    protected static readonly PICK_BUTTON_CLASS = 'pick';
    protected static readonly PICKED_CLASS = 'picked';

    protected picker: DirectPicker<T>;
    protected buttons: HTMLButtonElement[];

    public abstract getLayout(): HTMLElement;

    public constructor(picker: DirectPicker<T>) {
        this.picker = picker;
        picker.addPickerObserver(this);
    }

    public onPick(index: number) {
        this.buttons.forEach((button) => button.classList.remove(ButtonsPickerLayout.PICKED_CLASS));
        this.buttons[index].classList.add(ButtonsPickerLayout.PICKED_CLASS);
    }

    public onUnpick() {
        this.buttons.forEach((button) => button.classList.remove(ButtonsPickerLayout.PICKED_CLASS));
    }

    public generateButtons() {
        this.buttons = this.picker.getValues().map((value) => this.produceButton(this.picker, value));
    }

    public disable(indices: number[]) {
        ButtonsUtils.enableButtons(...this.buttons);
        ButtonsUtils.disableButtons(...indices.map((index) => this.buttons[index]));
    }

    protected produceButton(picker: DirectPicker<T>, value: T): HTMLButtonElement {
        const button: HTMLButtonElement = document.createElement('button');
        button.tabIndex = 0;
        button.textContent = picker.getRepresentation(value);
        button.onclick = () => picker.pick(value);
        button.classList.add(ButtonsPickerLayout.PICK_BUTTON_CLASS);

        return button;
    }

}