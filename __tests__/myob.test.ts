import {income_calculators, paySlipForEmployee} from "../myob";

describe("myob",()=>{
  it("Should pass for example case 'Mary Song' with 60k annual salary",()=>{

    const test_employee = {
      name: "Mary Song",
      annual_income: 60000,
    
      validate:{
        gross_monthly_income: 5000,
        monthly_income_tax:500,
        net_monthly_income: 4500,
      }
    }

    expect(paySlipForEmployee(test_employee, income_calculators.au.fy2020_2021.CALC)).toEqual({
      name: 'Mary Song',
      gross_monthly_income: 5000,
      monthly_income_tax: 500,
      net_monthly_income: 4500
    })
  })
})
