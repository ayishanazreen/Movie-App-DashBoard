import React, {  useState } from 'react';
import './Footer.css';
import { TiSocialFacebookCircular, TiSocialInstagram, TiSocialTwitter, TiSocialYoutube} from "react-icons/ti";
import { useMode } from '../../Hooks/useMode';

const Footer = () => {
  const [selectLang,setSelectLang]=useState("english");
  const {isMode}=useMode();
  const handleLang=(event)=>{
    setSelectLang(event.target.value);
  }
  return (
    <>
  <div className={isMode? 'footer-light-container':'footer-container'}>
    <p className="footer-contact">Questions? Call 1-844-505-2993</p>
   <div className={isMode ? 'footer-section' : 'footer-light-section'}>
    <nav className="footer-links-nav" aria-label="Footer Navigation">
      <ul className="footer-links">
        <li><a href="#">FAQ</a></li>
        <li><a href="#">Help Center</a></li>
        <li><a href="#">Terms of Use</a></li>
        <li><a href="#">Cookie Preferences</a></li>
        <li><a href="#">Corporate Information</a></li>
        <li><a href="#">Privacy</a></li>
      </ul>
    </nav>
    <div className={isMode ? 'social-icons' : 'social-light-icons'}>
      <TiSocialFacebookCircular size={24} />
      <TiSocialInstagram size={24} />
      <TiSocialTwitter size={24} />
      <TiSocialYoutube size={24} />
    </div>
  
</div>
<div className={isMode? 'lang-light-div' : 'lang-div'}> 
   <div className="language-picker" data-trigger-class="li4-btn li4-btn--subtle js-tab-focus">
    <form>
      <select
        name="language-picker-select"
        id="language-picker-select"
        value={selectLang}
        onChange={handleLang}
      >
        <option lang="de" value="deutsch">Deutsch</option>
        <option lang="en" value="english">English</option>
        <option lang="fr" value="francais">Français</option>
        <option lang="it" value="italiano">Italiano</option>
      </select>
    </form>
  </div>
  </div> 
 
</div>

</>
  )
}

export default Footer
