import {atom, selector} from "recoil";

// atom is like a table, if any part changes the whole atom will re-render
// selector is like view, atom has many selector or views
// if any part of the view changes, then it will re-render
// atomFamily, selectorFamily


export const atomCounter = atom({
    default: 0,
    key: "Counter"
})

export const evenSelector = selector({
    key: "isEvenSelector",
    get: function({get}) {
        const currCounter = get(atomCounter);
        const isEven = (currCounter % 2 == 0);
        return isEven;
    }
})