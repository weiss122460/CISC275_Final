import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ProgressBar, Form } from 'react-bootstrap';

const questions = [
  "What is your dream job and why?",
  "Describe a task or project that made you feel accomplished.",
  "What is one skill you would like to improve?",
];

const PageTwo: React.FC = () => {
  const navigate = useNavigate();
  //an array of strings initally all set empty that correlates to the index of the 'questions' array const
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill("")); 
  //an array of booleans meant to describe the status of the answers (whether its been answer or not)
  //each answer submitted answer will change the array to true to the correlating question answered
  const [submitted, setSubmitted] = useState<boolean[]>(Array(questions.length).fill(false));
  //results will only be avaliable once all questions have been answers (the submitted array is all true)
  const[results, setResults] = useState<boolean>(false);
  //will allow the user to change the answer to one of the questions when given a button 


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

  const handleChangeAnswer = (index: number) => {
      if (answers[index].trim() !== "") {
        const newSubmitted = [...submitted];
        newSubmitted[index] = false;
        setSubmitted(newSubmitted);
      }
    }

  const progress:number = Math.round((submitted.filter(answer => answer).length / questions.length) * 100);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
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
            <Button
            onClick={() => handleChangeAnswer(index)}
            disabled={!submitted[index] || answers[index].trim() === ""}
            style={{marginTop: '10px'}}>
              Change Answer
            </Button>
          </Form>
        </div>
      ))}
      <Button onClick={() => navigate("/")}>Go Back to Home</Button>
    </div>
  );
};

export default PageTwo;
