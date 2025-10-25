import express from 'express';
import { articles } from '../data/articles.js';

const router = express.Router();

// GET all articles
router.get('/', (req, res) => {
  const { category, limit = 10, page = 1 } = req.query;
  
  let filteredArticles = [...articles];
  
  // Filter by category
  if (category) {
    filteredArticles = filteredArticles.filter(
      article => article.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);
  
  res.json({
    total: filteredArticles.length,
    page: parseInt(page),
    limit: parseInt(limit),
    data: paginatedArticles
  });
});

// GET single article by ID
router.get('/:id', (req, res) => {
  const article = articles.find(a => a.id === req.params.id);
  
  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }
  
  res.json(article);
});

// GET categories
router.get('/meta/categories', (req, res) => {
  const categories = [...new Set(articles.map(a => a.category))];
  res.json(categories);
});

export default router;
