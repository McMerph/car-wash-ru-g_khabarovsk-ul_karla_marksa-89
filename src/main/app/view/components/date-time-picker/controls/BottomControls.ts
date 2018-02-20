import SliderUtils from "../utils/SliderUtils";
import { CONTROLS_BOTTOM_CLASS, NAVIGATION_CLASS, NAVIGATION_CLASS_TO_BOTTOM } from "./constants";

// TODO Implement ILayout interface with getLayout() method?
export default class BottomControls {

    private nextTimeControl: HTMLButtonElement;
    private layout: HTMLElement;

    public constructor(slider: any) {
        this.nextTimeControl = SliderUtils.getNextButton(slider);
        this.nextTimeControl.classList.add(
            NAVIGATION_CLASS,
            NAVIGATION_CLASS_TO_BOTTOM,
        );

        this.layout = document.createElement("div");
        this.layout.classList.add(CONTROLS_BOTTOM_CLASS);
        this.layout.appendChild(this.nextTimeControl);
    }

    public getLayout(): HTMLElement {
        return this.layout;
    }

    public getNextTimeControl(): HTMLElement {
        return this.nextTimeControl;
    }

}
