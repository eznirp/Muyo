import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import articles from '../../assets/article-content.js';
import defaultImg from '../../assets/rb.jpg';

function ArticlePage() {
  const { name } = useParams();
  const article = articles.find((item) => item.name === name);

  if (!article) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
          Missing Article
        </p>
        <h1 className="mt-4 text-4xl font-bold text-slate-950">Article not found</h1>
        <p className="mt-3 text-slate-600">The article you opened does not exist.</p>
        <Button to="/articles" className="mt-6">Back to Articles</Button>
      </div>
    );
  }

  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Button to="/articles" variant="secondary">Back to Articles</Button>

      <header className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
          Article
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          {article.name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </p>
      </header>

      <div className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <img src={article.image ?? defaultImg} alt={article.title} className="aspect-[16/10] w-full object-cover" />
      </div>

      <div className="mt-8 space-y-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        {article.content.map((paragraph, index) => (
          <p key={index} className="text-base leading-8 text-slate-700">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-8">
        <Button to="/articles" variant="secondary">Back to Articles</Button>
      </div>
    </article>
  );
}

export default ArticlePage;
