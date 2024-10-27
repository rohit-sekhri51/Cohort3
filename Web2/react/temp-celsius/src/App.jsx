import { useState } from 'react'
import './App.css'
import TempCel from './store/temp-cf';
import { RecoilRoot } from "recoil";

function App() {

  return <div>
    <RecoilRoot>
      <TempCel>Joe Root</TempCel>
    </RecoilRoot>
  </div>
}

export default App
