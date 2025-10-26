# 📝 CMS Guide - Dynamic Content Management

## Overview

Your website is now powered by a **dynamic CMS** using Supabase. You can edit all text content from the Supabase Dashboard without touching code.

## 🚀 Quick Start

### 1. Setup Database

Run this SQL in your Supabase SQL Editor:

```sql
-- Copy and paste the entire content from:
-- supabase/site_content.sql
```

Or simply run:
```bash
# Navigate to supabase folder and copy the SQL
cat supabase/site_content.sql
```

### 2. Verify Installation

After running the SQL, check your Supabase Dashboard:
- Go to **Table Editor**
- You should see a new table: `site_content`
- It should have ~50 rows of content

### 3. Test the Site

```bash
pnpm dev
```

Open `http://localhost:5173` - all content should load from Supabase!

---

## 📋 How It Works

### Architecture

```
┌─────────────────┐
│  Supabase DB    │
│  site_content   │
│  (key, value)   │
└────────┬────────┘
         │
         │ REST API
         │
         ▼
┌─────────────────┐
│  content.js     │
│  Fetches data   │
│  Updates DOM    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  index.html     │
│  data-key attrs │
│  Auto-updates   │
└─────────────────┘
```

### Data Flow

1. **Page loads** → `content.js` initializes
2. **Fetch content** → GET request to Supabase
3. **Cache data** → Store in localStorage (5 min)
4. **Update DOM** → Find all `[data-key]` elements
5. **Replace text** → Update with values from DB

---

## ✏️ Editing Content

### Method 1: Supabase Dashboard (Recommended)

1. **Login to Supabase**
   - Go to https://supabase.com
   - Open your project

2. **Navigate to Table Editor**
   - Click "Table Editor" in sidebar
   - Select `site_content` table

3. **Edit Any Content**
   - Click on any `value` cell
   - Type your new content
   - Press Enter to save

4. **Refresh Your Site**
   - Reload the page
   - Content updates automatically!

### Method 2: SQL Editor

```sql
-- Update hero title
UPDATE site_content 
SET value = 'Welcome to AI Revolution' 
WHERE key = 'hero_title';

-- Update social media link
UPDATE site_content 
SET value = 'https://twitter.com/yourhandle' 
WHERE key = 'social_twitter';
```

---

## 🎯 Editable Content Keys

### Hero Section
| Key | Current Value | Description |
|-----|---------------|-------------|
| `hero_title` | "The Future of AI is Here" | Main hero heading |
| `hero_subtitle` | "Discover the latest..." | Hero description |
| `hero_button` | "Explore News" | CTA button text |

### Navigation
| Key | Current Value |
|-----|---------------|
| `nav_home` | "Home" |
| `nav_trending` | "Trending" |
| `nav_categories` | "Categories" |
| `nav_latest` | "Latest" |
| `nav_newsletter` | "Newsletter" |

### Categories
| Key | Current Value |
|-----|---------------|
| `category_ai_title` | "Yapay Zeka" |
| `category_ai_desc` | "Yapay zekadaki en son..." |
| `category_ai_count` | "150+ Makale" |
| `category_tech_title` | "Teknoloji" |
| `category_tech_desc` | "En son teknoloji..." |
| `category_tech_count` | "200+ Makale" |
| `category_robotics_title` | "Robotik" |
| `category_robotics_desc` | "Robot mühendisliği..." |
| `category_robotics_count` | "120+ Makale" |
| `category_science_title` | "Bilim" |
| `category_science_desc` | "Bilimsel atılımlar..." |
| `category_science_count` | "180+ Makale" |

### Newsletter
| Key | Current Value |
|-----|---------------|
| `newsletter_title` | "Stay Updated" |
| `newsletter_subtitle` | "Get the latest AI news..." |
| `newsletter_placeholder` | "Enter your email address" |
| `newsletter_button` | "Subscribe" |
| `newsletter_disclaimer` | "We respect your privacy..." |

### Footer
| Key | Current Value |
|-----|---------------|
| `footer_description` | "Your trusted source..." |
| `footer_quicklinks` | "Quick Links" |
| `footer_resources` | "Resources" |
| `footer_about` | "About Us" |
| `footer_contact` | "Contact" |
| `footer_privacy` | "Privacy Policy" |
| `footer_terms` | "Terms of Service" |
| `footer_copyright` | "AI News. All rights reserved..." |

### Social Media Links
| Key | Current Value | Type |
|-----|---------------|------|
| `social_twitter` | "https://twitter.com/ainews" | URL |
| `social_linkedin` | "https://linkedin.com/company/ainews" | URL |
| `social_github` | "https://github.com/ainews" | URL |

### Brand
| Key | Current Value |
|-----|---------------|
| `brand_name` | "AI News" |
| `brand_tagline` | "Stay Ahead of the Future" |

---

## 🆕 Adding New Editable Fields

### Step 1: Add to Database

```sql
INSERT INTO site_content (key, value) VALUES
('new_field_name', 'Your content here');
```

Example:
```sql
INSERT INTO site_content (key, value) VALUES
('hero_tagline', 'Powered by AI, Built for Humans');
```

### Step 2: Add to HTML

Add `data-key` attribute to the element:

```html
<!-- Before -->
<p>Powered by AI, Built for Humans</p>

<!-- After -->
<p data-key="hero_tagline">Powered by AI, Built for Humans</p>
```

### Step 3: Refresh Page

The content will automatically load from Supabase!

---

## 🔄 Cache Management

### How Caching Works

- Content is cached in `localStorage` for **5 minutes**
- Reduces API calls and improves performance
- Automatically refreshes when expired

### Force Refresh

Open browser console and run:
```javascript
window.refreshContent()
```

Or clear cache:
```javascript
localStorage.removeItem('site_content_cache')
```

---

## 🧪 Testing Changes

### Test Workflow

1. **Edit in Supabase**
   ```sql
   UPDATE site_content 
   SET value = 'New Hero Title!' 
   WHERE key = 'hero_title';
   ```

2. **Clear Cache** (optional)
   ```javascript
   window.refreshContent()
   ```

3. **Reload Page**
   - Press F5 or Ctrl+R
   - Check if content updated

4. **Verify**
   - Open browser DevTools
   - Check Console for: "Updated X content elements from CMS"

---

## 🎨 Content Guidelines

### Text Content

✅ **Do:**
- Keep titles concise (< 60 characters)
- Use clear, descriptive text
- Maintain consistent tone
- Test on mobile devices

❌ **Don't:**
- Use HTML tags in values (they'll be escaped)
- Include special characters that break JSON
- Make text too long for UI

### Links

✅ **Do:**
- Use full URLs: `https://twitter.com/handle`
- Test links after updating
- Keep URLs clean and valid

❌ **Don't:**
- Use relative URLs for social links
- Forget the `https://` protocol

---

## 🔍 Troubleshooting

### Content Not Updating

**Problem:** Changed content in Supabase but site shows old text

**Solutions:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Force refresh: `window.refreshContent()`
3. Check browser console for errors
4. Verify the `key` matches exactly

### Console Errors

**Problem:** "Failed to fetch content"

**Solutions:**
1. Check `.env` file has correct Supabase credentials
2. Verify Supabase project is active
3. Check RLS policies allow public read access
4. Test API endpoint in browser

### No Content Showing

**Problem:** Page loads but all content is default/empty

**Solutions:**
1. Run the SQL setup script again
2. Check `site_content` table has data
3. Verify `content.js` is loaded (check Network tab)
4. Check for JavaScript errors in console

---

## 🚀 Advanced Usage

### Programmatic Access

Get content value in JavaScript:

```javascript
import { getContentValue } from './src/lib/content.js';

const heroTitle = await getContentValue('hero_title');
console.log(heroTitle); // "The Future of AI is Here"
```

### Custom Update Logic

```javascript
import { loadSiteContent } from './src/lib/content.js';

// Force refresh from server
await loadSiteContent(true);
```

### Clear Cache

```javascript
import { clearContentCache } from './src/lib/content.js';

clearContentCache();
```

---

## 📊 Content Analytics

### Track Updates

The `site_content` table has an `updated_at` field that automatically updates:

```sql
-- See recently updated content
SELECT key, value, updated_at 
FROM site_content 
ORDER BY updated_at DESC 
LIMIT 10;
```

### Content Audit

```sql
-- Find all content keys
SELECT key FROM site_content ORDER BY key;

-- Count total content items
SELECT COUNT(*) FROM site_content;

-- Search content
SELECT key, value 
FROM site_content 
WHERE value ILIKE '%AI%';
```

---

## 🔐 Security

### Row Level Security (RLS)

The table has RLS enabled with public read access:

```sql
-- Public can read
CREATE POLICY "Public read site content"
ON site_content FOR SELECT
TO anon
USING (TRUE);
```

### Best Practices

✅ **Do:**
- Keep RLS enabled
- Use environment variables for credentials
- Validate content before inserting
- Backup database regularly

❌ **Don't:**
- Allow public write access
- Store sensitive data in `site_content`
- Commit `.env` to git

---

## 📦 Backup & Restore

### Backup Content

```sql
-- Export all content
COPY (SELECT * FROM site_content) 
TO '/path/to/backup.csv' 
WITH CSV HEADER;
```

### Restore Content

```sql
-- Import from backup
COPY site_content(key, value)
FROM '/path/to/backup.csv'
WITH CSV HEADER;
```

---

## 🎯 Next Steps

1. ✅ Run SQL setup
2. ✅ Test content loading
3. ✅ Edit some content in Supabase
4. ✅ Verify changes on site
5. 📝 Document your custom content keys
6. 🚀 Deploy to production

---

## 💡 Tips & Tricks

### Bulk Updates

```sql
-- Update multiple items at once
UPDATE site_content 
SET value = 'Updated!'
WHERE key IN ('hero_title', 'hero_subtitle');
```

### Content Versioning

```sql
-- Create a backup before major changes
CREATE TABLE site_content_backup AS 
SELECT * FROM site_content;
```

### Search & Replace

```sql
-- Replace text across all content
UPDATE site_content 
SET value = REPLACE(value, 'old text', 'new text');
```

---

## 📞 Support

- **Documentation:** See `SUPABASE-SETUP.md`
- **API Docs:** Check `src/lib/content.js` comments
- **Database Schema:** See `supabase/site_content.sql`

---

**Last Updated:** October 26, 2025  
**Version:** 1.0.0  
**Status:** ✅ Production Ready
