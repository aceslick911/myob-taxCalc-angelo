/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DataTransforms,
  readTaxTableFromFile,
  pathToFile,
} from "../tax_calculators/helpers";

console.log("RUNN!@#!@#!@#!@#");
describe("helpers", () => {
  it("DataTransforms.annual_amnt_to_monthly_amnt", () => {
    console.log("RUNNaaaaaaa");
    expect(
      DataTransforms.annual_amnt_to_monthly_amnt({ annual_amount: 24 })
    ).toEqual(2);
  });
  it("pathToFile should have non-test folder when not-testing", () => {
    process.env.NODE_ENV = "";
    expect(pathToFile("test")).toEqual(
      require("path").resolve(`${__dirname}/../../test`)
    );
    process.env.NODE_ENV = "test";
  });

});
