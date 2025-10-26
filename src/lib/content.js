/**
 * Dynamic Content Management System
 * Fetches content from Supabase and updates DOM elements with data-key attributes
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const CACHE_KEY = 'site_content_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch all site content from Supabase
 * @returns {Promise<Object>} Content object with key-value pairs
 */
async function fetchSiteContent() {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/site_content?select=*`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch content: ${response.status}`);
    }

    const data = await response.json();
    
    // Convert array to key-value object
    const contentMap = {};
    data.forEach(item => {
      contentMap[item.key] = item.value;
    });

    return contentMap;
  } catch (error) {
    console.error('Error fetching site content:', error);
    return null;
  }
}

/**
 * Get content from cache if valid
 * @returns {Object|null} Cached content or null
 */
function getCachedContent() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { content, timestamp } = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is still valid
    if (now - timestamp < CACHE_DURATION) {
      console.log('Using cached content');
      return content;
    }

    // Cache expired
    localStorage.removeItem(CACHE_KEY);
    return null;
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
}

/**
 * Save content to cache
 * @param {Object} content - Content to cache
 */
function setCachedContent(content) {
  try {
    const cacheData = {
      content,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
}

/**
 * Update DOM elements with data-key attributes
 * @param {Object} content - Content object with key-value pairs
 */
function updateDOMContent(content) {
  if (!content) return;

  // Find all elements with data-key attribute
  const elements = document.querySelectorAll('[data-key]');
  
  let updatedCount = 0;
  
  elements.forEach(element => {
    const key = element.getAttribute('data-key');
    const value = content[key];

    if (value !== undefined && value !== null) {
      // Check if element is an input
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = value;
      }
      // Check if element is a link
      else if (element.tagName === 'A' && key.startsWith('social_')) {
        element.href = value;
      }
      // For all other elements, update text content
      else {
        // Preserve HTML structure if element has children
        if (element.children.length === 0) {
          element.textContent = value;
        } else {
          // Find text nodes and update them
          const textNode = Array.from(element.childNodes).find(
            node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
          );
          if (textNode) {
            textNode.textContent = value;
          } else {
            element.textContent = value;
          }
        }
      }
      
      updatedCount++;
    }
  });

  console.log(`Updated ${updatedCount} content elements from CMS`);
}

/**
 * Load and apply site content
 * @param {boolean} forceRefresh - Force refresh from server
 */
export async function loadSiteContent(forceRefresh = false) {
  try {
    let content;

    // Try cache first unless force refresh
    if (!forceRefresh) {
      content = getCachedContent();
    }

    // Fetch from server if no cache or force refresh
    if (!content) {
      console.log('Fetching content from Supabase...');
      content = await fetchSiteContent();
      
      if (content) {
        setCachedContent(content);
      }
    }

    // Update DOM
    if (content) {
      updateDOMContent(content);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error loading site content:', error);
    return false;
  }
}

/**
 * Clear content cache
 */
export function clearContentCache() {
  localStorage.removeItem(CACHE_KEY);
  console.log('Content cache cleared');
}

/**
 * Get single content value by key
 * @param {string} key - Content key
 * @returns {Promise<string|null>} Content value
 */
export async function getContentValue(key) {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/site_content?key=eq.${key}&select=value`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data[0]?.value || null;
  } catch (error) {
    console.error('Error fetching content value:', error);
    return null;
  }
}

/**
 * Initialize content management system
 * Call this when DOM is ready
 */
export function initCMS() {
  // Load content when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => loadSiteContent());
  } else {
    loadSiteContent();
  }

  // Expose refresh function globally for debugging
  window.refreshContent = () => loadSiteContent(true);
  
  console.log('CMS initialized. Use window.refreshContent() to force refresh.');
}

// Auto-initialize if this module is imported
initCMS();
