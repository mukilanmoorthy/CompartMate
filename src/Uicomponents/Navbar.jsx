import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Train } from "lucide-react";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Book Seats", path: "/booking" },
    { name: "My Bookings", path: "/my-bookings" },
  ];

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Train className="h-6 w-6 text-primary" />
            <span
              className="text-xl font-bold"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              CompartMate
            </span>
          </div>

          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === item.path
                    ? "text-primary-foreground bg-primary"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-foreground hover:text-primary"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
