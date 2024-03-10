import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Compra from "../pages/Compra";
import Merma from "../pages/Merma";
import Venta from "../pages/Venta";
import Produccion from "../pages/Produccion";

const Router = () => {
    const routes = <Routes>
        <Route path="/*" element={<Home/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Compra" element={<Compra/>}/>
        <Route path="/Merma" element={<Merma/>}/>
        <Route path="/Venta" element={<Venta/>}/>
        <Route path="/Produccion" element={<Produccion/>}/>
    </Routes>

    return (
        <BrowserRouter>
            {routes}
        </BrowserRouter>
    )
}

export default Router;