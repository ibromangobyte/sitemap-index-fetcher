/**
 * 
 */
export interface IConfiguration {

    /**
     * 
     * @param obj 
     * @param key 
     */
    GetItem<TKeyValueCollection, K extends keyof TKeyValueCollection>(obj: TKeyValueCollection, key: K): TKeyValueCollection[K];

    /**
     * 
     * @param obj 
     * @param key 
     * @param value 
     */
    SetItem<TKeyValueCollection, K extends keyof TKeyValueCollection>(obj: TKeyValueCollection, key: K, value: TKeyValueCollection[K]): void;

}

export abstract class Configuration<TConfiguration> implements IConfiguration {

    public _items: { [key: string]: TConfiguration } = {};

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

export default IConfiguration;

