import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [method, setMethod] = useState("UPI");

  if (!state?.bus || !state?.passenger) {
    return <div className="p-10">Booking information missing.</div>;
  }

  const payNow = () => {
    const booking = {
      ...state,
      pnr: "BB" + Date.now().toString().slice(-8),
      status: "Confirmed",
      createdAt: new Date().toISOString(),
      paymentMethod: method,
    };

    navigate("/confirmation", { state: { booking } });
  };

  return (
    <div className="max-w-xl mx-auto p-5 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-7">
        <h1 className="text-3xl font-bold mb-6">Payment</h1>

        <div className="bg-blue-50 rounded-xl p-5 mb-6">
          <p>{state.bus.name}</p>
          <p>{state.bus.from} → {state.bus.to}</p>
          <p>Passenger: {state.passenger.name}</p>
          <p>Seats: {state.seats.join(", ")}</p>
          <h2 className="text-2xl font-bold text-blue-700 mt-3">
            ₹{state.total}
          </h2>
        </div>

        <h3 className="font-bold mb-4">Select Payment Method</h3>

        {["UPI", "Credit / Debit Card", "Net Banking", "Cash (Demo)"].map((item) => (
          <label key={item}
            className="flex gap-3 border p-4 rounded-lg mb-3 cursor-pointer">
            <input type="radio" checked={method === item}
              onChange={() => setMethod(item)} />
            {item}
          </label>
        ))}

        <button onClick={payNow}
          className="w-full bg-blue-600 text-white p-4 rounded-lg mt-4 hover:bg-blue-700">
          Pay ₹{state.total}
        </button>
        <p className="text-xs text-gray-500 mt-3">
          Demo only. No actual payment is processed.
        </p>
      </div>
    </div>
  );
}