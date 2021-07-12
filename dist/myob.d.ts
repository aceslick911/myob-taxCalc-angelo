#!/usr/bin/env node
import { Employee, TaxCalculatorMethods, taxPayslip } from './tax_calculators/types';
export declare const income_calculators: {
    au: {
        fy2020_2021: {
            CALC: TaxCalculatorMethods;
        };
    };
};
export declare const paySlipForEmployee: (employee: Employee, income_calculator: TaxCalculatorMethods) => taxPayslip;
export declare const commandline_execution: () => void;
