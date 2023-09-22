## JPA 시작

스프링과 JPA는 자바 엔터프라이즈(기업) 시장의 주력 기술이다.

스프링이 DI 컨테이너를 포함한 애플리케이션 전반의 다양한 기능을 제공한다면, JPA는 ORM 데이터 접근 기술을 제공한다.

스프링 + 데이터 접근 기술의 조합을 구글 트랜드로 비교했을 때

`글로벌에서는 스프링 + JPA 조합을 80% 이상 사용한다.`

국내에서도 스프링 + JPA 조합을 50%정도 사용하고, 2015년 부터 점점 그 추세가 증가하고 있다.

JPA는 스프링 만큼이나 방대하고, 학습해야할 분량도 많다.

하지만 한번 배워두면 데이터 접근 기술에서 매우 큰 생산성 향상을 얻을 수 있다.

대표적으로 JdbcTemplate이나 MyBatis같은 SQL 매퍼 기술은 SQL을 개발자가 직접 작성해야 하지만,

JPA를 사용하면 SQL도 JPA가 대신 작성하고 처리해준다.

실무에서는 JPA를 더욱 편리하게 사용하기 위해 스프링 데이터 JPA와 QueryDSL이라는 기술을 함께 사용한다.

중요한 것은 JPA이다. 스프링 데이터 JPA, QueryDSL은 JPA를 편리하게 사용하도록 도와주는 도구라 생각하면 된다.

이 강의에서는 모든 내용을 다루지 않고, JPA와 스프링 데이터 JPA, 그리고 QueryDSL로 이어지는 전체 그림을 볼 것이다.

그리고 이 기술들을 우리 애플리케이션에 적용하면서 자연스럽게 왜 사용해야 하는지, 그리고 어떤 장점이 있는지 이해할 수 있게 된다.

이렇게 전체 그림을 보고 나면 앞으로 어떻게 공부해야 할지 쉽게 접근할 수 있을 것이다.

- 참고

각각의 기술들은 별도의 강의로 다룰 정도로 내용이 방대하다.

여기서는 해당 기술들의 기본 기능과, 왜 사용해야 하는지 각각의 장단점을 알아본다.

각 기술들의 자세한 내용은 다음 강의를 참고하자. → JPA 로드맵

### ORM 개념 1 - SQL 중심적인 개발의 문제점

애플리케이션은 객체지향 언어를 사용한다.

그런데 데이터베이스는 대부분 관계형 DB를 많이 사용한다.

즉, 지금 시대는 객체를 관계형 DB에 관리해야 한다.

관계형 DB는 SQL만 알아들을 수 있다.

그래서 SQL 중심적인 개발이 발생한다.

그런데 매일 INSERT INTO, UPDATE, SELECT, DELETE 와 같은 CRUD 작업을 한다.

자바 객체를 SQL로 바꾸고 SQL을 자바 객체로 바꾸고..

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/6252d154-7a64-4613-b220-4603718fbba4)

위 사진 처럼 2개만 사용하다가, 필드 하나가 더 추가되면

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/b3d85f96-f479-4f90-9633-501a65c1d165)

모든 SQL문에 또 필드를 하나 씩 다 추가해줘야 한다.

귀찮은건 둘째 치고, 하나라도 놓칠 경우에, 나중에 비즈니스에서 오류가 터지면 하나하나 찾기도 어렵고 문제도 심해진다.

SQL에 의존적인 개발을 피하기 어렵다.

객체 지향 프로그래밍은 추상화, 캡슐화, 정보은닉, 상속, 다형성 등 시스템의 복잡성을 제어할 수 있는 다양한 장치들을 제공한다.

객체를 RDB, NoSQL, FIle 등 여러 방식으로 저장을 할 수 있다.

그러러면 객체를 SQL로 변환을 해야한다.

그리고 변환한 SQL을 RDB에 넣어줘야 한다.

그런데, 객체를 SQL로 누가 변경해야 할까? 개발자가 해야한다.

하지만 객체와 관계형 데이터베이스의 차이 때문에 SQL로 변경하기 힘겹다.

## 객체와 RDB의 차이점

### 상속

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/a3606962-e9f0-44af-adea-03cbae1e8858)

테이블은 원칙적으로 상속 관계가 없다.

슈퍼타입 이라고 해서 상속과 비슷한 건 있지만 상속은 아니다.

- Album을 저장하기 위해서는 어떻게 해야할까?
1. 객체 분해
2. INSERT INTO ITEM
3. INSERT INTO ALBUM

이 처럼 쿼리를 2번 쪼개서 INSERT를 해줘야한다.

- Album을 조회하기 위해서는 어떻게 해야할까?

1. 각각의 테이블에 따른 조인 SQL 작성
2. 각각의 객체 생성
3. 상상만 해도 복잡
4. 더 이상의 설명 생략..
5. 그래서 DB에 저장할 객체에는 상속 관계 안쓴다.

- 만약 자바 컬렉션에 저장하면 어떻게 될까?

```xml
list.add(album);

Album album = list.get(albumId);

Item item = list.get(albumId);
// 부모 타입으로 조회 후 다형성 활용
```

## 연관관계

객체는 참조를 사용한다. ex) member.getTeam()

테이블은 외래 키를 사용한다. → JOIN ON M.TEAM_ID = T.TEAM_ID

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/5b981f26-1422-411d-bdbb-2f9935e5ddbe)

그래서 객체를 테이블에 맞추어 모델링을 한다.

```xml
class Member {
    String id;       // MEMBER_ID 컬럼 사용
    Long teamid;     // TEAM_ID FK 컬럼 사용 //**
    String username; // USERNAME 컬럼 사용
}
```

```xml
class Team {
    Long id; // TEAM_ID PK 사용
    String name; // NAME 컬럼 사용
}
```

이렇게 테이블에 맞게 설계해두면, 아래처럼 깔끔하게 SQL을 작성할 수 있다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/7a503e45-7c8b-43de-bf31-15030e08220b)

그런데 객체다운 모델링은 아래의 코드처럼 작성되는게 더 좋다.

```xml
class Member {
    String id;       // MEMBER_ID 컬럼 사용
    Team team;       // 참조로 연관관계를 맺는다.
    String username; //USERNAME 컬럼 사용
    
    Team getTeam(){
        return team;
    }
}

class Team{
    Long id;     //TEAM_ID PK 사용
    String name; //NAME 컬럼 사용
}
```

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/5d6090c6-4e09-4983-a425-b9e8f3735b10)

객체다운 모델링을 하면 member.getTeam().getId()를 해서 넣어줄 수 있다.

하지만 이건 너무 가독성이 떨어진다.

- 이번에는 객체를 조회해보자.

```xml
SELECT M.*, T.*
    FROM MEMBER M
    JOIN TEAM T ON M.TEAM_ID = T.TEAM_ID

public Member find(String memberId){
    //SQL 실행
    Member member = new Member();
    //데이터베이스에서 조회한 회원 관련 정보를 모두 입력
    Team team = new Team();
    //데이터베이스에서 조회한 팀 관련 정보를 모두 입력
		
    //회원과 팀 관계 설정
    member.setTeam(team);
    return member;  
}
```

메서드로 조회를 하려고 하면 위의 SQL을 실행한 뒤에, 받아온 값을 Member에 다 집어넣고,

Team에도 받아온 값을 다 집어 넣은 다음, 팀 관계를 설정해야 한다.

- 하지만 객체 모델링을 자바 컬렉션에 관리하면 어떨까?

```xml
list.add(member); //member 객체에 연관관계가 들어가있다고 가정.

Member member = list.get(memberId);
Team team = member.getTeam();
```

연관관계를 무언가가 미리 매핑해주면, list.get(memberId)를 하면 바로 내부 정보를 다 가져올 수 있다.

위의 그림 처럼 객체에 연관관게가 매핑되어있는 상태를 “객체 그래프”로 표현할 수 있다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/3d88b305-695a-4804-ae62-52cfa0463ee5)

이때, 객체는 자유롭게 객체 그래프를 탐색할 수 있어야 한다.

그런데 여기도 문제가 있다.

### 처음 실행하는 SQL에 따라 탐색 범위가 결정이 되어버린다.

```xml
SELECT M.*, T.*
    FROM MEMBER M
    JOIN TEAM T ON M.TEAM_ID = T.TEAM_ID

//위와 같은 쿼리 실행시 MEMBER와 TEAM은 연관관계를 자동으로 매핑할 수 있다. 하지만 Order는?

member.getTeam(); -> 데이터가 찾아와 진다.
member.getOrder(); -> 위 SQL에서는 TEAM만 찾아오기에 Order는 null이 반환된다.
```

```java
class MemberService{
    public void process(){
        Member member = memberDAO.find(memberId);
        member.getTeam(); // find를 해왔을 때, Team이 있는지 어떻게 확인하지?
        member.getOrder().getDelivery(); // Delivery는 어떻게 확인하지?
    }
}
```

SQL 코드를 까서 전부다 내가 확인을 해봐야한다.

즉, 내가 불러온 객체에 뭐가 들어가있는지 확실히 알 수가 없는 신뢰 문제가 발생한다.

### `여기서 발생하는 문제를 “엔티티 신뢰 문제”라고 한다.`

### 그렇다고해서 모든 객체를 미리 로딩할 수는 없다.

위의 객체 탐색 그래프의 그림만 봐도 JOIN이 몇번 정도 일어날 것 같은가?

정말 많이 일어날 것이다. 조금만 회원을 불러와도 메모리가 감당하기 어려울 것이다.

```java
memberDAO.getMember(); //Member만 조회
memberDAO.getMemberWithTeam(); //Member와 Team 조회
memberDAO.getMemberWithOrderWithDelivery();
```

그렇다고 해서 위의 코드처럼 상황에 따라 동일한 회원 조회 메서드를 여러번 생성하는것도 낭비이다.

계층형 아키텍처를 사용하지만, 진정한 의미의 계층 분할이 어렵다.

왜냐하면, memberDAO.find(memberId)를 했을 때, 이게 어떤 코드를 작성했는지 하나하나 전부다 찾아 보러 Service, Controller 까지 다 올라 가서 눈으로 확인해야하기 때문이다.

`즉, 물리적으로 계층이 분할 되어있지만, 논리적으로는 계층이 분할되어있지 않기 때문이다. // 설명이 조금 애매하다.`

### 또 비교하기에 대한 문제도 있다.

- SQL에서 가져온걸 조회하기.

```java
String memberId = "100"
Member member1 = memberDAO.getMember(memberId);
member member2 = memberDAO.getMember(memberId);

member1 == member2 // 다르다고 나온다.

class MemberDAO {
    public Member getMember(String memberId){
        String sql = "SELECT * FROM MEMBER WHERE MEMBER_ID = ?";
        ...
        //JDBC API, SQL 실행
        return new Member(...);
    }
}
```

- 자바 컬렉션에서 조회하기

```java
String memberId = "100"
Member member1 = list.get(memberId);
Member member2 = list.get(memberId);

member == member2; // 같다.
```

객체 답게 모델링하면 할수록 매핑 작업만 늘어난다.

객체를 자바 컬렉션에 저장하듯이 DB에 저장할 수는 없을까?

`이 문제를 JPA가 해결해 준다.`

1. 데이터 타입
2. 데이터 식별 방법

### ORM 개념2 - JPA 소개

JPA는 Java Persistence API의 약자이고 자바 진영의 ORM 기술 표준이다.

ORM은 Object-realtional mapping(객체 관계 매핑)

객체는 객체대로 설계

관계형 데이터베이스는 관계형 데이터베이스대로 설계

ORM 프레임워크가 중간에서 매핑

대중적인 언어에는 대부분 ORM 기술이 존재한다.

JPA는 애플리케이션과 JDBC 사이에서 동작한다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/7e0c2b52-28ce-4798-92c3-4ecf0067a923)

Java 애플리케이션이 JDBC API를 직접 사용하는 것이 아니라,

Java 애플리케이션이 JPA를 거쳐서 JDBC API와 통신한다.

### JPA 동작 - 저장

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/888784cf-c8fa-42c1-8975-d7400d279a7e)

### JPA 동작 - 조회

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/40541c08-3b73-414e-8507-febf2389813d)

옛날에도 Java 진영에도 ORM 기술이 있었다. 그게 EJB - 엔티티 빈이라는 자바 표준이 있었는데

너무 복잡했다. 그래서 Gavin Kim이라는 개발자가 써보고 내가 만들어도 이것보다는 잘만들겠다 싶어서 Hibernate만든다. 실제로 EJB보다 하이버네이트가 훨씬 평판이 좋았다.

그래서 자바 진영에서는 Gavin Kim을 데리고 와서 JPA라는 자바 표준을 만든다.

실용적인 오픈소스에서 출발해서 표준으로 만들어져 굉장히 좋다.

### JPA는 표준 명세

JPA는 인터페이스의 모음이다.

JPA 2.1 표준 명세를 구현한 3가지 구현체

Hibernate, EclipseLink, DataNucleus

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/97c7a15f-f597-411b-85f3-a92a3d4324b1)

### JPA 버전

- JPA 1.0(JSR 220) 2006년 : 초기 버전. 복합 키와 연관관계 기능이 부족
- JPA 2.0(JSR 317) 2009년 : 대부분의 ORM 기능을 포함, JPA Criteria 추가
- JPA 2.1(JSR 338) 2013년 : Stored Procedure 접근, Converter, 엔티티 그래프 기능 추가

20년 동안 개발되어서 왠만한 기능은 전부다 있다.

### JPA를 왜 사용해야 하는가?

SQL 중심적인 개발에서 객체 중심으로 개발을 할 수 있다.

- 생산성

저장 : jpa.persist(member)

조회 : member = jpa.find(memberId)

수정 : member.setName(”변경할 이름”)

삭제 : jpa.remove(member)

한 줄로 모두 해결된다..

- 유지보수

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/06bb3354-dab9-465e-a8f0-7ceda4f28c3b)

기존에는 필드 변경시 모든 SQL을 수정해야만 했다.

JPA를 사용하면 필드만 추가하면 모든게 끝이난다.

- 패러다임의 불일치 해결
1. JPA와 상속

- 저장

개발자 → jpa.persist(album);

JPA에서 → INSERT INTO ITEM… , INSERT INTO ALBUM… 쿼리를 자동으로 2번 날려 처리해준다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/b9c838d2-814b-482f-8b02-e8fe94352c7d)

- 조회

개발자 → jpa.find(Album.class, albumId);

JPA에서 → SELECT I.*, A.* FROM I JOIN ALBUM A ON I.ITEM_ID = A.ITEM_ID

상속관계에 있는 Item과 Album을 찾아서 자동으로 Join한 후에 객체로 반환해준다.

1. JPA와 연관관계, JPA와 객체 그래프 탐색

- 연관관계 저장

member.setTeam(team);

jpa.persist(member);

외래키에 해당하는 데이터를 JPA가 알아서 다 만들어준다.

- 객체 그래프 탐색

Member member = jpa.find(Member.class, memberId);;

Team team = member.getTeam();

멤버를 조회하면, team의 값이 나오게 된다.

### 신뢰할 수 있는 엔티티, 계층

```java
class MemberService{
    public void process(){
        Member member = memberDAO.find(memberId);
        member.getTeam();
        member.getOrder().getDelivery();
    }
}
```

JPA가 Team과 Order에 관련된 데이터를 다 가지고 올 수 있다.

### JPA와 비교하기

```java
String memberId = “100”;
Member member1 = jpa.find(Member.class, memberId);
Member member2 = jpa.find(Member.class, memberId);

member == member2; // 같다.
```

동일한 트랜잭션에서 조회한 엔티티는 같음을 보장해준다.

### JPA의 성능 최적화 기능

항상 데이터베이스와 애플리케이션 사이에 있는 계층에서는 2가지를 할 수 있다.

1. Cache
2. Buffer Write

1. 1차 캐시와 동일성 (identity) 보장

같은 트랜잭션 안에서는 같은 엔티티를 반환한다. - 약간의 조회 성능 향상

DB Isolation Level이 Read Commit 이어도 애플리케이션에서 Repeatable Read 보장

```java
String memberId = "100";
Member m1 = jpa.find(Member.class, memberId); // SQL
Member m2 = jpa.find(Member.class, memberId); // 캐시

println(m1 == m2) // true
```

1. 트랜잭션을 지원하는 쓰기 지연 (Transactional Write-Behind)

- INSERT

트랜잭션을 커밋할 때까지 INSERT SQL을 모음

JDBC BATCH SQL 기능을 사용해서 한번에 SQL 전송

```java
transaction.begin();

em.persist(memberA);
em.persist(memberB);
em.persist(memberC); //여기까지 INSERT SQL을 데이터베이스에 보내지 않는다.

//커밋하는 순간 데이터베이스에 INSERT SQL을 모아서 보낸다.
transaction.commit();
```

- UPDATE
1. UPDATE, DELETE로 인한 Row락 시간 최소화
2. 트랜잭션 커밋 시 UPDATE, DELETE SQL 실행하고, 바로 커밋

```java
transaction.begin();

changeMember(memberA);
deleteMember(memberB);
bussinessLogic(); //비즈니스 로직 수행 동안 DB로우 락이 걸리지 않는다.

//커밋하는 순간 데이터베이스에 UPDATE, DELETE SQL을 보낸다.
```

// 즉, 우선순위를 JPA내에서 시간을 최적화해서 보내게끔 만들어져있구나..

1. 지연 로딩 (Lazy Loading)
- 지연 로딩 : 객체가 실제 사용될 때 로딩
- 즉시 로딩 : JOIN SQL로 한번에 연관된 객체 까지 미리 조회

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/9fa5687a-58f1-46e0-bc56-34fd3e54d7dc)

멤버를 불러왔을 때 상황에 따라서 너무 많이 달라지네?

이러면 지연 로딩을 사용하는게 좋다.

멤버를 쓰는 경우에 team을 거의 항상 사용하네?

이런 경우에는 즉시로딩을 사용하는게 좋다.

`하지만, 일반적으로 개발할 때는 지연로딩으로 쭉 개발을 해놓고, 이런 부분은 최적화가 가능하네? 싶으면 그때 즉시로딩으로 바꾸는게 좋다.`

- 정리

ORM을 배우면, RDB를 안배워도 되는가?

JPA를 깊게 배워보면 알겠지만, RDB는 반드시 알아야한다.

Object와 Relational DB 라는 두 기둥위에 올라가 있는 기술이 ORM이므로 꼭 알아야한다.

애초에 객체지향 프로그래밍과 관계형 DB를 모르면 JPA를 제대로 활용할 수 없다.

`실무에서 장애의 90%는 DB에서 발생한다.`

`관계형 DB와 관련된 설계와 개발에 대해서는 굉장히 깊이있게 학습해야 한다.`

- 데이터 접근 추상화와 벤더 독립성
- 표준

```xml
org.hibernate.SQL=DEBUG
-> hibernate가 생성하고 실행하는 SQL을 확인할 수 있다.

org.hibernate.type.descriptor.sql.BasicBinder=TRACE
->  SQL에 바인딩 되는 파라미터를 확인할 수 있다.

spring.jpa.show-sql=true
-> 참고로 이런 설정도 있다.
이전 설정은 logger를 통해서 SQL이 출력된다.

이 설정은 System.out 콘솔을 통해서 SQL이 출력된다.

따라서 이 설정은 권장하지는 않는다.

(둘다 켜면 logger, sout 둘다 로그가 출력되어서 같은 로그가 중복해서 출력된다.)
```

### JPA 적용 1 - 개발

JPA에서 가장 중요한 부분은 객체와 테이블을 매핑하는 것이다.

JPA가 제공하는 애노테이션을 사용해서 Item 객체와 테이블을 매핑해보자.

Item - ORM 매핑

```java
@Data
@Entity
//@Table(name = "item") 객체명과 같으면 생략이 가능하다.
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "item_name", length = 10)
    private String itemName;

    private Integer price;
    private Integer quantity;

    public Item() {
    }

    public Item(String itemName, Integer price, Integer quantity) {
        this.itemName = itemName;
        this.price = price;
        this.quantity = quantity;
    }
}
```

@Entity → JPA가 사용하는 객체라는 뜻이다.

이 애노테이션이 있어야 JPA가 인식할 수 있다.

이렇게 @Entity가 붙은 객체를 JPA에서는 엔티티라 한다.

@Id → 테이블의 PK와 해당 필드를 매핑한다.

@GeneratedValue(strategy = GenerationType.IDENTITY)

→ PK 생성 값을 데이터베이스에서 생성하는 IDENTITY 방식을 사용한다.

ex) MySQL auto increment

@Column → 객체의 필드를 테이블의 컬럼과 매핑한다.

name = “item_name” → 객체는 itemName 이지만 테이블 컬럼은 item_name이므로 이렇게 매핑했다.

length = 10 → JPA의 매핑 정보로 DDL(create table)도 생성할 수 있는데, 그때 컬럼의 길이 값으로 활용된다. (varchar 10)

@Column을 생략할 경우 필드의 이름을 테이블 컬럼 이름으로 사용한다.

`참고로 지금처럼 스프링 부트와 통합해서 사용하면 필드 이름을 테이블 컬럼 명으로 변경할 때 객체 필드의 카멜 케이스를 테이블 컬럼의 언더스코어로 자동으로 변환해준다.`

// 스프링 부트라서 item_name으로 굳이 안해줘도 된다.

- 중요!

> `JPA는 public 또는 protected의 기본 생성자가 필수이다. 기본 생성자를 꼭 넣어주자.`
> 

이유는 이걸 기반으로 Proxy 객체를 만들기 때문이다. 생성자가 없으면 다른곳에서 생성해서 쓸 수가 없기 때문에 문제가 발생한다.

이렇게 하면 기본 매핑은 모두 끝난다. 이제 JPA를 실제로 사용하는 코드를 작성해 보자.

우선 코드를 작성하고 실행하면서 하나씩 알아보자.

JPA는 항상 트랜잭션 내에서 실행되기 때문에 @Transactional 을 반드시 넣어줘야 한다.

데이터 소스도 Factory를 만들어서 모두 셋팅을 해줘야하는데, 스프링부트에서 자동으로 해주기 때문에 EntityManager만 만들어서 그냥 사용하면 된다.

persist()를 하면 Item객체의 매핑 정보를 토대로 INSERT INTO 쿼리를 실행해서 DB에 저장한다.

그리고 GenerationType.IDENTITY를 통해서 DB에 자동으로 넣어준다.

```java
@Slf4j
@Repository
@Transactional // 일반적으로는 서비스 계층에 Transactional을 걸어주는게 맞다.
public class JpaItemRepository implements ItemRepository {

    private final EntityManager em;

    public JpaItemRepository(EntityManager em){
        this.em = em;
    }

    @Override
    public Item save(Item item) {
        em.persist(item); //Item 객체의 매핑 정보를 토대로 save를 진행해 준다.
        return item;
    }

    @Override
    public void update(Long itemId, ItemUpdateDto updateParam) {
        Item findItem = em.find(Item.class, itemId);
        findItem.setItemName(updateParam.getItemName());
        findItem.setPrice(updateParam.getPrice());
        findItem.setQuantity(updateParam.getQuantity());
        // 저장을 또 해줘야할 것 같은데, 따로 리포지토리에 저장을 하지 않아도 된다.
        // 트랜잭션이 끝날 때, JPA가 Update 쿼리를 만들어서 날린다.
        // 내부 로직에 대한 자세한 내용은 JPA강의에서 배운다.
    }

    @Override
    public Optional<Item> findById(Long id) {
        Item item = em.find(Item.class, id);// 클래스 먼저, 다음은 PK
        return Optional.ofNullable(item);

    }

    @Override
    public List<Item> findAll(ItemSearchCond cond) {
        
        //하나를 조회할 때는 id를 조회하면 된다.
        //여러가지 조건을 복잡하게 조회할 때는 SQL과 95%정도 비슷한 JPQL이란걸 사용한다.
        //객체를 다루는 언어이다.

        String jpql = "select i from Item i";

        Integer maxPrice = cond.getMaxPrice();
        String itemName = cond.getItemName();

        if (StringUtils.hasText(itemName) || maxPrice != null) {
            jpql += " where";
        }

        boolean andFlag = false;

        if (StringUtils.hasText(itemName)) {
            jpql += " i.itemName like concat('%',:itemName,'%')";
            andFlag = true;
        }

        if (maxPrice != null) {
            if (andFlag) {
                jpql += " and";
            }
            jpql += " i.price <= :maxPrice";
        }

        log.info("jpql={}", jpql);

        TypedQuery<Item> query = em.createQuery(jpql, Item.class);

        if (StringUtils.hasText(itemName)) {
            query.setParameter("itemName", itemName);
        }

        if (maxPrice != null) {
            query.setParameter("maxPrice", maxPrice);
        }

        return query.getResultList();

        //이것도 동적쿼리에 약하다.
    }
}
```

- private final EntityManager em

생성자를 보면 스프링을 통해 엔티티매니저라는 것을 주입받은 것을 확인할 수 있다. JPA의 모든 동작은 엔티티 매니저를 통해서 이루어진다.

엔티티 매니저는 내부에 데이터소스를 가지고 있고, 데이터베이스에 접근할 수 있다.

- @Transactional

JPA의 모든 데이터 변경(등록, 수정, 삭제)는 트랜잭션 안에서 이루어져야 한다.

`조회는 트랜잭션이 없어도 가능하다.`

변경의 경우 일반적으로 서비스 계층에서 트랜잭션을 시작하기 때문에 문제가 없다.

하지만 이번 예제에서는 복잡한 비즈니스 로직이 없어서 서비스 계층에서 트랜잭션을 걸지 않았다.

JPA에서는 데이터 변경시 트랜잭션이 필수다.

따라서 리포지토리에 트랜잭션을 걸어주었다.

`다시한번 강조하지만 일반적으로는 비즈니스 로직을 시작하는 서비스 계층에 트랜잭션을 걸어주는것이 맞다.`

- 참고

JPA를 설정하려면 EntityManagerFactory, JPATransactionManager, DataSource 등등 다양한 설정을 해야 한다.

스프링 부트는 이 과정을 모두 자동화 해준다.

main()메서드 부터 시작해서 JPA를 처음부터 어떻게 설정하는지 JPA 기본편을 참고하자.

그리고 스프링 부트의 자동 설정은 JPABaseConfiguration을 참고하자.

- update()시에 SQL로그는 출력이 안되는데 캐시에 넣어놔서 그렇다. 자세한건 JPA 강의에서 설명한다.

### JPA 적용2 - 리포지토리 분석

- JPA가 만들어서 실행한 SQL

```java
insert into item(id, item_name, price, quantity) values (null, ?, ?, ?)

또는

insert into item(id, item_name, price, quantity) values (default, ?, ?, ?)

또는

insert into item(item_name, price, quantity) values (?, ?, ?)
```

JPA가 만들어서 실행한 SQL을 보면 id에 값이 빠져있는 것을 확인할 수 있다.

PK 키 생성 전략을 IDENTITY로 사용했기 때문에 JPA가 이런 쿼리를 만들어서 실행한 것이다.

물론 쿼리 실행 이후에 Item 객체의 id 필드에 데이터베이스가 생성한 PK값이 들어가게 된다.

(JPA가 INSERT SQL 실행 이후에 생성된 ID 결과를 받아서 넣어준다.)

- JPA가 만들어서 실행한 SQL

```java
update item set item_name=?, price=?, quantity=? where id=?
```

em.update() 같은 메서드를 전혀 호출하지 않았다.

그런데 어떻게 UPDATE SQL이 실행되는 것일까?

JPA는 트랜잭션이 커밋되는 시점에, 변경된 엔티티 객체가 있는지 확인한다.

특정 엔티티 객체가 변경된 경우에는 UPDATE SQL을 실행한다.

JPA가 어떻게 변경된 엔티티 객체를 찾는지 명확하게 이해하려면 영속성 컨텍스트 라는 JPA 내부 원리를 이해해야 한다.

이 부분은 JPA 기본편에서 자세히 다룬다.

지금은 트랜잭션 커밋 시점에 JPA가 변경된 엔티티 객체를 찾아서 UPDATE SQL을 수행한다고 이해하면 된다.

테스트의 경우 마지막에 트랜잭션이 롤백되기 때문에 JPA는 UPDATE SQL을 실행하지 않는다.

테스트에서 UPDATE SQL을 확인하려면 @Commit을 붙이면 확인할 수 있다.

- findById() - 단건 조회

JPA에서 엔티티 객체를 PK를 기준으로 조회할 때는 find()를 사용하고 조회 타입과 PK값을 주면 된다.

그러면 JPA가 다음과 같은 조회 SQL을 만들어서 실행하고, 결과를 객채로 바로 변환해 준다.

- JPA가 만들어서 실행한 SQL

```java
select
    item0_.id as id1_0_0,
    item0_.item_name as item_nam2_0_0,
    item0_.price as price3_0_0_,
    item0_.quantity as quantity4_0_0_
from item item0_
where item0_.id=?
```

JPA 하이버네이트가 만들어서 실행한 SQL은 별칭이 조금 복잡하다.

조인이 발생하거나 복잡한 조건에서도 문제 없도록 기계적으로 만들다 보니 이런 결과가 나온듯 하다.

JPA에서 단순히 PK를 기준으로 조회하는 것이 아닌, 여러 데이터를 복잡한 조건으로 데이터를 조회하려면 어떻게 하면 될까?

- findAll

```java
public List<Item> findll(ItemSeachCond cond){
    TypedQuery<Item> query = em.createQuery(jpql, Item.class);
    return query.getResultList();
}
```

### JPQL

JPA는 JPQL(Java Persistence Query Language)라는 객체지향 쿼리 언어를 제공한다.

주로 여러 데이터를 복잡한 조건으로 조회할 때 사용한다.

SQL이 테이블을 대상으로 한다면, JPQL은 엔티티 객체를 대상으로 SQL을 실행한다 생각하면 된다.

엔티티 객체를 대상으로 하기 때문에 from 다음에 Item 엔티티 객체 이름이 들어간다.

엔티티 객체와 속성의 대소문자는 구분해야 한다.

JPQL은 SQL과 문법이 거의 비슷하기 때문에 개발자들이 쉽게 적응할 수 있다.

결과적으로 JPQL을 실행하면 그 안에 포함된 엔티티 객체의 매핑 정보를 활용해서 SQL을 만들게 된다.

- 실행된 JPQL

```java
select i from Item i
where i.itemName like concat('%', :itemName, '%')
    and i.price <= :maxPrice
```

- JPQL을 통해 실행된 SQL

```java
select
    item0_.id as id1_0_,
    item0_item_name as item_nam2_0_,
    item0_.price as price3_0_,
    item0_.quantity as quantity4_0_
from item item0_
where (item0_.item_name like ('%'||?||'%'))
    and item0_.price<=?
```

- 파라미터

JPQL에서 파라미터는 다음과 같이 입력한다.

- where price ≤ :maxPrice

파라미터 바인딩은 다음과 같이 사용한다.

- query.setParameter(”maxPrice”, maxPrice)

- 동적 쿼리 문제

JPA를 사용해도 동적 쿼리 문제가 남아있다.

동적 쿼리는 뒤에서 설명하는 QueryDSL 이라는 기술을 활용하면 매우 깔끔하게 사용할 수 있다.

실무에서는 동적 쿼리 문제 때문에 JPA를 사용할 때 QueryDSL도 함께 선택해야 한다.

영한님은 간단한 애플리케이션이 아니라면, QueryDSL 필수라고 생각하신다고 한다.

### JPA 적용3 - 예외 변환

JPA의 경우 예외가 발생하면 JPA 예외가 발생하게 된다.

EntityManager는 순수한 JPA 기술이고, 스프링과는 관계가 없다.

따라서 엔티티 매니저는 예외가 발생하면 JPA 관련 예외를 발생시킨다.

JPA는 PersistenceException과 그 하위 예외를 발생시킨다.

추가로 JPA는 IllegalStateException, IllegalArgumentException을 발생시킬 수 있다.

그렇다면 어떻게 JPA 예외를 스프링 예외 추상화(DataAccessException)으로 변환할 수 있을까?

비밀은 바로 @Repository에 있다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/158bc789-f1d8-4bc9-8d09-c531fb93f860)

- @Repository의 기능

@Repository가 붙은 클래스는 컴포넌트 스캔의 대상이 된다.

@Repository가 붙은 클래스는 예외 변환 AOP의 적용 대상이 된다.

- 스프링과 JPA를 함께 사용하는 경우 스프링은 JPA 예외 변환기(PersistenceExceptionTranslator)를 등록한다.
- 예외 변환 AOP 프록시는 JPA 관련 예외가 발생하면 JPA 예외 변환기를 통해 발생한 예외를 스프링 데이터 접근 예외로 변환한다.

~~서비스 계층에 넣는 @Service는 깡통이다. 컴포넌트 스캔 대상만 해당된다.~~

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/7f7fa22c-0432-4af2-91f9-1883fefc9bd7)

결과적으로 리포지토리에 @Repository 애노테이션만 있으면 스프링이 예외변환을 처리하는 AOP를 만들어 준다.

- Transactional도 빼줘야 확인할 수 있다.

```java
repository = class hello.itemservice.repository.jpa.JpaItemRepository$$EnhancerBySpringCGLIB$$3d0370ce
```

확실히 프록시 객체를 생성하는것을 볼 수 있다.

- 참고

스프링 부트는 PersistenceExceptionTranslationPostProcessor를 자동으로 등록하는데, 여기에서 @Repository를 AOP 프록시로 만드는 어드바이저가 등록된다.

- 참고

복잡한 과정을 거쳐서 실제 예외를 변환하는데, 실제 JPA 예외를 변환하는 코드는

EntityManagerFactoryUtils.convertJpaAccessExceptionIfPossible()이다.
