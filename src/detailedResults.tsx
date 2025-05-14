import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';
import './detailedResults.css';
import loadingBear from './images/loadingBear.gif'
import Footer from './footer';

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

  const [copied, setCopied] = useState(false);
  const shareText = `I got this career recommendation: ${resultText.replace(/\*\*/g, '')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <div className='detailed-resuts'>
          <div className="detailed-results-content">
            {parseMarkdownBold(resultText)}
          </div>
          <div className="detailed-results-button">
            <Button variant="success" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
          </div>
          <div className="share-section mt-4">
          <h5>Share Your Result</h5>
          <p>{shareText}</p>
          <Button variant="outline-primary" onClick={handleCopy} className="me-2">
            {copied ? "Copied!" : "Copy to Clipboard"}
          </Button>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline-info">Share on X (Twitter)</Button>
          </a>
          
        </div>
        <Footer/>
        </Card.Body>
      </Card>
      )} 
      </Container>
      </div>
  );
  
};

export default AdvancedResults;
