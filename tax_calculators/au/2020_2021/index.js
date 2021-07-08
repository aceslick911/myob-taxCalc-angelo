const { RESULT_CONSTANTS, shared } = require("../../helpers")

module.exports = {

  2020_2021: () => {
    const data_sources = {
      tax_tables: [
        { desc: "0 to 20k", min: 0, max: 20000, min_income_threshold: 0, after_threshold_tax_ptc: 0 },
        { desc: "20k to 40k", min: 20001, max: 40000, min_income_threshold: 0, after_threshold_tax_ptc: 0 },
        { desc: "40k to 80k", min: 40001, max: 80000, min_income_threshold: 0, after_threshold_tax_ptc: 0 },
        { desc: "80k to 180k", min: 0, max: 20000, min_income_threshold: 0, after_threshold_tax_ptc: 0 },
        { desc: "over 180k", min: 0, max: 20000, min_income_threshold: 0, after_threshold_tax_ptc: 0 },
      ]
    };

    const TaxBracketIncomeValidator = (annual_income, bracket) => {
      try {
        // "Withholding amounts calculated as a result of applying the above formulas are rounded to the nearest dollar. 
        // Values ending in 50 cents are rounded to the next higher dollar. 
        // Do this rounding directly – that is, do not make a preliminary rounding to the nearest cent." ^1
        // [1] - https://www.ato.gov.au/rates/schedule-1---statement-of-formulas-for-calculating-amounts-to-be-withheld/

        // ECMAScript® 2022 Language Specification - 21.3.2.28 Math.round Math round function ^2
        // [2] - https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-math.round
        const annual_income_rounded = Math.round(annual_income);


        // Check if number is within min max boundary of tax bracket
        const { min, max } = bracket;
        const annual_income_within_bracket = min >= annual_income &&
          annual_income < max;

        return INCOME_SELECTION_VALID(annual_income, annual_income_within_bracket);
      } catch (exception) {
        throw new Error(shared.errors.UNEXPECTED_ERROR(exception));
      }
    }


    const BracketSelector = (annual_income, bracket) => {

      const taxBracketAccepetanceValues = data_sources.tax_tables.map(bracket => TaxBracketIncomeValidator(annual_income, bracket));

      const acceptedTaxBrackets = taxBracketAccepetanceValues.filter(acceptance_result => shared.return_values.isAccepted(acceptance_result.CODE));

      if (acceptedTaxBrackets.length === 1) {
        return return_values.TAX_BRACKET_FOUND(
          annual_income, acceptedTaxBrackets[0]
        );
      } else {
        if (acceptedTaxBrackets.length === 0) {
          return UNABLE_TO_FIND_TAX_BRACKET(
            'No valid tax bracket found for annual_income of ' + annual_income
          );
        }
      }
      //const
    }

//    const

    return {
      CALC: {
        ANNUAL_INCOME_TEST: BracketSelector
      }
    }



  },

}