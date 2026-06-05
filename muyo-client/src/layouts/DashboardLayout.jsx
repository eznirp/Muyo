import { NavLink, Outlet } from 'react-router-dom';

const navigation = [
  { label: 'Dashboard', to: '/dashboard', icon: 'D' },
  { label: 'Reports', to: '/reports', icon: 'R' },
  { label: 'Users', to: '/users', icon: 'U' },
];

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="dashboard-header sticky top-0 z-30 border-b border-blue-700 bg-blue-600 text-white shadow-sm">
        <div className="flex min-h-14 items-center justify-between gap-4 px-4 sm:px-6">
          <NavLink to="/dashboard" className="text-sm font-bold sm:text-base">
            Dashboard
          </NavLink>
          <div className="flex items-center gap-3">
            <label className="sr-only" htmlFor="dashboard-search">
              Search
            </label>
            <input
              id="dashboard-search"
              type="search"
              placeholder="Search..."
              className="h-9 w-36 rounded-md border border-blue-400 bg-blue-500 px-3 text-sm text-white outline-none placeholder:text-blue-100 focus:border-white sm:w-56"
            />
            <NavLink
              to="/auth/signin"
              className="inline-flex h-9 items-center rounded-md border border-blue-300 px-3 text-xs font-bold uppercase tracking-wide transition hover:bg-blue-700"
            >
              Logout
            </NavLink>
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-3.5rem)] md:grid-cols-[13rem_1fr]">
        <aside className="dashboard-sidebar border-b border-slate-200 bg-white md:border-b-0 md:border-r">
          <nav className="flex gap-2 overflow-x-auto p-3 md:flex-col">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  [
                    'flex min-h-11 min-w-fit items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold transition',
                    isActive
                      ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-blue-700',
                  ].join(' ')
                }
              >
                <span className="grid h-7 w-7 place-items-center rounded-md bg-slate-200 text-xs font-bold text-slate-700">
                  {item.icon}
                </span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="dashboard-main min-w-0 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
