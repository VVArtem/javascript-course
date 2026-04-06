// Function to copy array
function makeCopy(myArr) {
    let newArr = [];
    for (let i = 0; i < myArr.length; i++) {
        newArr.push(myArr[i]);
    }
    return newArr;
}

console.log("--- START TEST ---");

// 1.2.3 DENSE ARRAY
console.log("\n\n1.2.3 DENSE ARRAY TEST\n");

// Make array with 100 random numbers
let array1 = [];
for (let i = 0; i < 100; i++) {
    array1.push(Math.floor(Math.random() * 1000));
}

console.log("Original data:", array1.slice(0, 20));

// Start sorting
SortLib.bubbleSort(makeCopy(array1), true);
SortLib.selectionSort(makeCopy(array1), true);
SortLib.insertionSort(makeCopy(array1), true);
SortLib.shellSort(makeCopy(array1), true);
SortLib.quickSort(makeCopy(array1), true);

// 1.2.4 SPARSE ARRAY (with undefined)
console.log("\n\n1.2.4 SPARSE ARRAY TEST (with undefined)\n");

let array2 = new Array(100);
for (let i = 0; i < 100; i++) {
    // some elements are empty
    if (Math.random() > 0.2) {
        array2[i] = Math.floor(Math.random() * 1000);
    }
}

console.log("Original data:", array2.slice(0, 20));

SortLib.bubbleSort(makeCopy(array2), true);
SortLib.selectionSort(makeCopy(array2), true);
SortLib.insertionSort(makeCopy(array2), true);
SortLib.shellSort(makeCopy(array2), true);
let result = SortLib.quickSort(makeCopy(array2), true);

console.log("\n\nResult (look at the end for undefined):");
console.log(result.slice(75, 100)); // Show last 25 elements