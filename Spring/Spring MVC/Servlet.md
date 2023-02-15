### Config

```java
@ServletComponentScan // 서블릿이 자동등록되게끔 만들어줌
@SpringBootApplication
public class ServletApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServletApplication.class, args);
	}

}
```

### Servlet

```java
@WebServlet(name = "helloServlet",urlPatterns = "/hello")
public class HelloServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        // HTTP서블릿 요청정보를 활용해봄.
        String user = req.getParameter("username");

        // HTTP서블릿 응답정보를 직접 설정해봄.
        resp.setContentType("text/plain");
        resp.setCharacterEncoding("utf-8");
        resp.getWriter().write("hello " + user);

    }
}
```

HttpServletRequest와 HttpServletResponse는 인터페이스이다.

서블릿을 요청하고 응답을 둘다해본것이다. (서블릿은 요청후 코드를 돌리고 난 HTTP응답을 주는 자바 프로그램이다.

URL이 호출되면 서블릿 컨테이너는 해당 메서드를 실행시킨다.

### TIP) HTTP요청 응답 정보를 브라우저가 아니라, 콘솔에서 찍어보고 싶다면

```java
//application.properties
logging.level.org.apache.coyote.http11 = debug
```

코드를 추가하면된다.

### 응답이 일어나는 순서

1. 웹브라우저 헤당 URL로 요청을한다.
2. 우선 HTTP 요청 메시지의 틀을 기반으로 request를 만들고, response객체도 생성한다.
3. 해당 URL에 해당하는 서블릿을 호출한다.
4. 서블릿의 작업이 끝나면 response객체에 원하는 내용이 채워진다.
5. response 객체 정보로 HTTP 응답을 생성 한다.

![image](https://user-images.githubusercontent.com/70310271/219050147-41576a2f-1bdc-4f34-b5c6-438faddd073d.png)

Content-Length는 WAS가 자동으로 생성해줌.

### HTTPServletRequest

- HttpServletRequest의 역할은 무엇인가?

```java
POST /save HTTP/1.1
Host : localhost:8080
Content-Type: application/x-www-form-urlencoded

username=kim&age=20
```

위와 같은 HTTP 요청 메시지를 개발자가 직접 파싱해서 사용해도 되지만, 매우 불편하다.

서블릿은 개발자 대신 HTTP요청 메시지를 파싱한다.

그리고 그 결과를 HttpServletRequest객체에 담아서 제공한다.

HttpServlettRequest 객체는 추가로 여러가지 부가기능도 함께 제공하나다ㅏ.

- 임시 저장소 기능

해당 HTTP 요청이 시작부터 끝날 때 까지 유지되는 임시 저장소 기능이 있다.

```java
저장 : request.setAttribute(name, value)
조회 : request.getAttirbute(name)
```

- 세션 관리 기능

```java
request.getSession(create:true)
```

HttpServletRequest, HttpServletResponse를 사용할때 가장 중요한점은  각 객체에 대한 기능에 대해 깊이 있는 이해를 하기 위해서는 HTTP 스펙이 제공하는 요청, 응답 메시지 자체를 이해 해야한다는점이다.

```java
http://localhost:8080/request-header?username=hi

//Request Line
req.getMethod : GET
req.getProtocol : HTTP/1.1
req.getScheme : http
req.getRequestURL : http://localhost:8080/request-header
req.getRequestURI : /request-header
req.getQueryString : username=hi
req.isSecure : false

//Header Line
host: host
connection: connection
cache-control: cache-control
sec-ch-ua: sec-ch-ua
sec-ch-ua-mobile: sec-ch-ua-mobile
sec-ch-ua-platform: sec-ch-ua-platform
dnt: dnt
upgrade-insecure-requests: upgrade-insecure-requests
user-agent: user-agent
accept: accept
sec-fetch-site: sec-fetch-site
sec-fetch-mode: sec-fetch-mode
sec-fetch-user: sec-fetch-user
sec-fetch-dest: sec-fetch-dest
accept-encoding: accept-encoding
accept-language: accept-language

//Header 편의 조회
[Host 편의 조회]
req.getServerName() = localhost
req.getServerPort() = 8080

[Accept-Language 편의 조회]
locale = ko_KR
locale = ko
locale = en_US
locale = en
req.getLocale() = ko_KR // 최상위것만 뽑아옴.

[cookie 편의 조회]

[Content 편의 조회]
req.getContentType() = null // text/plain (hello!를 보냄)
req.getContentLength() = -1 // 6
req.CharacterEncoding() = UTF-8

// 기타 조회
[Remote 정보]
req.getRemoteHost() = 0:0:0:0:0:0:0:1
req.getRemoteAddr() = 0:0:0:0:0:0:0:1
req.getRemotePort() = 1373

[Local 정보]
req.getLocalName() = 0:0:0:0:0:0:0:1
req.getLocalAddr() = 0:0:0:0:0:0:0:1
req.getLocalPort() = 8080
```

로컬에서 테스트하면 IPv6정보가 나온다, IPv4 정보를 보고 싶으면 Vm options에 -Djava.net.preferIPv4Stack=true를 넣으면 된다.

### HTTP 요청 데이터

HTTP 요청 메시지를 통해 클라이언트에서 서버로 데이터를 전달하는 방법에는 3가지 방법이 있다.

1. GET - 쿼리 파라미터

/url?username=hello&age=20

메시지 바디 없이, URL의 쿼리 파라미터에 데이터를 포함해서 전달

ex) 검색, 필터, 페이징등에서 많이 사용하는 방식이다.

1. POST - HTML Form

Content-Type : application/x-www-form-urlencoded

컨텐츠타입이 저 형태로 들어오면, HTML 폼으로 들어온 정보라는것을 식별할 수 있다.

`메시지 바디에 쿼리 파라미터 형식으로 전달 username=hello&age=20` 

반드시 POST로만 처리된다. → Spring에서는 PUT과 같은 메서드로 처리되기도 하는데, 내부 로직에서는 POST를 사용한다.

ex) 회원가입, 상품 주문, HTML Form 사용

1. HTTP message body에 데이터를 직접 담아서 요청

HTTP API에서 주로 사용한다. JSON, XML, TEXT

데이터 형식은 주로 JSON 사용

POST, PUT, PATCH등의 메서드를 사용할 수 있다.

2022년 현재

여러 데이터들을 꺼내서 반복을 돌릴때는 아래 방식을 많이 사용한다.

```java
req.getParameterNames().asIterator()
       .forEachRemaining(paramName)
```

실제 파라미터를 조회할때는 저렇게 까지 할 일은 없다.

intellij Tip) iter 치고 엔터치면 반복문 자동완성된다.

- 복수 파라미터에서 단일 파라미터 조회

username=hello&username=kim과 같이 파라미터 이름은 1개 값이 중복되면?

request.getParameterValues()를 사용해야하며

중복일때 만약 getParameter()를 사용한다면, req.getParameterValues()의 첫번째 값을 반환한다.

req.getParameter()는 쿼리파라미터, HTML 폼 둘다에서 데이터를 뽑아올 수 있다.

브라우저 입장에서는 두 방식에 차이가 있지만, 서버 입장에서는 둘의 형식이 동일하기 때문에, 편리하게 구분없이 조회가 가능한것이다.

- API 메시지 바디 - 단순 텍스트로 받기

```
ServletInputStream inputStream = req.getInputStream();
String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
```

getInputStream()은 단순 텍스트를 바이트코드로 받는 메서드이다.

바이트코드이기 때문에, 인코딩을 해주어야하는데 방법은 다양하지만, StreamUtils를 사용하는게 편하다.

### Json으로 데이터 받는법

```java
@Getter
@Setter
public class HelloData {
    private String username;
    private int age;
}
```

스프링 부트로 SpringMVC를 선택하면 기본으로 Jackson 라이브러리(ObjectMapper)를 제공해준다.

```java
private ObjectMapper objectMapper = new ObjectMapper();
HelloData helloData = objectMapper.readValue(messageBody, HelloData.class);
```

HelloData 객체에 데이터가 저장되도록 만들기 위해서 Builder나, Mapper를 따로 만들어 줘도되지만, 하나만 적용하고 싶다면, ObjectMapper를 사용해도된다.

### HttpServletResponse

```java
@WebServlet(name = "responseHeaderServlet",urlPatterns = "/response-header")
public class ResponseHeaderServlet extends HttpServlet {

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        resp.setStatus(HttpServletResponse.SC_OK);
        resp.setHeader("Content-Type", "text/plain");
        resp.setHeader("Cache-Control","no-cache, no-store, must-revalidate");
        resp.setHeader("Pragma","no-cache");
        resp.setHeader("my-header","hello");

        PrintWriter writer = resp.getWriter();
        writer.println("ok");

    }
}
```

![image](https://user-images.githubusercontent.com/70310271/219050240-ef2a806d-ca6f-4f7b-9a25-060be96a3465.png)

my-header 처럼 아무 커스텀 헤더를 만들수도 있다.

### HTTP 응답 데이터 - 단순 텍스트, HTML

HTTP 응답 메시지는 주로 다음 내용을 담아서 전달한다.

단순 텍스트 → getWriter().print(”ok”);

HTML 응답

HTML API - MessageBody Json 응답

### 객체에 입력된 값들을 Json으로 바꾸는 방법

```java
@WebServlet(name = "responseJsonServlet" , urlPatterns = "/response-json")
public class ResponseJsonServlet extends HttpServlet {

    ObjectMapper objectMapper = new ObjectMapper();
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("utf-8");

        HelloData helloData = new HelloData();
        helloData.setUsername("kim");
        helloData.setAge(20);

        String result = objectMapper.writeValueAsString(helloData);
        resp.getWriter().write(result);
    }

}
```

objectMapper.writeValueAsString(객체);를 하면 객체가 바뀐다.

참고

application/json은 스펙상 utf-8 형식을 사용하도록 정의되어있다.

스펙에서 charset=utf-8과 같은 추가파라미터를 지원하지 않는다.

그래서 application/json;charset=utf-8이라고 전달하는건 의미없는 파라미터를 추가한것이다.

response.getWriter()를 쓰면 추가 파라미터를 자동으로 추가하는데,

response.getOutputStream()을 사용하면 이런 문제가 발생하지 않는다.
