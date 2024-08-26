// components/Question.tsx
import React from 'react';

interface QuestionProps {
  question: {
    question_text: string;
    option_1: string;
    option_2: string;
    option_3: string;
    option_4: string;
    question_id: number;
  };
  userAnswer: string | undefined;
  handleOptionChange: (question_id: number, answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, userAnswer, handleOptionChange }) => {
  return (
    <div className="border-b border-gray-300 pb-4">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{question.question_text}</h2>
      <div className="space-y-2">
        {['option_1', 'option_2', 'option_3', 'option_4'].map((optionKey) => {
          const optionValue = question[optionKey as keyof typeof question];
          return (
            optionValue && (
              <label key={optionKey} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`question_${question.question_id}`}
                  value={optionValue}
                  checked={userAnswer === optionValue}
                  onChange={() => handleOptionChange(Number(question.question_id), optionValue)}
                  className="form-radio"
                />
                <span className="text-gray-800">{optionValue}</span>
              </label>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Question
