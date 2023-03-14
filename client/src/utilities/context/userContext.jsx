import { createContext, useEffect, useState } from "react";
import axios from "axios";

// context
const UserContext = createContext({});

// context provider
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // attempt to find user on first load
  useEffect(() => {
    setLoading(true);
    if (!user) {
      const fetchUser = async () => {
        // sending a cookie if any exist
        const res = await axios.get("/profile");
        if (res.data.email && res.data.id) {
          setUser(res.data);
        }
      };
      fetchUser();
    }
    setLoading(false);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
