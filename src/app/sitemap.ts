import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gigizi.vercel.app' // Ganti dengan URL domain Anda nanti
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/database`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/komunitas`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tanya-gizi`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
  ]
}
