
/**
 * @interface IValidator - 
 */
export interface IValidator {

    /**
     * 
     * @param obj 
     * @param val 
     */
    Valid<TObject>(obj: TObject, val: { [key in keyof TObject]: (obj: TObject) => boolean; }): boolean;

}

/**
 * 
 */
export abstract class Validator implements IValidator {

    /**
     * 
     * @param obj 
     * @param val 
     */
    public Valid<TObject>(obj: TObject, vals: { [key in keyof TObject]: (obj: TObject) => boolean; }): boolean {
        for (const val in vals) {
            if (!vals[val](obj)) {
                return false;
            }
        }
        return true;
    }
}

export default IValidator;