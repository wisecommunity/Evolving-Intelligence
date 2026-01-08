import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, BrainCircuit } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: '首頁', path: '/' },
    { name: '核心哲學', path: '/philosophy' },
    { name: '度化學程', path: '/academy' },
    { name: '實戰專欄', path: '/review' },
    { name: '演化活動', path: '/events' },    
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-white/90 backdrop-blur-sm py-4 border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Area */}
          <NavLink to="/" className="flex items-center space-x-3 group">
            {!logoError ? (
              <img 
                src="https://drive.google.com/thumbnail?id=1NoLl1tjoWKmIDKy1fPbo_UhY6WWDkzQq&sz=w1000" 
                alt="EIC Logo" 
                className="h-10 w-auto md:h-12 object-contain transition-transform group-hover:scale-105" 
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="h-10 w-10 md:h-12 md:w-12 bg-brand-50 rounded-full flex items-center justify-center text-brand-600">
                <BrainCircuit size={24} />
              </div>
            )}
            <div className="flex flex-col items-start leading-none">
                <div className="relative">
                     <span className="font-bold text-xl md:text-3xl tracking-tighter text-brand-800 font-serif">度化智能</span>
                </div>
                 <span className="text-[0.55rem] md:text-[0.65rem] tracking-[0.2em] font-medium text-slate-500 group-hover:text-brand-600 transition-colors">EVOLVING INTELLIGENCE</span>
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 tracking-wide relative py-1 ${
                    isActive ? 'text-brand-700 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-600' : 'text-slate-600 hover:text-brand-600 hover:after:content-[""] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-brand-200'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-brand-700 focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute w-full bg-white/98 backdrop-blur-xl shadow-xl transition-all duration-300 ease-in-out border-t border-slate-100 ${isOpen ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4 overflow-hidden'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive ? 'bg-brand-50 text-brand-800 translate-x-1' : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};