import { useState } from "react";

export default function Floatbar() {

    const [selectPage, setSelectPage] = useState<string>("");
    return (
        <section className="w-[500px] p-10 bg-white flex flex-row shadow-lg">
            <div className={`p-10 rounded shadow-lg ${
                selectPage === "Chats" ? "bg-blue-500 text-white" : ""
            }`}>
                <button onClick={() => setSelectPage("Chats")}>Chats</button>
            </div>
            <div className={`p-10 rounded shadow-lg ${
                selectPage === "Chats" ? "bg-blue-500 text-white" : ""
            }`}>
                <button onClick={() => setSelectPage("You")}>You</button>
            </div>
            

        </section>
    );
}