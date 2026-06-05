const users = [
  { id: 1, name: 'John Snow', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Cersei Lannister', email: 'cersei@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Jaime Lannister', email: 'jaime@example.com', role: 'Viewer', status: 'Pending' },
  { id: 4, name: 'Arya Stark', email: 'arya@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Daenerys Targaryen', email: 'daenerys@example.com', role: 'Admin', status: 'Inactive' },
];

const UsersPage = () => {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-950">Users</h1>
        <p className="mt-1 text-sm text-slate-500">User list and account details</p>
      </div>

      <section className="rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[44rem] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">{user.id}</td>
                  <td className="px-5 py-4 font-semibold text-slate-950">{user.name}</td>
                  <td className="px-5 py-4 text-slate-600">{user.email}</td>
                  <td className="px-5 py-4">{user.role}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700">
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
};

export default UsersPage;
