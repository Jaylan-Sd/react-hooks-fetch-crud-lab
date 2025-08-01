import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  function handleChange(e) {
    const newIndex = parseInt(e.target.value);
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newIndex }),
    })
      .then((res) => res.json())
      .then(onUpdate);
  }

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    }).then(() => onDelete(question.id));
  }

  return (
    <li>
      <h4>{question.prompt}</h4>
      <select value={question.correctIndex} onChange={handleChange}>
        {question.answers.map((ans, idx) => (
          <option key={idx} value={idx}>
            {ans}
          </option>
        ))}
      </select>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default QuestionItem;
