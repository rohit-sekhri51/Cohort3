import { useState } from 'react'
import './App.css'
import { atomCounter, evenSelector } from './store/atom-selector';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";

// useRecoilValue: return the value
// useSetRecoilState: set the new value
// useRecoilState: return both the above

function App() {

  return (
    <>
    <RecoilRoot>
      <Button />
      <Counter />
      <IsEven />
    </RecoilRoot>
    </>
  )
}

function Button() {
  const setCount = useSetRecoilState(atomCounter);

  return <div>
    <button onClick={() => setCount(count => count - 1)}>Decrease</button>

   <button onClick={() => setCount(count => count + 2)}>Increase</button>
   </div>
}

function Counter(){
  const count = useRecoilValue(atomCounter);

  return <div>
    Counter: {count}
  </div>
}

function IsEven() {
  const even = useRecoilValue(evenSelector);

  return <div>
    {even ? "EVEN" : "ODD"}
  </div>  
}

export default App
