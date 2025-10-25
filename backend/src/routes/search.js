import express from 'express';
import { articles } from '../data/articles.js';
import { getAllFetchedArticles } from '../services/rss-cron.js';

const router = express.Router();

// Simple search function
function searchArticles(query, filters = {}) {
  const allArticles = [...articles, ...getAllFetchedArticles()];
  const lowerQuery = query.toLowerCase();
  
  let results = allArticles.filter(article => {
    // Search in title, content, summary, tags
    const searchableText = [
      article.title,
      article.content || '',
      article.summary || '',
      ...(article.tags || [])
    ].join(' ').toLowerCase();
    
    return searchableText.includes(lowerQuery);
  });
  
  // Apply filters
  if (filters.category) {
    results = results.filter(a => 
      a.category?.toLowerCase() === filters.category.toLowerCase()
    );
  }
  
  if (filters.author) {
    results = results.filter(a => 
      a.author?.toLowerCase().includes(filters.author.toLowerCase())
    );
  }
  
  if (filters.dateFrom) {
    results = results.filter(a => 
      new Date(a.date) >= new Date(filters.dateFrom)
    );
  }
  
  if (filters.dateTo) {
    results = results.filter(a => 
      new Date(a.date) <= new Date(filters.dateTo)
    );
  }
  
  // Score results based on relevance
  results = results.map(article => {
    let score = 0;
    
    // Title match is more important
    if (article.title.toLowerCase().includes(lowerQuery)) {
      score += 10;
    }
    
    // Exact match in title
    if (article.title.toLowerCase() === lowerQuery) {
      score += 20;
    }
    
    // Content match
    if (article.content?.toLowerCase().includes(lowerQuery)) {
      score += 5;
    }
    
    // Tags match
    if (article.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) {
      score += 7;
    }
    
    return { ...article, searchScore: score };
  });
  
  // Sort by score
  results.sort((a, b) => b.searchScore - a.searchScore);
  
  return results;
}

// GET search
router.get('/', (req, res) => {
  const { 
    q, 
    category, 
    author, 
    dateFrom, 
    dateTo,
    limit = 20,
    page = 1 
  } = req.query;
  
  if (!q || q.trim().length < 2) {
    return res.status(400).json({ 
      error: 'Search query must be at least 2 characters' 
    });
  }
  
  const filters = { category, author, dateFrom, dateTo };
  const results = searchArticles(q, filters);
  
  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedResults = results.slice(startIndex, endIndex);
  
  res.json({
    query: q,
    filters,
    total: results.length,
    page: parseInt(page),
    limit: parseInt(limit),
    results: paginatedResults.map(({ searchScore, ...article }) => ({
      ...article,
      relevance: searchScore
    }))
  });
});

// GET search suggestions (autocomplete)
router.get('/suggest', (req, res) => {
  const { q, limit = 5 } = req.query;
  
  if (!q || q.trim().length < 2) {
    return res.json({ suggestions: [] });
  }
  
  const allArticles = [...articles, ...getAllFetchedArticles()];
  const lowerQuery = q.toLowerCase();
  
  // Get unique titles that match
  const suggestions = allArticles
    .filter(article => article.title.toLowerCase().includes(lowerQuery))
    .map(article => article.title)
    .slice(0, parseInt(limit));
  
  res.json({ 
    query: q,
    suggestions: [...new Set(suggestions)]
  });
});

// GET popular searches (mock data for now)
router.get('/popular', (req, res) => {
  const popularSearches = [
    { query: 'yapay zeka', count: 150 },
    { query: 'GPT-4', count: 120 },
    { query: 'robot', count: 95 },
    { query: 'teknoloji', count: 80 },
    { query: 'AI', count: 75 }
  ];
  
  res.json({ popular: popularSearches });
});

// GET search analytics
router.get('/analytics', (req, res) => {
  const allArticles = [...articles, ...getAllFetchedArticles()];
  
  // Category distribution
  const categories = {};
  allArticles.forEach(article => {
    const cat = article.category || 'Uncategorized';
    categories[cat] = (categories[cat] || 0) + 1;
  });
  
  // Author distribution
  const authors = {};
  allArticles.forEach(article => {
    const author = article.author || 'Unknown';
    authors[author] = (authors[author] || 0) + 1;
  });
  
  res.json({
    totalArticles: allArticles.length,
    categories,
    authors,
    topCategories: Object.entries(categories)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count })),
    topAuthors: Object.entries(authors)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }))
  });
});

export default router;
