import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
export const dynamic = "force-static";
type Book = {
  title: string;
  author: string;
};
type Section = {
  label: string;
  subtitle?: string;
  books: Book[];
};
function getReadingList() {
  const filePath = path.join(process.cwd(), "content", "reading-list", "markdown-frontmatter.md");
  const file = fs.readFileSync(filePath, "utf8");
  const { data } = matter(file);
  return data as { title: string; sections: Section[] };
}
export default function ReadingListPage() {
  const { sections } = getReadingList();
  return (
    <>
      <header className="listHeader readingPageHeader">
        <h1>Reading List</h1>
        <p className="bio"> What I've read, am reading, and will read.</p>
      </header>
      {sections.map((section) => (
        <section key={section.label} className="section">
          <h2 className="readingSectionLabel">
            {section.label} ({section.books.length})
          </h2>
          {section.subtitle && <p className="metaLine">{section.subtitle}</p>}
          <ul className="list">
            {section.books.map((book, i) => (
              <li key={`${book.title}-${i}`} className="listItem">
                <div className="listItemTitle">
                  <h2>{book.title}</h2>
                </div>
                <p className="metaLine">by {book.author}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
