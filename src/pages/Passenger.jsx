import { useLocation, useNavigate } from "react-router-dom";

export default function Passenger() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.bus || !state?.seats?.length) {
    return <div className="p-10">Please select your bus seats first.</div>;
  }

  const submit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const passenger = {
      name: form.get("name"),
      age: form.get("age"),
      gender: form.get("gender"),
      phone: form.get("phone"),
      email: form.get("email"),
    };

    navigate("/payment", {
      state: {
        ...state,
        passenger,
        total: state.bus.price * state.seats.length,
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-5 py-12">
      <h1 className="text-3xl font-bold mb-6">Passenger Details</h1>

      <form onSubmit={submit}
        className="bg-white shadow-lg rounded-2xl p-6 space-y-5">

        <div>
          <label className="block mb-2">Full Name</label>
          <input name="name" required
            placeholder="Enter passenger name"
            className="w-full border p-3 rounded-lg" />
        </div>

        <div>
          <label className="block mb-2">Age</label>
          <input name="age" type="number" min="1" max="120"
            required placeholder="Enter age"
            className="w-full border p-3 rounded-lg" />
        </div>

        <div>
          <label className="block mb-2">Gender</label>
          <select name="gender" required
            className="w-full border p-3 rounded-lg">
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Mobile Number</label>
          <input name="phone" type="tel"
            pattern="[0-9]{10}" required
            placeholder="10 digit mobile number"
            className="w-full border p-3 rounded-lg" />
        </div>

        <div>
          <label className="block mb-2">Email Address</label>
          <input name="email" type="email" required
            placeholder="Enter email"
            className="w-full border p-3 rounded-lg" />
        </div>

        <div className="bg-blue-50 p-5 rounded-xl">
          <p>Seats: {state.seats.join(", ")}</p>
          <h2 className="font-bold text-xl mt-3">
            Total: ₹{state.bus.price * state.seats.length}
          </h2>
        </div>

        <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
          Continue to Payment →
        </button>
      </form>
    </div>
  );
}