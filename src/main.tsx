import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Layout from "./Layout.tsx"
import Home from "./Home.tsx"
import DataCalculator from "./calculator/data/DataCalculator.tsx"
import NameCalculator from "./calculator/name/NameCalculator.tsx"
import IdCalculator from "./calculator/id/IdCalculator.tsx"

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="data" element={<DataCalculator />} />
                <Route path="name" element={<NameCalculator />} />
                <Route path="id" element={<IdCalculator />} />
            </Route>
        </Routes>
    </BrowserRouter>
)
