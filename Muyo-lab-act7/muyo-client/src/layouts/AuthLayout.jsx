import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen px-4 py-8 text-slate-800 sm:px-6 lg:px-8">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
