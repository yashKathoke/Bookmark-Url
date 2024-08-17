import React from 'react';
import authService from '../../supabase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout as authlogout } from '../../store/authSlice';


function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      await authService.logout();
      dispatch(authlogout());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gray-800 text-white py-4 px-6 flex justify-between"> {/* Apply Tailwind CSS classes for background color, text color, padding, and margin */}
     
     <h1>
      Bookmark-Url
      </h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}> {/* Apply Tailwind CSS classes for button styling */}
        Logout
      </button>
    </div>
  );
}

export default Header;