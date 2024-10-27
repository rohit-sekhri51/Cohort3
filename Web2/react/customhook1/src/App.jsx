
import { useState } from 'react';
import './App.css'
import { useFetch } from './hooks/useFetch';
import { usePrev } from './hooks/use-prev';

// react swr, tanstack query

function App() {

  const [post, setPost] = useState(1);
  const retryTimer = 2000;
  const { finalData, loading, error } = useFetch("https://jsonplaceholder.typicode.com/posts/" + post, retryTimer);
  console.log("Inside App");
  const [state,setState] = useState(0);
  const previos = usePrev(state);

  if (loading) {
    return <div>
      Loading......
    </div>
  }
   
  if(error) {
    return <div>
      Error...encountered !!!
    </div>
  } 

  return (
    <>
      <button onClick={() => setPost(1)}>1</button>
      <button onClick={() => setPost(2)}>2</button>
      <button onClick={() => setPost(3)}>3</button>
      <br></br>
      {JSON.stringify(finalData.title)}
      <br></br>

    <p>{state}</p>
    <button onClick={() => setState(c => c + 1)}>Click Me to know the previous value </button>
    <p>The previous value was: {previos}</p>
    </>
  )
}

export default App
