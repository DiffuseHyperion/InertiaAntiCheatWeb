import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-y-5">
            <h1 className={"text-3xl"}>Click on your transfer method below:</h1>
            <Link to={"/data"} className={"font-bold text-2xl hover:underline"}>Data</Link>
            <Link to={"/name"} className={"font-bold text-2xl hover:underline"}>Name</Link>
        </div>
    )
}