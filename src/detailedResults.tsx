import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';
import './detailedResults.css';
import loadingBear from './images/loadingBear.gif'

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

const AdvancedResults: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const resultText = location.state?.result || "No result found.";

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 5000); // Wait for 2 seconds
  }, []);


  return (
    <div className='detailed-results'>
    <Container className="detailed-results-container">
      {loading ? (
         <div className="detailed-loading-screen">
          <img src={loadingBear} alt='footsteps' style={{position:'relative', height:'440px',}}></img>
          <p>Loading your career recommendation...</p>
        </div>

      ): (
      <Card className="detailed-results-card">
        <Card.Body>
          <Card.Title className="detailed-results-title">Your Career Recommendation</Card.Title>
          <div className="detailed-results-content">
            {parseMarkdownBold(resultText)}
          </div>
          <div className="detailed-results-button">
            <Button variant="success" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </Card.Body>
      </Card>
      )}</Container>
      </div>
  );
  
};

export default AdvancedResults;
