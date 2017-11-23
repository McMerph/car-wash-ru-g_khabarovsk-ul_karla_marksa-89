export default abstract class PickerValuesHandler<T> {

    protected static readonly PICK_BUTTON_CLASS = 'pick';
    protected static readonly PICKED_CLASS = 'picked';

    private readonly values: T[];
    private pickedValue: T;
    private picked: boolean;

    private buttons: HTMLButtonElement[];

    // TODO Introduce PickerValue class?
    protected abstract getRepresentation(value: T): string;

    protected abstract isDisabled(value: T): boolean;

    protected abstract valuesEquals(value1: T, value2: T): boolean;

    public constructor(values: T[]) {
        this.values = values;
        this.picked = false;
    }

    // TODO Move to constructor?
    public generateButtons(): void {
        this.buttons = this.values.map((value) => this.getPickButton(value));
    }

    public pick(valueToPick: T): void {
        const index: number = this.indexOf(valueToPick);
        if (index !== -1 && !this.isDisabled(valueToPick)) {
            this.picked = true;
            this.pickedValue = valueToPick;
            this.buttons.forEach((button) => button.classList.remove(PickerValuesHandler.PICKED_CLASS));
            this.buttons[index].classList.add(PickerValuesHandler.PICKED_CLASS);
        }
    }

    public unPick(): void {
        this.picked = false;
        this.buttons.forEach((pickButton) => pickButton.classList.remove(PickerValuesHandler.PICKED_CLASS));
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

    public getButtons(): HTMLButtonElement[] {
        return this.buttons;
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

    protected getPickButton(value: T): HTMLButtonElement {
        const button: HTMLButtonElement = document.createElement('button');
        button.tabIndex = 0;
        button.textContent = this.getRepresentation(value);
        button.onclick = () => this.pick(value);
        button.classList.add(PickerValuesHandler.PICK_BUTTON_CLASS);

        return button;
    }

}
