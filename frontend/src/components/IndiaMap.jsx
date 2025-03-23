import React, { useEffect } from "react";

const IndiaMap = () => {
  useEffect(() => {
    // Load the map script dynamically
    const mapScript = document.createElement("script");
    mapScript.src = "/mapdata.js";
    mapScript.async = true;
    document.body.appendChild(mapScript);

    const countryScript = document.createElement("script");
    countryScript.src = "/countrymap.js";
    countryScript.async = true;
    document.body.appendChild(countryScript);

    return () => {
      document.body.removeChild(mapScript);
      document.body.removeChild(countryScript);
    };
  }, []);

  return (
    <div className="mt-6 bg-white p-3 shadow-lg rounded-xl w-170 h-[750px]">
      <h2 className="text-xl font-bold mb-4">India Warehouse Distribution</h2>
      <div id="map" className="w-100 h-100px"></div>
    </div>
  );
};

export default IndiaMap;
