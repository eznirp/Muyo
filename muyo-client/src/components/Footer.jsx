import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t-2 border-zinc-900 bg-gradient-to-br from-white to-zinc-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-zinc-900 text-white flex items-center justify-center text-sm font-bold shadow-md">
              WS
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900">Wireframe Studio</p>
              <p className="text-xs text-zinc-500">Modern Layout Design</p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex items-center gap-1">
            <Link 
              to="/" 
              className="rounded-full px-4 py-2 text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-all"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="rounded-full px-4 py-2 text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-all"
            >
              About
            </Link>
            <Link 
              to="/articles" 
              className="rounded-full px-4 py-2 text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-all"
            >
              Articles
            </Link>
          </nav>
        </div>
        
        <div className="border-t border-zinc-200 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-zinc-500">
            © 2026 Wireframe Studio
          </p>
          <p className="text-xs text-zinc-400">
            Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
