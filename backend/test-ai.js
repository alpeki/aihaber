// Test AI features (requires OPENAI_API_KEY in .env)
import fetch from 'node-fetch';

const API_URL = 'http://localhost:3000';

async function testAI() {
  console.log('🤖 Testing AI Features...\n');
  
  try {
    // Test 1: Health check
    console.log('1️⃣ Checking OpenAI configuration...');
    const healthResponse = await fetch(`${API_URL}/api/ai/health`);
    const health = await healthResponse.json();
    console.log('Status:', health.status);
    console.log('OpenAI Configured:', health.openaiConfigured);
    console.log('Message:', health.message);
    
    if (!health.openaiConfigured) {
      console.log('\n⚠️  OpenAI API key not configured.');
      console.log('To enable AI features:');
      console.log('1. Copy .env.example to .env');
      console.log('2. Add your OpenAI API key: OPENAI_API_KEY=sk-...');
      console.log('3. Restart the server');
      return;
    }
    
    // Test 2: Summarize
    console.log('\n2️⃣ Testing article summarization...');
    const testArticle = `
      Yapay zeka teknolojisinde yaşanan son gelişmeler, sektörü tamamen yeniden şekillendiriyor. 
      OpenAI'ın GPT-4 modeli, doğal dil işleme alanında çığır açan bir başarı elde etti. 
      Bu teknoloji, haber özetleme, içerik üretimi ve müşteri hizmetleri gibi birçok alanda kullanılıyor.
      Uzmanlar, yapay zekanın önümüzdeki yıllarda daha da gelişeceğini ve hayatımızın her alanına 
      entegre olacağını öngörüyor.
    `;
    
    const summarizeResponse = await fetch(`${API_URL}/api/ai/summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: testArticle, language: 'tr' })
    });
    
    const summarizeResult = await summarizeResponse.json();
    console.log('✅ Summary:', summarizeResult.summary);
    console.log('Original length:', summarizeResult.originalLength, 'chars');
    console.log('Summary length:', summarizeResult.summaryLength, 'chars');
    console.log('Tokens used:', summarizeResult.tokensUsed);
    
    // Test 3: Keywords
    console.log('\n3️⃣ Testing keyword extraction...');
    const keywordsResponse = await fetch(`${API_URL}/api/ai/keywords`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: testArticle, count: 5 })
    });
    
    const keywordsResult = await keywordsResponse.json();
    console.log('✅ Keywords:', keywordsResult.keywords.join(', '));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAI();
