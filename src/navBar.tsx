import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './App.css';  // Import the CSS file for styling
import TalentLogo from  './images/TalentLogo.png';

 const NavBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <img src={TalentLogo} alt="logo" className="navLogo" width='50px'></img>
        <Navbar.Brand
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          TalentTrail
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/about')}>About</Nav.Link>
            <Nav.Link onClick={() => navigate('/contact')}>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
