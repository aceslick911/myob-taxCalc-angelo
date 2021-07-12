# MYOB Tech Test

- Angelo Perera

# Setup

Requirements:

- nodejs
- yargs installed globally (npm i -g yargs)
- make (optional)
  - If you have make installed, you can run all these make commands: `make <command>` just run `make` to run all

```makefile

install:
	npm i

lint:
	npm run lint

test: lint
	npm run test

build: install
	npm run build

run: build
	./dist/myob.js "Mary Song" 60000

all: build test run
```

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
npm run test

> myob@1.0.0 test
> jest --config ./jest.config.ts

 PASS  __tests__/myob.test.ts
 PASS  __tests__/helpers.test.ts
 PASS  __tests__/au_common.test.ts
 PASS  __tests__/au_2003_2004.test.ts
  ● Console

    console.log
      10000 table values verified for iterator 0

      at Object.<anonymous> (__tests__/au_2003_2004.test.ts:94:17)

    console.log
      19 table values verified for iterator 1

      at Object.<anonymous> (__tests__/au_2003_2004.test.ts:94:17)

 PASS  __tests__/au_2020_2021.test.ts
  ● Console

    console.log
      10000 table values verified for iterator 0

      at Object.<anonymous> (__tests__/au_2020_2021.test.ts:92:17)

    console.log
      19 table values verified for iterator 1

      at Object.<anonymous> (__tests__/au_2020_2021.test.ts:92:17)

-------------------------------|---------|----------|---------|---------|-------------------
File                           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------------------|---------|----------|---------|---------|-------------------
All files                      |     100 |    97.14 |     100 |     100 |
 myob                          |     100 |    83.33 |     100 |     100 |
  myob.ts                      |     100 |    83.33 |     100 |     100 | 66
 myob/tax_calculators          |     100 |      100 |     100 |     100 |
  helpers.ts                   |     100 |      100 |     100 |     100 |
 myob/tax_calculators/au       |     100 |      100 |     100 |     100 |
  common.ts                    |     100 |      100 |     100 |     100 |
 ...x_calculators/au/2003_2004 |     100 |      100 |     100 |     100 |
  index.ts                     |     100 |      100 |     100 |     100 |
 ...x_calculators/au/2020_2021 |     100 |      100 |     100 |     100 |
  index.ts                     |     100 |      100 |     100 |     100 |
-------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 5 passed, 5 total
Tests:       17 passed, 17 total
Snapshots:   0 total
Time:        3.845 s
```

Example: If you change a value in **tests**/salaryVerificationTable.json (incorrect value detected for a expected tax value):

```sh
npm run test

 FAIL  __tests__/myob.test.ts
  ● Console

    console.log
      19 table values verified for iterator 1

      at Object.<anonymous> (__tests__/myob.test.ts:109:19)

  ● myob › Test against pre-generated tables › Iterator 0

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 1

    @@ -878,11 +878,11 @@
        7975,
        7983.333333333334,
        7991.666666666667,
        8000,
        8008.333333333334,
    -   8016.666666266667,
    +   8016.666666666667,
        8025,
        8033.333333333334,
        8041.666666666667,
        8050,
        8058.333333333334,

      105 |           }
      106 |
    > 107 |           expect(net_monthly_income).toEqual(comparisonTables.net_monthly_incomes[index]);
          |                                      ^
      108 |
      109 |           console.log(`${net_monthly_income.length} table values verified for iterator ${index}` );
      110 |         })

      at Object.<anonymous> (__tests__/myob.test.ts:107:38)
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
Test Suites: 1 failed, 2 passed, 3 total
Tests:       1 failed, 5 passed, 6 total
Snapshots:   0 total
Time:        4.385 s
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

Additional -
You can find these files in the `__test__` folder to verify the monthly tax withheld values:
`npm run csv-gen`

> TAX_VERIF_au_fy2003_2004.csv
> TAX_VERIF_au_fy2003_2004.json
> TAX_VERIF_au_fy2020_2021.csv
> TAX_VERIF_au_fy2020_2021.json
