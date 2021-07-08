#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const employeeName = argv._[0];
const annual_income = argv._[1];

import {transform} from "./tax_calculators/helpers";

import { au_fy2020_2021 }  from "./tax_calculators/au/2020_2021";
import { Employee,  TaxCalculatorMethods, taxPayslip } from "./tax_calculators/types";


export const income_calculators = {    
  au:{
    fy2020_2021: au_fy2020_2021()
  }
}
  
export const paySlipForEmployee = (employee:Employee, income_calculator:TaxCalculatorMethods):taxPayslip =>{

  const {ANNUAL_INCOME_TAX} = income_calculator;
  const employee_annual_tax  = ANNUAL_INCOME_TAX(employee.annual_income);


  const gross_monthly_income = transform.annual_amnt_to_monthly_amnt({
    annual_amount: employee.annual_income
  });
  const monthly_income_tax = transform.annual_amnt_to_monthly_amnt({
    annual_amount: employee_annual_tax
  });
  
  const net_monthly_income = gross_monthly_income - monthly_income_tax;

  const output = {
    name: employee.name,
    gross_monthly_income,
    monthly_income_tax,
    net_monthly_income
  }

  return output;
}

export const test_employee = {
  name: "Mary Song",
  annual_income: 60000,

  validate:{
    gross_monthly_income: 5000,
    monthly_income_tax:500,
    net_monthly_income: 4500,
  }
}

const formattedOutput = (payslip:taxPayslip)=>{
  console.log(`Monthly Payslip for: "${payslip.name }"
Gross Monthly Income: $${payslip.gross_monthly_income}
Monthly Income Tax: $${payslip.monthly_income_tax}
Net Monthly Income: $${payslip.net_monthly_income}`)
}

console.log(
  formattedOutput(
    paySlipForEmployee({
      name: employeeName,
      annual_income
    }, income_calculators.au.fy2020_2021.CALC)
  )
);