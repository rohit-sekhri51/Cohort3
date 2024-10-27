import { useEffect, useRef } from "react";


export function usePrev(value) {
    const refer = useRef();

    useEffect(() => {
        refer.current = value;
    }, [value]);

    return refer.current;

}