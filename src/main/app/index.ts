import "eligrey-classlist-js-polyfill/classList.min.js";
import * as padStart from "string.prototype.padstart";
import "./StickyHoverFix.js";

import "normalize.css/normalize.css";
import "swiper/dist/css/swiper.min.css";
import "./view/components/footer/index.pcss";
import "./view/components/header/index.pcss";
import "./view/components/info/index.pcss";
import "./view/components/modal/index.pcss";
import "./view/components/profile/index.pcss";
import "./view/fonts.css";
import "./view/index.pcss";

import Modal from "./view/components/modal/index";

padStart.shim();

function start() {
    const modal: Modal = new Modal();

    document.body.appendChild(modal.getLayout());

    const openButton: HTMLButtonElement = (document.querySelector(".profile__check-in") as HTMLButtonElement);
    openButton.addEventListener("click", () => {
        modal.open();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    start();
});
