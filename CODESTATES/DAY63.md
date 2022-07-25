![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b23f419a-a65e-454b-a4dc-0340051df092/Untitled.png)

1. 사용자가 Username과 Password를 통해 인증을 요청한다.
2. AuthenticationFilter의 구현체인 UsernamePasswordAuthenticationFilter는 전달받은 Username과 Password를 가지고 UsernamePasswordAuthenticationToken을 생성한다.
3. 생성된 Authentication을 AuthenticationManager에 전달한다.
4. AuthenticationManager는 전달받은 Authentication을 다수의 AuthenticationProvider에 전달하여 유효성 검증 및 처리를 위임한다.
5. 입력받은 사용자의 인증 정보의 유효성 검증을 위해 UserDetailsService로 전달한다.
6. UserDetailsService는 loadUserByUsername() 메소드를 통해 사용자 정보를 조회하여 실제 존재하는 사용자인지, Username과 Password가 유효한지 검증한다.
7. 만약 6에서 사용자 인증 정보 검증이 성공적으로 이루어졌다면 해당 사용자 정보를 활용해 UserDetails를 생성한다.
8. 생성된 UserDetails를 AuthnticationProvider에 전달한다.
9. authenticate()메소드가 호출되며 UserDetails와 Authorities로 생성한 Autentication을 전달한다.
10. 생성된 Authentication을 AuthenticationFilter에 전달한다.
11. AuthenticationFilter는 인증 처리가 모두 완료되어 해당 사용자의 인증 정보를 ㄷ마고있는 Authentication을 SecurityContext에 저장한다.

### Authentication

Spring Security에서 Authentication은 인터페이스로 존재하며 사용자가 인증을 성공적으로 수행하게 되면 사용자의 인증정보에 관련된 정보를 가지고 있다.

- principal : 사용자를 식별한다.

사용자의 고유 식별자와 암호로 인증이 이루어지면 일반적으로 UserDetails  인터페이스의 구현체이다. 구현체는 org.psinrgframework.security.core.userdetails.User 클래스가 있고 또한 직접 UserDetails를 상속받아 구현할 수 있다.

- credentials : 암호이다. 사용자의 인증이 이루어진후 지워진다.
- Authroties : AuthenticationManager에 의해 부여된 인가에 대한 정보이다. 부여된 권한에 대한 정보는 GrantedAuthrotiy로 추상화한다.
- 일반적으로 사용하는 구현체는 SimpleGrantedAuthroirty이다.

일반적으로 많이 사용되는 구현체는 UsernamePasswordAuthenticationToken이다.

UsernamePasswordAuthenticationOtken은 사용자의 고유식별자(Username)와 암호(Password)로 간단하게 Authentication 객체를 생성할 수 있다.

스프링 시큐리티는 사용자 인증 처리를 기본으로 제공한다.

스프링 시큐리티는 종합적인 인증(Authentication) 처리를 지원한다.

`인증은 특정 리소스에 접근하려고하는 사용자가 누구인지를 확인할 때 사용한다.`

보통 사용자가 이름 비밀번호를 입력하는것으로 사용자를 인증한다.

한번 인증하면 사용자를 식별하고 권한을 부여할 수 있다.

### Password Storage

스프링 시큐리티의 PasswordEncoder 인터페이스는 비밀번호를 안전하게 저장할 수 있도록 단방향 변환을 수행해준다.

PasswordEncoder를 사용해서 저장하는 비밀번호는 인증시점에 사용자가 입력하는 비밀번호와 비교하는 용도로 쓴다.

### Password Storage History

1. DB에 그냥 텍스트값으로 저장 → SQL 인젝션으로 보안문제 발생
2. SHA-256 단방향 해시 실행후 암호 저장 → 레인보우 테이블을 만들어 보안 문제발생
3. salted password (모든 사용자 비밀번호로 랜덤 바이트로 만듦)사용 → 기술발전으로 초당 수십억건 계산을 할 수 있게 되어, SHA-256과 같은 암호화 해시가 더이상 안전하지 않음.
4. 현재는 적응형 단방향 함수(Adaptive one-way function)을 추천함.

### Spring Security Architecture

- SecurityContextHolder

스프링 시큐리티에서 인증한 대상에 대한 상세정보는 SecurityContextHolder에 저장한다.

- SecurityContext

SecurityContexxtHolder로 접근할 수 있으며 인증한 사용자의 Authentication을 가진다.

- Authentication

사용자가 인증을 위해 제공한 자격증명(credential)이나 SecurityContext에 있는 현재 사용자의 자격 증명(credential)을 제공하며 AuthenticationManager의 입력으로 사용한다.

- GrantedAuthroity

Authentication에서 접근 주체에(principal)에 부여한 권한

- AuthenticationManager

스프링 시큐리티의 필터가 인증을 어떻게 수행하는지에 대한 방법을 정의하는 API

- ProviderManager

가장 많이 사용하는 AuthenticationManager 구현체

- AuthenticationProvider

ProviderManager가 특정 인증 유형을 수행할 때 사용한다.

- Request Credentials with AuthenticationEnrtyPoint

클라이언트에 credential을 요청할 때 사용한다.

AbstractAuthenticationProcessingFilter

인증에 사용할 Filter의 베이스

여러 컴포넌트를 조합해도 심도 있는 인증 플로우를 구성할 수 있다.

## SecurityContextHolder

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4f0bbcd2-9f5a-429f-8aa8-7885cf7bd2ee/Untitled.png)

스프링 시큐리티로 인증한 사용자의 상세정보를 저장한다.

스프링 시큐리티는 SecurityContextHolder에 값을 어떻게 넣을지 신경 쓰지 않고, 값이 있을때 현재 인증한 사용자 정보로 사용한다.

사용자 인증 처리의 가장 쉬운 방법은 직접 SecurityContextHolder를 설정하는것이다.

```java
SecurityContext context = SecurityContextHolder.createEmptyContext();
Authentication authentication = new TestingAuthenticationToken("username","password","ORLE_USER");
context.setAuthentication(authentication);
SecurityContextHolder.setContext(context); // 권한인가
```

### SecurityContext

SecuirtyContextHolder로 접근하는데 사용된다.

Authentication 객체를 가지고 있다.

### Authentication

AuthenticationManager의 입력으로 사용되어 인증에 사용할 사용자의 credential을 제공한다.

princial - 사용자를 식별하는 정보

사용자 이름/비밀번호로 인증할 땐 보통 UserDetails 인스턴스를 이용한다.

credentials 일반적으로 비밀번호를 사용한다.

authorities - 사용자에게 부여한 권한은 grantedAuthority로 추상화한다.

### GrantedAuthority

사용자에게 부여한 권한을 추상화한다.

role과 scope가 있다.

Authntication.getAuthorities() 메서드로 접근한다.

GrandtedAuthority 객체의 Collection을 리턴한다.
