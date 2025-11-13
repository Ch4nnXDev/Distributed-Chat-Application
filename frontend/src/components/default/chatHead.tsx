
export default function chatHead() {
    function handleSubmit() {
        console.log("New chat Started");
    }
    
    

    return (
        <div className="flex items-center justify-between p-4 bg-blue-600 text-white flex-shrink-0">
            <h1 className="text-xl font-bold">chatLLM</h1>
            <button onClick={handleSubmit} className="p-2 bg-blue-500 rounded hover:bg-blue-600">New Chat</button>
        </div>

        
    );
}