
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
export default function ChatWindow(){
    const [messages, setMessages] = useState<{ text: string, sender: string, timestamp?: string }[]>([]);

    const [input, setInput] = useState("");
    const socketRef = useRef<ReturnType<typeof io> | null>(null);

    useEffect(() => {
        socketRef.current = io("http://localhost:4000");
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
                const response = await axios.get("http://localhost:4000/api/messages");
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
        <section className="flex flex-col overflow-y-auto p-4 bg-gray-100">
            <div className="flex flex-col space-y-4">
                {messages.map((message, index) => (
                    <div key={index} className="p-2 bg-white rounded shadow">
                        <strong>{message.sender}:</strong> {message.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Send</button>
            </form>

        </section>
    )


}

