import CLASS_NAMES from "../../constants/ClassNames";
import ILayout from "../ILayout";

interface IParameters {

    ariaLabel: string;
    onClick: () => void;

}

export default class NavigationControl implements ILayout {

    private readonly ariaLabel: string;
    private readonly onClick: () => void;

    private readonly button: HTMLButtonElement;

    public constructor(parameters: IParameters) {
        const { ariaLabel, onClick } = parameters;
        this.ariaLabel = ariaLabel;
        this.onClick = onClick;

        this.button = document.createElement("button");
        this.button.setAttribute("aria-label", this.ariaLabel);
        this.button.classList.add(
            CLASS_NAMES.NAVIGATION_BLOCK.NAME,
            CLASS_NAMES.ICON_BLOCK,
        );
        this.button.onclick = this.onClick;
    }

    public getLayout(): HTMLElement {
        return this.button;
    }

}
