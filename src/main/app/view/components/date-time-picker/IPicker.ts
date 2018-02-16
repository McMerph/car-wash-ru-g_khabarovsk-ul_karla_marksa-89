export default interface IPicker<T> {

    getLayout(): HTMLElement;
    isPicked(): boolean;
    getPickedValue(): T;

}
