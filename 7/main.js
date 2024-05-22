const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function longestValidParentheses(s) {
    let stack = [];
    stack.push(-1); // 초기값으로 -1을 스택에 넣음
    let maxLength = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(i); // '('의 인덱스를 스택에 넣음
        } else {
            stack.pop(); // ')'의 경우 스택에서 pop
            if (stack.length === 0) {
                stack.push(i); // 스택이 비었으면 현재 인덱스를 스택에 넣음
            } else {
                maxLength = Math.max(maxLength, i - stack[stack.length - 1]);
            }
        }
    }

    return maxLength;
}

function processInput() {
    rl.question('Input: ', function(input) {
        if (input.toLowerCase() === 'exit') {
            rl.close(); // 프로그램 종료
            return;
        }
        const result = longestValidParentheses(input);
        console.log('Result:', result);
        processInput(); // 다시 입력 받기
    });
}

processInput(); // 프로그램 시작

// rl.close()는 프로그램 종료 시 자동으로 호출됨
