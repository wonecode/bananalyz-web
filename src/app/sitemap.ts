import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

const BASE_URL = 'https://bananalyz.junglesquad.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  const docPages = source.getPages().map((page) => ({
    url: `${BASE_URL}/docs${page.url === '/' ? '' : page.url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page.url === '/' ? 0.9 : 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...docPages,
  ];
}
