# MYOB Tech Test

# Setup
Requirements:
 - nodejs
 - yargs installed globally (npm i -g yargs)


# How to run:
```sh
npm i
npm run build
./dist/myob.js "Mary Song" 60000

```


# Lint
```sh
npm run lint

> myob@1.0.0 lint
> eslint myob.ts
```

# Testing
```sh
> myob@1.0.0 test
> jest __tests__/ --no-watchman

 PASS  __tests__/helpers.test.ts
 PASS  __tests__/au_2020_2021.test.ts
 PASS  __tests__/myob.test.ts
  ● Console

    console.log
      10000 table values verified for iterator 0

      at Object.<anonymous> (__tests__/myob.test.ts:109:19)

    console.log
      19 table values verified for iterator 1

      at Object.<anonymous> (__tests__/myob.test.ts:109:19)

-----------------------------------|---------|----------|---------|---------|-------------------
File                               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------------------|---------|----------|---------|---------|-------------------
All files                          |     100 |      100 |     100 |     100 |                   
 myob                              |     100 |      100 |     100 |     100 |                   
  myob.js                          |     100 |      100 |     100 |     100 |                   
 myob/tax_calculators              |     100 |      100 |     100 |     100 |                   
  helpers.ts                       |     100 |      100 |     100 |     100 |                   
 myob/tax_calculators/au/2020_2021 |     100 |      100 |     100 |     100 |                   
  index.ts                         |     100 |      100 |     100 |     100 |                   
-----------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 3 passed, 3 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        2.328 s
Ran all test suites matching /__tests__\//i.
```

# Output example
```sh

> npm run build
added 529 packages, and audited 530 packages in 13s

51 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

> ./dist/myob.js "Mary Song" 60000

Monthly Payslip for: "Mary Song"
Gross Monthly Income: $5000
Monthly Income Tax: $500
Net Monthly Income: $4500
```