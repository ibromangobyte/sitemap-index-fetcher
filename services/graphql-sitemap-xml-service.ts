import { GraphQLClient, GraphQLRequestClient } from '@sitecore-jss/sitecore-jss/graphql';
import { IConfiguration } from "../interfaces/IConfiguration";
import { IService } from '../interfaces/IService';
import { SitemapXmlResult, Options } from './graphql-sitemap-xml-result';

/**
 * 
 */
export class SitemapXmlService implements IService {

    private readonly _graphQLClient: GraphQLClient;
    private readonly _graphQLConfig: Configuration<string>;

    /**
     * 
     * @param config 
     */
    public constructor(config: Configuration<string>) {
        this._graphQLConfig = config;
        this._graphQLClient = this.CreateClient();
    }

    /**
     * 
     */
    public async Request<TResult>(itemId?: string, language?: string, templateId?: string): Promise<TResult> {

        return await new SitemapXmlResult(this._graphQLClient,
            new Options(itemId, language, templateId)).ExecuteAsync<TResult>();
    }

    /**
     * Create a GraphQL client used to make HTTP requests.
     * @returns {GraphQLClient} implementation
     */
    protected CreateClient(): GraphQLClient {

        return new GraphQLRequestClient(this._graphQLConfig.endpoint, {
            apiKey: this._graphQLConfig.apikey
        });
    }
}

/**
 * 
 */
export class Configuration<TConfiguration> implements IConfiguration {

    public _items: { [key: string]: TConfiguration } = {};

    /**
     * 
     * @param endpoint 
     * @param apikey 
     * @param siteName 
     */
    public constructor(public endpoint: string, public apikey: string, public siteName?: string) {
    }

    /**
     * 
     * @param obj 
     * @param key 
     * @returns 
     */
    GetItem<TKeyValueCollection, K extends keyof TKeyValueCollection>(obj: TKeyValueCollection, key: K): TKeyValueCollection[K] {
        return obj[key];
    }

    /**
     * 
     * @param obj 
     * @param key 
     * @param value 
     */
    SetItem<TKeyValueCollection, K extends keyof TKeyValueCollection>(obj: TKeyValueCollection, key: K, value: TKeyValueCollection[K]): void {
        obj[key] = value;
    }
}

export default SitemapXmlService;