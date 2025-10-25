import express from 'express';
import Parser from 'rss-parser';
import { getAllFetchedArticles, triggerFetch } from '../services/rss-cron.js';

const router = express.Router();
const parser = new Parser();

// RSS feed sources
const RSS_FEEDS = [
  { name: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
  { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml' },
  { name: 'Wired', url: 'https://www.wired.com/feed/rss' },
  { name: 'WebTekno', url: 'https://www.webtekno.com/rss.xml' }
];

// GET all RSS feeds
router.get('/feeds', (req, res) => {
  res.json(RSS_FEEDS);
});

// GET cached/fetched articles
router.get('/cached', (req, res) => {
  const articles = getAllFetchedArticles();
  res.json({
    total: articles.length,
    articles
  });
});

// POST trigger manual fetch
router.post('/fetch', async (req, res) => {
  try {
    const articles = await triggerFetch();
    res.json({
      message: 'RSS feeds fetched successfully',
      total: articles.length,
      articles
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch RSS feeds', message: error.message });
  }
});

// GET articles from a specific feed
router.get('/parse', async (req, res) => {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }
  
  try {
    const feed = await parser.parseURL(url);
    
    const articles = feed.items.map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      author: item.creator || item.author,
      content: item.contentSnippet || item.content,
      categories: item.categories || []
    }));
    
    res.json({
      feedTitle: feed.title,
      feedDescription: feed.description,
      articles
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to parse RSS feed', message: error.message });
  }
});

// GET articles from all feeds
router.get('/all', async (req, res) => {
  try {
    const allArticles = [];
    
    for (const feed of RSS_FEEDS) {
      try {
        const parsedFeed = await parser.parseURL(feed.url);
        const articles = parsedFeed.items.slice(0, 5).map(item => ({
          source: feed.name,
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          content: item.contentSnippet
        }));
        allArticles.push(...articles);
      } catch (error) {
        console.error(`Failed to parse ${feed.name}:`, error.message);
      }
    }
    
    // Sort by date
    allArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    
    res.json({
      total: allArticles.length,
      articles: allArticles
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch RSS feeds', message: error.message });
  }
});

export default router;
