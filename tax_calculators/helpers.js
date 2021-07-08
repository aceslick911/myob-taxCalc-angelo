module.exports = {

  RESULT_CONSTANTS : {
    ERROR:{
      CODE:"ERROR"
    },
    NOT_ACCEPTED:{
      CODE:"NOT_ACCEPTED"
    },
    ACCEPTED:{
      CODE:"ACCEPTED"
    },
    TAX_BRACKET_FOUND:{
      CODE:"BRACKET_VALID"
    }
  },

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
      isAccepted:(CODE)=>CODE === RESULT_CONSTANTS.ACCEPTED.CODE,

      INCOME_SELECTION_VALID:(ANNUAL_INCOME,INCOME_IS_WITHIN_RANGE)=>({
        CODE:RESULT_CONSTANTS.ACCEPTED.CODE,
        ANNUAL_INCOME,
        INCOME_IS_WITHIN_RANGE
      }),

      TAX_BRACKET_FOUND:(TAX_BRACKET)=>({
        CODE:RESULT_CONSTANTS.TAX_BRACKET_FOUND.CODE,
        BRACKET: TAX_BRACKET,
      })
    }

  }
  
}