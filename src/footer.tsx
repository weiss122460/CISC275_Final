import React from "react";
import './footer.css'; // Or use a separate Footer.css if preferred
import TalentLogo from './images/TalentLogo.png';

const Footer: React.FC = () => {
  return (
    <footer className="footer-transparent">
        <img src={TalentLogo} alt="TalentTrail Logo" width="40" className="me-2" />
      <p className="footer-text">Ryan Weiss, Ever Merino, Dylan Frajerman</p>
    </footer>
  );
};

export default Footer;