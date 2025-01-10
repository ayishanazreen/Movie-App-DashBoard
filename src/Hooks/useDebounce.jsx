import React, { useEffect, useState } from 'react'

export const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue]=useState(value || "");

    useEffect(()=>{
        const Timeout=setTimeout(()=>{
            setDebounceValue(value)
            }, delay);
           
            return()=>{
                clearTimeout(Timeout);
            }
    }, [value, delay]);
    
    return debounceValue;
}


