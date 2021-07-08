import { ValueOf } from "type-fest";
import { RESULT_CONSTANTS } from "./helpers";
export declare type TaxCalculatorMethods = {
    ANNUAL_INCOME_TAX: (annual_income: number, options?: {
        [calculatorOption: string]: any;
    }) => number;
};
export declare type TaxCalculator = () => {
    CALC: TaxCalculatorMethods;
};
export declare type ReturnCodes = ValueOf<ValueOf<typeof RESULT_CONSTANTS>>;
export declare type ANNUAL_INCOME = number;
export declare type Employee = {
    name: string;
    annual_income: number;
};
export declare type taxPayslip = {
    name: string;
    gross_monthly_income: number;
    monthly_income_tax: number;
    net_monthly_income: number;
};
export interface AU2020_201_TaxBracket {
    desc: string;
    min: number;
    max: number;
    tax_income_threshold: number;
    after_threshold_tax_cents_per_dollar: number;
}
export interface TaxCalculatorReturn {
    CODE: ReturnCodes;
    DESC?: string;
    DETAILS?: string;
    ANNUAL_TAX_PAYABLE?: number;
    BRACKET?: any;
    [additionalMetadata: string]: string | number;
}
