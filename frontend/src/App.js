import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Recipe from "./pages/Recipe";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const { user } = useAuthContext();
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/admin" element={!user ? <></> : <Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
