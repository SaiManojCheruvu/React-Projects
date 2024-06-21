console.log(`Optional chaining is a feature introduced in TypeScript (and JavaScript) that simplifies accessing properties and methods deep within nested objects or arrays when there's a possibility of encountering null or undefined. It helps prevent errors that would otherwise occur if you try to access properties or call methods on null or undefined values. Let's explore how optional chaining works and how to use it effectively.
How Optional Chaining Works
Optional chaining is denoted by the ?. syntax. It allows you to safely access nested properties and methods without having to explicitly check each level of the object for null or undefined.
object?.property?.method():
object is the object you are accessing.
property is the property you want to access within object.
method() is the method you want to call on property, if it exists.
If any intermediate property (property) is null or undefined, the expression short-circuits and returns undefined, avoiding the error.
`);

interface Man{
    name? : string;
    address? : {
        state?: string;
        country: string;
    };
}

const Manoj: Man = {
    name: 'Manoj'
}
console.log(Manoj)
console.log("Address is not given intentionally");
const city = Manoj.address?.state;
const country = Manoj.address?.country;
console.log(city)
console.log(country)
console.log("No error fired, it just printed undefined")
