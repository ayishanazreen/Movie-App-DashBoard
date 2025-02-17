import React,{useState} from 'react';
import Sidebar from './Sidebar';
import './sideBarWrapper.css';

const SideBarWrapper = ({children}) => {
    const [visible, setVisible]=useState(true);

  return (
    <>
      <Sidebar visible={visible} handleDisable={()=> setVisible(!visible)}/>
        <div className={`home-container ${visible? "move": " "}`}>{children}</div>
    </>
  )
}

export default SideBarWrapper
