import React, { useState } from 'react';
import { Button, ProgressBar, Form } from 'react-bootstrap';
import NavBar from './navBar';
import './AdvancedQuestions.css';

const questions = [
  "What is your dream job and why?",
  "Describe a task or project that made you feel accomplished.",
  "What is one skill you would like to improve?"
];

const PageTwo: React.FC = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [submitted, setSubmitted] = useState(Array(questions.length).fill(false));

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

  return (
    <div className ='advanced-questions'>
      <NavBar />
      <div className='body'>
      <h1>Career Quiz - Short Answer</h1>
      <ProgressBar now={progress} label={`${progress}%`} style={{ marginBottom: '20px' }} />
      {questions.map((q, index) => (
        <div key={index} style={{ marginBottom: '20px', textAlign: 'center' }}>
          <h4>{q}</h4>
          <Form>
            <Form.Control
              type="text"
              placeholder="Type your answer here"
              value={answers[index]}
              onChange={(e) => handleAnswer(index, e.target.value)}
              disabled={submitted[index]}
            />
            <Button 
              onClick={() => handleSubmit(index)} 
              disabled={submitted[index] || answers[index].trim() === ""} 
              style={{ marginTop: '10px' }}
            >
              Submit
            </Button>
          </Form>
        </div>
      ))}
   </div>
    </div>
  );
};

export default PageTwo;
