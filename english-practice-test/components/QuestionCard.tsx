
import React from 'react';
import { Question, AnswerLetter, ErrorPart } from '../types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  userAnswer?: AnswerLetter;
  onSelectAnswer: (questionId: string, answer: AnswerLetter) => void;
}

const renderOptionText = (text: string) => {
    if (!text.includes('<u>')) {
        return text;
    }
    const parts = text.split(/<u>|<\/u>/g);
    return (
        <span>
            {parts.map((part, index) => 
                index % 2 === 1 ? <u key={index} className="no-underline font-semibold text-indigo-600">{part}</u> : <span key={index}>{part}</span>
            )}
        </span>
    );
};

const renderErrorQuestion = (parts: ErrorPart[]) => {
    return (
        <p className="text-lg text-gray-800 leading-relaxed">
            {parts.map((part, index) => (
                part.isErrorCandidate ? (
                    <span key={index}>
                        <span className="font-semibold text-indigo-600 underline decoration-dotted decoration-2 underline-offset-4">{part.text}</span>
                        <sup className="text-xs font-bold text-gray-500 ml-0.5">({part.letter})</sup>
                    </span>
                ) : (
                    <span key={index}>{part.text}</span>
                )
            ))}
        </p>
    );
};


export const QuestionCard: React.FC<QuestionCardProps> = ({ question, questionNumber, userAnswer, onSelectAnswer }) => {
  const isAnswered = userAnswer !== undefined;

  const getOptionClasses = (optionLetter: AnswerLetter) => {
    if (!isAnswered) {
      return 'bg-white hover:bg-indigo-50 border-gray-300';
    }
    if (optionLetter === question.answer) {
      return 'bg-green-100 border-green-500 text-green-800 ring-2 ring-green-400';
    }
    if (optionLetter === userAnswer) {
      return 'bg-red-100 border-red-500 text-red-800';
    }
    return 'bg-gray-50 border-gray-200 text-gray-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 p-6 mb-6 transition-all duration-300">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
          {questionNumber}
        </div>
        <div className="flex-1">
          {typeof question.question === 'string' ? (
             <p className="text-lg text-gray-800 mb-4 whitespace-pre-line">
                {'clozeId' in question ? `(${question.clozeId})` : question.question}
             </p>
          ) : (
            <div className="mb-4">{renderErrorQuestion(question.question as ErrorPart[])}</div>
          )}
          
          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.letter}
                onClick={() => onSelectAnswer(question.id, option.letter)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center space-x-4 ${getOptionClasses(option.letter)} ${!isAnswered ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              >
                <div className="w-6 h-6 rounded-md border-2 border-current flex-shrink-0 flex items-center justify-center font-semibold">
                  {option.letter}
                </div>
                <span className="flex-1 text-base">{renderOptionText(option.text)}</span>
              </button>
            ))}
          </div>

          {isAnswered && (
            <div className="mt-5 p-4 bg-gray-100 rounded-lg border border-gray-200">
              <p className="font-semibold text-gray-800">
                Correct Answer: <span className="text-green-600 font-bold">{question.answer}</span>
              </p>
              <p className="text-gray-700 mt-1">
                <span className="font-semibold">Explanation:</span> {question.explanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
