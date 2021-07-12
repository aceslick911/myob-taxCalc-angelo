import { RESULT_CONSTANTS, shared } from "../helpers";
import { ANNUAL_INCOME, TaxCalculatorReturn } from "../types";
import { AUTaxBracket, BracketTaxCalculatorMethod, DataSources,  } from "./types";


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

export const BracketTaxCalculator = (
  annual_income: ANNUAL_INCOME,
  bracket:AUTaxBracket
): TaxCalculatorReturn => {
  if (isNaN(annual_income)) {
    //throw new Error(`annual income provided is not a number: ${annual_income}`)
    return shared.errors.UNEXPECTED_ERROR(
      `annual income provided is not a number: ${annual_income}`
    );
  }

  // "Withholding amounts calculated as a result of applying the above formulas are rounded to the nearest dollar.
  // Values ending in 50 cents are rounded to the next higher dollar.
  // Do this rounding directly – that is, do not make a preliminary rounding to the nearest cent." ^1
  // [1] - https://www.ato.gov.au/rates/schedule-1---statement-of-formulas-for-calculating-amounts-to-be-withheld/

  // ECMAScript® 2022 Language Specification - 21.3.2.28 Math.round Math round function ^2
  // [2] - https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-math.round
  const annual_income_rounded = Math.round(annual_income);

  // Check if annual salary value must pay tax on the bracket if it is greater than the minimum bracket value
  const { min, max, tax_income_threshold } = bracket;
  const bracket_applicable_to_annual_income = annual_income_rounded >= min;

  if (bracket_applicable_to_annual_income === false) {
    return shared.return_values.TAX_BRACKET_DOES_NOT_APPLY({
      TAX_BRACKET: bracket,
      annual_income: annual_income_rounded,
    });
  } else {
    let dollars_over_threshold = 0;
    if (annual_income_rounded >= max) {
      dollars_over_threshold = max - tax_income_threshold;
    } else {
      dollars_over_threshold = annual_income_rounded - tax_income_threshold;
    }

    const tax_payable_for_bracket =
      dollars_over_threshold *
      (bracket.after_threshold_tax_cents_per_dollar / 100);

    return shared.return_values.TAX_BRACKET_APPLIES({
      TAX_BRACKET: bracket,
      annual_income: annual_income_rounded,
      tax_payable_for_bracket,
    });
  }
};