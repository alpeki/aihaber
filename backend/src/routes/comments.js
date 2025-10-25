import express from 'express';

const router = express.Router();

// In-memory storage (will be replaced with database)
let comments = [];

// GET all comments for an article
router.get('/article/:articleId', (req, res) => {
  const { articleId } = req.params;
  const articleComments = comments.filter(c => c.articleId === articleId && !c.parentId);
  
  // Attach replies to each comment
  const commentsWithReplies = articleComments.map(comment => ({
    ...comment,
    replies: comments.filter(c => c.parentId === comment.id)
  }));
  
  res.json({
    total: commentsWithReplies.length,
    comments: commentsWithReplies
  });
});

// POST new comment
router.post('/', (req, res) => {
  const { articleId, author, email, content, parentId } = req.body;
  
  // Validation
  if (!articleId || !author || !email || !content) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      required: ['articleId', 'author', 'email', 'content']
    });
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  
  // Content length validation
  if (content.length < 10 || content.length > 1000) {
    return res.status(400).json({ 
      error: 'Content must be between 10 and 1000 characters' 
    });
  }
  
  const newComment = {
    id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    articleId,
    author,
    email, // In production, don't expose this
    content,
    parentId: parentId || null,
    createdAt: new Date().toISOString(),
    likes: 0,
    approved: true // Auto-approve for now, add moderation later
  };
  
  comments.push(newComment);
  
  res.status(201).json({
    message: 'Comment posted successfully',
    comment: newComment
  });
});

// PUT like a comment
router.put('/:commentId/like', (req, res) => {
  const { commentId } = req.params;
  const comment = comments.find(c => c.id === commentId);
  
  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  
  comment.likes += 1;
  
  res.json({
    message: 'Comment liked',
    likes: comment.likes
  });
});

// DELETE comment (admin only - simplified for now)
router.delete('/:commentId', (req, res) => {
  const { commentId } = req.params;
  const index = comments.findIndex(c => c.id === commentId);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  
  // Also delete replies
  comments = comments.filter(c => c.id !== commentId && c.parentId !== commentId);
  
  res.json({ message: 'Comment deleted successfully' });
});

// GET comment statistics
router.get('/stats/:articleId', (req, res) => {
  const { articleId } = req.params;
  const articleComments = comments.filter(c => c.articleId === articleId);
  
  res.json({
    total: articleComments.length,
    topLevel: articleComments.filter(c => !c.parentId).length,
    replies: articleComments.filter(c => c.parentId).length,
    totalLikes: articleComments.reduce((sum, c) => sum + c.likes, 0)
  });
});

export default router;
