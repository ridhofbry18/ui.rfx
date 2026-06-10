import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="bg-white/5 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
      <div className="flex justify-between items-center px-4 md:px-16 py-4 max-w-[1280px] mx-auto">
        <Link to="/" className="font-bold text-2xl md:text-3xl text-primary tracking-tighter">RFX UI</Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/marketplace" className={`border-b-2 pb-1 font-label text-[12px] tracking-[0.05em] hover:text-primary hover:border-white/20 transition-all duration-200 uppercase ${location.pathname.includes('/marketplace') ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent'}`}>Marketplace</Link>
          <Link to="/directory" className={`border-b-2 pb-1 font-label text-[12px] tracking-[0.05em] hover:text-primary hover:border-white/20 transition-all duration-200 uppercase ${location.pathname.includes('/directory') ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent'}`}>Directory</Link>
          <Link to="/directory" className="text-on-surface-variant border-b-2 border-transparent pb-1 font-label text-[12px] tracking-[0.05em] hover:text-primary hover:border-white/20 transition-all duration-200 uppercase">Catalog</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/admin/login" className="bg-primary text-on-primary font-label text-[12px] tracking-[0.05em] px-4 py-2 rounded duration-200 hover:opacity-90 hidden md:inline-block uppercase font-medium">Dashboard</Link>
          <button 
            className="md:hidden text-on-surface-variant hover:text-primary transition-colors ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[100%] left-0 w-full glass-panel border-b border-white/10 p-4 flex flex-col gap-4 shadow-xl">
          <Link to="/marketplace" className="text-primary font-label text-[12px] tracking-[0.05em] uppercase px-4 py-3 hover:bg-white/5 rounded-md transition-colors">Marketplace</Link>
          <Link to="/directory" className="text-primary font-label text-[12px] tracking-[0.05em] uppercase px-4 py-3 hover:bg-white/5 rounded-md transition-colors">Directory</Link>
          <Link to="/admin/login" className="text-primary font-label text-[12px] tracking-[0.05em] uppercase px-4 py-3 hover:bg-white/5 rounded-md transition-colors border-t border-white/10 mt-2">Admin Dashboard</Link>
        </div>
      )}
    </nav>
  );
}
