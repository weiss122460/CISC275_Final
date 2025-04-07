import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ProgressBar, Form } from 'react-bootstrap';
import NavBar from './navBar';

const questions = [
  {
    question: "What type of work environment do you prefer?",
    options: ["Office setting", "Remote work", "Outdoor work", "Lab/research"]
  },
  {
    question: "Which skill do you enjoy using the most?",
    options: ["Problem-solving", "Creativity", "Team leadership", "Technical expertise"]
  },
  {
    question: "What motivates you in a career?",
    options: ["Job stability", "High salary", "Helping others", "Innovating new ideas"]
  }
];

const PageOne: React.FC = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleAnswer = (index: number, option: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

  const progress = Math.round((answers.filter(answer => answer !== null).length / questions.length) * 100);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <NavBar />
      <h1>Career Quiz</h1>
      <ProgressBar now={progress} label={`${progress}%`} style={{ marginBottom: '20px' }} />
      {questions.map((q, index) => (
        <div key={index} style={{ marginBottom: '20px', textAlign: 'center' }}>
          <h4>{q.question}</h4>
          <Form style={{ display: 'inline-block', textAlign: 'left' }}>
            {q.options.map((option, i) => (
              <Form.Check
                type="radio"
                label={option}
                name={`question-${index}`}
                key={i}
                checked={answers[index] === option}
                onChange={() => handleAnswer(index, option)}
              />
            ))}
          </Form>
        </div>
      ))}
      <Button onClick={() => navigate("/")}>Go Back to Home</Button>
    </div>
  );
};

export default PageOne;
