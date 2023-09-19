### JdbcTemplate 소개와 설정

SQL을 직접 사용하는 경우에 스프링이 제공하는 JdbcTempalte은 아주 좋은 선택지다.

JdbcTemplate은 JDBBC를 매우 편리하게 사용할 수 있게 도와준다.

- 장점

1. 설정의 편리함

JdbcTemplate은 spring-jdbc 라이브러리에 포함되어 있는데, 이 라이브러리는 스프링으로 JDBC를 사용할 때 기본으로 사용되는 라이브러리이다.

그리고 별도의 복잡한 설정 없이 바로 사용할 수 있다.

1. 반복 문제 해결

JdbcTemplate는 템플릿 콜백 패턴을 사용해서, JDBC를 직접 사용할 때 발생하는 대부분의 반복작업을 대신 처리해준다.

개발자는 SQL을 작성하고, 전달할 파라미터를 정의하고, 응답 값을 매핑하기만 하면 된다.

우리가 생각할 수 있는 대부분의 반복 작업을 대신 처리해준다.

- 커넥션 획득
- statement를 준비하고 실행
- 결과를 반복하도록 루프를 실행
- 커넥션 종료, statement, resultset 종료
- 트랜잭션을 다루기 위한 커넥션 동기화
- 예외 발생시 스프링 예외 반환기 실행

- 단점

동적 SQL을 해결하기 어렵다.

```java
/**
 * JdbcTemplate
 */
@Slf4j
public class JdbcTemplateItemRepositoryV1 implements ItemRepository {

    private final JdbcTemplate template;

    public JdbcTemplateItemRepositoryV1(DataSource dataSource) {
        this.template = new JdbcTemplate(dataSource);
    }

    @Override
    public Item save(Item item) {
        String sql = "insert into item(item_name, price, quanitiy) values (?,?,?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        template.update(connection -> {
            //자동 증가 키
            PreparedStatement ps = connection.prepareStatement(sql, new String[]{"id"});
            ps.setString(1, item.getItemName());
            ps.setInt(2, item.getPrice());
            ps.setInt(3,item.getQuantity());
            return ps;
        }, keyHolder);

        long key = keyHolder.getKey().longValue();
        item.setId(key);

        return item;
    }

    @Override
    public void update(Long itemId, ItemUpdateDto updateParam) {
        String sql = "update item set item_name=?, price=?, quantity=? where id=?";
        template.update(sql,
                updateParam.getItemName(),
                updateParam.getPrice(),
                updateParam.getQuantity(),
                itemId
        );
    }

    @Override
    public Optional<Item> findById(Long id) {
        String sql = "select id, item_name, price, quantity from item where id = ?";
        try{
            Item item = template.queryForObject(sql, itemRowMapper(), id);
            return Optional.of(item);
        } catch (EmptyResultDataAccessException e){
            return Optional.empty();
        }
    }

    @Override
    public List<Item> findAll(ItemSearchCond cond) {

        String itemName = cond.getItemName();
        Integer maxPrice = cond.getMaxPrice();

        String sql = "select id, item_name, price, quantity from item";

        //동적 쿼리
        if (StringUtils.hasText(itemName) || maxPrice != null) {
            sql += " where";
        }
        boolean andFlag = false;

        List<Object> param = new ArrayList<>();
        if (StringUtils.hasText(itemName)) {
            sql += " item_name like concat('%',?,'%')";
            param.add(itemName);
            andFlag = true;
        }

        if (maxPrice != null) {
            if (andFlag) {
                sql += " and";
            }
            sql += " price <= ?";
            param.add(maxPrice);
        }

        log.info("sql={}", sql);

        return template.query(sql, itemRowMapper(), param.toArray());
    }

    private RowMapper<Item> itemRowMapper() {
        return ((rs, rowNum) -> {
            Item item = new Item();
            item.setId(rs.getLong("id"));
            item.setItemName(rs.getString("item_name"));
            item.setPrice(rs.getInt("price"));
            item.setQuantity(rs.getInt("quantity"));
            return item;
        });
    }
}
```

- 기본

DataSource를 활용한다는점 알고 있자.

- save()

template.update() → 데이터 변경시 update()를 사용한다.

INSERT, UPDATE, DELETE SQL에 사용한다.

templdate.update()의 반환은 int인데, 영향 받은 로우 수를 반환한다.

데이터를 저장할 때 PK생성에 identity(auto increment) 방식을 사용하기 때문에, PK인 ID값을 개발자가 직접 지정하는 것이 아닐라 비워두고 저장해야 한다. 그러면 DB가 PK를 ID값을 확인할 수 있다.

문제는 이렇게 데이터베이스가 대신 생성해주는 PK ID 값은 데이터베이스가 생성하기 때문에, 데이터베이스에 INSERT가 완료 되어야 생성된 PK ID 값을 확인할 수 있다.

KeyHolder와 connection.prepareStatement(sql, new String[]{”id”})를 사용해서 id를 지정해주면 INSERT 쿼리 실행 이후에 데이터베이스에서 생성된 ID를 조회할 수 있다.

`//KeyHolder는 Auto Increment가 DB에서 동작하는 것이기 때문에 애플리케이션단에서 먼저 Auto Increment를 동작시키지 못한다.`

`//그래서 애플리케이션에 KeyHolder를 사용해서 Key값의 숫자를 미리 정해주고, INSERT를 하는 용도이다.`

물론 데이터베이스에서 생성된 ID 값을 조회하는 것은 순수 JDBC로도 가능하지만, 코드가 훨씬 더 복잡하다.

### 동적 쿼리 문제

검색 조건이 없을 때,

```sql
select id, item_name, price, quantity from item
```

상품명 itemName으로 검색

```sql
select id, item_name, price, quantity from item
    where item_name like concat('%',?,'%')
```

maxPrice로 검색

```sql
select id, item_name, price, quantity from item
    where price <= ?
```

itemName, 최대 가격(maxPrice) 둘다 검색

```sql
select id, item_name, price, quantity from item
    where item_name like concat('%', ?, '%')
        and price <= ?
```

결과적으로 4가지 상황에 따른 SQL을 동적으로 생성해야 한다.

동적 쿼리가 언듯 보면 쉬워 보이지만, 막상 개발해보면 생각보다 다양한 상황을 고민해야 한다.

예를 들어서 어떤 경우에는 where를 앞에 넣고 어떤 경우에는 and를 넣어야하는지 등을 모두 계산해야 한다.

그리고 각 상황에 맞추어 파라미터도 생성해야한다.

물론 실무에서는 이보다 훨씬 복잡한 동적 쿼리들이 사용된다.

참고로 이후에 설명할 MyBatis의 가장 큰 장점은 SQL을 직접 사용할 때 동적 쿼리를 쉽게 작성할 수 있다는 점이다.

### template.update의 단점

```java
String sql = "update item set item_name=?, price=?, quantity=?, where id=?";
template.update(sql,itemName,price,quantity,itemId)
//template.update(sql,itemName,quantity,price,itemId)
//순서가 바뀌면 어떻게 되는거지?
```

SQL을 보내는데, 순서가 바뀌면 큰일난다.

실무에서는 파라미터가 10~20개가 넘어가는 일도 아주 많다.

그래서 미래에 필드를 추가하거나, 수정하면서 이런 문제가 충분히 발생할 수 있다.

버그 중에서 가장 고치기 힘든 버그는 데이터베이스에 데이터가 잘못 들어가는 버그다.

이것은 코드만 고치는 수준이 아니라 데이터베이스의 데이터를 복구해야 하기 때문에 버그를 해결하는데 들어가는 리소스가 어마어마하다.

`실제로 수많은 개발자들이 이 문제로 장애를 내고 퇴근하지 못하는일이 발생한다.`

`개발을 할 때는 코드를 몇 줄 줄이는 편리함도 중요하지만, 모호함을 제거해서 코드를 명확하게 만드는 것이 유지보수 관점에서 매우 중요하다.`

// 위와 같이 헷갈릴 수 있게 될 수 있다면, 자동으로 찾아주는 메서드를 직접 만들어보자.

이처럼 파라미터를 순서대롤 바인딩 하는 것은 편리하기는 하지만, 순서가 맞지 않아서 버그가 발생할 수도 있으므로 주의해서 사용해야 한다.

### 이름 지정 바인딩

JdbcTemplate은 이런 문제를 보완하기 위해, NamedParameterJdbcTemplate이라는 이름을 지정해서 파라미터를 바인딩 하는 기능을 제공한다.

```java
/**
 * NamedParameterJdbcTemplate
 * SqlParameterSource
 * BeanPropertySqlParameterSource
 * MapSqlParameterSource
 * Map
 * BeanPropertyRowMapper
 */
@Slf4j
public class JdbcTemplateItemRepositoryV2 implements ItemRepository {

    private final NamedParameterJdbcTemplate template;

    public JdbcTemplateItemRepositoryV2(DataSource dataSource) {
        this.template = new NamedParameterJdbcTemplate(dataSource);
    }

    @Override
    public Item save(Item item) {
        String sql = "insert into item(item_name, price, quantity) values (:itemName,:price,:quantity)";

        //BeanPropertySqlParameterSource를 활용한 방식
        SqlParameterSource param = new BeanPropertySqlParameterSource(item);
        //객체를 가지고 파라미터를 만들어준다.

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        template.update(sql,param,keyHolder);

        long key = keyHolder.getKey().longValue();
        item.setId(key);
        return item;
    }

    @Override
    public void update(Long itemId, ItemUpdateDto updateParam) {
        String sql = "update item set item_name=:itemName, price=:price, quantity=:quantity where id=:id";

        //MapSqlParameterSource를 사용해서 매핑
        MapSqlParameterSource param = new MapSqlParameterSource()
                .addValue("itemName", updateParam.getItemName())
                .addValue("price", updateParam.getPrice())
                .addValue("quantity", updateParam.getQuantity())
                .addValue("id", itemId);

        template.update(sql, param);
    }

    @Override
    public Optional<Item> findById(Long id) {
        String sql = "select id, item_name, price, quantity from item where id = :id";
        try{
            Map<String, Long> param = Map.of("id", id);
            Item item = template.queryForObject(sql,param, id);
            //Map을 사용해서 매핑
            return Optional.of(item);
        } catch (EmptyResultDataAccessException e){
            return Optional.empty();
        }
    }

    @Override
    public List<Item> findAll(ItemSearchCond cond) {

        String itemName = cond.getItemName();
        Integer maxPrice = cond.getMaxPrice();

        String sql = "select id, item_name, price, quantity from item";

        SqlParameterSource param = new BeanPropertySqlParameterSource(cond);

        //동적 쿼리
        if (StringUtils.hasText(itemName) || maxPrice != null) {
            sql += " where";
        }
        boolean andFlag = false;

        if (StringUtils.hasText(itemName)) {
            sql += " item_name like concat('%',:itemName,'%')";
            andFlag = true;
        }

        if (maxPrice != null) {
            if (andFlag) {
                sql += " and";
            }
            sql += " price <= :maxPrice";
        }

        log.info("sql={}", sql);

        return template.query(sql, param, itemRowMapper());
    }

    private RowMapper<Item> itemRowMapper() {
        return BeanPropertyRowMapper.newInstance(Item.class);
        //카멜 케이스 변환해서 지원한다.

//        return ((rs, rowNum) -> {
//            Item item = new Item();
//            item.setId(rs.getLong("id"));
//            item.setItemName(rs.getString("item_name"));
//            item.setPrice(rs.getInt("price"));
//            item.setQuantity(rs.getInt("quantity"));
//            return item;
//        });
        // 이 코드 역시도 반복되는게 느껴진다. 위처럼 BeanPropertyRowMapper를 사용해서 줄이면된다.
    }
}
```

이름 지정 파라미터에서 자주 사용하는 파라미터의 종류는 크게 3가지가 있다.

Map, SqlParameterSource, MapSqlParameterSource, BeanPropertySqlParameterSource

1. Map

Map.of(”id”,id)를 써서 처리할 수 있다.

1. MapSqlParameterSource

Map과 유사한데, SQL 타입을 지정할 수 있는 등 SQL에 좀 더 특화된 기능을 제공한다.

SqlParameterSource 인터페이스의 구현체이다.

MapSqlParameterSource는 메서드 체인을 통해 편리한 사용법도 제공한다.

update() 코드에서 확인할 수 있다.

```java
SqlParameterSource param = new MapSqlParameterSource()
    .addValue("itemName", updateParam.getItemName())
    .addValue("price", updateParam.getPrice())
    .addValue("quantity", updateParam.getQuantity())
    .addValue("id",itemId);

template.update(sql, param);
```

1. BeanPropertySqlParameterSource

자바빈 프로퍼티 규약을 통해서 자동으로 파라미터 객체를 생성한다.

여기서 보면 BeanPropertySqlParameterSource가 많은 것을 자동화 해주기 때문에 가장 좋아보이지만 항상 사용할 수 있는건 아니다.

ex)

update()에서 :id를 바인딩해야 하는데, update()에 사용하는 ItemUpdateDto에는 ItemId가 없다. 따라서 BeanPropertySqlParameterSource를 사용할 수 없고 대신에 mapSqlParameterSource를 사용했다.

`// 즉, DTO로 보낼 때, 없은 필드가 있으면 다른 걸 써야한다.`

```
private RowMapper<Item> itemRowMapper() {
    return BeanPropertyRowMapper.newInstance(Item.class);
    //카멜 케이스 변환해서 지원한다.

//        return ((rs, rowNum) -> {
//            Item item = new Item();
//            item.setId(rs.getLong("id"));
//            item.setItemName(rs.getString("item_name"));
//            item.setPrice(rs.getInt("price"));
//            item.setQuantity(rs.getInt("quantity"));
//            return item;
//        });
    // 이 코드 역시도 반복되는게 느껴진다. 위처럼 BeanPropertyRowMapper를 사용해서 줄이면된다.
}
```

BeanPropertyRowMapper는 ResultSet의 결과를 받아서 자바 빈 규약에 맞추어 데이터를 변환한다.

ex) 데이터베이스에서 조회한 결과가 select id, price라고 한다면 아래와 같은 코드를 작성한다.

```java
Item item = new Item();
item.setId(rs.getLong("id"));
item.setPrice(rs.getInt("price"));
```

데이터베이스에서 조회한 결과 이름을 기반으로 setId(), setPrice()처럼 자바빈 프로퍼티 규약에 맞춘 메서드를 호출하는 것이다.

- 별칭

select item_name의 경우 setItem_name()이라는 메서드가 없다.

이런 경우 개발자가 조회 SQL을 “select item_name as itemName”으로 고치면 된다.

별칭 as를 사용해서 SQL 조회 결과의 이름을 변경하는 것이다.

`실제로 이 방법은 자주 사용된다.`

특히 데이터베이스 컬럼 이름과 객체 이름이 완전히 다를 때 문제를 해결할 수 있다.

예를들어서 데이터베이스에는 member_name이라도 되어있는데, 객체에 username이라고 되어있다면 “select member_name as username” 이렇게 해결할 수 있다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/893621ec-9b89-44c4-be15-d333ebb08527/Untitled.png)

이렇게 데이터베이스 컬럼 이름과 객체의 이름이 다를 때 별칭 as를 사용해서 문제를 만힝 해결한다.

JdbcTemplate은 물론이고, MyBatis 같은 기술에서도 자주 사용된다.

- 관례의 불일치

자바 객체는 camelCase를 사용한다.

반면에 관계형 데이터베이스에서는 주로 snake_case를 사용한다.

`이 부분을 관례로 많이 사용하다 보니 BeanPropertyRowMapper는 snake_case를 camelCase로 자동 변환해준다.`

`따라서 select item_name으로 조회해도 setItemName()에 문제없이 값이 들어간다.` 

정리하면 snake_case는 자동으로 해결되니 그냥 두면 되고, 컬럼 이름과 객체이름이 완전히 다른 경우에는 조회 SQL에서 별칭을 사용하면 된다.

### JdbcTemplate - SimpleJdbcInsert

JdbcTemplate은 INSERT SQL를 직접 작성하지 않아도 되도록 SimpleJdbcInsert라는 편리한 기능을 제공한다.

```java
    public JdbcTemplateItemRepositoryV3(DataSource dataSource) {
        this.jdbcInsert = new SimpleJdbcInsert(dataSource)
                .withTableName("item")
                .usingGeneratedKeyColumns("id");
//                .usingColumns("item_name", "price", "quantity");
        //생략이 가능하다.
    }
```

withTableName → 데이터를 저장할 테이블 명을 지정한다.

usingGeneratedKeyColumns → key를 생성하는 PK 컬럼명을 지정한다.

usingColumn → INSERT SQL에 사용할 컬럼을 지정한다. 특정 값만 저장하고 싶을 때 사용한다.

생략할 수 있다.

SimpleJdbcInsert는 생성시점에 데이터베이스 테이블의 메타 데이터를 조회한다.

따라서 어떤 컬럼이 있는지 확인 할 수 있으므로 usingColumns를 생략할 수 있다.

`만약 특정 컬럼만 지정해서 저장하고 싶다면, usingColumns를 사용하면 된다.`

애플리케이션을 실행해보면 SimpleJdbcInsert가 어떤 INSERT SQL을 만들어서 사용하는지 로그로 확인할 수 있다.

```jsx
o.s.jdbc.core.simple.SimpleJdbcInsert:
Compiled insert object: insert string is
[INSERT INTO item (ITEM_NAME, PRICE, QUANTITY) VALUES(?, ?, ?)]
```

### JdbcTemplate 기능 정리

- jdbcTemplate

순서 기반 파라미터 바인딩 지원

- NamedParamterJdbcTemplate

이름 기반 파라미터 바인딩을 지원한다. (권장)

- SimpleJdbcInsert

Insert SQL을 편리하게 사용할 수 있다.

- SimpleJdbcCall

Stored Produced를 편리하게 호출할 수 있다.

- 참고

Stored Procedure를 사용하기 위한 SimpleJdbcCall에 대한 자세한 내용은 스프링 공식 메뉴얼을 참고하자.

### 조회

`전부 다 스프링 공식 예제들을 보면 사용할 수 있다.`

1. 단건 조회 - 숫자 조회

```java
int rowCount = jdbcTemplate.queryForObject("select count(*) from t_actor, Integer.class);
```

하나의 로우를 조회할 때는 queryForObject()를 사용해서, 지금처럼 조회 대상이 객체가 아니라 단순 데이터 하나라면 타입을 Integer.class, String.class와 같이 지정해주면 된다.

1. 단건 조회 - 숫자 조회 파라미터 바인딩

```java
int countOfAcotrsNamedJoe = jdbcTemplate.queryForObject("select count(*) from t_actor where first_name = ?", Integer.class, "Joe");
```

숫자 하나와 파라미터 바인딩 예시이다.

1. 단건 조회 - 문자 조회

```java
String lastName = jdbcTemplate.queryForObject(
"select last_name from t_actor where id = ?", String.class, 1212L);
```

문자 하나와 파라미터 바인딩 예시이다.

1. 단건 조회 - 객체 조회

```java
Actor actor = jdbcTemplate.queryForObject(
"select first_name, last_name from t_actor where id = ?",
(resultSet, rowNum) -> {
    Actor newActor = new Actor();
    newActor.setFirstName(resultSet.getString("first_name"));
    newActor.setLastName(resultSet.getString("last_name"));
    return newActor;
},
1212L);
```

객체 하나를 조회한다. 결과를 객체로 매핑해야 하므로 RowMapper를 사용해야 한다.

여기서는 람다는 사용했다.

1. 목록 조회 - 객체

```java
Actor actor = jdbcTemplate.query(
"select first_name, last_name from t_actor",
(resultSet, rowNum) -> {
    Actor actor = new Actor();
    newActor.setFirstName(resultSet.getString("first_name"));
    newActor.setLastName(resultSet.getString("last_name"));
    return Actor;
});
```

여러 로우를 조회할 때는 query()를 사용하면 된다. 결과를 리스트로 반환한다.

결과를 객체로 매핑해야 하므로 RowMapper를 사용해야 한다. 여기서는 람다를 사용했다.

1. 목록 조회 - 객체

```java
private final RowMapper<Actor> actorRowMapper = (resultSet, rowNum) ->{
    Actor actor = new Actor();
    actor.setFirstName(resultSet.getString("first_name));
    actor.setLastName(resultSet.getString("last_name));
    return actor;
}

public List<Actor> findAllActor(){
    return this.jdbcTemplate.query("select first_name, last_name from t_actor, actorRowMapper);
}
```

여러 로우를 조회할 때는 query()를 사용하면 된다. 결과를 리스트로 반환한다.

여기서는 RowMapper를 분리했다. 이렇게하면 여러 곳에서 재사용할 수 있다.

### 변경(INSERT, UPDATE, DELETE)

데이터를 변경할 때는 jdbcTemplate.update()를 사용하면 된다.

참고로 int 반환값을 반환하는데, SQL 실행 결과에 영향받은 로우 수를 반환한다.

- 등록

```java
jdbcTemplate.update(
    "insert into t_actor (first_name, last_name) values (?, ?)",
    "Leonor", "Watling");
)
```

- 수정

```java
jdbcTemplate.update(
    "update t_actor set last_name = ? where id = ?",
    "Banjo", 5276L);
)
```

- 삭제

```java
jdbcTemplate.update(
    "delete from t_actor where id = ?",
    Long.valueOf(actorId));
```

### 기타 기능

임의의 SQL을 실행할 때는 execute()를 사용하면 된다.

테이블을 생성하는 DDL에 사용할 수 있다.

### DDL

```java
jdbcTemplate.execute(”create table mytable (id integer, name varchar(100)”);
```

- Stored Procedure 호출

```java
jdbcTemplate.update("call SUPPORT.REFRESH_ACTORS_SUMMARY(?)",
    Long.valueOf(unionId));
```

### 정리

실무에서 가장 간단하고 실용적인 방법으로 SQL을 사용하려면 JdbcTemplate을 사용하면 된다.

JPA와 같은 ORM 기술을 사용하면서 동시에 SQL을 직접 작성해야 할 때가 있는데, 그때도 JdbcTemplate을 함께 사용하면 된다.

그런데 JdbcTemplate의 최대 단점이 있는데, 바로 동적 쿼리 문제를 해결하지 못한다는 점이다.

그리고 SQL을 자바 코드로 작성하기 때문에 SQL 라인이 코드를 넘어 갈때 마다 문자 더하기를 해주어야 하는 단점도 있다.

동적 쿼리 문제를 해결하면서 동시에 SQL도 편리하게 작성할 수 있게 도와주는 기술이 바로 MyBatis이다.

- 참고

JOOQ라는 기술도 동적쿼리 문제를 편리하게 해결해 주지만 사용자가 많지 않아서 강의에서 다루지 않는다.
