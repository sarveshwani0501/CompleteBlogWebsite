import React from "react";
import { NavLink } from "react-router-dom";
import { BookOpen, Heart, Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ];

  const socialLinks = [
    { name: "GitHub", href: "#", icon: Github },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "Email", href: "#", icon: Mail },
  ];

  return (
    <footer className="w-full bg-gray-50/95 dark:bg-white/95 border-gray-200/50 dark:border-slate-200/50 border-t mt-auto">
      <div className="w-full bg-gray-100 dark:bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Logo and Description */}
            <div className="flex flex-col space-y-2">
              <NavLink to="/" className="flex items-center space-x-2 group">
                <div className="p-1.5 rounded-lg transition-all duration-300 bg-blue-600 group-hover:bg-blue-700 dark:group-hover:bg-blue-500">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-800 dark:text-slate-900">
                  BlogSpace
                </span>
              </NavLink>
              <p className="text-sm text-gray-600 dark:text-slate-600 max-w-md">
                Share your thoughts, discover new ideas, and connect with fellow
                writers.
              </p>
            </div>

            {/* Footer Links */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {footerLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.href}
                    className="text-sm text-gray-600 dark:text-slate-600 hover:text-gray-900 dark:hover:text-slate-900 transition-colors duration-300"
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="p-2 rounded-lg text-gray-600 dark:text-slate-600 hover:text-gray-900 dark:hover:text-slate-900 hover:bg-gray-200 dark:hover:bg-slate-200 transition-all duration-300"
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <p className="text-sm text-gray-600 dark:text-slate-600 flex items-center">
                © {currentYear} BlogSpace. Made with
                <Heart className="h-4 w-4 text-red-500 mx-1" />
                for writers everywhere.
              </p>
              <p className="text-xs text-gray-500 dark:text-slate-500">
                Built with React & Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
