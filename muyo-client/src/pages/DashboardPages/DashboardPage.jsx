const users = [
  { id: 1, firstName: 'John', lastName: 'Snow', age: 34 },
  { id: 2, firstName: 'Cersei', lastName: 'Lannister', age: 31 },
  { id: 3, firstName: 'Jaime', lastName: 'Lannister', age: 31 },
  { id: 4, firstName: 'Arya', lastName: 'Stark', age: 11 },
  { id: 5, firstName: 'Daenerys', lastName: 'Targaryen', age: 28 },
];

const barGroups = [
  { label: 'Q1', series1: 38, series2: 48 },
  { label: 'Q2', series1: 42, series2: 9 },
  { label: 'Q3', series1: 30, series2: 49 },
  { label: 'Q4', series1: 37, series2: 35 },
];

const DashboardPage = () => {
  const averageAge = users.reduce((total, user) => total + user.age, 0) / users.length;

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-950">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Overview and summary</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Total Users</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{users.length}</p>
        </article>
        <article className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Average Age</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{averageAge.toFixed(1)}</p>
        </article>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-bold text-slate-950">Quarterly Activity</h2>
            <div className="flex gap-4 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-indigo-500" />
                Series 1
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-amber-400" />
                Series 2
              </span>
            </div>
          </div>
          <div className="flex h-64 items-end gap-5 border-l border-b border-slate-300 px-5 pt-4">
            {barGroups.map((group) => (
              <div key={group.label} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-52 items-end gap-2">
                  <div
                    className="w-8 rounded-t-sm bg-indigo-500"
                    style={{ height: `${group.series1 * 3}px` }}
                    title={`Series 1: ${group.series1}`}
                  />
                  <div
                    className="w-8 rounded-t-sm bg-amber-400"
                    style={{ height: `${group.series2 * 3}px` }}
                    title={`Series 2: ${group.series2}`}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-500">{group.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold text-slate-950">User Split</h2>
          <div className="mt-6 grid place-items-center">
            <div
              className="h-48 w-48 rounded-full"
              style={{
                background:
                  'conic-gradient(#ef4444 0 45%, #fbbf24 45% 70%, #4f46e5 70% 100%)',
              }}
            />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs font-semibold">
            <span className="rounded-md bg-red-50 px-2 py-2 text-red-600">45%</span>
            <span className="rounded-md bg-amber-50 px-2 py-2 text-amber-600">25%</span>
            <span className="rounded-md bg-indigo-50 px-2 py-2 text-indigo-600">30%</span>
          </div>
        </section>
      </div>

      <section className="rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-bold text-slate-950">Users Overview</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[42rem] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3">
                  <input type="checkbox" aria-label="Select all users" />
                </th>
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">First Name</th>
                <th className="px-5 py-3">Last Name</th>
                <th className="px-5 py-3">Age</th>
                <th className="px-5 py-3">Full Name</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <input type="checkbox" aria-label={`Select ${user.firstName}`} />
                  </td>
                  <td className="px-5 py-3">{user.id}</td>
                  <td className="px-5 py-3">{user.firstName}</td>
                  <td className="px-5 py-3">{user.lastName}</td>
                  <td className="px-5 py-3">{user.age}</td>
                  <td className="px-5 py-3 font-semibold text-slate-700">
                    {user.firstName} {user.lastName}
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

export default DashboardPage;
