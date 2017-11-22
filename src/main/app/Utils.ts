export function isNotDuplicate<T>(element: T, index: number, array: T[]): boolean {
    return array.indexOf(element) === index;
}
