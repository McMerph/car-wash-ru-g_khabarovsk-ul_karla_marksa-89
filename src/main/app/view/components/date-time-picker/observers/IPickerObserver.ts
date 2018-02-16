export default interface IPickerObserver {

    onPick: (index: number) => void;
    onUnpick: () => void;

}
