const SortLib = {
    // Helpers

    _handleUndefined(arr) {
        const cleanArr = arr.filter(item => item !== undefined);
        const undefCount = arr.length - cleanArr.length;
        
        if (undefCount > 0) {
            console.warn(`Sparse Array Detected: ${undefCount} undefined elements moved to end.`);
        }
        return { cleanArr, undefCount };
    },

    _restoreUndefined(arr, count) {
        return [...arr, ...new Array(count).fill(undefined)];
    },

    _compare(a, b, isAscending) {
        return isAscending ? a > b : a < b;
    },

    _logStats(name, stats, isAscending) {
        const mode = isAscending ? "Ascending" : "Descending";
        console.log(`%c=== ${name} (${mode}) ===`, "color: #3498db; font-weight: bold;");
        console.log(`Comparisons: ${stats.comp} | Swaps/Moves: ${stats.swap}`);
    },

    // Sorting Algorithms

    bubbleSort(array, isAscending = true) {
        let stats = { comp: 0, swap: 0 };
        let { cleanArr, undefCount } = this._handleUndefined(array);
        const n = cleanArr.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                stats.comp++;
                if (this._compare(cleanArr[j], cleanArr[j + 1], isAscending)) {
                    [cleanArr[j], cleanArr[j + 1]] = [cleanArr[j + 1], cleanArr[j]];
                    stats.swap++;
                }
            }
        }
        this._logStats('Bubble Sort', stats, isAscending);
        return this._restoreUndefined(cleanArr, undefCount);
    },

    selectionSort(array, isAscending = true) {
        let stats = { comp: 0, swap: 0 };
        let { cleanArr, undefCount } = this._handleUndefined(array);
        const n = cleanArr.length;

        for (let i = 0; i < n - 1; i++) {
            let targetIdx = i;
            for (let j = i + 1; j < n; j++) {
                stats.comp++;
                if (this._compare(cleanArr[targetIdx], cleanArr[j], isAscending)) {
                    targetIdx = j;
                }
            }
            if (targetIdx !== i) {
                [cleanArr[i], cleanArr[targetIdx]] = [cleanArr[targetIdx], cleanArr[i]];
                stats.swap++;
            }
        }
        this._logStats('Selection Sort', stats, isAscending);
        return this._restoreUndefined(cleanArr, undefCount);
    },

    insertionSort(array, isAscending = true) {
        let stats = { comp: 0, swap: 0 };
        let { cleanArr, undefCount } = this._handleUndefined(array);
        const n = cleanArr.length;

        for (let i = 1; i < n; i++) {
            let key = cleanArr[i];
            let j = i - 1;
            
            while (j >= 0) {
                stats.comp++;
                if (this._compare(cleanArr[j], key, isAscending)) {
                    cleanArr[j + 1] = cleanArr[j];
                    stats.swap++;
                    j--;
                } else {
                    break; 
                }
            }
            cleanArr[j + 1] = key;
            stats.swap++;
        }
        this._logStats('Insertion Sort', stats, isAscending);
        return this._restoreUndefined(cleanArr, undefCount);
    },

    shellSort(array, isAscending = true) {
        let stats = { comp: 0, swap: 0 };
        let { cleanArr, undefCount } = this._handleUndefined(array);
        const n = cleanArr.length;

        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i++) {
                let temp = cleanArr[i];
                let j = i;
                
                while (j >= gap) {
                    stats.comp++;
                    if (this._compare(cleanArr[j - gap], temp, isAscending)) {
                        cleanArr[j] = cleanArr[j - gap];
                        stats.swap++;
                        j -= gap;
                    } else {
                        break;
                    }
                }
                cleanArr[j] = temp;
                stats.swap++;
            }
        }
        this._logStats('Shell Sort', stats, isAscending);
        return this._restoreUndefined(cleanArr, undefCount);
    },

    quickSort(array, isAscending = true) {
        let stats = { comp: 0, swap: 0 };
        let { cleanArr, undefCount } = this._handleUndefined(array);

        const partition = (arr, left, right) => {
            const pivot = arr[Math.floor((left + right) / 2)];
            let i = left - 1;
            let j = right + 1;

            while (true) {
                do { i++; stats.comp++; } while (isAscending ? arr[i] < pivot : arr[i] > pivot);
                do { j--; stats.comp++; } while (isAscending ? arr[j] > pivot : arr[j] < pivot);
                
                if (i >= j) return j;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                stats.swap++;
            }
        };

        const sort = (arr, left, right) => {
            if (left < right) {
                let p = partition(arr, left, right);
                sort(arr, left, p);
                sort(arr, p + 1, right);
            }
        };

        if (cleanArr.length > 0) sort(cleanArr, 0, cleanArr.length - 1);
        
        this._logStats('Quick Sort (Hoare)', stats, isAscending);
        return this._restoreUndefined(cleanArr, undefCount);
    }
};