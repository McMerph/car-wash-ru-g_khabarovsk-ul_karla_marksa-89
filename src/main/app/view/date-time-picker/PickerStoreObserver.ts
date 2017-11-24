export default interface PickerStoreObserver {

    onPick: (index: number) => void;
    onUnpick: () => void;

}
