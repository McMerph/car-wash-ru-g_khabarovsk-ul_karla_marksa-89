import Time from '../../../main/app/model/Time';

export const hours: number = 11;
export const minutes: number = 21;

test('constructors', () => {
    const timeFromString: Time = new Time(`${hours}:${minutes}`);
    const timeFromOptions: Time = new Time({hours, minutes});
    expect(timeFromString.equals(timeFromOptions)).toBeTruthy();
});

test('equalsArrays() static method', () => {
    const array1 = [
        new Time({hours, minutes}),
        new Time({hours: hours + 1, minutes}),
        new Time({hours, minutes: minutes + 1}),
        new Time({hours: hours + 1, minutes: minutes + 1})
    ];
    const array2 = [
        new Time({hours, minutes}),
        new Time({hours: hours + 1, minutes}),
        new Time({hours, minutes: minutes + 1}),
        new Time({hours: hours + 1, minutes: minutes + 1})
    ];
    expect(Time.equalsArrays(array1, array2)).toBeTruthy();
    array2.pop();
    expect(Time.equalsArrays(array1, array2)).toBeFalsy();
});

test('contains() static method', () => {
    const times = [
        new Time({hours, minutes}),
        new Time({hours: hours + 1, minutes}),
        new Time({hours, minutes: minutes + 1}),
        new Time({hours: hours + 1, minutes: minutes + 1})
    ];
    expect(Time.contains(times, new Time({hours, minutes})));
});

test('getRepresentation() method', () => {
    const time = new Time({hours, minutes});
    expect(time.getRepresentation()).toBe(`${hours}:${minutes}`);
});

test('equals() method', () => {
    const time1: Time = new Time({hours, minutes});
    const time2: Time = new Time({hours, minutes});
    expect(time1 === time2).toBeFalsy();
    expect(time1.equals(time2)).toBeTruthy();
});

test('compareTo()  method', () => {
    const greater: Time = new Time({hours, minutes});
    const lessInHours: Time = new Time({hours: hours - 1, minutes});
    const lessInMinutes: Time = new Time({hours, minutes: minutes - 1});
    expect(greater.compareTo(greater)).toBe(0);
    expect(greater.compareTo(lessInMinutes)).toBeGreaterThan(0);
    expect(lessInMinutes.compareTo(greater)).toBeLessThan(0);
    expect(lessInHours.compareTo(greater)).toBeLessThan(0);
});
