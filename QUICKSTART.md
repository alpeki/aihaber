# Quick Start Guide - Supabase Integration

## Get Started in 3 Steps

### Step 1: Database Setup
Run this SQL in your Supabase SQL Editor:

```sql
-- Create tables
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

CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  author TEXT,
  body TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public read published articles"
ON articles FOR SELECT TO anon
USING (is_published = TRUE);

CREATE POLICY "Public read comments"
ON comments FOR SELECT TO anon
USING (TRUE);
```

### Step 2: Environment Setup
The `.env` file is already created with your credentials:
```
VITE_SUPABASE_URL=https://uyuqxlsfftbizwkmmrxp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

### Step 3: Run the Project
```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Open `http://localhost:5173` in your browser.

## Add Sample Articles

```sql
INSERT INTO articles (slug, title, excerpt, content, cover_url, category) VALUES
('ai-breakthrough', 'AI Breakthrough 2024', 'Revolutionary AI model...', '<p>Content here</p>', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200', 'ai'),
('quantum-advance', 'Quantum Computing Advance', 'New quantum algorithms...', '<p>Content here</p>', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200', 'tech'),
('robot-deployment', 'Robot Mass Deployment', 'Robots in manufacturing...', '<p>Content here</p>', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200', 'robotics');
```

## Features Working

✅ Article listing from Supabase  
✅ Category filtering with active state  
✅ Search functionality  
✅ Article detail pages  
✅ Loading spinners  
✅ Error handling  
✅ Responsive design  

## Test It

1. **Homepage:** See trending and latest articles
2. **Categories:** Click category cards to filter
3. **Search:** Use search bar to find articles
4. **Details:** Click any article to view full content
5. **Theme:** Toggle dark/light mode

## Troubleshooting

**No articles showing?**
- Check Supabase tables have data
- Verify `.env` credentials are correct
- Check browser console for errors

**Module errors?**
- Must use dev server (not open HTML directly)
- Run `pnpm dev` to start server

**CORS errors?**
- Verify Supabase URL and key
- Check Supabase project is active

---

For detailed documentation, see `SUPABASE-SETUP.md`
