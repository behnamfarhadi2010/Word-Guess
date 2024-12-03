import React, { useState, useEffect, useCallback } from 'react';
import { Grid } from './components/Grid';
import { Keyboard } from './components/Keyboard';
import { getRandomWord, checkGuess } from './utils/words';
import { Sparkles, Trophy, RefreshCw } from 'lucide-react';

function App() {
  const [answer, setAnswer] = useState(getRandomWord());
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [usedLetters, setUsedLetters] = useState<Record<string, 'correct' | 'present' | 'absent'>>({});
  const [level, setLevel] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showRetry, setShowRetry] = useState(false);

  const handleKeyPress = useCallback((key: string) => {
    if (gameOver && !showSuccess) return;

    if (key === 'Enter') {
      if (currentGuess.length !== 5) return;
      
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      
      // Update used letters
      const results = checkGuess(currentGuess, answer);
      const newUsedLetters = { ...usedLetters };
      currentGuess.split('').forEach((letter, index) => {
        const status = results[index];
        if (!newUsedLetters[letter] || status === 'correct') {
          newUsedLetters[letter] = status;
        }
      });
      setUsedLetters(newUsedLetters);

      if (currentGuess === answer) {
        setGameOver(true);
        setShowSuccess(true);
        // Show success message for 2 seconds before moving to next level
        setTimeout(() => {
          handleNextLevel();
        }, 2000);
      } else if (newGuesses.length === 6) {
        setGameOver(true);
        setShowRetry(true);
      }
      
      setCurrentGuess('');
    } else if (key === '⌫') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key.toLowerCase());
    }
  }, [currentGuess, gameOver, guesses, answer, usedLetters, showSuccess]);

  const handleNextLevel = () => {
    setAnswer(getRandomWord());
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
    setUsedLetters({});
    setShowSuccess(false);
    setShowRetry(false);
    setLevel(prev => prev + 1);
  };

  const handleRetryLevel = () => {
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
    setUsedLetters({});
    setShowRetry(false);
  };

  const handleNewGame = () => {
    setAnswer(getRandomWord());
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
    setUsedLetters({});
    setShowSuccess(false);
    setShowRetry(false);
    setLevel(1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleKeyPress('Enter');
      } else if (e.key === 'Backspace') {
        handleKeyPress('⌫');
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
            Word Guess <Sparkles className="text-yellow-500" />
          </h1>
          <div className="text-lg font-semibold text-gray-600 mb-4">
            Level {level}
          </div>
          
          {showSuccess && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded-lg shadow-xl text-center transform scale-100 animate-bounce">
                <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Correct!</h2>
                <p className="text-gray-600">Moving to Level {level + 1}...</p>
              </div>
            </div>
          )}

          {showRetry && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded-lg shadow-xl text-center">
                <RefreshCw className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Keep Trying!</h2>
                <p className="text-gray-600 mb-4">The word was: {answer}</p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleRetryLevel}
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Retry Level
                  </button>
                  <button
                    onClick={handleNewGame}
                    className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
                  >
                    New Game
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <Grid
          guesses={guesses}
          currentGuess={currentGuess}
          answer={answer}
          maxGuesses={6}
        />

        <Keyboard
          onKeyPress={handleKeyPress}
          usedLetters={usedLetters}
        />
      </div>
    </div>
  );
}

export default App;