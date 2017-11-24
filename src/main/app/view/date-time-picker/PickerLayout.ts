import DirectPicker from './DirectPicker';
import PickerStoreObserver from './PickerObserver';

export default abstract class PickerLayout<T> implements PickerStoreObserver {

    protected static readonly PICK_BUTTON_CLASS = 'pick';
    protected static readonly PICKED_CLASS = 'picked';

    protected picker: DirectPicker<T>;

    protected buttons: HTMLButtonElement[];

    public constructor(picker: DirectPicker<T>) {
        this.picker = picker;
    }

    public getLayout(): HTMLElement {
        this.generateButtons();
        return document.createElement('div');
    }

    public onPick(index: number) {
        this.buttons.forEach((button) => button.classList.remove(PickerLayout.PICKED_CLASS));
        this.buttons[index].classList.add(PickerLayout.PICKED_CLASS);
    }

    public onUnpick() {
        this.buttons.forEach((button) => button.classList.remove(PickerLayout.PICKED_CLASS));
    }

    public generateButtons() {
        this.buttons = this.picker.getValues().map((value) => this.produceButton(this.picker, value));
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
