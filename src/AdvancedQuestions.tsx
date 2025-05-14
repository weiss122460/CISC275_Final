import React, { useState, useRef} from 'react';
import { Button, ProgressBar, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from './navBar';
import { Alert } from 'react-bootstrap';
import './AdvancedQuestions.css';
import snowFalling from "./images/snowFalling.gif"
import rockBar from "./images/rockBar.png"
import Footer from './footer';

//Advanced questions
export const questions = [
  "What is your dream job and why?",
  "Describe a task or project that made you feel accomplished.",
  "What is one skill you would like to improve?",
  "Who has had the biggest impact on your personal or professional growth, and how?",
  "What motivates you to keep going when things get tough?",
  "If you could learn anything instantly, what would it be and why?",
  "Where do you see yourself in 5 years?"
];

//key for local storage
const userAnswers = 'advanced-quiz-answers';


const AdvancedQuestions: React.FC = () => {
  // Load from local storage or initialize
  const [answers, setAnswers] = useState<string[]>(
    () => JSON.parse(localStorage.getItem(userAnswers) || 'null') ?? Array(questions.length).fill("")
  );
  const [submitted, setSubmitted] = useState<boolean[]>(
    () => answers.map(ans => ans.trim() !== "")
  );
  const [showCompletionMessage, setShowCompletionMessage] = useState(false); // 👈 New state

  //page setup
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 4;
  const navigate = useNavigate();
  const gotRequest = useRef(false);

  // Effect to check for completion
  React.useEffect(() => {
    if (submitted.every((s) => s)) {
      setShowCompletionMessage(true);
    } else {
      setShowCompletionMessage(false);
    }
  }, [submitted]);



  // handles responses
  const handleAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    localStorage.setItem(userAnswers, JSON.stringify(newAnswers));
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
  };

  const location = useLocation();
  const apiKey = location.state?.apiKey || "";
  console.log("Received API Key", apiKey)

  const sendToOpenAI = async () => {
      if (!apiKey) {
        alert("Please enter your API key first.");
        return null;
      }

      const advancedAnswers: string[] = JSON.parse(localStorage.getItem("advanced-quiz-answers") || '[]');
      
      const isAdvancedValid = advancedAnswers.every((ans) => ans && ans.trim() !== "");
    
      if (!isAdvancedValid) {
        alert("Please complete all questions in the quiz before submitting.");
        return null;
      }
    
      let selectedAnswers: string[] = [];
      let selectedQuestions: string[] = [];

      if (isAdvancedValid) {
        selectedAnswers = [...selectedAnswers, ...advancedAnswers];
        selectedQuestions = [...selectedQuestions, ...questions];
      }
    
      // Build markdown-style formatted QA pairs
      const qaPairs = selectedQuestions.map((question, index) => {
        const answer = selectedAnswers[index] || "(No answer provided)";
        return `**Q${index + 1}:** ${question}\n**A${index + 1}:** ${answer}`;
      });
    
      const prompt = `Please analyze the following career quiz answers and provide 3 clear, well-formatted career recommendations with their average salaries. Use paragraphs, bullet points, or section headers if necessary.\n\n${qaPairs.join("\n\n")}`;
    
      const tone = "You are a helpful and friendly career advisor. Your reply should be concise, well-structured, and easy to read. Use markdown formatting such as bold text, line breaks, or bullet points when helpful.";
    
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4.1",
            messages: [
              { role: "system", content: tone },
              { role: "user", content: prompt },
            ],
          }),
        });
    
        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "No reply.";
        return reply;
      } catch (error) {
        console.error("OpenAI error:", error);
        alert("There was an error processing your request.");
      }
    };
    
    
  
    const HandleResultsButton = async (): Promise<void> => {
      if (gotRequest.current) return;
      gotRequest.current = true;
      const reply = await sendToOpenAI();
      if (reply) {
        navigate("/detailedResults", { state: { result: reply } });
      }
      gotRequest.current = false;
    };

  const progress: number = Math.round((submitted.filter(answer => answer).length / questions.length) * 100);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  return (
    <div className='advanced-questions'>
      <div className='snow-container'>
      <img src={snowFalling} className="snow-falling" alt="snowFalling"></img>
      </div>
      <NavBar />
      <div className='body' style={{zIndex:2}}>
        <h1>Career Quiz - Short Answer</h1>
        <div className='rock-progress-bar'>
        <img src={rockBar} alt="rock-bar" style={{position: 'relative', bottom:'153px', right:'10px', height:'310px'}}></img>
        <img src={rockBar} alt="rock-bar" style={{position: 'relative', bottom:'462px', left:'200px', height:'310px'}}></img>
        </div>
        <ProgressBar now={progress} className='progress' label={`${progress}%`} style={{ marginBottom: '20px'}} />

        {showCompletionMessage && (
          <Alert variant="success">
            🎉 You've completed all the advanced questions! Great job!
          </Alert>
        )}

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
          <Button onClick={HandleResultsButton}>
                  Get Results
                </Button>
      </div>
      <Footer />
    </div>
  );
};


export default AdvancedQuestions;
