import SliderUtils from "../utils/SliderUtils";
import { CONTROLS_TOP_CLASS, NAVIGATION_CLASS, NAVIGATION_CLASS_TO_TOP } from "./index";

// TODO Implement ILayout interface with getLayout() method?
// TODO Merge with DatePickerControlsLayout?
export default class TopControls {

    private previousTimeControl: HTMLButtonElement;
    private layout: HTMLElement;

    public constructor(timeSlider: any) {
        this.previousTimeControl = SliderUtils.getPreviousButton(timeSlider);
        this.previousTimeControl.classList.add(
            NAVIGATION_CLASS,
            NAVIGATION_CLASS_TO_TOP,
        );

        this.layout = document.createElement("div");
        this.layout.classList.add(CONTROLS_TOP_CLASS);
        this.layout.appendChild(this.previousTimeControl);
    }

    public getLayout(): HTMLElement {
        return this.layout;
    }

    public getNextTimeControl(): HTMLElement {
        return this.previousTimeControl;
    }

}
