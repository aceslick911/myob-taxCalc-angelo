/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const taxVerificationJSONFile = (taxCalcName:string, csv:boolean):string => `./__tests__/TAX_VERIF_${taxCalcName}.${csv?"_csv.json":"json"}`;

export const writeNewTaxVerificationTables = (taxCalcName:string, salariesToTest:any):void => {
  delete salariesToTest.incrementors;
  const fs = require("fs");
  fs.writeFile(
    taxVerificationJSONFile(taxCalcName,false),
    JSON.stringify(salariesToTest, null, 0),
    "utf8",
    () => {
      console.log("NEW DATA WRITTEN");
    }
  );

  const table = [];
  salariesToTest.salaries.forEach((iterator,iteratorIndex)=>{
    
    const iteratorName = `Iteration${iteratorIndex+1}`;

    iterator.forEach((income, row) => {


      const tax = salariesToTest.net_monthly_incomes[iteratorIndex][row];
      const record =  { [`${iteratorName}-Income`]:income,
        [`${iteratorName}-Tax`]:tax, };
      table[row] = table[row]===undefined?record : {
        ...table[row],  
        ...record,
      }
    });

  });
  fs.writeFile(
    taxVerificationJSONFile(taxCalcName, true),
    JSON.stringify(table, null, 0),
    "utf8",
    () => {
      console.log("NEW DATA WRITTEN");
    }
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const readExistingTaxVerificationTables: (taxCalcName:string) => Promise<any> = (taxCalcName:string) =>
  new Promise((resolve, reject) => {
    const fs = require("fs");

    fs.readFile(taxVerificationJSONFile(taxCalcName, false), "utf8", (err, data) => {
      if (err) {
        reject(`Error reading file from disk: ${err}`);
      } else {
        // parse JSON string to JSON object
        resolve(JSON.parse(data));
      }
    });

  });