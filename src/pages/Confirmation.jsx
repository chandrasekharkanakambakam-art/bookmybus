import { useLocation, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { getBookings, saveBookings, getData, saveData, seatKey } from "../utils/storage";
import { useEffect, useState } from "react";

export default function Confirmation() {
  const { state } = useLocation();
  const booking = state?.booking;
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!booking || saved) return;

    const bookings = getBookings();

    if (!bookings.some((b) => b.pnr === booking.pnr)) {
      saveBookings([...bookings, booking]);

      const key = seatKey(booking.bus.id, booking.date);
      const bookedSeats = getData(key, []);

      saveData(key, [
        ...new Set([...bookedSeats, ...booking.seats]),
      ]);
    }

    setSaved(true);
  }, [booking, saved]);

  if (!booking) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold">Ticket details unavailable.</h2>
        <Link to="/bookings" className="text-blue-600">My Bookings</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-5 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <CheckCircle size={65} className="text-green-500 mx-auto" />

        <h1 className="text-3xl font-bold text-green-600 text-center mt-4">
          Booking Confirmed!
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Your demo ticket has been generated successfully.
        </p>

        <div className="bg-blue-50 p-6 rounded-xl mt-7 space-y-3">
          <h2 className="text-xl font-bold text-blue-700">
            PNR: {booking.pnr}
          </h2>
          <p><b>Passenger:</b> {booking.passenger.name}</p>
          <p><b>Bus:</b> {booking.bus.name}</p>
          <p><b>Route:</b> {booking.bus.from} → {booking.bus.to}</p>
          <p><b>Journey Date:</b> {booking.date}</p>
          <p><b>Seats:</b> {booking.seats.join(", ")}</p>
          <p><b>Mobile:</b> {booking.passenger.phone}</p>
          <p><b>Payment:</b> {booking.paymentMethod}</p>
          <p><b>Amount:</b> ₹{booking.total}</p>
          <p><b>Status:</b> <span className="text-green-600">Confirmed</span></p>
        </div>

        <Link to="/bookings"
          className="block text-center bg-blue-600 text-white rounded-lg p-3 mt-6">
          View My Bookings
        </Link>
      </div>
    </div>
  );
}