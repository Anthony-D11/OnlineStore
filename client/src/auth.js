import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
const base_url = "http://localhost:4000/api/v1/users";

export function AuthProvider({ children }) {
  const [userState, setUserState] = useState({});

  return (
    <AuthContext.Provider value={{ userState, setUserState }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);