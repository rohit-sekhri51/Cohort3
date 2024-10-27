import { useState, useEffect } from "react";

import UserListxxx from "./fetchxxx";
import Timerxxx from "./Timerxxx";
import AppList from "./ListKeys";
import Card from "./Card";
import Modal from "./Modal";
import { useRef } from "react";

// conditional rendering
function App() {
   
   const [isVisible, setIsVisible] = useState(false);
   const [count, setCount] = useState(0);
   const [post, setPost] = useState(0);
   const [isModalOpen, setModalOpen] = useState(false);

  return <div>

      <h3>👁 ✨🍴 </h3>

    <button onClick={() => setIsVisible(!isVisible)}> Toggle List </button>
            
    {isVisible && <AppList></AppList>}
    
    <Timerxxx></Timerxxx>
    <Clock></Clock>  
    <div style={{display: "flex"}}>
    <Poster post={post}></Poster>
    <button onClick={() => {setPost(post + 1) }}>Increase Post</button>
    <h4 id="text">{count}</h4>

    <button onClick={() => {setCount(count + 1) }}>Increase Count</button>

    <button onClick={() => {setCount(count - 1) }}>Decrease Count</button>
    </div>
    {isVisible && <UserListxxx></UserListxxx>}
    
    <div style={{display: "flex"}}>
            <Card>
                <h2>Card Title</h2>
                <p>This is some content inside the card.</p>
            </Card>
            <Card>
                <h2>Another Card</h2>
                <p>This card has different content!</p>
            </Card>
     </div>

     <div>
            <button onClick={() => setModalOpen(true)}>Open Modal</button>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <h2>Modal Title</h2>
                <p>This is some content inside the modal.</p>
            </Modal>
        </div>

        

  </div>
}


// mounting, re-rendering, unmounting
function Poster(props) {
  console.log("Inside Poster fn");

      useEffect(function() {
        console.log("Poster mount");

        return function() {
          console.log("Poster unmount");
        }
      }, []);

      useEffect(function() {
        console.log("count has changed");

        return function() {
          console.log("cleanup inside second effect");
        }
      }, [props.post]) 

  return <div>
    <h4>POST {props.post} </h4>  
   
  </div>
} 

function Clock() {

  const intervalRef = useRef(0);
  const [clock, setClock] = useState(0);
  let [clockVisible, setClockVisible] = useState(true);
  // FIXME
  // isVisible not working after 5 sec interval
     
    function startTimer() {
       // useEffect(function() {    
       // console.log("Clock Mount");

       if (intervalRef.current != null) return;
            intervalRef.current = setInterval(function() {
              setClock(clock => clock + 1);

                    // setInterval(function() {
                    //   setClockVisible(!clockVisible)
                    // }, 5000)
                },1000   );
             
       // }, []); // dependency array, cleanup, fetch inside useEffect
     }

     function stopTimer() {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
     }

    return <div> 
    <h4 id="text"> Timer:   {clock}</h4>
    <button onClick={startTimer}>Start</button>
    <button onClick={stopTimer}>Stop</button>
    </div>
}

export default App