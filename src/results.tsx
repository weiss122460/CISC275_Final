import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';
import './results.css';

// Simple Markdown-like bolding for **text**
const parseMarkdownBold = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={idx}>{part.slice(2, -2)}</strong>;
    }
    return <span key={idx}>{part}</span>;
  });
};

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resultText = location.state?.result || "No result found.";

  return (
    <Container className="results-container">
      <Card className="results-card">
        <Card.Body>
          <Card.Title className="results-title">Your Career Recommendation</Card.Title>
          <div className="results-content">
            {parseMarkdownBold(resultText)}
          </div>
          <div className="results-button">
            <Button variant="success" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Results;
