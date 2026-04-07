import Link from "next/link";
import { getListItems } from "@/lib/content";
import { paginate } from "@/lib/pagination";

export default function HomePage() {
  const latestWriting = paginate(getListItems("posts"), 1, 7).items;

  return (
    <>
      <section className="bio">
        <p>
          I’m Pranav. I write about things I’m learning—mostly product, engineering, and whatever
          I’m curious about that week.
        </p>
      </section>

      <hr className="sectionRule" />

      <section className="section">
        <header className="listHeader">
          <h1>Latest Writing</h1>
        </header>

        <ul className="list">
          {latestWriting.map((p) => (
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

        <p className="excerpt" style={{ marginTop: 18 }}>
          <Link href="/posts">All posts →</Link>
        </p>
      </section>

      <hr className="sectionRule" style={{ marginTop: 22 }} />

      <section className="section" style={{ paddingBottom: 36 }}>
        <header className="listHeader">
          <h1>Reading</h1>
        </header>
        <p className="excerpt">
          A running list of things worth reading. <Link href="/reading-list">See the reading list →</Link>
        </p>
      </section>
    </>
  );
}

