import { useState, createContext, useContext } from 'react'
import './App.css'

// Context API simlar to useState API and useEffect API
// usage is to avoid Props Drilling
// recoil, mobex, zoostnd library prevent re-rendering thus optimatize

const BulbContext = createContext();

function BulbProvider({children}) {
  const [bulbOn, setBulbOn] = useState(true);

  return <div> <BulbContext.Provider value={{bulbOn, setBulbOn}}  // bulbOn={bulbOn} setBulbOn={setBulbOn}>
   >
      {children}
    </BulbContext.Provider>
    </div>
}

// const useBulb = useContext(BulbContext);
// const useBulb = () => useContext(BulbContext);

function App() {

  return <div>
    <BulbProvider>
      <LightBulb />
    </BulbProvider>
  </div>
}

/*
function App() {
  const [bulbOn, setBulbOn] = useState(true);

  return <div>
    <BulbContext.Provider value={{
      bulbOn: bulbOn,           // value={{}}
      setBulbOn: setBulbOn,
    }}>
    <LightBulb />
    </BulbContext.Provider>
  </div>
}  */

function LightBulb() {

  return <div>
    <BulbState />
    <ToggleBulbState />
  </div>
}

function BulbState() {
  const {bulbOn} = useContext(BulbContext); // useBulb(); // useContext(BulbContext);

  return <div>
    {bulbOn ? "Bulb on" : "Bulb off"}
  </div>
}

function ToggleBulbState() {
  const {setBulbOn} =useContext(BulbContext); // useBulb(); // 

  return <div>
    <button onClick={() => setBulbOn(currentState => !currentState)}>Toggle the bulb</button>
  </div>
}

export default App
