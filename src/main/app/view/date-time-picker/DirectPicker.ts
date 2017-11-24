import Picker from './Picker';
import PickerLayout from './PickerLayout';
import PickerStore from './PickerStore';

export default abstract class DirectPicker<T> implements Picker<T> {

    protected readonly store: PickerStore<T>;
    protected readonly layout: PickerLayout<T>;

    public abstract getRepresentation(value: T): string;

    public isPicked(): boolean {
        return this.store.isPicked();
    }

    public getPickedValue(): T {
        return this.store.getPickedValue();
    }

    public getLayout(): HTMLElement {
        return this.layout.getLayout();
    }

    public getValues(): T[] {
        return this.store.getValues();
    }

    public pick(value: T) {
        this.store.pick(value);
    }

    public unPick(): void {
        this.store.unPick();
    }

    public isDisabled(value: T): boolean {
        return this.store.isDisabled(value);
    }

}
