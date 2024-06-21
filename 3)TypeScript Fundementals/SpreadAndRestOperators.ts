var nums: number[] = [1, 2, 3, 4, 5, 6, 7];
var [first_, second_, ...rest] = nums;
console.log("Rest operator ")
console.log(first_);
console.log(second_);
console.log(rest);
var moreNumbers = [6, 7, 8];
var combinedNumbers = [...nums, ...moreNumbers];
console.log(combinedNumbers);
interface Student{
    id: number;
    name: string;
    age: number;
    major: string;
}
const student: Student = {
    id: 1,
    name: "Alice", 
    age: 20, 
    major: "Computer Science"
};

console.log(student)
console.log("Updating major property")
const updatedStudentMajor = {
    ...student, 
    major: "Data Science"
};
console.log(updatedStudentMajor);

const updatedStudentObjectWithUniversity = {
    ...student,
    university: "University of Massachusetts, Boston"
};
console.log(updatedStudentObjectWithUniversity);


