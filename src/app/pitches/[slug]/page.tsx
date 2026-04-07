import { notFound } from "next/navigation";
import { getAllSlugs, getFullItem } from "@/lib/content";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllSlugs("pitches").map((slug) => ({ slug }));
}

export default async function PitchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const pitch = await getFullItem("pitches", slug);
    return (
      <article className="prose">
        <h1>{pitch.title}</h1>
        {pitch.date ? <p className="date">{pitch.date}</p> : null}
        <div dangerouslySetInnerHTML={{ __html: pitch.contentHtml }} />
      </article>
    );
  } catch {
    notFound();
  }
}

