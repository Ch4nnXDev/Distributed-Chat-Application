
import { useState } from "react";
import { Search, UserPlus, Circle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FindContactPage() {
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    return (
        <section className="min-h-screen w-full bg-gray-50 p-6">

            <div className="mx-auto max-w-2xl">

                {/* Header */}
                <div className="mb-6 flex items-center gap-4">

                    <button
                        onClick={() => navigate(-1)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <div>
                        <h1 className="text-xl font-semibold">
                            Find Contact
                        </h1>

                        <p className="text-sm text-gray-500">
                            Search for people to start a conversation
                        </p>
                    </div>

                </div>

                {/* Search */}
                <div className="mb-6 flex rounded-lg border border-gray-200 bg-white">

                    <div className="flex items-center pl-4">
                        <Search
                            size={20}
                            className="text-gray-400"
                        />
                    </div>

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by username or email..."
                        className="flex-1 px-3 py-3 outline-none"
                    />

                </div>

                {/* Search Results */}
                <div className="rounded-lg border border-gray-200 bg-white">

                    <div className="border-b border-gray-200 p-4">
                        <h2 className="font-medium">
                            Search Results
                        </h2>
                    </div>

                    {/* User */}
                    <div className="flex items-center justify-between border-b border-gray-100 p-4">

                        <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                                <span className="text-lg font-medium">
                                    JD
                                </span>
                            </div>

                            <div>
                                <p className="font-medium">
                                    John Doe
                                </p>

                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Circle
                                        size={8}
                                        className="fill-green-500 text-green-500"
                                    />
                                    Online
                                </div>
                            </div>

                        </div>

                        <button className="flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600">
                            <UserPlus size={17} />
                            Add
                        </button>

                    </div>

                    {/* User */}
                    <div className="flex items-center justify-between p-4">

                        <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                                <span className="text-lg font-medium">
                                    AS
                                </span>
                            </div>

                            <div>
                                <p className="font-medium">
                                    Alex Silva
                                </p>

                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Circle
                                        size={8}
                                        className="fill-gray-400 text-gray-400"
                                    />
                                    Offline
                                </div>
                            </div>

                        </div>

                        <button className="flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50">
                            <UserPlus size={17} />
                            Add
                        </button>

                    </div>

                </div>

            </div>

        </section>
    );
}

