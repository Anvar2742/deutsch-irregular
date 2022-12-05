import "./App.css";
import Cards from "./pages/Cards";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Verbs from "./pages/Verbs";
import * as Icon from 'react-bootstrap-icons';

function App() {
    return (
        <div className="bg-gray-50 h-[100vh] overflow-hidden">
            <div className="max-w-md mx-auto h-full bg-gray-300 grid grid-rows-main grid-cols-1">
                <Link to="/" className="text-2xl p-4 border-2 border-black flex items-center"><Icon.ArrowLeft className="mr-2"/> Cards</Link>
                <div className=" bg-slate-500 h-full">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cards" element={<Cards />} />
                        <Route path="/verbs" element={<Verbs />} />
                    </Routes>
                </div>
                <div className="">
                    <Link to="/verbs">Verbs</Link>
                </div>
            </div>
        </div>
    );
}

export default App;
