import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; 
import { questions as basicQuestions } from './BasicQuestions';
import { questions as advancedQuestions } from './AdvancedQuestions';
import PageOne from './BasicQuestions';
import PageTwo from './AdvancedQuestions';
import NavBar from './navBar';

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

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState<string>("");

  // Load stored key on mount
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
      return;
    }
  
    const basicAnswers = JSON.parse(localStorage.getItem("basic-quiz-answers") || '[]');
    const advancedAnswers = JSON.parse(localStorage.getItem("advanced-quiz-answers") || '[]');
    const allAnswers = [...basicAnswers, ...advancedAnswers];
    const allQuestions = [...basicQuestions, ...advancedQuestions];
  
    if (allAnswers.length === 0 || allAnswers.every(ans => !ans || ans.trim() === "")) {
      alert("Please complete the quiz first.");
      return;
    }
  
    const qaPairs = allQuestions.map((question, index) => {
      const answer = allAnswers[index] || "(No answer provided)";
      return `Q${index + 1}: ${question}\nA${index + 1}: ${answer}`;
    });
  
    const prompt = `Given the following career quiz responses, provide a brief career recommendation and explain your reasoning:\n\n${qaPairs.join("\n\n")}`;
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a friendly and insightful career advisor. Your goal is to provide a personalized career suggestion based on the user's quiz responses",
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
      alert(reply); // could replace this with a results page
    } catch (error) {
      console.error("OpenAI error:", error);
      alert("There was an error processing your request.");
    }
  };
  
  
  

  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <img src={`${process.env.PUBLIC_URL}/logo192.png`} className="App-logo" alt="logo" />
        <p>Ryan Weiss, Ever Merino, Dylan Frajerman</p>
        <p>Edit <code>src/App.tsx</code> and save to reload.</p>

        <Button onClick={() => navigate("/page-one")}>Go to Basic Questions</Button>
        <Button onClick={() => navigate("/page-two")} style={{ marginLeft: '10px' }}>Go to Advanced Questions</Button>

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
          onClick={sendToOpenAI}
          variant="success"
          style={{ marginTop: "20px" }}
        >
          Analyze My Results
        </Button>
      </header>
    </div>
  );
};


const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/page-one" element={<PageOne />} />
      <Route path="/page-two" element={<PageTwo />} />
    </Routes>
  </Router>
);

export default App;