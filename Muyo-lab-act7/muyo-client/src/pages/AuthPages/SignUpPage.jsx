import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import rbImage from '../../assets/rb.jpg';
import { defaultUserForm, genderOptions, setCurrentUser, validateUser } from '../../data/users';
import { authSignUp } from '../../services/api';

const inputClasses =
  'mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100';

const FieldError = ({ children }) => (
  children ? <p className="mt-1 text-xs font-semibold text-red-600">{children}</p> : null
);

const SignUpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    ...defaultUserForm,
    role: 'Editor',
    status: 'Active',
  });
  const [errors, setErrors] = useState({});

  const updateForm = (event) => {
    const { name, value } = event.target;
    let nextValue = value;

    if (name === 'username') {
      nextValue = value.replace(/\s/g, '');
    }

    if (name === 'contact' || name === 'age') {
      nextValue = value.replace(/\D/g, '');
    }

    setForm((current) => ({ ...current, [name]: nextValue }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    const validationErrors = validateUser(form, []);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const response = await authSignUp(form);
      
      localStorage.setItem('token', response.token);
      setCurrentUser(response.user);
      
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
      <div className="w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          <div className="hidden overflow-hidden lg:block">
            <img
              src={rbImage}
              alt="Interface preview"
              className="h-full min-h-[44rem] w-full object-cover"
            />
          </div>

          <div className="p-6 sm:p-10">
            <Link to="/" className="mb-8 inline-flex text-sm font-semibold text-teal-700 hover:text-teal-800">
              Back to website
            </Link>
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
                Create account
              </p>
              <h1 className="mt-3 text-3xl font-bold text-slate-950">Join quickly</h1>
            </div>

            <form className="grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
              {errors.submit && (
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 sm:col-span-2">
                  {errors.submit}
                </div>
              )}

              <div>
                <label htmlFor="signup-first-name" className="block text-sm font-semibold text-slate-700">
                  First Name
                </label>
                <input
                  id="signup-first-name"
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={updateForm}
                  className={inputClasses}
                />
                <FieldError>{errors.firstName}</FieldError>
              </div>

              <div>
                <label htmlFor="signup-last-name" className="block text-sm font-semibold text-slate-700">
                  Last Name
                </label>
                <input
                  id="signup-last-name"
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  autoComplete="family-name"
                  value={form.lastName}
                  onChange={updateForm}
                  className={inputClasses}
                />
                <FieldError>{errors.lastName}</FieldError>
              </div>

              <div>
                <label htmlFor="signup-username" className="block text-sm font-semibold text-slate-700">
                  Username
                </label>
                <input
                  id="signup-username"
                  name="username"
                  type="text"
                  placeholder="username"
                  autoComplete="username"
                  value={form.username}
                  onChange={updateForm}
                  className={inputClasses}
                />
                <FieldError>{errors.username}</FieldError>
              </div>

              <div>
                <label htmlFor="signup-email" className="block text-sm font-semibold text-slate-700">
                  Email
                </label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={updateForm}
                  className={inputClasses}
                />
                <FieldError>{errors.email}</FieldError>
              </div>

              <div>
                <label htmlFor="signup-password" className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <input
                  id="signup-password"
                  name="password"
                  type="password"
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={updateForm}
                  className={inputClasses}
                />
                <FieldError>{errors.password}</FieldError>
              </div>

              <div>
                <label htmlFor="signup-contact" className="block text-sm font-semibold text-slate-700">
                  Contact Number
                </label>
                <input
                  id="signup-contact"
                  name="contact"
                  type="text"
                  inputMode="numeric"
                  maxLength="11"
                  placeholder="09123456789"
                  value={form.contact}
                  onChange={updateForm}
                  className={inputClasses}
                />
                <FieldError>{errors.contact}</FieldError>
              </div>

              <div>
                <label htmlFor="signup-age" className="block text-sm font-semibold text-slate-700">
                  Age
                </label>
                <input
                  id="signup-age"
                  name="age"
                  type="text"
                  inputMode="numeric"
                  placeholder="Age"
                  value={form.age}
                  onChange={updateForm}
                  className={inputClasses}
                />
                <FieldError>{errors.age}</FieldError>
              </div>

              <div>
                <label htmlFor="signup-gender" className="block text-sm font-semibold text-slate-700">
                  Gender
                </label>
                <select
                  id="signup-gender"
                  name="gender"
                  value={form.gender}
                  onChange={updateForm}
                  className={inputClasses}
                >
                  {genderOptions.map((gender) => (
                    <option key={gender}>{gender}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <Button type="submit" variant="primary" className="w-full">
                  Create Account
                </Button>
              </div>
            </form>

            <div className="mt-6 text-sm text-slate-600">
              <Link to="/auth/signin" className="font-semibold text-slate-950 hover:text-teal-700">
                Already have an account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
