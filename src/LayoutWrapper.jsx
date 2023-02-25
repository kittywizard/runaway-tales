import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function LayoutWrapper() {
    return (
        <div className="container mx-auto">
            <Header/>
                <Outlet />
            <Footer />
        </div>
    )
}