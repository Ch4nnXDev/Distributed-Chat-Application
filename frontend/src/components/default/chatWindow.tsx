
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import authStore from "../../stores/authStore";
export default function ChatWindow(){

    type Message = {
        text: string;  
        senderId: string;
        senderEmail?: string;
        createdAt?: string;

    };

    



    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const socketRef = useRef<ReturnType<typeof io> | null>(null);
    const currentUser = authStore((state) => state.user);
    
    

        
    useEffect(() => {

        socketRef.current = io("http://localhost:8080", {
            path: "/chat/socket.io",
            withCredentials: true,
           
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
    }, []);

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
                {messages.map((message, index) => {


                    const isMyMessage = message.senderId === currentUser;

                    return (

                        <div
                            key={index}
                            className={`flex p-4 ${
                                isMyMessage ? "justify-end" : "justify-start"
                            }`}
                        >
                            <div
                                className={`p-3 rounded-2xl shadow max-w-xs ${
                                    isMyMessage
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-black"
                                }`}
                            >
                                <strong>{message.senderEmail}</strong>
                                <p>{message.text}</p>

                                <div className="text-xs opacity-70 mt-1">
                                    {message.createdAt
                                        ? new Date(message.createdAt).toLocaleString()
                                        : ""}
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center">
                <input className="flex-1 p-2 border border-gray-300 rounded" type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                <button type="submit" className="p-2 m-2 bg-blue-500 text-white rounded hover:bg-blue-600">Send</button>
            </form>

        </section>
    )


}

