import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AuthContextComponent } from "./contexts/authContext";
import { Profile } from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";
import Biblioteca from "./pages/Biblioteca";
import PageSinal from "./pages/PageSinal";

import { ProtectedRoute } from "./components/ProtectedRoute";
import PageIncludeSinal from "./pages/PageIncludeSinal";

function App() {
  return (
    <>
      <AuthContextComponent>
        <div className="App">
          <Toaster />
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={<ProtectedRoute Component={Profile} />}
            />
            <Route path="/novotermo" element={<PageIncludeSinal />} />
            <Route path="/biblioteca" element={<Biblioteca />} />
            <Route path="/PageSinal/:id" element={<PageSinal />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </AuthContextComponent>
    </>
  );
}

export default App;
