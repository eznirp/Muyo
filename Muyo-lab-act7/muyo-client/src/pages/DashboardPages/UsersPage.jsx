import { useEffect, useMemo, useState } from 'react';
import {
  defaultUserForm,
  genderOptions,
  getCurrentUser,
  roleOptions,
  statusOptions,
  validateUser,
} from '../../data/users';
import {
  createUser,
  deleteUser,
  getUsers as getDatabaseUsers,
  updateUser,
} from '../../services/api';

const FieldError = ({ children }) => (
  children ? <p className="mt-1 text-xs font-semibold text-red-600">{children}</p> : null
);

const normalizeUser = (user) => ({
  ...user,
  id: user.id || user._id,
});

const UsersPage = () => {
  const currentUser = getCurrentUser();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    role: 'All',
    gender: 'All',
    status: 'All',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(defaultUserForm);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadUsers = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const data = await getDatabaseUsers();
      setUsers(data.map(normalizeUser));
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.role === 'Admin') {
      loadUsers();
    }
  }, [currentUser?.role]);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch = [
        user.firstName,
        user.lastName,
        user.email,
        user.username,
      ].some((value = '') => value.toLowerCase().includes(normalizedSearch));

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
    let nextValue = value;

    if (name === 'username') {
      nextValue = value.replace(/\s/g, '');
    }

    if (name === 'contact' || name === 'age') {
      nextValue = value.replace(/\D/g, '');
    }

    setForm((current) => ({ ...current, [name]: nextValue }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setMessage('');
  };

  const openForm = () => {
    setForm(defaultUserForm);
    setErrors({});
    setMessage('');
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateUser(form, users);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSaving(true);
    setMessage('');

    try {
      await createUser({
        ...form,
        age: Number(form.age),
        email: form.email.trim(),
        username: form.username.trim(),
      });
      await loadUsers();
      closeForm();
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  const toggleStatus = async (user) => {
    const nextStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    setMessage('');

    try {
      const response = await updateUser(user.id, { status: nextStatus });
      setUsers((current) =>
        current.map((item) =>
          item.id === user.id ? normalizeUser(response.user) : item,
        ),
      );
    } catch (error) {
      setMessage(error.message);
    }
  };

  const removeUser = async (user) => {
    if (user.id === currentUser.id) {
      setMessage('You cannot delete the account you are currently using.');
      return;
    }

    if (!window.confirm(`Delete ${user.firstName} ${user.lastName}?`)) {
      return;
    }

    setMessage('');

    try {
      await deleteUser(user.id);
      setUsers((current) => current.filter((item) => item.id !== user.id));
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (currentUser?.role !== 'Admin') {
    return (
      <section className="space-y-6 text-left">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Users</h1>
          <p className="mt-1 text-sm text-slate-500">Access restricted</p>
        </div>
        <div className="rounded-md border border-amber-200 bg-amber-50 p-5 text-sm font-semibold text-amber-800">
          Editors cannot access the Users page. Please sign in with an admin account.
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6 text-left">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Users</h1>
          <p className="mt-1 text-sm text-slate-500">Search, filter, and manage MongoDB accounts</p>
        </div>
        <button
          type="button"
          onClick={openForm}
          className="inline-flex h-10 items-center rounded-md bg-blue-600 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add User
        </button>
      </div>

      {message && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {message}
        </div>
      )}

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
          <h2 className="text-base font-bold text-slate-950">Database User Accounts</h2>
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
              {isLoading && (
                <tr>
                  <td className="px-5 py-8 text-center text-sm font-semibold text-slate-500" colSpan="9">
                    Loading users from MongoDB...
                  </td>
                </tr>
              )}

              {!isLoading && filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-mono text-xs text-slate-500">{user.id}</td>
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
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => toggleStatus(user)}
                        className={[
                          'rounded-md px-3 py-1.5 text-xs font-bold text-white transition',
                          user.status === 'Active'
                            ? 'bg-amber-500 hover:bg-amber-600'
                            : 'bg-emerald-600 hover:bg-emerald-700',
                        ].join(' ')}
                      >
                        {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeUser(user)}
                        className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!isLoading && filteredUsers.length === 0 && (
                <tr>
                  <td className="px-5 py-8 text-center text-sm font-semibold text-slate-500" colSpan="9">
                    No database users match the current search and filters.
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
                <p className="mt-1 text-sm text-slate-500">Create a new MongoDB account.</p>
              </div>
              <button
                type="button"
                onClick={closeForm}
                className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
              >
                Close
              </button>
            </div>

            {errors.submit && (
              <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {errors.submit}
              </div>
            )}

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
                disabled={isSaving}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                {isSaving ? 'Saving...' : 'Save User'}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default UsersPage;
