import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-slate-900 text-sm font-bold text-white">
            MS
          </div>
          <div>
            <p className="text-sm font-bold text-slate-950">Muyo Studio</p>
            <p className="text-xs text-slate-500">Built with React and Tailwind CSS</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-1">
          <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900">
            Home
          </Link>
          <Link to="/about" className="rounded-md px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900">
            About
          </Link>
          <Link to="/articles" className="rounded-md px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900">
            Articles
          </Link>
        </nav>

        <p className="text-xs text-slate-500">&copy; 2026 Muyo Studio</p>
      </div>
    </footer>
  );
};

export default Footer;
