import {  
  shared,
  readTaxTableFromFile,  
} from "../../helpers";

import {AnnualIncomeTaxCalculator} from '../common'

import { TaxCalculator, ANNUAL_INCOME, TaxCalculatorReturn } from "../../types";
import { DataSources, TaxBracketFile } from "../types";

export const au_fy2020_2021: TaxCalculator = () => {
  const taxTablesFromFile = readTaxTableFromFile(
    "tax_calculators/au/2020_2021/tax_table.json"
  );

  const data_sources:DataSources = {
    tax_tables: taxTablesFromFile.data as TaxBracketFile,
  };

  const BracketTaxCalculator = (
    annual_income: ANNUAL_INCOME,
    bracket
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


  return {
    CALC: {
      ANNUAL_INCOME_TAX: AnnualIncomeTaxCalculator,
      BRACKET_TAX_CALCULATOR: BracketTaxCalculator,
      DATA_SOURCES: data_sources,
    },
  };
};
