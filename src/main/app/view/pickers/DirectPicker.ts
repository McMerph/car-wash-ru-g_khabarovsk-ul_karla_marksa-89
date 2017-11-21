import Picker from './Picker';

export default abstract class DirectPicker<T> implements Picker<T> {

    protected static readonly PICK_BUTTON_CLASS = 'pick';
    protected static readonly PICKED_CLASS = 'picked';
    protected static readonly DISABLED_CLASS = 'disabled';
    protected static readonly TO_PREVIOUS_CLASS = 'previous';
    protected static readonly TO_NEXT_CLASS = 'next';

    protected readonly values: T[];
    protected disabledValues: T[];
    protected pickedValue: T;
    protected picked: boolean;

    protected pickButtons: HTMLButtonElement[];

    protected static getPreviousButton(): HTMLButtonElement {
        const previousButton: HTMLButtonElement = document.createElement('button');
        previousButton.setAttribute('aria-label', 'Назад');
        previousButton.classList.add(DirectPicker.TO_PREVIOUS_CLASS, DirectPicker.DISABLED_CLASS);

        return previousButton;
    }

    protected static getNextButton(): HTMLButtonElement {
        const nextButton: HTMLButtonElement = document.createElement('button');
        nextButton.setAttribute('aria-label', 'Далее');
        nextButton.classList.add(DirectPicker.TO_NEXT_CLASS);

        return nextButton;
    }

    public abstract getLayout(): HTMLElement;

    protected abstract getRepresentation(value: T): string;

    public constructor(values: T[]) {
        this.values = values;
        this.disabledValues = [];
        this.picked = false;
        this.pickButtons = this.values.map((value) => this.getPickButton(value));
    }

    public pick(valueToPick: T): void {
        const index: number = this.indexOf(valueToPick);
        if (index !== -1 && !this.isDisabled(valueToPick)) {
            this.picked = true;
            this.pickedValue = valueToPick;
            this.pickButtons.forEach((button) => button.classList.remove(DirectPicker.PICKED_CLASS));
            this.pickButtons[index].classList.add(DirectPicker.PICKED_CLASS);
        }
    }

    public unPick(): void {
        this.picked = false;
        this.pickButtons.forEach((pickButton) => pickButton.classList.remove(DirectPicker.PICKED_CLASS));
    }

    public clearDisabled(): void {
        this.disabledValues = [];
        this.enableButtons(...this.pickButtons);
    }

    public disable(...values: T[]): void {
        this.clearDisabled();
        values.forEach((valueToDisable) => {
            const index: number = this.indexOf(valueToDisable);
            if (index !== -1) {
                this.disableButtons(this.pickButtons[index]);
            }
        });
        if (this.picked && this.isDisabled(this.pickedValue)) {
            this.unPick();
        }
    }

    public isPicked(): boolean {
        return this.picked;
    }

    public getPickedValue(): T {
        return this.pickedValue;
    }

    protected getClassesNames(value: T): string[] {
        const classesNames: string[] = [DirectPicker.PICK_BUTTON_CLASS];
        if (this.isDisabled(value)) {
            classesNames.push(DirectPicker.DISABLED_CLASS);
        }

        return classesNames;
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

    protected valuesEquals(value1: T, value2: T): boolean {
        return value1 === value2;
    }

    protected disableButtons(...buttons: HTMLButtonElement[]) {
        buttons.forEach((button) => button.classList.add(DirectPicker.DISABLED_CLASS));
    }

    protected enableButtons(...buttons: HTMLButtonElement[]) {
        buttons.forEach((button) => button.classList.remove(DirectPicker.DISABLED_CLASS));
    }

    private isDisabled(value: T): boolean {
        return this.disabledValues.indexOf(value) !== -1;
    }

    private getPickButton(value: T): HTMLButtonElement {
        const button: HTMLButtonElement = document.createElement('button');
        button.tabIndex = 0;
        button.textContent = this.getRepresentation(value);
        button.classList.add(...this.getClassesNames(value));
        button.onclick = () => {
            this.pick(value);
        };

        return button;
    }

}
