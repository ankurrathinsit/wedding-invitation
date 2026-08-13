# 💍 Engagement Invitation Site

A tiny, dependency-free (plain HTML/CSS/JS) invitation site: animated hero, floating
hearts, a live countdown, an embedded map, and a celebratory hearts burst. No build
step — Amplify serves the files as-is.

## ✏️ Customize

Everything you need to edit is marked with `[...]` placeholders.

| What | File | Where |
|------|------|-------|
| Names, date, invite message, venue, dress code | `index.html` | search for `[` |
| Countdown target date/time | `script.js` | `CONFIG.eventDate` |
| Map location | `index.html` | the `<iframe src="...">` in the Map section |
| Colors / fonts | `styles.css` | `:root` variables at the top |

### Setting the map (no API key needed)
The map uses Google's free embed — **no API key, no billing**. In `index.html`, change
the `q=` value in the iframe `src`:

```
src="https://www.google.com/maps?q=YOUR+VENUE+OR+ADDRESS&output=embed"
```

Use `+` for spaces, e.g. `q=Taj+Lands+End+Mumbai`. That's it.

## 👀 Preview locally

Just open `index.html` in a browser. Or run a local server:

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 🚀 Deploy with AWS Amplify Hosting

1. Commit & push to GitHub:

   ```
   git add .
   git commit -m "Initial engagement site"
   git push origin main
   ```

2. AWS console → **Amplify** → **Create new app** → **Host web app**.
3. Choose **GitHub**, authorize, then pick the `wedding-invitation` repo + `main` branch.
4. Build settings: this repo includes `amplify.yml` (static, no build step) — just accept it.
5. **Save and deploy.** In ~1–2 min you'll get a live HTTPS URL like
   `https://main.xxxxxx.amplifyapp.com` (free).
6. Every future `git push` auto-redeploys. 🎉

### Add a custom domain later
Amplify console → your app → **Domain management** → **Add domain**. Buying via Route 53
gives the smoothest setup (DNS + TLS handled for you).

---
Made with 💕
