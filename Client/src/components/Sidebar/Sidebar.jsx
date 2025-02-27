import React, {useContext, useRef} from 'react';
import './sidebar.css';
import { CiBoxList } from "react-icons/ci";
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';


const Sidebar = ({visible, handleDisable}) => {
  const [focusedItem, setFocusedItem]=useState(null);
  const adminMenuItems=['Home', 'Add Movie', 'Add Genre', 'Logout']
  const userMenuItems=['Home','Watch Later', 'Logout']
  const role=localStorage.getItem("role");
  const navigate=useNavigate();
  const {logout}=useContext(AuthContext);

  const handleMenuClick=(menu)=>{
    setFocusedItem(menu);
    if(menu ==='Home'){
      navigate('/home')
    }
    else if (menu ==='Add Movie'){
      navigate('/movies')
    }
    else if (menu ==='Add Genre'){
      navigate('/genre')
    }
    else if (menu ==='Watch Later'){
      navigate('/watch-later')
    }
    else if (menu ==='Logout'){
      logout();
      navigate('/')
    }
  };
  return (
<>
    <div className={`layout ${visible ? "show" : "hide"}`} >
    <button className="close-btn" onClick={handleDisable}><CiBoxList size={60} /></button>
         <aside className="sidebar">
          <ul>
            {role === 'user'? userMenuItems.map((menu, index)=> (
              <li key={index} className={focusedItem === menu? "focused" : ""} onClick={()=>handleMenuClick(menu)}>{menu}</li>
            )) : adminMenuItems.map((menu, index)=> (
              <li key={index} className={focusedItem === menu? "focused" : ""} onClick={()=>handleMenuClick(menu)}>{menu}</li>
            )) }
          </ul>
    </aside>
  </div>
 
</>
  )
}

export default Sidebar
