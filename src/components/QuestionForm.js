import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    if (name.startsWith("answer")) {
      const index = parseInt(name.replace("answer", ""));
      const updatedAnswers = [...formData.answers];
      updatedAnswers[index] = value;
      setFormData({ ...formData, answers: updatedAnswers });
    } else if (name === "correctIndex") {
      setFormData({ ...formData, correctIndex: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.prompt.trim() ||
      formData.answers.some((a) => !a.trim())
    ) {
      alert("Please fill all fields");
      return;
    }

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newQuestion) => {
        onAddQuestion(newQuestion);
        setFormData({ prompt: "", answers: ["", "", "", ""], correctIndex: 0 });
      });
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
          required
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
            required
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
              Answer {idx + 1}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}

export default QuestionForm;
