# Next.js Markdown Blog

Routes:

- `/` home page
- `/posts` list of posts
- `/posts/[slug]` individual post page

Markdown posts live in `content/posts/*.md`.

## Requirements

- Node.js 18+ (recommended 20+)

## Run locally

```bash
cd nextjs-markdown-blog
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Add a new post

Create a new file in `content/posts/` like `my-post.md`:

```md
---
title: My Post
date: 2026-04-07
excerpt: A short summary used on the posts list.
---

# Hello

Write in Markdown.
```

