
import React from "react";
import { buses } from "../data/buses";
import BusCard from "../components/BusCard";

function Buses() {
  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Available Buses
          </h1>
          <p className="text-gray-500 mt-1">
            Choose your bus and enjoy a comfortable journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {buses.map((bus) => (
            <BusCard key={bus.id} bus={bus} />
          ))}
        </div>

      </div>
    </div>
  );
}

export default Buses;
