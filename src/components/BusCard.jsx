// import { Link } from "react-router-dom";
// import { Star, Clock, Wifi, Snowflake, Armchair } from "lucide-react";

// export default function BusCard({ bus, date }) {
//   return (
//     <div className="bg-white shadow-lg rounded-xl p-5">
//       <img
//         src={bus.image}
//         alt={bus.name}
//         className="w-full h-48 object-cover rounded-lg"
//       />

//       <h2 className="text-xl font-bold mt-4">
//         {bus.name}
//       </h2>

//       <p>{bus.from} → {bus.to}</p>

//       <p>{bus.departure} - {bus.arrival}</p>

//       <h2 className="text-2xl text-blue-600 font-bold">
//         ₹{bus.price}
//       </h2>

//       <Link to={`/seats/${bus.id}`} state={{ bus, date }}
//         className="inline-block bg-blue-600 text-white p-3 rounded-lg mt-4">
//         Select Seats
//       </Link>
//     </div>
//   );
// }



import React from "react";
import { useNavigate } from "react-router-dom";

function BusCard({ bus }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition duration-300 overflow-hidden">

      <div className="p-5">

        {/* Bus Name */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              {bus.name}
            </h2>
            <p className="text-sm text-gray-500">
              {bus.operator} | {bus.type}
            </p>
          </div>

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
            ⭐ {bus.rating}
          </span>
        </div>

        {/* Route Details */}
        <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3 mb-4">

          <div>
            <p className="text-lg font-bold text-gray-800">
              {bus.departure}
            </p>
            <p className="text-sm text-gray-500">
              {bus.from}
            </p>
          </div>

          <div className="text-center px-2">
            <p className="text-xs text-gray-500">
              {bus.duration}
            </p>
            <div className="w-16 border-t-2 border-dashed border-orange-400 my-2"></div>
            <p className="text-xs text-gray-500">Journey</p>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-gray-800">
              {bus.arrival}
            </p>
            <p className="text-sm text-gray-500">
              {bus.to}
            </p>
          </div>

        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {bus.amenities.map((item, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Price and Button */}
        <div className="flex justify-between items-center border-t pt-4">

          <div>
            <p className="text-xs text-gray-500">Starting from</p>
            <h2 className="text-2xl font-bold text-orange-600">
              ₹{bus.price}
            </h2>
            <p className="text-xs text-gray-500">
              {bus.seats} seats available
            </p>
          </div>

          <button
            onClick={() => navigate(`/seats/${bus.id}`)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-lg transition"
          >
            Select Seats
          </button>

        </div>

      </div>
    </div>
  );
}

export default BusCard;
