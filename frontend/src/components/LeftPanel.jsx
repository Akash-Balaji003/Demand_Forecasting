import React from "react";
import { useNavigate } from "react-router-dom";

const LeftPanel = ({ userData }) => {
    const navigate = useNavigate();

    return (
        <aside className="bg-blue-900 text-white w-1/4 h-screen flex flex-col p-6">
            {/* User Info */}
            <div>
                <h2 className="text-xl font-bold mb-1">Welcome</h2>
                <p className="text-lg mb-8">{userData?.username}</p>
            </div>

            {/* Navigation Links (Takes Available Space) */}
            <nav className="space-y-4 flex-grow">
                <a className="block hover:underline" onClick={() => navigate("/home")}>
                    Inventory
                </a>
                <a className="block hover:underline" onClick={() => navigate("/reallocation")}>
                    WareHouse Management
                </a>
            </nav>

            {/* Logout Button at Bottom */}
            <a className="block hover:underline mt-auto hover:text-red-500" onClick={() => navigate("/")}>
                Logout
            </a>
        </aside>
    );
};

export default LeftPanel;
