import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import rbImage from '../../assets/rb.jpg';

const inputClasses =
  'mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100';

const SignInPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center justify-center">
      <div className="w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
        <div className="grid lg:grid-cols-[1fr_0.95fr]">
          <div className="hidden overflow-hidden lg:block">
            <img
              src={rbImage}
              alt="Interface preview"
              className="h-full min-h-[34rem] w-full object-cover"
            />
          </div>

          <div className="p-6 sm:p-10">
            <Link to="/" className="mb-8 inline-flex text-sm font-semibold text-teal-700 hover:text-teal-800">
              Back to website
            </Link>
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
                Welcome back
              </p>
              <h1 className="mt-3 text-3xl font-bold text-slate-950">Sign in to continue</h1>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="signin-email" className="block text-sm font-semibold text-slate-700">
                  Email
                </label>
                <input
                  id="signin-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="signin-password" className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <input
                  id="signin-password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  className={inputClasses}
                />
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Log In
              </Button>
            </form>

            <div className="mt-6 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
              <Link to="/auth/signup" className="font-semibold text-slate-950 hover:text-teal-700">
                Create account
              </Link>
              <button type="button" className="w-fit font-semibold text-slate-600 hover:text-teal-700">
                Forgot password?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
