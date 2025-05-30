import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Activity className="h-8 w-8 text-blue-600" />
              </motion.div>
              <span className="ml-2 text-xl font-semibold text-gray-900">Identity Core</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink to="/" isActive={isActive('/')}>
                Home
              </NavLink>
              <NavLink to="/identity" isActive={isActive('/identity')}>
                Identity Tool
              </NavLink>
              <NavLink to="/admin" isActive={isActive('/admin')}>
                Admin
              </NavLink>
            </div>
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="sm:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="pt-2 pb-3 space-y-1">
              <MobileNavLink to="/" isActive={isActive('/')} onClick={toggleMobileMenu}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/identity" isActive={isActive('/identity')} onClick={toggleMobileMenu}>
                Identity Tool
              </MobileNavLink>
              <MobileNavLink to="/admin" isActive={isActive('/admin')} onClick={toggleMobileMenu}>
                Admin
              </MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLink = ({ to, isActive, children }) => (
  <Link
    to={to}
    className={`${
      isActive
        ? 'border-blue-500 text-blue-600'
        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, isActive, onClick, children }) => (
  <Link
    to={to}
    className={`${
      isActive
        ? 'bg-blue-50 border-blue-500 text-blue-700'
        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700'
    } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;