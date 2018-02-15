export default interface Picker<T> {

    getLayout(): HTMLElement;

    isPicked(): boolean;

    getPickedValue(): T;

    // TODO Use it?
    // pick(value: T): void;

}
