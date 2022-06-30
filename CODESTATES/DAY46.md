# DAY46

- JDBC가 무엇인지 이해할 수 있다.
- Java에서 JDBC가 어떤 역할을 하는지 이해할 수 있다.
- Spring Data JDBC가 무엇인지 이해할 수 있다.
- Spring Data JDBC를 이용해서 데이터의 저장, 수정, 조회, 삭제 작업을 할 수 있다.
- Spring Data JDBC 기반의 엔티티 연관 관계를 매핑할 수 있다.

### JDBC란?

Java DataBase Connectivity

Java기반 어플리케이션의 코드레벨에서 사용하는 데이터를 데이터베이스에 저장 및 업데이트하거나 반대로 데이터베이스에 저장된 데이터를 Java코드레벨에서 사용할 수 있도록 해주는 Java에서 제공하는 표준 API이다.

Spring Data JDBC나 Spring Data JPA 같은 기술은 데이터베이스와 연동하기 위해 내부적으로는 JDBC를 이용하기 때문에 JDBC의 구체적인 API 사용법을 알 필요는 없지만 JDBC의 동작 흐름 정도는 알면 Spring에서 지원하는 데이터 액세스 기술을 사용하는데 도움이 된다.

### JDBC의 동작흐름

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a6af3fe3-66d3-40bb-937f-88a08915c07a/Untitled.png)

JDBC API를 사용하기 위해서는 JDBC드라이버를 먼저 로딩한 후 데이터베이스와 연결한다.

JDBC 드라이버는 데이터베이스와의 통신을 담당하는 인터페이스이다.

Oracle,MSSQL,MySQL 각 회사에 맞는 JDBC드라이버를 구현해서 제공한다.

이 JDBC드라이버의 구현체를 이용해서 특정 회사의 데이터베이스에 접근 할 수 있다.

### JDBC API 사용 흐름

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e5b16fdc-0191-4e6f-992e-6914f95e1da3/Untitled.png)

1. JDBC 드라이버 로딩

사용하고자 하는 JDBC드라이버를 로딩한다.

DriverManger라는 클래스를 통해서 로딩된다.

1. Connection 객체 생성

JDBC 드라이버가 정상적으로 로딩되면 DriverManager를 통해 데이터베이스와 연결되는 세션인 Connection 객체를 생성한다.

1. Statement 객체 생성

Statement 객체는 작성된 SQL쿼리문을 실행하기 위한 객체로써, 객체 생성 후에 정적인 SQL 쿼리 문자열을 입력으로 가진다.

1. Query 실행

생성된 Statement 객체를 이용해서 입력한 SQL쿼리를 실행한다.

1. ResultSet 객체로 부터 데이터 조회

실행된 SQL 쿼리문에 대한 결과 데이터 셋이다.

1. ResultSet 객체 Close, Statement 객체 Close, Conncetion 객체 Close

JDBC API를 통해 사용된 객체들은 사용 이후에 사용한 순서의 역순으로 차례로 Close한다.

### Connection Pool이란?

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c0fc8ff0-c5dc-4dee-b649-c1c37db940ae/Untitled.png)

데이터베이스와의 연결을 위한 Conncetion 객체를 생성하는 작업은 비용이 많이 든다.

그래서 애플리케이션 로딩 시점에 Connection 객체를 미리 생성해두고 애플리케이션에서 데이터 베이스에 연결이 필요할 경우, 새로 생성하지 않고, 미리 만들어둔 Connection 객체를 사용함으로써 애플리케이션의 성능을 향상시킨다.

이처럼 데이터베이스 Connection을 미리 만들어서 보관하고 애플리케이션이 필요할 때 이Connection을 제공해주는 역할을 하는 Connection 관리자를 바로 Connection Pool 이라고한다.

### Spring Data JDBC란?

Spring Data JDBC는 JPA처럼 ORM기술을 사용한다.

난이도 : JPA > Spring Data JDBC

Spring Data JDBC, JPA, Spring Data JPA 3개다 배워야한다.

Sping은 [application.properties](http://application.properties) 또는 application.yml 파일을 통해 Spring에서 사용하는 다양한 설정 정보들을 입력할 수 있다.

.yml파일은 애플리케이션의 설정 정보를 depth 별로 입력할 수 있는 더 나은 방법을 제공하기 때문에 application.proerties의 파일 확장자를 application.yml로 변경한다.

### H2 DB

H2는 In-Memory 데이터베이스라서 껏다키면 사라진다. (테스트 용도)

main/java/resources/application.yml에 설정은 해준다.

1. 콘솔의 접속 URL Context path를 /h2로 설정한다.
2. JDBC URL이 매번 랜덤하게 바뀌지 않도록’jdbc:h2:mem:test”로 설정한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/448924a9-957b-4117-853f-c46489770f50/Untitled.png)

### @Id

```
@Getter
@Setter
public class Message {  // (1)
    @Id    // (2)
    private long messageId;
    private String message;
}
```

@Id애너테이션을 추가한 멤버변수는 해당 엔티티의 고유 식별자 역할을 하고, 이 식별자는 데이터 베이스의 Primary Key로 지정한 Column에 해당된다.
