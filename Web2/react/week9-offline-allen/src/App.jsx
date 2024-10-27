import { useState, useRef, useEffect } from 'react'
import './App.css'
// import {Link, ReactDOM } from "react-dom/client";
import { Link, BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import {PostComponent} from './Posts'


function App() {
   const [posts, setPosts] = useState([]);
   const inputRefName = useRef();
   const inputRefSub = useRef();
   const inputRefTime = useRef();
   const inputRefDesc = useRef();
   const chatRef = useRef();

  // const post = [{
  //         name: "Rohit",
  //         sub: "20 followers",
  //         time: "12 min ago",
  //         image: "",
  //         desc: "Body- How to win big bounties"
//  }];
  // [<PostComponent/>]
  // FIXME
  // For Loop for different posts

  const postComponent = posts.map(post => <PostComponent
        name={post.name}
        sub={post.sub}
        time={post.time}
        image={post.image}
        desc={post.desc}
    />)

    function addPost() {
      setPosts([...posts, {
        name: inputRefName.current.value,
        sub: inputRefSub.current.value,
        time: inputRefTime.current.value,
        image: "",
        desc: inputRefDesc.current.value,
      }])
      inputRefTime.current.focus();
      
     }

     useEffect(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
     },
     [posts]
     );

  return (
    <>
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/neet/online-coaching-class-11" element={<Class11Program />} />
          <Route path="/neet/online-coaching-class-12" element={<Class12Program />} />
          <Route path="/neet" element={<Landing />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>  
      
    </BrowserRouter>
    </div>
    
    <div style={{backgroundColor: "#dfe6e9", height: "100vh"}}>
            <input ref={inputRefName} id="name" type="text" placeholder="Name"></input>
            <input ref={inputRefSub} id="sub" type="text" placeholder="Followers"></input>
            <input ref={inputRefTime} id="time" type="text" placeholder="Time"></input>
            <input ref={inputRefDesc} id="desc" type="text" placeholder="Description"></input>
      <button onClick={addPost}>Add Post</button>
      <div style={{display: "flex", justifyContent: "center"}}>
          <div ref={chatRef} style={{ height: "200px", overflowY: "scroll", border: "1px solid black" }}>
          {postComponent}
          </div>
         </div>
      </div> 
      </>    
  )
}

function Layout() {
  return <div>
      Layout Allen Header
      <br></br>
      <Link to="/neet">Allen</Link>
       |||
      <Link to="/neet/online-coaching-class-11">Class 11</Link> 
      |||
      <Link to="/neet/online-coaching-class-12">Class 12</Link> 
    
    <Outlet/>
    Layout Footer || Contact Us
    
  </div>
}

function Landing() {
  return <div>
    Welcome to allen
  </div>
}

function Class11Program() {
  return <div>
      NEET programs for Class 11th
  </div>
}

function Class12Program() {
  return <div>
      NEET programs for Class 12th
  </div>
}

function ErrorPage() {
  return <div>
    Error 404
  </div>
}

export default App
