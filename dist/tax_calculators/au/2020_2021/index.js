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
    return {
        CALC: {
            ANNUAL_INCOME_TAX: common_1.AnnualIncomeTaxCalculator,
            BRACKET_TAX_CALCULATOR: common_1.BracketTaxCalculator,
            DATA_SOURCES: data_sources
        }
    };
};
exports.au_fy2020_2021 = au_fy2020_2021;
