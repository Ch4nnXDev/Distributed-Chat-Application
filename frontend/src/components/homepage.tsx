import ChatHead from "./default/chatHead";
import { useNavigate } from "react-router-dom";
import axios from "axios";





export default function HomePage() {
    
    
    const navigate = useNavigate();


    const logOut = async () => {
        
        
        axios.post("http://localhost:8080/auth/logout",
            {withCredentials: true},

        )
        return navigate("/search");

    }



    return (
        <section>
            <ChatHead />
            <div>
                <form action="submit">
                    <input type="text"
                        placeholder="Search for a chat"
                        className="w-full p-2 border border-gray-300 rounded"
                     />
                </form>
                

            </div>
            <button onClick={logOut}>Log Out</button>
            <div>
                
            </div>

        </section>
        
        
    );

}