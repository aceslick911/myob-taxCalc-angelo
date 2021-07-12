/* eslint-disable @typescript-eslint/no-unused-vars */
import {RESULT_CONSTANTS, shared, DataTransforms} from "../tax_calculators/helpers"

describe ("helpers",()=>{
  it("DataTransforms.annual_amnt_to_monthly_amnt",()=>{
    expect(DataTransforms.annual_amnt_to_monthly_amnt({annual_amount:24})).toEqual(2);
  })
})