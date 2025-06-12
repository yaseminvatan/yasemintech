import { Link } from 'react-router-dom';
import '../assets/Navbar.css';
export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/" className='signin-button'>🏠</Link>
      <Link to="/signin" className="signin-button">Sign In</Link>
    </div>
  );
}
