
import React, { useState, useMemo, useCallback } from 'react';
import { testData } from './data/testData';
import { UserAnswers, AnswerLetter, Question } from './types';
import { TestSection } from './components/TestSection';

const App: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});

  const allQuestions = useMemo(() => testData.flatMap(section => section.questions), []);
  const totalQuestions = allQuestions.length;

  const handleSelectAnswer = useCallback((questionId: string, answer: AnswerLetter) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));
  }, []);
  
  const handleReset = () => {
    setUserAnswers({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const score = useMemo(() => {
    return allQuestions.reduce((acc, question) => {
      if (userAnswers[question.id] === question.answer) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }, [userAnswers, allQuestions]);

  const answeredQuestions = Object.keys(userAnswers).length;

  let questionCounter = 0;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="sticky top-0 bg-white/80 backdrop-blur-lg shadow-sm z-10 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
          <div className='text-center sm:text-left mb-2 sm:mb-0'>
            <h1 className="text-2xl font-bold text-indigo-600">English Practice Test</h1>
            <p className="text-gray-600">Test your knowledge and improve your skills.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
                <span className="font-bold text-xl text-indigo-600">{score} / {totalQuestions}</span>
                <p className="text-sm text-gray-500">Score</p>
            </div>
             <div className="text-center">
                <span className="font-bold text-xl text-indigo-600">{answeredQuestions} / {totalQuestions}</span>
                <p className="text-sm text-gray-500">Answered</p>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {testData.map(section => {
          const sectionComponent = (
            <TestSection
              key={section.id}
              section={section}
              userAnswers={userAnswers}
              onSelectAnswer={handleSelectAnswer}
              questionNumberOffset={questionCounter}
            />
          );
          questionCounter += section.questions.length;
          return sectionComponent;
        })}
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 English Practice App. Created for practice purposes.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
