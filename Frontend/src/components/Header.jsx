import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BookOpen, Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: "Blogs", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 transition-all duration-300 bg-gray-50/95 dark:bg-white/95 border-gray-200/50 dark:border-slate-200/50 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center space-x-2 group cursor-pointer"
          >
            <div className="p-2 rounded-lg transition-all duration-300 bg-blue-600 group-hover:bg-blue-700 dark:group-hover:bg-blue-500">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold transition-colors duration-300 text-gray-800 dark:text-slate-900">
              BlogSpace
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-blue-700 dark:text-blue-600 bg-blue-100 dark:bg-blue-50"
                        : "text-gray-700 dark:text-slate-600 hover:text-gray-900 dark:hover:text-slate-900 hover:bg-gray-200 dark:hover:bg-slate-100"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg transition-all duration-300 bg-gray-200 dark:bg-slate-100 hover:bg-gray-300 dark:hover:bg-slate-200 text-gray-700 dark:text-slate-600"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-60 opacity-100 pb-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="pt-2 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "text-blue-700 dark:text-blue-600 bg-blue-100 dark:bg-blue-50"
                      : "text-gray-700 dark:text-slate-600 hover:text-gray-900 dark:hover:text-slate-900 hover:bg-gray-200 dark:hover:bg-slate-100"
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
