import { Link } from 'react-router-dom';
import '../assets/Navbar.css';
export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/" className='signin-button'>🏠</Link>
      <Link to="/about" className="signin-button">About Me</Link>
      <Link to="/portfolio" className='signin-button'>Portfolio</Link>
    </div>
  );
}
