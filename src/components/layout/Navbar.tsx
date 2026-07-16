"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              NestFinder
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-dark hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/explore"
              className="text-dark hover:text-primary transition-colors"
            >
              Explore
            </Link>
            {user && (
              <>
                <Link
                  href="/items/add"
                  className="text-dark hover:text-primary transition-colors"
                >
                  List Property
                </Link>
                <Link
                  href="/items/manage"
                  className="text-dark hover:text-primary transition-colors"
                >
                  Manage
                </Link>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="text-secondary hover:text-secondary/80 transition-colors font-medium"
                  >
                    Admin Panel
                  </Link>
                )}
              </>
            )}
            <Link
              href="/about"
              className="text-dark hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-dark hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="text-dark hover:text-primary transition-colors"
            >
              Blog
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted">
                  Hello, {user.name}
                  {user.role === "admin" && (
                    <span className="ml-1.5 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                      Admin
                    </span>
                  )}
                </span>
                <button
                  onClick={logout}
                  className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-dark hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-dark p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              className="block text-dark hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/explore"
              className="block text-dark hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </Link>
            {user && (
              <>
                <Link
                  href="/items/add"
                  className="block text-dark hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  List Property
                </Link>
                <Link
                  href="/items/manage"
                  className="block text-dark hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Manage
                </Link>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="block text-secondary hover:text-secondary/80 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
              </>
            )}
            <Link
              href="/about"
              className="block text-dark hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-dark hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="block text-dark hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <hr className="border-border" />
            {user ? (
              <>
                <span className="block text-sm text-muted">
                  Hello, {user.name}
                  {user.role === "admin" && (
                    <span className="ml-1.5 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                      Admin
                    </span>
                  )}
                </span>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-red-500 hover:text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block text-dark hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block text-dark hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
