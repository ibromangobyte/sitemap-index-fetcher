/**
 * 
 * @returns 
 */
export const DefaultQuery = (): string => /* GraphQL */ `
  query Sitemap(
    $itemId: String, 
    $language: String, 
    $templateId: String) {
    search(
      where: {
        AND: [
          { 
            name: "_language", 
            value: $language 
          }
          {
             name: "_templates", 
             value: $templateId, 
             operator: CONTAINS 
          }
          { 
            name: "_path", 
            value: $itemId, 
            operator: CONTAINS 
          }
        ]
      }
    ) {
      results {
        ... on Item {
          url {
            scheme
            hostName
          }
          sitemapInfo: field(name: "sitemapLink") {
            ... on MultilistField {
              sitemaps: targetItems {
                url {
                  path
                }
              }
            }
          }
        }
      }
    }
  }`;
  
export default DefaultQuery;
