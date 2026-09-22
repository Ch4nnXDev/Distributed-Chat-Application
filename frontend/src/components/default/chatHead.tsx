import { User } from "lucide-react";
import { ArrowBigLeftIcon } from "lucide-react";
import { use } from "react";
import { useNavigate } from "react-router-dom";

export default function ChatHead() {

    const navigate = useNavigate();

    return (
        <div className="flex flex row p-5 w-full">
            <div>
                <button onClick={() =>{navigate("/chats")}}>
                    <ArrowBigLeftIcon width={10} height={10} />
                </button>
            </div>
            <div>
                <User width={25} height={25} />
            </div>
            <div>
                <p>Name</p>
                <p>Last Seen</p>

            </div>
            
        </div>
    )
}
