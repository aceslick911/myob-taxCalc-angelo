"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.au_fy2020_2021 = void 0;
var helpers_1 = require("../../helpers");
var au_fy2020_2021 = function () {
    var data_sources = {
        tax_tables: [
            { desc: "0 to 20k", min: 0, max: 20000, tax_income_threshold: 0, after_threshold_tax_cents_per_dollar: 0 },
            { desc: "20k to 40k", min: 20001, max: 40000, tax_income_threshold: 20000, after_threshold_tax_cents_per_dollar: 10 },
            { desc: "40k to 80k", min: 40001, max: 80000, tax_income_threshold: 40000, after_threshold_tax_cents_per_dollar: 20 },
            { desc: "80k to 180k", min: 80001, max: 20000, tax_income_threshold: 80000, after_threshold_tax_cents_per_dollar: 30 },
            { desc: "over 180k", min: 180001, max: 20000, tax_income_threshold: 1800100, after_threshold_tax_cents_per_dollar: 40 },
        ]
    };
    var BracketTaxCalculator = function (annual_income, bracket) {
        try {
            // "Withholding amounts calculated as a result of applying the above formulas are rounded to the nearest dollar. 
            // Values ending in 50 cents are rounded to the next higher dollar. 
            // Do this rounding directly – that is, do not make a preliminary rounding to the nearest cent." ^1
            // [1] - https://www.ato.gov.au/rates/schedule-1---statement-of-formulas-for-calculating-amounts-to-be-withheld/
            // ECMAScript® 2022 Language Specification - 21.3.2.28 Math.round Math round function ^2
            // [2] - https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-math.round
            var annual_income_rounded = Math.round(annual_income);
            // Check if annual salary value must pay tax on the bracket if it is greater than the minimum bracket value
            var min = bracket.min, max = bracket.max, tax_income_threshold = bracket.tax_income_threshold;
            var bracket_applicable_to_annual_income = annual_income >= min;
            if (bracket_applicable_to_annual_income === false) {
                return helpers_1.shared.return_values.TAX_BRACKET_DOES_NOT_APPLY({
                    TAX_BRACKET: bracket,
                    annual_income: annual_income,
                });
            }
            else {
                var dollars_over_threshold = 0;
                if (annual_income >= max) {
                    dollars_over_threshold = max - tax_income_threshold;
                }
                else {
                    dollars_over_threshold = annual_income - tax_income_threshold;
                }
                var tax_payable_for_bracket = dollars_over_threshold * (bracket.after_threshold_tax_cents_per_dollar / 100);
                return helpers_1.shared.return_values.TAX_BRACKET_APPLIES({
                    TAX_BRACKET: bracket,
                    annual_income: annual_income,
                    tax_payable_for_bracket: tax_payable_for_bracket
                });
            }
        }
        catch (exception) {
            throw new Error(JSON.stringify(helpers_1.shared.errors.UNEXPECTED_ERROR(exception)));
        }
    };
    var AnnualIncomeTaxCalculator = function (annual_income, bracket) {
        var taxPaidByBracket = data_sources.tax_tables.map(function (bracket) { return BracketTaxCalculator(annual_income, bracket); });
        var taxAmountPaidByBracket = taxPaidByBracket.map(function (taxBracketResult) {
            switch (taxBracketResult.CODE) {
                case helpers_1.RESULT_CONSTANTS.TAXABLE.CODE:
                    return taxBracketResult.ANNUAL_TAX_PAYABLE;
                case helpers_1.RESULT_CONSTANTS.NOT_TAXABLE.CODE:
                    return 0;
                default:
                    throw new Error("Unexpected code returned for tax calculation " + taxBracketResult.CODE);
            }
        });
        var total_tax_for_annual_income = taxAmountPaidByBracket.reduce(function (total, bracket_tax) { return total + bracket_tax; }, 0);
        return total_tax_for_annual_income;
    };
    return {
        CALC: {
            ANNUAL_INCOME_TAX: AnnualIncomeTaxCalculator
        }
    };
};
exports.au_fy2020_2021 = au_fy2020_2021;
