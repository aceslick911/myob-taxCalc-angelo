"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.au_fy2003_2004 = void 0;
var helpers_1 = require("../../helpers");
var common_1 = require("../common");
var au_fy2003_2004 = function () {
    var taxTablesFromFile = helpers_1.readTaxTableFromFile("tax_calculators/au/2003_2004/tax_table.json");
    var data_sources = {
        tax_tables: taxTablesFromFile.data
    };
    var AU2003_2004_BracketTaxCalculator = function (annual_income, bracket) {
        var taxBeforeStaticAdded = common_1.BracketTaxCalculator(annual_income, bracket);
        if (taxBeforeStaticAdded.CODE !== helpers_1.RESULT_CONSTANTS.ERROR.CODE) {
            var ANNUAL_TAX_PAYABLE = taxBeforeStaticAdded.ANNUAL_TAX_PAYABLE;
            var staticAmountForBracket = bracket.static_tax_amount;
            var taxAfterStaticAdded = __assign(__assign({}, taxBeforeStaticAdded), { ANNUAL_TAX_PAYABLE: ANNUAL_TAX_PAYABLE + staticAmountForBracket });
            return taxAfterStaticAdded;
        }
        return taxBeforeStaticAdded;
    };
    return {
        CALC: {
            ANNUAL_INCOME_TAX: common_1.AnnualIncomeTaxCalculator,
            BRACKET_TAX_CALCULATOR: AU2003_2004_BracketTaxCalculator,
            DATA_SOURCES: data_sources
        }
    };
};
exports.au_fy2003_2004 = au_fy2003_2004;
