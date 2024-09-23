import React from 'react';
import Quiz from './Quiz';

const questions4 = [
  {
    question: "What is the speed of light?",
    options: ["300,000 km/s", "150,000 km/s", "100,000 km/s", "50,000 km/s"],
    answer: "300,000 km/s",
  },
  {
    question: "What is 7 * 3?",
    options: ["20", "21", "22", "23"],
    answer: "21",
  },
  // Add more questions for Test4
];

function Test4() {
  return <Quiz questions={questions4} />;
}

export default Test4;
