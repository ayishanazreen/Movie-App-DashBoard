import React from 'react';
import './Footer.css';
import { TiSocialFacebookCircular, TiSocialInstagram, TiSocialTwitter, TiSocialYoutube} from "react-icons/ti";

const Footer = () => {
  return (
    <>
    <div className= 'footer-container'>
      <p className="footer-contact">Questions?  Call 1-844-505-2993</p>
     <div className='footer-section'>
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
      <div className='social-icons' >
        <TiSocialFacebookCircular  />
        <TiSocialInstagram  />
        <TiSocialTwitter  />
        <TiSocialYoutube />
      </div>
    
  </div>
  
   
  </div>
  
  </>
  )
}

export default Footer
