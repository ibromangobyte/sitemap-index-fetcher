import { GraphQLClient } from '@sitecore-jss/sitecore-jss/graphql';
import { DefaultQuery } from '../graphql/graphql-sitemap-xml-query';
import { IOptions } from "../interfaces/IOptions";
import { IResult } from "../interfaces/IResult";


/**
 * 
 */
export type SitemapQueryRequest = {
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
 * Defines a concrete implementation that represents the XML response.
 * @implements {IResult}
 */
export class SitemapXmlResult implements IResult {

    private readonly _client: GraphQLClient;
    private readonly _options: Options;

    /**
     * 
     * @param client 
     * @param options 
     */
    public constructor(client: GraphQLClient, options: Options) {
        this._client = client;
        this._options = options;
    }

    /**
     * 
     * @returns {Promise<TResult>}
     */
    public async ExecuteAsync<TResult>(): Promise<TResult> {
        const result: Promise<SitemapQueryRequest> =
            this._client?.request(DefaultQuery(), {
                itemId: this._options.itemId,
                language: this._options.language,
                templateId: this._options.templateId
            });

        try {
            return result.then((result: SitemapQueryRequest) =>
                result as TResult);
        } catch (exception) {
            return Promise.reject(exception);
        }
    }
}

/**
 * Defines a concrete implementation that represents the options of an HTTP request.
 * @implements {IOptions}
 */
export class Options implements IOptions<Options> {

    /**
     * 
     * @param itemId 
     * @param language 
     * @param templateId 
     */
    public constructor(public itemId?: string, public language?: string, public templateId?: string) {
    }

    /**
    *
    */
    public get value(): Options {
        return this;
    }

    [key: string]: Options | string | undefined;
}

export default SitemapXmlResult;