import { ANNUAL_INCOME, TaxBracketBase, TaxCalculatorReturn } from "../types";

export interface AU2020_201_TaxBracket extends TaxBracketBase {
  desc: string, 
  min: number, 
  max: number, 
  tax_income_threshold: number, 
  after_threshold_tax_cents_per_dollar: number }

export type TaxBracketFile = AU2020_201_TaxBracket[];


export type DataSources =    {
  tax_tables: TaxBracketFile,
};

export type  BracketTaxCalculatorMethod = (
  annual_income: ANNUAL_INCOME,
  bracket
)=>TaxCalculatorReturn;