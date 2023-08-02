### 데이터베이스 방언

JPA는 특정 데이터베이스에 종속 X

각각의 데이터베이스가 제공하는 SQL 문법과 함수는 조금씩 다르다.

- 가변 문자 → MySQL은 varchar, Oracle은 varchar2
- 문자열을 자르는 함수 → SQL 표준은 SUBSTRING(), Oracle SUBSTR()
- 페이징 → MySQL은 LIMIT, Oracle은 ROWNUM

- `방언 → SQL 표준을 지키지 않는 특정 데이터베이스만의 고유한 기능`

여기서 쓰는 Dialect.H2Dialect는

`여러 방언들이 있는데, H2의 방언을 쓰겠다는 의미이다.`

### JPA 구동방식

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/4dbb31a6-9b37-4134-87a4-4caebf3f1bfd)

Persistence라는 클래스가 persistence.xml에서 설정 정보를 먼저 참조해서 EntityManagerFactory를 생성하고, 이 팩토리는 EntityManager를 생성한다.

```java
create table Member(
    id bigint not null,
    name varchar(255),
    primary key(id)
);
```

EntityManagerFactory는 애플리케이션 로딩 시점에 딱 1개만 만들어 두어야 한다.

트랜잭션 단위로 고객이 들어와서 한 행위를 하고 나가거나 할때 DB 커넥션을 얻어서 쿼리를 날리는 작업을 할때는 EntityManager를 꼭 만들어 줘야 한다.

쉽게 생각해서 데이터 커넥션 하나 받았다고 생각하면 된다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<persistence version="2.2"
             xmlns="http://xmlns.jcp.org/xml/ns/persistence" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/persistence http://xmlns.jcp.org/xml/ns/persistence/persistence_2_2.xsd">
    <persistence-unit name="hello">
        <properties>
            <!-- 필수 속성 -->
            <property name="javax.persistence.jdbc.driver" value="org.h2.Driver"/>
            <property name="javax.persistence.jdbc.user" value="sa"/>
            <property name="javax.persistence.jdbc.password" value="7983"/>
            <property name="javax.persistence.jdbc.url" value="jdbc:h2:tcp://localhost/~/test"/>
            <property name="hibernate.dialect" value="org.hibernate.dialect.H2Dialect"/>

            <!-- 옵션 -->
            <property name="hibernate.show_sql" value="true"/>
            <!-- 로그 전체를 보여준다. -->
            <property name="hibernate.format_sql" value="true"/>
            <!-- pretty 한 포맷으로 형식으로 뽑아준다. -->
            <property name="hibernate.use_sql_comments" value="true"/>
            <!-- /* insert hellojpa.Member */ 처럼 왜 이 쿼리가 발생했는지 알려준다. -->

            <!--<property name="hibernate.hbm2ddl.auto" value="create" />-->

            <!-- JDK 11 환경에서 JPA를 실행시키면 에러가 생기므로 별도로 추가-->
        </properties>
    </persistence-unit>
</persistence>
```

```java
7월 29, 2023 3:55:34 오후 org.hibernate.jpa.internal.util.LogHelper logPersistenceUnitInformation
INFO: HHH000204: Processing PersistenceUnitInfo [
	name: hello
	...]
7월 29, 2023 3:55:35 오후 org.hibernate.Version logVersion
INFO: HHH000412: Hibernate Core {5.3.10.Final}
7월 29, 2023 3:55:35 오후 org.hibernate.cfg.Environment <clinit>
INFO: HHH000206: hibernate.properties not found
7월 29, 2023 3:55:35 오후 org.hibernate.annotations.common.reflection.java.JavaReflectionManager <clinit>
INFO: HCANN000001: Hibernate Commons Annotations {5.0.4.Final}
7월 29, 2023 3:55:35 오후 org.hibernate.engine.jdbc.connections.internal.DriverManagerConnectionProviderImpl configure
WARN: HHH10001002: Using Hibernate built-in connection pool (not for production use!)
7월 29, 2023 3:55:35 오후 org.hibernate.engine.jdbc.connections.internal.DriverManagerConnectionProviderImpl buildCreator
INFO: HHH10001005: using driver [org.h2.Driver] at URL [jdbc:h2:tcp://localhost/~/test]
7월 29, 2023 3:55:35 오후 org.hibernate.engine.jdbc.connections.internal.DriverManagerConnectionProviderImpl buildCreator
INFO: HHH10001001: Connection properties: {password=****, user=sa}
7월 29, 2023 3:55:35 오후 org.hibernate.engine.jdbc.connections.internal.DriverManagerConnectionProviderImpl buildCreator
INFO: HHH10001003: Autocommit mode: false
7월 29, 2023 3:55:35 오후 org.hibernate.engine.jdbc.connections.internal.DriverManagerConnectionProviderImpl$PooledConnections <init>
INFO: HHH000115: Hibernate connection pool size: 20 (min=1)
7월 29, 2023 3:55:36 오후 org.hibernate.dialect.Dialect <init>
INFO: HHH000400: Using dialect: org.hibernate.dialect.H2Dialect
Hibernate: 
    /* insert hellojpa.Member
        */ insert 
        into
            Member
            (name, id) 
        values
            (?, ?)
7월 29, 2023 3:55:36 오후 org.hibernate.engine.jdbc.connections.internal.DriverManagerConnectionProviderImpl stop
INFO: HHH10001008: Cleaning up connection pool [jdbc:h2:tcp://localhost/~/test]

Process finished with exit code 0
```

```java
Hibernate: 
/* insert hellojpa.Member
    */ insert 
    into
        Member
        (name, id) 
    values
        (?, ?)
```

참고로 JAXB란 자바 클레스를 XML로 표현하는 자바 API입니다, 표현하기 위해 자바 객체를 XML로 직렬화하는 기능과 반대로 XML을 자바 객체로 역직렬화하는 기능을 가지고 있습니다.

```xml
Hibernate: 
    select
        member0_.id as id1_0_0_,
        member0_.username as username2_0_0_ 
    from
        USER member0_ 
    where
        member0_.id=?
```

### 주의점

엔티티 매니저 팩토리는 하나만 생성해서 애플리케이션 전체에서 공유한다.

엔티티 매니저는 쓰레드 간에 공유(X) (사용하고 버려야 한다.)

JPA의 모든 데이터 변경은 트랜잭션 안에서 실행

애플리케이션이 필요한 데이터만 DB에서 불러오려면 결국 검색 조건이 포함된 SQL이 필요하다. → 그런데 이렇게 불러오면 데이터베이스를 바꾸면 오류가 발생한다. (방언 때문에)

JPA를 쓰면 바로 바꾸어 주기 때문에 문제가 없어진다.

- JPQL

JPA는 SQL을 추상화한 JPQL이라는 객체 지향 쿼리 언어 제공

SQL과 문법 유사, SELECT, FROM, WHERE, GROUP BY, HAVING, JOIN 지원

JPQL은 엔티티 객체를 대상으로 쿼리

SQL은 데이터베이스 테이블을 대상으로 쿼리 (종속적임)

// 강의 스타일이 이전강의들과 달라서 정리를 어떻게 해야 될지 모르겠다..

다음 강의를 보고 판단하자.
