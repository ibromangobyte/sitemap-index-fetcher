
/**
*
*/
interface IOption<out TOptions> {
  readonly [key: string]: TOptions | string | undefined;
}

/**
*
*/
export interface IOptions<TOptions> extends IOption<TOptions> {
  value: TOptions
}

/**
*
*/
export abstract class Options implements IOptions<Options> {

  /**
  *
  */
  public get value(): Options {
    return this;
  }

  [key: string]: Options | string | undefined;
}

export default IOptions;