import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { getArticles } from '../../services/api';

const ArticlesListPage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
          Articles
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
          Design and development articles
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
          Explore articles covering wireframing techniques, responsive design, component architecture, and modern development practices.
        </p>
        <div className="mt-8">
          <Button to="/" variant="primary">Back Home</Button>
        </div>
      </section>

      <section>
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
            All Articles
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">Latest insights and tutorials</h2>
        </div>

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="rounded-md border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-500">
            Loading articles from MongoDB...
          </div>
        )}

        {!isLoading && !error && articles.length === 0 && (
          <div className="rounded-md border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-500">
            No active articles yet.
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article key={article._id || article.name} className="flex rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex w-full flex-col">
                {article.image && (
                  <div className="overflow-hidden rounded-md bg-slate-100">
                    <img src={article.image} alt={article.title} className="aspect-[4/3] h-full w-full object-cover" />
                  </div>
                )}
                <h3 className="mt-4 text-lg font-bold text-slate-950">{article.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                  {article.content?.[0]}
                </p>
                <Button to={`/articles/${article.name}`} className="mt-5" variant="primary">
                  Read More
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticlesListPage;
