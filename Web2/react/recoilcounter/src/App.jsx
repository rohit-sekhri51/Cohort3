import React, { createContext, useContext, useState } from 'react';
import { RecoilRoot, atom, useRecoilValue, useSetRecoilState } from 'recoil';

const countAtom = atom({
  key: 'countState', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

// useRecoilValue: return the value
// useSetRecoilState: set the new value
// useRecoilState: return both the above

// App Component
const App = () => {
  return <div>
    <Parent />
  </div>
};

function Parent() {
  return (
    <RecoilRoot>
      <Buttons/>
      <Value />
    </RecoilRoot>
  );
}

function Buttons() {
  const setCount = useSetRecoilState(countAtom);

  return <div>
    <button onClick={() => setCount(count => count - 1)}>Decrease</button>

   <button onClick={() => setCount(count => count + 1)}>Increase</button>
   </div>
}

function Value() {
  const countValue = useRecoilValue(countAtom);
  return <p>Count: {countValue}</p>;
}

export default App;