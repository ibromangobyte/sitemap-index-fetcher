
/**
 * Defines a contract that represents the service of an HTTP client.
 * @interface
 */
export interface IService {

    /**
     * Write an HTTP request reflecting the result.
     */
    Request<TResult>(...args: string[]): Promise<TResult>;
}

export default IService;