import Link from "next/link";
import { getListItems } from "@/lib/content";
import { paginate } from "@/lib/pagination";
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
  const { items: posts, page: currentPage, totalPages } = paginate(getListItems("posts"), 1, 10);
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
      <div className="pagination">
        <div className="pageNumbers" aria-label="Pagination">
          {Array.from({ length: totalPages }, (_, i) => {
            const n = i + 1;
            const href = n === 1 ? "/posts" : `/posts/page/${n}`;
            return (
              <Link
                key={n}
                className="pageLink"
                href={href}
                aria-current={n === currentPage ? "page" : undefined}
              >
                {n}
              </Link>
            );
          })}
        </div>
        {currentPage < totalPages ? (
          <Link className="pageLink" href={`/posts/page/${currentPage + 1}`}>
            Next →
          </Link>
        ) : (
          <span className="pageLink" style={{ color: "var(--faint)" }}>
            Next →
          </span>
        )}
      </div>
    </>
  );
}
