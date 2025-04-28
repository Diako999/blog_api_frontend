import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul className="flex space-x-4 p-4 bg-blue-600 text-white">
        <li>
          <Link to="/" className="hover:text-yellow-300">Home</Link>
        </li>
        <li>
          <Link to="/create" className="hover:text-yellow-300">Create Post</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
