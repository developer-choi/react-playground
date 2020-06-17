import React, {useEffect, useRef} from "react";

export default function usePrevious<T>(propValue: T) {

    const ref = useRef<T>();

    useEffect(() => {
        ref.current = propValue;
    });

    return ref.current as T;
}
