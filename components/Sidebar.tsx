// components/Sidebar.tsx
import React from 'react';

interface Question {
  question_id: string;
  // Add other properties of the Question type here
}

interface SidebarProps {
  questions: Question[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ questions, currentQuestionIndex, setCurrentQuestionIndex }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Questions</h2>
      <ul className="space-y-2">
        {questions.map((question, index) => (
          <li key={question.question_id}>
            <button
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-full text-left py-2 px-4 rounded-lg transition ${
                currentQuestionIndex === index ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 hover:bg-gray-200'
              }`}
            >
              Question {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
