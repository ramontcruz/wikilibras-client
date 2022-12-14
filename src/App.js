import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/index.js";
import { Login } from "./pages/Login/index.js";
import { Signup } from "./pages/Signup/index.js";
import { AuthContextComponent } from "./contexts/authContext";
import { Profile } from "./pages/Profile/index.js";
import { ErrorPage } from "./pages/ErrorPage/index.js";

import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <AuthContextComponent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={<ProtectedRoute Component={Profile} />}
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContextComponent>
    </>
  );
}

export default App;
