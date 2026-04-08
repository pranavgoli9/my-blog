import Link from "next/link";
import { getListItems } from "@/lib/content";
export const dynamic = "force-static";
export default function PitchesPage() {
  const pitches = getListItems("pitches");
  return (
    <>
      <header className="listHeader readingPageHeader">
        <h1>Pitches</h1>
        <p className="bio">Investment ideas and stock pitches.</p>
      </header>
      <ul className="list">
        {pitches.map((p) => (
          <li key={p.slug} className="listItem">
            <div className="listItemTitle">
              <h2>
                <Link href={`/pitches/${p.slug}`}>{p.title}</Link>
              </h2>
            </div>
            {p.date ? <p className="metaLine">{p.date}</p> : null}
            {p.excerpt ? <p className="excerpt">{p.excerpt}</p> : null}
          </li>
        ))}
      </ul>
    </>
  );
}
