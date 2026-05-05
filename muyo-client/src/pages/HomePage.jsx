import Button from '../components/Button';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Hero Section
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Welcome to Wireframe Studio Layout
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Discover the art of wireframing with our comprehensive layout system designed for modern web applications. 
              Create stunning hero sections, dynamic KPI blocks, and beautiful feature cards that captivate your audience.
            </p>
            <div className="mt-6">
              <Button to="/about" variant="primary">
                Learn More
              </Button>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border-2 border-zinc-300 bg-zinc-100 p-6 transition-all hover:border-zinc-400 hover:shadow-lg">
            <div className="aspect-video overflow-hidden rounded-[1.25rem] bg-zinc-200">
              <div className="flex h-full items-center justify-center">
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-16 w-16 rounded-xl bg-zinc-300"></div>
                  <div className="h-16 w-16 rounded-xl bg-zinc-300"></div>
                  <div className="h-16 w-16 rounded-xl bg-zinc-300"></div>
                  <div className="h-16 w-16 rounded-xl bg-zinc-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Key Performance Indicators
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Real-time project metrics</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">12</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Projects Completed
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">08</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Core Sections
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">24</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Screen Designs
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">04</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Layout Templates
            </p>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Feature Showcase
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Powerful wireframe components</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <div className="h-12 w-12 rounded-full border-2 border-zinc-300 bg-zinc-100" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">Responsive Design</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Create layouts that adapt seamlessly across all devices and screen sizes with our flexible grid system.
            </p>
            <Button className="mt-4" variant="primary">View More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <div className="h-12 w-12 rounded-full border-2 border-zinc-300 bg-zinc-100" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">Component Library</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Access a comprehensive collection of reusable components built with best practices and modern design principles.
            </p>
            <Button className="mt-4" variant="primary">View More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <div className="h-12 w-12 rounded-full border-2 border-zinc-300 bg-zinc-100" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">Custom Styling</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Implement beautiful, consistent designs with our extensive styling system and theme customization options.
            </p>
            <Button className="mt-4" variant="primary">View More</Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default HomePage;