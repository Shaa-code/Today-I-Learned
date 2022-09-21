### Spring Boot Auto Configuration

- Enables Spring Security’s default configuration, which creates a servlet `Filter` as a bean named `springSecurityFilterChain`. This bean is responsible for all the security (protecting the application URLs, validating submitted username and passwords, redirecting to the log in form, and so on) within your application.
- Creates a `UserDetailsService` bean with a username of `user` and a randomly generated password that is logged to the console.
- Registers the `Filter` with a bean named `springSecurityFilterChain` with the Servlet container for every request.

### What is “Principal”

The principal *is* the currently logged in user. However, you retrieve it through the security context which is bound to the current thread and as such it's also bound to the current request and its session.

### FilterChain이란?

`FilterChain`which contains the `Filter`s and `Servlet`that should process the `HttpServletRequest` based on the path of the request URI.

### Servlet이란?

In a Spring MVC application the `Servlet` is an instance of `[DispatcherServlet](https://docs.spring.io/spring-framework/docs/5.3.22/reference/html/web.html#mvc-servlet)`

At most one `Servlet` can handle a single `HttpServletRequest` and `HttpServletResponse`

### Authentication이란?

A라고 주장하는 주체(User, Subject, Principal)이 A가 맞는지 확인하는것.

코드에서의 Authentication은 인증 과정에 사용되는 핵심 객체이다.

ID/Password, JWT, OAuth등 여러 방식으로 인증에 필요한값이 전달되는데 이것을 하나의 인터페이스로 받아 수행하도록 추상화하는 역할의 인터페이스다.

`아이디/패스워드를 사용해 로그인 하는것은 인증에 해당한다.`

### Authorizaiton?

특정 자원에 대한 권한이 있는지 확인하는것.

### Credential이란?

인증 과정 중, 주체가 본일을 인증하기 위해 서버에 제공하는것.

용어가 정확히 무

하나씩 가보자

1. 로그인 요청이 들어온다.
2. 인증에 실패한다. → 인증을 만들어준다.
3. AuthenticationManager로 전달한다. 왜? 그러게 이걸 찾아야한다.

### AuthenticationManager의 기능은 무엇일까?

AuthenticationManager는 스프링 시큐리티 필터들이 인증을 이행하는 방법들이 모인 API다.

반환된 인증은 컨트롤러에 의해 SecurityContextHolder에 지정된다.

만약 스프링 필터들을 통합하지 않고 있다면, SecurityContextHolder를 직접 지정하고 AuthenticationManger는 필요없을 수 있다.

### ProviderManager의 기능은 무엇일까?

AutenticationManager를 구현하는데 주로 사용된다.

PrividerManger는 AuthenticationProvierds의 List로 위임한다.

### AuthenticationProvider란?

다양한 AuthenticationProvider는 ProviderMangaer로 주입될 수 있다.

AuthenticationProvider는 특정한 인증을 행한다.

예를들어, DaoAuthenticationProvider는 username/password을 기반으로한 인증을 제공한다.

반면에 JwtAuthenticationprovider는 JWT 토큰을 기반으로한 인증을 제공을한다.

### SecurityContextHolder

스프링 시큐리티가 누가 인증이 되었는지에 대해 details를 저장하는곳이다.

### SecurityContext

SecurityHolder에 의해 흡수 되었고, 현재 인증되고 유저의 인증을 포함한다.

## Rest API 보안

[Spring Security를 이용한 REST API 보안](https://sybarits.github.io/2020/11/08/rest-api-security.html)

### JwtAuthenticationFilter

클라이언트가 Jwt를 요청으로 보내었을떄, 요청받은 Jwt가 유효한 Jwt인지 검증하는 역할을 하는 Filter

### JwtTokenProvider

토큰을 생성하고 발행하거나 토큰을 파싱하고 유효한지 실제로 검사하는 클래스

### HTTP Only Cookies란?

브라우저에서 쿠키에 접근할 수 없도록 제한하는 것입니다. 이러한 역할을 하는 것이 바로 HTTP Only Cookie입니다.

```java
Set-Cookie : 쿠키명 = 쿠키값; path=/; HttpOnly
```

### Secure Cookies란?

HTTP Only Cookie를 사용하면 Client에서 Javascript를 통한 쿠키 탈취문제를 예방할 수 있었다.

하지만, 네트워크를 직접 감청해서 쿠키를 가로챌 수 있는데, 일반적으로 HTTPS 프로토콜을 사용하여 데이터를 암호화한다.

HTTPS는 쿠키또한 암호화되어 전송되기 때문에 제3자는 내용을 알 수 없다.

```java
Set-Cookie : 쿠키명 = 쿠키값; path=/; secure
```
