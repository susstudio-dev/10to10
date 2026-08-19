import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { getDB } from "@/lib/db";
import { pageMetadata } from "@/lib/seo";
import { parseBlocks } from "@/lib/blocks";
import { BlockReveal } from "@/components/block-reveal";

type PageRow = { title: string; content: string; blocks: string; published: number };

async function getPage(slug: string) {
  const db = getDB();
  const page = await db.prepare("SELECT * FROM Page WHERE slug = ?").bind(slug).first<PageRow>();
  if (!page || !page.published) return null;
  return page;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return {};
  return pageMetadata({ title: page.title, description: page.title, path: `/pages/${slug}` });
}

export default async function CustomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  const blocks = parseBlocks(page.blocks);
  // Legacy fallback for pages saved before the block editor existed.
  const legacyParagraphs = blocks.length === 0 ? page.content.split(/\n{2,}/).filter(Boolean) : [];

  return (
    <section className="pt-28 md:pt-32 pb-20 md:pb-28">
      <div className="container max-w-3xl">
        <h1 className="heading-xl">{page.title}</h1>
        <div className="mt-8 space-y-6">
          {blocks.length > 0 &&
            blocks.map((block) => (
              <BlockReveal key={block.id} animation={block.animation}>
                {block.type === "heading" && (
                  <h2 className="heading-lg">{block.text}</h2>
                )}
                {block.type === "paragraph" && (
                  <p className="text-lg text-brand-ink/75 leading-relaxed">{block.text}</p>
                )}
                {block.type === "image" && block.url && (
                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image src={block.url} alt={block.alt} fill unoptimized className="object-cover" />
                  </div>
                )}
              </BlockReveal>
            ))}

          {blocks.length === 0 && legacyParagraphs.length > 0 &&
            legacyParagraphs.map((p, i) => (
              <p key={i} className="text-lg text-brand-ink/75 leading-relaxed">
                {p}
              </p>
            ))}

          {blocks.length === 0 && legacyParagraphs.length === 0 && (
            <p className="text-brand-ink/40">This page has no content yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
