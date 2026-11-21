import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [signup, setSignup] = useState(false);
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    if (signup) {
      const user = {
        name: form.get("name"),
        email,
        password,
      };

      localStorage.setItem("busbook-account", JSON.stringify(user));

      alert("Registration successful!");
    } else {
      const account = JSON.parse(
        localStorage.getItem("busbook-account") || "null"
      );

      if (
        !account ||
        account.email !== email ||
        account.password !== password
      ) {
        alert("Invalid email or password. Please register first.");
        return;
      }

      localStorage.setItem(
        "busbook-user",
        JSON.stringify({
          name: account.name,
          email: account.email,
        })
      );
    }

    if (signup) {
      const account = JSON.parse(localStorage.getItem("busbook-account"));
      localStorage.setItem("busbook-user", JSON.stringify({
        name: account.name,
        email: account.email,
      }));
    }

    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <form onSubmit={submit}
        className="bg-white shadow-xl rounded-2xl p-8 space-y-5">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          {signup ? "Create Account" : "Welcome Back"}
        </h1>

        {signup && (
          <input name="name" required placeholder="Full Name"
            className="w-full border p-3 rounded-lg" />
        )}

        <input name="email" type="email" required placeholder="Email Address"
          className="w-full border p-3 rounded-lg" />

        <input name="password" type="password" required minLength="6"
          placeholder="Password"
          className="w-full border p-3 rounded-lg" />

        <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
          {signup ? "Register" : "Login"}
        </button>

        <p className="text-center">
          {signup ? "Already have an account?" : "New user?"}
          <button type="button"
            onClick={() => setSignup(!signup)}
            className="text-blue-600 font-bold ml-2">
            {signup ? "Login" : "Register"}
          </button>
        </p>

        <Link to="/" className="block text-center text-gray-500">
          Back to Home
        </Link>
      </form>
    </div>
  );
}