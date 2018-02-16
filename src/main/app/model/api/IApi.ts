import IAvailability from "./IAvailability";
import ICallRequest from "./ICallRequest";
import ICheckIn from "./ICheckIn";

export default interface IApi {

    // TODO Make promise?
    retrieveAvailability(): IAvailability;
    sendCheckIn(checkIn: ICheckIn): void;
    sendCallRequest(callRequest: ICallRequest): void;

}
