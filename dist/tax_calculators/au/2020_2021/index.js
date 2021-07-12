"use strict";
exports.__esModule = true;
exports.au_fy2020_2021 = void 0;
var helpers_1 = require("../../helpers");
var common_1 = require("../common");
var au_fy2020_2021 = function () {
    var taxTablesFromFile = helpers_1.readTaxTableFromFile("tax_calculators/au/2020_2021/tax_table.json");
    var data_sources = {
        tax_tables: taxTablesFromFile.data
    };
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
    return {
        CALC: {
            ANNUAL_INCOME_TAX: common_1.AnnualIncomeTaxCalculator,
            BRACKET_TAX_CALCULATOR: BracketTaxCalculator,
            DATA_SOURCES: data_sources
        }
    };
};
exports.au_fy2020_2021 = au_fy2020_2021;
