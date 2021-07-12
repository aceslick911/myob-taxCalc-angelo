import {    
  readTaxTableFromFile,  
} from "../../helpers";

import {AnnualIncomeTaxCalculator, BracketTaxCalculator} from '../common'

import { TaxCalculator } from "../../types";
import { DataSources, TaxBracketFile } from "../types";

export const au_fy2020_2021: TaxCalculator = () => {
  const taxTablesFromFile = readTaxTableFromFile(
    "tax_calculators/au/2020_2021/tax_table.json"
  );

  const data_sources:DataSources = {
    tax_tables: taxTablesFromFile.data as TaxBracketFile,
  };

  return {
    CALC: {
      ANNUAL_INCOME_TAX: AnnualIncomeTaxCalculator,
      BRACKET_TAX_CALCULATOR: BracketTaxCalculator,
      DATA_SOURCES: data_sources,
    },
  };
};
