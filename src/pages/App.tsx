import {BrowserRouter, Route, Routes} from "react-router-dom";
import Data from "./data/Data";
import Home from "./Home";
import Name from "./name/Name";
import Layout from "./Layout";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="data" element={<Data />} />
                    <Route path="name" element={<Name />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}