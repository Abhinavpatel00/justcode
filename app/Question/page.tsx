// pages/QuestionsPage.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Question from '@/components/Question';
import Feedback from '@/components/Feedback';
import Sidebar from '@/components/Sidebar';
import ResultPopup from '@/components/ResultPopup';

const fetchQuestions = async (): Promise<Question[]> => {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .limit(10); // Limit the number of rows to 10

  if (error) {
    console.error('Error fetching questions:', error);
    return [];
  }

  return data || [];
};

const validateAnswers = async (answers: Record<number, string>) => {
  const { data, error } = await supabase
    .from('questions')
    .select('question_id, answer')
    .in('question_id', Object.keys(answers).map(Number));

  if (error) {
    console.error('Error validating answers:', error);
    return {};
  }

  const results: Record<number, boolean> = {};
  data.forEach((question) => {
    results[question.question_id] = answers[question.question_id] === question.answer;
  });

  return results;
};

const QuestionsPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, boolean>>({});
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  const [showResultPopup, setShowResultPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedQuestions = await fetchQuestions();
      setQuestions(fetchedQuestions);
    };
    fetchData();

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOptionChange = (question_id: number, answer: string) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question_id]: answer,
    }));
  };

  const handleSubmit = async () => {
    const results = await validateAnswers(userAnswers);
    setFeedback(results);
    setShowResultPopup(true);
    setTimeRemaining(0); // Stop the timer
  };

  const closeResultPopup = () => {
    setShowResultPopup(false);
  };

  const correctAnswers = Object.values(feedback).filter(Boolean).length;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-500 p-8 flex">
      <Sidebar
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
      />
      <main className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg flex-1 ml-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Quiz Questions</h1>
          <div className="text-lg font-semibold text-gray-800">
            Time Remaining: {formatTime(timeRemaining)}
          </div>
        </div>
        {questions.length > 0 && (
          <Question
            question={questions[currentQuestionIndex]}
            userAnswer={userAnswers[questions[currentQuestionIndex].question_id]}
            handleOptionChange={handleOptionChange}
          />
        )}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1))}
            disabled={currentQuestionIndex === questions.length - 1}
            className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600"
          >
            Next
          </button>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-8 rounded-lg hover:bg-blue-600"
          >
            Submit Quiz
          </button>
        </div>
        {Object.keys(feedback).length > 0 && (
          <Feedback questions={questions} userAnswers={userAnswers} feedback={feedback} />
        )}
        {showResultPopup && (
          <ResultPopup
            correctAnswers={correctAnswers}
            totalQuestions={questions.length}
            onClose={closeResultPopup}
          />
        )}
      </main>
    </div>
  );
};

export default QuestionsPage;
