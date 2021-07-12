import { ValueOf } from "type-fest";
import { RESULT_CONSTANTS } from "./helpers";
export declare type TaxCalculatorMethods = {
    ANNUAL_INCOME_TAX: (annual_income: number, options?: {
        [calculatorOption: string]: any;
    }) => number;
};
export declare type TaxCalculator = (isTesting: boolean) => {
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
export interface TaxBracketBase {
    desc: string;
    [property: string]: number | string;
}
export interface TaxCalculatorReturn {
    CODE: ReturnCodes;
    DESC?: string;
    DETAILS?: string;
    ANNUAL_TAX_PAYABLE?: number;
    BRACKET?: any;
    data?: object;
    [additionalMetadata: string]: string | number | object;
}
