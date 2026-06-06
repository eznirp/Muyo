import baseArticles from '../assets/article-content.js';
import defaultImage from '../assets/rb.jpg';

const ARTICLES_KEY = 'muyo-dashboard-articles';

const hasStorage = () => typeof window !== 'undefined' && window.localStorage;

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const seedArticles = baseArticles.map((article, index) => ({
  id: `A${String(index + 1).padStart(4, '0')}`,
  name: article.name,
  title: article.title,
  image: article.image,
  content: article.content,
  status: 'Active',
}));

export const getDashboardArticles = () => {
  if (!hasStorage()) {
    return seedArticles;
  }

  const storedArticles = window.localStorage.getItem(ARTICLES_KEY);

  if (!storedArticles) {
    saveDashboardArticles(seedArticles);
    return seedArticles;
  }

  try {
    return JSON.parse(storedArticles);
  } catch {
    saveDashboardArticles(seedArticles);
    return seedArticles;
  }
};

export const saveDashboardArticles = (articles) => {
  if (hasStorage()) {
    window.localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
  }
};

export const getPublicArticles = () =>
  getDashboardArticles().filter((article) => article.status === 'Active');

export const createArticle = ({ title, name, content, status }) => {
  const cleanTitle = title.trim();
  const cleanName = slugify(name || cleanTitle);
  const paragraphs = content
    .split('\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return {
    id: `A${String(Date.now()).slice(-5)}`,
    name: cleanName,
    title: cleanTitle,
    image: defaultImage,
    content: paragraphs,
    status,
  };
};

export const validateArticle = (form, articles, editingId = null) => {
  const errors = {};
  const cleanName = slugify(form.name || form.title);

  if (!form.title.trim()) {
    errors.title = 'Title is required.';
  }

  if (!cleanName) {
    errors.name = 'Slug is required.';
  } else if (
    articles.some((article) => {
      const articleId = article._id || article.id;
      const checkId = editingId?._id || editingId;
      return articleId !== checkId && article.name === cleanName;
    })
  ) {
    errors.name = 'Slug is already used.';
  }

  if (!form.content.trim()) {
    errors.content = 'At least one paragraph is required.';
  }

  return errors;
};

export const toArticleForm = (article = null) => ({
  title: article?.title ?? '',
  name: article?.name ?? '',
  content: article?.content?.join('\n') ?? '',
  status: article?.status ?? 'Active',
});

export const articleSlug = slugify;
