import SliderUtils from "../utils/SliderUtils";
import TimePickerControlLayout from "./TimePickerControlLayout";

export default class TimePickerNextControlLayout {

    private static readonly CLASS: string = "picker__navigation_to-bottom";

    // TODO Remove field?
    private slider: any;
    private nextButton: HTMLButtonElement;

    public constructor(slider: any) {
        this.slider = slider;
        this.nextButton = SliderUtils.getNextButton(this.slider);
        this.nextButton.classList.add(
            TimePickerControlLayout.NAVIGATION_CLASS,
            TimePickerNextControlLayout.CLASS,
        );
    }

    public getControl(): HTMLElement {
        return this.nextButton;
    }

}
