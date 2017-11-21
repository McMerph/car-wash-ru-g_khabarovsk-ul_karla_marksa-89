import Api from './Api';
import Availability from './Availability';
import CallRequest from './CallRequest';
import CheckIn from './CheckIn';
import Timestamp from './Timestamp';

class MockApi implements Api {

    public static getCheckInTimes(): string[] {
        return ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
            '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
    }

    public retrieveAvailability(): Availability {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        return {
            checkInTimes: MockApi.getCheckInTimes(),
            noService: [
                ...this.getNoServiceDate(today),
                {year: tomorrow.getFullYear(), month: tomorrow.getMonth(), day: tomorrow.getDate(), time: '9:00'},
                {year: tomorrow.getFullYear(), month: tomorrow.getMonth(), day: tomorrow.getDate(), time: '10:00'},
                {year: tomorrow.getFullYear(), month: tomorrow.getMonth(), day: tomorrow.getDate(), time: '18:00'}
            ]
        };
    }

    public sendCheckIn(checkIn: CheckIn): void {
        console.log('checkIn:', checkIn);
    }

    public sendCallRequest(callRequest: CallRequest): void {
        console.log('callRequest:', callRequest);
    }

    private getNoServiceDate(date: Date): Timestamp[] {
        const noServiceDate: Timestamp[] = [];
        MockApi.getCheckInTimes().forEach((time) => noServiceDate.push({
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate(),
            time
        }));

        return noServiceDate;
    }

    // TODO Delete?
    // private getNoServiceDate(year: number, month: number, date: number): Timestamp[] {
    //     const noServiceDate: Timestamp[] = [];
    //     this.getCheckInTimes().forEach((time) => noServiceDate.push({year, month, day: date, time}));
    //
    //     return noServiceDate;
    // }

    // TODO Delete?
    // private getMockCheckIn(): CheckIn {
    //     return {
    //         phone: '+7-963-123-45-67',
    //         timestamp: {year: 2017, month: 11, day: 11, time: '15:00'},
    //         service: 'Нано мойка'
    //     };
    // }

    // TODO Delete?
    // private getMockRequestCall(): CallRequest {
    //     return {phone: '+7-963-123-45-67'};
    // }

}

export default MockApi;
