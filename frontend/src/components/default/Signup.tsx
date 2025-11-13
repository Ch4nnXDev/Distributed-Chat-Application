import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
    const [user, setUser] = useState({"email": "", "password": ""});
    const navigate = useNavigate();
    

    
    useEffect(() => {
        if (user.email && user.password) {
            console.log("User data is complete:", user);
        }
    }, [user]);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        try {
            const response = await axios.post(
            "http://localhost:8080/auth/signup",
            {
                email: user.email,
                password: user.password,
            },
            {
                withCredentials: true,
            }
            );
            
            console.log("Signup success:", response.data);
             // Redirect to home or desired route
        
        } catch (error) {
            console.error("Signup error:", error);
            
        }
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }
    function google(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        try{
            window.location.href = 'http://localhost:8080/auth/google';
        } catch (error) {
            console.log("d", error);
        }


    }
  


    return (
        <section className="flex flex-col items-center justify-center h-screen">
            <div className="bg-white p-16 rounded-lg shadow-md w-100 p-10">
                <h2 className="text-2xl mb-4 text-black text-center mb-5">Sign Up</h2>
                <form className="flex flex-col space-y-6 w-full p-10" onSubmit={handleSubmit}>
                    <input
                    name="email" 
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                    required
                    className="bg-gray-100 p-2 rounded-lg"
                    />
                    <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={user.password}
                    onChange={handleChange}
                    className="bg-gray-100 p-2 rounded-lg"
                    />

                    <button type="submit" className="bg-green-300 w-full p-2">Sign in</button>
                    <button onClick={google} className="bg-white w-full p-2">Sign with google</button>

                </form>
               
            </div>
            
        </section>
    )
}