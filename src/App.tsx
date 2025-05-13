import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ScrollToTop from "./ScrollToTop"
import BasicQuestions from './BasicQuestions';
import AdvancedQuestions from './AdvancedQuestions';
import NavBar from './navBar';
import TalentLogo from './images/TalentLogo.png';
import BasicResults from './basicResults';
import AdvancedResults from './detailedResults';
import clouds from './images/clouds.png';
import birdAll from './images/birdAll.gif';
import birdFew from './images/birdsFew.gif';
import hikers from './images/hikers.png'
import hikingBear from'./images/hikingBear.png'

const saveKeyData = "MYKEY";

const getStoredKey = (): string => {
  const prevKey = localStorage.getItem(saveKeyData);
  return prevKey ? JSON.parse(prevKey) : "";
};

const saveApiKey = (key: string) => {
  localStorage.setItem(saveKeyData, JSON.stringify(key));
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState<string>("");

  useEffect(() => {
    setKey(getStoredKey());
  }, []);

  const handleSubmit = useCallback(() => {
    saveApiKey(key);
  }, [key]);


  return (
    <div className="App">
      <NavBar />

      <div className='bird-few'>
        <img src={birdFew} alt='bird-few' height='150px' />
      </div>

      <div className='bird-all'>
        <img src={birdAll} alt='bird-all' height='200px' />
      </div>

      <div className="moving-clouds">
        <img src={clouds} alt='clouds' height='250px' style={{ opacity: '0.4' }} />
      </div>
      <div className="moving-clouds-fast">
        <img src={clouds} alt='clouds-fast' height='200px' style={{ opacity: '0.8' }} />
      </div>
      <div className="moving-clouds-slow">
        <img src={clouds} alt='clouds-slow' height='250px' style={{ opacity: '0.5' }} />
      </div>

      <header className="App-header">
        <div className='homepage-container'>
          <p style={{ display: 'flex', paddingTop:'30px' }}>
            Welcome to your Talent Trail! Discover your potential and find the right career path for you
            with our company. Whether you have a general idea about what you want to do, or have no idea what is 
            out there, we are sure to provide you some insight in the right direction for your future. We know
            it can be daunting trying to find the perfect job, which is why here at Talent Trail, we're viewing
            this as a mountainous climb and provide you with two options for your career assessment. One basic 
            assessment if you're in a hurry, and one detailed assessment if you really want some insight into your
            possible future career.
          </p>

          <img
            src={TalentLogo}
            className="App-logo"
            width='350px'
            style={{ float: "right", marginRight: "20px", padding: '30px', zIndex: 4, borderRadius: '50px' }}
            alt='logo'
          />
        </div>
        <p>Ryan Weiss, Ever Merino, Dylan Frajerman</p>
        <Form style={{ marginTop: "20px" }}>
          <Form.Label className='api'>API Key:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Insert API Key Here"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <br />
          <Button
            className="Submit-Button glow-button"
            variant="success"
            onClick={handleSubmit}
          >
            Submit API Key
          </Button>
        </Form>

      </header>

      <div className="questions-div">
        <div className="basic-div">
         <p>
          In the mood for just a short journey? Take the path up the hill and take our Basic Questions
          assessment to get general idea about what awaits you at the end of your career path.
        </p>
          <Button onClick={() => navigate("/basic-questions", { state: { apiKey: key }})}>Go to Basic Questions</Button>
          <img src={hikingBear} alt='hikers' style={{height:'200px', display:'flex', paddingLeft:"15%", paddingTop:'5%'}}></img>
        </div>

        <div className="detailed-div">
        <p>
Ready to climb Everest? Take the intense hike and journey through through the mountains with 
our Detailed Questions assessment where you will need to put a bit more effort to reach the top
and your end career destination. 
</p>
          <Button onClick={() => navigate("/advanced-questions", {state: {apiKey: key}})} style={{ marginLeft: '10px' }}>Go to Advanced Questions</Button>
          <img src={hikers} alt='hikers' style={{height:'200px', display:'flex', paddingLeft:"17%"}}></img>
        </div>
      </div> 
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <ScrollToTop />
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/basic-questions" element={<BasicQuestions />} />
      <Route path="/advanced-questions" element={<AdvancedQuestions />} />
      <Route path="/basicResults" element={<BasicResults/>} />
      <Route path="/detailedResults" element={<AdvancedResults/>}/>
    </Routes>
  </Router>
);

export default App;
