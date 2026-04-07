import Link from "next/link";
import { getListItems } from "@/lib/content";

export const dynamic = "force-static";

export default function PitchesPage() {
  const pitches = getListItems("pitches");

  return (
    <>
      <header className="listHeader">
        <h1>Pitches</h1>
        <p>One-pagers and ideas from Markdown in <code>content/pitches</code>.</p>
      </header>

      <ul className="list">
        {pitches.map((p) => (
          <li key={p.slug} className="listItem">
            <div className="listItemTitle">
              <h2>
                <Link href={`/pitches/${p.slug}`}>{p.title}</Link>
              </h2>
              {p.date ? <span className="date">{p.date}</span> : null}
            </div>
            {p.excerpt ? <p className="excerpt">{p.excerpt}</p> : null}
          </li>
        ))}
      </ul>
    </>
  );
}

