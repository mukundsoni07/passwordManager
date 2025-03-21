import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import PasswordList from "./components/PasswordList";
import AddPassword from "./components/AddPassword";
import { Plus } from "lucide-react";

const App = () => {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [user, setUser] = useState(null);
  const [passwords, setPasswords] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [login, setLogin] = useState(true); 

  const API_URL = import.meta.env.VITE_API_URL;
  

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const token = localStorage.getItem("authToken");
  const fetchPasswords = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/passwords`, {
        headers: { Authorization: `Bearer ${token}` }, 
      });
      setPasswords(response.data);
    } catch (error) {
      console.error("Error fetching passwords:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchPasswords();
    
  }, [token]);

  const addPassword = async (newPassword) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/passwords`,
        newPassword,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      setPasswords([...passwords, response.data.password]); 
    } catch (error) {
      console.error("Error adding password:", error);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setPasswords([]); 
  };
  const editPassword = async (id, updatedData) => {
    try {
      await axios.put(
        `${API_URL}/api/passwords/${id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPasswords(
        passwords.map((pwd) => (pwd._id === id ? { ...pwd, ...updatedData } : pwd))
      );
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const deletePassword = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/passwords/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPasswords(passwords.filter((pwd) => pwd._id !== id));
    } catch (error) {
      console.error("Error deleting password:", error);
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header user={user} onLogout={handleLogout} />

      {user ? (
        <div className="px-8 py-6">
          <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            Welcome, {user.fullName}! 🎉
          </h1>

          {loading ? (
            <p className="text-center text-gray-600">Loading passwords...</p>
          ) : (
            <PasswordList passwords={passwords}  onEdit={editPassword} onDelete={deletePassword} />
          )}

          <button
            onClick={() => setShowAddPopup(true)}
            type="button"
            className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center z-10"
          >
            <Plus size={24} />
          </button>

          {showAddPopup && (
            <AddPassword onClose={() => setShowAddPopup(false)} onSave={addPassword} />
          )}
        </div>
      ) : login ? (
        <Login setLogin={setLogin} onLogin={handleLogin} />
      ) : (
        <Register setLogin={setLogin} />
      )}
    </div>
  );
};

export default App;
