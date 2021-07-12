/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  RESULT_CONSTANTS,
  shared,
  DataTransforms,
  readTaxTableFromFile,
  pathToFile,
} from "../tax_calculators/helpers";

describe("helpers", () => {
  it("DataTransforms.annual_amnt_to_monthly_amnt", () => {
    expect(
      DataTransforms.annual_amnt_to_monthly_amnt({ annual_amount: 24 })
    ).toEqual(2);
  });
  it("pathToFile should have non-test folder when not-testing", () => {
    process.env.NODE_ENV = "";
    expect(pathToFile("test")).toEqual( require("path").resolve(`${__dirname  }/../../test`));
    process.env.NODE_ENV = "test";
  });
  it("readTaxTableFromFile should throw if invalid file path given", () => {
    expect(readTaxTableFromFile("NO_FILE")).toEqual({
      CODE: "ERROR",
      DESC: "An unexpected calculation error occured",
      DETAILS:
        "Error reading file: NO_FILE - Error: ENOENT: no such file or directory, open '/Users/angeloperera/git/myob/NO_FILE'",
    });
  });
});
