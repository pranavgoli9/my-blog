import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type Collection = "posts" | "pitches" | "reading-list";

export type MarkdownFrontmatter = {
  title?: string;
  date?: string; // ISO yyyy-mm-dd recommended
  excerpt?: string;
};

export type ListItem = {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
  readTimeMinutes: number;
};

export type FullItem = ListItem & {
  contentHtml: string;
};

function collectionDir(collection: Collection) {
  return path.join(process.cwd(), "content", collection);
}

function safeString(v: unknown): string | undefined {
  return typeof v === "string" && v.trim().length ? v : undefined;
}

function estimateReadTimeMinutes(markdown: string): number {
  // Simple estimate: 200 wpm, minimum 1 minute.
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ") // ignore fenced code blocks for better estimates
    .replace(/`[^`]*`/g, " ") // ignore inline code
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function listSlugs(collection: Collection): string[] {
  const dir = collectionDir(collection);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir);
  return files
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .sort();
}

export function getAllSlugs(collection: Exclude<Collection, "reading-list">): string[] {
  return listSlugs(collection);
}

export function getListItems(collection: Collection): ListItem[] {
  const dir = collectionDir(collection);
  const slugs = listSlugs(collection);

  const items = slugs.map((slug) => {
    const fullPath = path.join(dir, `${slug}.md`);
    const file = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(file);
    const fm = data as MarkdownFrontmatter;

    return {
      slug,
      title: safeString(fm.title) ?? slug,
      date: safeString(fm.date),
      excerpt: safeString(fm.excerpt),
      readTimeMinutes: estimateReadTimeMinutes(content)
    };
  });

  // Newest first when dates are present; otherwise keep stable order.
  return items.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export async function getFullItem(
  collection: Exclude<Collection, "reading-list">,
  slug: string
): Promise<FullItem> {
  const dir = collectionDir(collection);
  const fullPath = path.join(dir, `${slug}.md`);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);
  const fm = data as MarkdownFrontmatter;

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    title: safeString(fm.title) ?? slug,
    date: safeString(fm.date),
    excerpt: safeString(fm.excerpt),
    readTimeMinutes: estimateReadTimeMinutes(content),
    contentHtml
  };
}

