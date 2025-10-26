# Supabase Integration Setup Guide

## Overview
This project now uses Supabase as the backend database for storing and retrieving articles. The integration includes:
- Article listing with pagination
- Category filtering
- Search functionality
- Single article detail pages
- Loading states and error handling

## Prerequisites
1. Node.js (v14 or higher)
2. pnpm package manager
3. Supabase account with a configured project

## Database Setup

### 1. Create Supabase Tables

Run the following SQL in your Supabase SQL Editor:

```sql
-- ARTICLES TABLE
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_url TEXT,
  category TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  is_published BOOLEAN DEFAULT TRUE
);

-- COMMENTS TABLE
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  author TEXT,
  body TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Public read access for published articles
CREATE POLICY "Public read published articles"
ON articles FOR SELECT
TO anon
USING (is_published = TRUE);

-- Public read access for comments
CREATE POLICY "Public read comments"
ON comments FOR SELECT
TO anon
USING (TRUE);
```

### 2. Insert Sample Data (Optional)

```sql
INSERT INTO articles (slug, title, excerpt, content, cover_url, category, is_published) VALUES
('ai-breakthrough-2024', 'Revolutionary AI Model Achieves Human-Level Reasoning', 'Scientists at leading tech companies have developed an AI system that demonstrates unprecedented reasoning capabilities.', '<h2>Introduction</h2><p>This is a groundbreaking development in artificial intelligence...</p>', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200', 'ai', TRUE),
('quantum-computing-advance', 'Quantum Computing Breakthrough Promises Faster AI Training', 'Researchers have successfully demonstrated quantum-enhanced machine learning algorithms.', '<h2>The Breakthrough</h2><p>Quantum computing has reached a new milestone...</p>', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200', 'tech', TRUE),
('autonomous-robots-manufacturing', 'Autonomous Robots Begin Mass Deployment in Manufacturing', 'Major automotive companies are implementing AI-powered robots across their production lines.', '<h2>Industry Impact</h2><p>The manufacturing sector is undergoing a transformation...</p>', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200', 'robotics', TRUE);
```

## Environment Configuration

### 1. Create .env File

The `.env` file has been created with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://uyuqxlsfftbizwkmmrxp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5dXF4bHNmZnRiaXp3a21tcnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MzA0MTcsImV4cCI6MjA3NzAwNjQxN30.HtwK-xGadkvLuCwxqF7xo_LoeBzfLRt8OnVw8vj4acA
```

**Note:** The `.env` file is gitignored for security. Use `.env.example` as a template.

## Project Structure

```
ai.haber/
├── .env                    # Environment variables (gitignored)
├── .env.example           # Environment template
├── src/
│   └── lib/
│       └── api.js         # Supabase API integration
├── pages/
│   └── article.html       # Single article detail page
├── script.js              # Main JavaScript (updated for Supabase)
├── index.html             # Homepage (updated to use modules)
└── style.css              # Styles (added spinner & active states)
```

## API Functions

### `src/lib/api.js`

The API module provides the following functions:

#### `listArticles({ category, page, limit })`
Fetch a paginated list of articles with optional category filtering.

**Parameters:**
- `category` (string, optional): Filter by category ('ai', 'tech', 'robotics', 'science')
- `page` (number, default: 1): Page number
- `limit` (number, default: 9): Items per page

**Returns:** Array of article objects

#### `getArticle(slug)`
Fetch a single article by its slug.

**Parameters:**
- `slug` (string): The article slug

**Returns:** Article object or null

#### `searchArticles(query, { category })`
Search articles by title or excerpt.

**Parameters:**
- `query` (string): Search query
- `category` (string, optional): Filter by category

**Returns:** Array of matching articles

#### `getTrendingArticles(limit)`
Fetch trending/latest articles.

**Parameters:**
- `limit` (number, default: 3): Number of articles to fetch

**Returns:** Array of article objects

## Features Implemented

### 1. Homepage (`index.html`)
- Displays trending articles (top 3)
- Lists latest articles with pagination support
- Category filtering with active state highlighting
- Search functionality integrated with Supabase
- Loading spinners during data fetch
- Error handling with retry option

### 2. Article Detail Page (`pages/article.html`)
- Fetches single article by slug from URL parameter
- Displays full article content with formatting
- Responsive design
- Back to home navigation
- Loading and error states

### 3. Category Filtering
- Click on category cards to filter articles
- Active category is visually highlighted
- Smooth scrolling to articles section
- Updates both trending and latest sections

### 4. Search
- Real-time search as you type
- Searches in article titles and excerpts
- Can be combined with category filter
- Shows loading state during search
- Displays "No results" message when appropriate

### 5. Loading & Error States
- Spinner animation during data fetching
- User-friendly error messages
- Retry button on errors
- Graceful fallbacks

## Running the Project

### Development Server

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The development server will start at `http://localhost:5173` (or another port if 5173 is busy).

### Build for Production

```bash
# Create production build
pnpm build

# Preview production build
pnpm preview
```

## Testing the Integration

1. **Start the dev server:**
   ```bash
   pnpm dev
   ```

2. **Test Homepage:**
   - Open `http://localhost:5173`
   - Verify trending articles load
   - Verify latest articles load
   - Check loading spinners appear briefly

3. **Test Category Filtering:**
   - Click on a category card (AI, Technology, Robotics, Science)
   - Verify the card gets highlighted
   - Verify articles filter by category
   - Check URL parameter updates

4. **Test Search:**
   - Click search icon in navigation
   - Type a search query
   - Verify results update in real-time
   - Try combining search with category filter

5. **Test Article Detail:**
   - Click on any article card
   - Verify navigation to article detail page
   - Check article content displays correctly
   - Test back button navigation

6. **Test Error Handling:**
   - Temporarily disable internet connection
   - Verify error messages appear
   - Check retry button works

## Troubleshooting

### Issue: Articles not loading

**Solution:**
1. Check `.env` file exists and has correct credentials
2. Verify Supabase project is active
3. Check browser console for errors
4. Ensure RLS policies are set correctly in Supabase

### Issue: CORS errors

**Solution:**
1. Verify Supabase URL is correct
2. Check that the anon key is valid
3. Ensure your domain is allowed in Supabase settings

### Issue: Module import errors

**Solution:**
1. Ensure you're using a development server (not opening HTML directly)
2. Check that `script.js` has `type="module"` attribute
3. Verify file paths in import statements

### Issue: Styles not applying

**Solution:**
1. Clear browser cache
2. Check that `style.css` is loaded
3. Verify CSS variables are defined

## Next Steps

### Recommended Enhancements:
1. Add pagination controls for articles list
2. Implement infinite scroll
3. Add article comments section
4. Create admin panel for content management
5. Add social sharing functionality
6. Implement article bookmarking
7. Add related articles section
8. Create RSS feed

### Performance Optimizations:
1. Implement image lazy loading (already added)
2. Add service worker for offline support
3. Enable Supabase caching
4. Optimize bundle size
5. Add CDN for static assets

## Security Notes

- Never commit `.env` file to version control
- Keep Supabase anon key secure (it's safe for client-side use with RLS)
- Always use Row Level Security (RLS) policies
- Sanitize user inputs (already implemented)
- Use HTTPS in production

## Support

For issues or questions:
1. Check Supabase documentation: https://supabase.com/docs
2. Review browser console for errors
3. Check network tab for failed requests
4. Verify database policies in Supabase dashboard

---

**Last Updated:** October 26, 2025
**Version:** 1.0.0
