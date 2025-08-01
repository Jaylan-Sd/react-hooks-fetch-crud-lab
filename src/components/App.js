import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then(setQuestions);
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    setQuestions(questions.filter((q) => q.id !== id));
  }

  function handleUpdateQuestion(updatedQ) {
    setQuestions(questions.map((q) => (q.id === updatedQ.id ? updatedQ : q)));
  }

  return (
    <main>
      <h1>Quiz Admin Panel</h1>
      <QuestionForm onAddQuestion={handleAddQuestion} />
      <QuestionList
        questions={questions}
        onDelete={handleDeleteQuestion}
        onUpdate={handleUpdateQuestion}
      />
    </main>
  );
}

export default App;
