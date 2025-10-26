// Supabase API Integration Module
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Generic fetch function for Supabase REST API
 * @param {string} endpoint - The API endpoint to fetch from
 * @returns {Promise<any>} - The JSON response
 */
async function fetchFromSupabase(endpoint) {
  try {
    const res = await fetch(`${url}/rest/v1/${endpoint}`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!res.ok) {
      throw new Error(`Supabase fetch error: ${res.status} ${res.statusText}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Supabase API Error:', error);
    throw error;
  }
}

/**
 * List articles with optional filtering and pagination
 * @param {Object} options - Query options
 * @param {string} options.category - Filter by category
 * @param {number} options.page - Page number (default: 1)
 * @param {number} options.limit - Items per page (default: 9)
 * @returns {Promise<Array>} - Array of articles
 */
export async function listArticles({ category, page = 1, limit = 9 } = {}) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  
  const params = new URLSearchParams({
    select: "*",
    is_published: "eq.true",
    order: "published_at.desc",
    limit: limit,
    offset: from,
  });
  
  if (category) {
    params.append("category", `eq.${category}`);
  }
  
  return fetchFromSupabase(`articles?${params}`);
}

/**
 * Get a single article by slug
 * @param {string} slug - The article slug
 * @returns {Promise<Object|null>} - The article object or null
 */
export async function getArticle(slug) {
  const params = new URLSearchParams({
    select: "*",
    slug: `eq.${slug}`,
    is_published: "eq.true",
    limit: 1,
  });
  
  const data = await fetchFromSupabase(`articles?${params}`);
  return data[0] || null;
}

/**
 * Search articles by title or excerpt
 * @param {string} query - The search query
 * @param {Object} options - Additional options
 * @param {string} options.category - Filter by category
 * @returns {Promise<Array>} - Array of matching articles
 */
export async function searchArticles(query, { category } = {}) {
  const params = new URLSearchParams({
    select: "*",
    is_published: "eq.true",
    or: `(title.ilike.*${query}*,excerpt.ilike.*${query}*)`,
    order: "published_at.desc",
  });
  
  if (category) {
    params.append("category", `eq.${category}`);
  }
  
  return fetchFromSupabase(`articles?${params}`);
}

/**
 * Get comments for an article
 * @param {string} articleId - The article UUID
 * @returns {Promise<Array>} - Array of comments
 */
export async function getComments(articleId) {
  const params = new URLSearchParams({
    select: "*",
    article_id: `eq.${articleId}`,
    order: "created_at.desc",
  });
  
  return fetchFromSupabase(`comments?${params}`);
}

/**
 * Get trending articles (popular ones)
 * @param {number} limit - Number of articles to fetch (default: 3)
 * @returns {Promise<Array>} - Array of trending articles
 */
export async function getTrendingArticles(limit = 3) {
  const params = new URLSearchParams({
    select: "*",
    is_published: "eq.true",
    order: "published_at.desc",
    limit: limit,
  });
  
  return fetchFromSupabase(`articles?${params}`);
}
