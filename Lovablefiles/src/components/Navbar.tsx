
import { Button } from "@/components/ui/button";
import { Brain, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "@/lib/auth";
import { useState } from "react";

interface NavbarProps {
  transparent?: boolean;
}

const Navbar = ({ transparent = false }: NavbarProps) => {
  const navigate = useNavigate();
  const isAuthenticated = AuthService.isAuthenticated();
  const user = AuthService.getUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    AuthService.logout();
    navigate('/');
  };

  const navbarClass = transparent 
    ? "bg-transparent" 
    : "bg-white border-b border-gray-200";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navbarClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-gray-900">Mealmind AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  Profile
                </Link>
                <span className="text-sm text-gray-500">
                  Hi, {user?.name || user?.email}
                </span>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Button asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/profile" 
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="block px-3 py-2 text-base font-medium text-primary font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
