import Time from '../../../../main/app/model/Time';

export const hours: number = 11;
export const minutes: number = 21;

test('constructors', () => {
    const timeFromString: Time = new Time(`${hours}:${minutes}`);
    const timeFromOptions: Time = new Time({hours, minutes});
    const date: Date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    const timeFromDate: Time = new Time(date);

    expect(timeFromString.getHours()).toBe(hours);
    expect(timeFromString.getMinutes()).toBe(minutes);
    expect(timeFromOptions.getHours()).toBe(hours);
    expect(timeFromOptions.getMinutes()).toBe(minutes);
    expect(timeFromDate.getHours()).toBe(hours);
    expect(timeFromDate.getMinutes()).toBe(minutes);
});

test('getRepresentation() method', () => {
    const time = new Time({hours, minutes});
    expect(time.getRepresentation()).toBe(`${hours}:${minutes}`);
});

test('compareTo()  method', () => {
    const greater: Time = new Time({hours, minutes});
    const lessInHours: Time = new Time({hours: hours - 1, minutes});
    const lessInMinutes: Time = new Time({hours, minutes: minutes - 1});
    expect(greater.compareTo(greater)).toBe(0);
    expect(greater.compareTo(lessInHours)).toBeGreaterThan(0);
    expect(greater.compareTo(lessInMinutes)).toBeGreaterThan(0);
    expect(lessInHours.compareTo(greater)).toBeLessThan(0);
    expect(lessInMinutes.compareTo(greater)).toBeLessThan(0);
});

test('equals() method', () => {
    const time1: Time = new Time({hours, minutes});
    const time2: Time = new Time({hours, minutes});
    expect(time1.equals(time2)).toBeTruthy();
});