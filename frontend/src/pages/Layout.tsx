
import { Outlet } from "react-router-dom";
import NavBar from "../components/default/navBar";

export default function Layout() {
    return (
        <section className="flex min-h-screen w-full flex-col bg-gray-50">

            <NavBar />

            <main className="flex-1">
                <Outlet />
            </main>

        </section>
    );
}

