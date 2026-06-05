const monthlyOutput = [
  { month: 'Jan', processed: 46, completed: 34 },
  { month: 'Feb', processed: 61, completed: 51 },
  { month: 'Mar', processed: 56, completed: 42 },
  { month: 'Apr', processed: 70, completed: 57 },
  { month: 'May', processed: 64, completed: 49 },
  { month: 'Jun', processed: 82, completed: 63 },
];

const categoryShare = [
  { label: 'Users', value: 42, color: '#2563eb' },
  { label: 'Articles', value: 24, color: '#14b8a6' },
  { label: 'Reports', value: 19, color: '#f59e0b' },
  { label: 'Reviews', value: 15, color: '#ef4444' },
];

const summaryCards = [
  { label: 'Total Records', value: '1,248' },
  { label: 'Completed', value: '876' },
  { label: 'Pending', value: '214' },
  { label: 'Inactive', value: '158' },
];

const pieStops = categoryShare
  .reduce(
    (stops, category) => {
      const start = stops.total;
      const end = start + category.value;

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

const ReportsPage = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="space-y-6 text-left">
      <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Reports</h1>
          <p className="mt-1 text-sm text-slate-500">Charts and data visualization</p>
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
            This printable report summarizes monthly output, completion volume, and category
            distribution for the current reporting period.
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
              <h3 className="text-base font-bold text-slate-950">Monthly Report Output</h3>
              <p className="mt-1 text-sm text-slate-500">
                This chart compares processed and completed reports by month.
              </p>
            </div>
            <div className="flex gap-4 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-blue-600" />
                Processed
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-amber-400" />
                Completed
              </span>
            </div>
          </div>

          <div className="mt-8 flex h-72 items-end gap-4 border-l border-b border-slate-300 px-4 pt-4">
            {monthlyOutput.map((item) => (
              <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-56 items-end gap-2">
                  <div
                    className="w-7 rounded-t-sm bg-blue-600"
                    style={{ height: `${item.processed * 2.3}px` }}
                    title={`Processed: ${item.processed}`}
                  />
                  <div
                    className="w-7 rounded-t-sm bg-amber-400"
                    style={{ height: `${item.completed * 2.3}px` }}
                    title={`Completed: ${item.completed}`}
                  />
                </div>
                <span className="text-xs font-bold text-slate-500">{item.month}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-md border border-slate-200 p-5">
          <h3 className="text-base font-bold text-slate-950">Report Category Share</h3>
          <p className="mt-1 text-sm text-slate-500">
            This chart shows the distribution of report requests by category.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-[16rem_1fr]">
            <div className="grid place-items-center">
              <div
                className="h-56 w-56 rounded-full"
                style={{ background: `conic-gradient(${pieStops})` }}
                aria-label="Report category share chart"
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
                  <span className="font-bold text-slate-950">{category.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </article>
    </section>
  );
};

export default ReportsPage;
