#!/usr/bin/env node
"use strict";
exports.__esModule = true;
exports.commandline_execution = exports.paySlipForEmployee = exports.income_calculators = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
var yargs = require('yargs/yargs');
var hideBin = require('yargs/helpers').hideBin;
var executeCommandLine = process.argv[2] !== undefined;
var helpers_1 = require("./tax_calculators/helpers");
var _2020_2021_1 = require("./tax_calculators/au/2020_2021");
exports.income_calculators = {
    au: {
        fy2020_2021: _2020_2021_1.au_fy2020_2021(process.env.NODE_ENV === 'test')
    }
};
var paySlipForEmployee = function (employee, income_calculator) {
    var ANNUAL_INCOME_TAX = income_calculator.ANNUAL_INCOME_TAX, BRACKET_TAX_CALCULATOR = income_calculator.BRACKET_TAX_CALCULATOR, DATA_SOURCES = income_calculator.DATA_SOURCES;
    var employee_annual_tax = ANNUAL_INCOME_TAX(employee.annual_income, DATA_SOURCES, BRACKET_TAX_CALCULATOR);
    var gross_monthly_income = helpers_1.DataTransforms.annual_amnt_to_monthly_amnt({
        annual_amount: employee.annual_income
    });
    var monthly_income_tax = helpers_1.DataTransforms.annual_amnt_to_monthly_amnt({
        annual_amount: employee_annual_tax
    });
    var net_monthly_income = gross_monthly_income - monthly_income_tax;
    var output = {
        name: employee.name,
        gross_monthly_income: gross_monthly_income,
        monthly_income_tax: monthly_income_tax,
        net_monthly_income: net_monthly_income
    };
    return output;
};
exports.paySlipForEmployee = paySlipForEmployee;
var formattedOutput = function (payslip) {
    return "Monthly Payslip for: \"" + payslip.name + "\"\nGross Monthly Income: $" + payslip.gross_monthly_income + "\nMonthly Income Tax: $" + payslip.monthly_income_tax + "\nNet Monthly Income: $" + payslip.net_monthly_income;
};
var commandline_execution = function () {
    var argv = yargs(hideBin(process.argv)).argv;
    var employeeName = argv._[0];
    var annual_income = argv._[1];
    if (isNaN(employeeName) && typeof employeeName === "string" && !isNaN(annual_income))
        console.log(formattedOutput(exports.paySlipForEmployee({
            name: employeeName,
            annual_income: annual_income
        }, exports.income_calculators.au.fy2020_2021.CALC)));
};
exports.commandline_execution = commandline_execution;
// Run CLI commands if present
executeCommandLine && exports.commandline_execution();
