<img src="https://duckmath.org/assets/img/duck.webp" width="60px"  align="left" />


# DuckMath.org — Actually Unblocked Games


**1,000,000+ active users since 2022** — DuckMath.org is a fast, lightweight unblocked games platform focused on accessibility, safety, and a social gaming experience for players everywhere.



> Short description: DuckMath.org hosts 250+ browser games, updates daily, and provides features like leaderboards, an in-site economy (coins), a seasonal battlepass, cloaking tools, and multiple proxy integration options so you can play from a school or work network.

---

## Table of contents

- [About](#about)
- [Games List](#games-list)
- [Key Features](#key-features)
  - [Leaderboard & Score Verification](#leaderboard--score-verification)
  - [Authentication (Supabase)](#authentication-supabase)
  - [Coins & In-Game Store](#coins--in-game-store)
  - [Battlepass & Seasons](#battlepass--seasons)
  - [Games Catalog](#games-catalog)
  - [Proxies & Cloak Mode](#proxies--cloak-mode)
  - [Discord Integration](#discord-integration)
- [How to Deploy (Quick)](#how-to-deploy-quick)
- [Recommended Hosting & Tips](#recommended-hosting--tips)
- [Security & Privacy](#security--privacy)
- [FAQ](#faq)
- [Contributing & Support](#contributing--support)
- [Changelog](#changelog)
- [Contact](#contact)

---

## About

DuckMath.org was built to make high-quality browser games available to everyone — even behind restrictive filters. We combine a large playable catalog with community features (leaderboards, coins, battlepasses) and a small footprint so pages load fast on school and low-end devices.

We update the catalog daily and add new community features regularly — the current site lists \~250+ games across categories like Action, Puzzle, Multiplayer, Retro, and Indie.

## Games List
---

<!-- GAMES_LIST_START -->
Coming Soon!
<!-- GAMES_LIST_END -->

---

## Key Features

### Leaderboard & Score Verification

A fully featured leaderboard lets players submit screenshots and claim high scores. Submissions go through a lightweight verification flow handled by the DuckMath moderation team to keep cheat submissions low and maintain fair competition.

- Upload screenshot proof when submitting a score
- Manual verification queue + automated checks (file metadata, timestamp, visual heuristics)
- Public leaderboard per game and global leaderboard pages

### Authentication (Supabase)

We use Supabase Auth to keep login simple and stateless across our multiple links. This lets players remain logged in across mirror links and proxies without re-authenticating constantly.

- Social logins and email/password available
- Token-based sessions stored safely in secure cookies/local storage
- Lightweight serverless rules for cross-domain session checks

### Coins & In-Game Economy

Players earn coins while playing and can spend them in the site shop for cosmetic items like cursors, backgrounds, badges, and limited-time items.

- Earn coins through gameplay, daily logins, and events
- Spend coins in a cataloged store with previews and ownership
- Transaction logs and rollback support for moderators

### Battlepass & Seasons

Inspired by popular seasonal systems, DuckMath’s Battlepass runs in seasons (current season: **Medieval Times**) where players earn XP to unlock rewards.

- Season XP earned through playing and completing challenges
- Free and premium reward tracks (premium items purchasable with coins)
- Seasonal badges and exclusive cursors

### Games Catalog

A curated library of browser-friendly games (HTML5, WebGL, iframe wrappers for some remote hosts). Popular examples on the site include titles like *Omori Online (unblocked)*, *Deltarune Web*, and Roblox via now\.gg links.

- 250+ games sorted by category and popularity
- Daily updates and featured games carousel
- Search + filters (genre, multiplayer, new, trending)

### Proxies & Cloak Mode

DuckMath integrates multiple trusted proxy backends (holyunblocker, rammerhead, ultra violet web proxy) so players can access content from networks that would otherwise block the target domains.

- Pick different proxy backends to improve reach and reduce downtime
- Cloak Mode: change your browser tab title and favicon to look like a classroom page (example: Google Classroom or about\:blank) for discreet browsing
- Important: Use proxies responsibly and follow local rules and school policies.

### Discord Integration

We embed Discord chat using widgetbot.io so players can join in-site chat without leaving the page or logging into a separate client.

- Chat widget with moderation and channel selection
- Optional linking to the full Discord server

---
<img width="2558" height="1269" alt="Screenshot 2025-08-13 085518" src="https://github.com/user-attachments/assets/c99be6d3-6307-4992-a309-f69e8b053b65" />
<img width="2531" height="1258" alt="Screenshot 2025-08-13 091023" src="https://github.com/user-attachments/assets/96095388-500a-4a81-be09-b96e7da5d361" />


---

## How To Deploy (Quick)

If you want to fork and host DuckMath locally or publicly, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/duckmath.git
cd duckmath
```

2. Run locally for quick testing:

```bash
npx serve
# or, if you prefer python's simple server:
# python3 -m http.server 8080
```

3. Deploy to a static host:

- **Vercel**: `vercel --prod` (recommended for automatic CI/CD)
- **Cloudflare Pages**: connect GitHub repo and set the build to `npm run build` if you have a build step, or use direct static deploy.
- **GitHub Pages**: publish the `main` branch or the `gh-pages` folder.

4. Configure DNS or custom domains (if desired), enable HTTPS, and test proxies and auth flows.

---

## Recommended Hosting & Tips

- Use an edge/CDN backed host (Vercel, Cloudflare Pages, Netlify) to keep latency low for players in different regions.
- Enable Brotli/Gzip compression and long cache headers for static assets to improve load times.
- Use a lightweight serverless function when you need to proxy auth or handle leaderboard submissions.

## Security & Privacy

- We store minimal PII. Authentication uses Supabase and secure tokens.
- Uploaded leaderboard images are scanned automatically and reviewed by moderators.
- Proxies are third-party services — review their policies and use them at your own risk.

---

## Contributing & Support

We love contributions. If you want to help:

- Star the repository to show support
- Open issues for bugs or feature requests
- Submit PRs for new games, UI improvements, or moderation tools

If you want to support the project financially or with hosting, reach out through the repo or Discord server.

---

## Socials
Contact us on any of these!

- Github [github/duckmath](https://github.com/duckmath/duckmath.github.io)
- Discord: [The Duck Pond](https://discord.gg/aMUVSARrEy)
- Tiktok: [rockyf2p](https://www.tiktok.com/@rockyf2p)
- Youtube [duckmath yt](https://www.youtube.com/@duckmathgames)
- Instagram [duckmath insta](https://www.instagram.com/duckmath/reels/)
