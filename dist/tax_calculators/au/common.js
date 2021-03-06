"use strict";
exports.__esModule = true;
exports.BracketTaxCalculator = exports.AnnualIncomeTaxCalculator = void 0;
var helpers_1 = require("../helpers");
var AnnualIncomeTaxCalculator = function (annual_income, data_sources, BracketTaxCalculator) {
    var taxPaidByBracket = data_sources.tax_tables.map(function (bracket) {
        return BracketTaxCalculator(annual_income, bracket);
    });
    var taxAmountPaidByBracket = taxPaidByBracket.map(function (taxBracketResult) {
        switch (taxBracketResult.CODE) {
            case helpers_1.RESULT_CONSTANTS.TAXABLE.CODE:
                return taxBracketResult.ANNUAL_TAX_PAYABLE;
            case helpers_1.RESULT_CONSTANTS.NOT_TAXABLE.CODE:
                return 0;
            default:
                throw new Error("Unexpected code returned for tax calculation " + taxBracketResult.CODE + " - " + taxBracketResult.DETAILS);
        }
    });
    var total_tax_for_annual_income = taxAmountPaidByBracket.reduce(function (total, bracket_tax) {
        return total + bracket_tax;
    }, 0);
    return total_tax_for_annual_income;
};
exports.AnnualIncomeTaxCalculator = AnnualIncomeTaxCalculator;
var BracketTaxCalculator = function (annual_income, bracket) {
    if (isNaN(annual_income)) {
        //throw new Error(`annual income provided is not a number: ${annual_income}`)
        return helpers_1.shared.errors.UNEXPECTED_ERROR("annual income provided is not a number: " + annual_income);
    }
    // "Withholding amounts calculated as a result of applying the above formulas are rounded to the nearest dollar.
    // Values ending in 50 cents are rounded to the next higher dollar.
    // Do this rounding directly – that is, do not make a preliminary rounding to the nearest cent." ^1
    // [1] - https://www.ato.gov.au/rates/schedule-1---statement-of-formulas-for-calculating-amounts-to-be-withheld/
    // ECMAScript® 2022 Language Specification - 21.3.2.28 Math.round Math round function ^2
    // [2] - https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-math.round
    var annual_income_rounded = Math.round(annual_income);
    // Check if annual salary value must pay tax on the bracket if it is greater than the minimum bracket value
    var min = bracket.min, max = bracket.max, tax_income_threshold = bracket.tax_income_threshold;
    var bracket_applicable_to_annual_income = annual_income_rounded >= min;
    if (bracket_applicable_to_annual_income === false) {
        return helpers_1.shared.return_values.TAX_BRACKET_DOES_NOT_APPLY({
            TAX_BRACKET: bracket,
            annual_income: annual_income_rounded
        });
    }
    else {
        var dollars_over_threshold = 0;
        if (annual_income_rounded >= max) {
            dollars_over_threshold = max - tax_income_threshold;
        }
        else {
            dollars_over_threshold = annual_income_rounded - tax_income_threshold;
        }
        var tax_payable_for_bracket = dollars_over_threshold *
            (bracket.after_threshold_tax_cents_per_dollar / 100);
        return helpers_1.shared.return_values.TAX_BRACKET_APPLIES({
            TAX_BRACKET: bracket,
            annual_income: annual_income_rounded,
            tax_payable_for_bracket: tax_payable_for_bracket
        });
    }
};
exports.BracketTaxCalculator = BracketTaxCalculator;
