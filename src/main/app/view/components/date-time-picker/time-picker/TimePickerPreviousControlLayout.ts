import SliderUtils from "../utils/SliderUtils";
import TimePickerControlLayout from "./TimePickerControlLayout";

export default class TimePickerPreviousControlLayout {

    private static readonly CLASS: string = "picker__navigation_to-top";

    private previousButton: HTMLButtonElement;

    public constructor(slider: any) {
        this.previousButton = SliderUtils.getPreviousButton(slider);
        this.previousButton.classList.add(
            TimePickerControlLayout.NAVIGATION_CLASS,
            TimePickerPreviousControlLayout.CLASS,
            TimePickerControlLayout.DISABLED_NAVIGATION_CLASS,
        );
    }

    public getControl(): HTMLElement {
        return this.previousButton;
    }

}
