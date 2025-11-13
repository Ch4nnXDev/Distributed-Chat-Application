import ChatHead from "./default/chatHead";
export default function HomePage() {
    return (
        <section>
            <ChatHead />
            <div>
                <form action="">
                    <input type="text"
                        placeholder="Search for a chat"
                        className="w-full p-2 border border-gray-300 rounded"
                     />
                </form>
                

            </div>

        </section>
        
        
    );

}