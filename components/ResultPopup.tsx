// components/ResultPopup.tsx
import React from 'react';

interface ResultPopupProps {
  correctAnswers: number;
  totalQuestions: number;
  onClose: () => void;
}

const ResultPopup: React.FC<ResultPopupProps> = ({ correctAnswers, totalQuestions, onClose }) => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const getMotivationalMessage = () => {
    if (percentage >= 80) {
      return "Great job! You're on your way to mastery!";
    } else if (percentage >= 50) {
      return "Good effort! Keep studying and you'll get even better!";
    } else {
      return "Don't worry, keep practicing and you'll improve!";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        <p className="mb-2">You answered {correctAnswers} out of {totalQuestions} questions correctly.</p>
        <p className="mb-2">Your score: {percentage}%</p>
        <p className="mb-4">{getMotivationalMessage()}</p>
        {/* Placeholder for detailed analysis */}
        <div className="mb-4">
          <h3 className="font-semibold">Detailed Analysis:</h3>
          <ul className="list-disc pl-6">
            <li>Your strongest topic was XYZ.</li>
            <li>You need to focus more on ABC topic.</li>
            <li>Consider revisiting Chapter 5 for better understanding.</li>
            {/* More detailed analysis can be added here */}
          </ul>
        </div>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ResultPopup;
