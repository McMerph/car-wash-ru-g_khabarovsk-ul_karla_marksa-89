import Availability from './Availability';
import CallRequest from './CallRequest';
import CheckIn from './CheckIn';

export default interface Api {

    // TODO Make promise?
    retrieveAvailability(): Availability;

    sendCheckIn(checkIn: CheckIn): void;

    sendCallRequest(callRequest: CallRequest): void;

}
