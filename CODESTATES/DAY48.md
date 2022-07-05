# DAY 48

JPA가 무엇인지 이해할 수 있다.

JPA의 동작방식을 이해할 수 있다.

JAP API의 기본 사용방법을 이해할 수 있다.

### JPA란?

JPA는 Java Persistence API로 Java 진영에서 사용하는 ORM기술의 표준사양(Spectfication)이다.

표준 사양이란?

Java 인터페이스로 사양이 정의되어 있기 떄문에, JPA라는 표준사양을 구현한 구현체는 따로 있다는것을 의미한다.

JPA를 학습한다면, JPA 표준 사양을 구현한 구현체에 대해서 학습한다고 생각하면 된다.

JPA를 구현한 구현체로는 Hibernate ORM, EclipseLink,DataNucleus등이 있는데,

Hibernate ORM을 배울것이다.

Hibernate ORM은 JPA에서 정의해둔 인터페이스를 구현한 구현체로써 JPA에서 지원하는 기능 이외에 Hibernate 자체적으로 사용할 수 있는 API를 지원한다.

JPA는 Java Persistence API의 약자이다. 하지만, 현재는 Jakarta Persistence라고도 불린다.

![Untitled](https://user-images.githubusercontent.com/70310271/177344361-2ece9222-3fdd-45fc-a40b-70dd8fe4d2d1.png)

데이터 저장 조회등의 작업은 JPA를 거쳐 JPA의 구현체인 Hibernate ORM을 통해서 이루어진다.

Hibernate ORM은 내부적으로 JDBC API를 이용해서 데이터베이스에 접근한다.

### JPA에서 P(Persistence)의 의미

### Persistence Context

JPA에서는 테이블과 매핑되는 엔티티 객체 정보를 영속성 컨텍스트(Persistence Context)라는 곳에 보관해서 애플리케이션내에서 오래 지속 되도록한다.

![Untitled 1](https://user-images.githubusercontent.com/70310271/177344384-f8a352cd-3573-463d-8a5f-179dbf8a2156.png)

JPA API중에서 엔티티 정보를 영속성 컨텍스트에 저장하는 API를 사용하면 컨텍스트의 1차 캐시에 엔티티 정보가 저장된다.

![Untitled 2](https://user-images.githubusercontent.com/70310271/177344409-ccb011ac-ae29-42c6-8cbd-c7d9c1b956dd.png)

ddl-auto는 JPA에서 사용하는 엔티티 클래스를 정의하고, 애플리케이션 실행 시, 이 엔티티와 매핑되는 테이블을 데이터베이스에 자동으로 생성해 준다.

schema.sql파일에 따로 스키마를 지정해주지 않아도 JPA에서는 show-sql: true로 설정하면, JPA가 자동으로 데이터베이스에 테이블을 생성해 준다.

### @GeneratedValue

식별자를 생성해주는 전략을 지정할때 사용한다.

식별자에 해당하는 멤버 변수에 이 애너테이션을 추가하면 데이터베이스 테이블에서 기본키가 되는 식별자를 자동으로 설정해준다.

![Untitled 3](https://user-images.githubusercontent.com/70310271/177344427-c6b53797-39a8-41c3-9991-45ba16b740cb.png)

JPA의 영속성 컨텍스트는 EntityManager 클래스에 의해서 관리된다.

이 EntityManager 클래스의 객체는 Spring으로부터 EntityManagerFactory 객체를 DI 받을 수 있다.

즉, EntityManagerFactory의 createEntityManager()를 사용해서 EntitiyManager를 얻을수 있는것이다.

이제 EntityManager클래스의 객체를 통해서 JPA의 API메서드를 사용할 수 있다.

![Untitled 4](https://user-images.githubusercontent.com/70310271/177344440-31189ae4-d754-4b91-8d6e-c011d63b6554.png)

em.persist(member) 영속성 컨텍스트에 member객체의 정보들이 저장된다.

find(Member.class,1L)

첫번째 파라미터에는 조회할 엔티티 클래스의 타입이 들어간다.

두번째 파라미터에는 조회할 엔티티의 클래스의 식별자 값이 들어간다.

![Untitled 5](https://user-images.githubusercontent.com/70310271/177344465-5071ae13-07ec-4963-8773-a4910bcb71ba.png)

위 코드를 실행하면, 영속성 컨텍스트는 위와 같은 상태가된다.

1차 캐시에 member객체 저장, member객체는 쓰기 지연 저장소에 INSERT 쿼리 형태로 등록된다.

![Untitled 6](https://user-images.githubusercontent.com/70310271/177344490-bd27adf9-8041-4d89-893f-4cd18012b145.png)

tx.begin() → Transcation을 시작하기 위해 메서드 호출.

tx.commit() → 영속성 컨텍스트에 들어가있는 member객체를 데이터베이스 테이블에 저장한다.

em.find(Member.class, 1L) → 1차 캐시에서 member객체를 조회한다.

`아직 1차 캐시에 member객체 정보가 있기 때문에 별도로 테이블에 SELECT쿼리를 전송하지 않는다.`

em.find(Member.class, 2L) → 1차 캐시에서 member객체를 조회한다.

하지만 값이 없으므로 테이블에서 SELECT쿼리를 전송한다.

![Untitled 7](https://user-images.githubusercontent.com/70310271/177344504-2d6306c7-76fb-4380-af99-8afecc9e1920.png)

tx.commit()을 했기에, member에 대한 INSERT쿼리는 실행되어 지연 SQL저장소에서 사라진다.

### 기억 해야할것!

1. em.persist()는 1차캐시에 객체를 저장한다. `그리고 쓰기지연 SQL 저장소에 INSERT 쿼리를 등록한다.`
2. tx.commit()은 쓰기 지연 저장소에 등록된 INSERT 쿼리가 실행된다. 실행된 INSERT 쿼리는 쓰기 지연 SQL 저장소에서 제거된다.
3. em.find()는 1차 캐시에서 우선에 데이터를 찾아보고 없다면, 데이터베이스에 SELECT 연산을 요청한다.

`영속성 컨텍스트에 저장하는것과, 데이터베이스 테이블에 저장하는것을 구분해야한다!`

커밋을 하기 전까지 데이터베이스 테이블에 저장되지 않는다는걸 기억하자.

![Untitled 8](https://user-images.githubusercontent.com/70310271/177344530-79c0bb7e-a948-44c8-ac8b-5b46baa9d4ce.png)

트랜잭션은 commit하면 끝이난다는걸 기억하고 있어야한다.

### Setter 값 변경시 UPDATE쿼리가 실행되는 이유

영속성 컨텍스트에 엔티티가 저장될 경우에는 저장되는 시점의 상태를 그대로 가지고 있는 스냅샷을 생성한다.

그후 엔티티의 값을 setter 메서드로 변경한 후,tx.commit()을 하면 변경된 엔티티와 이전에 이미 떠놓은 스냅샷을 비교한다.

이후 변경된 값이 있으면 쓰기 지연 SQL저장소에 UPDATE쿼리를 등록하고 UPDATE쿼리를 실행한다.

### 다시 한번 기억!

em.persist()는 엔티티 객체를 영속성 컨텍스트에 저장한다.

setter는 update할 수 있다.

em.remove()는  엔티티 객체를 영속성 컨텍스트에서 제거할 수 있다.

em.flush()를 사용하면 영속성 변경사항을 테이블에 반영할 수 있다.

tx.commit()은 내부적으로 em.flush()가 호출된다.
