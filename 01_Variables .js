
// Declaring a constant variable - cannot be changed later
const accountId = 144553

// Declaring variables using 'let' - can be modified later
let accountEmail = "hackwithsuraj@gmail.com"

// Using 'var' (not recommended) to declare variable
var accountPassword = "12345"

// Declaring variable without let/const/var (not recommended)
// This makes it a global variable automatically
accountCity = "mumbai"

// Declaring variable without initializing it
// Will have value of 'undefined'
let accountState;

// This line would cause an error because accountId is constant
// accountId = 2 // not allowed

// Changing values of previously declared variables
accountEmail = "hws@gmail.com"
accountPassword = "21212121"
accountCity = "New York"

// Printing accountId to console
console.log(accountId);

/*
Prefer not to use var
because of issue in block scope and functional scope
*/

// Using console.table to display all variables in a neat table format
// This will show both variable names and their values
console.table([accountId, accountEmail, accountPassword, accountCity, accountState])

// Best Practices:
// 1. Use 'const' for variables that should not change.
// 2. Use 'let' for variables that will change.
// 3. Avoid using 'var' due to its function scope and hoisting issues.
// 4. Always declare variables with 'let' or 'const' to avoid creating global variables.

// Conclusion:
// Proper variable declaration and usage are crucial for maintaining code readability and preventing bugs.
// Following best practices ensures that your code is robust and less prone to errors.