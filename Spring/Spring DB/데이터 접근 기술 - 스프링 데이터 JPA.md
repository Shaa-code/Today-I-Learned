### 장점

코딩량이 줄어든다.

도메인 클래스를 중요하게 다룬다.

비즈니스 로직 이해가 쉬워진다.

더 많은 테스트 케이스 작성이 가능하다.

진짜 편하다.

비즈니스 로직에 집중할 수 있다.

너무 복잡할 땐 SQL을 사용한다.

JPA에서 버그가 많다면서 MyBatis, JDBC로 돌아가는 사람들이 많다.

99%는 그 사람들이 JPA를 잘 모르기 때문에 발생하는 문제들이다.

그래서 먼저 JPA를 이해하는것이 중요하다.

`본인이 작성한 JPQL이 어떤 쿼리로 생성 될지 이해 해야 함.` (머리속으로 바로 그려져야 된다고 한다.)

즉시, 지연 로딩 전략 이해 해야함

- JPA 도입 전에 이해도 테스트

영속성 컨텍스트 이해

변경 감지

언제 영속성 컨텍스트가 플러시 되는가

연관관계 매핑중에 mappedBy(inverse) 이해

JPQL 한계 인식

가장 중요한 건 JPA 자체를 이해하는 거다.

`한번 제대로 배워놓으면 평생 시간을 아끼면서 프로젝트를 잘 수행할 수 있게 된다.`

RDB가 완성된 기술이라. 변화가 거의 없기 때문에 가능한 일이다.

### 스프링 데이터 JPA 주요 기능

스프링 데이터 JPA는 JPA를 편리하게 사용할 수 있도록 도와주는 라이브러리다.

수많은 편리한 기능을 제공하지만 가장 대표적인 기능은 다음과 같다.

- 공통 인터페이스 기능
- 쿼리 메서드 기능

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/90fc0418-59ba-4cd1-9bbf-c3cbd19a5567)

- 공통 인터페이스 기능

JpaRepository 인터페이스를 통해서 기본적인 CRUD 기능을 제공한다.

공통화 가능한 기능이 거의 모두 포함되어 있다.

CrudRepository에서 findOne() → findById()로 변경

- JpaRepository 사용법

```java
public interface ItemRepository extneds JpaRepository<Member, Long>{...}
```

JpaRepository 인터페이스를 상속받고, 제네릭에 관리할 <엔티티, 엔티티ID>를 주면 된다.

그러면 JpaRepository가 제공하는 기본 CRUD 기능을 모두 사용할 수 있다.

- 스프링 데이터 JPA가 구현 클래스를 대신 생성

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/6b3ce4c4-adca-42ec-8158-b6760435d240)

JpaRepository 인터페이스만 상속받으면 스프링 데이터 JPA가 프록시 기술을 사용해서 구현 클래스를 만들어 준다.

그리고 만든 구현 클래스의 인스턴스를 만들어서 스프링 빈으로 등록한다.

따라서 개발자는 구현 클래스 없이 인터페이스만 만들면 기본 CRUD 기능을 사용할 수 있다.

### 쿼리 메서드 기능

스프링 데이터 JPA는 인터페이스에 메서드만 적어두면, 메서드 이름을 분석해서 쿼리를 자동으로 만들고 실행해주는 기능을 제공한다.

- 순수 JPA 리포지토리

```java
public List<Member> findByUsernameAndAgeGreaterThan(String username, int age){
    return em.createQuery("select m from Member m where m.username = :username and m.age > : age")
    .setParameter("username", username)
    .setParameter("age", age)
    .getResultList();
}
```

순수 JPA를 사용하면 직접 JPQL을 작성하고, 파라미터도 직접 바인딩 해야 한다.

### 스프링 데이터 JPA

```java
public interface MemberRepository extends JpaRepository<Member, Long>{
    List<Member> findByUsernameAndGreaterThan(String username, int age);
}
```

스프링 데이터 JPA는 메서드 이름을 분석해서 필요한 JPQL을 만들고 실행해준다.

물론 JPQL은 JPA가 SQL로 번역해서 실행한다.

물론 그냥 아무 이름이나 사용하는 것은 아니고 다음과같은 규칙을 따라야 한다.

- 스프링 데이터 JPA가 제공하는 쿼리 메소드 기능

조회 : find…By, read…By, query…By, get…By

ex) findHelloBy 처럼 …에 식별하기 위한 내용(설명)이 들어가도된다.

COUNT → count…By

반환타입 → Long

EXISTS → exists…By 반환타입 boolean

삭제 → delete…By, remove…By 반환타입 long

DISTINCT → findDistinct, findMemberDisinctBy

LIMIT → findFirst3, findFirst, findTop, findTop3

- 쿼리 메소드 필터 조건

스프링 데이터 JPA 공식 문서 참고

https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation

https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.limit-query-result

- JPQL 직접 사용하기

```java
public interface SPringDataJpaItemRepository extends JpaRepository<Item, Long>{
    List<Item> findByItemNameLike(String itemName);

    @Query("select i from Item i where i.itemName like :itemName and i.price <= :price)
    List<Item> findItems(@Param("itemName") String itemName, @Param("price") Integer price);

}
```

쿼리 메서드 기능 대신에 직접 JPQL을 사용하고 싶을 때는 @Query와 함께 JPQL을 작성하면 된다.

이때는 메서드 이름으로 실행하는 규칙은 무시된다.

참고로 스프링 데이터 JPA는 JPQL 뿐만 아니라 JPA의 네이티브 쿼리 기능도 지원하는데,

JPQL 대신에 SQL을 직접 작성할 수도 있다.

// @Param으로 넣어줄게 너무 많다 싶으면 그냥 네이티브 쿼리를 직접 넣어주는 것도 좋은 판단이다.

- 중요

스프링 데이터 JPA는 JPA를 편리하게 사용하도록 도와주는 도구이다. 따라서 JPA 자체를 잘 이해하는 것이 가장 중요하다.

### 스프링 데이터 JPA 적용1

```java
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
```

그런데 이미 앞에서 JPA를 설정하면서 spring-boot-starter-data-jpa 라이브러리를 넣어주었다.

여기에는 JPA, Hibernate, Spring Data JPA, Spring JDBC 관련 기능도 모두 포함되어 있다.

따라서 스프링 데이터 JPA가 이미 추가되어 있으므로 별도의 라이브러리 설정은 하지 않아도 된다.

```java
public interface SpringDataJpaItemRepository extends JpaRepository<Item, Long> {

    List<Item> findByItemNameLike(String itemName);
    List<Item> findByPriceLessThanEqual(Integer price);

    // 쿼리 메서드 (아래 메서드와 같은 기능 수행)
    List<Item> findByItemNameLikeAndPriceLessThanEqual(String itemName,Integer price);

    // 쿼리 직접 실행
    @Query("select i from Item where i.itemName like :itemName and i.price <= :price")
    List<Item> findItems(@Param("itemName") String itemName, @Param("price") Integer price);

    
}
```

스프링 데이터 JPA가 제공하는 JpaRepository인터페이스를 인터페이스 상속받으면 기본적인 CRUD 기능을 사용할 수 있다.

그런데 이름으로 검색하거나, 가격으로 검색하는 기능은 공통으로 제공할 수 있는 기능이 아니다.

따라서 쿼리 메서드 기능을 사용하거나 @Query를 사용해서 직접 쿼리를 실행하면 된다.

여기서는 데이터를 조건에 따라 4가지로 분류해서 검색한다.

- 모든 데이터 조회
- 이름 조회
- 가격 조회
- 이름 + 가격 조회

동적 쿼리를 이용하면 좋겠지만, 스프링 데이터 JPA는 동적쿼리에 약하다.

이번에는 직접 4가지 상황을 스프링 데이터 JPA로 구현해보자.

그리고 이 문제는 이후에 QueryDSL에서 동적 쿼리로 깔끔하게 해결하겠다.

- 참고

스프링 데이터 JPA도 Example이라는 기능으로 약간의 동적 쿼리를 지원하지만, 실무에서 사용하기는 기능이 빈약하다.

실무에서 JPQL 동적 쿼리는 QueryDSL을 사용하는 것이 좋다.

findAll() → select i from Item i

findByitemNameLike() → select i from Item i where i.price ≤ ?

findByItemNameLikeAndPriceLessThanEqual() → select i from Item i where i.price ≤ ?

findItems()

메서드 이름으로 쿼리를 실행하는 기능은 다음과 같은 단점이 있다.

1. 조건이 많으면 메서드 이름이 너무 길어진다.
2. 조인 같은 복잡한 조건을 사용할 수 없다.

메서드 이름으로 쿼리를 실행하는 기능은 간단한 경우에는 매우 유용하지만, 복잡해지면 직접 JPQL 쿼리를 작성하는 것이 좋다.

쿼리를 직접 실행하려면 @Query 애노테이션을 사용하면 된다.

메서드 이름으로 쿼리를 실행할 때는 파라미터를 순서대로 입력하면 되지만, 쿼리를 직접 실행할 때는 파라미터를 명시적으로 바인딩 해야 한다.

파라미터 바인딩은 @Param(”itemName”) 애노테이션을 사용하고, 애노테이션의 값에 파라미터 이름을 주면 된다.

### 스프링 데이터 JPA 적용 2

우리는 이때까지 ItemRepository 인터페이스를 유지하면서 구현체를 주입을 받아왔다.

그런데 Service에서 주입 받으려고 하니, Spring Data JPA 에서는 ItemRepository를 사용할 수 없게 된다.

예를 들어 보자.

```java
@Service
@RequiredArgsConstructor
public class ItemServiceV1 implements ItemService {

    private final ItemRepository itemRepository;
    private final SpringDataJpaItemRepository springDataJpaItemRepository;

    @Override
    public Item save(Item item) {
        return itemRepository.save(item);
        //return springDataJpaItemRepository.save(item);
    }
}
```

위 코드 처럼 쓰려고하면 Service에 있는 모든 코드들을 또 springDataJpaItemRepository.save()와 같은 형태로 모두 바꾸어 줘야한다.

- 어떻게 처리해야 하는 걸까?

중간에 JpaItemRepository를 만들어서 implements ItemRepository를 해주고

이 레포지토리에서 SpringDataJpaItemRepository를 주입받으면 해결 된다.

```java
@Repository
@Transactional
@RequiredArgsConstructor
public class JpaItemRepositoryV2 implements ItemRepository {

    private final SpringDataJpaItemRepository repository;

    @Override
    public Item save(Item item) {
        repository.save(item);
    }

    @Override
    public void update(Long itemId, ItemUpdateDto updateParam) {
        Item findItem = repository.findById(itemId).orElseThrow();
        findItem.setItemName(updateParam.getItemName());
        findItem.setPrice(updateParam.getPrice());
        findItem.setQuantity(updateParam.getQuantity());

//        Item findItem = repository.getById(itemId);
//        findItem.setItemName(updateParam.getItemName());
//        findItem.setPrice(updateParam.getPrice());
//        findItem.setQuantity(updateParam.getQuantity());
//        그냥 적어 봤는데, 이렇게 하면 그냥 객체만 뽑아낸다.
//        Optional로 빼려면 findById를 사용해야 한다.
    }

    @Override
    public Optional<Item> findById(Long id) {
        return repository.findById(id);// Optional을 포함한다.
//      return Optional.ofNullable(repository.getById(id));
    }

    @Override
    public List<Item> findAll(ItemSearchCond cond) {
        String itemName = cond.getItemName();
        Integer maxPrice = cond.getMaxPrice();

        if(StringUtils.hasText(itemName) && maxPrice != null){
//            return repository.findByItemNameLikeAndPriceLessThanEqual(itemName, maxPrice);
            return repository.findItems(itemName, maxPrice);
        }else if (StringUtils.hasText(itemName)){
            return repository.findByItemNameLike(itemName);
        }else if (maxPrice != null){
            return repository.findByPriceLessThanEqual(maxPrice);
        }else{
            return repository.findAll();
        }
        // 실무에서는 QueryDSL로 동적쿼리를 쓰지 이렇게 작성하지 않는다.
        // 가끔 조건이 2개 밖에 없으면 이렇게 작성할 때도 있긴하다고 한다.
    }
}
```

- 의존관계와 구조

ItemService는 ItemRepository에 의존하기 때문에 ItemService에서 SpringDataJpaItemRepository를 그대로 사용할 수 없다.

물론 ItemService가 SpringDataJpaItemRepository를 직접 사용하도록 코드를 고치면 되겠지만,

우리는 ItemService 코드의 변경없이 ItemService가 ItemRepository에 대한 의존을 유지하면서 DI를 통해 구현 기술을 변경하고 싶다.

조금 복잡하지만, 새로운 리포지토리를 만들어서 이 문제를 해결해 보자.

여기서는 JpaItemRepositoryV2가 MemberRepository와 SpringDataJpaItemRepository 사이를 맞추기 위한 어댑터 처럼 사용된다.

- 클래스 의존 관계

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/31af181d-d362-4c7f-a6df-cf14049866c1)

JpaItemRepositoryV2는 ItemRepository를 구현한다.

그리고 SpringDataJpaItemRepository를 사용한다.

- 런타임 객체 의존 관계

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/3704305c-bb7d-499b-959b-97d654f84da2)

런타임의 객체 의존관계는 다음과 같이 동작한다.

itemService → jpaItemRepositoryV2 → springDataJpaItemRepository(프록시 객체)

이렇게 중간에서 JpaItemRepository가 어댑터 역할을 해준 덕분에 MemberService가 사용하는 MemberRepository 인터페이스를 그대로 유지할 수 있고 클라이언트인 MemberService의 코드를 변경하지 않아도 되는 장점이 있다.

- findAll()

데이터를 조건에 따라 4가지로 분류해서 검색한다.

모든 데이터 조회, 이름 조회, 가격 조회, 이름 + 가격 조회

모든 조건에 부합할 때는 findByItemNameLikeAndPriceLessThanEqual()을 사용해도 되고,

repository.findItems()를 사용해도 된다. 그런데 보는 것 처럼 조건이 2개만 되어도 이름이 너무 길어지는 단점이 있다.

따라서 스프링 데이터 JPA가 제공하는 메서드 이름으로 쿼리를 자동으로 만들어주는 기능과 @Query로 직접 쿼리를 작성하는 기능 중에 적절한 선택이 필요하다.

추가로 코드를 잘 보면 동적 쿼리가 아니라 상황에 따라 각각 스프링 데이터 JPA의 메서드를 호출해서 상당히 비효율 적인 코드인 것을 알 수 있다.

앞서 이야기 했듯이 스프링 데이터 JPA는 동적 쿼리 기능에 대한 지원이 매우 약하다.

이 부분은 이후에 QueryDSL을 사용해서 개선해보자.

기능을 모두 개발했으니, 설정하고 실행해보자.

```java
@Configuration
@RequiredArgsConstructor
public class SpringDataJpaConfig {

    private final SpringDataJpaItemRepository springDataJpaItemRepository;

    @Bean
    public ItemService itemService(){
        return new ItemServiceV1(itemRepository());
    }

    @Bean
    public ItemRepository itemRepository(){
        return new JpaItemRepositoryV2(springDataJpaItemRepository);
    }
}

```

SpringDataJpaItemRepository는 스프링 데이터 JPA가 프록시 기술로 만들어주고 스프링 빈으로도 등록해준다.

- ItemServiceApplication - 변경

```java
@Import(SpringDataJpaConfig.class)
@SpringBootApplication(scanBasePackages = "hello.itemservice.web")
public class ItemSereviceApplication {}
```

- 예외 변환

스프링 데이터 JPA도 스프링 예외 추상화를 지원한다.

스프링 데이터 JPA가 만들어주는 프록시에서 이미 예외 변환을 처리하기 때문에,

@Repository와 관계 없이 예외가 변환된다.

인터페이스 기반으로 구현체가 만들어지는데, 구현체가 예외 변환 처리를 해준다.

그래서 @Repository을 굳이 다른 Repository클래스에 안넣어줘도 된다.

넣어 줘도 상관은 없는데, 어차피 구현체에서 이미 변환된 예외라서 그냥 무시하고 넘어간다.

- 하이버 네이트 버그

5.6.6~5.6.7을 사용하면 Like 문장을 사용할 때 다음 예외가 발생한다.

이런건 오류를 잘 찾아보고, 공식 사이트에서 해결하면 된다.

### 정리

영한님은 스프링 데이터 JPA가 실무에서 기본으로 선택하는 기술이라고 하신다.

자세한 내용은 강의를 찾아보자.
