import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ProgressBar, Form } from 'react-bootstrap';
import NavBar from './navBar';

const questions = [
  "What is your dream job and why?",
  "Describe a task or project that made you feel accomplished.",
  "What is one skill you would like to improve?",
  "Who has had the biggest impact on your personal or professional growth, and how?",
  "What motivates you to keep going when things get tough?",
  "If you could learn anything instantly, what would it be and why?"
];

const QUESTIONS_PER_PAGE = 3;

const PageTwo: React.FC = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [submitted, setSubmitted] = useState(Array(questions.length).fill(false));
  const [currentPage, setCurrentPage] = useState(1);

  const handleAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (index: number) => {
    if (answers[index].trim() !== "") {
      const newSubmitted = [...submitted];
      newSubmitted[index] = true;
      setSubmitted(newSubmitted);
    }
  };

  const progress = Math.round((submitted.filter(answer => answer).length / questions.length) * 100);

  const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const endIndex = startIndex + QUESTIONS_PER_PAGE;

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <NavBar />
      <h1>Career Quiz - Short Answer</h1>
      <ProgressBar now={progress} label={`${progress}%`} style={{ marginBottom: '20px' }} />

      {questions.slice(startIndex, endIndex).map((q, index) => {
        const actualIndex = startIndex + index;
        return (
          <div key={actualIndex} style={{ marginBottom: '20px' }}>
            <h4>{q}</h4>
            <Form>
              <Form.Control
                type="text"
                placeholder="Type your answer here"
                value={answers[actualIndex]}
                onChange={(e) => handleAnswer(actualIndex, e.target.value)}
                disabled={submitted[actualIndex]}
              />
              <Button
                onClick={() => handleSubmit(actualIndex)}
                disabled={submitted[actualIndex] || answers[actualIndex].trim() === ""}
                style={{ marginTop: '10px' }}
              >
                Submit
              </Button>
            </Form>
          </div>
        );
      })}

      {/* Page Navigation */}
      <div style={{ marginBottom: '20px' }}>
        {[...Array(totalPages)].map((_, i) => (
          <Button
            key={i}
            variant={currentPage === i + 1 ? 'primary' : 'outline-primary'}
            onClick={() => setCurrentPage(i + 1)}
            style={{ margin: '0 5px' }}
          >
            {i + 1}
          </Button>
        ))}
      </div>

      <Button onClick={() => navigate("/")}>Go Back to Home</Button>
    </div>
  );
};

export default PageTwo;