import Link from "next/link";

export default function NotFound() {
  return (
    <div className="prose">
      <h1>Not found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <p>
        Go back <Link href="/">home</Link>.
      </p>
    </div>
  );
}

