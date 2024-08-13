import { GiBookmarklet } from "react-icons/gi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../state/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  if (email === 'admin' && password === 'password') {
    // On successful login, navigate to the admin panel
    navigate('/admin-panel/dashboard');
  } else {
    alert('Invalid credentials');
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    //  setError(""); // Clear any existing error messages

    try {
      const form = {
        email: email,
        password: password
      }
      const response = await fetch("http://localhost:5000/users/login",{
        method : "POST",
        headers : {
          "Content-Type": "application/json",},
        body: JSON.stringify(form)
    })

      if (response.status === 200) {
        const data = await response.json();
        dispatch(addUser(data.user));
        console.log('some dsgfhg')
        navigate('/admin-panel/dashboard');
      } else {
        setError(response.data.message || "Invalid email or password");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password");
      } else if (err.response && err.response.status === 500) {
        setError("Server error, please try again later.");
      } else {
        setError("An error occurred, please check your connection and try again.");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
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
            <h2 className="text-start text-2xl md:text-3xl font-bold text-gray-900">
              Book Rent
            </h2>
            <p className="mt-2 text-start text-xl md:text-2xl text-gray-600">
              Login
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm md:text-base"
                  placeholder="Password"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login
              </button>
            </div>

            <div className="text-sm text-center mt-4">
              Haven’t got an account?{' '}
              <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
