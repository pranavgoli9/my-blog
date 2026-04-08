import Link from "next/link";
import { getListItems } from "@/lib/content";
export const dynamic = "force-static";

function formatShortDate(isoDate: string) {
  const m = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return isoDate;
  const [, yyyy, mm, dd] = m;
  return `${Number(mm)}/${Number(dd)}/${yyyy}`;
}

export default function PitchesPage() {
  const pitches = getListItems("pitches");
  return (
    <>
      <header className="listHeader readingPageHeader">
        <h1>Pitches</h1>
        <p className="bio">Almost every pitch I've worked on. Would love feedback or thoughts: pgoli@sas.upenn.edu.</p>
      </header>
      <ul className="list">
        {pitches.map((p) => (
          <li key={p.slug} className="listItem">
            <div className="listItemTitle">
              <h2>
                <Link href={`/pitches/${p.slug}`}>{p.title}</Link>
              </h2>
            </div>
            {p.date ? <p className="metaLine">{formatShortDate(p.date)}</p> : null}
            {p.excerpt ? <p className="excerpt">{p.excerpt}</p> : null}
          </li>
        ))}
      </ul>
    </>
  );
}
