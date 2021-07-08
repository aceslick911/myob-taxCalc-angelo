const  RESULT_CONSTANTS = {
  ERROR:{
    CODE:"ERROR"
  },
  NOT_TAXABLE:{
    CODE:"NOT_TAXABLE"
  },
  TAXABLE:{
    CODE:"TAXABLE"
  },
  // TAX_BRACKET_FOUND:{
  //   CODE:"BRACKET_VALID"
  // }
};

module.exports = {

  RESULT_CONSTANTS,

  shared : {
    errors:{
      isError:(CODE)=>CODE === RESULT_CONSTANTS.ERROR.CODE,
      UNEXPECTED_ERROR:(exception)=>({
        CODE: "ERROR",
        DESC: "An unexpected calculation error occured",
        DETAILS: exception,
      }),

      UNABLE_TO_FIND_TAX_BRACKET:(details)=>({
        CODE: "ERROR",
        DESC: "No valid tax bracket was found for requested income",
        DETAILS: details,
      }),
    
    },

    return_values:{
      isTaxable:(CODE)=>CODE === RESULT_CONSTANTS.TAXABLE.CODE,

      // INCOME_SELECTION_VALID:(ANNUAL_INCOME,INCOME_IS_WITHIN_RANGE)=>({
      //   CODE:RESULT_CONSTANTS.ACCEPTED.CODE,
      //   ANNUAL_INCOME,
      //   INCOME_IS_WITHIN_RANGE
      // }),

      TAX_BRACKET_APPLIES:({TAX_BRACKET, annual_income, tax_payable_for_bracket})=>({
        CODE:RESULT_CONSTANTS.TAXABLE.CODE,
        BRACKET: TAX_BRACKET,
        ANNUAL_INCOME:annual_income, 
        ANNUAL_TAX_PAYABLE:tax_payable_for_bracket,
      }),


      TAX_BRACKET_DOES_NOT_APPLY:({TAX_BRACKET, annual_income})=>({
        CODE:RESULT_CONSTANTS.NOT_TAXABLE.CODE,
        BRACKET: TAX_BRACKET,
      })

    },


  },

  transform:{
    annual_amnt_to_monthly_amnt:({annual_amount})=>{
      return annual_amount / 12;
    },
    
  }
  
}