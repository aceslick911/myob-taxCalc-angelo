import { ValueOf } from "type-fest";
import { RESULT_CONSTANTS } from "./helpers"

export type TaxCalculatorMethods = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ANNUAL_INCOME_TAX: (annual_income: number, options?: {[calculatorOption:string]:any})=>number
}

export type TaxCalculator = ()=>{
  CALC: TaxCalculatorMethods
  }


export type ReturnCodes = ValueOf<ValueOf<typeof RESULT_CONSTANTS>>;

export type ANNUAL_INCOME = number;

export type Employee ={
  name: string,
  annual_income:number,
}

export type taxPayslip ={
  name: string,
  gross_monthly_income: number,
  monthly_income_tax: number,
  net_monthly_income: number
}

export interface TaxBracketBase{
  desc: string,
  [property:string]:number|string, // Must be serializable
}


export interface TaxCalculatorReturn {
  
    CODE:ReturnCodes,
    DESC?: string,
    DETAILS?: string

    ANNUAL_TAX_PAYABLE?:number,
    BRACKET?,

    // eslint-disable-next-line @typescript-eslint/ban-types
    data?:object,

    // eslint-disable-next-line @typescript-eslint/ban-types
    [additionalMetadata:string]:string|number|object;
  
}