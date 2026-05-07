import ChatLayout from "./components/chatLayout"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SignUp from "./components/default/Signup"
import Home from "./components/default/home"
import authStore from "./stores/authStore"
import { useEffect } from "react"


function App() {
  
  const fetchUser = authStore((state)=> state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser])

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
