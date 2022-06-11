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
Content-Type: text/hhtml;chharset=UTF-8
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
