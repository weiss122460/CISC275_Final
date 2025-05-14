import React from "react";
import NavBar from "./navBar";
import Footer from "./footer";
import './about.css'
import aboutRyan from './images/aboutRyan.jpg'
import aboutEver from './images/aboutEver.jpg'
import aboutDylan from './images/aboutDylan.jpg'



const About: React.FC = () => {


    return <div className='about-body'>    
        <NavBar />
        
         <div className="about-content">
            <p style={{fontSize:'80px', color: 'black', textDecoration:'underline', fontWeight:'bold', backgroundColor:'rgb(199, 199, 199)',  width: '50%', marginLeft: '25%'}}>Meet the Team</p>
        <div className="image-container">
        <div className="ryan-container">
            <p>Ryan Weiss</p>
          <img src={aboutRyan} alt="First" className="about-image" style={{height: "300px", borderRadius:'40px'}} />
          <p style={{paddingTop:"10px"}}>Project Manager and Lead Director</p>
        </div>
        <div className="ever-container">
            <p>Ever Merino</p>
          <img src={aboutEver} alt="Second" className="about-image" style={{height: "300px", borderRadius:'40px'}} />
          <p style={{paddingTop:"10px"}}>Creative Director</p>
          </div>
          <div className="dylan-container">
            <p>Dylan Frajerman</p>
          <img src={aboutDylan} alt="Third" className="about-image" style={{height: "300px", borderRadius:'40px'}} />
          <p style={{paddingTop:"10px"}}>Production Coordinator</p>
          </div>
        </div>
        <p className="about-text">
          Hello there! We are the creative minds behind Talent Trail, a website designed to guide and 
          help individuals towards fulfilling career paths. Our mission is simple: to help as many people 
          as possible discover their strengths, unlock their potential, and confidently pursue their 
          future goals!
        </p>
        </div>

        <Footer />
    </div>
    
}
export default About