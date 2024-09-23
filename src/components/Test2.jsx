import React from 'react';
import Quiz from './Quiz';

const questions2 = [
  {
    question: "What is the color of the sky?",
    options: ["Red", "Blue", "Green", "Yellow"],
    answer: "Blue",
  },
  {
    question: "What is 3 + 5?",
    options: ["5", "7", "8", "10"],
    answer: "8",
  },
  // Add more questions for Test2
];

function Test2() {
  return <Quiz questions={questions2} />;
}

export default Test2;
