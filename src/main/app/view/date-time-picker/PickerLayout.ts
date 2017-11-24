import DirectPicker from './DirectPicker';
import PickerStoreObserver from './PickerStoreObserver';

export default abstract class PickerLayout<T> implements PickerStoreObserver {

    protected static readonly PICK_BUTTON_CLASS = 'pick';
    protected static readonly PICKED_CLASS = 'picked';

    protected buttons: HTMLButtonElement[];

    public constructor(picker: DirectPicker<T>) {
        picker.getValues().map((value) => this.produceButton(picker, value));
    }

    // TODO Not abstract?
    public abstract getLayout(): HTMLElement;

    public onPick(index: number) {
        this.buttons.forEach((button) => button.classList.remove(PickerLayout.PICKED_CLASS));
        this.buttons[index].classList.add(PickerLayout.PICKED_CLASS);
    }

    public onUnpick() {
        this.buttons.forEach((button) => button.classList.remove(PickerLayout.PICKED_CLASS));
    }

    protected produceButton(picker: DirectPicker<T>, value: T): HTMLButtonElement {
        const button: HTMLButtonElement = document.createElement('button');
        button.tabIndex = 0;
        button.textContent = picker.getRepresentation(value);
        button.onclick = () => picker.pick(value);
        button.classList.add(PickerLayout.PICK_BUTTON_CLASS);

        return button;
    }

}
