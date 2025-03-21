import React, { useRef, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

const AddPassword = ({ onClose, onSave }) => {
  const popupRef = useRef();
  const token = localStorage.getItem("authToken");

  const [formData, setFormData] = useState({
    platform: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.platform || !formData.username || !formData.password) return;

    await onSave(formData);
    setFormData({ platform: "", username: "", password: "" });
    onClose();
  };

  const closePopup = (e) => {
    if (popupRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div
      ref={popupRef}
      onClick={closePopup}
      className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-sm"
    >
      <div className="relative bg-white p-6 shadow-lg rounded-lg w-full max-w-xl mx-auto text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          <X size={20} className="text-gray-700" />
        </button>

        <h3 className="text-xl font-semibold mb-4 text-gray-800">Add Password</h3>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            id="platform"
            placeholder="Platform"
            value={formData.platform}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="submit"
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Save Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPassword;
