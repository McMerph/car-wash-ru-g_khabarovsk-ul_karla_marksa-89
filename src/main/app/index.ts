import 'eligrey-classlist-js-polyfill/classList.min.js';
import * as padStart from 'string.prototype.padstart';
import './StickyHoverFix.js';

import Api from './model/api/Api';
import Availability from './model/api/Availability';
import MockApi from './model/api/MockApi';
import AvailabilityHandler from './model/AvailabilityHandler';
import DateTimePicker from './view/date-time-picker/DateTimePicker';
import ModalHandler from './view/ModalHandler';

import Slider from './view/slider/Slider';

import 'normalize.css/normalize.css';
import './view/style/index.pcss';
import './view/header/index.pcss';

padStart.shim();

function start() {
    const mockApi: Api = new MockApi();
    const availability: Availability = mockApi.retrieveAvailability();
    const availabilityHandler: AvailabilityHandler = new AvailabilityHandler(availability);

    const dateTimePickerParent: HTMLElement = (document.querySelector('.modal-content') as HTMLElement);
    const dateTimePicker: DateTimePicker = new DateTimePicker(availabilityHandler);
    dateTimePickerParent.insertBefore(dateTimePicker.getLayout(), dateTimePickerParent.childNodes.item(2));
    dateTimePicker.updateSliders();
    // Fix for ie
    dateTimePicker.updateSliders();

    const modalHandler: ModalHandler = new ModalHandler();

    const openButton: HTMLButtonElement = (document.querySelector('.profile-actions button.check-in') as HTMLButtonElement);
    openButton.addEventListener('click', () => {
        modalHandler.open();
    });

    // const closeButton: HTMLButtonElement = (document.querySelector('dialog .close-button') as HTMLButtonElement);
    // closeButton.addEventListener('click', (event) => {
    //     dialog.close();
    // });

    const toNearestButton: HTMLButtonElement = (document.querySelector('button.to-nearest') as HTMLButtonElement);
    toNearestButton.addEventListener('click', () => {
        dateTimePicker.pickNearest();
    });

    // TODO Delete?
    // openButton.click();
    // toNearestButton.click();
}

document.addEventListener('DOMContentLoaded', () => {
    start();

    // TODO Delete
    const element: HTMLElement = document.querySelector('.touch-test') as HTMLElement;
    new Slider(element);
});
