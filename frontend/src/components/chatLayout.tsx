import ChatHead from "./default/chatHead";
import ChatWindow from "./default/chatWindow";
export default function chatLayout() {
    return (
        <section className="flex flex-col h-screen">
            <ChatHead />
            <ChatWindow />

        </section>
    );
}