import "./App.css";
import Cards from "./pages/Cards";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Verbs from "./pages/Verbs";
import * as Icon from "react-bootstrap-icons";

const NavBar = () => {
    return (
        <Link to="/" className="text-2xl p-4 text-white flex items-center">
            <Routes>
                <Route path="/" element="Home" />
                <Route
                    path="/cards"
                    element={
                        <div className="flex items-center">
                            <Icon.ArrowLeft className="mr-2" />
                            Cards
                        </div>
                    }
                />
                <Route
                    path="/verbs"
                    element={
                        <div className="flex items-center">
                            <Icon.ArrowLeft className="mr-2" />
                            Verbs
                        </div>
                    }
                />
            </Routes>
        </Link>
    );
};

function App() {
    return (
        <div className="bg-gray-50 h-[100vh] overflow-hidden">
            <div className="max-w-md mx-auto h-full bg-primary grid grid-rows-main grid-cols-1">
                <NavBar />
                <div className="bg-white h-full">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cards" element={<Cards />} />
                        <Route path="/verbs" element={<Verbs />} />
                    </Routes>
                </div>
                <div className="bg-primary text-2xl p-4 text-white flex items-center">
                    <Link to="/verbs">Verbs</Link>
                </div>
            </div>
        </div>
    );
}

export default App;
