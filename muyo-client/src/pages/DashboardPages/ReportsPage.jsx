const reports = [
  { label: 'Visitors', value: 1240, color: 'bg-blue-500', width: '84%' },
  { label: 'Downloads', value: 860, color: 'bg-emerald-500', width: '58%' },
  { label: 'Shares', value: 410, color: 'bg-amber-400', width: '36%' },
  { label: 'Comments', value: 295, color: 'bg-rose-500', width: '25%' },
];

const ReportsPage = () => {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-950">Reports</h1>
        <p className="mt-1 text-sm text-slate-500">Charts and data visualization</p>
      </div>

      <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-bold text-slate-950">Monthly Engagement</h2>
        <div className="mt-6 space-y-5">
          {reports.map((report) => (
            <div key={report.label}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-700">{report.label}</span>
                <span className="font-bold text-slate-950">{report.value.toLocaleString()}</span>
              </div>
              <div className="h-4 overflow-hidden rounded-md bg-slate-100">
                <div className={`h-full ${report.color}`} style={{ width: report.width }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default ReportsPage;
