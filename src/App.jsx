
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Seats from "./pages/Seats";
import Passenger from "./pages/Passenger";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import Login from "./pages/Login";
import MyBookings from "./pages/MyBookings";

import BusList from "./components/BusList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Django API buses */}
        <Route path="/api-buses" element={<BusList />} />

        <Route path="/seats/:id" element={<Seats />} />
        <Route path="/passenger" element={<Passenger />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookings" element={<MyBookings />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
