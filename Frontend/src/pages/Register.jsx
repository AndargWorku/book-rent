import { GiBookmarklet } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    mobile: "",
    count: 0,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const form = {
        first_name:formData.first_name,
        email: formData.email,
        password:formData.password,
        location:formData.location,
        mobile: formData.mobile,
        roles:["owner"],
        status:"inactive",
        count: 0
      }

      console.log(form);
      await fetch("http://localhost:5000/users/register",{
        method : "POST",
        headers : {
          "Content-Type": "application/json",},
        body: JSON.stringify(form)
    }).then(
      navigate("/login")); 
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-auto">
      {/* Left Side with Logo */}
      <div className="md:flex-1 bg-blue-900 flex items-center justify-center py-8 md:py-0">
        <div className="text-white">
          <GiBookmarklet className="text-6xl md:text-9xl font-extrabold" />
        </div>
      </div>

      {/* Right Side with Form */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 md:px-0 py-8 md:py-0">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900">
              Book Rent
            </h2>
            <p className="mt-2 text-start text-xl md:text-2xl text-gray-600">
              Signup as Owner
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
            <div>
                <label htmlFor="email-address" className="sr-only">
                  first name
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  autoComplete="first_name"
                  required
                  value={formData.first_name}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm md:text-base"
                  placeholder="Enter fname"
                />
              </div>

              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm md:text-base"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm md:text-base"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm md:text-base"
                  placeholder="Confirm Password"
                />
              </div>
              <div>
                <label htmlFor="location" className="sr-only">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm md:text-base"
                  placeholder="Location"
                />
              </div>
              <div>
                <label htmlFor="mobile" className="sr-only">
                  Phone Number
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm md:text-base"
                  placeholder="Phone Number"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  id="terms-and-conditions"
                  name="termsAndConditions"
                  type="checkbox"
                  checked={formData.termsAndConditions}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="terms-and-conditions"
                  className="ml-2 block text-sm text-gray-900"
                >
                  I accept the Terms and Conditions
                </label>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-2 text-center">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
            </div>

            <div className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
