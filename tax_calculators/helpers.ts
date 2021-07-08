import { ReturnCodes, TaxCalculatorReturn } from "./types";


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
};

  export const shared = {
    errors:{
      isError:(CODE):boolean=>CODE === RESULT_CONSTANTS.ERROR.CODE,
      UNEXPECTED_ERROR:(exception):TaxCalculatorReturn=>({
        CODE: "ERROR",
        DESC: "An unexpected calculation error occured",
        DETAILS: exception,
      }),

      UNABLE_TO_FIND_TAX_BRACKET:(details):TaxCalculatorReturn=>({
        CODE: "ERROR",
        DESC: "No valid tax bracket was found for requested income",
        DETAILS: details,
      }),
    
    },

    return_values :{
      isTaxable:(CODE:ReturnCodes):boolean=>CODE === RESULT_CONSTANTS.TAXABLE.CODE,
      
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
 