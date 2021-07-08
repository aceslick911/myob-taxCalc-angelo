const {transform}= require("./tax_calculators/helpers");

const { au_fy2020_2021 } = require("./tax_calculators/au/2020_2021/index");


const income_calculators = {    
  au:{
    fy2020_2021: au_fy2020_2021()
  }
}
  
const paySlipForEmployee = (employee, income_calculator) =>{

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

const test_employee = {
  name: "Mary Song",
  annual_income: 60000,

  validate:{
    gross_monthly_income: 5000,
    monthly_income_tax:500,
    net_monthly_income: 4500,
  }
}

module.exports = {
  paySlipForEmployee,
  income_calculators
}
