// Quick RSS test script
import fetch from 'node-fetch';

const API_URL = 'http://localhost:3000';

async function testRSS() {
  console.log('🧪 Testing RSS Feed Parser...\n');
  
  try {
    // Test 1: Get all RSS feeds
    console.log('1️⃣ Fetching RSS feed sources...');
    const feedsResponse = await fetch(`${API_URL}/api/rss/feeds`);
    const feeds = await feedsResponse.json();
    console.log(`✅ Found ${feeds.length} RSS sources\n`);
    
    // Test 2: Parse all feeds
    console.log('2️⃣ Parsing all RSS feeds...');
    const allResponse = await fetch(`${API_URL}/api/rss/all`);
    const allData = await allResponse.json();
    console.log(`✅ Fetched ${allData.total} articles from all sources\n`);
    
    // Display first 3 articles
    console.log('📰 Latest Articles:');
    allData.articles.slice(0, 3).forEach((article, i) => {
      console.log(`\n${i + 1}. ${article.title}`);
      console.log(`   Source: ${article.source}`);
      console.log(`   Date: ${new Date(article.pubDate).toLocaleString('tr-TR')}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testRSS();
