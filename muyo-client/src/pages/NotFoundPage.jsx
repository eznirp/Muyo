import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 sm:px-6 lg:px-8 bg-zinc-50">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-zinc-900 mb-2">404</h1>
        
        <h2 className="text-xl font-semibold text-zinc-700 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-sm text-zinc-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="inline-flex items-center justify-center rounded-full border-2 border-zinc-900 bg-zinc-900 text-zinc-50 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] transition-colors hover:bg-zinc-700">
            Go Home
          </Link>
          <Button variant="secondary" to="/articles">
            View Articles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
