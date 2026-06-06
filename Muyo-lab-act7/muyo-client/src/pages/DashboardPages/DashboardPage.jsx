import { useEffect, useMemo, useState } from 'react';
import {
  getArticleStats,
  getDashboardStats,
  getUserStats,
  getUsers,
} from '../../services/api';

const toCountMap = (items = []) =>
  items.reduce((map, item) => ({ ...map, [item._id || 'Unknown']: item.count }), {});

const StatCard = ({ label, value }) => (
  <article className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
    <p className="text-sm font-semibold text-slate-500">{label}</p>
    <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
  </article>
);

const DashboardPage = () => {
  const [overview, setOverview] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [articleStats, setArticleStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [overviewData, userStatsData, articleStatsData, usersData] = await Promise.all([
          getDashboardStats(),
          getUserStats(),
          getArticleStats(),
          getUsers(),
        ]);

        setOverview(overviewData);
        setUserStats(userStatsData);
        setArticleStats(articleStatsData);
        setUsers(usersData);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const roleCounts = useMemo(() => toCountMap(userStats?.byRole), [userStats]);
  const genderCounts = useMemo(() => toCountMap(userStats?.byGender), [userStats]);
  const articleStatusCounts = useMemo(() => toCountMap(articleStats?.byStatus), [articleStats]);
  const recentUsers = users.slice(-5).reverse();
  const maxRoleCount = Math.max(1, ...Object.values(roleCounts));
  const maxArticleStatusCount = Math.max(1, ...Object.values(articleStatusCounts));

  if (isLoading) {
    return (
      <section className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Loading MongoDB dashboard data...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Dashboard</h1>
          <p className="mt-1 text-sm text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-950">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Live admin overview from MongoDB</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Total Users" value={overview.totalUsers} />
        <StatCard label="Active Users" value={overview.activeUsers} />
        <StatCard label="Total Articles" value={overview.totalArticles} />
        <StatCard label="Active Articles" value={overview.activeArticles} />
        <StatCard label="Article Views" value={overview.totalViews} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold text-slate-950">Users By Role</h2>
          <div className="mt-5 space-y-4">
            {['Admin', 'Editor', 'Viewer'].map((role) => {
              const count = roleCounts[role] || 0;

              return (
                <div key={role}>
                  <div className="mb-1 flex justify-between text-sm font-semibold text-slate-600">
                    <span>{role}</span>
                    <span>{count}</span>
                  </div>
                  <div className="h-3 rounded-sm bg-slate-100">
                    <div
                      className="h-3 rounded-sm bg-blue-600"
                      style={{ width: `${(count / maxRoleCount) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold text-slate-950">Articles By Status</h2>
          <div className="mt-5 space-y-4">
            {['Active', 'Inactive'].map((status) => {
              const count = articleStatusCounts[status] || 0;

              return (
                <div key={status}>
                  <div className="mb-1 flex justify-between text-sm font-semibold text-slate-600">
                    <span>{status}</span>
                    <span>{count}</span>
                  </div>
                  <div className="h-3 rounded-sm bg-slate-100">
                    <div
                      className={status === 'Active' ? 'h-3 rounded-sm bg-emerald-600' : 'h-3 rounded-sm bg-amber-500'}
                      style={{ width: `${(count / maxArticleStatusCount) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold text-slate-950">Users By Gender</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {['Female', 'Male'].map((gender) => (
              <div key={gender} className="rounded-md border border-slate-200 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{gender}</p>
                <p className="mt-2 text-2xl font-bold text-slate-950">{genderCounts[gender] || 0}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold text-slate-950">Top Articles</h2>
          <div className="mt-4 space-y-3">
            {(articleStats?.topArticles || []).map((article) => (
              <div key={article._id} className="flex items-center justify-between gap-4 rounded-md bg-slate-50 px-4 py-3 text-sm">
                <span className="font-semibold text-slate-700">{article.title}</span>
                <span className="font-bold text-slate-950">{article.views} views</span>
              </div>
            ))}
            {articleStats?.topArticles?.length === 0 && (
              <p className="text-sm font-semibold text-slate-500">No articles yet.</p>
            )}
          </div>
        </section>
      </div>

      <section className="rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-bold text-slate-950">Recent Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[48rem] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Username</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentUsers.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50">
                  <td className="px-5 py-3 font-semibold text-slate-700">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-5 py-3">{user.username}</td>
                  <td className="px-5 py-3">{user.email}</td>
                  <td className="px-5 py-3">{user.role}</td>
                  <td className="px-5 py-3">{user.status}</td>
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
