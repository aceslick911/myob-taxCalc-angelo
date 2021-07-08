import { TaxCalculatorReturn } from "./types";
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
};
export declare const shared: {
    errors: {
        UNEXPECTED_ERROR: (exception: any) => TaxCalculatorReturn;
    };
    return_values: {
        TAX_BRACKET_APPLIES: ({ TAX_BRACKET, annual_income, tax_payable_for_bracket }: {
            TAX_BRACKET: any;
            annual_income: number;
            tax_payable_for_bracket: any;
        }) => TaxCalculatorReturn;
        TAX_BRACKET_DOES_NOT_APPLY: ({ TAX_BRACKET, annual_income }: {
            TAX_BRACKET: any;
            annual_income: any;
        }) => TaxCalculatorReturn;
    };
};
export declare const transform: {
    annual_amnt_to_monthly_amnt: ({ annual_amount }: {
        annual_amount: number;
    }) => number;
};