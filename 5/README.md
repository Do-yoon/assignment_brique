# 문제 5
## 프로그램 설명:
1. `axios` 패키지를 사용하여 HTTP 요청을 처리합니다. `npm install axios` 명령으로 설치할 수 있습니다.
2. `fetchRandomData` 함수는 서버에서 데이터를 가져옵니다.
3. `main` 함수는 서버를 100번 호출하고 각 결과 값의 빈도를 계산합니다.
4. `frequency` 객체에 JSON 문자열 형식의 결과 값의 빈도를 저장합니다.
5. 결과를 빈도 순으로 정렬하고 출력합니다.
6. 최종적으로 총 합계를 출력합니다.

## 실행 방법
```
npm install axios
node main.js
```

## 실행 예
```shell
count: 15 {"id": 1, "quote": "Working with Spring Boot is like pair programming with the Spring developers."}
count: 12 {"id": 9, "quote": "So easy it is to switch container in # springboot"}
count: 12 {"id": 6, "quote": "It embraces convention over configuration … such as Ruby on Rails."}
...
Total count: 100
```

## 실행 환경
* node v20.11.1
* Visual Studio Code