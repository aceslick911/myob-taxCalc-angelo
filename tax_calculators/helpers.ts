
import { TaxBracketBase, TaxCalculatorReturn } from "./types";


export const  RESULT_CONSTANTS = {
  ERROR:{
    CODE:"ERROR"
  },
  NOT_TAXABLE:{
    CODE:"NOT_TAXABLE"
  },
  TAXABLE:{
    CODE:"TAXABLE"
  },
  TAX_TABLE_DATA:{
    CODE:"TAX_TABLE_DATA"
  }
};

export const shared = {
  errors:{
    UNEXPECTED_ERROR:(exception):TaxCalculatorReturn=>({
      CODE: "ERROR",
      DESC: "An unexpected calculation error occured",
      DETAILS: exception,
    }),
  },

  return_values :{
    TAX_BRACKET_DATA:({
      filePath,
      data,
    }:{ filePath:string,
        data: TaxBracketBase}):TaxCalculatorReturn=>({
      CODE: RESULT_CONSTANTS.TAX_TABLE_DATA.CODE,
      filePath,
      data,
    }),
      
    TAX_BRACKET_APPLIES:({
      TAX_BRACKET, annual_income, tax_payable_for_bracket
    }:{
        TAX_BRACKET, annual_income:number, tax_payable_for_bracket
      }):TaxCalculatorReturn=>({
      CODE:RESULT_CONSTANTS.TAXABLE.CODE,
      BRACKET: TAX_BRACKET,
      ANNUAL_INCOME:annual_income, 
      ANNUAL_TAX_PAYABLE:tax_payable_for_bracket,
    }),


    TAX_BRACKET_DOES_NOT_APPLY:({TAX_BRACKET, annual_income}):TaxCalculatorReturn=>({
      CODE:RESULT_CONSTANTS.NOT_TAXABLE.CODE,
      BRACKET: TAX_BRACKET,
      ANNUAL_INCOME:annual_income, 
    })

  },


};

export const  transform={
  annual_amnt_to_monthly_amnt:({annual_amount}:{annual_amount:number}):number=>{
    return annual_amount / 12;
  },
    
}
 
export const readTaxTableFromFile= (filePath:string):TaxCalculatorReturn=>{
  try{
    const fs = require('fs');
    const path = require('path');

    const resolvedPath = path.resolve(filePath);
    console.log("RESOLVED: ",resolvedPath)

    const data = fs.readFileSync(filePath,
      {encoding:'utf8', flag:'r'});
                
    return shared.return_values.TAX_BRACKET_DATA({
      filePath, 
      data:JSON.parse(data)
    });

  }catch(exception){
    return shared.errors.UNEXPECTED_ERROR(`Error reading file: ${filePath} - ${exception}`);
  }
}