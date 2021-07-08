
import { au_fy2020_2021 }  from "../tax_calculators/au/2020_2021"

describe("Australian Tax tables 2020-2021",()=>{
  const tax_calculator = au_fy2020_2021();
  it("should have a CALC function",()=>{
    expect(tax_calculator.CALC).toBeDefined();
  })

  it("should throw if annual_income is not a number ",()=>{
    const nanValue = "abc";
    expect(()=>{
      tax_calculator.CALC.ANNUAL_INCOME_TAX(nanValue as unknown as number);
    }).toThrow();
  })
})