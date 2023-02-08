# Test automation of ecommerce application using Playwright

### Setup & Installation

1. Clone git repository or download zip file
2. Go to playwright-ecommerce folder
3. run command as "npm install" to install all dependencies
4. "npx playwright install" to install all browsers for playwright testing

### Run test (default chromium)

1. run all e2e tests "npm run e2e"
2. run all visual tests "npm run visual"
3. run only login test "npm run login"
4. run only checkout test "npm run checkout"

note: you can run test on different browsers. lets say to run all test on firefox
"npx playwright test --headed --browser=firefox"
