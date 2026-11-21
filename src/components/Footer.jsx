import { Bus, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white mt-12">
      <div className="max-w-7xl mx-auto px-5 py-12 grid md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bus className="text-blue-400" /> BusBook
          </h2>
          <p className="text-gray-400 mt-4">
            Your journey, our responsibility.
            Book your bus tickets easily and travel comfortably.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <div className="flex flex-col gap-3 text-gray-400">
            <Link to="/">Home</Link>
            <Link to="/bookings">My Bookings</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p className="flex gap-2 text-gray-400 mb-3">
            <Mail size={18} /> support@busbook.com
          </p>
          <p className="flex gap-2 text-gray-400">
            <Phone size={18} /> +91 9876543210
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center p-5 text-gray-400">
        © 2026 BusBook. All rights reserved.
      </div>
    </footer>
  );
}