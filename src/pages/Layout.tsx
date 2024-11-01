import {Outlet} from "react-router-dom";

export default function Layout() {
    return (
        <main className="bg-black text-white min-h-screen">
            <Outlet/>
        </main>
    )
}