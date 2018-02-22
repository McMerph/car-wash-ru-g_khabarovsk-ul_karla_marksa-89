import DateUtils from "../utils/DateUtils";
import IApi from "./IApi";
import IAvailability from "./IAvailability";
import ICallRequest from "./ICallRequest";
import ICheckIn from "./ICheckIn";
import ITimestamp from "./ITimestamp";

class MockApi implements IApi {

    public static getCheckInTimes(): string[] {
        return ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
            "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
    }

    private static getNoServiceTimestamp(timestamp: number): ITimestamp {
        const date: Date = new Date(timestamp);
        return {
            day: date.getDate(),
            month: date.getMonth(),
            time: `${date.getHours()}:${date.getMinutes()}`,
            year: date.getFullYear(),
        };
    }

    private static getNoServiceDate(timestamp: number): ITimestamp[] {
        const date = new Date(timestamp);
        return MockApi.getCheckInTimes().map((time) =>
            ({ year: date.getFullYear(), month: date.getMonth(), day: date.getDate(), time }),
        );
    }

    public retrieveAvailability(): IAvailability {
        const todayWithoutTime: number = DateUtils.getTodayWithoutTime();
        const tomorrowWithoutTime: number = DateUtils.getTomorrowWithoutTime();

        return {
            checkInTimes: MockApi.getCheckInTimes(),
            noService: [
                ...MockApi.getNoServiceDate(todayWithoutTime),
                MockApi.getNoServiceTimestamp(tomorrowWithoutTime + 9 * 60 * 60 * 1000),
                MockApi.getNoServiceTimestamp(tomorrowWithoutTime + 10 * 60 * 60 * 1000),
                MockApi.getNoServiceTimestamp(tomorrowWithoutTime + 11 * 60 * 60 * 1000),
                MockApi.getNoServiceTimestamp(tomorrowWithoutTime + 12 * 60 * 60 * 1000),
                MockApi.getNoServiceTimestamp(tomorrowWithoutTime + 13 * 60 * 60 * 1000),
                MockApi.getNoServiceTimestamp(tomorrowWithoutTime + 14 * 60 * 60 * 1000),
                MockApi.getNoServiceTimestamp(tomorrowWithoutTime + 18 * 60 * 60 * 1000),
            ],
        };
    }

    public sendCheckIn(checkIn: ICheckIn): void {
        console.log("checkIn:", checkIn);
    }

    public sendCallRequest(callRequest: ICallRequest): void {
        console.log("callRequest:", callRequest);
    }

    // TODO Delete?
    // private getNoServiceDate(year: number, month: number, dateOfMonth: number): Timestamp[] {
    //     const noServiceDate: Timestamp[] = [];
    //     this.getCheckInTimes().forEach((time) => noServiceDate.push({year, month, day: dateOfMonth, time}));
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
