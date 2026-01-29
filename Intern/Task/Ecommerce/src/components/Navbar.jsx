import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Package, CreditCard, Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCartItemsCount } from '../redux/cartSlice';
import { useState } from 'react';

const Navbar = () => {
  const cartCount = useSelector(selectCartItemsCount);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Products', icon: Package },
    { path: '/cart', label: 'Cart', icon: ShoppingCart },
    { path: '/checkout', label: 'Checkout', icon: CreditCard },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <ShoppingCart className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-amber-600">
              ShopHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`relative px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isActive(path)
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-amber-50'
                }`}
              >
                <Icon size={20} />
                {label}
                {path === '/cart' && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  isActive(path)
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-amber-50'
                }`}
              >
                <Icon size={20} />
                {label}
                {path === '/cart' && cartCount > 0 && (
                  <span className="ml-auto w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
