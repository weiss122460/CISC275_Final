import React, { useState, useEffect, useCallback, useRef  } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; 
import { questions as basicQuestions } from './BasicQuestions';
import { questions as advancedQuestions } from './AdvancedQuestions';
import PageOne from './BasicQuestions';
import PageTwo from './AdvancedQuestions';
import NavBar from './navBar';
import TalentLogo from  './images/TalentLogo.png';
import Results from './results';
import clouds from './images/clouds.png';
//import birdFlock from './images/birdFlock.gif'
import birdAll from './images/birdAll.gif'
import birdFew from './images/birdsFew.gif'
const saveKeyData = "MYKEY";

// Function to get the stored API key
const getStoredKey = (): string => {
  const prevKey = localStorage.getItem(saveKeyData);
  return prevKey ? JSON.parse(prevKey) : "";
};

// Function to save the API key
const saveApiKey = (key: string) => {
  localStorage.setItem(saveKeyData, JSON.stringify(key));
};

//Define home component
const Home: React.FC = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState<string>("");
  const gotRequest = useRef(false);

  // Load stored key
  useEffect(() => {
    setKey(getStoredKey());
  }, []);

  // Save API key
  const handleSubmit = useCallback(() => {
    saveApiKey(key);
  }, [key]);

  // Call api using the stored key
  const sendToOpenAI = async () => {
    const apiKey = getStoredKey();
    if (!apiKey) {
      alert("Please enter your API key first.");
      return null;
    }
  
    //gets copy of answers from question pages
    const basicAnswers = JSON.parse(localStorage.getItem("basic-quiz-answers") || '[]');
    const advancedAnswers = JSON.parse(localStorage.getItem("advanced-quiz-answers") || '[]');

    //combines questions and answers into their own arrays
    const allAnswers = [...basicAnswers, ...advancedAnswers];
    const allQuestions = [...basicQuestions, ...advancedQuestions];
  
    //check for blank quiz answers
    if (allAnswers.length === 0 || allAnswers.some(ans => !ans || ans.trim() === "")) {
      alert("Please complete the quiz first.");
      return null;
    }
  
    //combines questions and answers into one array
    const qaPairs = allQuestions.map((question, index) => {
      const answer = allAnswers[index] || "(No answer provided)";
      return `Q${index + 1}: ${question}\nA${index + 1}: ${answer}`;
    });
    
    //prompt for chatGPT
    const prompt = `Given the following career quiz responses, provide a brief career recommendation and explain your reasoning in a paragraph:\n\n${qaPairs.join("\n\n")}`;
    const tone = "You are a friendly and insightful career advisor. Your goal is to provide a personalized career suggestion based on the user's quiz responses";
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4.1",
          messages: [
            {
              role: "system",
              content: tone
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      });
  
      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "No reply.";
      return reply;
    } catch (error) {
      console.error("OpenAI error:", error);
      alert("There was an error processing your request.");
    }
  };

 const HandleResultsButton = async (): Promise<void> => {
  if (gotRequest.current) return;
  gotRequest.current = true;
    const reply = await sendToOpenAI();
    if (reply) {
      navigate("/results", { state: { result: reply } });
    }
    gotRequest.current = false;
}

  return (
    <div className="App">
      <NavBar />

      <div className='bird-few'>
        <img src={birdFew} alt='bird-few' height='150px'></img>
      </div>

      <div className='bird-all'>
        <img src={birdAll} alt='bird-all' height='200px'></img>
      </div>

      <div className="moving-clouds" >
        <img src={clouds} alt='clouds' height='250px' style={{opacity: '0.4'}}></img>
      </div>
      <div className="moving-clouds-fast">
        <img src={clouds} alt='clouds-fast' height='200px' style={{opacity: '0.8'}}></img>
      </div>
      <div className="moving-clouds-slow">
        <img src={clouds} alt='clouds-slow' height='250px' style={{opacity: '0.5'}}></img>
      </div>


      <header className="App-header">
      <div className='homepage-container'>
      <p style={{display: 'flex', zIndex: "6"}}>Welcome to your Talent Trail! Discover your potential and find the right career path for you
      with our company. Whether you have a general idea about what you want to do, or have no idea what is 
      out there, we are sure to provide you some insight in the right direction for your future. We know
      it can be daunting trying to find the perfect job, which is why here at Talent Trail, we're viewing
      this as a mountainous climb and provide you with two options for your career assessment. One basic 
      assessment if you're in a hurry, and one detailed assessment if you really want some insight into your
      possible future career. 
      </p>

        <img src={TalentLogo} className="App-logo" width='350px'  style={{ float: "right", marginRight: "20px", padding: '30px', zIndex:4, borderRadius:'50px'}} alt='logo'/>
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
          <Button className="Submit-Button" onClick={handleSubmit}>Submit API Key</Button>
        </Form>
        
       
        <Button
          onClick={HandleResultsButton}
          variant="success"
          style={{ marginTop: "20px" }}
        >
          Analyze My Results
        </Button>
      </header>
      <div className="questions-div">
      <div className="basic-div">
        <p>
          In the mood for just a short journey? Take the path up the hill and take our Basic Questions
          assessment to get general idea about what awaits you at the end of your career path.
        </p>
      <Button onClick={() => navigate("/page-one") }>Go to Basic Questions</Button>
      </div>

      <div className="detailed-div">
        <p>
          Ready to climb Everest? Take the intense hike and journey through through the mountains with 
          our Detailed Questions assessment where you will need to put a bit more effort to reach the top
          and your end career destination. 
        </p>
      <Button onClick={() => navigate("/page-two")} style={{ marginLeft: '10px' }}>Go to Advanced Questions</Button>
      </div>
      </div>
    </div>

    
  );
};


const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/page-one" element={<PageOne />} />
      <Route path="/page-two" element={<PageTwo />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  </Router>
);

export default App;