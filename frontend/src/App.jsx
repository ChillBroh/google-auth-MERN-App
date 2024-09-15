// client/src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:5000/auth/user");
      setUser(res.data);
    };
    fetchUser();
  }, []);

  const handleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const handleLogout = async () => {
    await axios.get("http://localhost:5000/auth/logout");
    setUser(null);
  };

  return (
    <div className="App">
      <h1>Google Authentication with Passport.js</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.name}</h2>
          <img src={user.picture} alt="User profile" />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Google</button>
      )}
    </div>
  );
}

export default App;
