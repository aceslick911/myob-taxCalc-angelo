
  const income_calculators = {    
   au_fy2020_2021: require("./tax_calculators/au/2020_2021/index")
  }

  console.log(income_calculators)

const paySlipForEmployee = (employee, tax_table) =>{

  //const employee_tax_bracket = au_fy2020_2021

  
  // monthly_income_tax:0,
  // monthly_salary:0,
  // annual_salary:0,
  // annual_tax_rate:"",


  const output = {
    name:"",
    gross_monthly_income:0,
    net_monthly_income:0,
    
  }

  return output;
}