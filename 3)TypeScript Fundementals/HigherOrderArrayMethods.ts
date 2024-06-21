const vals: number[] = [1, 3, 2, 6, 4, 5, 7, 8]
console.log("Double the numbers in the array using map()");
console.log(vals.map((num)=>num * 2));
console.log("Filter Even numbers in the array using filter()");
console.log(vals.filter((num)=>num%2 === 0));
console.log("Summation of numbers in the array using reduce()");
console.log(vals.reduce((acc, num) => acc + num, 0));
console.log("Sorting an array in different ways");
console.log("Basic sort");
console.log(vals.sort());
console.log("sort in ascending order")
console.log(vals.sort((a, b) => a - b));
console.log("sort in descending order");
console.log(vals.sort((a, b) => b - a));

