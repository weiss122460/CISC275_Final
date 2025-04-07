import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';  // Changed to HashRouter
import PageOne from './BasicQuestions';
import PageTwo from './AdvancedQuestions';
import NavBar from './navBar';

// Helper functions for API key handling
const saveKeyData = "MYKEY";

// Pure function to get the stored API key
const getStoredKey = (): string => {
  const prevKey = localStorage.getItem(saveKeyData);
  return prevKey ? JSON.parse(prevKey) : "";
};

// Pure function to save the API key
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

  // Handle API key submission using useCallback (optimizing function reference)
  const handleSubmit = useCallback(() => {
    saveApiKey(key);
  }, [key]);

  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <img src={`${process.env.PUBLIC_URL}/logo192.png`} className="App-logo" alt="logo" />

        <p>Ryan Weiss, Ever Merino, Dylan Frajerman</p>
        <p>Edit <code>src/App.tsx</code> and save to reload.</p>

        <Button onClick={() => navigate("/page-one")}>Go to Basic Questions</Button>
        <Button onClick={() => navigate("/page-two")} style={{ marginLeft: '10px' }}>Go to Advanced Questions</Button>
      </header>

      <Form>
        <Form.Label>API Key:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Insert API Key Here"
          value={key}
          onChange={(e) => setKey(e.target.value)}  // Functional update pattern
        />
        <br />
        <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
      </Form>
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