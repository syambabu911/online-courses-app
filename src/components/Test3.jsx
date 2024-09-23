import React from 'react';
import Quiz from './Quiz';

const questions3 = [
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is 10 - 4?",
    options: ["3", "6", "7", "8"],
    answer: "6",
  },
  // Add more questions for Test3
];

function Test3() {
  return <Quiz questions={questions3} />;
}

export default Test3;
