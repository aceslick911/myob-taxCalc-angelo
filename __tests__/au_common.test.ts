import { au_fy2020_2021 } from "../tax_calculators/au/2020_2021";
import { BracketTaxCalculator } from "../tax_calculators/au/common";

describe("Australian Tax tables 2020-2021", () => {
  const tax_calculator = au_fy2020_2021(true);
  it("should have a CALC function", () => {
    expect(tax_calculator.CALC).toBeDefined();
  });

  it("should throw if annual_income is not a number ", () => {
    const nanValue = "abc";
    const { DATA_SOURCES, BRACKET_TAX_CALCULATOR } = tax_calculator.CALC;
    expect(() => {
      tax_calculator.CALC.ANNUAL_INCOME_TAX(
        nanValue as unknown as number,
        DATA_SOURCES,
        BRACKET_TAX_CALCULATOR
      );
    }).toThrow();
  });
  it("BracketTaxCalculator should throw exception if invalid number", () => {
    const nanValue = "abc";
    expect(
      BracketTaxCalculator(nanValue as unknown as number, {
        after_threshold_tax_cents_per_dollar: 0,
        desc: "",
        max: 0,
        min: 0,
        tax_income_threshold: 0,
      })
    ).toEqual({
      CODE: "ERROR",
      DESC: "An unexpected calculation error occured",
      DETAILS: "annual income provided is not a number: abc",
    });
  });
});
