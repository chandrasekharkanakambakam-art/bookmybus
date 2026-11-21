import { Link, useNavigate } from "react-router-dom";
import { Bus, Ticket, User, LogOut } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("busbook-user") || "null"
  );

  const logout = () => {
    localStorage.removeItem("busbook-user");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-blue-600">
          <Bus size={34} />
          <span className="text-2xl font-bold">BusBook</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/bookings" className="flex items-center gap-2 hover:text-blue-600">
            <Ticket size={19} /> My Bookings
          </Link>
          {user ? (
            <>
              <span className="text-gray-600">Hi, {user.name}</span>
              <button onClick={logout} className="flex gap-2 text-red-500">
                <LogOut size={19} /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-lg flex gap-2">
              <User size={19} /> Login
            </Link>
          )}
        </div>

        <Link to="/login" className="md:hidden text-blue-600">
          <User size={25} />
        </Link>
      </div>
    </nav>
  );
}