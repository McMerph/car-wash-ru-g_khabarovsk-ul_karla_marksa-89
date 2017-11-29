import './style/modal.pcss';

export default class ModalHandler {

    private static readonly OPEN_CLASSES: string[] = ['is-opened'];
    private static readonly CLOSE_CLASSES: string[] = ['visually-hidden'];

    private static readonly ESCAPE_KEY_CODE: number = 27;
    private static readonly NUMBER_ONE_KEY_CODE: number = 49;

    private readonly modal: Element;

    public constructor() {
        this.modal = (document.getElementById('modal') as Element);
        this.handleModalCloseOnEsc();
        this.handleModalOpenOn1();
    }

    public open() {
        this.modal.classList.add(...ModalHandler.OPEN_CLASSES);
        this.modal.classList.remove(...ModalHandler.CLOSE_CLASSES);
    }

    public close() {
        this.modal.classList.remove(...ModalHandler.CLOSE_CLASSES);
        this.modal.classList.remove(...ModalHandler.OPEN_CLASSES);
    }

    private handleModalCloseOnEsc() {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            const keyCode = event.keyCode || event.which;
            if (keyCode === ModalHandler.ESCAPE_KEY_CODE) {
                event.preventDefault();
                this.close();
            }
        });
    }

    // TODO Delete?
    private handleModalOpenOn1() {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            const keyCode = event.keyCode || event.which;
            if (keyCode === ModalHandler.NUMBER_ONE_KEY_CODE) {
                event.preventDefault();
                this.open();
            }
        });
    }

}
