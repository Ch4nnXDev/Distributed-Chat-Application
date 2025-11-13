import { useEffect, useState } from 'react';
import { Box } from 'lucide-react'
export default function Home() {
    const [Peers, setPeers] = useState();
    return (
        <section className="flex flex-col bg-red-500 w-full">
            <div className="flex flex-row bg-green-500 w-full p-10">
                <form>
                    <label type="text" id="search" for="search">
                        <Box />
                    </label>
                    <input>
                </form>

                
            </div>
            <div>

            </div>

        </section>
    )

}