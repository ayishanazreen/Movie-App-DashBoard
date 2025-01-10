import { createContext, useState } from "react";

export const ModeContext =createContext();


export const ModeProvider =({children})=>{
    const [isMode, setMode]=useState(false);

    const ToggleMode =()=>{
        setMode(!isMode);
    }
    return (
    <ModeContext.Provider value={{isMode, ToggleMode}}>
        {children}
    </ModeContext.Provider>
    )
}