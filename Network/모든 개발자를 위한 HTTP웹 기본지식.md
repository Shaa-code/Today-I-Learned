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
