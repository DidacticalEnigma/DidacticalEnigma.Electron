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

export function notNull<TValue>(value: TValue | null): value is TValue {
    return value !== null;
}

export function makeElement(elementDescription: {tagName: string, attributes?: Iterable<[string, string]>, classes?: Iterable<string>, elements?: Iterable<Element>, innerText?: string, andAlso?: (element: HTMLElement) => void}) {
    const element = document.createElement(elementDescription.tagName);

    if(elementDescription.classes) {
        for(const c of elementDescription.classes) {
            element.classList.add(c);
        }
    }

    if(elementDescription.attributes) {
        for(const attrKvp of elementDescription.attributes) {
            element.setAttribute(attrKvp[0], attrKvp[1]);
        }
    }

    if(elementDescription.elements) {
        for(const el of elementDescription.elements) {
            element.appendChild(el);
        }
    }

    if(elementDescription.innerText !== undefined) {
        element.innerText = elementDescription.innerText;
    }

    if(elementDescription.andAlso !== undefined) {
        elementDescription.andAlso(element);
    }

    return element;
}