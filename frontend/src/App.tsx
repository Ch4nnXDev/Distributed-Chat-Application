import ChatLayout from "./components/chatLayout"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SignUp from "./components/default/Signup"
import Home from "./components/default/home"


function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/chat" element={<ChatLayout />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/search" element={<Home />} />
        
      </Routes>
    </Router>
      
      

     
      
    </>
  )
}

export default App
