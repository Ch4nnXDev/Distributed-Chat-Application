import { useEffect, useState } from 'react';
import Card from "../contactCard.tsx"
export default function Home() {
    const [Peers, setPeers] = useState([]);
    return (
        <section className="flex flex-col bg-red-500 w-full">
            <div className="flex flex-row bg-green-500 w-full p-10">
                <form className="flex flex-col bg-red-400">
                    <label>
                        Search
                    </label>
                    <input type='text'>

                    </input>

                </form>

                
            </div>
            <div className="flex flex-col">
                <Card />

                

            </div>

        </section>
    )

}