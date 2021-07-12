/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const taxVerificationJSONFile = (taxCalcName:string):string => `./__tests__/TAX_VERIF_${taxCalcName}.json`;

export const writeNewTaxVerificationTables = (taxCalcName:string, salariesToTest:any):void => {
  delete salariesToTest.incrementors;
  const fs = require("fs");
  fs.writeFile(
    taxVerificationJSONFile(taxCalcName),
    JSON.stringify(salariesToTest, null, 0),
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

    fs.readFile(taxVerificationJSONFile(taxCalcName), "utf8", (err, data) => {
      if (err) {
        reject(`Error reading file from disk: ${err}`);
      } else {
        // parse JSON string to JSON object
        resolve(JSON.parse(data));
      }
    });

  });