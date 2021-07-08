
import { RESULT_CONSTANTS, shared } from "../../helpers"
import { TaxCalculator, ANNUAL_INCOME, TaxCalculatorReturn, AU2020_201_TaxBracket } from "../../types";

export const au_fy2020_2021: TaxCalculator = () => {



    const data_sources = {
      tax_tables: [
        { desc: "0 to 20k", min: 0, max: 20000, tax_income_threshold: 0, after_threshold_tax_cents_per_dollar: 0 },
        { desc: "20k to 40k", min: 20001, max: 40000, tax_income_threshold: 20000, after_threshold_tax_cents_per_dollar: 10 },
        { desc: "40k to 80k", min: 40001, max: 80000, tax_income_threshold: 40000, after_threshold_tax_cents_per_dollar: 20 },
        { desc: "80k to 180k", min: 80001, max: 20000, tax_income_threshold: 80000, after_threshold_tax_cents_per_dollar: 30 },
        { desc: "over 180k", min: 180001, max: 20000, tax_income_threshold: 1800100, after_threshold_tax_cents_per_dollar: 40 },
      ] as AU2020_201_TaxBracket[]
    };

    const BracketTaxCalculator = (annual_income: ANNUAL_INCOME, bracket):TaxCalculatorReturn => {
      try {
        // "Withholding amounts calculated as a result of applying the above formulas are rounded to the nearest dollar. 
        // Values ending in 50 cents are rounded to the next higher dollar. 
        // Do this rounding directly – that is, do not make a preliminary rounding to the nearest cent." ^1
        // [1] - https://www.ato.gov.au/rates/schedule-1---statement-of-formulas-for-calculating-amounts-to-be-withheld/

        // ECMAScript® 2022 Language Specification - 21.3.2.28 Math.round Math round function ^2
        // [2] - https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-math.round
        const annual_income_rounded = Math.round(annual_income);


        // Check if annual salary value must pay tax on the bracket if it is greater than the minimum bracket value
        const { min, max, tax_income_threshold } = bracket;
        const bracket_applicable_to_annual_income = annual_income >= min;

        if(bracket_applicable_to_annual_income === false){

          return shared.return_values.TAX_BRACKET_DOES_NOT_APPLY({
            TAX_BRACKET:bracket, 
           annual_income,
          }
          );

        } else {

          let dollars_over_threshold = 0;
          if(annual_income >= max) {      
            dollars_over_threshold = max-tax_income_threshold;
          } else {
            dollars_over_threshold = annual_income - tax_income_threshold;
          }
          
          const tax_payable_for_bracket = dollars_over_threshold * (bracket.after_threshold_tax_cents_per_dollar / 100);
          

          return shared.return_values.TAX_BRACKET_APPLIES(            {
            TAX_BRACKET:bracket, 
              annual_income, 
              tax_payable_for_bracket});
        }
      } catch (exception) {
        throw new Error(JSON.stringify(shared.errors.UNEXPECTED_ERROR(exception)));
      }
    }


    const AnnualIncomeTaxCalculator = (annual_income, options)=> {
      const {bracket} = options;
      const taxPaidByBracket = data_sources.tax_tables.map(bracket => BracketTaxCalculator(annual_income, bracket));

      const taxAmountPaidByBracket = taxPaidByBracket.map(taxBracketResult=>{

          switch(taxBracketResult.CODE){
            case RESULT_CONSTANTS.TAXABLE.CODE:
              return taxBracketResult.ANNUAL_TAX_PAYABLE;

            case RESULT_CONSTANTS.NOT_TAXABLE.CODE:
              return 0;

            default:
              throw new Error(`Unexpected code returned for tax calculation ${taxBracketResult.CODE}`);
          }        
        });

      const total_tax_for_annual_income = taxAmountPaidByBracket.reduce((total, bracket_tax)=>{return total+bracket_tax}, 0);

      return total_tax_for_annual_income;
    }


    return {
      CALC: {
        ANNUAL_INCOME_TAX: AnnualIncomeTaxCalculator
      }
    }
  };