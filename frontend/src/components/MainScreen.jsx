import React, { useState } from "react";
import { FiUpload } from "react-icons/fi"; // Upload Icon
import { IoClose } from "react-icons/io5"; // Close Icon

const MainContent = ({ submitLabel = "Submit", fileLabel = "Upload File" }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) =>
      /\.(png|jpe?g)$/i.test(file.name)
    );

    if (validFiles.length > 0) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
    } else {
      alert("Please select only PNG, JPG, or JPEG files.");
    }
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <main className="flex-1 bg-gray-50 p-8">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <img src={Image} alt="Logo" className="h-40" />
      </div>

      <div className="flex flex-col h-5/6 items-center justify-center space-y-4">
        {/* Upload Button */}
        <button
          className="bg-gray-600 text-white px-6 py-2 rounded-3xl flex items-center space-x-2 min-w-[150px] whitespace-nowrap"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <span>{fileLabel}</span> {/* Ensure label is visible */}
          <FiUpload className="h-5 w-5" />
        </button>

        {/* Hidden file input */}
        <input
          id="fileInput"
          type="file"
          accept=".png,.jpg,.jpeg"
          multiple
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {/* Display selected files */}
        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center space-x-4">
                <span className="text-gray-700">{file.name}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveFile(index)}
                >
                  <IoClose className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center space-x-4">
          <button
            className="bg-blue-900 text-white px-6 py-2 rounded"
            disabled={selectedFiles.length === 0}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
