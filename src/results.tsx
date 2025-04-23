import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resultText = location.state?.result || "No result found.";

  return (
    <Container style={{ paddingTop: '3rem', maxWidth: '700px' }}>
      <Card>
        <Card.Body>
          <Card.Title>Your Career Recommendation</Card.Title>
          <Card.Text style={{ whiteSpace: 'pre-wrap' }}>
            {resultText}
          </Card.Text>
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
