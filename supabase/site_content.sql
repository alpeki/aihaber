-- ================================================
-- SITE CONTENT CMS TABLE
-- ================================================
-- This table stores all editable content for the website
-- Edit values in Supabase Dashboard to update site content

CREATE TABLE IF NOT EXISTS site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone can read content)
CREATE POLICY "Public read site content"
ON site_content FOR SELECT
TO anon
USING (TRUE);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_site_content_key ON site_content(key);

-- ================================================
-- INITIAL CONTENT DATA
-- ================================================
-- Insert default content for the website

INSERT INTO site_content (key, value) VALUES
-- Hero Section
('hero_title', 'The Future of AI is Here'),
('hero_subtitle', 'Discover the latest breakthroughs, insights, and innovations shaping tomorrow''s world through artificial intelligence.'),
('hero_button', 'Explore News'),

-- Navigation
('nav_home', 'Home'),
('nav_trending', 'Trending'),
('nav_categories', 'Categories'),
('nav_latest', 'Latest'),
('nav_newsletter', 'Newsletter'),

-- Sections
('section_trending', 'Trending Now'),
('section_categories', 'Explore Categories'),
('section_latest', 'Latest Articles'),

-- Categories
('category_ai_title', 'Yapay Zeka'),
('category_ai_desc', 'Yapay zekadaki en son gelişmeler, makine öğrenimi ve sinir ağları'),
('category_ai_count', '150+ Makale'),

('category_tech_title', 'Teknoloji'),
('category_tech_desc', 'En son teknoloji trendleri, yenilikler ve dijital dönüşüm'),
('category_tech_count', '200+ Makale'),

('category_robotics_title', 'Robotik'),
('category_robotics_desc', 'Robot mühendisliği, otomasyon sistemleri ve akıllı makineler'),
('category_robotics_count', '120+ Makale'),

('category_science_title', 'Bilim'),
('category_science_desc', 'Bilimsel atılımlar, araştırmalar ve tüm alanlardaki yenilikler'),
('category_science_count', '180+ Makale'),

-- Newsletter Section
('newsletter_title', 'Stay Updated'),
('newsletter_subtitle', 'Get the latest AI news and insights delivered directly to your inbox. Join thousands of professionals staying ahead of the curve.'),
('newsletter_placeholder', 'Enter your email address'),
('newsletter_button', 'Subscribe'),
('newsletter_disclaimer', 'We respect your privacy. Unsubscribe at any time.'),

-- Footer
('footer_description', 'Your trusted source for artificial intelligence news, insights, and analysis. Stay informed about the technologies shaping our future.'),
('footer_quicklinks', 'Quick Links'),
('footer_resources', 'Resources'),
('footer_about', 'About Us'),
('footer_contact', 'Contact'),
('footer_privacy', 'Privacy Policy'),
('footer_terms', 'Terms of Service'),
('footer_copyright', 'AI News. All rights reserved. Built with passion for the future of technology.'),

-- Social Media Links
('social_twitter', 'https://twitter.com/ainews'),
('social_linkedin', 'https://linkedin.com/company/ainews'),
('social_github', 'https://github.com/ainews'),
('social_instagram', 'https://instagram.com/ainews'),

-- Search
('search_placeholder', 'Search articles, topics, or keywords...'),
('search_all_categories', 'All Categories'),
('search_newest', 'Newest First'),
('search_oldest', 'Oldest First'),
('search_popular', 'Most Popular'),

-- Brand
('brand_name', 'AI News'),
('brand_tagline', 'Stay Ahead of the Future')

ON CONFLICT (key) DO NOTHING;

-- ================================================
-- HELPER FUNCTION: Update timestamp on change
-- ================================================
CREATE OR REPLACE FUNCTION update_site_content_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER site_content_updated_at
BEFORE UPDATE ON site_content
FOR EACH ROW
EXECUTE FUNCTION update_site_content_timestamp();

-- ================================================
-- VERIFICATION QUERY
-- ================================================
-- Run this to see all content:
-- SELECT key, value, updated_at FROM site_content ORDER BY key;
