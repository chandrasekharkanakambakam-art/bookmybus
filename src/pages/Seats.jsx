import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { buses } from "../data/buses";
import { getData, seatKey } from "../utils/storage";

export default function Seats() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const bus = location.state?.bus ||
    buses.find((b) => b.id === Number(id));

  const date = location.state?.date ||
    new Date().toISOString().slice(0, 10);

  const booked = getData(
    seatKey(id, date),
    []
  );

  const [selected, setSelected] = useState([]);

  if (!bus) {
    return <div className="p-10">Bus not found.</div>;
  }

  const toggleSeat = (seat) => {
    if (booked.includes(seat)) return;

    setSelected((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const seats = Array.from({ length: 40 }, (_, i) => i + 1);

  return (
    <div className="max-w-6xl mx-auto p-5 py-10">
      <h1 className="text-3xl font-bold mb-2">Select Your Seats</h1>
      <p className="text-gray-500 mb-8">
        {bus.name} | {bus.from} → {bus.to} | {date}
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex justify-between mb-6">
            <h2 className="font-bold text-xl">Bus Layout</h2>
            <span>🚍 Driver</span>
          </div>

          <div className="border-2 rounded-2xl p-5">
            <div className="text-right mb-6 text-gray-500">
              Driver Seat
            </div>

            <div className="grid grid-cols-4 gap-3">
              {seats.map((seat) => {
                const isBooked = booked.includes(seat);
                const isSelected = selected.includes(seat);

                return (
                  <button
                    key={seat}
                    disabled={isBooked}
                    onClick={() => toggleSeat(seat)}
                    className={`h-12 rounded-lg border font-bold
                      ${isBooked
                        ? "bg-red-500 text-white"
                        : isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                  >
                    {seat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-6 text-sm">
            <span>🟩 Available</span>
            <span>🟦 Selected</span>
            <span>🟥 Booked</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 h-fit">
          <h2 className="text-xl font-bold mb-5">Booking Summary</h2>

          <p className="mb-3">{bus.name}</p>
          <p className="mb-3">{bus.from} → {bus.to}</p>

          <div className="border-t border-b py-4 my-4">
            <p>Selected seats: {selected.join(", ") || "None"}</p>
            <p className="mt-3">Price per seat: ₹{bus.price}</p>
          </div>

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span className="text-blue-600">
              ₹{selected.length * bus.price}
            </span>
          </div>

          <button
            disabled={selected.length === 0}
            onClick={() => navigate("/passenger", {
              state: { bus, date, seats: selected }
            })}
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 disabled:bg-gray-400"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}