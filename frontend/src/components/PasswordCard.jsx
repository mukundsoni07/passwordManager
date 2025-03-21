import React, { useState } from "react";
import { Eye, EyeOff, Pencil, Trash2, Check, X } from "lucide-react"; // Icons for UI

const PasswordCard = ({ id, platform, username, password, onEdit, onDelete}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ platform, username, password });

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onEdit(id, editData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white px-4 py-3 shadow-md rounded-md flex w-md border border-gray-200">
      <div className="flex flex-col w-2/5">
        {isEditing ? (
          <>
            <input
              type="text"
              name="platform"
              value={editData.platform}
              onChange={handleChange}
              className="border p-2 rounded-md text-sm mb-2 w-full"
            />
            <input
              type="text"
              name="username"
              value={editData.username}
              onChange={handleChange}
              className="border p-2 rounded-md text-sm mb-2 mr-2 w-full"
            />
          </>
        ) : (
          <>
            <h3 className="text-md font-semibold text-gray-900">{platform}</h3>
            <p className="text-gray-600 text-sm">{username}</p>
          </>
        )}
      </div>

      <div className="flex flex-col items-center justify-center w-2/5">
        {isEditing ? (
          <input
            type="password"
            name="password"
            value={editData.password}
            onChange={handleChange}
            className="border p-2 rounded-md text-sm mb-2 w-full"
          />
        ) : (
          <div className="flex items-center">
            <p className="text-gray-800 text-sm font-mono bg-gray-200 px-2 py-1 rounded-md">
              {showPassword ? password : "••••••••"}
            </p>
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 p-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-2 w-1/5 justify-end">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              <Check size={14} />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(id)}
              className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordCard;
