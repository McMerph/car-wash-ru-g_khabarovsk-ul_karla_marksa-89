import "eligrey-classlist-js-polyfill/classList.min.js";
import * as padStart from "string.prototype.padstart";
import "./view/StickyHoverFix";

import "./view/styles";

import Modal from "./view/components/Modal/index";

padStart.shim();

function start() {
    const modal: Modal = new Modal();
    document.body.appendChild(modal.getLayout());

    const openButton: HTMLButtonElement = (document.querySelector(".profile__actions .check-in") as HTMLButtonElement);
    openButton.addEventListener("click", () => {
        modal.open();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    start();
});
