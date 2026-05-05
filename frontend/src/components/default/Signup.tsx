import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [user, setUser] = useState({ email: "", password: "" });
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
        { withCredentials: true }
      );
      console.log("Signup success:", response.data);
      // navigate to chat page or home
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function google(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      window.location.href = "http://localhost:8080/auth/google";
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white p-10 sm:p-12 md:p-16 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Sign Up</h2>
        <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
            className="bg-gray-100 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
            className="bg-gray-100 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold p-3 rounded-xl transition"
          >
            Sign Up
          </button>
          <button
            onClick={google}
            className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold p-3 rounded-xl transition flex items-center justify-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21.35 11.1h-9.36v2.84h5.39c-.23 1.44-1.61 4.22-5.39 4.22-3.25 0-5.91-2.69-5.91-6s2.66-6 5.91-6c1.85 0 3.09.79 3.79 1.48l2.59-2.49C17.91 2.51 15.77 1.5 12.98 1.5 7.57 1.5 3.21 5.9 3.21 11.33s4.36 9.83 9.77 9.83c5.64 0 9.36-3.96 9.36-9.46 0-.63-.07-1.08-.18-1.6z"/>
            </svg>
            <span>Sign in with Google</span>
          </button>
        </form>
      </div>
    </section>
  );
}
