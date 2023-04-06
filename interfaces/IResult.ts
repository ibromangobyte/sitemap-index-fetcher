
/**
 * Defines a contract that represents the result of an HTTP endpoint.
 */
export interface IResult {

    /**
     * Write an HTTP response reflecting the result.
     */
    ExecuteAsync<TResult>(): Promise<TResult | TResult[]>;
}

export default IResult;