"use strict";
exports.__esModule = true;
exports.readTaxTableFromFile = exports.pathToFile = exports.DataTransforms = exports.shared = exports.RESULT_CONSTANTS = void 0;
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
    TAX_TABLE_DATA: {
        CODE: "TAX_TABLE_DATA"
    }
};
exports.shared = {
    errors: {
        UNEXPECTED_ERROR: function (exception) { return ({
            CODE: "ERROR",
            DESC: "An unexpected calculation error occured",
            DETAILS: exception
        }); }
    },
    return_values: {
        TAX_BRACKET_DATA: function (_a) {
            var filePath = _a.filePath, data = _a.data;
            return ({
                CODE: exports.RESULT_CONSTANTS.TAX_TABLE_DATA.CODE,
                filePath: filePath,
                data: data
            });
        },
        TAX_BRACKET_APPLIES: function (_a) {
            var TAX_BRACKET = _a.TAX_BRACKET, annual_income = _a.annual_income, tax_payable_for_bracket = _a.tax_payable_for_bracket;
            return ({
                CODE: exports.RESULT_CONSTANTS.TAXABLE.CODE,
                BRACKET: TAX_BRACKET,
                ANNUAL_INCOME: annual_income,
                ANNUAL_TAX_PAYABLE: tax_payable_for_bracket
            });
        },
        TAX_BRACKET_DOES_NOT_APPLY: function (_a) {
            var TAX_BRACKET = _a.TAX_BRACKET, annual_income = _a.annual_income;
            return ({
                CODE: exports.RESULT_CONSTANTS.NOT_TAXABLE.CODE,
                BRACKET: TAX_BRACKET,
                ANNUAL_INCOME: annual_income
            });
        }
    }
};
exports.DataTransforms = {
    annual_amnt_to_monthly_amnt: function (_a) {
        var annual_amount = _a.annual_amount;
        return annual_amount / 12;
    }
};
// Allows us to use paths relative to the root of the project and not each file
var pathToFile = function (relativePathFromRoot) {
    var isTesting = process.env.NODE_ENV === "test";
    var path = require("path");
    var relativePath = path.resolve(__dirname + (isTesting ? "/../" : "/../../") + relativePathFromRoot);
    return relativePath;
};
exports.pathToFile = pathToFile;
// Read a JSON tax table file
var readTaxTableFromFile = function (relativePathFromRoot) {
    try {
        var fs = require("fs");
        var data = fs.readFileSync(exports.pathToFile(relativePathFromRoot), {
            encoding: "utf8",
            flag: "r"
        });
        return exports.shared.return_values.TAX_BRACKET_DATA({
            filePath: relativePathFromRoot,
            data: JSON.parse(data)
        });
    }
    catch (exception) {
        return exports.shared.errors.UNEXPECTED_ERROR("Error reading file: " + relativePathFromRoot + " - " + exception);
    }
};
exports.readTaxTableFromFile = readTaxTableFromFile;
