import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">BearHub</Link>
      <div className="spacer"></div>
      <Link to="/create-post" className="nav-link">Create Post</Link>
    </nav>
  );
};

export default Navbar;
