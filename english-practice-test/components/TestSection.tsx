
import React from 'react';
import { Section, Question as QuestionType, AnswerLetter, UserAnswers } from '../types';
import { QuestionCard } from './QuestionCard';

interface TestSectionProps {
  section: Section;
  userAnswers: UserAnswers;
  onSelectAnswer: (questionId: string, answer: AnswerLetter) => void;
  questionNumberOffset: number;
}

export const TestSection: React.FC<TestSectionProps> = ({ section, userAnswers, onSelectAnswer, questionNumberOffset }) => {
  return (
    <div id={section.id} className="mb-12">
      <div className="mb-8 p-6 bg-white rounded-xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
        <p className="text-lg text-indigo-600 font-medium">{section.subtitle}</p>
      </div>

      {section.content && (
        <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-400 text-gray-700 rounded-r-lg">
          <p className="italic leading-relaxed whitespace-pre-line">{section.content}</p>
        </div>
      )}

      <div>
        {section.questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            questionNumber={questionNumberOffset + index + 1}
            userAnswer={userAnswers[question.id]}
            onSelectAnswer={onSelectAnswer}
          />
        ))}
      </div>
    </div>
  );
};
