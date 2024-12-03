import React from 'react';
import { cn } from '../utils/cn';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  usedLetters: Record<string, 'correct' | 'present' | 'absent' | undefined>;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
];

export const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, usedLetters }) => {
  const getKeyStyle = (key: string) => {
    const status = usedLetters[key.toLowerCase()];
    return cn(
      'px-2 py-4 rounded m-0.5 font-bold text-sm cursor-pointer transition-colors',
      'hover:bg-gray-400 active:bg-gray-500',
      status === 'correct' && 'bg-green-500 text-white hover:bg-green-600',
      status === 'present' && 'bg-yellow-500 text-white hover:bg-yellow-600',
      status === 'absent' && 'bg-gray-600 text-white hover:bg-gray-700',
      !status && 'bg-gray-200'
    );
  };

  return (
    <div className="max-w-lg mx-auto p-2">
      {KEYBOARD_ROWS.map((row, i) => (
        <div key={i} className="flex justify-center mb-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={getKeyStyle(key)}
              style={{ minWidth: key.length > 1 ? '65px' : '40px' }}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};