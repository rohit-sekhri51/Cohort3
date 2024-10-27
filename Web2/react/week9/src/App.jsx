import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [todo, setTodo] = useState([]);

  const problemSt = todo.map((problem) => (
    <ProblemSt
    title= {problem.title}
    desc=  {problem.desc}
    done=  {problem.done}
    />)
  )

  function addTodo() {
    setTodo([...todo, {
      title: document.getElementById("title").value,
      desc: document.getElementById("description").value,
      done: "true"
    }])
  }

  return (
    <>
      <div>
      <input id="title" type="text" placeholder="Title"></input>
      <input id="description" type="text" placeholder="Description"></input>
      <br/>
      <button onClick={addTodo}>Add todo</button>
      <br/ >  
      <div>
      {problemSt}
      </div>
      </div>
    </>
  );
}


function ProblemSt(props){
  return (
    <div>
      <p> {props.title} {props.desc} {props.done? "Done" : "Not done"} </p>
    </div>
  );
}

export default App
