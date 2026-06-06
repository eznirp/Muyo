import { useEffect, useMemo, useState } from 'react';
import {
  articleSlug,
  toArticleForm,
  validateArticle,
} from '../../data/articles';
import {
  createArticle,
  deleteArticle,
  getDashboardArticles,
  updateArticle,
} from '../../services/api';

const statusOptions = ['Active', 'Inactive'];

const FieldError = ({ children }) => (
  children ? <p className="mt-1 text-xs font-semibold text-red-600">{children}</p> : null
);

const normalizeArticle = (article) => ({
  ...article,
  id: article._id || article.id,
  _id: article._id,
  content: Array.isArray(article.content) ? article.content : [article.content].filter(Boolean),
});

const toPayload = (form) => ({
  name: articleSlug(form.name || form.title),
  title: form.title.trim(),
  content: form.content
    .split('\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean),
  status: form.status,
});

const DashArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [form, setForm] = useState(() => toArticleForm());
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadArticles = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const data = await getDashboardArticles();
      setArticles(data.map(normalizeArticle));
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return articles.filter((article) => {
      const preview = article.content[0] ?? '';
      const matchesSearch = [article.id, article.name, article.title, preview].some((value = '') =>
        value.toLowerCase().includes(normalizedSearch),
      );
      const matchesStatus = statusFilter === 'All' || article.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [articles, searchTerm, statusFilter]);

  const openAddForm = () => {
    setEditingArticle(null);
    setForm(toArticleForm());
    setErrors({});
    setMessage('');
    setIsFormOpen(true);
  };

  const openEditForm = (article) => {
    setEditingArticle(article);
    setForm(toArticleForm(article));
    setErrors({});
    setMessage('');
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingArticle(null);
    setErrors({});
  };

  const updateForm = (event) => {
    const { name, value } = event.target;
    const nextValue = name === 'name' ? articleSlug(value) : value;

    setForm((current) => ({ ...current, [name]: nextValue }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateArticle(form, articles, editingArticle);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSaving(true);
    setMessage('');

    try {
      if (editingArticle) {
        const response = await updateArticle(editingArticle._id || editingArticle.id, toPayload(form));
        setArticles((current) =>
          current.map((article) =>
            (article._id || article.id) === (editingArticle._id || editingArticle.id) ? normalizeArticle(response.article) : article,
          ),
        );
      } else {
        const response = await createArticle(toPayload(form));
        setArticles((current) => [normalizeArticle(response.article), ...current]);
      }

      closeForm();
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  const toggleStatus = async (article) => {
    const nextStatus = article.status === 'Active' ? 'Inactive' : 'Active';
    setMessage('');

    try {
      const response = await updateArticle(article._id || article.id, { status: nextStatus });
      setArticles((current) =>
        current.map((item) =>
          (item._id || item.id) === (article._id || article.id) ? normalizeArticle(response.article) : item,
        ),
      );
    } catch (error) {
      setMessage(error.message);
    }
  };

  const removeArticle = async (article) => {
    if (!window.confirm(`Delete ${article.title}?`)) {
      return;
    }

    setMessage('');

    try {
      await deleteArticle(article._id || article.id);
      setArticles((current) => current.filter((item) => (item._id || item.id) !== (article._id || article.id)));
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section className="space-y-6 text-left">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Articles</h1>
          <p className="mt-1 text-sm text-slate-500">Search, filter, and manage MongoDB articles</p>
        </div>
        <button
          type="button"
          onClick={openAddForm}
          className="inline-flex h-10 items-center rounded-md bg-blue-600 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Article
        </button>
      </div>

      {message && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {message}
        </div>
      )}

      <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1fr_13rem]">
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500" htmlFor="article-search">
              Search
            </label>
            <input
              id="article-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search articles"
              className="mt-1 h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500" htmlFor="article-status-filter">
              Status Filter
            </label>
            <select
              id="article-status-filter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="mt-1 h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option>All</option>
              {statusOptions.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-bold text-slate-950">Database Article Records</h2>
          <span className="text-sm font-semibold text-slate-500">
            Showing {filteredArticles.length} of {articles.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[66rem] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Slug</th>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Paragraphs</th>
                <th className="px-5 py-3">Preview</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading && (
                <tr>
                  <td className="px-5 py-8 text-center text-sm font-semibold text-slate-500" colSpan="7">
                    Loading articles from MongoDB...
                  </td>
                </tr>
              )}

              {!isLoading && filteredArticles.map((article) => (
                <tr key={article._id || article.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-mono text-xs text-slate-500">{article._id || article.id}</td>
                  <td className="px-5 py-4 text-slate-600">{article.name}</td>
                  <td className="px-5 py-4 font-semibold text-slate-950">{article.title}</td>
                  <td className="px-5 py-4">{article.content.length}</td>
                  <td className="max-w-sm truncate px-5 py-4 text-slate-600">
                    {article.content[0]}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={[
                        'rounded-md px-2 py-1 text-xs font-bold',
                        article.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-600',
                      ].join(' ')}
                    >
                      {article.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEditForm(article)}
                        className="rounded-md border border-blue-200 px-3 py-1.5 text-xs font-bold text-blue-700 transition hover:bg-blue-50"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleStatus(article)}
                        className={[
                          'rounded-md px-3 py-1.5 text-xs font-bold text-white transition',
                          article.status === 'Active'
                            ? 'bg-amber-500 hover:bg-amber-600'
                            : 'bg-emerald-600 hover:bg-emerald-700',
                        ].join(' ')}
                      >
                        {article.status === 'Active' ? 'Disable' : 'Enable'}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeArticle(article)}
                        className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!isLoading && filteredArticles.length === 0 && (
                <tr>
                  <td className="px-5 py-8 text-center text-sm font-semibold text-slate-500" colSpan="7">
                    No database articles match the current search and filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl rounded-md bg-white p-5 text-left shadow-xl"
            noValidate
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  {editingArticle ? 'Edit Article' : 'Add Article'}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Active articles appear on the public Articles page.
                </p>
              </div>
              <button
                type="button"
                onClick={closeForm}
                className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
              >
                Close
              </button>
            </div>

            {errors.submit && (
              <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {errors.submit}
              </div>
            )}

            <div className="grid gap-4">
              <div>
                <label className="text-sm font-bold text-slate-700" htmlFor="article-title">
                  Title
                </label>
                <input
                  id="article-title"
                  name="title"
                  value={form.title}
                  onChange={updateForm}
                  className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <FieldError>{errors.title}</FieldError>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700" htmlFor="article-name">
                  Slug
                </label>
                <input
                  id="article-name"
                  name="name"
                  value={form.name}
                  onChange={updateForm}
                  className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <FieldError>{errors.name}</FieldError>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700" htmlFor="article-content">
                  Paragraphs
                </label>
                <textarea
                  id="article-content"
                  name="content"
                  rows="7"
                  value={form.content}
                  onChange={updateForm}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <FieldError>{errors.content}</FieldError>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700" htmlFor="article-status">
                  Status
                </label>
                <select
                  id="article-status"
                  name="status"
                  value={form.status}
                  onChange={updateForm}
                  className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {statusOptions.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                {isSaving ? 'Saving...' : editingArticle ? 'Save Changes' : 'Save Article'}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default DashArticleListPage;
