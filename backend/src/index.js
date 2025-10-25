import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import articlesRouter from './routes/articles.js';
import rssRouter from './routes/rss.js';
import aiRouter from './routes/ai.js';
import commentsRouter from './routes/comments.js';
import searchRouter from './routes/search.js';
import i18nRouter from './routes/i18n.js';
import { startRSSCron } from './services/rss-cron.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'AI Haber Backend API',
    version: '1.0.0',
    endpoints: {
      articles: '/api/articles',
      rss: '/api/rss',
      ai: '/api/ai',
      comments: '/api/comments',
      search: '/api/search',
      i18n: '/api/i18n'
    }
  });
});

app.use('/api/articles', articlesRouter);
app.use('/api/rss', rssRouter);
app.use('/api/ai', aiRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/search', searchRouter);
app.use('/api/i18n', i18nRouter);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  
  // Start RSS cron job
  startRSSCron();
});
