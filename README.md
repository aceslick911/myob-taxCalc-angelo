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

# Testing
```sh
npm run test

> myob@1.0.0 test
> jest __tests__/ --no-watchman

 PASS  __tests__/helpers.test.ts
 PASS  __tests__/index.test.ts
 PASS  __tests__/myob.test.ts
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------|---------|----------|---------|---------|-------------------
All files          |     100 |      100 |   77.78 |     100 |
 myob              |     100 |      100 |     100 |     100 |
  myob.js          |     100 |      100 |     100 |     100 |
 ...ax_calculators |     100 |      100 |      60 |     100 |
  helpers.ts       |     100 |      100 |      60 |     100 |
 ...s/au/2020_2021 |     100 |      100 |     100 |     100 |
  index.ts         |     100 |      100 |     100 |     100 |
-------------------|---------|----------|---------|---------|-------------------

Test Suites: 3 passed, 3 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        2.79 s
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