import Link from "next/link";
import { getLatestWritingItems } from "@/lib/content";

function formatShortDate(isoDate: string) {
  // Expecting yyyy-mm-dd. Format as M/D/YYYY (no leading zeros).
  const m = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return isoDate;
  const [, yyyy, mm, dd] = m;
  return `${Number(mm)}/${Number(dd)}/${yyyy}`;
}

export default function HomePage() {
  const latestWriting = getLatestWritingItems().slice(0, 5);

  return (
    <>
      <section className="bio">
        <p>
          I grew up in Hoover, Alabama, and am currently studying Economics and Computer Science at Penn. In my free time, I enjoy watching soccer, learning about different businesses & industries, playing chess, and reading. 
          Here you'll find some of my work, things I've been thinking about, and what I'm reading. This is mainly to give myself a place to write my thoughts down, but feel free to take a look!
        </p>
        <p>
          Pitches coming soon: Sportradar Group (NASDAQ: SRAD), Acadia Healthcare (NASDAQ: ACHC), Louisiana-Pacific (NYSE: LPX)
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
      </section>
    </>
  );
}

