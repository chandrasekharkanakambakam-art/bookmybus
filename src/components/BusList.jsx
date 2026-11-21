import React, { useEffect, useState } from "react";
import API from "../services/api";

function BusList() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("buses/")
      .then((response) => {
        setBuses(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Unable to load buses. Please check Django server.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2 className="text-center mt-10">Loading buses...</h2>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Available Buses
      </h1>

      {buses.length === 0 ? (
        <p className="text-center">No buses available.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buses.map((bus) => (
            <div
              key={bus.id}
              className="bg-white rounded-xl shadow-md p-5"
            >
              <h2 className="text-xl font-bold mb-3">
                {bus.name || bus.bus_name || `Bus ${bus.id}`}
              </h2>

              {Object.entries(bus).map(([key, value]) => (
                <p key={key} className="text-gray-700 mb-2">
                  <span className="font-semibold">
                    {key.replaceAll("_", " ")}:
                  </span>{" "}
                  {typeof value === "object"
                    ? JSON.stringify(value)
                    : String(value ?? "")}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BusList;