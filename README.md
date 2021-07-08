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