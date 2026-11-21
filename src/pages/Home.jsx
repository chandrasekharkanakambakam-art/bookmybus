
import { useState } from "react";
import SearchForm from "../components/SearchForm";
import BusCard from "../components/BusCard";
import { buses } from "../data/buses";

export default function Home() {
  const [search, setSearch] = useState(null);

  const filteredBuses = search
    ? buses.filter(
        (bus) =>
          bus.from === search.from &&
          bus.to === search.to
      )
    : buses;

  const handleSearch = (values) => {
    setSearch(values);
  };

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-950 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-5 py-16">
          <h1 className="text-4xl md:text-5xl font-bold">
            Book Your Bus Tickets
          </h1>
          <p className="mt-4 text-lg">
            Find and book buses for your favourite destinations.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 -mt-8 relative">
        <SearchForm onSearch={handleSearch} />
      </div>

      <section className="max-w-7xl mx-auto px-5 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">
            {search ? "Available Buses" : "Popular Buses"}
          </h2>
          <span className="text-blue-600 font-semibold">
            {filteredBuses.length} Buses Found
          </span>
        </div>

        {search && (
          <p className="mb-6 text-gray-600">
            {search.from} → {search.to} | {search.date}
          </p>
        )}

        <div className="grid grid-cols-1 gap-6">
          {filteredBuses.map((bus) => (
            <BusCard
              key={bus.id}
              bus={bus}
              date={search?.date || new Date().toISOString().slice(0, 10)}
            />
          ))}
        </div>

        {filteredBuses.length === 0 && (
          <div className="bg-white rounded-xl p-10 text-center shadow">
            <h2 className="text-2xl font-bold">
              No Buses Available
            </h2>
            <p className="text-gray-500 mt-3">
              Please select another route.
            </p>
            <button
              onClick={() => setSearch(null)}
              className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Show All Buses
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
