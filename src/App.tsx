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
      <header className="App-header">
        <img src={TalentLogo} className="App-logo" width='350px' alt='logo' />
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
      <Button onClick={() => navigate("/page-one")}>Go to Basic Questions</Button>
      </div>

      <div className="detailed-div">
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
      <Route path="/basic-questions" element={<PageOne />} />
      <Route path="/advanced-questions" element={<PageTwo />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  </Router>
);

export default App;