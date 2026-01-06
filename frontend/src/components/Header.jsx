import React, { useState } from 'react';
import {Link}from 'react-router-dom'
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* 1. Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-blue-600">MYLOGO</span>
          </div>

          {/* 2. Desktop Menu (Wuxuu ka soo muuqdaa shaashadda weyn) */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to={'/'} className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
            <Link to={'/register'} className="text-gray-700 hover:text-blue-600 font-medium">Register</Link>
            <Link to={'/login'} className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
          </div>

          {/* 3. Mobile Button (Wuxuu ka soo muuqdaa talefannada) */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="outline-none">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu (Kaliya marka la gujiyo Hamburger icon-ka) */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200">
          <Link to={'/'} className="block py-3 px-4 text-md hover:bg-gray-100">Home</Link>
          <Link to={'/register'} className="block py-3 px-4 text-md hover:bg-gray-100">Register</Link>
          <Link to={'/login'} className="block py-3 px-4 text-md hover:bg-gray-100">Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Header;