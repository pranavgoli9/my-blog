import Link from "next/link";
import { getListItems } from "@/lib/content";
export const dynamic = "force-static";

function formatShortDate(isoDate: string) {
  const m = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return isoDate;
  const [, yyyy, mm, dd] = m;
  return `${Number(mm)}/${Number(dd)}/${yyyy}`;
}

function safeDate(v: unknown): string | undefined {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return typeof v === "string" && v.trim().length ? v : undefined;
}

export default function PostsPage() {
  const posts = getListItems("posts");

  return (
    <>
      <header className="listHeader readingPageHeader">
        <h1>Random Thoughts</h1>
      </header>
      <ul className="list postList">
        {posts.map((p) => {
          const dateStr = safeDate(p.date);
          return (
            <li key={p.slug} className="listItem postItem">
              <div className="listItemTitle">
                <h2>
                  <Link href={`/posts/${p.slug}`}>{p.title}</Link>
                </h2>
              </div>
              <p className="metaLine">
                {dateStr ? formatShortDate(dateStr) : null}
                {dateStr && p.readTimeMinutes ? "  ·  " : null}
                {p.readTimeMinutes ? `${p.readTimeMinutes} min read` : null}
              </p>
              {p.excerpt ? <p className="excerpt">{p.excerpt}</p> : null}
            </li>
          );
        })}
      </ul>
    </>
  );
}
