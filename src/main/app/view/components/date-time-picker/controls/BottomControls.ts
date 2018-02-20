import SliderUtils from "../utils/SliderUtils";
import { CONTROLS_BOTTOM_CLASS, NAVIGATION_CLASS, NAVIGATION_CLASS_TO_BOTTOM } from "./index";

// TODO Implement ILayout interface with getLayout() method?
export default class BottomControls {

    private nextTimeButton: HTMLButtonElement;
    private layout: HTMLElement;

    public constructor(slider: any) {
        this.nextTimeButton = SliderUtils.getNextButton(slider);
        this.nextTimeButton.classList.add(
            NAVIGATION_CLASS,
            NAVIGATION_CLASS_TO_BOTTOM,
        );

        this.layout = document.createElement("div");
        this.layout.classList.add(CONTROLS_BOTTOM_CLASS);
        this.layout.appendChild(this.nextTimeButton);
    }

    public getLayout(): HTMLElement {
        return this.layout;
    }

    public getNextTimeButton(): HTMLElement {
        return this.nextTimeButton;
    }

}
