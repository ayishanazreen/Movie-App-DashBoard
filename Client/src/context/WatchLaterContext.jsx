import { createContext, useState } from "react";


export const WatchlaterContext=createContext();

export const WatchLaterProvider =({children})=>{
    const [idArray, setIdArray]=useState([]);


    const addToWatchLater =(id)=>{
        setIdArray(id)

    }

return (
    <WatchlaterContext.Provider value={{idArray,addToWatchLater }}>
        {children}
        </WatchlaterContext.Provider>
)
}