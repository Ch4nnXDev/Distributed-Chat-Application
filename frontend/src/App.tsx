import ChatLayout from "./components/chatLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/default/Signup";
import Home from "./pages/home";
import authStore from "./stores/authStore";
import ProfilePage from "./pages/profilePage";
import Layout from "./pages/Layout";
import { useEffect } from "react";
import FindContactPage from "./pages/findContactPage";

function App() {

    const fetchUser = authStore((state) => state.fetchUser);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <Router>
            <Routes>
                
                <Route path="/" element={<SignUp />} />
                <Route path="/chat" element={<ChatLayout />} />   

                <Route element={<Layout />}>
                
                    <Route path="/chats" element={<Home />} />

                    <Route path="/profile" element={<ProfilePage />} />

                    <Route path="/new" element={<FindContactPage />} />

                </Route>

            </Routes>
        </Router>
    );
}

export default App;