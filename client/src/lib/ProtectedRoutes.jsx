import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/loaders/Loading";
import SideBar from "../Dashboard/Sidebar";
import Header from "../Dashboard/Header";
import { useState } from "react";

const ProtectedRoutes = ({
  isAuthenticated,
  isLoading,
  isRequiredChangePassword,
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [title, setTitle] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAuthenticated && isRequiredChangePassword) {
    return <Navigate to="/change-new-password" />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ display: "flex", flex: 1 }}>
        <div>
          <SideBar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            setTitle={setTitle}
          />
        </div>
        <div
          style={{ flex: 1, paddingBottom: "50px", overflowY: "auto" }}
          className="relative h-screen overflow-y-auto"
        >
          <Header
            toggleSidebar={toggleSidebar}
            isAuthenticated={isAuthenticated}
            title={title}
          />
          {children ? children : <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoutes;
