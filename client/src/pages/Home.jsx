import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="p-4 grid grid-cols-2 grid-rows-2 gap-8 h-full">
            <Link to="/cards" className="flex items-center justify-center rounded-2xl shadow-card">Cards</Link>
            <Link to="/cards" className="flex items-center justify-center rounded-2xl shadow-card">Cards</Link>
            <Link to="/cards" className="flex items-center justify-center rounded-2xl shadow-card">Cards</Link>
            <Link to="/cards" className="flex items-center justify-center rounded-2xl shadow-card">Cards</Link>
        </div>
    );
};

export default Home;
