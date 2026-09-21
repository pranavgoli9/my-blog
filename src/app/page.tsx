import Link from "next/link";
import { getLatestWritingItems } from "@/lib/content";

const PAGE_SIZE = 5;

function formatShortDate(isoDate: string) {
  // Expecting yyyy-mm-dd. Format as M/D/YYYY (no leading zeros).
  const m = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return isoDate;
  const [, yyyy, mm, dd] = m;
  return `${Number(mm)}/${Number(dd)}/${yyyy}`;
}

function pageHref(n: number) {
  return n === 1 ? "/" : `/?page=${n}`;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;

  const allItems = getLatestWritingItems();
  const totalPages = Math.max(1, Math.ceil(allItems.length / PAGE_SIZE));
  const requested = Math.floor(Number(page)) || 1;
  const currentPage = Math.min(Math.max(1, requested), totalPages);

  const start = (currentPage - 1) * PAGE_SIZE;
  const latestWriting = allItems.slice(start, start + PAGE_SIZE);

  return (
    <>
      <section className="bio">
        <p>
          I grew up in Hoover, Alabama, and am currently studying Economics and Computer Science at Penn. In my free time, I enjoy watching soccer, learning about different businesses, playing chess and poker, and reading.
          Here you'll find some of my work, things I've been thinking about, and what I'm reading. Please reach out if you have any thoughts or feedback.
        </p>
      </section>

      <hr className="sectionRule" />

      <section className="section">
        <header className="listHeader readingPageHeader">
          <h1>Latest</h1>
        </header>

        <ul className="list">
          {latestWriting.map((item) => (
            <li key={`${item.kind}:${item.slug}`} className="listItem">
              <div className="listItemTitle">
                <h2>
                  <Link href={item.href}>{item.title}</Link>
                </h2>
              </div>
              {item.date ? <p className="metaLine">{formatShortDate(item.date)}</p> : null}
            </li>
          ))}
        </ul>

        {totalPages > 1 && (
          <nav className="pagination" aria-label="Latest pages">
            <div className="pageNumbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={pageHref(n)}
                  scroll={false}
                  className="pageLink"
                  aria-current={n === currentPage ? "page" : undefined}
                >
                  {n}
                </Link>
              ))}
            </div>

            <div className="pageNumbers">
              {currentPage > 1 && (
                <Link href={pageHref(currentPage - 1)} scroll={false} className="pageLink">
                  ← Prev
                </Link>
              )}
              {currentPage < totalPages && (
                <Link href={pageHref(currentPage + 1)} scroll={false} className="pageLink">
                  Next →
                </Link>
              )}
            </div>
          </nav>
        )}
      </section>
    </>
  );
}
