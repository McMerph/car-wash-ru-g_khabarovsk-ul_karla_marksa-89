export default class ButtonsUtils {

    public static disableButtons(...buttons: HTMLButtonElement[]) {
        buttons.forEach((button) => button.classList.add(ButtonsUtils.DISABLED_CLASS));
    }

    public static enableButtons(...buttons: HTMLButtonElement[]) {
        buttons.forEach((button) => button.classList.remove(ButtonsUtils.DISABLED_CLASS));
    }

    private static readonly DISABLED_CLASS = "disabled";

}
