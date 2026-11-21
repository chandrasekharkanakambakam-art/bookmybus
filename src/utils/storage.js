export const getData = (key, fallback = []) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
};

export const saveData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const seatKey = (busId, date) =>
  `booked-seats-${busId}-${date}`;

export const getBookings = () => getData("busbook-bookings", []);

export const saveBookings = (bookings) =>
  saveData("busbook-bookings", bookings);