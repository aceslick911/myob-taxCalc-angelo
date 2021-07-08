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
        UNEXPECTED_ERROR: (exception) => ({
            CODE: "ERROR",
            DESC: "An unexpected calculation error occured",
            DETAILS: exception,
        }),
    },
    return_values: {
        TAX_BRACKET_APPLIES: ({ TAX_BRACKET, annual_income, tax_payable_for_bracket }) => ({
            CODE: exports.RESULT_CONSTANTS.TAXABLE.CODE,
            BRACKET: TAX_BRACKET,
            ANNUAL_INCOME: annual_income,
            ANNUAL_TAX_PAYABLE: tax_payable_for_bracket,
        }),
        TAX_BRACKET_DOES_NOT_APPLY: ({ TAX_BRACKET, annual_income }) => ({
            CODE: exports.RESULT_CONSTANTS.NOT_TAXABLE.CODE,
            BRACKET: TAX_BRACKET,
            ANNUAL_INCOME: annual_income,
        })
    },
};
exports.transform = {
    annual_amnt_to_monthly_amnt: ({ annual_amount }) => {
        return annual_amount / 12;
    },
};
