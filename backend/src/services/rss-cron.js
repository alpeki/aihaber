import cron from 'node-cron';
import Parser from 'rss-parser';
import { articles } from '../data/articles.js';

const parser = new Parser();

const RSS_FEEDS = [
  { name: 'TechCrunch', url: 'https://techcrunch.com/feed/', category: 'Teknoloji' },
  { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml', category: 'Teknoloji' },
  { name: 'Wired', url: 'https://www.wired.com/feed/rss', category: 'Teknoloji' },
  { name: 'WebTekno', url: 'https://www.webtekno.com/rss.xml', category: 'Teknoloji' }
];

// Store fetched articles (in production, this would be a database)
let fetchedArticles = [];

async function fetchRSSFeeds() {
  console.log('📡 Fetching RSS feeds...');
  const newArticles = [];
  
  for (const feed of RSS_FEEDS) {
    try {
      const parsedFeed = await parser.parseURL(feed.url);
      
      parsedFeed.items.slice(0, 5).forEach(item => {
        const article = {
          id: `rss-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: item.title,
          category: feed.category,
          author: feed.name,
          date: item.pubDate || new Date().toISOString(),
          link: item.link,
          summary: item.contentSnippet?.substring(0, 200) || '',
          content: item.content || item.contentSnippet || '',
          tags: item.categories || [],
          source: feed.name,
          image: item.enclosure?.url || '/assets/images/default.jpg'
        };
        
        // Check if article already exists
        const exists = fetchedArticles.some(a => a.link === article.link);
        if (!exists) {
          newArticles.push(article);
        }
      });
      
      console.log(`✅ Fetched ${parsedFeed.items.length} articles from ${feed.name}`);
    } catch (error) {
      console.error(`❌ Failed to fetch ${feed.name}:`, error.message);
    }
  }
  
  if (newArticles.length > 0) {
    fetchedArticles = [...newArticles, ...fetchedArticles].slice(0, 100); // Keep last 100
    console.log(`📰 Added ${newArticles.length} new articles. Total: ${fetchedArticles.length}`);
  } else {
    console.log('ℹ️  No new articles found');
  }
}

// Get all fetched articles
export function getAllFetchedArticles() {
  return fetchedArticles;
}

// Manual trigger
export async function triggerFetch() {
  await fetchRSSFeeds();
  return fetchedArticles;
}

// Schedule cron job
export function startRSSCron() {
  // Run every hour
  cron.schedule('0 * * * *', () => {
    console.log('\n⏰ Cron job triggered');
    fetchRSSFeeds();
  });
  
  console.log('✅ RSS Cron job scheduled (runs every hour)');
  
  // Fetch immediately on startup
  fetchRSSFeeds();
}

// For testing: Run every minute
export function startRSSCronTest() {
  cron.schedule('* * * * *', () => {
    console.log('\n⏰ Test cron triggered');
    fetchRSSFeeds();
  });
  
  console.log('✅ RSS Test Cron job scheduled (runs every minute)');
  fetchRSSFeeds();
}
