import React, {useContext, useRef} from 'react';
import './sidebar.css';
import { CiBoxList } from "react-icons/ci";
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';


const Sidebar = ({visible, handleDisable}) => {
  const [focusedItem, setFocusedItem]=useState(null);
  const menuItems=['Home', 'Add Movie', 'Add Genre', 'Watch Later', 'Logout']
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
      navigate('/login')
    }
  };
  return (
<>
    <div className={`layout ${visible ? "show" : "hide"}`} >
    <button className="close-btn" onClick={handleDisable}><CiBoxList size={60} /></button>
         <aside className="sidebar">
          <ul>
            {menuItems.map((menu, index)=> (
              <li key={index} className={focusedItem === menu? "focused" : ""} onClick={()=>handleMenuClick(menu)}>{menu}</li>
            ))}
          </ul>
    </aside>
  </div>
 
</>
  )
}

export default Sidebar
