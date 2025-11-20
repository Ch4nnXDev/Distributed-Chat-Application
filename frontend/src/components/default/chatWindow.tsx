
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
export default function ChatWindow(){

    type Message = {



        text: string;  
        senderId: string;
        senderEmail?: string;
        createdAt?: string;

    };

    type User = {
        email: string;

    }

    const [messages, setMessages] = useState<Message[]>([]);
    const [currentUser, setCurrentUser] = useState<User[]>([]);


    const [input, setInput] = useState("");
    const socketRef = useRef<ReturnType<typeof io> | null>(null);

       function getCookie(name: string) {
        return document.cookie
            .split("; ")
            .find(row => row.startsWith(name + "="))
            ?.split("=")[1];
        }

        const token = getCookie("token");


    useEffect(() => {
        socketRef.current = io("http://localhost:8080", {
            path: "/chat/socket.io",
            withCredentials: true,
            extraHeaders: { Authorization: `Bearer ${token}` },
            transports: ["websocket"]
        });

        socketRef.current.on('chat_message', (msg)=>{
            setMessages((prevMessages) => [...prevMessages, msg]); // Update messages state with new message

        })

        return () => {
            if (socketRef.current) { //if statement is needed because socketRef.current can be null 
                socketRef.current.disconnect(); // Clean up the socket connection on unmount
            }
        }; // Connect to the socket server
    }, [token]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get("http://localhost:8080/chat/api/messages");
                setMessages(response.data); // Set the initial messages from the server
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        }
        fetchMessages(); // Fetch initial messages from the server

    }, [])
   


    useEffect(() => {
        console.log("Messages updated:", messages);
    }, [messages]);

 




    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        
        if (input.trim() === "") return;
        


        if (socketRef.current) {
            socketRef.current.emit("chat_message", {text: input});
        }

        setInput(""); //this clears the input field after submitting
    }

    return (
        <section className="flex flex-col p-4 bg-gray-100 h-screen w-full overflow-hidden ">
            <div className="flex flex-col overflow-y-auto flex-1 space-y-4">
                {messages.map((message, index) => (
                    
                    <div key={index} className="p-2 bg-white rounded shadow w-60">
                        <strong>{message.senderEmail}:</strong> {message.text}
                        <div className="text-xs text-gray-500">{message.createdAt ? new Date(message.createdAt).toLocaleString() : ''}</div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center">
                <input className="flex-1 p-2 border border-gray-300 rounded" type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                <button type="submit" className="p-2 m-2 bg-blue-500 text-white rounded hover:bg-blue-600">Send</button>
            </form>

        </section>
    )


}

