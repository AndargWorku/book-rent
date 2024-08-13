import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Call the backend to log out the user
    fetch('http://localhost:5000/users/logout', {
      method: 'POST',
      credentials: 'include', // Include cookies with the request
    })
      .then((response) => {
        if (response.ok) {
          // Redirect to the login page or home page after successful logout
          navigate('/login');
        } else {
          console.error('Logout failed');
        }
      })
      .catch((error) => console.error('Error:', error));
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Logging out...</h1>
        <p className="text-gray-600">Please wait while we log you out.</p>
      </div>
    </div>
  );
};

export default Logout;

