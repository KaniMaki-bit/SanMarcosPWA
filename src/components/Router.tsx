import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

const Router = () => {
    const routes = <Routes>
        <Route path="/*" element={<Home/>}/>
        <Route path="/Home" element={<Home/>}/>
    </Routes>

    return (
        <BrowserRouter>
            {routes}
        </BrowserRouter>
    )
}

export default Router;