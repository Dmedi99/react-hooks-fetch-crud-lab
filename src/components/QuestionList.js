import { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
const [questions, setQuestions] = useState([])

useEffect(() => {
  fetch('http://localhost:4000/questions')
  .then((r)=>r.json())
  .then((questions) => setQuestions(questions))
}, [])

function handleDeleteQuestion (deletedId){
  setQuestions((prevQuestions)=>
  prevQuestions.filter((question)=>question.id !== deletedId)
  )
}

function handleUpdateQuestion(questionId, newCorrectIndex){
  setQuestions((prevQuestions) =>
  prevQuestions.map((question) => {
    if (question.id === questionId) {
      return { ...question, correctIndex: newCorrectIndex };
    }
    return question;
  })
);
}


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question)=> (
          <QuestionItem key={question.id} question={question} onDelete={handleDeleteQuestion} onUpdate={handleUpdateQuestion}/>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
