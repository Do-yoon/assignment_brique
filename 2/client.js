const net = require('net');

let requestCount = 0; // 클라이언트가 보낸 요청 수를 추적하는 변수

function sendMessage(message) {
  const client = new net.Socket();
  requestCount++; // 요청 수 증가

  client.connect(3000, '127.0.0.1', () => {
    console.log(`Send(${requestCount}): ${message}`); // 서버에 보낼 메시지와 번호를 출력
    client.write(message); // 서버에 메시지를 전송
  });

  client.on('data', (data) => {
    console.log(`Received: ${data.toString()}`); // 서버로부터 받은 응답 메시지 출력
    client.destroy(); // 응답을 받은 후 연결 종료
  });

  client.on('close', () => {
    console.log('Connection closed'); // 연결이 종료되었음을 출력
  });

  client.on('error', (err) => {
    console.error(`Socket error: ${err.message}`); // 소켓 오류 발생 시 오류 메시지 출력
  });
}

// 비동기 방식으로 여러 메시지를 보냄
sendMessage('Ping');
sendMessage('Ping');
sendMessage('foobar');
