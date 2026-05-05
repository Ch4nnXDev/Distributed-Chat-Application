import ChatHead from "./default/chatHead";
import { useEffect, useState } from "react";
import axios from "axios";
export default function HomePage() {



    const [input, setInput] = useState("")
    const [user, setUser] = useState([]);

    function findUsers() {
        
        

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
            <div>
                
            </div>

        </section>
        
        
    );

}