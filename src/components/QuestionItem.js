import React from "react";

function QuestionItem({ question, onUpdate, onDelete }) {
  function handleChange(e) {
    const newIndex = parseInt(e.target.value, 10);
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newIndex }),
    })
      .then((res) => res.json())
      .then((updatedQ) => {
        console.log("Updated question from server:", updatedQ);
        onUpdate(updatedQ);
      });
  }

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    }).then(() => onDelete(question.id));
  }

  return (
    <div>
      <h4>{question.prompt}</h4>
      <label>
        Correct Answer
        <select
          value={Number(question.correctIndex)} 
          onChange={handleChange}
          aria-label="Correct Answer"
        >
          {question.answers.map((ans, index) => (
            <option key={index} value={index}>
              {ans}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </div>
  );
}

export default QuestionItem;
