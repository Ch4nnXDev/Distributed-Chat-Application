
import { useState } from "react";
import { Search } from "lucide-react";
import Card from "../components/contactCard.tsx";

export default function Home() {
    const [input, setInput] = useState("");

    return (
        <section className="min-h-screen w-full bg-gray-50 p-6">
            <div className="mx-auto max-w-4xl">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Chats
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Your conversations and recent contacts
                    </p>
                </div>

                {/* Search */}
                <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
                    <form className="flex gap-3">

                        <div className="relative flex-1">
                            <Search
                                size={20}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Search your conversations..."
                                className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="rounded-lg bg-black px-7 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                            Search
                        </button>

                    </form>
                </div>

                {/* Recent Chats */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

                    {/* Section Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                        <div>
                            <h2 className="text-sm font-semibold text-gray-900">
                                Recent Chats
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Your latest conversations
                            </p>
                        </div>

                        <span className="text-xs text-gray-400">
                            5 conversations
                        </span>
                    </div>

                    {/* Chat List */}
                    <div className="divide-y divide-gray-100">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>

                </div>

            </div>
        </section>
    );
}
