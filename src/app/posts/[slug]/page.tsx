import { notFound } from "next/navigation";
import { getAllSlugs, getFullItem } from "@/lib/content";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllSlugs("posts").map((slug) => ({ slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const post = await getFullItem("posts", slug);
    return (
      <article className="prose">
        <h1>{post.title}</h1>
        {post.date ? <p className="date">{post.date}</p> : null}
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    );
  } catch {
    notFound();
  }
}

