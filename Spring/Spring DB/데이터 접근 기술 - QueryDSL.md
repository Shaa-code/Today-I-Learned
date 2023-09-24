```java
String sql = "select * from member" + "where name like ?" + "and age between ? and ?"
```

문자를 합치면 “select * from memberwhere name like ?and age between ? and ?이다.

띄어쓰기가 문제가 된다.

### Query의 문제점

Query는 문자이다. 또한 Type-Check가 불가능하다.

실행하기 전까지 작동여부 확인 불가.

컴파일 에러에서 잡아주면 좋은데, 그렇지 못해서

런타임 에러 잡아야한다. 

고객이 호출 할 때 발생하는 런타임 에러는 정말 안좋은 경우이다.

또한 예약어를 모두 암기하고 있는것도 어렵다.

### SQL, JPQL

만약 SQL이 클래스처럼 타입이 있고 자바 코드로 작성할 수 있다면?

- Type Safe

컴파일시 에러 체크 가능

코드 어시스턴스 가능

CTRL + SPACE + . 

### QueryDSL

쿼리를 Java로 type-safe하게 개발할 수 있게 지원하는 프레임워크

SQL작성도 가능하지만 복잡해서 주로 JPA 쿼리(JPQL)에 사용한다.

JPA에서 Query 방법은 크게 3가지가 있다.

1. JPQL(HQL)

SQL Query와 비슷해서 금방 익숙해짐.

하지만 Type-Safe가 아니고 동적 쿼리 생성이 어려움.

```java
@Test
public void jpql() {
    String query =
            "select m from Member m " +
            "where m.age between 20 and 40" +
            " and m.name like '김%'" +
            " order by m.age desc";
    
    List<Member> resultList =
        entityManager.createQuery(query, Member.class)
            .setMaxResult(3).getResultList();
            
}
```

1. Criteria API

```java
@Test
public void jpaCriteriaQuery(){

    CriteriaBuilder cb = entityManager.getCriteriaBuilder();
    CriteriaQuery<Member> cq = cb.createQuery(Member.class);
    Root<Member> root = cq.from(Member.class);

    Path<Integer> age = root.get("age");
    Predicate between = cb.between(age,20,40);

    Path<String> path = root.get("name");
    Predicate like = cb.like(path, "김%");

    CriteriaQuery<Member> query = cq.where(cb.and(between,like));
    query.orderBy(cb.desc(age));

    List<Member> resultList =
            entityManager.createQuery(query).setMaxResults(3).getResultList();
}
```

동적쿼리는 편리하게 작성할 수 있는데, 코드가 너무 길다..

그런데 Type-Safe도 아니고, 너무 복잡하고, 배워야 할 것도 너무 많다.

JPA 표준 쿼리인데 너무 아쉽다.

1. MetaModel Criteria API(Type-Safe)

```java
root.get(”age”) →  root.get(Member_.age)
```

Type-Safe이기는 하지만 

Criteria API + MetaModel

Criteria API와 거의 동일

복잡하기는 마찬가지이다.

이 3가지를 모두 사용 해보게 되지만, 다음날 무슨 코드를 짰는지 기억이 안나게 된다.

TimoWest라는 사람이 나타나서 QueryDSL을 만든다.

### QueryDSL이란?

- DSL이란?

Domain(도메인)

Specific(특화)

Language(언어)

도메인 + 특화 + 언어

특정한 도메인에 초점을 맞춘 제한적인 표현력을 가진 컴퓨터 프로그래밍 언어

특징 : 단순, 간결, 유창

- QueryDSL이란?

쿼리 + 도메인 + 특화 + 언어

쿼리에 특화된 프로그래밍 언어

단순, 간결, 유창

다양한 저장소 쿼리 기능 통합

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/31717d83-e231-46ca-a2dc-d04be6a946e1)

대부분의 DB에 있는 쿼리 내용들을 추상화 해보겠다!

- QueryDSL

JPA, MongoDB, SQL 같은 기술들을 위해 type-safe SQL을 만드는 프레임워크

- Type-safe Query Type 생성

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/659689d3-5916-4857-92df-fcf8111d1947)

JPA 같은 경우 테이블 정보를 뽑아내고, 코드 생성기가 돌아서 쿼리용 멤버 객체를 만들어낸다.

그래서 APT : Annotation Processing Tool

- @Entity

### QueryDSL-JPA

QueryDSL은 JPA쿼리(JPQL)을 Type-Safe하게 작성하는데 많이 사용된다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/fa105505-ec35-45aa-a938-35e267fbc39c)

위와 같은 코드를 거쳐서 아래의 코드가 만들어 진다.

```java
@Generated
public class QMember extends EntityPathBase<Member>{
    public final NumberPath<Long> id = createNumber("id", Long.class)
    public final NumberPath<Integer> age = createNumber("age", Integer.class)
    public final StringPath name= createString("name");

    public static final QMember member = new QMember("member");
}
```

어떻게 쿼리를 작성하는가?

```java
JPAQueryFactory query = new JPAQueryFactory(entityManager);
QMember m = QMember.member;

List<Member> list = query
    .select(m)
    .from(m)
    .where(
        m.age.between(20,40).and(m.name.like("김%")))
    .orderBy(m.age.desc())
    .limit(3)
    .fetch(m);
)
```

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/7eb4d427-6c22-4f94-85a0-cafeae3ca236)

QUERYDSL → JPQL → SQL로 변환되는 순서이다.

QUERYDSL-JPA는 TypeSafe하고 단순하다 그리고 쉽다.

하지만 쿼리코드를 작성하기 위한 APT를 설정해야한다.

### 동적쿼리

```java
String firstName = "김";
int min = 20, max = 40;

BooleanBuilder builder = new BooleanBuilder();
if(StringUtils.hasText(str))
    budiler.and(m.name.startsWith(firstName));

if(min != 0 && max != 0)
    builder.and(m.age.between(min, max));

List<Member> results = query
    .select(m)
    .from(m)
    .where(builder)
    .fetch(m);
```

Spring Data JPA + QueryDSL

Spring Data 프로젝트의 약점은 조회이다.

QueryDSL로 복잡한 조회 기능을 보완한다.

- 복잡한 쿼리
- 동적 쿼리

단순한 경우 → SpringDataJPA

복잡한 경우 → QueryDSL 직접 사용

- 결론

한번 써보면 돌아올 수 없다.

감동의 컴파일 에러.

감동의 IDE 지원, Ctrl+Space, Code-Assistant

JPQL로 해결하기 어려운 복잡한 쿼리는 네이티브 SQL 쿼리 사용

(JdbcTemplate, MyBatis) 

### 옵션 선택1 - Gradle - Q타입 생성 확인 방법

- Gradle Intellij 사용법

Gradle → Tasks - build → clean

Gradle → Tasks → other → complieJava

- Gradle 콘솔 사용법

./gradlew clean compileJava

### Q타입 생성 확인

build → generated → sources → annotationProcessor → java/main 하위에

hello.itemservice.domain.QItem이 생성되어 있어야 한다.

참고→ Q타입은 컴파일 시점에 자동 생성되므로 버전관리(GIT)에 포함하지 않는 것이 좋다.

gradle 옵션을 선택하면 Q타입은 gradle bulid 폴더 아래에 생성되기 때문에 여기를 포함하지 않아야 한다.

대부분 gradle build 폴더를 git에 포함하지 않기 때문에 이부분은 자연스럽게 해결된다.

- Q타입 삭제

```java
clean{
    delete file('src/main/generated')
}
```

Intellij IDEA로 설정했다면 내가 수동으로 지워줘야 된다는 것만 기억하자.

gradle clean을 수행하면 build폴더 자체가 삭제된다. 따라서 별도 설정은 없어도된다. (위 스크립트를 설정해줘서 가능한 것임.)

- 참고

QueryDSL은 이렇게 설정하는 부분이 사용하면서 조금 귀찮은 부분인데, Intellij가 버전업 하거나 QueryDSL의 Gradle 설정이 버전업 하면서 적용 방법이 조금씩 달라지기도 한다.

그리고 본인의 환경에 따라서 잘 동작하지 않기도 한다.

공식 메뉴얼에 소개되어 있는 부분이 아니기 때문에, 설정에 수고로움이 있지만, QueryDSL gradle로 검색하면 본인 환경에 맞는 대안을 금방 찾을 수 있을 것이다.

### QueryDSL 적용

```java
@Repository
@Transactional
public class JpaItemRepositoryV3 implements ItemRepository {

    private final EntityManager em;
    private final JPAQueryFactory query;

    public JpaItemRepositoryV3(EntityManager em){
        this.em = em;
        this.query = new JPAQueryFactory(em);
    }

    @Override
    public Item save(Item item) {
        em.persist(item);
        return item;
    }

    @Override
    public void update(Long itemId, ItemUpdateDto updateParam) {
        Item findItem = em.find(Item.class, itemId);
        findItem.setItemName(updateParam.getItemName());
        findItem.setPrice(updateParam.getPrice());
        findItem.setQuantity(updateParam.getQuantity());
    }

    @Override
    public Optional<Item> findById(Long id) {
        Item item = em.find(Item.class, id);
        return Optional.ofNullable(item);
    }

    @Override
    public List<Item> findAll(ItemSearchCond cond) {
        String itemName = cond.getItemName();
        Integer maxPrice = cond.getMaxPrice();

        BooleanBuilder builder = new BooleanBuilder();
        if(StringUtils.hasText(itemName)){
            builder.and(item.itemName.like("%" + itemName + "%"));
        }
        if(maxPrice != null){
            builder.and(item.price.loe(maxPrice));
        }

        //Qfile에 있는 Qfile.item을 가져온다.
        return query.select(item)
                .from(item)
                .where(builder)
                .fetch();
    }

    public List<Item> findAllOld(ItemSearchCond cond) {
        String itemName = cond.getItemName();
        Integer maxPrice = cond.getMaxPrice();

        BooleanBuilder builder = new BooleanBuilder();
        if(StringUtils.hasText(itemName)){
            builder.and(item.itemName.like("%" + itemName + "%"));
        }
        if(maxPrice != null){
            builder.and(item.price.loe(maxPrice));
        }

        //Qfile에 있는 Qfile.item을 가져온다.
        return query.select(item)
                .from(item)
                .where(likeItemName(itemName), maxPrice(maxPrice))
                .fetch();
    }

    private BooleanExpression maxPrice(Integer maxPrice) {
        if(maxPrice != null){
            returnitem.price.loe(maxPrice);
        }
        return null;
    }

    private BooleanExpression likeItemName(String itemName){
        if(StringUtils.hasText(itemName)){
            returnitem.itemName.like("%" + itemName + "%");
        }
        return null;
    }
}

```

- 공통

QueryDSL을 사용하려면 JPAQueryFactory가 필요하다.

JPAQueryFactory는 JPA 쿼리인 JPQL을 만들기 때문에 EntityManager가 필요하다.

설정 방식은 JdbcTemplate을 설정하는 것과 유사하다.

참고로 JPAQueryFactory를 스프링 빈으로 등록해서 사용해도 된다.

- save(), update(), findById()

기본 기능들은 JPA가 제공하는 기본 기능을 사용한다.

- findAllOld

QueryDSL을 사용해서 동적 쿼리 문제를 해결한다.

BooleanBuilder를 사용해서 원하는 where 조건들을 넣어주면 된다.

이 모든 것을 자바 코드로 작성하기 때문에 동적 쿼리를 매우 편리하게 작성할 수 있다.

- findAll

앞서 findAllOld에서 작성한 코드를 깔끔하게 리팩토링 했다.

다음 코드는 누가봐도 쉽게 이해할 수 있을 것이다.

QueryDSL의 장점은 메서드로 작동하기 때문에, selecttt 이런식으로 잘못 쓰게 되면 바로 잡아준다.

즉, 예약어의 오타를 모두 잡아줘서 미리 오류를 방지할 수 있다.

QueryDSL 에서 where(A,B)에 다양한 조건들을 직접 넣을 수 있는데, 이렇게 넣으면 AND조건으로 처리된다.

참고로 where()에 null을 입력하면 해당 조건은 무시한다.

`이 코드의 또 다른 장점은 likeItemName(), maxPrice()를 다른 쿼리를 작성할 때 재사용 할 수 있다는 점이다.`

`쉽게 이야기 해서 쿼리 조건을 부분적으로 모듈화 할 수 있다.`

`자바 코드로 개발하기 때문에 얻을 수 있는 큰 장점이다.`

- 예외 변환

QueryDSL은 별도의 스프링 예외 추상화를 지원하지 않는다.

대신에 JPA에서 학습한 것 처럼 @Repository에서 스프링 예외 추상화를 처리해준다.

- 정리

QueryDSL은

쿼리 문장에 오타가 있어도 컴파일 시점에 오류를 막을 수 있다.

메서드 추출을 통해서 코드를 재사용할 수 있다. 

ex) 여기서 만든 likeItemName(itemName), maxPrice(maxPrice)

메서드를 다른 쿼리에서도 함께 사용할 수 있다.

QueryDSL 을 사용해서 자바 코드로 쿼리를 작성하는 장점을 느껴보았을 것이다.

그리고 동적 쿼리 문제도 깔끔하게 해결해보았다.

QueryDSL은 이 외에도 수 많은 편리한 기능을 제공한다.

ex) 최적의 쿼리 결과를 만들기 위해서 DTO로 편리하게 조회하는 기능은 실무에서 자주 사용하는 기능이다.

JPA를 사용한다면 스프링 데이터 JPA와 QueryDSL은 실무의 다양한 문제를 편리하게 해결ㄹ하기 위해 선택하는 기본 기술이라 생각한다.

QueryDSL에 대한 자세한 내용은 실전! QueryDSL 강의를 참고하자.
