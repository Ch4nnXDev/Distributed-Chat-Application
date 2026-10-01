
import { useState, useEffect} from "react";
import axios from "axios";
import authStore from "../../stores/authStore";
import { socket } from "../default/socket";

export default function ChatWindow(){

    type Message = {
        _id: string;
        text: string;  
        senderId: string;
        senderEmail?: string;
        createdAt?: string;

    };

    function mergeMessages(
        existingMessages: Message[],
        incomingMessages: Message[]
    ) {
        const allMessages = new Map<string, Message>();
        


    }

    



    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const currentUser = authStore((state) => state.user);
    
    

        
    useEffect(() => {


        const handleMessage = (msg: Message) => {


            console.log("SOCKET MESSAGE RECEIVED:", msg);

            setMessages(prevMessages => [
                ...prevMessages,
                msg
            ]);
        }

            socket.on("chat_message", handleMessage);

        return () => {
            socket.off("chat_message", handleMessage)
        }

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
        


        if (socket) {
            socket.emit("chat_message", {text: input});
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

