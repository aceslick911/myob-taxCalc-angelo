#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test_employee = exports.paySlipForEmployee = exports.income_calculators = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const employeeName = argv._[0];
const annual_income = argv._[1];
const helpers_1 = require("./tax_calculators/helpers");
const _2020_2021_1 = require("./tax_calculators/au/2020_2021");
exports.income_calculators = {
    au: {
        fy2020_2021: _2020_2021_1.au_fy2020_2021(process.env.NODE_ENV === 'test')
    }
};
const paySlipForEmployee = (employee, income_calculator) => {
    const { ANNUAL_INCOME_TAX } = income_calculator;
    const employee_annual_tax = ANNUAL_INCOME_TAX(employee.annual_income);
    const gross_monthly_income = helpers_1.DataTransforms.annual_amnt_to_monthly_amnt({
        annual_amount: employee.annual_income
    });
    const monthly_income_tax = helpers_1.DataTransforms.annual_amnt_to_monthly_amnt({
        annual_amount: employee_annual_tax
    });
    const net_monthly_income = gross_monthly_income - monthly_income_tax;
    const output = {
        name: employee.name,
        gross_monthly_income,
        monthly_income_tax,
        net_monthly_income
    };
    return output;
};
exports.paySlipForEmployee = paySlipForEmployee;
exports.test_employee = {
    name: 'Mary Song',
    annual_income: 60000,
    validate: {
        gross_monthly_income: 5000,
        monthly_income_tax: 500,
        net_monthly_income: 4500,
    }
};
const formattedOutput = (payslip) => {
    return `Monthly Payslip for: "${payslip.name}"
Gross Monthly Income: $${payslip.gross_monthly_income}
Monthly Income Tax: $${payslip.monthly_income_tax}
Net Monthly Income: $${payslip.net_monthly_income}`;
};
console.log(formattedOutput(exports.paySlipForEmployee({
    name: employeeName,
    annual_income
}, exports.income_calculators.au.fy2020_2021.CALC)));
