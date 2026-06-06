const USERS_KEY = 'muyo-users';
const CURRENT_USER_KEY = 'muyo-current-user';

export const roleOptions = ['Admin', 'Editor', 'Viewer'];
export const genderOptions = ['Female', 'Male'];
export const statusOptions = ['Active', 'Inactive'];

export const defaultUserForm = {
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

const defaultUsers = [
  {
    id: 1,
    firstName: 'Prinze',
    lastName: 'Admin',
    username: 'prinzeadmin',
    email: 'prinze@gmail.com',
    password: 'AdminPass123',
    contact: '09123456789',
    age: 28,
    gender: 'Male',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 2,
    firstName: 'Marco',
    lastName: 'Santos',
    username: 'marcosantos',
    email: 'marco@example.com',
    password: 'password123',
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
    password: 'password123',
    contact: '09345678901',
    age: 24,
    gender: 'Female',
    role: 'Editor',
    status: 'Active',
  },
  {
    id: 4,
    firstName: 'Nathan',
    lastName: 'Diaz',
    username: 'nathandiaz',
    email: 'nathan@example.com',
    password: 'password123',
    contact: '09456789012',
    age: 36,
    gender: 'Male',
    role: 'Viewer',
    status: 'Inactive',
  },
  {
    id: 5,
    firstName: 'Jasmine',
    lastName: 'Garcia',
    username: 'jasminegarcia',
    email: 'jasmine@example.com',
    password: 'password123',
    contact: '09567890123',
    age: 30,
    gender: 'Female',
    role: 'Editor',
    status: 'Inactive',
  },
];

const hasStorage = () => typeof window !== 'undefined' && window.localStorage;

const normalizeUser = (user, index) => ({
  ...defaultUserForm,
  password: 'password123',
  ...user,
  id: user.id ?? index + 1,
  age: Number(user.age) || '',
});

const migrateAdminUser = (users) =>
  users.map((user) =>
    user.role === 'Admin' && (user.email === 'alice@example.com' || user.id === 1)
      ? {
          ...user,
          firstName: 'Prinze',
          lastName: 'Admin',
          username: 'prinzeadmin',
          email: 'prinze@gmail.com',
          password: 'AdminPass123',
          gender: 'Male',
          role: 'Admin',
          status: 'Active',
        }
      : user,
  );

export const getUsers = () => {
  if (!hasStorage()) {
    return defaultUsers;
  }

  const storedUsers = window.localStorage.getItem(USERS_KEY);

  if (!storedUsers) {
    saveUsers(defaultUsers);
    return defaultUsers;
  }

  try {
    const users = migrateAdminUser(JSON.parse(storedUsers).map(normalizeUser));

    saveUsers(users);
    return users;
  } catch {
    saveUsers(defaultUsers);
    return defaultUsers;
  }
};

export const saveUsers = (users) => {
  if (hasStorage()) {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
};

export const getCurrentUser = () => {
  if (!hasStorage()) {
    return null;
  }

  const storedUser = window.localStorage.getItem(CURRENT_USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

export const setCurrentUser = (user) => {
  if (!hasStorage()) {
    return;
  }

  const safeUser = { ...user };

  delete safeUser.password;
  window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
};

export const clearCurrentUser = () => {
  if (hasStorage()) {
    window.localStorage.removeItem(CURRENT_USER_KEY);
  }
};

export const validateUser = (form, users = [], editingId = null) => {
  const errors = {};
  const normalizedEmail = form.email.trim().toLowerCase();
  const normalizedUsername = form.username.trim().toLowerCase();

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
  } else if (
    users.some(
      (user) => user.id !== editingId && user.username.toLowerCase() === normalizedUsername,
    )
  ) {
    errors.username = 'Username is already taken.';
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required.';
  } else if (
    users.some((user) => user.id !== editingId && user.email.toLowerCase() === normalizedEmail)
  ) {
    errors.email = 'Email is already registered.';
  }

  if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  if (!/^\d{11}$/.test(form.contact)) {
    errors.contact = 'Contact number must be 11 digits.';
  }

  if (!/^\d+$/.test(String(form.age))) {
    errors.age = 'Age must be a number only.';
  }

  return errors;
};

export const addUser = (form) => {
  const users = getUsers();
  const newUser = {
    ...form,
    id: users.length ? Math.max(...users.map((user) => user.id)) + 1 : 1,
    age: Number(form.age),
    email: form.email.trim(),
    username: form.username.trim(),
  };
  const nextUsers = [...users, newUser];

  saveUsers(nextUsers);
  return { user: newUser, users: nextUsers };
};

export const signInUser = ({ email, password }) => {
  const user = getUsers().find(
    (item) => item.email.toLowerCase() === email.trim().toLowerCase(),
  );

  if (!user || user.password !== password) {
    return { error: 'Invalid email or password.' };
  }

  if (user.status !== 'Active') {
    return { error: 'Inactive accounts cannot log in.' };
  }

  if (user.role === 'Viewer') {
    return { error: 'Viewers cannot log in.' };
  }

  setCurrentUser(user);
  return { user };
};
