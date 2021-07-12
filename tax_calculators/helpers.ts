import { TaxBracketBase, TaxCalculatorReturn } from "./types";

export const RESULT_CONSTANTS = {
  ERROR: {
    CODE: "ERROR",
  },
  NOT_TAXABLE: {
    CODE: "NOT_TAXABLE",
  },
  TAXABLE: {
    CODE: "TAXABLE",
  },
  TAX_TABLE_DATA: {
    CODE: "TAX_TABLE_DATA",
  },
};

export const shared = {
  errors: {
    UNEXPECTED_ERROR: (exception): TaxCalculatorReturn => ({
      CODE: "ERROR",
      DESC: "An unexpected calculation error occured",
      DETAILS: exception,
    }),
  },

  return_values: {
    TAX_BRACKET_DATA: ({
      filePath,
      data,
    }: {
      filePath: string;
      data: TaxBracketBase;
    }): TaxCalculatorReturn => ({
      CODE: RESULT_CONSTANTS.TAX_TABLE_DATA.CODE,
      filePath,
      data,
    }),

    TAX_BRACKET_APPLIES: ({
      TAX_BRACKET,
      annual_income,
      tax_payable_for_bracket,
    }: {
      TAX_BRACKET;
      annual_income: number;
      tax_payable_for_bracket;
    }): TaxCalculatorReturn => ({
      CODE: RESULT_CONSTANTS.TAXABLE.CODE,
      BRACKET: TAX_BRACKET,
      ANNUAL_INCOME: annual_income,
      ANNUAL_TAX_PAYABLE: tax_payable_for_bracket,
    }),

    TAX_BRACKET_DOES_NOT_APPLY: ({
      TAX_BRACKET,
      annual_income,
    }): TaxCalculatorReturn => ({
      CODE: RESULT_CONSTANTS.NOT_TAXABLE.CODE,
      BRACKET: TAX_BRACKET,
      ANNUAL_INCOME: annual_income,
    }),
  },
};

export const DataTransforms = {
  annual_amnt_to_monthly_amnt: ({
    annual_amount,
  }: {
    annual_amount: number;
  }): number => {
    return annual_amount / 12;
  },
};

// Allows us to use paths relative to the root of the project and not each file
export const pathToFile = (relativePathFromRoot: string): string => {
  const isTesting = process.env.NODE_ENV === "test";
  const path = require("path");
  const relativePath = path.resolve(
    __dirname + (isTesting ? "/../" : "/../../") + relativePathFromRoot
  );
  return relativePath;
};

// Read a JSON tax table file
export const readTaxTableFromFile = (
  relativePathFromRoot: string
): TaxCalculatorReturn => {

  const fs = require("fs");

  const data = fs.readFileSync(pathToFile(relativePathFromRoot), {
    encoding: "utf8",
    flag: "r",
  });

  return shared.return_values.TAX_BRACKET_DATA({
    filePath: relativePathFromRoot,
    data: JSON.parse(data),
  });

};
