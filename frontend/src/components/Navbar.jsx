
import { Link} from 'react-router-dom';
import { Link2 } from 'lucide-react';

function Navbar({ isAuthenticated }) {
 

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center">
        <Link to="/" className="logo">
          <Link2 size={28} color="var(--primary)" />
          Shorty
        </Link>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="btn btn-outline">Dashboard</Link>
              <button onClick={handleLogout} className="btn btn-outline" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
