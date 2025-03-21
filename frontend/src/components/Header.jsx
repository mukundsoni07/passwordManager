import React from "react";
import { UserCircle } from "lucide-react"; 

const Header = ({ user, onLogout }) => {
  return (
    <header className="sticky top-0 left-0 w-full bg-blue-600 text-white p-4 flex justify-between items-center z-50 shadow-xl">
      <h1 className="text-3xl font-semibold flex-grow text-center">
        Password Manager
      </h1>

      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-3 bg-white text-gray-800 px-4 py-2 rounded-full shadow-md">
            <UserCircle size={28} className="text-blue-600" />
            <span className="text-lg font-medium">{user.fullName}</span>
            <button
              onClick={onLogout}
              className="px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-200 shadow-md"
            >
              Log Out
            </button>
          </div>
        ) : (
          <span className="text-md">Please login</span>
        )}
      </div>
    </header>
  );
};

export default Header;
