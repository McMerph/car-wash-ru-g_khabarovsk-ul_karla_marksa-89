export default interface Picker<T> {

    getLayout(): HTMLElement;

    isPicked(): boolean;

    getPickedValue(): T;

}
