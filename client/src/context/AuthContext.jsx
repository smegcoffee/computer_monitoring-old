import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRequiredChangePassword, setIsRequiredChangePassword] =
    useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [user, setUser] = useState([]);
  
  useEffect(() => {
    const token = Cookies.get("token");
    const fetchUserProfile = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setIsAdmin(false);
        setLoading(false);
        setIsAuthenticated(false);
        return;
      }
      setLoading(true);
      try {
        const response = await api.get("/profile");

        const data = response.data.data;

        setUser(data);

        if (data.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }

        if (data.request_new_password === 1) {
          setIsRequiredChangePassword(true);
        } else {
          setIsRequiredChangePassword(false);
        }
      } catch (error) {
        console.error("Failed to fetch user profile", error);
        if (error.response.status === 401) {
          setIsAuthenticated(false);
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserProfile();
      setIsAuthenticated(true);
    } else {
      setLoading(false);
      setIsAuthenticated(false);
    }
  }, [isRefresh, isAuthenticated]);

  const login = (token) => {
    Cookies.set("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        isRequiredChangePassword,
        setIsRefresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
