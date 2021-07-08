const { expect } = require("@jest/globals");
const{ au_fy2020_2021 }  = require("./index");

describe("Australian Tax tables 2020-2021",()=>{
  const tax_calculator = au_fy2020_2021();
  it("should have a CALC function",()=>{
    expect(tax_calculator.CALC).toBeDefined();
  })
})