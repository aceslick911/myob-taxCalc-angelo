"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = exports.shared = exports.RESULT_CONSTANTS = void 0;
exports.RESULT_CONSTANTS = {
    ERROR: {
        CODE: "ERROR"
    },
    NOT_TAXABLE: {
        CODE: "NOT_TAXABLE"
    },
    TAXABLE: {
        CODE: "TAXABLE"
    },
};
exports.shared = {
    errors: {
        isError: function (CODE) { return CODE === exports.RESULT_CONSTANTS.ERROR.CODE; },
        UNEXPECTED_ERROR: function (exception) { return ({
            CODE: "ERROR",
            DESC: "An unexpected calculation error occured",
            DETAILS: exception,
        }); },
        UNABLE_TO_FIND_TAX_BRACKET: function (details) { return ({
            CODE: "ERROR",
            DESC: "No valid tax bracket was found for requested income",
            DETAILS: details,
        }); },
    },
    return_values: {
        isTaxable: function (CODE) { return CODE === exports.RESULT_CONSTANTS.TAXABLE.CODE; },
        TAX_BRACKET_APPLIES: function (_a) {
            var TAX_BRACKET = _a.TAX_BRACKET, annual_income = _a.annual_income, tax_payable_for_bracket = _a.tax_payable_for_bracket;
            return ({
                CODE: exports.RESULT_CONSTANTS.TAXABLE.CODE,
                BRACKET: TAX_BRACKET,
                ANNUAL_INCOME: annual_income,
                ANNUAL_TAX_PAYABLE: tax_payable_for_bracket,
            });
        },
        TAX_BRACKET_DOES_NOT_APPLY: function (_a) {
            var TAX_BRACKET = _a.TAX_BRACKET, annual_income = _a.annual_income;
            return ({
                CODE: exports.RESULT_CONSTANTS.NOT_TAXABLE.CODE,
                BRACKET: TAX_BRACKET,
            });
        }
    },
};
exports.transform = {
    annual_amnt_to_monthly_amnt: function (_a) {
        var annual_amount = _a.annual_amount;
        return annual_amount / 12;
    },
};
