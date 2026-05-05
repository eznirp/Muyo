import Button from '../components/Button';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="group relative overflow-hidden rounded-3xl border-2 border-zinc-300 bg-zinc-100 p-6 transition-all hover:border-zinc-400 hover:shadow-lg">
            <div className="aspect-square overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-zinc-200 to-zinc-300">
              <div className="flex h-full items-center justify-center">
                <div className="relative">
                  <div className="h-32 w-32 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 shadow-xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white font-bold text-lg">WS</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-100/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              About Section
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Professional Wireframe Developer
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Passionate about creating beautiful, functional digital experiences with expertise in modern web design 
              and development. Specializing in responsive layouts, component architecture, and user experience design.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles">View Articles</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Professional Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Experience & achievements</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 transition-all hover:border-zinc-700 hover:shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-2xl font-bold text-zinc-900">05</p>
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Years Experience
            </p>
          </div>
          <div className="group rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 transition-all hover:border-zinc-700 hover:shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-2xl font-bold text-zinc-900">16</p>
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Projects Delivered
            </p>
          </div>
          <div className="group rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 transition-all hover:border-zinc-700 hover:shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-2xl font-bold text-zinc-900">09</p>
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Happy Clients
            </p>
          </div>
          <div className="group rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 transition-all hover:border-zinc-700 hover:shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-2xl font-bold text-zinc-900">03</p>
              <div className="h-2 w-2 rounded-full bg-orange-500"></div>
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Core Skills
            </p>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Expertise Areas
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Core competencies & services</h2>

            <div className="mt-6 space-y-4">
              <article className="group rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 transition-all hover:border-zinc-700 hover:shadow-lg">
                <h3 className="text-lg font-semibold text-zinc-900">UI/UX Design</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Creating intuitive, user-centered designs with focus on accessibility and modern design principles.
                </p>
              </article>

              <article className="group rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 transition-all hover:border-zinc-700 hover:shadow-lg">
                <h3 className="text-lg font-semibold text-zinc-900">Frontend Development</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Building responsive, performant applications using modern frameworks and best practices.
                </p>
              </article>

              <article className="group rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 transition-all hover:border-zinc-700 hover:shadow-lg">
                <h3 className="text-lg font-semibold text-zinc-900">Wireframing & Prototyping</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Developing structured layouts and interactive prototypes for efficient development workflows.
                </p>
              </article>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Project Gallery
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-blue-100 to-blue-200">
                <div className="h-12 w-12 rounded-full border-2 border-blue-300 bg-blue-100" />
              </div>
              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-green-100 to-green-200">
                <div className="h-12 w-12 rounded-full border-2 border-green-300 bg-green-100" />
              </div>
              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-purple-100 to-purple-200">
                <div className="h-12 w-12 rounded-full border-2 border-purple-300 bg-purple-100" />
              </div>
              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-orange-100 to-orange-200">
                <div className="h-12 w-12 rounded-full border-2 border-orange-300 bg-orange-100" />
              </div>
            </div>
            <Button className="mt-5">View Portfolio</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;