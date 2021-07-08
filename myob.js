"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./tax_calculators/helpers");
var index_1 = require("./tax_calculators/au/2020_2021/index");
var income_calculators = {
    au: {
        fy2020_2021: index_1.au_fy2020_2021()
    }
};
var paySlipForEmployee = function (employee, income_calculator) {
    var ANNUAL_INCOME_TAX = income_calculator.ANNUAL_INCOME_TAX;
    var employee_annual_tax = ANNUAL_INCOME_TAX(employee.annual_income);
    var gross_monthly_income = helpers_1.transform.annual_amnt_to_monthly_amnt({
        annual_amount: employee.annual_income
    });
    var monthly_income_tax = helpers_1.transform.annual_amnt_to_monthly_amnt({
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
var test_employee = {
    name: "Mary Song",
    annual_income: 60000,
    validate: {
        gross_monthly_income: 5000,
        monthly_income_tax: 500,
        net_monthly_income: 4500,
    }
};
module.exports = {
    paySlipForEmployee: paySlipForEmployee,
    income_calculators: income_calculators
};
