import Link from "next/link";
import { getLatestWritingItems } from "@/lib/content";

export default function HomePage() {
  const latestWriting = getLatestWritingItems();

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
              {item.date ? <p className="metaLine">{item.date}</p> : null}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

