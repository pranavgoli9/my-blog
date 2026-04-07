import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pranav Goli",
  description: "Writing and reading notes."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="siteHeader">
          <div className="container headerInner">
            <Link className="brand" href="/">
              Pranav Goli
            </Link>
            <nav className="topNav" aria-label="Primary">
              <Link className="topNavLink" href="/posts">
                Posts
              </Link>
              <Link className="topNavLink" href="/pitches">
                Pitches
              </Link>
              <Link className="topNavLink" href="/reading-list">
                Reading List
              </Link>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}

