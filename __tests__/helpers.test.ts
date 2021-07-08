/* eslint-disable @typescript-eslint/no-unused-vars */
import {RESULT_CONSTANTS, shared, transform} from "../tax_calculators/helpers"

describe ("helpers",()=>{
  it("transform.annual_amnt_to_monthly_amnt",()=>{
    expect(transform.annual_amnt_to_monthly_amnt({annual_amount:24})).toEqual(2);
  })
})