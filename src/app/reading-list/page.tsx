import { getListItems } from "@/lib/content";

export const dynamic = "force-static";

export default function ReadingListPage() {
  const items = getListItems("reading-list");

  return (
    <>
      <header className="listHeader">
        <h1>Reading</h1>
        <p className="bio">
          A running list of links and notes I want to remember.
        </p>
      </header>

      <ul className="list">
        {items.map((i) => (
          <li key={i.slug} className="listItem" id={i.slug}>
            <div className="listItemTitle">
              <h2>{i.title}</h2>
              {i.date ? <span className="date">{i.date}</span> : null}
            </div>
            {i.excerpt ? <p className="excerpt">{i.excerpt}</p> : null}
          </li>
        ))}
      </ul>
    </>
  );
}

