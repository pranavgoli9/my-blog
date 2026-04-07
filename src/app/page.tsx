import Link from "next/link";
import { getListItems } from "@/lib/content";

export default function HomePage() {
  const latestPost = getListItems("posts")[0];
  const latestPitch = getListItems("pitches")[0];
  const latestReading = getListItems("reading-list")[0];

  return (
    <>
      <section className="hero">
        <h1>Posts, pitches, and a reading list.</h1>
        <p>
          This is a small Next.js blog that reads Markdown from <code>content/</code> and generates
          pages for posts and pitches, plus a reading list.
        </p>
      </section>

      <section className="grid">
        <div className="card">
          <h2 className="cardTitle">
            <Link href="/posts">Posts</Link>
          </h2>
          <p className="cardMeta">
            {latestPost ? (
              <>
                Latest: <Link href={`/posts/${latestPost.slug}`}>{latestPost.title}</Link>
              </>
            ) : (
              "No posts yet."
            )}
          </p>
        </div>
        <div className="card">
          <h2 className="cardTitle">
            <Link href="/pitches">Pitches</Link>
          </h2>
          <p className="cardMeta">
            {latestPitch ? (
              <>
                Latest: <Link href={`/pitches/${latestPitch.slug}`}>{latestPitch.title}</Link>
              </>
            ) : (
              "No pitches yet."
            )}
          </p>
        </div>
        <div className="card">
          <h2 className="cardTitle">
            <Link href="/reading-list">Reading list</Link>
          </h2>
          <p className="cardMeta">
            {latestReading ? (
              <>
                Latest: <Link href={`/reading-list#${latestReading.slug}`}>{latestReading.title}</Link>
              </>
            ) : (
              "No reading items yet."
            )}
          </p>
        </div>
      </section>
    </>
  );
}

