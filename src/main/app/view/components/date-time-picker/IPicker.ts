export default interface IPicker<T> {

    isPicked(): boolean;
    getPickedValue(): T;
    getLayout(): HTMLElement;

}
