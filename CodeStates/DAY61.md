## HTTPS(**H**yper **T**ext **T**ransfer **P**rotocol **S**ecure Socket layer)

HTTP 프로토콜 내용 암호화

기존의 HTTP방식은 중간에 패킷을 들여다보면 전송내용을 볼 수 있다.

하지만, HTTPS는 암호화를 하기 때문에, 바로 들여다 볼 수 는 없다.

### HTTPS가 보안을 유지하는 방법

- 인증서(Certificate)

데이터를 보내준 서버가 정말로 데이터를 보내준 서버인지 인증확인하는 용도

도메인을 비교한다.

 

```html
Client : A.com => Server : A.com -> comfirm ! 정상작동
Client : A.com => Response(변조시도) : B.com => Server : A.com -> ERROR
```

- CA(Certificate Authority) 공인 인증서 발급기관

각 브라우저는 각 신뢰하는 CA정보를 가지고 있다.

CA는 자격이 박탈 될 수도 있다.

- 비대칭 키 암호화

A키로 암호화 했다면, 그에 대응하는 B키 로만 복호화가 가능하다.

![Untitled](https://user-images.githubusercontent.com/70310271/180259230-c3a16411-b3b5-4927-81d5-c680ace76661.png)

HTTP의 패킷

![Untitled 1](https://user-images.githubusercontent.com/70310271/180259264-395acb7d-1f08-4916-82ed-cb095fa77532.png)

HTTPS의 패킷

![Untitled 2](https://user-images.githubusercontent.com/70310271/180259281-3c252fba-78e7-4d92-b3b9-2f1d590a3f29.png)

![Untitled 3](https://user-images.githubusercontent.com/70310271/180259307-0d73148a-9bff-4cd4-9fe6-2d549b3f22c0.png)

인증된 CA에서 발급한 인증서가 아니라면 경고창을 띄어준다.

결국 안전한 서버를 사용자가 사요하도록 유도하는것이다.

### 암호화(Encryption)

암호화는 일련의 정보르르 임의의 방식을 사용하여 다른 형태로 변환하여 해당 방식에 대한 정보를 소유한 사람을 제외하고 이해할 수 없도록 ‘알고리즘’을 이용해 정보를 관리하는 과정이다.

DB에는 원본 비밀번호를 그대로 저장하는게 아니라, 어떤 알고리즘을 거치고 난 결과를 DB에 저장해둔다.

### Hashing이란?

어떠한 문자열에 ‘임의의 연산’을 적용하여 다른 문자열로 변환하는것.

| password | Hassed Password(SHA1) |
| --- | --- |
| “password” | 5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8 |
| “123456” | 7c4aBd09ca3762af61e59520943dc26494f8941b |

### Cookie란?

서버가 웹 브라우저에 정보를 저장하고 불러올 수 있는 수단.

해당 도메인에 대해 쿠키가 존재하면, 웹 브라우저는 도메인에게 http요청시 쿠키를 함께 전달

Set-Cookie : UserId=kimcoding path=/Expire…

Set-Cookie : email=…path/ Expire=…

- Domain : 서버와 요청의 도메인이 일치하는 경우 쿠키 전송
- Path : 서버와 요청의 세부경로가 일치하는 경우 쿠키 전송
- MaxAge or Expires : 쿠키의 유효기간 설정
- HttpOnly : 자바스크립트(언어에서)의 쿠키 접근 가능 여부 결정
- Secure HTTPS : 프로토콜에서만 쿠키 전송 여부 결정
- SameSite : CORS요청의 경우 옵션 및 메서드에 따라 쿠키 전송 여부 결정
    
    Lax : 사이트가 서로 달라도,GET 요청이라면 쿠키 전송이 가능하다.
    
    Strict : 사이트가 서로 다르면, 쿠키 전송을 할 수 없다.
    
    None : 사이트가 달라도, 모든(GET, POST, PUT 등등) 요청에 대해 쿠키 전송이 가능하다.
    

### Session란?

서버가 Client에 유일하고 암호화된 ID를 부여

중요 데이터는 서버에서 관리 (쿠키는 클라이언트에게 저장한다.)

![Untitled 4](https://user-images.githubusercontent.com/70310271/180259335-35a8ee60-8a72-41b8-ad23-d9b9e87685d5.png)

|  | 설명 | 접속 상태 저장 경로 | 장점 | 단점 |
| --- | --- | --- | --- | --- |
| Cookie | 쿠키는 그저 http의 stateless한 것을 보완해주는 도구 | 클라이언트 | 서버에 부담을 덜어줌 | 쿠키 그 자체는 인증이 아님 |
| Session | 접속 상태를 서버가 가짐(stateful) 접속 상태와 권한 부여를 위해 세션아이디를 쿠키로 전송 | 서버 | 신뢰할 수 있는 유저인지 서버에서 추가로 확인 가능 | 하나의 서버에서만 접속 상태를 가지므로 분산에 불리 |

서버는 주로 in-memory, 또는 세션 스토어(redis등과 같은 트랜잭션이 빠른 DB에) 세션을 저장한다.

세션이 만들어지면, 각 세션을 구분할 수 있는 세션 아이디도 만들어지는데, 보통 클라이언트에 세션 성공을 증명할 수단으로써 세션 아이디를 전달한다.

이때 웹사이트에서 로그인을 유지하기 위한 수단으로 쿠키를 사용한다.

쿠키에는 서버에서 발급한 세션 아이디를 저장한다.

### 로그아웃

쿠키는 세션아이디, 즉 인증성공에 대한 증명을 갖고 있으므로, 탈취될 경우 서버는 해당 요청이 인증된 사용자의 요청이라도 판단한다.

그러므로 로그아웃은 다음 두가지 작업을 해야한다.

서버 : 세션 정보를 삭제해야한다.

클라이언트 : 쿠키를 갱신해야한다.

서버가 클라이언트의 쿠키를 임의로 삭제할 수 는 없다.

대신 set-cookie로 클라이언트에게 쿠키를 전송할 때 세션 아이디의 키값을 무효한 값으로 갱신한다.

### CSRF(Cross Stie Request Forgery)

다른 오리진(Cross-site)에서 유저가 보내는 요청(Request)을 조작(Forgery)하는것

ex) 이메일에 첨부된 링크를 누르면 내 은행계좌의 돈이 빠져나가는 방식

### 해커가 직접 데이터를 접근할 수 없다.

다른 오리진이기 때문에 response에 직접 접근할 수 없음.

- CSRF 공격을 하기 위한 조건
1. 쿠키를 사용한 로그인

유저가 로그인 했을때, 쿠키로 어떤 유저인지 알 수 있어야함.

1. 예측할 수 있는 요청/parameter를 가지고 있어야함

request에 해커가 모를 수 있는 정보가 담겨있으면 안됨.

- 어떻게 막을 것인가?
1. CSRF 토큰 사용하기

서버측에서 CSRF공격에 보호하기 위한 문자열을 유저의 브라우저와 웹 앱에만 제공

1. Same-site cookie 사용

같은 도메인에서만 세션/쿠키를 사용할 수 있다.
