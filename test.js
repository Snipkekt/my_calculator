const evaluate = (expr) => {
    expr = expr.replace(/\s/g, '');
    const tokens = [];
    let i = 0;
    while (i < expr.length) {
        if (/\d|\./.test(expr[i])) {
            let num = '';
            while (i < expr.length && /\d|\./.test(expr[i])) {
                num += expr[i];
                i++;
            }
            tokens.push(parseFloat(num));
        } else if ('+-*/'.includes(expr[i])) {
            tokens.push(expr[i]);
            i++;
        } else {
            throw new Error('Invalid character');
        }
    }
    const stack = [];
    let j = 0;
    while (j < tokens.length) {
        if (tokens[j] === '*' || tokens[j] === '/') {
            const op = tokens[j];
            const left = stack.pop();
            j++;
            const right = tokens[j];
            if (op === '*') {
                stack.push(left * right);
            } else {
                if (right === 0) throw new Error('Division by zero');
                stack.push(left / right);
            }
        } else {
            stack.push(tokens[j]);
        }
        j++;
    }
    if (stack.length === 0) throw new Error('Empty expression');
    let result = stack[0];
    for (let k = 1; k < stack.length; k += 2) {
        const op = stack[k];
        const right = stack[k + 1];
        if (op === '+') {
            result += right;
        } else {
            result -= right;
        }
    }
    return result;
};

// Tests
console.log(evaluate('1+2')); // 3
console.log(evaluate('2*3+1')); // 7
console.log(evaluate('1+2*3')); // 7
console.log(evaluate('10/2')); // 5
console.log(evaluate('1.5+2.5')); // 4
try {
    console.log(evaluate('1/0'));
} catch (e) {
    console.log('Error:', e.message);
}