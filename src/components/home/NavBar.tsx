'use client'

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-sm py-4 sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-tech-purple to-tech-indigo flex items-center justify-center">
              <span className="font-bold text-white text-sm">IP</span>
            </div>
            <span className="font-bold text-xl text-tech-gray">InterviewPrep</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-tech-gray hover:text-tech-purple transition-colors">Home</Link>
            <Link href="/#features" className="text-tech-gray hover:text-tech-purple transition-colors">Features</Link>
            <Link href="/#testimonials" className="text-tech-gray hover:text-tech-purple transition-colors">Testimonials</Link>
            <Link href="/dash" className="text-tech-gray hover:text-tech-purple transition-colors">Dashboard</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-tech-purple text-tech-purple hover:bg-tech-purple/10">
              Sign In
            </Button>
            <Button className="bg-tech-purple hover:bg-tech-purple/90">Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-tech-gray"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-4 md:hidden bg-white rounded-lg shadow-lg p-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-tech-gray hover:text-tech-purple transition-colors px-4 py-2 rounded-md hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/#features" 
                className="text-tech-gray hover:text-tech-purple transition-colors px-4 py-2 rounded-md hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="/#testimonials" 
                className="text-tech-gray hover:text-tech-purple transition-colors px-4 py-2 rounded-md hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link 
                href="/dash" 
                className="text-tech-gray hover:text-tech-purple transition-colors px-4 py-2 rounded-md hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <div className="flex flex-col space-y-2 pt-2 border-t">
                <Button variant="outline" className="border-tech-purple text-tech-purple hover:bg-tech-purple/10 w-full">
                  Sign In
                </Button>
                <Button className="bg-tech-purple hover:bg-tech-purple/90 w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
