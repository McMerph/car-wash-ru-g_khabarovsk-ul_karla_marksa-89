import "./index.pcss";

export default class ModalHandler {

    private static readonly OPEN_CLASSES: string[] = ["modal_opened"];
    private static readonly CLOSE_CLASSES: string[] = ["modal_closed"];
    private static readonly ESCAPE_KEY_CODE: number = 27;

    private readonly modal: Element;

    public constructor() {
        this.modal = document.getElementsByClassName("modal")[0];
        this.handleModalCloseOnEsc();
    }

    public open() {
        this.modal.classList.add(...ModalHandler.OPEN_CLASSES);
        this.modal.classList.remove(...ModalHandler.CLOSE_CLASSES);
    }

    public close() {
        this.modal.classList.add(...ModalHandler.CLOSE_CLASSES);
        this.modal.classList.remove(...ModalHandler.OPEN_CLASSES);
    }

    private handleModalCloseOnEsc() {
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            const keyCode = event.keyCode || event.which;
            if (keyCode === ModalHandler.ESCAPE_KEY_CODE) {
                event.preventDefault();
                this.close();
            }
        });
    }

}
