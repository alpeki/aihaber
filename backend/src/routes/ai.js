import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

// Initialize OpenAI (will need API key in .env)
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// POST - Summarize article
router.post('/summarize', async (req, res) => {
  const { content, language = 'tr' } = req.body;
  
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }
  
  if (!openai) {
    return res.status(503).json({ 
      error: 'OpenAI API key not configured',
      message: 'Please add OPENAI_API_KEY to your .env file'
    });
  }
  
  try {
    const systemPrompt = language === 'tr'
      ? 'Sen bir AI haber özetleyicisisin. Haberleri kısa, öz ve anlaşılır şekilde özetle. Maksimum 3 cümle kullan.'
      : 'You are an AI news summarizer. Summarize news articles concisely and clearly. Use maximum 3 sentences.';
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Özet: ${content}` }
      ],
      max_tokens: 150,
      temperature: 0.7
    });
    
    const summary = response.choices[0].message.content;
    
    res.json({
      summary,
      originalLength: content.length,
      summaryLength: summary.length,
      tokensUsed: response.usage.total_tokens
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to summarize',
      message: error.message 
    });
  }
});

// POST - Extract keywords
router.post('/keywords', async (req, res) => {
  const { content, count = 5 } = req.body;
  
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }
  
  if (!openai) {
    return res.status(503).json({ 
      error: 'OpenAI API key not configured'
    });
  }
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { 
          role: 'system', 
          content: `Extract ${count} most important keywords from the text. Return only comma-separated keywords.`
        },
        { role: 'user', content: content }
      ],
      max_tokens: 100,
      temperature: 0.5
    });
    
    const keywords = response.choices[0].message.content
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0);
    
    res.json({ keywords });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to extract keywords',
      message: error.message 
    });
  }
});

// GET - Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    openaiConfigured: !!openai,
    message: openai 
      ? 'OpenAI API is configured and ready'
      : 'OpenAI API key not found. Add OPENAI_API_KEY to .env file'
  });
});

export default router;
