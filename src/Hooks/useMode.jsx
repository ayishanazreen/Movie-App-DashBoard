import React, { useContext } from 'react'
import { ModeContext } from '../context/ModeContext'

export const useMode = () => {
  const context=useContext(ModeContext);
  return context;
}
