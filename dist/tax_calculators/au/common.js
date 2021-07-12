"use strict";
exports.__esModule = true;
exports.AnnualIncomeTaxCalculator = void 0;
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
