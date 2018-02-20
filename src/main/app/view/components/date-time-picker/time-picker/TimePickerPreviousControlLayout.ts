import SliderUtils from "../utils/SliderUtils";
import TimePickerControlLayout from "./TimePickerControlLayout";

export default class TimePickerPreviousControlLayout {

    private static readonly CLASS: string = "picker__navigation_to-top";

    // TODO Remove field?
    private slider: any;
    private previousButton: HTMLButtonElement;

    public constructor(slider: any) {
        this.slider = slider;
        this.previousButton = SliderUtils.getPreviousButton(this.slider);
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
