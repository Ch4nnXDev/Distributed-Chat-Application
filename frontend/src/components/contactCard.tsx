
interface CardProps {
  name: string;
  lastMessage: string;
  time: string
}


export default function Card({ name, lastMessage, time }: CardProps) {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow hover:bg-gray-100 transition-colors cursor-pointer w-full">
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-lg">
        A
      </div>

      {/* Contact Info */}
      <div className="ml-4 flex flex-col flex-1">
        <span className="text-gray-900 font-semibold text-md">{name}</span>
        <span className="text-gray-500 text-sm truncate">{lastMessage}</span>
      </div>

      {/* Status / Time */}
      <div className="text-gray-400 text-xs">
        {time}
      </div>
    </div>
  );
}
