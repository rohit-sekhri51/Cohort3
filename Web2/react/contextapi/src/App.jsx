import React, { useEffect, useState, memo } from 'react';
import { useContext } from 'react';
import { Children } from 'react';
import { createContext } from 'react';


// Understanding MEMO
// Anytime a component re-renders, all of its children also re-renders
// But if you wrap a component inside a memo function
// Only if props/state in that child has changed, only will it re-render
// Conclusion: Memo doesnt work coz props are being used by Children
// FIXME Memo ka kya faida, try to use props as setCount instead of using Context API

const CountContext = createContext();

function CounterProvider({children}) {
  const [count, setCount] = useState(0);

  return <div>
    <CountContext.Provider value={{count, setCount}} >
      {children}
    </CountContext.Provider>
  </div>

}

// App Component
const App = () => {
  return <div>
    <CounterProvider>
    <Parent />
    </CounterProvider>
  </div>
};

function Parent () {
  
  return (
    <>
      <Increase  />
      <Decrease  />
      
    </>
  );
};

const Decrease = memo (function() {
  const {setCount} = useContext(CountContext);

  return <button onClick={() => setCount(count => count - 1)}>Decrease</button>;
})

const Increase = memo (function() {
  const {setCount} = useContext(CountContext);

  return <button onClick={() => setCount(count => count + 1)}>Increase</button>;
})
/*
const Value = memo(function() {
  const {count} = useContext(CountContext);

  return <p>Count: {count}</p>;
});
*/

export default App;
