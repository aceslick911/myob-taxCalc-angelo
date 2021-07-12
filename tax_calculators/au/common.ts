import { RESULT_CONSTANTS } from "../helpers";
import { BracketTaxCalculatorMethod, DataSources,  } from "./types";


export const AnnualIncomeTaxCalculator = (annual_income:number, data_sources:DataSources, BracketTaxCalculator:BracketTaxCalculatorMethod):number => {
  const taxPaidByBracket = data_sources.tax_tables.map((bracket) =>
    BracketTaxCalculator(annual_income, bracket)
  );

  const taxAmountPaidByBracket = taxPaidByBracket.map((taxBracketResult) => {
    switch (taxBracketResult.CODE) {
      case RESULT_CONSTANTS.TAXABLE.CODE:
        return taxBracketResult.ANNUAL_TAX_PAYABLE;

      case RESULT_CONSTANTS.NOT_TAXABLE.CODE:
        return 0;

      default:
        throw new Error(
          `Unexpected code returned for tax calculation ${taxBracketResult.CODE} - ${taxBracketResult.DETAILS}`
        );
    }
  });

  const total_tax_for_annual_income = taxAmountPaidByBracket.reduce(
    (total, bracket_tax) => {
      return total + bracket_tax;
    },
    0
  );

  return total_tax_for_annual_income;
};