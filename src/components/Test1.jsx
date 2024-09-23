import React from 'react';
import Quiz from './Quiz';

const questions1 = [
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    question: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Madrid"],
    answer: "Paris",
  },
  // Add more questions for Test1
];

function Test1() {
  return <Quiz questions={questions1} />;
}

export default Test1;
