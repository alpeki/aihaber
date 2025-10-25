// Test search functionality
import fetch from 'node-fetch';

const API_URL = 'http://localhost:3000';

async function testSearch() {
  console.log('🔍 Testing Search System...\n');
  
  try {
    // Test 1: Basic search
    console.log('1️⃣ Basic search for "AI"...');
    const searchResponse = await fetch(`${API_URL}/api/search?q=AI&limit=5`);
    const searchData = await searchResponse.json();
    console.log(`✅ Found ${searchData.total} results`);
    console.log(`   Showing ${searchData.results.length} results (page ${searchData.page})`);
    
    if (searchData.results.length > 0) {
      console.log('\n   Top 3 results:');
      searchData.results.slice(0, 3).forEach((result, i) => {
        console.log(`   ${i + 1}. ${result.title}`);
        console.log(`      Relevance: ${result.relevance}, Category: ${result.category}`);
      });
    }
    
    // Test 2: Search with filters
    console.log('\n2️⃣ Search with category filter...');
    const filteredResponse = await fetch(`${API_URL}/api/search?q=technology&category=Teknoloji`);
    const filteredData = await filteredResponse.json();
    console.log(`✅ Found ${filteredData.total} results in "Teknoloji" category`);
    
    // Test 3: Search suggestions (autocomplete)
    console.log('\n3️⃣ Getting search suggestions for "tech"...');
    const suggestResponse = await fetch(`${API_URL}/api/search/suggest?q=tech&limit=5`);
    const suggestData = await suggestResponse.json();
    console.log(`✅ Found ${suggestData.suggestions.length} suggestions:`);
    suggestData.suggestions.forEach((suggestion, i) => {
      console.log(`   ${i + 1}. ${suggestion}`);
    });
    
    // Test 4: Popular searches
    console.log('\n4️⃣ Getting popular searches...');
    const popularResponse = await fetch(`${API_URL}/api/search/popular`);
    const popularData = await popularResponse.json();
    console.log('✅ Popular searches:');
    popularData.popular.forEach((item, i) => {
      console.log(`   ${i + 1}. "${item.query}" (${item.count} searches)`);
    });
    
    // Test 5: Search analytics
    console.log('\n5️⃣ Getting search analytics...');
    const analyticsResponse = await fetch(`${API_URL}/api/search/analytics`);
    const analyticsData = await analyticsResponse.json();
    console.log(`✅ Total articles: ${analyticsData.totalArticles}`);
    console.log('\n   Top categories:');
    analyticsData.topCategories.forEach((cat, i) => {
      console.log(`   ${i + 1}. ${cat.name}: ${cat.count} articles`);
    });
    console.log('\n   Top authors:');
    analyticsData.topAuthors.forEach((author, i) => {
      console.log(`   ${i + 1}. ${author.name}: ${author.count} articles`);
    });
    
    // Test 6: Empty query validation
    console.log('\n6️⃣ Testing validation (empty query)...');
    const emptyResponse = await fetch(`${API_URL}/api/search?q=`);
    const emptyData = await emptyResponse.json();
    console.log(emptyResponse.status === 400 ? '✅' : '❌', 'Validation working:', emptyData.error);
    
    console.log('\n✨ All search tests completed!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testSearch();
