import { Routes, Route } from "react-router-dom";
import Logging from "../components/Logging/Logging";
import Dashboard from "../components/Dashboard/Dashboard";

function CustomRoutes() {
    <Routes>
        <Route path="/" element={<Logging />} />
        <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
}

export default CustomRoutes;