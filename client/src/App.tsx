import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Outlet,
} from "react-router-dom";
import { Login } from "./views/Login.tsx";
import { Signup } from "./views/Signup.tsx";
import { Dashboard } from "./views/Dashboard.tsx";
import { NotFound } from "./views/NotFound.tsx";
import Journal from "./views/Journal.tsx";
import { NavBar } from "./components/nav/NavBar.tsx";

const Layout: React.FC = () => {
  const location = useLocation();
  const hideNavBar =
    location.pathname === "/" || location.pathname === "/signup";

  return (
    <>
      {!hideNavBar && <NavBar />}
      <Outlet />
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
