import ITimestamp from "./ITimestamp";

export default interface IAvailability {

    checkInTimes: string[];
    noService: ITimestamp[];

}
