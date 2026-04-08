import Link from "next/link";
import { getListItems } from "@/lib/content";
import { paginate } from "@/lib/pagination";

export const dynamic = "force-static";

export default function PostsPage() {
  const { items: posts, page: currentPage, totalPages } = paginate(getListItems("posts"), 1, 10);

  return (
    <>
      <header className="listHeader readingPageHeader">
        <h1>Recent Posts</h1>
      </header>

      <ul className="list">
        {posts.map((p) => (
          <li key={p.slug} className="listItem">
            <div className="listItemTitle">
              <h2>
                <Link href={`/posts/${p.slug}`}>{p.title}</Link>
              </h2>
            </div>
            {p.date ? <p className="metaLine">{p.date}</p> : null}
            {p.excerpt ? <p className="excerpt">{p.excerpt}</p> : null}
          </li>
        ))}
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

