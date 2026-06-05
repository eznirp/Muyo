import { useMemo, useState } from 'react';

const initialUsers = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Reyes',
    username: 'alicereyes',
    email: 'alice@example.com',
    contact: '09123456789',
    age: 28,
    gender: 'Female',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 2,
    firstName: 'Marco',
    lastName: 'Santos',
    username: 'marcosantos',
    email: 'marco@example.com',
    contact: '09234567890',
    age: 32,
    gender: 'Male',
    role: 'Viewer',
    status: 'Active',
  },
  {
    id: 3,
    firstName: 'Bianca',
    lastName: 'Cruz',
    username: 'biancacruz',
    email: 'bianca@example.com',
    contact: '09345678901',
    age: 24,
    gender: 'Female',
    role: 'Editor',
    status: 'Inactive',
  },
  {
    id: 4,
    firstName: 'Nathan',
    lastName: 'Diaz',
    username: 'nathandiaz',
    email: 'nathan@example.com',
    contact: '09456789012',
    age: 36,
    gender: 'Male',
    role: 'Viewer',
    status: 'Active',
  },
  {
    id: 5,
    firstName: 'Jasmine',
    lastName: 'Garcia',
    username: 'jasminegarcia',
    email: 'jasmine@example.com',
    contact: '09567890123',
    age: 30,
    gender: 'Female',
    role: 'Editor',
    status: 'Inactive',
  },
];

const emptyForm = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  contact: '',
  age: '',
  gender: 'Female',
  role: 'Viewer',
  status: 'Active',
};

const roleOptions = ['Admin', 'Editor', 'Viewer'];
const genderOptions = ['Female', 'Male'];
const statusOptions = ['Active', 'Inactive'];

const validateUser = (form) => {
  const errors = {};

  if (!form.firstName.trim()) {
    errors.firstName = 'First name is required.';
  }

  if (!form.lastName.trim()) {
    errors.lastName = 'Last name is required.';
  }

  if (!form.username.trim()) {
    errors.username = 'Username is required.';
  } else if (/\s/.test(form.username)) {
    errors.username = 'Username must not contain spaces.';
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required.';
  }

  if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  if (!/^\d{11}$/.test(form.contact)) {
    errors.contact = 'Contact number must be 11 digits.';
  }

  if (!/^\d+$/.test(form.age)) {
    errors.age = 'Age must be a number only.';
  }

  return errors;
};

const FieldError = ({ children }) => (
  children ? <p className="mt-1 text-xs font-semibold text-red-600">{children}</p> : null
);

const UsersPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    role: 'All',
    gender: 'All',
    status: 'All',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch = [
        user.firstName,
        user.lastName,
        user.email,
        user.username,
      ].some((value) => value.toLowerCase().includes(normalizedSearch));

      const matchesRole = filters.role === 'All' || user.role === filters.role;
      const matchesGender = filters.gender === 'All' || user.gender === filters.gender;
      const matchesStatus = filters.status === 'All' || user.status === filters.status;

      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [filters, searchTerm, users]);

  const updateFilter = (name, value) => {
    setFilters((current) => ({ ...current, [name]: value }));
  };

  const updateForm = (event) => {
    const { name, value } = event.target;
    const nextValue = name === 'username' ? value.replace(/\s/g, '') : value;

    setForm((current) => ({ ...current, [name]: nextValue }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const openForm = () => {
    setForm(emptyForm);
    setErrors({});
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setErrors({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateUser(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setUsers((current) => [
      ...current,
      {
        ...form,
        id: current.length ? Math.max(...current.map((user) => user.id)) + 1 : 1,
        age: Number(form.age),
      },
    ]);

    closeForm();
  };

  const toggleStatus = (id) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === id
          ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
          : user,
      ),
    );
  };

  return (
    <section className="space-y-6 text-left">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Users</h1>
          <p className="mt-1 text-sm text-slate-500">Search, filter, and manage accounts</p>
        </div>
        <button
          type="button"
          onClick={openForm}
          className="inline-flex h-10 items-center rounded-md bg-blue-600 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add User
        </button>
      </div>

      <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[1fr_repeat(3,12rem)]">
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500" htmlFor="user-search">
              Search
            </label>
            <input
              id="user-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="First name, last name, email, or username"
              className="mt-1 h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500" htmlFor="role-filter">
              Role
            </label>
            <select
              id="role-filter"
              value={filters.role}
              onChange={(event) => updateFilter('role', event.target.value)}
              className="mt-1 h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option>All</option>
              {roleOptions.map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500" htmlFor="gender-filter">
              Gender
            </label>
            <select
              id="gender-filter"
              value={filters.gender}
              onChange={(event) => updateFilter('gender', event.target.value)}
              className="mt-1 h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option>All</option>
              {genderOptions.map((gender) => (
                <option key={gender}>{gender}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500" htmlFor="status-filter">
              Status
            </label>
            <select
              id="status-filter"
              value={filters.status}
              onChange={(event) => updateFilter('status', event.target.value)}
              className="mt-1 h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option>All</option>
              {statusOptions.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-bold text-slate-950">User Accounts</h2>
          <span className="text-sm font-semibold text-slate-500">
            Showing {filteredUsers.length} of {users.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[62rem] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Full Name</th>
                <th className="px-5 py-3">Username</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Age</th>
                <th className="px-5 py-3">Gender</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">{user.id}</td>
                  <td className="px-5 py-4 font-semibold text-slate-950">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-5 py-4 text-slate-600">{user.username}</td>
                  <td className="px-5 py-4 text-slate-600">{user.email}</td>
                  <td className="px-5 py-4">{user.age}</td>
                  <td className="px-5 py-4">{user.gender}</td>
                  <td className="px-5 py-4">{user.role}</td>
                  <td className="px-5 py-4">
                    <span
                      className={[
                        'rounded-md px-2 py-1 text-xs font-bold',
                        user.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-600',
                      ].join(' ')}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => toggleStatus(user.id)}
                      className={[
                        'rounded-md px-3 py-1.5 text-xs font-bold text-white transition',
                        user.status === 'Active'
                          ? 'bg-amber-500 hover:bg-amber-600'
                          : 'bg-emerald-600 hover:bg-emerald-700',
                      ].join(' ')}
                    >
                      {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td className="px-5 py-8 text-center text-sm font-semibold text-slate-500" colSpan="9">
                    No users match the current search and filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-3xl rounded-md bg-white p-5 text-left shadow-xl"
            noValidate
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-950">Add User</h2>
                <p className="mt-1 text-sm text-slate-500">Create a new account with validation.</p>
              </div>
              <button
                type="button"
                onClick={closeForm}
                className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
              >
                Close
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-bold text-slate-700" htmlFor="firstName">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={updateForm}
                  className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <FieldError>{errors.firstName}</FieldError>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={updateForm}
                  className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <FieldError>{errors.lastName}</FieldError>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={updateForm}
                  className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <FieldError>{errors.username}</FieldError>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateForm}
                  className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <FieldError>{errors.email}</FieldError>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={updateForm}
                  className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <FieldError>{errors.password}</FieldError>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700" htmlFor="contact">
                  Contact Number
                </label>
                <input
                  id="contact"
                  name="contact"
                  inputMode="numeric"
                  maxLength="11"
                  value={form.contact}
                  onChange={updateForm}
                  className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <FieldError>{errors.contact}</FieldError>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700" htmlFor="age">
                  Age
                </label>
                <input
                  id="age"
                  name="age"
                  inputMode="numeric"
                  value={form.age}
                  onChange={updateForm}
                  className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <FieldError>{errors.age}</FieldError>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700" htmlFor="gender">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={form.gender}
                  onChange={updateForm}
                  className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {genderOptions.map((gender) => (
                    <option key={gender}>{gender}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700" htmlFor="role">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={updateForm}
                  className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {roleOptions.map((role) => (
                    <option key={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700" htmlFor="status">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={updateForm}
                  className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {statusOptions.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Save User
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default UsersPage;
