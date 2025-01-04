declare global {
    interface Array<T>{
        filterNullAndUndefined(): Exclude<T, null | undefined>[];
    }
}

Array.prototype.filterNullAndUndefined = function<T>() {
    return this.filter((x): x is Exclude<T, null | undefined> => (x !== undefined && x !== null));
}

export {};
