import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';

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
    <Container style={{ paddingTop: '3rem', maxWidth: '700px' }}>
      <Card>
        <Card.Body>
          <Card.Title>Your Career Recommendation</Card.Title>
          <div
            style={{
              maxHeight: '70vh',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap',
              padding: '0.5rem',
              marginBottom: '1rem',
              border: '1px solid #eee',
              borderRadius: '0.25rem',
              background: '#f8f9fa',
            }}
          >
            {parseMarkdownBold(resultText)}
          </div>
          <div className="d-flex justify-content-end">
            <Button variant="primary" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Results;
