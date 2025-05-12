import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Container,  Spinner } from 'react-bootstrap';
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
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const resultText = location.state?.result || "No result found.";

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 2000); // Wait for 2 seconds
  }, []);


  return (
    <Container className="results-container">
      {loading ? (
         <div className="loading-screen">
          <Spinner animation="border" variant="primary" />
          <p>Loading your career recommendation...</p>
        </div>

      ): (
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
      )}</Container>
  );
};

export default Results;
