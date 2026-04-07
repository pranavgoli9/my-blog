import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Markdown Blog",
  description: "Posts, pitches, and a reading list — all in Markdown."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="siteHeader">
          <div className="container headerInner">
            <Link className="brand" href="/">
              Markdown Blog
            </Link>
            <nav className="nav">
              <Link href="/posts">Posts</Link>
              <Link href="/pitches">Pitches</Link>
              <Link href="/reading-list">Reading list</Link>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="siteFooter">
          <div className="container footerInner">
            <span>Built with Next.js + Markdown.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}

