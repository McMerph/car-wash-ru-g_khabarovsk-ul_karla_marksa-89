export function isNotDuplicate<T>(element: T, index: number, array: T[]): boolean {
    return array.indexOf(element) === index;
}

export function inArray<T>(element: T, array: T[]): boolean {
    return array.indexOf(element) !== -1;
}
