const fs = require('fs');

function decodeValue(value, base) {
    return parseInt(value, base);
}

function lagrangeInterpolation(x, y) {
    let result = 0;
    const n = x.length;

    for (let i = 0; i < n; i++) {
        let term = y[i];
        let numerator = 1;
        let denominator = 1;

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                numerator *= -x[j];
                denominator *= (x[i] - x[j]);
            }
        }

        term = term * (numerator / denominator);
        result += term;
    }

    // Round the result to the nearest integer
    return Math.round(result);
}

function findConstantTerm(filePath) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const n = data.keys.n;
    const k = data.keys.k;

    const roots = {};
    for (const key in data) {
        if (key !== 'keys') {
            roots[parseInt(key)] = decodeValue(data[key].value, data[key].base);
        }
    }

    const xValues = Object.keys(roots).map(Number);
    const yValues = Object.values(roots);

    return lagrangeInterpolation(xValues, yValues);
}

const constantTerm1 = findConstantTerm('file1.json');
const constantTerm2 = findConstantTerm('file2.json');
console.log('Constant Term 1:', constantTerm1);
console.log('Constant Term 2:', constantTerm2);
