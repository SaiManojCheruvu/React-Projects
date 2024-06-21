const isAdmin = (userType?: string): boolean => {
    return userType === "admin"
};
console.log(isAdmin('admin'));
console.log(isAdmin('user'));
console.log(isAdmin());

console.log("Conditional Function call");
var userRole: string = 'admin';
if(userRole && isAdmin(userRole)){
    console.log("The role is admin")
}

console.log("Default Values");
const user: string="";
const displayName: string = user || "Guest";
console.log(displayName);

console.log("Guard undefined or null values with &&");

var greetUser = (user?: {name:string}):void => {
    user && console.log(`Hello, ${user.name}!`);
}
greetUser({name:'Alice'});
greetUser();

console.log("Checking Array Length");
var numbers_ = [1, 2, 3, 4, 5];
numbers_.length && console.log(`First element: ${numbers_[0]}`);

console.log("Undefined or Null check with ??");
var myNum: number = 0;
console.log(myNum??10)

var num: number = 10;
console.log(num??10)


