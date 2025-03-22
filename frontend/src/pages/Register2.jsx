import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const WarehouseScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get warehouseCount and userData from navigation state
  const { warehouseCount, userData } = location.state || { warehouseCount: 1, userData: {} };

  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    // Initialize warehouse fields based on warehouseCount
    const initialWarehouses = Array.from({ length: warehouseCount }, () => ({
      name: "",
      address: "",
      capacity: "",
      file: null,
    }));
    setWarehouses(initialWarehouses);
  }, [warehouseCount]);

  const handleChange = (index, field, value) => {
    const updatedWarehouses = [...warehouses];
    updatedWarehouses[index][field] = value;
    setWarehouses(updatedWarehouses);
  };

  const handleFileChange = (index, file) => {
    const updatedWarehouses = [...warehouses];
    updatedWarehouses[index].file = file;
    setWarehouses(updatedWarehouses);
  };

  const removeFile = (index) => {
    const updatedWarehouses = [...warehouses];
    updatedWarehouses[index].file = null;
    setWarehouses(updatedWarehouses);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("username", userData.username);
    formData.append("phone_number", userData.phone_number);
    formData.append("number_of_warehouses", warehouseCount);
    formData.append("password", userData.password);

    formData.append(
      "warehouses_json",
      JSON.stringify(
        warehouses.map(({ name, address, capacity }) => ({
          name,
          address,
          capacity,
        }))
      )
    );

    warehouses.forEach((warehouse) => {
      if (warehouse.file) {
        formData.append("files", warehouse.file);
      }
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/register2", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("User Registered Successfully!");
        navigate("/"); // Navigate to Success Page after submission
      } else {
        alert(`Error: ${result.detail}`);
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("Failed to register user.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Warehouse Details</h2>

        <form className="space-y-4">
          {warehouses.map((warehouse, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Warehouse {index + 1}</h3>
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Warehouse Name"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => handleChange(index, "address", e.target.value)}
                  required
                />
                <input
                  type="number"
                  placeholder="Capacity"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => handleChange(index, "capacity", e.target.value)}
                  required
                />
              </div>
              <div className="mt-2 flex items-center gap-4">
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => handleFileChange(index, e.target.files[0])}
                  required
                />
                {warehouse.file && (
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeFile(index)}
                  >
                    <MdDelete size={24} />
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default WarehouseScreen;
