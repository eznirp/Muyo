import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-12 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
        404
      </p>
      <h1 className="mt-4 text-4xl font-bold text-slate-950">Page not found</h1>
      <p className="mt-3 text-base leading-7 text-slate-600">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button variant="primary" to="/">
          Go Home
        </Button>
        <Button variant="secondary" to="/articles">
          View Articles
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
