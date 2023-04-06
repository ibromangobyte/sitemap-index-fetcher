import { GetServerSideProps } from "next";
import Head from 'next/head';
import React from "react";
import config from 'temp/config';
import { Options } from '../lib/sitemap-index-fetcher/services/graphql-sitemap-xml-result';
import { SitemapXmlService, Configuration } from '../lib/sitemap-index-fetcher/services/graphql-sitemap-xml-service';
import { CreateIndex } from '../lib/sitemap-index-fetcher/builders/graphql-sitemap-xml-builder';

/**
 * 
 * @param param0 
 * @returns 
 */
export const getServerSideProps: GetServerSideProps = async ({ res }) => {

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

    /**
     * 
     */
    const {itemId, language, templateId} = new Options(
        "EF9D6CD9-03AD-45B6-8417-FEDA73BD4DE4", "en", "512F1276-432B-44EB-8CE8-A7A8BE538773"
    );

    /**
     * 
     */
    const requestSitemap: QueryResponse = await new SitemapXmlService(
        new Configuration (
            config.graphQLEndpoint,
            config.sitecoreApiKey)).Request<QueryResponse>(itemId, language, templateId);

    if (!requestSitemap) {
        return {
            props: { 
                statusCode: '404',
                statusMessage: 'Sitemap NotFound'
            },
        };
    }
    /**
     * 
     */        
    const sitemapIndex: string = CreateIndex(requestSitemap);
    
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.write(sitemapIndex);
    res.end();

    return {
        props: {},
    };
};

const Sitemap = (): JSX.Element => (
    <>
      <Head>
        <title>404: NotFound</title>
      </Head>
      <div style={{ padding: 10 }}>
        <h1>Sitemap not found</h1>
        <p>This page does not exist.</p>
        <a href="/">Go to the Home page</a>
      </div>
    </>
  );

export default Sitemap;