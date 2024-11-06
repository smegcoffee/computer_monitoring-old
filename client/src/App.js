import "./styles/Tailwind.css";
import LogIn from "./Request/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Forgot from "./Request/Forgot";
import SignUp from "./Request/Signup";
import DashBoard from "./Dashboard/Dashboard";
import Unit from "./Dashboard/Setup/Unit";
import Set from "./Dashboard/Setup/Set";
import Profile from "./Dashboard/Profile";
import Computers from "./Dashboard/Computers";
import QrC from "./Dashboard/Qrcodes";
import Extract from "./Dashboard/Extract";
import ProtectedRoutes from "./context/ProtectedRoutes";
import AuthContext from "./context/AuthContext";
import Reset from "./Request/Reset";
import ChangePassword from "./context/ChangePassword";
import User from "./Dashboard/Setup/User";
import Add from "./Dashboard/Setup/Add";
import TransferedUnits from "./Dashboard/transferedUnits";
import NotFound from "./Dashboard/Notfound";
import PrintInformation from "./Dashboard/PopupForComputers/Print";
import AllLogs from "./Dashboard/AllLogs";
import AllUnits from "./Dashboard/allUnits";
import Users from "./Dashboard/Setup/Users";
import { AdminProvider } from "./context/AdminContext";

function App() {
  return (
    <AdminProvider>
      <Router basename="/monitoring">
        <Routes>
          <Route element={<AuthContext />}>
            <Route path="/login" element={<LogIn />}></Route>
            <Route path="/" element={<LogIn />}></Route>
            <Route path="/forgot" element={<Forgot />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
          </Route>

          <Route element={<ChangePassword />}>
            <Route path="/change-new-password" element={<Reset />}></Route>
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<DashBoard />}></Route>
            <Route path="/unit" element={<Unit />}></Route>
            <Route path="/set" element={<Set />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/computers" element={<Computers />}></Route>
            <Route path="/qr" element={<QrC />}></Route>
            <Route
              path="/transfered-units"
              element={<TransferedUnits />}
            ></Route>
            <Route path="/all-units" element={<AllUnits />}></Route>
            <Route path="/computers/:id" element={<Extract />} />
            <Route path="/user" element={<User />} />
            <Route path="/all-logs" element={<AllLogs />} />
            <Route path="/add" element={<Add />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/print/:id" element={<PrintInformation />} />
            <Route path="/admin/users-list" element={<Users />} />
          </Route>
        </Routes>
      </Router>
    </AdminProvider>
  );
}

export default App;
