import IPicker from "./IPicker";

export default interface IDirectPicker<T> extends IPicker<T> {

    onPick: (index: number) => void;
    onUnpick: () => void;

}
