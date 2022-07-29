- OAuth2의 인증 방식 설명
- Authrization Code와 Access Token의 차이에 대해 이해할 수 있다.
- Authorization 서버와 REsource서버의 차이에 대해 이해할 수 있다.
- Spring Security에서 OAuth를 구현할 수 있다.

- OAuth2가 무엇인지 이해할 수 있다.
- OAuth2의 인증 방식에 대해 설명할 수 있다.
- Authorization 서버와 Resource서버의 차이에 대해 이해할 수 있다.

### OAuth2.0이란?

인증을 위한 표준 프로토콜의 한종류이다.

보안된 리소스에 엑세스하기 위해 클라이언트에게 권한을 제공(Authroization)하는 프로세스를 단순화하는 프로토콜 중 한 방법이다.

### OAuth에서 꼭 알아야할 용어

Resource Owner : 액세스 중인 리소스의 유저

Client: Resource owner를 대신하여 보호된 리소스에 액세스하는 응용프로그램

Resource Server : Client의 요청을 수락하고 응답할 수 있는 서버

Authorization Server : Resource server가 액세스 토큰을 발급받는 서버

Authorization grant : 클라이언트가 액세스 토큰을 얻을 때 사용하는 자격 증명

Authorization code : access token을 발급받기 전에 필요한 code

Access token : 보호된 리소스에 액세스하는데 사용되는 credentials

Scope : 주어진 액세스 토큰을 사용하여 액세스 할 수 있는 리소스 범위

### Grant Type이란?

Client가 액세스 토큰을 얻는 방법

- Authorization Code Grant Type

액세스 토큰을 받아오기 위해서 먼저 Authorization code를 받아 액세스 토큰과 교환하는 방법

Authroziation code 절차를 거치는 이유는 보안성 강화에 목적이 있다.

Client에서 lcient-secret을 공유하고 액세스 토큰을 가지고 오는 것은 탈취될 위험이 있기 때문에

Client에서는 authorization code만 받아오고 Server에서 Access token 요청을 진행한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cbe7b9d6-2ce7-411a-bc26-71d6b99020eb/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6190104d-d0c4-40be-bbe2-46b7aa878164/Untitled.png)

- Implicit Grant Type
- Client Credentials Grant Type
- Resource Owner Credentials Grant Type
- Refresh Token Grant Type

일정 기간 유효 시간이 지나서 만료된 액세스 토큰을 편리하게 다시 받아오기 위해 사용하는 방법

Access token보다 Refresh token의 유효 시간이 대체로 조금 더 길게 설정하기 때문에 가능한 방법이다.

server마다 Refresh token에 대한 정책이 다 다르기 때문에 Refresh token을 사용하기 위해서는 사용하고자 하는 server의 정책을 살펴볼 필요가 있다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b4f7cc2f-0255-4926-a98a-90d2f8825bba/Untitled.png)

### OAuth2의 동작방식

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b20a5253-b421-4b07-9379-3de79fc91a56/Untitled.png)
