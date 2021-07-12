import {    
  readTaxTableFromFile, RESULT_CONSTANTS,  
} from "../../helpers";

import {AnnualIncomeTaxCalculator, BracketTaxCalculator} from '../common'

import { ANNUAL_INCOME, TaxCalculator, TaxCalculatorReturn } from "../../types";
import {  DataSource, TaxBracketFile } from "../types";
import { AU2003_2004TaxBracket } from "./types";

export const au_fy2003_2004: TaxCalculator = () => {
  const taxTablesFromFile = readTaxTableFromFile(
    "tax_calculators/au/2003_2004/tax_table.json"
  );

  const data_sources:DataSource<AU2003_2004TaxBracket> = {
    tax_tables: taxTablesFromFile.data as TaxBracketFile<AU2003_2004TaxBracket>,
  };


  const AU2003_2004_BracketTaxCalculator = (
    annual_income: ANNUAL_INCOME,
    bracket:AU2003_2004TaxBracket
  ): TaxCalculatorReturn => {
    
    const taxBeforeStaticAdded = BracketTaxCalculator(annual_income,bracket);
    if(taxBeforeStaticAdded.CODE!==RESULT_CONSTANTS.ERROR.CODE){
      const {ANNUAL_TAX_PAYABLE} = taxBeforeStaticAdded;
      const staticAmountForBracket = bracket.static_tax_amount;
      const taxAfterStaticAdded = {
        ...taxBeforeStaticAdded,
        ANNUAL_TAX_PAYABLE: ANNUAL_TAX_PAYABLE+ staticAmountForBracket,
      }
      return taxAfterStaticAdded;
    }

    return taxBeforeStaticAdded;
  }

  return {
    CALC: {
      ANNUAL_INCOME_TAX: AnnualIncomeTaxCalculator,
      BRACKET_TAX_CALCULATOR: AU2003_2004_BracketTaxCalculator,
      DATA_SOURCES: data_sources,
    },
  };
};
