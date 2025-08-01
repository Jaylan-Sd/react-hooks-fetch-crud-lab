import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "lorem testum 1",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correctIndex: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    if (name.startsWith("answer")) {
      const index = parseInt(name.replace("answer", ""));
      const newAnswers = [...formData.answers];
      newAnswers[index] = value;
      setFormData({ ...formData, answers: newAnswers });
    } else if (name === "correctIndex") {
      setFormData({ ...formData, correctIndex: parseInt(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newQuestion) => onAddQuestion(newQuestion));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prompt:
        <input
          type="text"
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
        />
      </label>

      {formData.answers.map((answer, idx) => (
        <label key={idx}>
          Answer {idx + 1}:
          <input
            type="text"
            name={`answer${idx}`}
            value={answer}
            onChange={handleChange}
          />
        </label>
      ))}

      <label>
        Correct Answer:
        <select
          name="correctIndex"
          value={formData.correctIndex}
          onChange={handleChange}
        >
          {formData.answers.map((_, idx) => (
            <option key={idx} value={idx}>
              {`Answer ${idx + 1}`}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;
