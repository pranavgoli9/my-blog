import Link from "next/link";
import { getListItems } from "@/lib/content";
import { paginate } from "@/lib/pagination";

export const dynamic = "force-static";

const PAGE_SIZE = 10;

export function generateStaticParams() {
  const totalPosts = getListItems("posts").length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / PAGE_SIZE));
  return Array.from({ length: totalPages }, (_, idx) => ({ page: String(idx + 1) }));
}

function pageHref(page: number) {
  return page === 1 ? "/posts" : `/posts/page/${page}`;
}

export default function PostsPaginatedPage({ params }: { params: Promise<{ page: string }> }) {
  // Next passes params synchronously today, but typing as Promise keeps parity with other pages here.
  return (
    <PostsListInner params={params} />
  );
}

async function PostsListInner({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const pageNum = Number(page);

  const all = getListItems("posts");
  const { items, totalPages, page: currentPage } = paginate(all, Number.isFinite(pageNum) ? pageNum : 1, PAGE_SIZE);

  return (
    <>
      <header className="listHeader">
        <h1>Writing</h1>
      </header>

      <ul className="list">
        {items.map((p) => (
          <li key={p.slug} className="listItem">
            <div className="listItemTitle">
              <h2>
                <Link href={`/posts/${p.slug}`}>{p.title}</Link>
              </h2>
              {p.date ? <span className="date">{p.date}</span> : null}
            </div>
            <p className="metaLine">{p.readTimeMinutes} min read</p>
            {p.excerpt ? <p className="excerpt">{p.excerpt}</p> : null}
          </li>
        ))}
      </ul>

      <div className="pagination">
        <div className="pageNumbers" aria-label="Pagination">
          {Array.from({ length: totalPages }, (_, i) => {
            const n = i + 1;
            return (
              <Link
                key={n}
                className="pageLink"
                href={pageHref(n)}
                aria-current={n === currentPage ? "page" : undefined}
              >
                {n}
              </Link>
            );
          })}
        </div>

        {currentPage < totalPages ? (
          <Link className="pageLink" href={pageHref(currentPage + 1)}>
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

