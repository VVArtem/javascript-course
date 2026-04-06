console.log("%c=== STARTING PERFORMANCE TESTING ===", "font-size: 16px; color: #2ecc71; font-weight: bold;");

// Utility to ensure we don't mutate the original test data
const cloneArray = (arr) => Array.from(arr);


function runFullSuite(data) {
    const methods = ['bubbleSort', 'selectionSort', 'insertionSort', 'shellSort', 'quickSort'];
    
    methods.forEach(method => {
        // Run ascending sort
        SortLib[method](cloneArray(data), true);
    });

    // Descending QuickSort for comparison
    return SortLib.quickSort(cloneArray(data), false);
}

// 1.2.3 DENSE ARRAY TEST (100 Elements) ---
console.log("\n%c*** 1.2.3 DENSE ARRAY (Fully Populated) ***", "font-size: 14px; background: #34495e; color: white; padding: 2px;");

const denseArray = Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000));

console.log("Original Data (First 10):", denseArray.slice(0, 10).join(', ') + '...');
runFullSuite(denseArray);


// 1.2.4 SPARSE ARRAY TEST (100 Elements) ---
console.log("\n%c*** 1.2.4 SPARSE ARRAY (Contains Empty Slots) ***", "font-size: 14px; background: #34495e; color: white; padding: 2px;");

const sparseArray = new Array(100);
for (let i = 0; i < 100; i++) {
    // 80% chance to fill the slot, 20% remains 'undefined'
    if (Math.random() > 0.2) {
        sparseArray[i] = Math.floor(Math.random() * 1000);
    }
}

const resQuickSparse = runFullSuite(sparseArray);

console.log("Hoare (QuickSort) Result for Sparse Array (Last 25 elements):");
console.log(resQuickSparse.slice(-25));