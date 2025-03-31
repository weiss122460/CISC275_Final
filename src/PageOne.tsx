import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const PageOne: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Page One</h1>
      <p>This is the first additional page.</p>
      <Button onClick={() => navigate("/")}>Go Back to Home</Button>
    </div>
  );
};

export default PageOne;
