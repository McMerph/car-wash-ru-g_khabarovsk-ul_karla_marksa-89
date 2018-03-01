import AvailabilityHandler from "../../../model/AvailabilityHandler";
import CLASS_NAMES from "../../constants/ClassNames";
import DICTIONARY from "../../constants/Dictionary";
import DateTimePicker from "../DateTimePicker/index";
import ILayout from "../ILayout";
import ServiceChooser from "../ServiceChooser";

export default class Modal implements ILayout {

    private static readonly ESCAPE_KEY_CODE: number = 27;

    private modal: HTMLElement;
    private modalContent: HTMLElement;
    private readonly dateTimePicker: DateTimePicker;

    public constructor(availabilityHandler: AvailabilityHandler) {
        this.dateTimePicker = new DateTimePicker(availabilityHandler);

        this.modalContent = this.generateModalContent();
        this.modal = this.generateModal();

        document.addEventListener("keydown", (event: KeyboardEvent) => {
            const keyCode = event.keyCode || event.which;
            if (keyCode === Modal.ESCAPE_KEY_CODE) {
                event.preventDefault();
                this.close();
            }
        });
    }

    public getLayout(): HTMLElement {
        return this.modal;
    }

    public open() {
        this.dateTimePicker.updateSliders();
        document.body.style.overflow = "hidden";
        this.modal.classList.add(CLASS_NAMES.MODAL_BLOCK.MODIFIERS.OPENED);
        this.modal.classList.remove(CLASS_NAMES.MODAL_BLOCK.MODIFIERS.CLOSED);
        this.modalContent.classList.add(CLASS_NAMES.MODAL_BLOCK.ELEMENTS.CONTENT.MODIFIERS.OPENED);
    }

    public close() {
        document.body.style.overflow = "auto";
        this.modal.classList.add(CLASS_NAMES.MODAL_BLOCK.MODIFIERS.CLOSED);
        this.modal.classList.remove(CLASS_NAMES.MODAL_BLOCK.MODIFIERS.OPENED);
        this.modalContent.classList.remove(CLASS_NAMES.MODAL_BLOCK.ELEMENTS.CONTENT.MODIFIERS.OPENED);
    }

    private generateModal(): HTMLElement {
        const modal: HTMLDivElement = document.createElement("div");
        modal.classList.add(
            CLASS_NAMES.MODAL_BLOCK.NAME,
            CLASS_NAMES.MODAL_BLOCK.MODIFIERS.CLOSED,
            CLASS_NAMES.OVERLAY_BLOCK,
        );
        modal.tabIndex = -1;
        modal.setAttribute("aria-hidden", "true");
        modal.appendChild(this.modalContent);

        return modal;
    }

    private generateModalContent(): HTMLElement {
        const modalContent: HTMLElement = document.createElement("div");
        modalContent.classList.add(CLASS_NAMES.MODAL_BLOCK.ELEMENTS.CONTENT.NAME);
        modalContent.appendChild(this.generateModalCloseButton());
        modalContent.appendChild(this.generateModalMain());
        modalContent.appendChild(this.generateFooter());

        return modalContent;
    }

    private generateModalCloseButton(): HTMLButtonElement {
        const modalClose: HTMLButtonElement = document.createElement("button");
        modalClose.classList.add(
            CLASS_NAMES.MODAL_BLOCK.ELEMENTS.CLOSE,
            CLASS_NAMES.ICON_BLOCK,
        );
        modalClose.addEventListener("click", () => {
            this.close();
        });
        return modalClose;
    }

    private generateModalMain(): HTMLElement {
        const modalMain: HTMLElement = document.createElement("div");
        modalMain.classList.add(CLASS_NAMES.MODAL_BLOCK.ELEMENTS.MAIN);
        modalMain.appendChild(new ServiceChooser().getLayout());
        modalMain.appendChild(this.generateToggleDateTimePickerControl());
        modalMain.appendChild(this.dateTimePicker.getLayout());
        modalMain.appendChild(this.generateDateTimeControls());

        return modalMain;
    }

    private generateDateTimeControls(): HTMLElement {
        const controls: HTMLElement = document.createElement("div");
        controls.classList.add(CLASS_NAMES.MODAL_BLOCK.ELEMENTS.DATE_TIME_CONTOLS);
        controls.appendChild(this.generateConfirmDateTimeControl());
        controls.appendChild(this.generateRejectDateTimeControl());

        return controls;
    }

    // TODO DRY
    private generateConfirmDateTimeControl(): HTMLElement {
        const button: HTMLButtonElement = document.createElement("button");
        button.classList.add(
            CLASS_NAMES.MODAL_BLOCK.ELEMENTS.CONFIRM,
            CLASS_NAMES.ICON_BLOCK,
        );
        button.textContent = DICTIONARY.CONFIRM;
        return button;
    }

    private generateRejectDateTimeControl(): HTMLElement {
        const button: HTMLButtonElement = document.createElement("button");
        button.classList.add(
            CLASS_NAMES.MODAL_BLOCK.ELEMENTS.REJECT,
            CLASS_NAMES.ICON_BLOCK,
        );
        button.textContent = DICTIONARY.REJECT;
        return button;
    }

    private generateToggleDateTimePickerControl(): HTMLElement {
        const button: HTMLButtonElement = document.createElement("button");
        button.classList.add(
            CLASS_NAMES.MODAL_BLOCK.ELEMENTS.TOGGLE,
            CLASS_NAMES.ICON_BLOCK,
        );
        button.textContent = DICTIONARY.CHECK_IN_PLACEHOLDER;
        return button;
    }

    private generateFooter(): HTMLElement {
        const footer: HTMLElement = document.createElement("footer");
        footer.classList.add(CLASS_NAMES.MODAL_BLOCK.ELEMENTS.FOOTER);
        const toNearestButton: HTMLButtonElement = document.createElement("button");
        toNearestButton.classList.add(CLASS_NAMES.MODAL_BLOCK.ELEMENTS.TO_NEAREST);
        toNearestButton.appendChild(document.createTextNode(DICTIONARY.NEAREST_AVAILABLE));
        toNearestButton.addEventListener("click", () => {
            this.dateTimePicker.pickNearest();
        });
        const checkInButton: HTMLButtonElement = document.createElement("button");
        checkInButton.classList.add(CLASS_NAMES.CHECK_IN_BLOCK);
        checkInButton.appendChild(document.createTextNode(DICTIONARY.CHECK_IN));
        footer.appendChild(toNearestButton);
        footer.appendChild(checkInButton);

        return footer;
    }

}
