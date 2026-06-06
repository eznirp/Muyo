import { useEffect, useMemo, useState } from 'react';
import {
  getActivityReports,
  getArticleStats,
  getDashboardStats,
  getUserStats,
} from '../../services/api';

const colors = ['#2563eb', '#14b8a6', '#f59e0b', '#ef4444'];

const countFrom = (items = [], key) => items.find((item) => item._id === key)?.count || 0;

const ReportsPage = () => {
  const [overview, setOverview] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [articleStats, setArticleStats] = useState(null);
  const [activity, setActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReports = async () => {
      try {
        const [overviewData, userStatsData, articleStatsData, activityData] = await Promise.all([
          getDashboardStats(),
          getUserStats(),
          getArticleStats(),
          getActivityReports(),
        ]);

        setOverview(overviewData);
        setUserStats(userStatsData);
        setArticleStats(articleStatsData);
        setActivity(activityData);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadReports();
  }, []);

  const categoryShare = useMemo(() => {
    if (!overview) {
      return [];
    }

    return [
      { label: 'Active Users', value: overview.activeUsers, color: colors[0] },
      { label: 'Inactive Users', value: countFrom(userStats?.byStatus, 'Inactive'), color: colors[1] },
      { label: 'Active Articles', value: overview.activeArticles, color: colors[2] },
      { label: 'Inactive Articles', value: countFrom(articleStats?.byStatus, 'Inactive'), color: colors[3] },
    ];
  }, [articleStats, overview, userStats]);

  const totalCategory = categoryShare.reduce((total, item) => total + item.value, 0);
  const pieStops = categoryShare
    .reduce(
      (stops, category) => {
        const percent = totalCategory ? (category.value / totalCategory) * 100 : 0;
        const start = stops.total;
        const end = start + percent;

        return {
          total: end,
          segments: [
            ...stops.segments,
            `${category.color} ${start}% ${end}%`,
          ],
        };
      },
      { total: 0, segments: [] },
    )
    .segments.join(', ');

  const maxMonthly = Math.max(
    1,
    ...(activity?.monthlyActivity || []).map((item) => Math.max(item.usersCreated, item.articlesCreated)),
  );

  const summaryCards = overview && activity
    ? [
        { label: 'Total Users', value: overview.totalUsers },
        { label: 'Total Articles', value: overview.totalArticles },
        { label: 'New Users 30d', value: activity.newUsers },
        { label: 'New Articles 30d', value: activity.newArticles },
      ]
    : [];

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <section className="space-y-6 text-left">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Reports</h1>
          <p className="mt-1 text-sm text-slate-500">Loading MongoDB report data...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-6 text-left">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Reports</h1>
          <p className="mt-1 text-sm text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6 text-left">
      <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Reports</h1>
          <p className="mt-1 text-sm text-slate-500">Live MongoDB charts and report summary</p>
        </div>
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex h-10 items-center rounded-md bg-blue-600 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Print PDF
        </button>
      </div>

      <article className="print-report rounded-md border border-slate-200 bg-white p-5 shadow-sm print:border-0 print:p-0 print:shadow-none">
        <header className="border-b border-slate-200 pb-5">
          <p className="text-xs font-bold uppercase tracking-wide text-blue-600">Muyo Admin</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">Reports Summary</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            This printable report summarizes current users, articles, activity, and article views
            using live database records.
          </p>
          <p className="mt-2 text-xs font-semibold text-slate-400">
            Last updated: {new Date(activity.lastUpdated).toLocaleString()}
          </p>
        </header>

        <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <div key={card.label} className="rounded-md border border-slate-200 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {card.label}
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-950">{card.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-md border border-slate-200 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-950">Six Month Creation Activity</h3>
              <p className="mt-1 text-sm text-slate-500">
                This chart compares newly created users and articles by month.
              </p>
            </div>
            <div className="flex gap-4 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-blue-600" />
                Users
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-amber-400" />
                Articles
              </span>
            </div>
          </div>

          <div className="mt-8 flex h-72 items-end gap-4 border-l border-b border-slate-300 px-4 pt-4">
            {activity.monthlyActivity.map((item) => (
              <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-56 items-end gap-2">
                  <div
                    className="w-7 rounded-t-sm bg-blue-600"
                    style={{ height: `${(item.usersCreated / maxMonthly) * 210}px` }}
                    title={`Users: ${item.usersCreated}`}
                  />
                  <div
                    className="w-7 rounded-t-sm bg-amber-400"
                    style={{ height: `${(item.articlesCreated / maxMonthly) * 210}px` }}
                    title={`Articles: ${item.articlesCreated}`}
                  />
                </div>
                <span className="text-xs font-bold text-slate-500">{item.month}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-md border border-slate-200 p-5">
          <h3 className="text-base font-bold text-slate-950">Record Status Share</h3>
          <p className="mt-1 text-sm text-slate-500">
            This chart shows the current active and inactive distribution across users and articles.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-[16rem_1fr]">
            <div className="grid place-items-center">
              <div
                className="h-56 w-56 rounded-full bg-slate-100"
                style={{ background: totalCategory ? `conic-gradient(${pieStops})` : undefined }}
                aria-label="Record status share chart"
              />
            </div>
            <div className="grid content-center gap-3">
              {categoryShare.map((category) => (
                <div
                  key={category.label}
                  className="flex items-center justify-between rounded-md bg-slate-50 px-4 py-3 text-sm"
                >
                  <span className="flex items-center gap-3 font-semibold text-slate-700">
                    <span
                      className="h-3 w-3 rounded-sm"
                      style={{ backgroundColor: category.color }}
                    />
                    {category.label}
                  </span>
                  <span className="font-bold text-slate-950">{category.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-slate-200 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Article Views</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">{activity.totalArticleViews}</p>
          </div>
          <div className="rounded-md border border-slate-200 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Admins</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">{countFrom(userStats.byRole, 'Admin')}</p>
          </div>
          <div className="rounded-md border border-slate-200 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Editors</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">{countFrom(userStats.byRole, 'Editor')}</p>
          </div>
        </section>
      </article>
    </section>
  );
};

export default ReportsPage;
