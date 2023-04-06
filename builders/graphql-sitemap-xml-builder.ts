/**
 * 
 */
type QueryResponse = {
  search: {
    results: {
      url: {
        hostName: string,
        scheme: string
      },
      sitemapInfo: {
        sitemaps: {
          url: {
            path: string
          }
        }[]
      }
    }[]
  }
}

export type SitemapQueryResponse = {
  url: {
    hostName: string,
    scheme: string
  },
  sitemapInfo: {
    sitemaps: {
      url: {
        path: string
      }
    }[]
  }
}

/**
 * 
 * @param siteInfo 
 * @returns 
 */
export const CreateIndex = (query: QueryResponse): string => {
  const results: SitemapQueryResponse = query?.search?.results?.shift() as SitemapQueryResponse;
  return `<?xml version="1.0" encoding="UTF-8"?>
         <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
           ${results?.sitemapInfo?.sitemaps
      .map(({ url }) => {
        return `
             <sitemap>
                 <loc>${`${results?.url?.scheme}://${results?.url?.hostName}${url?.path}`}</loc>
             </sitemap>
           `;
      })
      .join('')}
         </sitemapindex>
       `;
}

export default CreateIndex;