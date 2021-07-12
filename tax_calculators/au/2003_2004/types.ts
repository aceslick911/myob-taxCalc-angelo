import { AUTaxBracket } from "../types";

export interface AU2003_2004TaxBracket extends AUTaxBracket {
  desc: string, 
  min: number, 
  max: number, 
  tax_income_threshold: number, 
  static_tax_amount: number,
  after_threshold_tax_cents_per_dollar: number }