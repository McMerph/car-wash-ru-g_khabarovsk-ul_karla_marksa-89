import Timestamp from './Timestamp';

export default interface Availability {

    checkInTimes: string[];
    noService: Timestamp[];

}
