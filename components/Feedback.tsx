// components/Feedback.tsx
import React from 'react';

interface Question {
  question_id: number;
  question_text: string;
  answer: string;
}

interface FeedbackProps {
  questions: Question[];
  userAnswers: Record<number, string>;
  feedback: Record<number, boolean>;
}

const Feedback: React.FC<FeedbackProps> = ({ questions, userAnswers, feedback }) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Feedback</h2>
      <ul className="space-y-4">
        {questions.map((question) => (
          <li key={question.question_id} className="border-b border-gray-300 pb-4">
            <h3 className="text-lg font-medium text-gray-800">{question.question_text}</h3>
            <p className={`mt-2 ${feedback[question.question_id] ? 'text-green-500' : 'text-red-500'}`}>
              Your answer: {userAnswers[question.question_id] || 'Not answered'} -{' '}
              {feedback[question.question_id] ? 'Correct' : `Incorrect (Correct answer: ${question.answer})`}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feedback;
