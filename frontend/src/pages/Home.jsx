import React, { useEffect, useState } from 'react';
import LeftPanel from '../components/LeftPanel';
import { useUserContext } from '../contexts/UserContext'; // Import the custom hook
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import IndiaMap from "../components/IndiaMap";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
    const { userData } = useUserContext(); // Access global user data
    const [warehouseData, setWarehouseData] = useState([]); // Ensure initial state is an array
    const totalRevenue = "$50,000";
    const currentStock = 1200; // Number of items in warehouse
    const warehouseCapacityUsed = 75; // Percentage

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Left Panel */}
            <LeftPanel userData={userData} />
            
            {/* Main Content */}
            <div className="flex flex-col w-full p-6 space-y-6 overflow-auto">
                {/* Header */}
                <div className="text-3xl font-bold text-gray-800">Inventory</div>
                
                {/* Product Inventory Table */}
                <div className="bg-white p-6 shadow-lg rounded-xl overflow-auto">
                    <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-green-600 text-white sticky top-0">
                            <tr>
                                <th className="border p-3 text-left">ID</th>
                                <th className="border p-3 text-left">Name</th>
                                <th className="border p-3 text-left">MRP</th>
                                <th className="border p-3 text-left">Manufacture Date</th>
                                <th className="border p-3 text-left">Expiry Date</th>
                                <th className="border p-3 text-left">Quantity</th>
                                <th className="border p-3 text-left">Predicted Sales</th>
                            </tr>
                        </thead>
                        <tbody>
                            {warehouseData?.map((warehouse) => ( // ✅ Remove ".warehouses"
                                <React.Fragment key={warehouse.warehouse_id}>
                                    <tr className="bg-gray-100 text-gray-800 font-semibold">
                                        <td colSpan={7} className="p-3">{warehouse.warehouse_name}</td>
                                    </tr>
                                    {warehouse.products.map((product, index) => (
                                        <tr key={product.product_id} 
                                            className={`border-b text-gray-700 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-green-100 transition`}>
                                            <td className="p-3">{product.product_id}</td>
                                            <td className="p-3">{product.product_name}</td>
                                            <td className="p-3">₹{product.mrp}</td>
                                            <td className="p-3">{product.manufacture_date}</td>
                                            <td className="p-3">{product.expiry_date}</td>
                                            <td className="p-3">{product.quantity}</td>
                                            <td className="p-3">{product.predicted_sales}</td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* India Map Component */}
                <IndiaMap /> 
            </div>
        </div>
    );
};

export default Home;
