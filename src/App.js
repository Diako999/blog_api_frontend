import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import Navbar from "./components/Navbar";
import Register from './pages/Register';
import Login from './pages/Login';
import EditPost from './pages/EditPost'
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/create" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit/:id" element={<PrivateRoute><EditPost /></PrivateRoute>} />

      </Routes>
    </Router>
  );
}

export default App;
