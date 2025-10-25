# Service Worker Setup Guide

## What is a Service Worker?

A service worker is a script that runs in the background, enabling:
- **Offline support**: Users can access cached content without internet
- **Faster loading**: Cached assets load instantly
- **Better performance**: Reduced network requests
- **PWA capabilities**: Install the site as an app

## Current Status

✅ Service worker file created (`service-worker.js`)
⏸️ Service worker is **disabled by default** (requires HTTPS in production)

## How to Enable Service Worker

### Option 1: Enable in Production (Recommended)

The service worker is ready to use. To enable it:

1. **Update `config.js`** (line 47):
   ```javascript
   performance: {
       lazyLoadImages: true,
       lazyLoadThreshold: '200px',
       enableServiceWorker: true,  // Change from false to true
       cacheStrategy: 'networkFirst'
   }
   ```

2. **Add registration code to `script.js`**:
   
   Add this at the end of the file:
   ```javascript
   // Register Service Worker
   if ('serviceWorker' in navigator && CONFIG.performance.enableServiceWorker) {
       window.addEventListener('load', () => {
           navigator.serviceWorker.register('/service-worker.js')
               .then(registration => {
                   console.log('Service Worker registered:', registration);
               })
               .catch(error => {
                   console.log('Service Worker registration failed:', error);
               });
       });
   }
   ```

3. **Commit and push changes**:
   ```bash
   git add .
   git commit -m "Enable service worker for offline support"
   git push
   ```

### Option 2: Test Locally

Service workers require HTTPS. To test locally:

1. Use a local server with HTTPS, or
2. Use `localhost` (service workers work on localhost without HTTPS)

```bash
# Using Python
python -m http.server 8000

# Then visit: http://localhost:8000
```

## What Gets Cached?

The service worker caches:
- HTML pages (index.html, admin.html)
- CSS files (style.css)
- JavaScript files (script.js, i18n.js, etc.)
- Configuration files

External resources (images, fonts) are cached on first visit.

## Cache Strategy

**Network First**: 
- Try to fetch from network
- If network fails, serve from cache
- Good for dynamic content

## Updating the Service Worker

When you update your site:

1. Update the `CACHE_NAME` in `service-worker.js`:
   ```javascript
   const CACHE_NAME = 'ai-news-v2'; // Increment version
   ```

2. The old cache will be automatically cleared
3. New assets will be cached

## Testing

After enabling:

1. **Visit your site** (https://alpeki.github.io/aihaber/)
2. **Open DevTools** (F12)
3. **Go to Application tab** > Service Workers
4. You should see the service worker registered and active
5. **Test offline**: 
   - Check "Offline" in Network tab
   - Refresh the page
   - Site should still load!

## Troubleshooting

### Service Worker Not Registering

**Problem**: Console shows registration error

**Solutions**:
- Ensure you're using HTTPS (or localhost)
- Check browser console for errors
- Verify `service-worker.js` is accessible
- Clear browser cache and try again

### Old Content Showing

**Problem**: Updates not appearing

**Solutions**:
- Increment `CACHE_NAME` version
- Clear site data in DevTools
- Hard refresh (Ctrl+Shift+R)

### Unregister Service Worker

If you need to disable it:

```javascript
navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => registration.unregister());
});
```

## Benefits

Once enabled, users will experience:
- ⚡ **Instant loading** on repeat visits
- 📱 **Offline access** to cached content
- 🚀 **Better performance** scores
- 💾 **Reduced data usage**

## Browser Support

Service workers work in:
- ✅ Chrome/Edge (all versions)
- ✅ Firefox (44+)
- ✅ Safari (11.1+)
- ✅ Mobile browsers (iOS Safari 11.3+, Chrome Android)

## Next Steps

1. Enable service worker in production
2. Test offline functionality
3. Monitor performance improvements
4. Consider adding push notifications (future)

---

**Note**: Service workers are a progressive enhancement. If a browser doesn't support them, the site will work normally without offline capabilities.
