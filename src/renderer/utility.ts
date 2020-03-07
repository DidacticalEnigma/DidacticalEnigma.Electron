import { zip } from "lodash"

export function removeAllChildElements(el: Element) {
    while (el.lastElementChild) {
        el.removeChild(el.lastElementChild);
    }
}

export function assertNonNull<T>(value: T | null) : T {
    if(value == null) {
        throw "WAS NULL";
    }
    return value;
}

export function* zipShortest<T1, T2>(sequence1: ArrayLike<T1>, sequence2: ArrayLike<T2>) {
    for(const [element1, element2] of zip(sequence1, sequence2)) {
        if(element1 === undefined || element2 === undefined) {
            return;
        }
        yield [element1, element2];
    }
}