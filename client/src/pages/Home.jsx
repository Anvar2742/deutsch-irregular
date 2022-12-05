import { Link } from "react-router-dom";
import catUrl from "../assets/cat.gif";

const Home = () => {
    return (
        <div className="p-4 grid grid-cols-2 grid-rows-2 gap-8 h-full">
            <Link to="/cards" className="flex items-center justify-center rounded-2xl shadow-card">Cards</Link>
            <Link to="/" className="flex items-center justify-center rounded-2xl shadow-card overflow-hidden"><img src={catUrl} className="h-full w-full object-cover" alt="" /></Link>
            <Link to="/" className="flex items-center justify-center rounded-2xl shadow-card overflow-hidden"><img src={catUrl} className="h-full w-full object-cover" alt="" /></Link>
            <Link to="/" className="flex items-center justify-center rounded-2xl shadow-card overflow-hidden"><img src={catUrl} className="h-full w-full object-cover" alt="" /></Link>
        </div>
    );
};

export default Home;
