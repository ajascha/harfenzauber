import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Interessante Artikel rund um die Harfe und Harfenmusik",
};

export default async function BlogPage() {
  const posts = await prisma.hfzPost.findMany({
    orderBy: { created_at: "desc" },
  });

  return (
    <div className="container px-4 md:px-6 py-16 max-w-6xl">
      <h1 className="text-4xl font-bold tracking-tighter mb-12">Blog</h1>

      {posts.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            Noch keine Blogbeiträge vorhanden.
          </p>
        </Card>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="overflow-hidden group hover:shadow-lg transition-shadow h-full">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  {post.content && (
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
                      {post.content.substring(0, 150)}...
                    </p>
                  )}
                  <div className="text-xs text-muted-foreground">
                    {post.created_at &&
                      new Intl.DateTimeFormat("de-DE", {
                        dateStyle: "long",
                      }).format(post.created_at)}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
