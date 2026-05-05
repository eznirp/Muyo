import Button from '../components/Button';
import articles from '../assets/article-content.js';

const ArticlesListPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Design & Development Articles
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Explore our comprehensive collection of articles covering wireframing techniques, responsive design, 
          component architecture, and modern development practices.
        </p>
        <div className="mt-6">
          <Button to="/" variant="primary">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            All Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Latest insights & tutorials</h2>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article key={article.name} className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 transition-all hover:border-zinc-700 hover:shadow-lg">
              <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                <div className="h-12 w-12 rounded-full border-2 border-zinc-300 bg-zinc-100" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-zinc-900">{article.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600 line-clamp-3">
                {article.content[0]}
              </p>
              <Button to={`/articles/${article.name}`} className="mt-4" variant="primary">Read More</Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticlesListPage;
