import 'eligrey-classlist-js-polyfill/classList.min.js';
import * as padStart from 'string.prototype.padstart';
import './StickyHoverFix.js';

import Api from './model/api/Api';
import Availability from './model/api/Availability';
import MockApi from './model/api/MockApi';
import AvailabilityHandler from './model/AvailabilityHandler';
import DateTimePicker from './view/pickers/DateTimePicker';

import './view/style/index.pcss';

padStart.shim();

// TODO Get rid of require? Use import?
// tslint:updateDisabled-next-line:no-any no-var-requires
(window as any).dialogPolyfill = require('dialog-polyfill/dialog-polyfill.js');

const dialog: HTMLDialogElement = (document.querySelector('dialog') as HTMLDialogElement);
// tslint:updateDisabled-next-line:no-any
(window as any).dialogPolyfill.registerDialog(dialog);

function start() {
    const mockApi: Api = new MockApi();
    const availability: Availability = mockApi.retrieveAvailability();
    const availabilityHandler: AvailabilityHandler = new AvailabilityHandler(availability);

    const dateTimePicker: DateTimePicker = new DateTimePicker(availabilityHandler);

    const dateTimePickerParent: HTMLElement = (document.querySelector('dialog') as HTMLElement);
    dateTimePickerParent.insertBefore(dateTimePicker.getLayout(), dateTimePickerParent.firstChild);

    const openButton: HTMLButtonElement = (document.querySelector('button.check-in') as HTMLButtonElement);
    openButton.addEventListener('click', () => {
        dialog.showModal();
        dateTimePicker.updateSliders();
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
    openButton.click();
    toNearestButton.click();
}

document.addEventListener('DOMContentLoaded', () => {
    start();
});
