import { ValueOf } from "type-fest";
import { RESULT_CONSTANTS } from "./helpers"
export type TaxCalculator = ()=>{
  CALC: {
    ANNUAL_INCOME_TAX: (annual_income: number, options: {[calculatorOption:string]:any})=>{

    }
  }
}

export type returnCodes = ValueOf<ValueOf<typeof RESULT_CONSTANTS>>;

export type ANNUAL_INCOME = number;

export interface AU2020_201_TaxBracket {
   desc: string, min: number, max: number, tax_income_threshold: number, after_threshold_tax_cents_per_dollar: number }

export interface TaxCalculatorReturn {
  
    CODE:returnCodes,
    DESC?: string,
    DETAILS?: string

    ANNUAL_TAX_PAYABLE?:number
    BRACKET?
  
}