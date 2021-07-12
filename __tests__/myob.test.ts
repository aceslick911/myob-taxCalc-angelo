const TEST_MODE: "TEST" | "WRITE_NEW_TAX_VERIFICATION_TABLES" = "TEST";
import { income_calculators, paySlipForEmployee, commandline_execution } from "../myob";

import * as myob from "../myob";


const taxVerificationJSONFile = "./__tests__/salaryVerificationTable.json";
const writeNewTaxVerificationTables = (salariesToTest) => {
  delete salariesToTest.incrementors;
  const fs = require("fs");
  fs.writeFile(
    taxVerificationJSONFile,
    JSON.stringify(salariesToTest, null, 0),
    "utf8",
    (done) => {
      console.log("NEW DATA WRITTEN");
    }
  );
};

const readExistingTaxVerificationTables: () => Promise<any> = () =>
  new Promise((resolve, reject) => {
    const fs = require("fs");

    fs.readFile(taxVerificationJSONFile, "utf8", (err, data) => {
      if (err) {
        reject(`Error reading file from disk: ${err}`);
      } else {
        // parse JSON string to JSON object
        resolve(JSON.parse(data));
      }
    });
  });

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

  describe("Test against pre-generated tables", () => {
    const salariesToTest = {
      salaries: [],
      net_monthly_incomes: [],
      startSal: 0,
      maxSal: 1000000,
      incrementors: [
        (last: number) => last + 100,
        (last: number) => (last + 1) * 2,
      ],
    };

    salariesToTest.incrementors.forEach((incrementorFn, index) => {
      let annual_income = salariesToTest.startSal;
      const salaries = [];
      const net_monthly_incomes = [];
      while (annual_income < salariesToTest.maxSal) {
        salaries.push(annual_income);
        annual_income = incrementorFn(annual_income);

        const { net_monthly_income } = paySlipForEmployee(
          {
            name: "",
            annual_income,
          },
          income_calculators.au.fy2020_2021.CALC
        );

        net_monthly_incomes.push(net_monthly_income);

        if (
          isNaN(annual_income) ||
          (salaries.length > 1 &&
            salaries[salaries.length - 1] <= salaries[salaries.length - 2])
        ) {
          throw new Error(
            `Incrementor ${
              index + 1
            } did not increment it's value on iteration - ${
              salaries[salaries.length - 1]
            } - ${salaries[salaries.length - 2]}`
          );
        }
      }
      salariesToTest.salaries.push(salaries);
      salariesToTest.net_monthly_incomes.push(net_monthly_incomes);
    });

    let comparisonTables;

    let initialized = false;

    salariesToTest.net_monthly_incomes.forEach((net_monthly_income, index) => {
      it(`Iterator ${index}`, async () => {
        if (initialized === false) {
          if (TEST_MODE === "TEST") {
            comparisonTables = await readExistingTaxVerificationTables();
          } else {
            writeNewTaxVerificationTables(salariesToTest);
          }
          initialized = true;
        }

        expect(net_monthly_income).toEqual(
          comparisonTables.net_monthly_incomes[index]
        );

        console.log(
          `${net_monthly_income.length} table values verified for iterator ${index}`
        );
      });
    });
  });
});
