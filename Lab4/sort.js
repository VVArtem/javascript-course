const SortLib = {
  
    // Wrapper
    _execute(name, array, isAsc, algorithm) {
        const stats = { comp: 0, swap: 0 };
        
        // Handle Sparse Arrays
        const cleanArr = array.filter(item => item !== undefined);
        const undefCount = array.length - cleanArr.length;

        // Run the specific sorting logic
        algorithm(cleanArr, stats);

        // Professional Console Logging
        const mode = isAsc ? "ASC" : "DESC";
        console.log(`%c[${name}] %c${mode} %c| Comps: ${stats.comp} | Swaps: ${stats.swap}`, 
            "color: #3498db; font-weight: bold;", "color: #e67e22;", "color: #7f8c8d;");

        // Restore undefined elements at the end
        return [...cleanArr, ...new Array(undefCount).fill(undefined)];
    },

    // Helper
    _compare(a, b, isAsc) {
        return isAsc ? a > b : a < b;
    },

    // Sorting Methods

    bubbleSort(arr, isAsc = true) {
        return this._execute("Bubble", arr, isAsc, (data, stats) => {
            for (let i = 0; i < data.length - 1; i++) {
                for (let j = 0; j < data.length - i - 1; j++) {
                    stats.comp++;
                    if (this._compare(data[j], data[j + 1], isAsc)) {
                        [data[j], data[j + 1]] = [data[j + 1], data[j]];
                        stats.swap++;
                    }
                }
            }
        });
    },

    selectionSort(arr, isAsc = true) {
        return this._execute("Selection", arr, isAsc, (data, stats) => {
            for (let i = 0; i < data.length - 1; i++) {
                let minIdx = i;
                for (let j = i + 1; j < data.length; j++) {
                    stats.comp++;
                    if (this._compare(data[minIdx], data[j], isAsc)) minIdx = j;
                }
                if (minIdx !== i) {
                    [data[i], data[minIdx]] = [data[minIdx], data[i]];
                    stats.swap++;
                }
            }
        });
    },

    insertionSort(arr, isAsc = true) {
        return this._execute("Insertion", arr, isAsc, (data, stats) => {
            for (let i = 1; i < data.length; i++) {
                let key = data[i], j = i - 1;
                while (j >= 0) {
                    stats.comp++;
                    if (this._compare(data[j], key, isAsc)) {
                        data[j + 1] = data[j];
                        stats.swap++;
                        j--;
                    } else break;
                }
                data[j + 1] = key;
                stats.swap++;
            }
        });
    },

    shellSort(arr, isAsc = true) {
        return this._execute("Shell", arr, isAsc, (data, stats) => {
            for (let gap = Math.floor(data.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
                for (let i = gap; i < data.length; i++) {
                    let temp = data[i], j = i;
                    while (j >= gap) {
                        stats.comp++;
                        if (this._compare(data[j - gap], temp, isAsc)) {
                            data[j] = data[j - gap];
                            stats.swap++;
                            j -= gap;
                        } else break;
                    }
                    data[j] = temp;
                    stats.swap++;
                }
            }
        });
    },

    quickSort(arr, isAsc = true) {
        return this._execute("Quick", arr, isAsc, (data, stats) => {
            const partition = (left, right) => {
                const pivot = data[Math.floor((left + right) / 2)];
                let i = left - 1, j = right + 1;
                while (true) {
                    do { i++; stats.comp++; } while (isAsc ? data[i] < pivot : data[i] > pivot);
                    do { j--; stats.comp++; } while (isAsc ? data[j] > pivot : data[j] < pivot);
                    if (i >= j) return j;
                    [data[i], data[j]] = [data[j], data[i]];
                    stats.swap++;
                }
            };
            const sort = (l, r) => { if (l < r) { let p = partition(l, r); sort(l, p); sort(p + 1, r); } };
            if (data.length > 0) sort(0, data.length - 1);
        });
    }
};