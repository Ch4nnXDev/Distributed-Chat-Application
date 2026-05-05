export default function ChatHead() {
  function handleSubmit() {
    console.log("New chat Started");
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
      {/* App Name */}
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight font-sans">
        Trapper
      </h1>

      {/* New Chat button */}
      <button
        onClick={handleSubmit}
        className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-md text-sm font-medium transition-colors shadow-sm"
      >
        New Chat
      </button>
    </div>
  );
}
