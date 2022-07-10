### 인터넷 통신

인터넷 통신은 Client와 Server간의 통신이다.

하지만, 중간에 인터넷이 끼워진다면, Client부터 Server까지 도달하는데 어려움을 겪게된다.

이때, 우리들은 규칙을 정하게 되었다.

그 규칙을 이해하기 위해 우선 IP라는것부터 시작해보자.

### IP(Internet Protocol)

첫번째, Client와 Server가 각자 IP주소를 부여받아야한다.

### IP프로토콜의 역할

Packet이라는 통신 단위로 데이터를 전달한다.

지정한 IP Address에 데이터를 전달하는 역할을 한다.

### IP 패킷의 정보

출발지 IP, 목적지 IP, 전송데이터 , 기타..

### 클라이언트 패킷전달

전송데이터가 든 IP패킷을 인터넷망에 던져준다.

그러면 IP프로토콜에 의해서 인터넷망에서 알아서 잘 찾아 서버로 전달된다.

### 서버 패킷전달

전송 받았다 데이터가 든 IP패킷을 인터넷망에 던져주면 알아서 찾아간다.

`클라이언트가 던진 패킷의 이동경로와, 클라이언트가 받은 전달경로는 다를 수 있다.`

하지만 여기서 IP프로토콜의 한계가 발견된다.

### 비연결성

패킷을 받을 대상이 없거나 서비스 불능 상태여도 패킷을 전송한다.

### 비신뢰성

1. 중간에 패킷이 사라지면 어떻게 할것인가?

ex) 중간에 전송되던 서버가 패킷을 받았는데 갑자기 꺼지는경우.

1. 패킷이 순서대로 오지 않으면 어떻게 할것인가?

패킷의 용량이약 1500바이트가 되면 “Hello”, “World”이렇게 2개의 패킷으로 나누어서 전달할 수 있다.

이때 각 패킷들은 노드를 거쳐가면서 서로 다른 각자의 노드를 타게되는데, “Hello”
패킷이 먼저 도착할지, “World”패킷이 먼저 도착할 지 알 수가 없다.

즉, “World”, “Hello”라고 도착하면 틀린 답이 오게되는것이다.

### 프로그램 구분

같은 IP를 사용하는 서버에서 통신하는 어플리케이션이 둘 이상이라면 어떻게 할것인가?

`그렇다면 이 문제를 어떻게 해결할 것인가?`

이러한 문제들을 해결하기 위해서 TCP/ UDP가 도입된다.

### 인터넷 프로토콜 스택의 4계층

| 애플리케이션 계층 - HTTP, FTP |
| --- |
| 전송 계층 - TCP, UDP |
| 인터넷 계층 - IP |
| 네트워크 인터페이스 계층 - LAN |

![Untitled](https://user-images.githubusercontent.com/70310271/172166880-5d93fcde-ef67-4087-9114-e82b848c3155.png)

Ethernet Frame은 mac주소등 여러 물리정보를 포함한다는것만 알고 넘어가자.

### TCP/IP(Transmission Control Protocol / Internet Protocol) 패킷 정보

출발지 PORT, 목적지 PORT, 전송제어 , 순서, 검증정보

이러한 정보들을 담고있기때문에, IP의 한계점을 비신뢰성의 문제를 해결 할 수 있게 되었다.

이제 TCP를 조금 더 구체적으로 알아보자.

### TCP의 특징

1. **연결지향 - TCP 3 way handshake (가상연결)**
    1. Client가 Server로 SYN를 보낸다.
    2. Server는 확인 받았으므로 ACK와 자신도 연결해달라는 SYN를 함께 보낸다.
    3. 그러면 Client쪽에서도 확인했다는 신호인 ACK를 보낸다.
    4. 전송을 시작한다.

우선에 연결이 되었는지를 확인한 후에 보내기 시작한다.

서버도 클라이언트를 신뢰할수 있게되고, 클라이언트도 서버를 신뢰할 수 있게 되는 구조이다.

요즘은 최적화되어 3번 ACK를 보낼때 데이터를 같이 전송한다고 한다.

중요한것 3way handshake는 연결되었다고는 하지만, 실제로 물리적으로 연결 된 것은아니다.

나를 위한 전용랜선이 보장된것은 아니고, 논리적으로만 연결된것이다.

1. **데이터 전달 보증**
    1. 데이터 전송
    2. 데이터 잘받았음.
    
    도중에 패킷이 손실 되었을때, 못 받아왔다는것을 알 수 있음.
    

1. **순서를 보장함.**
    1. 패킷1,패킷2,패킷3 순서로 전송, → 패킷2, 패킷1,패킷3 순서로 도착.
    2. 패킷2부터 다시 보내라!

즉, “World”,“Hello”가 들어와도 “Hello”,“World” 패킷의 순서를 보장한다.

1. 기타 기능들이 많지만, 이 정도만 알아도 문제는 없다.

### UDP(User Datagram Protocol)의 특징

TCP랑 다르게 기능이 거의없다.

연결 지향을 사용하지도 않으며

데이터 전달 보증도 없고, 순서도 보장하지 않는다.

하지만, 단순해서 빠르다는 장점이 있다.

정리하자면, IP와 거의 기능이 같고, PORT정보와 CheckSum정도만 추가된다.

TCP는 이미 인터넷이라는곳에 구축이 되어있고 너무 크게 활성화 되어있다.

하지만 UDP는 기능이 없으므로 Application에서 추가적인 작업들이 필요하면 내가 처음부터 만들어 올릴 수 있다는 장점이 존재한다.

최근(2022-06-05에 듣는기준으로) 3way handshake를 최적화하여 없애는 방식으로 만들어 UDP가 조금 더 각광 받고있는 추세이다.

### PORT의 역할은 무엇일까?

내가 인터넷으로 게임도하고있고, 노래도 듣고있다. 이럴때, 아이피는 하나인데, 게임에 전송하는 패킷인지, 노래를 전송하는 어떤 패킷인지 구분할 방법이 없게되는데, 이때 Port가, 어떤 어플리케이션에 들어갈 패킷인지를 구분해주게된다.

즉, Port는 애플리케이션의 종류를 구분해주는 역할을 한다고 생각하면 된다.

Client : 100.100.100.1:8090 → Server : 200.200.200.2:11220

`보다시피 각자 요청포트와 승인포트가 서로 다를 수 있다는걸 인지하자.`

### 포트번호

0 ~65535까지 할당가능

0 ~ 1023 이미 알려진 포트, 사용하지 않는것이 좋음.

- FTP - 20,21
- TELNET - 23
- HTTP - 80
- HTTPS - 443

### DNS(Domain Name System)

DNS는 왜 사용될까?

100.100.100.1에서 200.200.200.2로 보내려고 했는데,

100.100.100.1에서 200.200.200.3으로 주소가 바뀌어버렸다.

더 이상 전송이 불가능하게 되어버렸다. 

그러면 다른 수단을 사용해 계속해서 물어보아야만한다.

이러한 불편함을 방지하기 위해서 DNS를 도입하였다.

DNS는 전화번호부처럼 서버를 제공해준다.

Client가 주소창에 도메인명을 입력하면 우선 DNS서버에서 도메인명과 일치하는 IP주소를 반환해준다.

그리고 그 주소를가지고, 이후에 Server와 통신을 하게 된다.

그 서버에는 도메인명과 IP주소가 저장이되어있다.

이제는 아이피 주소가 바뀌더라도, DNS서버에서 도메인명을 입력하면 자동으로 주소를 반환하여 주기 때문에 문제는 발생하지 않는다.

## URI와 웹 브라우저 요청 흐름

### URI(Uniform Resource Identifier)

Uniform : 리소스를 식별하는 통일된 방식

Resource : 자원, URI로 식별할 수 있는 모든것 (교통정보 데이터와 같이 데이터 제약이 없음)

Identifier : 다른 항목과 구분하는데 필요한 정보

![Untitled 1](https://user-images.githubusercontent.com/70310271/172166919-95bd296e-573c-4394-a2d6-643ed6c35229.png)

![Untitled 2](https://user-images.githubusercontent.com/70310271/172166924-fee57ba8-1358-4799-b586-6cf9e4de2fee.png)

### URL(Uniform Resource Locator)이란?

리소스가 있는 위치를 지정한다.

### URN(Unifrom Resource Name)이란?

리소스에 이름을 부여한다.

위치는 변할 수 있지만, 이름은 변하지 않는다.

ex) URN:ISBN:8960777331 (어떤 책의 ISBN URN)

보다시피 URN만으로는 실제 리소스의 위치를 찾을 방법이 보편화되어있지는 않음.

URN은 잘 몰라도된다.

### URL 전체 문법

```java
scheme://[userinfo@]host[:port][/path][?query][#fragment]
https://www.google.com:443/search?q=hello&hl=ko
```

### Scheme

주로 프로토콜을 사용함

프로토콜 : 어떤 방식으로 자원에 접근할 것인가하는 약속규칙

ex) http, https, ftp 등등

https는 http에 보안 추가 (HTTP Secure)

### Userinfo

URL에 사용자 정보를 포함해서 인증하는 방식

거의 사용하지 않으므로 무시해도 좋다.

### Host

IP주소나 도메인명을 사용할 수 있다.

### Port

http는 생략시 80포트 사용, https는 생략시 443 포트를 사용 (포트는 생략가능)

### Path

리소스의 경로이며 계층적 구조를 가진다.

ex) /home/file1.jpg , /members , /members/100, /items/iphone12

### Query

key = value 형태이다.

“?keyA = valueA & keyB=valueB” 형태로 사용한다.

?로 시작, &로 추가기능으로

Query Parameter, Query String등으로 불림,

왜냐하면 웹서버에 제공하는 파라미터이기도 하면서

숫자를 적는다해도, 문자로 넘어가기 때문이다.

### Fragment

잘 사용하지는 않는다. 

ex) /html/getting-started.html#getting-started-introducing-spring-boot

HTML를 보는도중 중간쯤 화면으로 이동하고 싶을때 사용하는 것이다.

html 내부 북마크등에 사용.

`서버에 전송하는 정보는 아님.`

### 웹 브라우저 요청 흐름

```java
[https://www.google.com:443/search?q=hello](https://www.google.com:443/search?q=hello)&hl=ko
```

1. IP와 포트 정보를 찾아내기위해 웹브라우저는 DNS서버를 조회한다.

```java
[google.com](http://google.com)(:443) → 200.200.200.2
:443은 HTTPS Port이므로 생략되었음.
```

1. HTTP 요청 메시지를 생성한다

```java
// HTTP 요청 메시지 (원본)
GET /search?q=hello&hl=ko HTTP/1.1
Host: www.google.com
```

![Untitled 3](https://user-images.githubusercontent.com/70310271/172167034-da600c8c-f2bf-49c5-bfcd-10c25ab3ceb9.png)


위 과정을 거치면 Server는 도착한 패킷을 뜯어서 확인하고 아래와 같은 HTTP응답 메시지를 만든다.

```java
//HTTP 응답 메시지
HTTP/1.1 200 OK // HTTP버전 정상응답
Content-Type: text/html;charset=UTF-8 //데이터가 text/html, 인코딩은 UTF-8
Content-Length: 3423 // HTML길이는 3423이다.

<html>
    <body>...</body>
</html>
```

Server에서도 이 패킷을 똑같은 과정을 거쳐서 만들고 Client로 보내준다.

Client에서는 패킷을 읽고 html내용을 웹브라우저에 뿌려준다. 그러면 웹브라우저에서 렌더링된다.

## HTTP의 기본

### HTTP(HyperText Transfer Protocol)

HyperText 즉, HTML을 전송할 수 있는 프로토콜로 시작하였다.

현재는 HTML, TEXT, IMAGE,음성,영상,파일,JSON,XML(API)

거의 모든 형태의 데이터 전송이 가능하다.

서버간에 데이터를 주고 받을때도 대부분 HTTP를 사용한다.

TCP프로토콜만 사용하는것도 게임 아니면 거의없다.

현재(2022-06-07)에서도 추세이다.

### HTTP의 역사

HTTP/0.9 1991년 : GET메서드만 지원, HTTP 헤더 X

HTTP/1.0 1996년 : 메서드, 헤더 추가

HTTP/1.1 1997년 : 가장 많이 사용( 우리에게 가장 중요한 버전)

RFC2068(1997) → RFC2616(1999) → RFC7230~7235(2014)

인터넷에는 이전 버전들이 많은데, RFC7230~7235(2014)버전을 사용하는것이 가장 좋다.

HTTP/2 2015년 : 성능 개선

HTTP/3 진행중 : TCP 대신에 UDP사용, 성능 개선

### 기반 프로토콜

TCP : HTTP/1.1 , HTTP/2

UDP : HTTP/3

현재 HTTP/1.1 주로 사용

HTTP/2, HTTP/3도 점점 증가

DOM에서 Column에 Protocol 체크하고 무슨 버전을 쓰는지 확인할 수 있다.

우리는 HTTP/1.1만 알면 왠만해서 모두 진행할 수 있다.

### HTTP 특징

- 클라이언트 서버구조

Request - Response 구조

클라이언트는 서버에 요청을 보내고, 응답을 대기한다.

서버가 요청에 대한 결과를 만들어서 응답한다.

- 무상태 프로토콜(Stateless),

무슨 의미일까? 서버가 클라이언트의 상태를 보존하지 않는다는 의미이다.

### Stateful

```java
고객 : 이 노트북 얼마인가요?
점원 : 100만원 입니다. (노트북 상태 유지)

고객 : 2개 구매 하겠습니다.
점원 : 200만원 입니다.
점원 : 신용카드 현금중에 어떤 걸로 구매하시겠어요?
(노트북, 2개 상태 유지)

고객 : 신용카드로 구매하겠습니다.
점원 : 200만원 결제 완료되었습니다.
(노트북, 2개, 신용카드 상태 유지)
```

서버가 클라이언트의 이전상태를 보존하는것을 의미한다.

### 문제발생

```java
고객 : 이 노트북 얼마인가요?
점원A : 100만원 입니다ㅏ.

고객 : 2개 구매하겠습니다.
점원B : ? 무엇을 2개 구매하시겠어요?

고객 : 신용카드로 구매하겠습니다.
점원C : ? 무슨 제품을 몇개 신용카드로 구매하시겠어요?
```

### Stateless

```java
고객 : 이 노트북 얼마인가요?
점원 : 100만원 입니다.

고객 : 노트북 2개 구매하겠습니다.
점원 : 노트북 2개는 200만원입니다. 신용카드, 현금중에 어떤걸로 구매하시겠어요?

고객 : 노트북 2개를 신용카드로 구매하겠습니다.
점원 : 200만원 결제 완료되었습니다.
```

### 문제 해결

```java
고객 : 이 노트북 얼마인가요?
점원A : 100만원 입니다.

고객 : 노트북 2개 구매하겠습니다.
점원B : 노트북 2개는 200만원입니다. 신용카드, 현금중에 어떤걸로 구매하시겠어요?

고객 : 노트북 2개를 신용카드로 구매하겠습니다.
점원C : 200만원 결제 완료되었습니다.
```

Stateless는 엄청난 확장성을 가지고 온다.

서버가 클라이언트의 이전상태를 보존하지 않는것을 의미한다.

차이를 확인해보자.

 

- Stateful(상태유지) : 중간에 다른 점원으로 바뀌면 안된다.

중간에 다른 점원으로 바뀔 때 상태 정보를 다른 점원에게 미리 알려줘야 한다.

![Untitled 4](https://user-images.githubusercontent.com/70310271/178148669-25d651b8-60b0-480b-bace-1c4a0a429ea0.png)

- Stateless(무상태) : 중간에 다른 점원으로 바뀌어도 된다.
    - 갑자기 고객이 증가해도 점원을 대거 투입할 수 있다.
    - 갑자기 클라이언트 요청이 증가해도 서버를 대거 투입할 수 있다.
- `무상태는 응답 서버를 쉽게 바꿀 수 있다. → 무한한 서버 증설 가능`

![Untitled 5](https://user-images.githubusercontent.com/70310271/178148675-c65932fb-812a-428d-81c2-91f0c5fb9c50.png)

Scale - Out 즉, 서버의 수평확장에 유리하다.

### Stateless의 실무 한계

모든 것을 무상태로 설계할 수 있는 경우도 있고 없는 경우도 있다.

- 무상태(Stateless)

ex) 로그인이 필요없는 단순한 서비스 소개화면

- 상태유지(Stateful)

ex) 로그인

로그인한 사용자의 경우 로그인 했다는 상태를 서버에 유지

일반적으로 브라우저 쿠키와 서버 세션등을 사용해서 상태유지

`상태유지는 최소한만 사용하자.` 

### Stateful의 단점

Stateles의 단점이라고 한다면 보내는 데이터 크기가 크다는 단점이 있다.

Stateful은 하나씩 보내기 저장하기 때문에 보내는 데이터 크기가 작다.

- 비연결성

### 연결을 유지하는 모델

![Untitled 6](https://user-images.githubusercontent.com/70310271/178148680-44267a8b-39a6-44b1-bb65-6e922f4d226f.png)

### 연결을 유지하지 않는 모델

![Untitled 7](https://user-images.githubusercontent.com/70310271/178148683-f401b2ec-47d5-4e62-80c3-4d7a8d9a6d6b.png)

HTTP는 기본이 연결을 유지하지 않는 모델이다.

일반적으로 초 단위 이하의 빠른속도로 응답

1시간동안 수천명이 서비스를 사용해도 실제 서버에서 동시에 처리하는 요청은 수십개 이하로 매우작음.

ex) 웹 브라우저에서 계속 연속해서 검색버튼을 누르지는 않는다.

한참보고 누르고 한참보고 누르고를 반복하는것이라서, 동시처리는 매우적다.

즉, 서버 자원을 매우 효율적으로 사용할 수 있게된다. 

### 비연결성의 한계와 극복

새로운 페이지로 넘어갈때마다 TCP/IP연결을 새로 맺어야함. → 3way handshake 시간이 추가됨.

![Untitled 8](https://user-images.githubusercontent.com/70310271/178148693-e78a69fd-90ed-4d5a-86f5-8e7e510652ab.png)

웹브라우저로 사이트를 요청하면 HTML뿐만 아니라 자바스크립트, CSS, 추가 이미지 등 수많은 자원이 함께 다운로드된다.

지금은 HTTP 지속 연결(Persistent Connections)로 문제 해결 (과거에는 “Keep Alive”라고 부름)

### HTTP 지속 연결(Persistent Connections)

![Untitled 9](https://user-images.githubusercontent.com/70310271/178148700-97eddca8-8dc2-4891-a26c-c66732a52fdd.png)

내부 구조마다 다른데, 일반적으로 몇십 초 동안 유지한다.

HTTP/2, HTTP/3(UDP프로토콜로 연결속도자체도 줄여버림)에서 더 많은 최적화

정확히 같은 시간에 대용량트래픽이 발생하는경우가 대처하기 어렵다.

유저들이 첫 페이지에서 보고 놀게한뒤에, 적절히 데이터를 받아오는 방식으로 풀어나간다.

- HTTP 메시지

![Untitled 10](https://user-images.githubusercontent.com/70310271/178148706-4fde715d-f028-415c-8a1f-fb5a7f999607.png)

RFC7230 공식스펙

```java
//HTTP 요청 메시지
GET /search?q=hello&hl=ko HTTP/1.1 //Start-Line
Host: www.google.com // Header
//Empty line (CRLF)
```

HTTP 요청 메시지도 body본문을 가질 수 있음.

```java
//HTTP 응답 메시지
HTTP/1.1 200 OK // Start-Line
Content-Type: text/html;charset=UTF-8 // Header
Content-Length: 3423 //Header
//Empty Line (CRLF)
<html>
    <body>...</body> // } Message Body
</html>
```

### 요청 메시지 Start-Line

start-line에 대해서 자세히 알아보자.

```java
start-line = **request-line**(요청메시지 일때) / status-line

//구조
request-line = method SP(공백) request-target SP HTTP-version CRLF(엔터)
```

- HTTP 메서드

```java
**GET** /search?q=hello&hl=ko HTTP/1.1 //Start-Line
```

HTTP 메서드 : GET,POST,PUT,DELETE

- 요청대상

```java
GET **/search?q=hello&hl=ko** HTTP/1.1 //Start-Line
```

absolute-path[?query] (절대경로[?쿼리])

절대경로 = “/”로 시작하는 경로

`절대 경로로 시작한다는 사실은 기억하고 넘어가자.`

참고: *, http://…?x=y와  같이 다른 유형의 경로지정 방법도 있다.

```java
GET /search?q=hello&hl=ko **HTTP/1.1** //Start-Line
```

- HTTP Version

큰 의미는 없다. 그냥 버전을 알려준다.

### 응답 메시지 Start-Line

```java
start-line = request-line / **status-line**

//구조
status-line = HTTP-version SP status-code SP reason-phrase CRLF
```

```java
HTTP/1.1 200 OK // Start-Line
```

- HTTP버전

HTTP 상태 코드 : 요청 성공, 실패를 나타냄

200 성공

400: 클라이언트 요청 오류

500: 서버 내부 오류

이유 문구 : 사람이 이해할 수 있는 짧은 상태 코드 설명글

### HTTP Header

```java
header-field = field-name ":" OWS field-value OWS(OWS:띄어쓰기 허용)
```

field-name바로 뒤는 띄어쓸 수 없다는걸 기억하자.

HTTP전송에 필요한 모든 부가정보

ex) Message Body Content, Message Body Size, 압축, 인증, 요청 클라이언트(브라우저)정보

서버 애플리케이션 정보, 캐시 관리 정보

표준 헤더가 너무 많음

https://en.wikipedia.org/wiki/List_of_HTTP_header_fields

필요시 임의의 헤더 추가 가능

helloworld: hihi

### HTTP Message Body

용도 : 실제 전송할 데이터

HTML문서,이미지,영상,JSON등등 byte로 표현할 수 있는 모든 데이터 전송 가능 

- 단순함, 확장 가능

HTTP는 단순하다. 스펙도 읽어볼만하다.

HTTP 메시지도 매우 단순하다.

크게 성공하는 표준 기술은 단순하지만 확장 가능한 기술이다.

## HTTP Method

### API URI 설계

URI(Uniform Resource Identifier)

- 회원 목록 조회 /read-member-list
- 회원 조회 /read-member-by-id
- 회원 등록 /create-member
- 회원 수정 /update-member
- 회원 삭제 /delete-member

올바른 URI 설계일까?

URI 설계에 있어서 가장 중요한것은 “리소스 식별”이다.

### 리소스의 의미는 뭘까?

회원을 등록하고 수정하고 조회하는게 리소스가 아니다.

ex) 미네랄을 캐라 → 미네랄이 리소스

미네랄을 캐라는 명령어가 리소스가 아니라

미네랄 그 자체가 리소스이다.

즉, 회원이라는 개념 자체가 바로 리소스가 된다.

- **회원** 목록 조회 /members
- **회원** 조회 /members/{id} → ?
- **회원** 등록 /members/{id} → ?
- **회원** 수정 /members/{id} → ?
- **회원** 삭제 /members/{id} → ?

리소스로 잘 구분했는데, 조회,등록,수정,삭제 모두 같은 ID를 써야하네?

어떻게 구분해야할까?

`리소스와 행위를 분리해야한다는 결론에 다다른다.`

가장 중요한것은 리소스를 식별하는것

리소스 : 회원

행위 : 조회, 등록, 삭제, 변경

리소스는 명사, 행위는 동사 (미네랄을 캐라)

행위(메서드)는 어떻게 구분할까? → HTTP 메서드를 사용한다.

URI는 리소스만 식별하는데 사용해야한다. // 행위판별에는 사용하지 않는다.

리소스와 해당 리소스를 대상으로 하는 행위를 분리

(이렇게하면 좋겠지만 안되는 경우도 존재한다는것 알고있자.)

계층 구조상 상위를 컬렉션으로 보고 복수단어 사용을 권장한다. (member → members)

### 리소스를 어떻게 식별하는게 좋을까?

회원을 등록하고 수정하고 조회하는 것을 모두 배제

회원이라는 리소스만 식별하면 된다.

### GET : 리소스 조회

```java
GET /search?q=hello&hl=ko HTTP/1.1
Host: www.google.com
```

Path에 있는 자원을 주세요 !

서버에 전달하고 싶은 데이터는 Query(쿼리 파라미터, 쿼리 스트링)을 통해서 전달

신기하게도 Massage Body를 사용해서 데이터를 전달할 수 있지만, 지원하지 않는 곳이 많아서 권장하지 않음. //  지원하지 않는곳이 있어서 실무에서는 잘 사용하지 않음.

Client → HTTP메시지 전달

```java
GET /members/100 HTTP/1.1
Host: localhost:8080
```

Server → /members/100

```java
{
    "username" : "young" ,
    "age" : 20
}
```

GET요청에 따라 데이터 만들기

응답 HTTP메시지 만들어 전달

```java
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 34

{
    "username":"young",
    "age":20
}
```

### POST : 요청 데이터 처리, 주로 등록에 사용

```java
POST /members HTTP/1.1
Content-Type: application/json

{
    "username": "hello",
    "age": 20
}
```

이 데이터를 줄테니 서버에서 처리해줘.

메시지 바디를 통해 들어온 데이터를 처리하는 모든 기능을 수행한다.

주로 전달된 데이터로 신규 리소스등록, 프로세스 처리에 사용

/members로 들어온다면 (미리 서버에서 members가 들어오면 새로운걸 만들게싸고 약속해두어야함.)

/members/100 신규 리소스 식별자 생성

```java
HTTP/1.1 201 Created
COntent-Type: application/json
Content-Length: 34
Location: /members/100

{
    "username": "hello",
    "age": 20
}
```

POST가 데이터를 등록한다고만 알고있는 사람이 많지만, 여러 의미가 있다.

Spec : POST메서드는 대상 리소스가 리소스의 고유한 의미체계에 따라 요청에 포함된 표현을 처리하도록 요청한다. → 예시를 보자

ex1 ) HTML FORM에 입력한 정보로 회원가입, 주문 등에서 사용

HTML양식에 입력된 필드와 같은 데이터 블록을 데이터 처리 프로세스에 제공

ex2 ) 게시판 글쓰기, 댓글달기

게시판, 뉴스 그룹, 메일링 리스트, 블로그 또는 유사한 기사 그룹에 메시지 게시

ex3) 신규 주문 생성

서버가 아직 식별하지 않은 새 리소스 생성

ex4) 한 문서 끝에 내용 추가하기

기존 자원에 데이터 추가

정리하자면, 이 리소스URI에 POST요청이 오면 요청 데이터를 어떻게 처리할지 리소스마다 따로 정해두어야함. 

1. 새 리소스 생성(등록)
    
     서버가 아직 식별하지 않은 새 리소스 생성
    
2. 요청 데이터 처리
    
    단순히 데이터를 생성하거나, 변경하는 것을 넘어서 프로세스를 처리해야 하는 경우
    
    예) 주문에서 결제완료 → 배달시작 → 배달완료 처럼 단순히 값 변경을 넘어 프로세스의 상태가 변경되는 경우.
    
    POST의 결과로 새로운 리소스가 생성되지 않을 수도 있음
    
    ex) POST /orders/{orderId}/start-delivery(컨트롤 URI)
    
3. 다른 메서드로 처리하기 애매한 경우
    
    예) JSON으로 조회 데이터를 넘겨야하는데, GET 메서드를 사용하기 어려운 경우
    
    애매하면 POST를 사용한다.
    

POST가 만능이긴하지만, GET을 쓰는 이유는 조금 더 빠르게 동작하도록 Caching을 하도록 설계되어있기 때문이다.

### PUT : 리소스를 대체, 해당 리소스가 없으면 생성

```java
PUT /members/100 HTTP/1.1
Content-Type: application/json

{
    "username": "hello",
    "age": 20
}
```

PUT은 리소스를 대체하는것이다.

리소스가 있으면 대체, 리소스가 없으면 생성

`파일을 복사하는것과 흡사함 쉽게 이야기해서 덮어버린다고 생각하면됨.`

클라이언트가 리소스를 식별한다는게 굉장히 중요하다.

POST와 비교해보자 POST는 들어갈 공간이 명확하게 지정되어있지 않아.

자동으로 식별하고 추가한다. 하지만, PUT의 경우 /members/100처럼 명확하게

클라이언트가 리소스의 위치를 알고 URI를 지정한다는 차이가 있다.

저 데이터를 명확하게 대체하겠다! 라는 의미를 가진다.

Client

```java
PUT /members/100 HTTP/1.1
Content-Type: application/json

{
    "username": "old",
    "age": 50
}
```

Server

```java
{
    "username": "hello",
    "age": 20
}
```

결과 :

```java
{
    "username": "old",
    "age": 50
}
```

완전히 대체가 되어버린다!

굉장히 중요한점을 하나 알아보자.

만약 PUT으로 들어오는 데이터가 이렇게 나이만 있으면 어떻게 될까?

```java
{
    "age": 20
}
```

나이만 있는 데이터로 대체된다는점을 꼭 알고있어야한다. (덮어쓰기 생각하면 쉽다.)

그러면 이러한 문제점을 어떻게 해결할까? PATCH를 사용하면 된다.

### PATCH : 리소스 부분 변경

```java
PATCH /members/100 HTTP/1.1
Content-Type: application/json

{
    "age": 50
}
```

/members/100

```java
{
    "username":"young",
    "age": 20
}
```

결과 :

```java
{
    "username":"young",
    "age": 50
}
```

### DELETE : 리소스 삭제

```java
DELETE /members/100 HTTP/1.1
Host: localhost:8080
```

/members/100

```java
{
    "username": "young",
    "age": 20
}
```

PATCH는 최근에는 되는데, 옛날서버들에서는 안되는 경우도 몇몇 존재한다.

이때는 POST를 사용하면 된다.

//기타 메서드

HEAD : GET과 동일하지만 메시지 부분을 제외하고, 상태줄과 헤더만 반환.

OPTIONS : 대상 리소스에 대한 통신 가능 옵션(메서드)를 설명 (주로 CORS에서 사용)

CONNECT : 대상 자원으로 식별되는 서버에 대한 터널을 설정

TRACE : 대상 리소스에 대한 경로를 따라 메시지 루프백 테스트를 수행 

## HTTP 메서드의 속성

### SAFE(안전)

호출해도 리소스를 변경하지 않는다.

여러번 호출해도 변경이 일어나지 않는경우를 “안전”하다. 라고한다.

Q. 계속 호출해서 로그가 쌓여 장애를 발생시키면?

A. 안전이라는 용어는 해당 리소스에만 국한시켜 해석한다.

그렇게 넓은 범위까지 해석하지 않는다.

### Idempotent(멱등)

$f(f(x)) = f(x)$

한번 호출하든 두번 호출하든 100번 호출하든 결과가 같은것을 의미한다.

- 멱등 메서드

GET : 한번 조회하든 두번 조회하든 같은 결과가 조회된다.

PUT : 결과를 대체한다. 따라서 같은 요청을 여러번 해도 최종 결과는 같다.

DELETE : 결과를 삭제한다. 같은 요청을 여러번 해도 삭제된 결과는 똑같다.

`POST : 멱등이 아니다. 두번 호출하면 같은 결제가 중복해서 발생할 수 있다.`

멱등은 언제 활용하는가?

삭제 할때 DELETE를 했는데, 삭제가 된지 안된지 모르겠을때 한번더 하는 용도..!

서버가 TIMEOUT등으로 정상 응답을 못주었을 때, 클라이언트가 같은 요청을 다시해도 되는가?

- 주의할점

Q: 재요청 중간에 다른곳에서 리소스를 변경해버리면 어떻게 되지?

```java
사용자1: GET -> username:A, age:20
사용자2: PUT -> username:A, age:30
사용자1: GET -> username:A, age:30 -> 사용자2의 영향으로 바뀐 데이터 조회
```

A: 멱등은 외부 요인으로 중간에 리소스가 변경되는 것 까지는 고려하지 않는다.

이러한것들은 멱등하다고 판단하지 않는게 올바르다.

### Cacheable(캐시가능)

응답 결과 리소스를 캐시해서 사용해도 되는가?

GET, HEAD, POST, PATCH 캐시가능

실무에서는 GET,HEAD 정도만 캐시로 사용

POST,PATCH는 본문 내용까지 캐시 키로 고려해야하는데, 구현이 쉽지 않음.

## HTTP 메서드의 활용

클라이언트에서 서버로 데이터 전송

데이터 전달 방식은 크게 2가지

- Query Parameter를 통한 데이터 전송
    - GET
    
    ex) 주로 검색이나, 정렬 필터에 사용한다. ex) ?q=hello
    
- Massage Body를 통한 데이터 전송
    - POST
    - PUT
    - PATCH
    
    ex) 회원가입, 상품주문, 리소스등록, 리소스변경
    

### 일반적으로 4가지 상황이 있다.

1. 정적 데이터 조회

이미지, 정적 텍스트 문서

```java
GET /static/star.jpg HTTP/1.1
Host: localhost:8080
```

```java
HTTP/1.1 200 OK
Content-Type:image/jpeg
Content-Length: 34012

lkj123kljoiasudlkjaweioluywlinfdo912u34jiko98udjkla...
```

이미지, 정적 텍스트 문서 조회는 GET을 사용한다.

정적 데이터는 일반적으로 쿼리파라미터 없이 리소스 경로로 단순하게 조회가능하다.

1. 동적 데이터 조회

주로 검색, 게시판 목록에서 정렬 필터(검색어)

```java
GET /search**?q=hello&hl=ko** HTTP/1.1 // Red(Query Parameter)
Host: www.google.com
```

쿼리 파라미터를 기반으로 정렬 필터링을 해서 결과를 동적으로 생성

주로 검색, 게시판 목록에서 정렬 필터(검색)

조회 조건(검색어)을 줄여주는 필터, 조회 결과를 정렬하는 정렬 조건에 주로 사용

조회는 GET사용

GET은 쿼리 파라미터 사용해서 데이터를 전달

1. HTML Form을 통한 데이터 전송

![Untitled 11](https://user-images.githubusercontent.com/70310271/178148714-27b2b382-a34c-4f7b-bc27-d36da47854e3.png)

```java
<form action="/save" method="post">
    username : <input type="text" name="username"/>
    age : <input type="text" name="age"/>
    <button type="submit">전송</button>
</form>
```

웹 브라우저가 생성한 요청 HTTP 메시지

```java
POST /save HTTP/1.1
Host: localhost:8080
Content-Type: application/x-www-form-urlencoded

username=kim&age=20 //key:value 스타일로 데이터를 만들어 Body에 넣는다.
```

만약 method=”get”으로 전송하면 어떻게 될까?

```java
GET /save?username=kim&age=20 HTTP/1.1
Host: localhost:8080
```

이전에 말했다시피 get은 Message Body를 사용하지 않는다.

그래서 POST의 Body에 들어갈 내용을 주소창에 올려버린다.

GET은 리소스 변경이 발생하는곳에 사용하면 안된다.

![Untitled 12](https://user-images.githubusercontent.com/70310271/178148717-61418717-fc8d-45b2-be1c-ea30ef3b922d.png)

추가로 enctype=”multipart/form-data”을 넣으면 어떻게 될까?

```java
<form action="/save" method="post" enctype=”multipart/form-data”>
    <div>username : <input type="text" name="username"/></div>
    <div>age : <input type="text" name="age"/></div>
    <div>file : <input type="file" name="file1"/></div>
    <button type="submit">전송</button>
</form>
```

```java
POST /save HTTP/1.1
Host: localhost:8080
Content-Type: multipart/form-data; bundary=----XXX
Content-Length: 10457

------XXX
Content-Disposition: form-data; name="username"

kim
------XXX
Content-Disposition: form-data; name="age"

20
------XXX
Content-Disposition: form-data; name="file";filename="intro.png"
Content-Type: image/png

109238a90p3eqworkjasd09ou3oirwoe9u34ouief...
------XXX--
```

multipart라는건 이런것이다. 보다시피 이렇게 부분으로 나눠서 보내주게 된다.

전체 다시 정리

- HTML Form submit시 POST전송

ex) 회원가입, 상품주문, 데이터 변경

- Content-Type : application/x-www-form-urlencoded 사용
    - form의 내용을 Message Body를 통해서 전송(key=value, 쿼리 파라미터 형식)
    - 전송 데이터를 url encoding 처리
        - ex) abc김 → abc%EA%B9%80
        
- HTML Form은 GET 전송도 가능하다.

- Content-Type: multipart/form-data
    - 파일 업로드와 같은 바이너리 데이터 전송시 사용
    - 다른 종류의 여러 파일과 폼의 내용 함께 전송가능 (그래서 이름이 multipart)

- 참고 : HTML Form 전송은 GET,POST만 지원 // PUT , PATCH , DELETE 지원안함.

1. HTTP API를 통한 데이터 전송

```java
POST /members HTTP/1.1
Content-Type: application/json

{
    "username":"young",
    "age":20
}
```

언제 사용하는가?

- Server To Server

서버끼리 백엔드 시스템 통신을 사용할때 사용한다.

- 앱 클라이언트

아이폰, 안드로이드처럼 완전히 다른 매체로 옮길때 사용한다.

- 웹 클라이언트

HTML에서 Form전송 대신 자바 스크립트를 통한 통신에 사용한다.(Ajax)

ex) React,VueJs 같은 웹 클라이언트와 API통신

- POST, PUT, PATCH: 메시지 바디를 통해 데이터 전송

- GET : 조회, 쿼리 파라미터로 데이터 전달

- Content-Type: application/json을 주로 사용 (사실상 표준임)

TEXT,XML,JSON 등

회원 가입, 상품주문, 데이터 변경

Server to Server, App Client, Web Client(Ajax)

## HTTP API 설계 예시

### 회원관리 시스템(API설계 - POST 기반 등록)

- 회원목록 /members → GET
- 회원 등록 /members → POST
- 회원 조회 /members/{id} → GET
- 회원 수정 /members/{id} → PATCH, PUT, POST
- 회원 삭제 /members/{id} → DELETE

일반적으로 PATCH를 많이 쓴다. 많은데이터가 들어오는데 데이터 하나만 빠져있어도 PUT으로 덮어버리면 큰 오류가 발생할 수 있기 때문이다.

둘다 애매하면 POST쓰면된다.

POST는 Server에서 자동으로 필요한 id를 생성해서 저장한다.

- 클라이언트는 등록될 리소스의 URI를 모른다.

회원 등록 /members → POST

POST /members

- 서버가 새로 등록된 리소스 URI를 생성해준다.

HTTP/1.1 201 Created

Location: /members/100

- 이렇게 클라이언트가 주소를 몰라도 서버에서 자동으로 관리해주는 방식을 “컬렉션(Collection)”이라고 한다.
    - 서버가 관리하는 리소스 디렉토리
    - 서버가 리소스의 URI를 생성하고 관리
    - 여기서 컬렉션은 /members
    

### 파일관리 시스템(API 설계 - PUT 기반 등록)

- 파일 목록 /files → GET
- 파일 조회 /files/{filename} → GET
- 파일 등록 /files/{filename} → PUT
- 파일 삭제 /files/{filename} → DELETE
- 파일 대량 등록 /files → POST

- 클라이언트가 리소스 URI를 알고 있어야한다. (POST와 반대됨)
    - 파일 등록 /files/{filename} → PUT
    - PUT /files/star.jpg
- 클라이언트가 직접 리소스의 URI를 지정한다.
- 이렇게 주소를 모두 알고 클라이언트가 관리하는 방식을 “스토어(Store)”라고한다.
    - 클라이언트가 관리하는 리소스 저장소
    - 클라이언트가 리소스의 URI를 알고 관리
    - 여기서 스토어는 /files
    

### HTML FORM을 사용 // 실제로 만들때 다시 보자. 굉장히 중요한말을 해주신다.

HTML FORM은 GET,POST만 지원한다.

AJAX같은 기술을 사용해서 해결 가능하다 하지만, → 회원 API 참고

여기서는 순수 HTML, HTML FORM 만을 이야기 해보자.

GET, POST만 지원하므로 제약이 있다.

회원 목록 /members → GET

회원 등록 폼 /members/new → GET

회원 등록 /members/new, /members → POST

회원 조회 /memebrs/{id} → GET

회원 수정 폼 /members/{id}/edit → GET

회원 수정 /members/{id}/edit, /members/{id} → POST

회원 삭제 /members/{id}/delete → POST

회원등록 폼과 회원등록을 일치시키는게 개인적으로 좋다고 하심.

회원수정 폼과 회원수정도 같은 맥락.

나중에 문제가 생길때, 경로가 2개면 되돌리기 어렵다고하심.

HTML FORM은 GET,POST만 지원한다.

컨트롤 URI → POST의 /new , /edit, /delete 폴더를 컨트롤 URI라고 한다.

GET,POST만 지원하므로 제약이 있다.

이런 제약을 해결하기 위해 어쩔 수 없이 동사로된 리소스 경로를 사용

HTTP 메서드로 해결하기 애매한 경우 사용(HTTP API 포함)

`실무에서 진짜 많이 쓴다고하신다.`

### 참고하면 좋은 URI 설계 개념

- Document(문서)

단일 개념(파일하나, 객체 인스턴스, 데이터베이스 row)

ex) members/100, /files/star.jpg

- Collection(컬렉션)

서버가 관리하는 리소스 디렉터리

서버가 리소스의 URI를 생성하고 관리

ex) /members

- Store(스토어)

클라이언트가 관리하는 자원 저장소

클라이언트가 리소스의 URI를 알고 관리

ex) /files

- Controller(컨트롤러), 컨트롤 URI

문서, 컬렉션, 스토어로 해결하기 어려운 추가 프로세스 실행

ex) /members/{id}/delete

문서,컬렉션을 가지고 최대한 해결한다. 더 이상 안되면 컨트롤 URI를 사용한다.

## HTTP 상태코드

클라이언트가 보낸 요청의 처리 상태를 응답에서 알려주는 기능

### 1xx(Informational) : 요청이 수신되어 처리중

거의 사용하지 않으므로 생략한다.

### 2xx(Successful) : 요청 정상 처리

- 200 OK

너무 일반적인 완료 처리

- 201 Created

요청

```java
POST /members HTTP/1.1
Content-Type: application/json

{
    "username":"young"
    "age":20
}
```

응답.

```java
HTTP/1.1 201 Created
Content-Type: application/json
Content-Length: 34
Location: /members/100

{
    "username":"young",
    "age":20
}
```

201이 들어왔다. 아 ! 새로운 데이터가 생성되었고, Location 헤더가 있을수 있겠구나.

- 202 Accepted

요청이 접수되었으나 완료되지 않았음.

ex) 요청 접수 후 1시간 뒤에 배치 프로세스가 요청을 처리함

배치 처리 같은곳에서 사용함.

- 204 No Content

서버가 요청을 성공적으로 수행했지만, 응답 페이로드 본문에 보낼 데이터가 없음.

ex) 웹 문서 편집기에서 SAVE버튼을 눌렀을때,

SAVE 버튼의 결과로 내용을 반환받지 않아도된다.

SAVE 버튼을 눌러도 같은 화면을 유지해야한다.

결과 내용이 없어도 204메시지만으로 성공을 인식할 수 있다.

실무에서는 200과 201만 거의 사용한다.

### 3xx(Redirection) : 요청을 완료하려면 추가 행동이 필요

- 300 Multiple Choices
- 301 Moved Permanently
- 302 Found
- 303 See Other
- 304 Not Modified
- 307 Temporary Redirect
- 308 Permanet Redirect

### 리다이렉션이란?

웹 브라우저는 3xx응답의 결과에 Location헤더가 있으면, Location위치로 자동 이동(리다이렉트)

1. Client가 아래 요청메시지를 보낸다.

```java
GET /event HTTP/1.1
Host: localhost:8080
```

1. Server가 응답한다.

/event 페이지를 요청을 하면

Server에서 더이상 /event는 쓰지 않으니, 301 Moved Permanently 응답메시지를 보내준다.

```java
HTTP/1.1 301 Moved Permanently
Location: /new-event
```

이 응답 메시지를 받으면 자동 리다이렉트가 일어나고

URL을 변경하여 Client는 새로바뀐 주소 요청메시지를 보낸다.

1. Client가 아래 요청메시지를 보낸다.

```java
GET /new-event HTTP/1.1
Host: localhost:8080
```

1. 서버에서 응답메시지를 보내게 된다.

```java
HTTP/1.1 200 OK
...
```

### 영구 리다이렉션 - 특정 리소스의 URI가 영구적으로 이동

원래의 URL을 사용하지 않는다, 검색 엔진 등 에서도 변경을 인지한다.

예) /membebrs → /users

예) /event → /new-event

- 301 Moved Permanently

리다이렉트시 요청 메서드가 GET으로 변하고 본문이 제거될 수 있음.

처음에 POST로 받을것이라 예상했지만, 대부분이 GET으로 받아서 스펙자체도 GET으로 변경했다. 하지만 바꿀 수 없기에 본문이 제거 될수도 있고 제거 되지 않을 수도 있다는것이다.

1. Client가 아래 요청 메시지를 보낸다.

```java
POST /event HTTP/1.1 //POST사용
Host: localhost:8080

name=hello&age=20 //메시지 존재
```

1. Server가 아래 응답메시지를 보낸다.

```java
HTTP/1.1 301 Moved Permanently
Location: /new-event
```

1. 자동 리다이렉트가 일어난다.
2. Client가 아래 요청메시지를 보낸다.

```java
GET/ new-event HTTP/1.1// Method POST에서 GET으로 변경
Host: localhost:8080
//POST에 있던 메시지 제거
```

1. Server가 아래 응답메시지를 보낸다.

```java
HTTP/1.1 200 OK
...
```

- 308 Permanent Redirect

301과 기능은 같다.

리다이렉트시 요청 메서드와 본문 유지(처음 POST를 보내면 리다이렉트도 유지함.)

```java
POST /event HTTP/1.1 //POST사용
Host: localhost:8080

name=hello&age=20 //메시지 존재
```

1. Server가 아래 응답메시지를 보낸다.

```java
HTTP/1.1 301 Moved Permanently
Location: /new-event
```

1. 자동 리다이렉트가 일어난다.
2. Client가 아래 요청메시지를 보낸다.

```java
POST/ new-event HTTP/1.1// Method POST에서 GET으로 변경
Host: localhost:8080

name=hello&age=20
```

1. Server가 아래 응답메시지를 보낸다.

```java
HTTP/1.1 200 OK
...
```

new-event로 페이지를 바꾸면 내부에서 전달해야하는 데이터가 모두 변해버리기 때문에 POST로 받아와도, GET으로 돌려서 사용하는게 옳은 방법이다.

- 일시 리다이렉션 - 일시적인 변경

주문 완료 후 주문 내역 화면으로 이동

리소스의 URI가 일시적으로 변경

따라서 검색엔진 등에서 URL을 변경하면 안된다.

- 302 Found
    
    리다이렉트시 요청 메서드가 GET으로 변하고, 본문이 제거될 수 있음
    
- 307 Temporary Redirect
    
    302와 기능은 같음
    
    리다이렉트시 요청 메서드와 분문유지(요청 메서드를 변경하면 안된다.)
    
- 303 See Other
    
     302와 기능은 같음
    
    리다이렉트시 요청 메서드가 GET으로 변경
    

실무에서는 302를 가장 많이 사용하고 있음.

PRG: Post/Redirect/Get

뭔지 잘 알것이다.

POST로 주문후에 웹브라우저를 새로고침하면?

일반적으로 주문후에 웹브라우저를 새로고침하면 한번 더 주문이된다.

어떻게 해결해야하는가?

- PRG 사용전
1. Client 요청

```java
POST /order HTTP/1.1
Host: localhost:8080

itemId=mouse&count=1
```

1. Server 응답

```java
HTTP/1.1 200 OK
<html>주문완료</html>
```

1. 결과화면에서 새로고침
2. Client 요청

```java
POST /order HTTP/1.1
Host: localhost:8080

itemId=mouse&count=1
```

1. Server 응답

```java
HTTP/1.1 200 OK
<html>주문완료</html>
```

그대로 들어간다.

서버에서 한번쓴 아이디는 버린다는 설계를 해서 미연에 방지는 해야한다.

POST로 주문후에 새로고침으로 인한 중복 주문 방지

POST로 주문후에 주문 결과화면을 GET메서드로 리다이렉트

`새로고침해도 결과화면을 GET으로 조회`

중복 주문 대신에 결과화면만 GET으로 다시 요청

- PRG 사용후

1. Client 요청

```java
POST /order HTTP/1.1
Host: localhost:8080

itemId=mouse&count=1
```

1. Server 응답 : mouse1개 데이터는 저장하고 302Found를 응답메시지로 준다.

```java
HTTP/1.1 302 Found
Location: /order-result/19
```

1. 자동 리다이렉트 → 결과화면에서 새로고침시 GET /order-result/19 즉, 결과화면만 다시 요청한다.
2. Client 요청

```java
GET /order-result/19 HTTP/1.1 //GET사용
Host: localhost:8080
```

1. Server 응답.

```java
HTTP/1.1 200 OK

<html>주문완료</html>
```

PRG이후 리다이렉트는 URL이 이미 POST에서 GET으로 리다이렉트되었기 떄문에,

새로고침해도 GET으로 결과화면만 조회하는 방식이다.

### 그래서 무엇을 쓰는게 좋은가?

302 Found → GET으로 변할 수 있음.

307 Temporary Redirect → 메서드가 변하면 안됨.

303 See Other → 메서드가 GET으로 변경

- 역사 처음 302 스펙의 의도는 HTTP메서드를 유지하는것
- 그런데 웹 브라우저들이 대부분 GET으로 바꾸어버림(일부는 다르게 동작한다.)
- 그래서 모호한 302대신 명확한 307,303등장(301 대용으로 308도 등장)

- 현실 307,303을 권장하지만 현실적으로 이미 많은 애플리케이션 라이브러리들이 302를 기본값으로 사용한다.
- 자동 리다이렉션시에 GET으로 변해도 되면 그냥 302를 사용해도 큰 문제 없음.

### 기타 리다이렉션

- 300 Multiple Choices : 안씀.
- 304 Not Modified

캐시를 목적으로 사용한다.

클라이언트에게 리소스가 수정되지 않았음을 알려준다. 따라서 클라이언트는 로컬PC에 저장된 캐시를 재사용한다. (캐시로 리다이렉트 한다.)

304 응답은 로컬 캐시를 사용해야하므로 응답에 메시지 바디를 포함하면 안된다.

조건부 GET, HEAD 요청시 사용한다.

캐시가 만료된것 같으면 서버에 맞는지 검증하는 요청을 보낸다.

그러면 서버가 확인해서 써도된다 안된다를 알려주고 진행하는 과정이다.

결과 대신 캐시를 사용

### 4xx(Client Error) : 클라이언트 오류, 잘못된 문법등으로 서버가 요청을 수행할 수 없음.

클라이언트의 요청에 잘못된 문법등으로 서버가 요청을 수행할 수 없음.

오류의 원인이 클라이언트에 있음.

중요! 클라이언트가 이미 잘못된 요청, 데이터를 보내고 있기 때문에, 똑같은 재시도가 실패함

- 400 Bad Request

클라이언트가 잘못된 요청을 해서 서버가 요청을 처리할 수 없음

요청 구문, 메시지 등등 오류

클라이언트는 요청 내용을 다시 검토하고 보내야함

ex)  요청 파라미터가 잘못되거나, API 스펙이 맞지 않을 때

- 401 Unauthorized

클라이언트가 해당 리소스에 대한 인증이 필요함

인증(Authentication)되지 않음

401 오류발생시 응답에 WWW-Authenticate 헤더와 함께 인증 방법을 설명

- 단어 구분할것 참고

인증(Authentication) : 본인이 누구인지 확인, (로그인)

인가(Authorization) : 권한부여 (ADMIN 권한처럼 특정 리소스에 접근할 수 있는 권한, 인증이 있어야 인가가 있음)

오류 메시지가 Unauthorized 이지만 인증되지 않음(인증이 되지 않는다는 뜻인데, 이름이 아쉽다.)

- 403 Forbidden

서버가 요청을 이해했지만 승인을 거부함

주로 인증 자격 증명은 있지만, 접근 권한이 불충분한 경우

ex) 어드민 등급이 아닌 사용자가 로그인은 했지만, 어드민 등급의 리소스에 접근하는 경우 

- 404 Not Found

요청 리소스가 서버에 없음

또는 클라이언트가 권한이 없이 리소스에 접근할 때 해당 리소스를 숨기고 싶을때,

### 5xx(Server Error) : 서버 오류, 서버가 정상 요청 을 처리하지 못함.

클라이언트가 인식할 수 없는 상태코드를 서버가 반환하면 위에 적어둔것을 토대로 해석하고 판단하면 된다.

ex) Null Point Exception , DataBase 접근 불가능.

- 500 Internal Server Error

서버내부에서 발생한 오류들은 애매하면 500오류로 내면된다.

서버 내부 문제로 오류발생

- 503 Service Unavailable

서비스 이용 불가

서버가 일시적인 과부하 또는 예정된 작업으로 잠시 요청을 처리할 수 없음

Retry-After 헤더 필드로 얼마뒤에 복구되는지 보낼 수도 있음

언제 터질지 모르는 에러가 많기에 현실에서 503을 내는 경우는 거의없다.

일반적으로 500대 에러는 내면 안된다.

나이에 맞지않는데 나이제한 걸린 상품을 샀다. → 500대 에러? 절대 안된다.

모니터링할때도 500대 데이터면 서버에 큰 문제가 있다고 인식하는것이다.

나머지는 400이나 200으로 해결해야한다.

400과 500의 구분은 400은 계속 실패하고, 500대 오류는 데이터베이스가 복구되면 가능하다.

## HTTP 헤더

header-field = field-name “:” OWS field-value OWS (OWS:띄어쓰기 허용)

field-name은 대소문자 구문 없음 

### HTTP Header의 용도

HTTP 전송에 필요한 모든 부가정보

ex) 메시지 바디의 내용, 메시지 바디의 크기, 압축 ,인증, 요청 클라이언트, 서버정보, 캐시 관리 정보

표준 헤더가 너무 많음

http://en.wikipedia.org/wiki/List_of_HTTP_header_fields

필요시 임의의 헤더 추가 가능

helloworld: hihi

### HTTP 헤더 분류 - RFC2616(과거)

- 헤더 분류
    - General Header : 메시지 전체에 적용되는 정보 ex) Connection: close
    - Request Header : 요청 정보, ex) User-Agent : Mozilla/5.0 (Macintosh;..)
    
    요청을 보낼때 필요한 정보들을 담는 헤더 ex) 웹브라우저의 정보가 Mozilla이다.
    
    - Respone Header : 응답 정보, ex) Server: Apache
    
    응답을 보낼때 필요한 정보들을 담는 헤더 ex) Apache 서버에서 보낸다.
    
    - Entity Header : 엔티티 바디 정보, ex) Content-Type: text/html, Content-Length: 3423
    
    데이터 정보가 text인가, json인가?를 컨텐츠의 길이는 얼마인가를 담고 있다.
    

### HTTP BODY → message body - RFC2616(과거)

```java
HTTP/1.1 200 OK
Content-Type: text/html;charset=UTF-8//Entity Header
Content-Length: 3423//Entity Header

//Message Body
<html> //Entity body
    <body>...</body> //Entity body
</html> //Entity body
//Message Body
```

메시지 본문(message body)는 엔티티 본문(entity body)를 전달하는데 사용

Message Body 안에 Entity Body를 담아서 전송한다고 생각하면 편하다.

엔티티 본문은 요청이나 응답에서 전달할 실제 데이터

엔티티 헤더는 엔티티 본문의 데이터를 해석할 수 있는 정보 제공

ex) 데이터 유형 (html, json) 데이터 길이, 압축 정보 등등

하지만 199년 RFC2616이 폐기가 된다.

2014년 RFC7230 ~ 7235등장

### RFC723X의 변화

엔티티(Entity) → 표현(Representation)

Representation = Representation Metadata + Representation Data

표현 = 표현 메타데이터 + 표현데이터

### HTTP BODY → message body - RFC7230(최신)

메시지 본문(message body)를 통해 표현 데이터 전달

메시지 본문 = 페이로드(payload)

표현은 요청이나 응답에서 전달할 실제데이터 (표현헤더 + 표현데이터)

표현 헤더는 표현 데이터를 해석할 수 있는 정보 제공

ex) 데이터 유형(html,json), 데이터 길이, 압축 정보 등등

참고 : 표현 헤더는 표현 메타데이터와, 페이로드 메시지를 구분해야하지만 복잡해지므로 여기서는 생략

## 표현

### Content-Type : 표현 데이터의 형식

```java
HTTP/1.1 200 OK
Content-Type: text/html;chharset=UTF-8
Content-Length:3423

<html>
    <body>...</body>
</html>
```

```java
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 16

{"data":"hello"}
```

미디어 타입, 문자 인코딩

ex) text/html; charset = utf-8

application/json

image/png

### Content-Encoding : 표현 데이터의 압축방식

```java
HTTP/1.1 200OK
Content-Type: text/html;charset=UTF-8
Content-Encoding: gzip
Content-Length: 521

lkj123kljoiasudikjawioulywlnfdo91...
```

표현 데이터를 압축하기 위해 사용

데이터를 전달하는 곳에서 압축 후 인코딩 헤더 추가

데이터를 읽는 쪽에서 인코딩 헤더의 정보로 압축 해제

ex) gzip, deflate, identity

### Content-Language : 표현 데이터의 자연 언어

```java
HTTP/1.1 200 OK
Content-Type: text/html;charset=UTF-8
Content-Language: ko
Content-Length: 521

<html>
안녕하세요.
</html>
```

```java
HTTP/1.1 200 OK
Content-Type: text/html;charset=UTF-8
Content-Language: en
Content-Length: 521

<html>
hello
</html>
```

표현 데이터의 자연언어를 표현

ex) ko, en, en-US

### Content-Length : 표현 데이터의 길이

```java
HTTP/1.1 200 OK
Content-Type: text/html;charset=UTF-8
Content-Length: 5

hello
```

바이트 단위

Transfer-Encoding(전송 코딩)을 사용하면 Content-Length를 사용하면 안됨

- 표현 헤더는 전송 응답 둘다 사용

## 협상(Content Negotiation)

클라이언트가 선호하는 표현 요청

Accept : 클라이언트가 선호하는 미디어 타입 전달

Accept-Charset : 클라이언트가 선호하는 문자 인코딩

Accept-Encoding : 클라이언트가 선호하는 압축 인코딩

Accept-Language : 클라이언트가 선호하는 자연 언어

협상 헤더는 요청시에만 사용

서버가 못 줄 수 도 있지만, 클라이언트가 

Accept-Language 적용전

```java
(한국브라우저) GET /event -> 다중언어 지원서버(en,ko)
(한국브라우저)  <- Content-Language: en [hello (en)]
```

Accept-Language 적용후

```java
(한국브라우저) GET /event -> 다중언어 지원서버(en,ko)
(한국브라우저) <- Content-Language: ko [안녕하세요 (ko)]
```

Accept-Language 복잡한 예시

```java
(한국브라우저) GET /event -> 다중언어 지원서버(de,en)
(한국브라우저) <- Content-Language: ko [Hallo (독일어)]
```

그나마 영어로 받고 싶을때, 우선순위가 필요하다.

```java
(한국브라우저) GET /event
Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7
-> 다중언어 지원서버(de,en)

(한국브라우저)<- Content-Language:en [Hello(en)]
```

Quality Values(q) 값 사용

### 협상과 우선순위1

0~1, 클수록 높은 우선순위

생략하면 1

Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7

1. ko-KR;q=1 (q생략)
2. ko;q=0.9
3. en-US;q=0.8
4. en:q=0.7

### 협상과 우선순위2

Quality Values(q)

구체적인 것이 우선한다.

Accept: text/*, text/plain, text/plain;format=flowed

1. text/plain;format=flowed
2. text/plain
3. text/*

### 협상과 우선순위3

구체적인을 기준으로 미디어 타입을 맞춘다.

Accept: text/*;q=0.3, text/html;q=0.7, text/html;level=1,

text/html;level=2;q=0.4

| Media Type | Quality |
| --- | --- |
| text/html;level=1 | 1 |
| text/html | 0.7 |
| text/plain | 0.3 |
| text/html;level=2 | 0.4 |
| text/html;level=3 | 0.7 |

## 전송 방식 설명

### 단순전송(Content-Length)

```java
Client [GET /event] -> 

Server [
HTTP/1.1 200 OK
Content-Type: text/html;charset = UTF-8
Content-Length: 3423

<html>
    <body>...</body>
</html>
]
```

한번에 전송하고 한번에 쭉 받는것.

### 압축 전송(Content-Encoding)

```java
Client [GET /event] -> 

Server [
HTTP/1.1 200 OK
Content-Type: text/html;charset = UTF-8
Content-Encoding: gzip //gzip으로 압축
Content-Length: 521

<html>
    <body>...</body>
</html>
]
```

실제로 절반이상 정도 압축된다.

### 분할전송(Transfer-Encoding)

```java

Client [GET /event] ->

Server [
HTTP/1.1 200 OK
Content-Type: text/plain
Transfer-Encoding: chunked

5 //5Byte and send Hello
Hello
5 //5Byte and send Wrikd
World
0 //0Byte and send \r\n
\r\n 
]
```

예상이 안되기 때문에 Content-Length를 넣어서는 안된다.

### 범위 전송(Range, Content-Range)

```java
Client[
GET /event
Range: bytes=1001-2000
] ->

Server[
HTTP/1.1 200 OK
Content-Type: text/plain
Content-Range: bytes 1001-2000 / 2000 // 전송할 바이트 용량 // 파일 끝 길이

qweqwe1l2iu3019u2oehj1987askjh3q98y

```

## 일반정보

### From (유저에이전트의 이메일 정보)

일반적으로 잘 사용되지 않음

검색 엔진 같은 곳에서 주로 사용.

요청에서 사용

### Referer(이전 웹페이지 주소)

현재 요청된 페이지의 이전 웹페이지 주소

A → B로 이동하는 경우 B를 요청할 때 Referer: A를 포함해서 요청

`Referer를 사용해서 유입 경로 분석 가능`

요청에서 사용

참고 : referer는 단어 referrer의 오타이다.

### User-Agent(유저 에이전트 애플리케이션 정보)

user-agent: Mozlla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KTHML, like Gecko) Chrome/97.0.4240.183 Safari/537.36

클라이언트의 애플리케이션 정보(웹 브라우저 정보, 등등)

통계 정보 (사용자들이 이런 환경에서 많이 들어오는 구나)

`어떤 종류의 브라우저에서 장애가 발생하는지 파악가능`

요청에서 사용

### Server(요청을 처리하는 ORIGIN 서버의 소프트웨어 정보)

- ORIGIN 서버란?

HTTP를 요청하면 중간에 여러 Proxy서버, Cache서버를 거치게된다.

이때 HTTP 응답을 해주는 마지막의 진짜 서버를 ORIGIN서버라고 한다.

마지막 서버의 정보들을 보여준다.

Server: Apache/2.2.22 (Debian)

server: nginx

응답에서 사용

### Date(메시지가 발생한 날짜와 시간)

Date: Tue, 15 Nov 1994 08:12:31 GMT

응답에서 사용

## 특별한 정보

### Host: 요청한 호스트 정보 (도메인)

```java
GET /search?q=hello&hl=ko HTTP/1.1
Host: www.google.com
```

요청에서 사용

`필수이다.`

하나의 서버가 여러 도메인을 처리해야 할 때

하나의 IP 주소에 여러 도메인이 적용되어 있을 때

```java
Client
IP : 100.100.100.1

GET /hello HTTP/1.1
```

```java
Server
IP : 200.200.200.2
aaa.com
bbb.com
ccc.com

가상 호스트를 통해 여러 도메인을 한번에 처리할 수 있는 서버
실제 애플리케이션이 여러개 구동될 수 있다.
```

이러면 어디롤 보낼지 모르기 때문에 문제가 발생한다. 

```java
Client
IP : 100.100.100.1

GET /hello HTTP/1.1
Host: aaa.com // 이것을 넣어준다.
```

```java
Server
IP : 200.200.200.2
aaa.com //여기를 찾는거구나!
bbb.com
ccc.com

가상 호스트를 통해 여러 도메인을 한번에 처리할 수 있는 서버
실제 애플리케이션이 여러개 구동될 수 있다.
```

### Location (페이지 리다이렉션)

웹 브라우저는 3xx응답의 결과에 Location 헤더가 있으면, Location 위치로 자동 이동(리다이렉트)

응답코드 3xx에서 설명

201(Created) : Location 값은 요청에 의해 생성된 리소스 URI를 뜻한다.

3xx(Redirection) : Location 값은 요청을 자동으로 리디렉션하기 위한 대상 리소스를 가리킴

### Allow (허용 가능한 HTTP 메서드)

405 (Method Not Allowed) 에서 응답에 포함해야함.

Allow : GET, HEAD , PUT

구현안된곳도 있음.

### Retry-After(유저 에이전트가 다음 요청을 하기까지 기다려야 하는 시간)

503(Service Unavailable) : 서비스가 언제까지 불능인지 알려줄 수 있음.

Retry-After : Fri, 31 Dec 1999 23:59:59 GMT (날짜 표기)

Retry-After : 120(초단위 표기)

## 인증

### Authorization (클라이언트 인증 정보를 서버에 전달 )

Authorization : Basic xxxxxxxxxxxx

여러가지 인증 방법들이 많다.

### WWW-Authenticate ( 리소스 접근시 필요한 인증 방법 정의 )

리소스 접근시 필요한 인증 방법 정의

401 Unauthorized 응답과 함께 사용

WWW-Authenticate: Newauth realm=”apps”,type=1,title=”Login to \”apps\””, Basic realm=”simple”

## 쿠키

Set-Cookie : 서버에서 클라이언트로 쿠키 전달(응답)

Cookie: 클라이언트가 서버에서 받은 쿠키 를 저장하고, HTTP 요청시 서버로 전달

- 로그인 이전 welcome 페이지 접근

```java
Client[GET /welcome HTTP/1.1] -> Server[HTTP/1.1 200 OK 안녕하세요. 손님]
```

- 로그인 이후 welcome 페이지 접근

```java
Client[POST /login HTTP/1.1 user=홍길동] -> Server[HTTP/1.1 200 OK 홍길동님이 로그인했습니다.]
```

```java
Client[GET /welcome HTTP/1.1] -> Server[HTTP/1.1 200 OK 안녕하세요 **손님**]
```

분명히 홍길동이라고 나와야하는데, 손님이라고 나온다.

### 왜 이런 문제가 발생할까?

HTTP는 무상태(Stateless) 프로토콜이다.

클라이언트와 서버가 요청과 응답을 주고 받으면 연결이 끊어진다.

클라이언트가 다시 요청하면 서버는 이전 요청을 기억하지 못한다.

클라이언트와 서버는 서로 상태를 유지하지 않는다.

### 대안 1. 모든 요청에 사용자 정보를 포함한다.

```java
Client [GET /welcome?user=홍길동 HTTP/1.1] ->
Server [HTTP/1.1 200 OK 안녕하세요 홍길동님]
```

- 문제점

```java
Client [GET /welcome?user=홍길동 HTTP/1.1] ->
Client [GET /board?user=홍길동 HTTP/1.1] ->
Client [GET /order?user=홍길동 HTTP/1.1] ->
Client [GET /xxx...?user=홍길동 HTTP/1.1] ->
```

모든 요청에 사용자 정보가 포함되도록 개발을 해야함.

브라우저를 완전히 종료하고 다시 열어 할때마다 계속 보내면 너무 많다.

이러한 문제를 해결하기 위해 쿠키라는 대체제가 도입이 된다.

### 대안2. 쿠키를 사용한다.

```java
Client[POST /login HTTP/1.1 user=홍길동] ->
Server[
HTTP/1.1 200 OK
Set-Cookie: user=홍길동

홍길동님이 로그인했습니다.
]->
```

웹브라우저 내부에는 쿠키 저장소가 있다.

쿠키 저장소에 user=홍길동을 저장해둔다.

이렇게 하면 웹브라우저는 로그인 이후 welcome페이지에 접근할때마다 쿠키 저장소를 참조한다.

```java
Client[
GET /welcome HTTP/1.1
Cookie: user=홍길동
]
->

Server[
HTTP/1.1 200 OK

안녕하세요. 홍길동님
]
```

`쿠키는 모든 요청 정보에 쿠키정보를 자동으로 포함한다.`

```java
Client [GET /welcome?HTTP/1.1 Cookie: user=홍길동] ->
Client [GET /board? HTTP/1.1 Cookie: user=홍길동] ->
Client [GET /order? HTTP/1.1 Cookie: user=홍길동] ->
Client [GET /xxx...? HTTP/1.1 Cookie: user=홍길동] ->
```

```java
ex)set-cookie: sessionId=abbcde1234; expires=Sat, 26-Dec-2020 00:00:00 GMT; path=/; domain=.google.com ; Secure
```

만료일이 있구나.

경로, 도메인에 허용이 되는구나.

보안 설정이 되는구나.

- 사용처
    - 사용자 로그인 세션 관리
    - 광고 정보 트래킹
- `쿠키 정보는 항상 서버에 전송됨`
    - 네트워크 트래픽 추가 유발
    - 최소한의 정보만 사용(세션 id, 인증 토큰)
    - 서버에 전송하지 않고, 웹 브라우저 내부에 데이터를 저장하고 싶으면 웹 스토리지(localStorage, sessionStorage) 참고
- 주의점
    - 보안에 민감한 데이터는 저장하면 안됨(주민번호, 신용카드 번호 등)
    

### 쿠키의 생명주기 (Expires, Max-age)

Set-Cookie: expires = Sat, 26-Dec-2020 04:39:21 GMT

만료일이 되면 쿠키 삭제

Set-Cookie: max-age= 3600(3600초)

0이나 음수를 지정하면 쿠키 삭제

- 세션 쿠키: 만료 날짜를 생략하면 브라우저 종료시 까지만 유지

ex) 껏다키면 로그인 해제 되어 있는경우

- 영속 쿠키: 만료 날짜를 입력하면 해당 날짜까지 유지

### 쿠키 도메인(Domain)

내가 지정한 쿠키가 아무 사이트에 들어갈때마다 요청하면 보안에 문제가 많다.

ex) domain = [example.org](http://example.org)

- 명시 해주는 경우

domain=example.org를 지정하서 쿠키 생성

example.org는 물론이고 dev.example.org도 쿠기 접근 가능.

- 생략 해주는 경우
- example.org에서 쿠키를 생성하고 domain 지정을 생략

example.org에서만 쿠키 접근

dev.eample.org는 쿠키 미접근

### 쿠키 경로(Path)

ex) path=/home

이 경로를 포함한 하위 경로 페이지만 쿠키 접근

일반적으로 path=/ 루트로 지정

ex)

path =/home 지정

/home → 가능

/home/level1 → 가능

/home/level1/level2 → 가능

/hello → 불가능

### 쿠키 보안(Secure, HttpOnly, SameSite)

- Secure

쿠키는 http, https를 구분하지 않고 전송

Secure를 적용하면 https인 경우에만 전송

- HttpOnly

XSS 공격 방지

자바스크립트에서 접근 불가(document.cookie)

- SameSite
- XSRF 공격 방지
- 요청 도메인과 쿠키에 설정된 도메인이 같은 경우만 쿠키전송

## HTTP 헤더2 ( 캐시와 조건부 요청)

### 캐시의 기본동작 ( 캐시가 없을 때 )

```java
Client [GET /star.jpg]

Server[
HTTP/1.1 200 OK
Content-Type: image/jpeg
Content-Length: 34012

lkj123kljoiasudlkjaweioluywinfdo912...
]//전체 길이가 HTTP 헤더 : 0.1M, HTTP 바디 : 1.0M라고 가정
//전체 1.1M 전송

다시 요청

Client [GET /star.jpg]

Server[
HTTP/1.1 200 OK
Content-Type: image/jpeg
Content-Length: 34012

lkj123kljoiasudlkjaweioluywinfdo912...
]//전체 길이가 HTTP 헤더 : 0.1M, HTTP 바디 : 1.0M라고 가정
//전체 1.1M 전송
```

캐시가 없으면 데이터가 변경되지 않아도 계속 네트워크를 통해서 다운로드를 받아야한다.

인터넷 네트워크는 매우 느리고 비싸다.

브라우저 로딩 속도가 느리다.

느린 사용자 경험

### 캐시의 적용

```java
Server[
HTTP/1.1 200 OK
Content-Type: image/jpeg
cache-control: max-age=60 //캐시가 유효한 시간 60초
Content-Length: 34012

lkj123kljoiasudlkjaweioluywinfdo912...
]//전체 길이가 HTTP 헤더 : 0.1M, HTTP 바디 : 1.0M라고 가정
//전체 1.1M 전송
```

이렇게 하면 브라우저 캐시에 응답결과가 저장된다.

두번째로 요청을 하면 웹브라우저는 브라우저 캐시를 먼저 뒤져본다.

그리고 캐시에서 바로 가져온다.

캐시 덕분에 캐시 가능 시간동안 네트워크를 사용하지 않아도 된다.

비싼 네트워크 사용량을 줄일 수 있다.

브라우저 로딩 속도가 매우 빠르다.

빠른 사용자 경험

### 캐시의 적용 (캐시의 시간이 초과된 경우는?)

당연하게도 다시 요청해야한다.

즉, 캐시 유효시간이 초과하면, 서버를 통해 데이터를 다시 조회하고 캐시를 갱신한다.

이때 다시 네트워크 다운로드가 발생한다.

하지만! 캐시 유효시간이 지났다고해서 이미 받아놓은 데이터가 있는데 다시 조회하는것은 낭비이다.

이를 해결할 방법이 있다.

### 검증 헤더와 조건부 요청1

캐시 유효시간이 초과해서 서버에 다시 요청하면 두가지 상황이 나타난다.

1. 서버에서 기존 데이터를 변경함. (실제로 서버에 데이터가 변화 되었을때)
2. 서버에서 기존 데이터를 변경하지 않음. (실제 서버에 데이터의 변화가 없을때)

간단히 생각해보아도 서버의 데이터가 변하지 않았다면 데이터를 전송하는 대신에 저장해 두었던 캐시를 재사용 할 수 있다.

단 클라이언트의 데이터와 서버의 데이터가 같다는 사실을 확인할 수 있는 방법이 필요하다.

### 검증헤더의 추가

```java
Client[GET /star.jpg]

Server[HTTP/1.1 200 OK]
Content-Type: image/jpeg
cache-control: max-age = 60
Last-Modified: 2020년 11월 10일 10:00:00 //데이터의 최종 수정일(원래는 UTC로 표기)
Content-length : 34012

lkj123kljoiasudkjaweioluywlnfdo912u34...

```

이렇게 보내면 브라우저 캐시에 응답 결과를 캐시에 저장한다.

60초 초과 ,데이터 최종 수정일 2020년 11월 10일 10:00:00

웹브라우저는 다시 요청을 보낼때,

```java
Client[GET /star.jpg]
if-modified-since: 2020년 11월 10일 10:00:00 // 이부분을 조건부 요청이라고함.
```

이렇게 보내게 되는데, 그러면 데이터가 아직 수정되지 않았다는것을 검증할 수 있다.

중요한점! → 응답 메시지가 다르다. HTTP Body가 없고 헤더만 보낸다.

```java
HTTP/1.1 304 Not Modified
Content-Type: image/jpeg
cache-control: max-age=60
Last-Modified: 2020년 11월 10일 10:00:00
Content-Length: 34012
```

즉, 캐시 유효시간이 초과해도, 서버의 데이터가 갱신되지 않으면 304 Not Modified + 헤더 메타 정보만 응답하고 Body는 제거 한다.

클라이언트는 서버가 보낸 응답 헤더 정보로 캐시의 메타정보를 갱신한다.

클라이언트는 캐시에 저장되어 있는 데이터를 재활용한다.

결과적으로 네트워크 다운로드가 발생하지만 용량이 적은 헤더 정보만 다운로드한다.

매우 실용적인 해결책이다.

DOM에서 연한 색깔의 Status코드는 Cache에서 불러온것이다.

### 검증 헤더와 조건부 요청

- 검증헤더란?

캐시데이터와 서버데이터가 같은지 검증하는 데이터.

Last-Modified, ETag

- 조건부 요청 헤더

검증 헤더로 저건에 따른 분기

If-Modified-Since: Last-Modified 사용

If-None-Match: Etag 사용

조건이 만족하면 200 OK

조건이 만족하지 않으면 304 Not Modified

If-Modified-Since → 이후에 데이터가 수정되었는가? True, False

- 데이터 미변경 예시

캐시 : 2020년 11월 10일 10:00:00 vs 서버 : 2020년 11월 10일 10:00:00

304 Not Modified, Header Data만 전송(Body 미포함)

전송용량 0.1M (헤더 0.1M, 바디 1.0M)

- 데이터 변경 예시

캐시 : 2020년 11월 10일 10:00:00 vs 서버 : 2020년 11월 10일 11:00:00

200 OK 모든 데이터 전송(BODY 포함)

전송 용량 1.1M (헤더 0.1M, 바디 1.0M)

### Last-Modified, If-Modified-Since의 단점

1초 미만(0.x초) 단위로는 캐시 조정이 불가능

날짜 기반의 정해져있는  로직 사용

데이터를 수정해서 날짜가 다르지만 같은 데이터를 수정해서 데이터 결과가 같은 경우

서버에서 별도의 캐시 로직을 관리하고 싶은 경우 

ex) 스페이스나 주석처럼 크게 영향이 없는 변경에서 캐시를 유지하고 싶은 경우

이떄는 ETag를 사용해서 완벽히 제어할 수 있다.

### 검증헤더와 조건부 요청

ETag, IF-None-Match

ETag(Entity Tag)

캐시용 데이터에 임의의 고유한 버전 이름을 달아둠

ex) ETag: “v1.0”, ETag: “a2jiodwjekjl3” //`해쉬값으로 검증하는 아이디어`

데이터가 변경되면 이 이름을 바꾸어서 변경함(Hash를 다시 생성)

ex) ETag: “aaaaa” → ETag: “bbbbb”

진짜 단순하게 ETag만 보내서 같으면 유지, 다르면 다시 받기 

```java
Client[GET /star.jpg]

Server[
HTTP/1.1 200 OK
Content-Type: image/jpeg
cache-control: max-age=60
ETag: "aaaaaaaaaa"
Content-Length: 34012

lkj123kljoiaudlkjawiol...
]
```

브라우저 캐시에다가 ETag값을 저장한다.

이후

```java
GET /star.jpg
If-None-Match: "aaaaaaaaaa"
```

매치가 실패되면 데이터가 수정되지 않았다는것을 검증한것이다.

```java
HTTP/1.1 304 Not Modified
Content-Type: image/jpeg
cache-control: max-age=60
ETag: "aaaaaaaaaa"
Content-Length: 34012
```

BODY를 보내지 않음. 

단순하게 ETag만 서버에 보내서 같으면 유지, 다르면 다시받기

`캐시제어 로직을 서버에서 완전히 관리한다는 점 알아두자.`

클라이언트는 단순히 이값을 서버에 제공(클라이언트는 캐시 메커니즘을 모름)

ex) 서버는 베타오픈 기간인 3일 동안 파일이 변경되어도 ETag를 동일하게 유지

애플리케이션 배포 주기에 맞추어 ETag 모두 갱신

## 캐시 제어 헤더

### Cache-Control

캐시 지시어(Directives)

- Cache-Control: max-age

캐시 유효 시간, 초 단위

- Cache-Control: no-cache

데이터는 캐시해도 되지만, 항상 원(origin)서버에 검증하고 사용

- Cache-Control: no-store

데이터에 민감한 정보가 있으므로 저장하면 안됨

(메모리에서 사용하고 최대한 빨리 삭제)

### Pragma: 캐시제어(하위 호환)

Pragma:no-cache

HTTP 1.0 하위 호환

### Expires: 캐시 유효 기간(하위 호환)

expires: Mon, 01 Jan 1990 00:00:00 GMT

캐시 만료일을 정확한 날짜로 지정

HTTP 1.0부터 사용

지금은 더 유연한 Cache-Control: max-age 권장

Cache-Control: max-age와 함께 사용하면 Expires는 무시

## 프록시 캐시

![Untitled 13](https://user-images.githubusercontent.com/70310271/178148739-370f5bf4-60ed-4088-bfa5-c92dbd1d750b.png)

원래같으면 미국에서 시간이 걸려 데이터를 받아와야한다.

오리진서버에서 자주 사용하는 데이터들을 프록시 캐시서버에 미리 넣어두고 빠르게 끌어쓸수 있도록 하는것이다.

![Untitled 14](https://user-images.githubusercontent.com/70310271/178148744-5de9e9c5-d36c-400a-969d-d79aa7b553d0.png)

`프록시서버의 캐시를 public 캐시 , 웹브라우저에서의 캐시를 private 캐시라고 정의한다.`

- Cache-Control : public

응답이 public 캐시에 저장되어도 됨

- Cache-Control : private

응답이 해당 사용자만을 위한것임, private 캐시에 저장해야 함(기본값)

- Cache-Control : s-maxage

프록시 캐시에만 적용되는 max-age

- Age: 60 (HTTP 헤더)
- 오리진 서버에서 응답 후 프록시 캐시 내에 머문 시간(초)

## 캐시 무효화

캐시를 적용하지 않아도 웹브라우저는 임의로 캐시를 해버리기도 한다.

Cache-Control: no-cache

데이터는 캐시해도 되지만, 항상 원 서버에 검증하고 사용(이름에 주의!)

Cache-Control: no-store

데이터에 민감한 정보가 있으므로 저장하면 안됨! (메모리를 사용하고 최대한 빨리 삭제)

Cache-Control: must-revalidate

캐시 만료후 최조 조회시 원 서버에 검증해야함

원서버 접근 실패시 반드시 오류가 발생해야함 

Pragma : no-cache
