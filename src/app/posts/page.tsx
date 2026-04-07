import Link from "next/link";
import { getListItems } from "@/lib/content";

export const dynamic = "force-static";

export default function PostsPage() {
  const posts = getListItems("posts");

  return (
    <>
      <header className="listHeader">
        <h1>Posts</h1>
        <p>All posts from Markdown in <code>content/posts</code>.</p>
      </header>

      <ul className="list">
        {posts.map((p) => (
          <li key={p.slug} className="listItem">
            <div className="listItemTitle">
              <h2>
                <Link href={`/posts/${p.slug}`}>{p.title}</Link>
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

