// tslint:disable-next-line:no-unused-variable
import * as Pikaday from 'pikaday';

declare module 'Pikaday' {

    interface PikadayOptions {
        events: string[];
        // Not supported in pikaday v 1.6.1
        keyboardInput: boolean;
    }

}
