import SliderUtils from "../utils/SliderUtils";
import TimePickerControlLayout from "./TimePickerControlLayout";

export default class TimePickerNextControlLayout {

    private static readonly CLASS: string = "picker__navigation_to-bottom";

    private nextButton: HTMLButtonElement;

    public constructor(slider: any) {
        this.nextButton = SliderUtils.getNextButton(slider);
        this.nextButton.classList.add(
            TimePickerControlLayout.NAVIGATION_CLASS,
            TimePickerNextControlLayout.CLASS,
        );
    }

    public getControl(): HTMLElement {
        return this.nextButton;
    }

}
