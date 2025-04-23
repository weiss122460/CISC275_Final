import React, { useState} from 'react';
import { Button, ProgressBar, Form } from 'react-bootstrap';
import NavBar from './navBar';
import './AdvancedQuestions.css';

export const questions = [
  "What is your dream job and why?",
  "Describe a task or project that made you feel accomplished.",
  "What is one skill you would like to improve?",
  "Who has had the biggest impact on your personal or professional growth, and how?",
  "What motivates you to keep going when things get tough?",
  "If you could learn anything instantly, what would it be and why?",
  "Where do you see yourself in 5 years?"
];

const questionsPerPage = 4;
const ANSWERS_KEY = 'advanced-quiz-answers';

const PageTwo: React.FC = () => {
  // Load from localStorage or initialize
  const [answers, setAnswers] = useState<string[]>(
    () => JSON.parse(localStorage.getItem(ANSWERS_KEY) || 'null') ?? Array(questions.length).fill("")
  );
  const [submitted, setSubmitted] = useState<boolean[]>(
    () => answers.map(ans => ans.trim() !== "")
  );
  const [currentPage, setCurrentPage] = useState(1);



  const handleAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    localStorage.setItem(ANSWERS_KEY, JSON.stringify(newAnswers));
  };

  const handleSubmit = (index: number) => {
    if (answers[index].trim() !== "") {
      const newSubmitted = [...submitted];
      newSubmitted[index] = true;
      setSubmitted(newSubmitted);
    }
  };

  function handleResults(){
    
  }

  const handleChangeAnswer = (index: number) => {
    if (answers[index].trim() !== "") {
      const newSubmitted = [...submitted];
      newSubmitted[index] = false;
      setSubmitted(newSubmitted);
    }
  };

  const progress: number = Math.round((submitted.filter(answer => answer).length / questions.length) * 100);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  return (
    <div className='advanced-questions'>
      <NavBar />
      <div className='body'>
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
                <Button
                  onClick={() => handleChangeAnswer(actualIndex)}
                  disabled={!submitted[actualIndex] || answers[actualIndex].trim() === ""}
                  style={{ marginTop: '10px', marginLeft: '10px' }}
                >
                  Change Answer
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
      </div>

      <Button
      disabled>
        Get Results!
      </Button>
    </div>
  );
};

export default PageTwo;
