import { TaxBracketBase, TaxCalculatorReturn } from "./types";
export declare const RESULT_CONSTANTS: {
    ERROR: {
        CODE: string;
    };
    NOT_TAXABLE: {
        CODE: string;
    };
    TAXABLE: {
        CODE: string;
    };
    TAX_TABLE_DATA: {
        CODE: string;
    };
};
export declare const shared: {
    errors: {
        UNEXPECTED_ERROR: (exception: any) => TaxCalculatorReturn;
    };
    return_values: {
        TAX_BRACKET_DATA: ({ filePath, data, }: {
            filePath: string;
            data: TaxBracketBase;
        }) => TaxCalculatorReturn;
        TAX_BRACKET_APPLIES: ({ TAX_BRACKET, annual_income, tax_payable_for_bracket, }: {
            TAX_BRACKET: any;
            annual_income: number;
            tax_payable_for_bracket: any;
        }) => TaxCalculatorReturn;
        TAX_BRACKET_DOES_NOT_APPLY: ({ TAX_BRACKET, annual_income, }: {
            TAX_BRACKET: any;
            annual_income: any;
        }) => TaxCalculatorReturn;
    };
};
export declare const DataTransforms: {
    annual_amnt_to_monthly_amnt: ({ annual_amount, }: {
        annual_amount: number;
    }) => number;
};
export declare const pathToFile: (relativePathFromRoot: string) => string;
export declare const readTaxTableFromFile: (relativePathFromRoot: string) => TaxCalculatorReturn;
