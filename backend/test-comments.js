// Test comments system
import fetch from 'node-fetch';

const API_URL = 'http://localhost:3000';
const TEST_ARTICLE_ID = 'test-article-1';

async function testComments() {
  console.log('💬 Testing Comments System...\n');
  
  try {
    // Test 1: Post a comment
    console.log('1️⃣ Posting a new comment...');
    const comment1Response = await fetch(`${API_URL}/api/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        articleId: TEST_ARTICLE_ID,
        author: 'Ahmet Yılmaz',
        email: 'ahmet@example.com',
        content: 'Harika bir makale! Yapay zeka konusunda çok bilgilendirici.'
      })
    });
    const comment1 = await comment1Response.json();
    console.log('✅ Comment posted:', comment1.comment.id);
    console.log('   Author:', comment1.comment.author);
    console.log('   Content:', comment1.comment.content.substring(0, 50) + '...');
    
    // Test 2: Post another comment
    console.log('\n2️⃣ Posting another comment...');
    const comment2Response = await fetch(`${API_URL}/api/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        articleId: TEST_ARTICLE_ID,
        author: 'Ayşe Demir',
        email: 'ayse@example.com',
        content: 'Bu teknolojinin geleceği çok parlak görünüyor. Teşekkürler!'
      })
    });
    const comment2 = await comment2Response.json();
    console.log('✅ Comment posted:', comment2.comment.id);
    
    // Test 3: Post a reply
    console.log('\n3️⃣ Posting a reply...');
    const replyResponse = await fetch(`${API_URL}/api/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        articleId: TEST_ARTICLE_ID,
        author: 'Mehmet Kaya',
        email: 'mehmet@example.com',
        content: 'Katılıyorum! Özellikle GPT-4 konusundaki gelişmeler çok etkileyici.',
        parentId: comment1.comment.id
      })
    });
    const reply = await replyResponse.json();
    console.log('✅ Reply posted:', reply.comment.id);
    console.log('   Parent:', reply.comment.parentId);
    
    // Test 4: Get all comments for article
    console.log('\n4️⃣ Fetching all comments...');
    const commentsResponse = await fetch(`${API_URL}/api/comments/article/${TEST_ARTICLE_ID}`);
    const commentsData = await commentsResponse.json();
    console.log(`✅ Found ${commentsData.total} top-level comments`);
    
    commentsData.comments.forEach((comment, i) => {
      console.log(`\n   Comment ${i + 1}:`);
      console.log(`   - Author: ${comment.author}`);
      console.log(`   - Content: ${comment.content.substring(0, 40)}...`);
      console.log(`   - Replies: ${comment.replies.length}`);
      console.log(`   - Likes: ${comment.likes}`);
    });
    
    // Test 5: Like a comment
    console.log('\n5️⃣ Liking a comment...');
    const likeResponse = await fetch(`${API_URL}/api/comments/${comment1.comment.id}/like`, {
      method: 'PUT'
    });
    const likeData = await likeResponse.json();
    console.log('✅ Comment liked! Total likes:', likeData.likes);
    
    // Test 6: Get comment statistics
    console.log('\n6️⃣ Getting comment statistics...');
    const statsResponse = await fetch(`${API_URL}/api/comments/stats/${TEST_ARTICLE_ID}`);
    const stats = await statsResponse.json();
    console.log('✅ Statistics:');
    console.log('   - Total comments:', stats.total);
    console.log('   - Top-level comments:', stats.topLevel);
    console.log('   - Replies:', stats.replies);
    console.log('   - Total likes:', stats.totalLikes);
    
    // Test 7: Validation test (should fail)
    console.log('\n7️⃣ Testing validation (invalid email)...');
    const invalidResponse = await fetch(`${API_URL}/api/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        articleId: TEST_ARTICLE_ID,
        author: 'Test User',
        email: 'invalid-email',
        content: 'This should fail'
      })
    });
    const invalidData = await invalidResponse.json();
    console.log(invalidResponse.status === 400 ? '✅' : '❌', 'Validation working:', invalidData.error);
    
    console.log('\n✨ All tests completed!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testComments();
