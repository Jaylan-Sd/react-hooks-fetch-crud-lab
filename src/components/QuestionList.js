import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {
  function handleDelete(id) {
    const updated = questions.filter((q) => q.id !== id);
    setQuestions(updated);
  }

  function handleUpdate(updatedQ) {
    const updatedList = questions.map((q) =>
      q.id === updatedQ.id ? updatedQ : q
    );
    setQuestions(updatedList);
  }

  return (
    <section>
      <h2>Questions</h2>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
