import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const baseLink =
  'rounded-md px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-teal-700';

const navLinkClassName = ({ isActive }) =>
  [
    baseLink,
    isActive ? 'bg-white text-teal-700 shadow-sm ring-1 ring-slate-200' : '',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <NavLink to="/" className="flex w-fit items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-teal-700 text-sm font-bold text-white shadow-sm">
            MS
          </span>
          <span>
            <span className="block text-sm font-bold text-slate-950">Muyo Studio</span>
            <span className="block text-xs text-slate-500">Modern layout design</span>
          </span>
        </NavLink>

        <nav className="flex flex-wrap items-center gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/auth/signin" className={navLinkClassName}>
            Sign In
          </NavLink>
          <NavLink
            to="/auth/signup"
            className={({ isActive }) =>
              [
                'rounded-md border px-3 py-2 text-sm font-semibold transition',
                isActive
                  ? 'border-teal-700 bg-teal-700 text-white'
                  : 'border-teal-700 bg-teal-700 text-white hover:bg-teal-800',
              ].join(' ')
            }
          >
            Sign Up
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
