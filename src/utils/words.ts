// List of 5-letter words for the game
export const wordList = [
  'react', 'state', 'props', 'hooks', 'redux',
  'build', 'style', 'class', 'async', 'await',
  'fetch', 'route', 'stack', 'queue', 'array'
];

export const getRandomWord = () => {
  return wordList[Math.floor(Math.random() * wordList.length)];
};

export const checkGuess = (guess: string, answer: string): ('correct' | 'present' | 'absent')[] => {
  const result: ('correct' | 'present' | 'absent')[] = [];
  const answerArray = answer.split('');
  
  guess.split('').forEach((letter, index) => {
    if (letter === answerArray[index]) {
      result[index] = 'correct';
    } else if (answerArray.includes(letter)) {
      result[index] = 'present';
    } else {
      result[index] = 'absent';
    }
  });
  
  return result;
};