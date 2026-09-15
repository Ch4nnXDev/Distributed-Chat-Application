
import { useState } from "react";
import {
    User,
    Mail,
    Circle,
    LogOut,
    ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const [online, setOnline] = useState(true);

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
                            Profile
                        </h1>

                        <p className="text-sm text-gray-500">
                            Manage your account and presence
                        </p>
                    </div>
                </div>

                {/* Profile Header */}
                <div className="rounded-lg border border-gray-200 bg-white p-6">

                    <div className="flex items-center gap-5">

                        {/* Avatar */}
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                            <User
                                size={45}
                                className="text-gray-500"
                                strokeWidth={1.5}
                            />
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold">
                                Channa Karawita
                            </h2>

                            <p className="mt-1 text-gray-500">
                                channa@example.com
                            </p>

                            <div className="mt-2 flex items-center gap-2 text-sm">
                                <Circle
                                    size={9}
                                    className={
                                        online
                                            ? "fill-green-500 text-green-500"
                                            : "fill-gray-400 text-gray-400"
                                    }
                                />

                                <span className="text-gray-600">
                                    {online ? "Online" : "Offline"}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Account Information */}
                <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6">

                    <h2 className="mb-5 text-lg font-semibold">
                        Account Information
                    </h2>

                    <div className="space-y-5">

                        <div className="flex items-center gap-4">
                            <User
                                size={20}
                                className="text-gray-500"
                            />

                            <div>
                                <p className="text-sm text-gray-500">
                                    Username
                                </p>

                                <p className="font-medium">
                                    channa
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Mail
                                size={20}
                                className="text-gray-500"
                            />

                            <div>
                                <p className="text-sm text-gray-500">
                                    Email
                                </p>

                                <p className="font-medium">
                                    channa@example.com
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Presence */}
                <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6">

                    <h2 className="mb-4 text-lg font-semibold">
                        Presence
                    </h2>

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="font-medium">
                                Online Status
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Allow others to see when you are online
                            </p>
                        </div>

                        <button
                            onClick={() => setOnline(!online)}
                            className={`h-6 w-11 rounded-full ${
                                online
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                            }`}
                        >
                            <div
                                className={`h-5 w-5 rounded-full bg-white transition-transform ${
                                    online
                                        ? "translate-x-5"
                                        : "translate-x-0"
                                }`}
                            />
                        </button>

                    </div>
                </div>

                {/* Logout */}
                <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6">

                    <button className="flex items-center gap-2 text-red-500 hover:text-red-600">
                        <LogOut size={20} />
                        Log Out
                    </button>

                </div>

            </div>

        </section>
    );
}

