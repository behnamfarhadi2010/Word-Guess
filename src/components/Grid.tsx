import React from 'react';
import { cn } from '../utils/cn';

interface GridProps {
  guesses: string[];
  currentGuess: string;
  answer: string;
  maxGuesses: number;
}

export const Grid: React.FC<GridProps> = ({ guesses, currentGuess, answer, maxGuesses }) => {
  const emptyRows = Math.max(0, maxGuesses - guesses.length - 1);

  const getCellStyle = (letter: string, index: number, row: string) => {
    if (!letter) return 'bg-gray-100 border-2 border-gray-300';
    
    if (letter === answer[index]) {
      return 'bg-green-500 text-white border-green-600';
    }
    if (answer.includes(letter)) {
      return 'bg-yellow-500 text-white border-yellow-600';
    }
    return 'bg-gray-600 text-white border-gray-700';
  };

  const renderCell = (letter: string, index: number, row: string) => (
    <div
      key={index}
      className={cn(
        'w-14 h-14 flex items-center justify-center text-2xl font-bold rounded',
        getCellStyle(letter, index, row)
      )}
    >
      {letter.toUpperCase()}
    </div>
  );

  const renderRow = (guess: string, index: number) => (
    <div key={index} className="grid grid-cols-5 gap-2">
      {guess.split('').map((letter, i) => renderCell(letter, i, guess))}
    </div>
  );

  const renderCurrentRow = () => {
    if (guesses.length >= maxGuesses) return null;
    const currentGuessArray = currentGuess
      .split('')
      .concat(Array(5 - currentGuess.length).fill(''));

    return (
      <div className="grid grid-cols-5 gap-2">
        {currentGuessArray.map((letter, i) => renderCell(letter, i, currentGuess))}
      </div>
    );
  };

  const renderEmptyRow = (index: number) => (
    <div key={index} className="grid grid-cols-5 gap-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="w-14 h-14 flex items-center justify-center text-2xl font-bold rounded bg-gray-100 border-2 border-gray-300"
        />
      ))}
    </div>
  );

  return (
    <div className="grid gap-2 mb-8">
      {guesses.map((guess, i) => renderRow(guess, i))}
      {renderCurrentRow()}
      {Array.from({ length: emptyRows }).map((_, i) => renderEmptyRow(i))}
    </div>
  );
};