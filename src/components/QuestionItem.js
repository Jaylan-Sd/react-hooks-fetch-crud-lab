function QuestionItem({ question, onUpdate }) {
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
      .then((updatedQ) => onUpdate(updatedQ));
  }

  return (
    <div>
      <h4>{question.prompt}</h4>
      <select value={question.correctIndex} onChange={handleChange}>
        {question.answers.map((ans, index) => (
          <option key={index} value={index}>
            {ans}
          </option>
        ))}
      </select>
    </div>
  );
}


export default QuestionItem;