#!/usr/bin/env node
import { Employee, TaxCalculatorMethods, taxPayslip } from "./tax_calculators/types";
export declare const income_calculators: {
    au: {
        fy2020_2021: {
            CALC: TaxCalculatorMethods;
        };
    };
};
export declare const paySlipForEmployee: (employee: Employee, income_calculator: TaxCalculatorMethods) => taxPayslip;
export declare const test_employee: {
    name: string;
    annual_income: number;
    validate: {
        gross_monthly_income: number;
        monthly_income_tax: number;
        net_monthly_income: number;
    };
};
