export default interface PickerObserver {

    onPick: (index: number) => void;
    onUnpick: () => void;

}
