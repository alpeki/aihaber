# CMS Quick Start - 3 Steps to Dynamic Content

## Step 1: Setup Database (2 minutes)

### Run SQL in Supabase

1. Open Supabase Dashboard
2. Go to SQL Editor
3. Copy and paste this:

```sql
-- Create table
CREATE TABLE IF NOT EXISTS site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read site content"
ON site_content FOR SELECT TO anon USING (TRUE);

-- Create index
CREATE INDEX IF NOT EXISTS idx_site_content_key ON site_content(key);
```

4. Run the full SQL from `supabase/site_content.sql` to insert initial data

## Step 2: Test It (1 minute)

```bash
# Start dev server
pnpm dev
```

Open `http://localhost:5173` - content should load from Supabase!

## Step 3: Edit Content (30 seconds)

1. Go to Supabase → Table Editor → `site_content`
2. Click any `value` cell
3. Edit the text
4. Press Enter
5. Refresh your website - DONE!

---

## Example: Change Hero Title

### In Supabase Table Editor:

| key | value |
|-----|-------|
| hero_title | **The Future of AI is Here** ← Click to edit |

Change to: "Welcome to AI Revolution"

### Or use SQL:

```sql
UPDATE site_content 
SET value = 'Welcome to AI Revolution' 
WHERE key = 'hero_title';
```

Refresh page → Title updates instantly!

---

## How to Add New Editable Field

### 1. Add to Database

```sql
INSERT INTO site_content (key, value) VALUES
('my_new_field', 'My new content');
```

### 2. Add to HTML

```html
<h2 data-key="my_new_field">My new content</h2>
```

### 3. Refresh

Content loads automatically!

---

## Common Edits

### Update Social Links

```sql
UPDATE site_content SET value = 'https://twitter.com/yourhandle' WHERE key = 'social_twitter';
UPDATE site_content SET value = 'https://linkedin.com/in/yourprofile' WHERE key = 'social_linkedin';
UPDATE site_content SET value = 'https://github.com/yourusername' WHERE key = 'social_github';
```

### Change Category Names

```sql
UPDATE site_content SET value = 'Artificial Intelligence' WHERE key = 'category_ai_title';
UPDATE site_content SET value = 'Tech News' WHERE key = 'category_tech_title';
```

### Update Footer

```sql
UPDATE site_content SET value = 'Your Company Name' WHERE key = 'brand_name';
UPDATE site_content SET value = 'Copyright 2025 Your Company' WHERE key = 'footer_copyright';
```

---

## Force Refresh Content

Open browser console:

```javascript
window.refreshContent()
```

---

## Troubleshooting

**Content not updating?**
- Clear browser cache (Ctrl+Shift+Delete)
- Run `window.refreshContent()` in console
- Check Supabase credentials in `.env`

**Errors in console?**
- Verify SQL was run successfully
- Check `site_content` table has data
- Ensure RLS policy is enabled

---

## All Editable Keys

See `CMS-GUIDE.md` for complete list of all editable content keys.

---

**That's it! Your site is now CMS-powered.**

For detailed documentation, see:
- `CMS-GUIDE.md` - Complete guide
- `supabase/site_content.sql` - Database schema
- `src/lib/content.js` - Implementation
