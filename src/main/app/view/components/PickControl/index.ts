import CLASS_NAMES from "../../constants/ClassNames";
import ILayout from "../ILayout";

interface IParameters {

    text: string;
    onClick: () => void;

}

export default class PickControl implements ILayout {

    private text: string;
    private onClick: () => void;

    public constructor(parameters: IParameters) {
        const { text, onClick } = parameters;
        this.text = text;
        this.onClick = onClick;
    }

    public getLayout(): HTMLButtonElement {
        const button: HTMLButtonElement = document.createElement("button");
        button.tabIndex = 0;
        button.textContent = this.text;
        button.onclick = this.onClick;
        button.classList.add(CLASS_NAMES.PICK_CONTROL_BLOCK.NAME);

        return button;
    }

}
