import { useState } from 'react';
import Card from "../contactCard.tsx";

export default function Home() {
  const [Peers, setPeer] = useState<string[]>([]);
  const [input, setInput] = useState("");

  return (
    <section className="flex flex-col h-screen bg-gray-50 w-full">
      
      {/* Search Bar Section */}
      <div className="flex items-center justify-center p-6 border-b border-gray-200 bg-white shadow-sm">
        <form className="flex w-full max-w-md">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search peers..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-r-md hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Peer List Section */}
      <div className="flex flex-col p-6 space-y-4 overflow-y-auto">
        {/* Example cards */}
        <Card />
        <Card />
        <Card />
      </div>

    </section>
  );
}
