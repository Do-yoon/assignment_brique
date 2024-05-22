const net = require('net');

let requestCount = 0; // 클라이언트로부터 받은 요청 수를 추적하는 변수

const server = net.createServer((socket) => {
  const clientAddress = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log(`Connected by (${clientAddress})`); // 클라이언트가 서버에 연결되었을 때의 메시지 출력

  socket.on('data', (data) => {
    requestCount++; // 요청 수 증가
    const message = data.toString().trim(); // 클라이언트로부터 받은 메시지를 문자열로 변환하고 앞뒤 공백 제거
    console.log(`Received(${requestCount}): ${message}`); // 받은 메시지를 번호와 함께 출력

    setTimeout(() => {
      let response;
      if (message === 'Ping') {
        response = `Pong (${requestCount})`; // 메시지가 'Ping'인 경우 'Pong'과 요청 번호를 응답
      } else {
        response = `${message} (${requestCount})`; // 다른 메시지의 경우 원본 메시지와 요청 번호를 응답
      }
      socket.write(response); // 응답 메시지를 클라이언트로 전송
      console.log(`Send: ${response}`); // 전송한 응답 메시지를 출력
    }, 3000); // 3초 대기 후 응답
  });

  socket.on('error', (err) => {
    console.error(`Socket error: ${err.message}`); // 소켓 오류 발생 시 오류 메시지 출력
  });
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000'); // 서버가 포트 3000에서 시작됨을 알리는 메시지 출력
});
