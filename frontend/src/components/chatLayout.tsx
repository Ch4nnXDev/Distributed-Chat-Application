import ChatHead from "./deafult/chatHead";
import ChatWindow from "./deafult/chatWindow";
export default function chatLayout() {
    return (
        <section className="flex flex-col h-screen">
            <ChatHead />
            <ChatWindow />

        </section>
    );
}