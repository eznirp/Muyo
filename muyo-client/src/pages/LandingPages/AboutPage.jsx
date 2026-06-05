import Button from '../../components/Button';
import profileImage from '../../assets/sga.jpg';

const stats = [
  ['05', 'Years experience'],
  ['16', 'Projects delivered'],
  ['09', 'Happy clients'],
  ['03', 'Core skills'],
];

const services = [
  {
    title: 'UI/UX Design',
    copy: 'Creating intuitive, user-centered designs with a focus on accessibility and modern design principles.',
  },
  {
    title: 'Frontend Development',
    copy: 'Building responsive, performant applications using modern frameworks and practical component patterns.',
  },
  {
    title: 'Wireframing & Prototyping',
    copy: 'Developing structured layouts and interactive prototypes for smoother development workflows.',
  },
];

const AboutPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/70">
          <img
            src={profileImage}
            alt="Profile portrait"
            className="aspect-square w-full rounded-md object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
            About
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
            Professional wireframe developer
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
            Passionate about creating beautiful, functional digital experiences with expertise in modern web design and development. I specialize in responsive layouts, component architecture, and user experience design.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/" variant="primary" className="w-full sm:w-auto">
              Back Home
            </Button>
            <Button to="/articles" variant="secondary" className="w-full sm:w-auto">
              View Articles
            </Button>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
            Professional Overview
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">Experience and achievements</h2>
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

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
            Expertise Areas
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">Core competencies and services</h2>

          <div className="mt-6 space-y-4">
            {services.map((service) => (
              <article key={service.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold text-slate-950">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{service.copy}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
            Project Gallery
          </p>
          <h3 className="mt-2 text-xl font-bold text-slate-950">Recent layout studies</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {['Landing page', 'Dashboard', 'Article flow', 'Auth screen'].map((item, index) => (
              <div key={item} className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <div className="h-2 w-16 rounded-full bg-teal-600" />
                <div className="mt-6 h-2 w-full rounded-full bg-slate-200" />
                <div className="mt-2 h-2 w-2/3 rounded-full bg-slate-200" />
                <p className="mt-5 text-sm font-semibold text-slate-700">
                  {String(index + 1).padStart(2, '0')} {item}
                </p>
              </div>
            ))}
          </div>
          <Button className="mt-5" variant="secondary">
            View Portfolio
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
