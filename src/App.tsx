
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';  // Changed to HashRouter
import PageOne from './BasicQuestions';
import PageTwo from './AdvancedQuestions';
import NavBar from './navBar';


// Helper functions for API key handling
const saveKeyData = "MYKEY";
      <NavBar />
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
