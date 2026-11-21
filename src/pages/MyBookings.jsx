import { useState } from "react";
import { getBookings, saveBookings, getData, saveData, seatKey } from "../utils/storage";

export default function MyBookings() {
  const [bookings, setBookings] = useState(getBookings);

  const cancelBooking = (pnr) => {
    if (!window.confirm("Are you sure you want to cancel this ticket?")) {
      return;
    }

    const booking = bookings.find((b) => b.pnr === pnr);

    if (!booking || booking.status !== "Confirmed") return;

    const key = seatKey(booking.bus.id, booking.date);
    const bookedSeats = getData(key, []);

    saveData(
      key,
      bookedSeats.filter((seat) => !booking.seats.includes(seat))
    );

    const updated = bookings.map((b) =>
      b.pnr === pnr ? { ...b, status: "Cancelled" } : b
    );

    setBookings(updated);
    saveBookings(updated);
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      {bookings.length === 0 && (
        <div className="bg-white shadow rounded-xl p-12 text-center">
          <h2 className="text-xl font-bold">No bookings found</h2>
          <p className="text-gray-500 mt-2">
            Your booked tickets will appear here.
          </p>
        </div>
      )}

      <div className="space-y-5">
        {[...bookings].reverse().map((booking) => (
          <div key={booking.pnr}
            className="bg-white shadow rounded-xl p-6">

            <div className="flex justify-between flex-wrap gap-3">
              <h2 className="text-xl font-bold">
                {booking.bus?.name || "Bus"}
              </h2>

              <span className={`font-bold ${
                booking.status === "Confirmed"
                  ? "text-green-600"
                  : "text-red-500"
              }`}>
                {booking.status}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-3 mt-5 text-gray-600">
              <p><b>PNR:</b> {booking.pnr}</p>
              <p><b>Passenger:</b> {booking.passenger?.name || "N/A"}</p>
              <p><b>Route:</b> {booking.bus?.from} → {booking.bus?.to}</p>
              <p><b>Journey Date:</b> {booking.date}</p>
              <p><b>Seats:</b> {booking.seats?.join(", ")}</p>
              <p><b>Mobile:</b> {booking.passenger?.phone || "N/A"}</p>
              <p><b>Total:</b> ₹{booking.total}</p>
            </div>

            {booking.status === "Confirmed" && (
              <button
                onClick={() => cancelBooking(booking.pnr)}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg mt-5"
              >
                Cancel Ticket
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}