import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.hfzPost.findUnique({
    where: { slug },
  });

  if (!post) {
    return {
      title: "Beitrag nicht gefunden",
    };
  }

  return {
    title: post.title,
    description: post.content
      ? post.content.substring(0, 160) + "..."
      : undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.hfzPost.findUnique({
    where: { slug },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="container px-4 md:px-6 py-16 max-w-4xl">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/blog">← Zurück zum Blog</Link>
      </Button>

      <article>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
          {post.title}
        </h1>

        <div className="text-sm text-muted-foreground mb-8">
          {post.created_at &&
            new Intl.DateTimeFormat("de-DE", {
              dateStyle: "long",
            }).format(post.created_at)}
        </div>

        <div className="prose prose-lg prose-neutral max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content || ""}
          </ReactMarkdown>
        </div>
      </article>

      <div className="mt-12 pt-8 border-t">
        <Button asChild variant="outline">
          <Link href="/blog">← Zurück zum Blog</Link>
        </Button>
      </div>
    </div>
  );
}
