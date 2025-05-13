import React, { useState } from 'react';
import { Button, ProgressBar, Form } from 'react-bootstrap';
import NavBar from './navBar';
import { Alert } from 'react-bootstrap';
import './BasicQuestions.css';
import rockBar from './images/rockBar.png'


//Basic questions
export const questions = [
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
  },
  {
    question: "Which activity sounds most enjoyable to you?",
    options: ["Designing a product", "Analyzing data", "Helping someone solve a problem", "Managing a team"]
  },
  {
    question: "How do you prefer to work on tasks?",
    options: ["Independently", "In a team", "With direct supervision", "With flexibility and creativity"]
  },
  {
    question: "What is most important to you in a job?",
    options: ["Work-life balance", "Opportunities for growth", "Making a difference", "Recognition and rewards"]
  },
  {
    question: "Which of these sounds most like you?",
    options: ["Leader", "Follower", "Active", "Passive"]
  }
];

// Key used for localStorage
const userAnswers = 'basic-quiz-answers';

const PageOne: React.FC = () => {
  const [answers, setAnswers] = useState<(string | null)[]>(
    () => JSON.parse(localStorage.getItem(userAnswers) || 'null') ?? Array(questions.length).fill(null)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 4;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

  const [showCompletionMessage, setShowCompletionMessage] = useState(false); // 👈 New state


  
  // Watch for completion
  React.useEffect(() => {
    if (answers.every((a) => a !== null)) {
      setShowCompletionMessage(true);
    } else {
      setShowCompletionMessage(false);
    }
  }, [answers]);

  const handleAnswer = (index: number, option: string) => {
    const newAnswers = [...answers];
    newAnswers[startIndex + index] = option;
    setAnswers(newAnswers);
    localStorage.setItem(userAnswers, JSON.stringify(newAnswers));
  };

  const handleClearAnswers = () => {
  setAnswers(Array(questions.length).fill(null)); // Reset state
  localStorage.removeItem(userAnswers); // Clear local storage
}

  const progress = Math.round((answers.filter(answer => answer !== null).length / questions.length) * 100);

  return (
    <div className='basic-questions'>
      <NavBar />
      <div className='body'>
        <h1>Career Quiz</h1>
        <div className='rock-progress-bar'>
        <img src={rockBar} alt="rock-bar" style={{position: 'relative', bottom:"152px", right: "30px", height:"310px"}}></img>
         <img src={rockBar} alt="rock-bar" style={{position: 'relative', bottom:"462px", left: "190px", height:"310px"}}></img>
        </div>
        <ProgressBar now={progress} label={`${progress}%`} style={{ marginBottom: '20px', zIndex:'10' }} />
        {showCompletionMessage && (
          <Alert variant="success">
            🎉 You've completed all the basic questions! Well done!
          </Alert>
        )}

        {currentQuestions.map((q, index) => (
          <div key={startIndex + index} style={{ marginBottom: '20px' }}>
            <h4>{q.question}</h4>
            <Form style={{ display: 'inline-block', textAlign: 'left' }}>
              {q.options.map((option, i) => (
                <Form.Check
                  type="radio"
                  label={option}
                  name={`question-${startIndex + index}`}
                  key={i}
                  checked={answers[startIndex + index] === option}
                  onChange={() => handleAnswer(index, option)}
                />
              ))}
            </Form>
          </div>
        ))}

        {/* Page navigation */}
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
        <Button className="clear-answers" onClick={handleClearAnswers}style={{marginRight: "20px"}}>
          Clear Answers
        </Button>
        <Button>
          Get Results
        </Button>
      </div>
    </div>
  );
};


export default PageOne;
