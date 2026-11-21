import { useState } from "react";
import { Search, MapPin, CalendarDays, ArrowLeftRight } from "lucide-react";

const cities = [
  "Hyderabad",
  "Bengaluru",
  "Chennai",
  "Vijayawada",
  "Visakhapatnam",
  "Tirupati",
];

export default function SearchForm({ onSearch }) {
  const [from, setFrom] = useState("Hyderabad");
  const [to, setTo] = useState("Bengaluru");
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (from === to) {
          alert("Please select different cities");
          return;
        }
        onSearch({ from, to, date });
      }}
      className="bg-white rounded-2xl shadow-xl p-5 grid grid-cols-1 md:grid-cols-4 gap-4"
    >
      <div>
        <label className="text-sm text-gray-500">From</label>
        <div className="flex items-center border rounded-lg mt-2 px-3">
          <MapPin className="text-blue-600" />
          <select value={from} onChange={(e) => setFrom(e.target.value)}
            className="w-full p-3 outline-none bg-transparent">
            {cities.map((city) => <option key={city}>{city}</option>)}
          </select>
        </div>
      </div>

      <div>
        <div className="flex justify-between">
          <label className="text-sm text-gray-500">To</label>
          <button type="button" onClick={swap} className="text-blue-600">
            <ArrowLeftRight size={18} />
          </button>
        </div>
        <div className="flex items-center border rounded-lg mt-2 px-3">
          <MapPin className="text-blue-600" />
          <select value={to} onChange={(e) => setTo(e.target.value)}
            className="w-full p-3 outline-none bg-transparent">
            {cities.filter((city) => city !== from).map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-500">Journey Date</label>
        <div className="flex items-center border rounded-lg mt-2 px-3">
          <CalendarDays className="text-blue-600" />
          <input
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 outline-none"
            required
          />
        </div>
      </div>

      <div className="flex items-end">
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 w-full flex justify-center gap-2">
          <Search /> Search Buses
        </button>
      </div>
    </form>
  );
}