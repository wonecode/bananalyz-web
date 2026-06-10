import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents }} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const title = page.data.title;
  const description =
    page.data.description ??
    'Bananalyz documentation — LoL esports predictions Discord bot.';
  const pageUrl = `https://bananalyz.com/docs${slug && slug.length > 0 ? '/' + slug.join('/') : ''}`;

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      url: pageUrl,
      title: `${title} | Bananalyz`,
      description,
      images: [
        {
          url: '/og.png',
          width: 1200,
          height: 630,
          alt: 'Bananalyz Docs',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Bananalyz`,
      description,
      images: ['/og.png'],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}
