import Button from '../../components/Button';
import articles from '../../assets/article-content.js';
import heroImage from '../../assets/rb.jpg';
import featA from '../../assets/zxczx.jpg';
import featB from '../../assets/zx.jpg';
import featC from '../../assets/ytr.jpg';
import showcaseA from '../../assets/po.jpg';
import showcaseB from '../../assets/ti.jpg';

const featuredArticles = articles.slice(0, 3);
const featuredImages = [featA, featB, featC];

const stats = [
  ['18', 'UI sections'],
  ['5', 'Page templates'],
  ['50+', 'Design tips'],
  ['9/10', 'User satisfaction'],
];

const features = [
  {
    title: 'Responsive Design',
    copy: 'Flexible layouts keep content readable and balanced from phones to wide screens.',
    image: showcaseA,
  },
  {
    title: 'Component Library',
    copy: 'Reusable building blocks make the interface easier to maintain and extend.',
    image: showcaseB,
  },
  {
    title: 'Custom Styling',
    copy: 'A calm visual system gives the site a polished identity without getting noisy.',
    image: featC,
  },
];

const HomePage = () => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
            Design System
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Build modern, responsive layouts with ease.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
            Muyo Studio helps you create polished interfaces faster with reusable components, clean typography, and flexible page structures built for real projects.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/articles" variant="primary" className="w-full sm:w-auto">
              Explore Articles
            </Button>
            <Button to="/auth/signup" variant="secondary" className="w-full sm:w-auto">
              Get Started
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
          <img
            src={heroImage}
            alt="Modern interface layout preview"
            className="aspect-[16/11] h-full w-full object-cover"
          />
          <div className="border-t border-slate-200 p-5">
            <p className="text-sm font-semibold text-slate-950">Featured design system</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Responsive cards, scalable sections, and clean visual hierarchy.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
              Product metrics
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              Design system performance at a glance
            </h2>
          </div>
          <Button to="/about" variant="secondary" className="w-full sm:w-auto">
            Learn More
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-3xl font-bold text-slate-950">{value}</p>
              <p className="mt-2 text-sm font-medium text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Latest insights for modern interfaces
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {featuredArticles.map((article, idx) => (
            <article key={article.name} className="flex rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex w-full flex-col">
                <div className="overflow-hidden rounded-md bg-slate-100">
                  <img src={featuredImages[idx]} alt={article.title} className="aspect-[4/3] h-full w-full object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-950">{article.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                  {article.content[0]}
                </p>
                <Button to={`/articles/${article.name}`} variant="primary" className="mt-5 w-full">
                  Read Article
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
            Feature Showcase
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Reusable components made simple
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div className="overflow-hidden rounded-md bg-slate-100">
                <img src={feature.image} alt={feature.title} className="aspect-[4/3] h-full w-full object-cover" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-950">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{feature.copy}</p>
              <Button className="mt-5" variant="secondary">
                View More
              </Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
