import "./App.css";
import Cards from "./pages/Cards";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Verbs from "./pages/Verbs";
import * as Icon from "react-bootstrap-icons";
import Settings from "./pages/Settings";

/* TO-DO */
/**
 * Change to NavLink and just hide non active 
 */
const NavBar = () => {
    return (
        <Link to="/" className="text-2xl p-4 text-white flex items-center bg-dark-blue">
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
                <Route
                    path="/settings"
                    element={
                        <div className="flex items-center">
                            <Icon.ArrowLeft className="mr-2" />
                            Settings
                        </div>
                    }
                />
            </Routes>
        </Link>
    );
};

function App() {
    return (
        <div className="bg-gray-50 h-full overflow-hidden">
            <div className="max-w-md mx-auto h-full pb-36">
                <NavBar />
                <div className="bg-white h-full">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cards" element={<Cards />} />
                        <Route path="/verbs" element={<Verbs />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </div>
                <div className="nav bg-gray-900 text-2xl p-4 text-white flex items-center justify-around fixed bottom-0 left-auto max-w-md w-full h-20">
                    <NavLink to="/" className="flex items-center justify-center flex-col">
                        <Icon.Fire />
                        <span className="text-base">Practice</span>
                    </NavLink>
                    <NavLink to="/verbs" className="flex items-center justify-center flex-col">
                        <Icon.Book />
                        <span className="text-base">Verbs</span>
                    </NavLink>
                    <NavLink to="/settings" className="flex items-center justify-center flex-col">
                        <Icon.Gear />
                        <span className="text-base">Settings</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default App;
