
// Change this to WRITE or READ the tests validation JSON files
const TEST_MODE: "TEST" | "WRITE_NEW_TAX_VERIFICATION_TABLES" = "TEST";

import { au_fy2020_2021 } from "../tax_calculators/au/2020_2021";
import { paySlipForEmployee } from "../myob";
import { readExistingTaxVerificationTables, writeNewTaxVerificationTables } from "./test_helpers";

describe("Australian Tax tables 2020-2021", () => {
  const taxCalcName = "au_fy2020_2021";

  const tax_calculator = au_fy2020_2021(true);
  it("should have a CALC function", () => {
    expect(tax_calculator.CALC).toBeDefined();
  });

  it("should throw if annual_income is not a number ", () => {
    const nanValue = "abc";
    const { DATA_SOURCES, BRACKET_TAX_CALCULATOR } = tax_calculator.CALC;
    expect(() => {
      tax_calculator.CALC.ANNUAL_INCOME_TAX(nanValue as unknown as number, DATA_SOURCES, BRACKET_TAX_CALCULATOR);
    }).toThrow();
  });

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
          tax_calculator.CALC
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
            comparisonTables = await readExistingTaxVerificationTables(taxCalcName);
          } else {
            writeNewTaxVerificationTables(taxCalcName, salariesToTest);
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
