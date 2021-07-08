const helpers = require("./helpers");

describe ("helpers",()=>{
  it("transform.annual_amnt_to_monthly_amnt",()=>{
    expect(helpers.transform.annual_amnt_to_monthly_amnt({annual_amount:24})).toEqual(2);
  })
})