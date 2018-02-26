import CLASS_NAMES from "../../constants/ClassNames";
import DICTIONARY from "../../constants/Dictionary";
import DateSlider from "../DatePicker/DateSlider";
import DateTimePicker from "../DateTimePicker";
import ILayout from "../ILayout";
import MonthControls from "../MonthControls";
import ServiceChooser from "../ServiceChooser";
import TimeSlider from "../TimePicker/TimeSlider";

export default class Modal implements ILayout {

    private static readonly ESCAPE_KEY_CODE: number = 27;

    private modal: HTMLElement;
    private modalContent: HTMLElement;
    private timeSlider: TimeSlider;
    private dateSlider: DateSlider;

    public constructor() {
        const dateTimePicker: DateTimePicker = new DateTimePicker();
        this.timeSlider = dateTimePicker.getTimeSlider();
        this.dateSlider = dateTimePicker.getDateSlider();
        this.modalContent = this.generateModalContent(dateTimePicker);
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
        this.timeSlider.update();
        this.dateSlider.update();
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

    private generateModalContent(dateTimePicker: DateTimePicker): HTMLElement {
        const modalContent: HTMLElement = document.createElement("div");
        modalContent.classList.add(CLASS_NAMES.MODAL_BLOCK.ELEMENTS.CONTENT.NAME);
        modalContent.appendChild(this.generateModalCloseButton());
        modalContent.appendChild(this.generateModalMain(dateTimePicker));
        modalContent.appendChild(this.generateFooter(dateTimePicker));

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

    private generateModalMain(dateTimePicker: DateTimePicker): HTMLElement {
        const modalMain: HTMLElement = document.createElement("div");
        modalMain.classList.add(CLASS_NAMES.MODAL_BLOCK.ELEMENTS.MAIN);
        modalMain.appendChild(new ServiceChooser().getLayout());
        modalMain.appendChild(this.generateTopControls());
        modalMain.appendChild(this.generateDateTimePickerMain(dateTimePicker));
        modalMain.appendChild(this.generateBottomControls());

        return modalMain;
    }

    private generateBottomControls() {
        const bottomControls = document.createElement("div");
        bottomControls.classList.add(CLASS_NAMES.MODAL_BLOCK.ELEMENTS.PICKER.NAME);
        const timeSliderNextControl = this.timeSlider.getNextControl();
        timeSliderNextControl.classList.add(CLASS_NAMES.MODAL_BLOCK.ELEMENTS.RIGHT);
        bottomControls.appendChild(timeSliderNextControl);

        return bottomControls;
    }

    private generateDateTimePickerMain(dateTimePicker: DateTimePicker): HTMLElement {
        const dateTimePickerMain: HTMLElement = document.createElement("div");
        dateTimePickerMain.dataset.legend = DICTIONARY.DATE_TIME_PICKER_LEGEND;
        const datePickerLayout = dateTimePicker.getDatePicker().getLayout();
        datePickerLayout.classList.add(CLASS_NAMES.MODAL_BLOCK.ELEMENTS.LEFT);
        const timePickerLayout = dateTimePicker.getTimePicker().getLayout();
        timePickerLayout.classList.add(CLASS_NAMES.MODAL_BLOCK.ELEMENTS.RIGHT);
        dateTimePickerMain.appendChild(datePickerLayout);
        dateTimePickerMain.appendChild(timePickerLayout);
        dateTimePickerMain.classList.add(
            CLASS_NAMES.MODAL_BLOCK.ELEMENTS.PICKER.NAME,
            CLASS_NAMES.MODAL_BLOCK.ELEMENTS.PICKER.MODIFIERS.MAIN,
        );

        return dateTimePickerMain;
    }

    private generateTopControls(): HTMLElement {
        const topControls: HTMLDivElement = document.createElement("div");
        topControls.classList.add(CLASS_NAMES.MODAL_BLOCK.ELEMENTS.PICKER.NAME);
        const montControlsLayout: HTMLElement = new MonthControls(this.dateSlider).getLayout();
        montControlsLayout.classList.add(CLASS_NAMES.MODAL_BLOCK.ELEMENTS.LEFT);
        topControls.appendChild(montControlsLayout);
        const timeSliderPreviousControl: HTMLElement = this.timeSlider.getPreviousControl();
        timeSliderPreviousControl.classList.add(CLASS_NAMES.MODAL_BLOCK.ELEMENTS.RIGHT);
        topControls.appendChild(timeSliderPreviousControl);

        return topControls;
    }

    private generateFooter(dateTimePicker: DateTimePicker): HTMLElement {
        const footer: HTMLElement = document.createElement("footer");
        footer.classList.add(CLASS_NAMES.MODAL_BLOCK.ELEMENTS.FOOTER);
        const toNearestButton: HTMLButtonElement = document.createElement("button");
        toNearestButton.classList.add(CLASS_NAMES.MODAL_BLOCK.ELEMENTS.TO_NEAREST);
        toNearestButton.appendChild(document.createTextNode(DICTIONARY.NEAREST_AVAILABLE));
        toNearestButton.addEventListener("click", () => {
            dateTimePicker.pickNearest();
        });
        const checkInButton: HTMLButtonElement = document.createElement("button");
        checkInButton.classList.add(CLASS_NAMES.CHECK_IN_BLOCK);
        checkInButton.appendChild(document.createTextNode(DICTIONARY.CHECK_IN));
        footer.appendChild(toNearestButton);
        footer.appendChild(checkInButton);

        return footer;
    }

}
