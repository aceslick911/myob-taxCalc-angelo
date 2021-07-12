/* eslint-disable @typescript-eslint/no-empty-function */
import { income_calculators, paySlipForEmployee, commandline_execution } from "../myob";


describe("myob", () => {
  it("Should pass for example case 'Mary Song' with 60k annual salary", () => {
    const test_employee = {
      name: "Mary Song",
      annual_income: 60000,

      validate: {
        gross_monthly_income: 5000,
        monthly_income_tax: 500,
        net_monthly_income: 4500,
      },
    };

    expect(
      paySlipForEmployee(test_employee, income_calculators.au.fy2020_2021.CALC)
    ).toEqual({
      name: "Mary Song",
      gross_monthly_income: 5000,
      monthly_income_tax: 500,
      net_monthly_income: 4500,
    });
  });

  it("Should run not commandline_execution if invalid",()=>{


    const args= [
     
    ]
    process.argv = process.argv.concat(args);

    const log = jest.spyOn(console, "log").mockImplementation(() => {});
        

    commandline_execution();
    expect(log).not.toBeCalled();
  });
  it("Should output calculations from commandline",()=>{
   
    /* eslint-disable @typescript-eslint/no-var-requires */
    const args= [
      'Mary Song',
      '60000'
    ]
    process.argv = process.argv.concat(args);

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const log = jest.spyOn(console, "log").mockImplementation(() => {});

    const expectedOut = `Monthly Payslip for: "Mary Song"
Gross Monthly Income: $5000
Monthly Income Tax: $500
Net Monthly Income: $4500`;

    commandline_execution();
    expect(log).toBeCalledWith(expectedOut);
    

  })

    
});
