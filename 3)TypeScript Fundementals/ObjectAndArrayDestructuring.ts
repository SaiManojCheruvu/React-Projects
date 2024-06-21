var numbers: number[] = [1, 2, 3, 4, 5];
console.log("Destructuring an Array");
var [first, second, third, fourth, fifth] = numbers;
console.log(first);
console.log(second);
console.log(third);
console.log(fourth);
console.log(fifth);
console.log("Skipping elements");
var [, , ,fourthAfterSkipping] = numbers;
console.log(fourthAfterSkipping);

interface Address{
    city: string; 
    country: string;
}

interface Person{
    name: string; 
    age: number;
    address: Address;
}
var people: Person[] = [
    {
        name: "John Doe",
        age: 30,
        address: {
            city: "New York",
            country: "USA"
        }
    },
    {
        name: "Jane Doe",
        age: 28,
        address: {
            city: "Los Angeles",
            country: "USA"
        }
    }
];
console.log("Destructuring an object");
people.forEach(person => {
    var {name, age, address:{city, country}} = person;
    console.log(`Name: ${name}, Age: ${age}, City: ${city}, Country: ${country}`);
})




