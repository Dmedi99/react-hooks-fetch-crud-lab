import React, { useState } from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, } = question;
  const [correctIndex, setCorrectIndex] =useState(question.correctIndex)

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

    function handleCorrectIndexChange(e){
      const newCorrectIndex = parseInt(e.target.value)
      
      setCorrectIndex(newCorrectIndex)

      const updateData = {
        correctIndex:newCorrectIndex,
      }
      
      
      fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(updateData),
      })
      .then((r)=>r.json)
      .then(()=>onUpdate(id, newCorrectIndex))
    }



    function handleDeleteClick(){
      fetch(`http://localhost:4000/questions/${question.id}`,{
        method: "DELETE",
      })
      .then((r)=>r.json)
      .then(()=>onDelete(id))
    }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select 
        defaultValue={correctIndex}
        onChange={handleCorrectIndexChange}
        >
          {options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
