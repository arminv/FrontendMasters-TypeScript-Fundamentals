export type Dict<T> = {
    [k: string]: T | undefined;
};

// Array.prototype.map, but for Dict
// NOTE: `S` is created to represent the 'transformed' values we get at the end when our callback gets applied to each key/value pair:
export function mapDict<T, S>(dict: Dict<T>, fn: (arg: T, idx: number) => S): Dict<S> {
    const out: Dict<S> = {};
    Object.keys(dict).forEach((dKey, idx) => {
        const thisItem = dict[dKey];
        if (typeof thisItem !== 'undefined') {
            out[dKey] = fn(thisItem, idx);
        }
    })
    return out;
}

// NOTE: we can now use this function, and it returns (via using type parameter `S`) whatever we actually specify without any errors:
// NOTE: hover over `mapDict`, you will see it tells us we are returning an array of strings:
mapDict({
    a: 'a',
    b: 'b',
}, (str) => [str])

// NOTE: hover over `mapDict`, you will see it tells us we are returning a dictionary of wrapped values:
mapDict({
    a: 'a',
    b: 'b',
}, (str) => ({ val: str }))

// Array.prototype.reduce, but for Dict
export function reduceDict<T>(dict: Dict<T>) { }
