### MyBatis 소개

MyBatis는 앞서 설명한 JdbcTempalte보다 더 많은 기능을 제공하는 SQL Mapper이다.

기본적으로 JdbcTempalte이 제공하는 대부분의 기능을 제공한다.

JdbcTemplate과 비교해서 MyBatis의 가장 매력적인 점은 SQL을 XML에 편리하게 작성할 수 있고 또 동적 쿼리를 매우 편리하게 작성할 수 있다는 점이다.

먼저 SQL이 여러 줄에 걸쳐 있을 때 둘을 비교해 보자.

- JdbcTemplate - SQL 여러 줄

```java
String sql = "update item " +
    "set item_name =:itemName, price=:price, quantity=:quantity " +
    "where id=:id"
```

- MyBatis - SQL 여러 줄

```java
<update id="update">
    update item
    set item_name=#{itemName},
    price=#{price},
    quantity=#{quantity}
    where id = #{id}
</update>
```

MyBatis는 XML에 작성하기 때문에 라인이 길어져도 문자 더하기에 대한 불편함이 없다.

다음으로 상품을 검색하는 로직을 통해 동적쿼리를 비교해보자.

JdbcTemplate - 동적 쿼리

```java
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
```

- MyBatis 동적 쿼리

```java
<select id = “findAll” reusltType=”Item”>
    select id, item_name, price, quantity
    from item
    <where>
        <if test="itemName != null and itemName != ''">
            and item_name like concat('%',#{itemName},'%')
        </if>
        <if test="maxPrice != null>
            and price &lt;= #{maxPrice}
        </if>
    </where>
</select>
```

jdbcTemplate은 자바 코드로 직접 동적쿼리를 작성해야 한다.

반면에 MyBatis는 동적 쿼리를 매우 편리하게 작성할 수 있는 다양한 기능들을 제공한다.

- 설정의 장단점

JdbcTemplate은 스프링에 내장된 기능이고, 별도의 설정없이 사용할 수 있다는 장점이 있다.

반면에 MyBatis는 약간의 설정이 필요ㅛ하다.

- 정리

프로젝트에서 동적 쿼리와 복잡한 쿼리가 많다면 MyBatis를 사용하고, 단순한 쿼리들이 많으면 JdbcTemplate을 선택해서 사용하면된다.

물론 둘을 함께 사용해도 된다.

하지만 MyBatis를 선택했다면 그것으로 충분할 것이다.

- 참고

강의에서는 MyBatis의 기능을 하나하나 자세하게 다루지 않는다.

MyBatis를 왜 사용하는지, 그리고 주로 사용하는 기능 위주로 다룰 것이다.

그래도 이 강의를 듣고 나면 MyBatis로 개발을 할 수 있게 되고 추가로 필요한 내용을 공식 사이트에서 찾아서 사용할 수 있게 될 것이다.

MyBatis는 기능도 단순하고 또 공식 사이트가 한글로 잘 번역되어 있어서 원하는 기능을 편리하게 찾아볼 수 있다.

https://mybatis.org/mybatis-3/ko/index.html

### MyBatis 설정

```java
//application.properties
#MyBatis
mybatis.type-aliases-package=hello.itemservice.domain
mybatis.configuration.map-underscore-to-camel-case=true
logging.level.hello.itemservice.repository.mybatis=trace
```

이 코드는 어플리케이션, 테스트 코드 둘 다 넣어줘야 한다.

하나만 넣으면 하나밖에 인식하지 못한다.

- mybatis.typpe-aliases-package

마이바티스에서 타입 정보를 사용할 때는 패키지 이륾을 적어주어야 하는데, 여기에 명시하면 패키지 이름을 생략할 수 있다.

지정한 패키지와 그 하위 패키지가 자동으로 인식된다.

여러 위치를 지정하려면 ‘,’, ‘;’로 구분하면 된다.

mybatis.configuration.map-underscore-to-camel-case

JdbcTemplate의 BeanPropertyRowMapper에서 처럼 언더바를 카멜로 자동 변경해주는 기능을 활성화 한다.

바로 다음에 설명하는 관례의 불일치 내용을 참고하자.

logging.level.hello.itemservice.repository.mybatis=trace

MyBatis에서 실행되는 쿼리 로그를 확인할 수 있다.

### 관례의 불일치

map-underscore-to-camel-case 기능을 활성화 하면 DB에서 select item-name으로 조회해도 item_name을 itemName으로 변환하여 객체의 ItemName(setItemName())속성에 값이 정상 입력 된다.

정리하면 해당 옵션을 켜면 snake_case는 자동으로 해결되니 그냥 두면 되고, 컬럼 이름과 객체 이름이 완전히 다른 경우에는 조회 SQL에서 별칭을 사용하면 된다.

ex)

DB → select item_name

Object → name

- 별칭을 통한 해결방안

select item_name as name

- 영한님은 MyBatis를 사용하지 않는다고 한다.

옛날에는 MyBatis를 많이 사용하곤 했는데,

JPA를 쓰고, QueryDSL을 쓰면 대부분이 해결이 되고, 복잡한 쿼리가 나올때도 JdbcTemplate으로 왠만하면 해결이 가능하다고 한다.

복잡한 통계 쿼리를 사용할 때도 요즘에는 (회사마다 다르지만) 하둡 클러스터 같은 데이터 인프라가 잘 갖춰져있어 복잡한 쿼리들도 데이터 쪽에서 잘 처리해줘서 잘 쓸일이 없다.

- 참고

IBatis → MyBatis 로 이름이 변경되었다.

라이브러리에 남아있을 수도 있는데, 옛날 라이브러리가 남아있다고 생각하면 된다.

### MyBatis 적용 1 - 기본

이제부터 본격적으로 MyBatis를 사용해서 데이터베이스에 데이터를 저장해 보자.

XML에 작성한다는 점을 제외하고는 JDBC 반복을 줄여준다는 점에서 기존 JdbcTemplate과 거의 유사하다.

```java
@Mapper
public interface ItemMapper {

    void save(Item item);

    void update(@Param("id") Long id, @Param("updateParam") ItemUpdateDto);

    List<Item> findAll(ItemSearchCond itemSearch);

    Optional<Item> findById(Long id);
}
```

마이바티스 매핑 XML을 호출해주는 매퍼 인터페이스이다.

이 인터페이스에는 @Mapper 애노테이션을 붙여주어야 한다.

그래야 MyBatis에서 인식할 수 있다.

이 인터페이스의 메서드를 호출하면 다음에 보이는 xml의 해당 SQL을 실행하고 결과를 돌려준다.

ItemMapper 인터페이스의 구현체에 대한 부분은 뒤에서 설명한다.

이제 같은 위치에 실행할 SQL이 있는 XML 매핑 파일을 만들어 주면 된다.

참고로 자바 코드가 아니기 때문에 src/main/resources 하위에 만들되, 패키지 위치는 맞추어 주어야 한다.

src/main/resources/hello/itemservice/repository/mybatis/ItemMapper.xml

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="hello.itemservice.repository.mybatis.ItemMapper">

        <insert id="save" useGeneratedKeys="true" keyProperty="id">
            insert into item (item_name, price, quantity)
            values (#{itemName}, #{price}, #{quantity})
        </insert>
        <!--객체에서 getItemName(), getPrice(), getQuantity()를 해서 꺼내오는 것이다.-->

        <update id="update">
            update item
            set item_name=#{updateParam.itemName},
                price=#{updateParam.price},
                quantity=#{updateParam.quantity}
            where id = #{id}
        </update>

        <select id="findById" resultType="Item">
            select id, item_name, price, quantity
            from item
            where id = #{id}
        </select>
        <!--원래 resultType="hello.itemservice.domain.Item"으로 해줘야한다.-->
        <!--그런데 config에서 mybatis.type-aliases-package=hello.itemservice.domain을 해주었기 때문에-->
        <!--resultType에 Item만 적어도 잘 작동한다.-->

        <select id="findAll">
            select id, item_name, price, quantity
            from item
                <where>
                    <if test="itemName != null and itemName != ''">
                        and item_name like concat('%', #{itemName}, '%')
                    </if>
                    <if test="maxPrice != null">
                        and price &lt;= #{maxPrice}
                    </if>
                    <!--xml에서 '<' 는 &lt로 써야한다. 이상을 표시하려면 &lt;=이렇게 한다.-->

                </where>

        </select>

</mapper>
```

`<mapper namespace="hello.itemservice.repository.mybatis.ItemMapper">`

mapper 태그에는 namespace=’interface가 있는 경로’를 넣어주면 된다.

- Insert

Insert SQL은 <Insert>를 사용하면 된다.

id 에는 매퍼 인터페이스에 설정한 메서드 이름을 지정하면 된다.

여기서는 메서드 이름이 save()이므로 save로 지정하면 된다.

파라미터는 #{} 문법을 사용하면 딘다.

```java
<insert id="save" useGeneratedKeys="true" keyProperty="id">
    insert into item (item_name, price, quantity)
    values (#{itemName}, #{price}, #{quantity})
</insert>
```

그리고 매퍼에서 넘긴 객체와 프로퍼티 이름을 적어주면 된다.

#{} 문법을 사용하면 PreparedStatement를 사용한다.

JDBC의 ‘?’를 치환한다 생각하면 된다.

useGeneratedKeys는 데이터베이스가 키를 생성해주는 Identity 전략일 때 사용한다.

keyProperty는 생성되는 키의 속성 이름을 지정한다.

Insert가 끝나면 item 객체의 id속성에 생성된 값이 입력된다.

- update

update SQL은 <update>를 사용하면 된다.

```java
quantity=#{updateParam.quantity}
```

여기서 파라미터가 Long id, ItemUpdateDto updateParam으로 2개이다.

파라미터가 1개만 있으면 @Param을 지정하지 않아도 되지만,

파라미터가 2개 이상이면 @Param으로 이름을 지정해서 파라미터를 구분해야 한다.

- select - findById

Select SQL은 <select>를 사용하면 된다.

`resultType은 반환 타입을 명시하면 된다.`

```xml
<select id="findById" resultType="Item">
```

위에서 반환된 Item이 아래의 Item으로 그대로 반환된다.

```java
Optional<Item> findById(Long id);
```

여기서 결과를 Item 객체에 매핑한다.

앞서 application.properties에 mybatis.type-aliases-package=hello.itemservice.domain속성을 지정한 덕분에 모든 패키지 명을 다 적지 안아도 된다. 그렇지 않으면 모든 패키지 명을 다 적어야 한다.

JdbcTemplate의 BeanPropertyRowMapper 처럼 SELECT SQL의 결과를 편리하게 객체로 바로 변환해준다.

mybatis.configuration.map-underscore-to-camel-case=true 속성을 지정한 덕분에 언더스코어를 카멜 표기법으로 자동으로 처리해준다. (item_name → itemName)

`자바 코드에서 변환 객체가 하나이면 Item, Optional<Item>과 같이 사용하면 되고, 반환 객체가 하나 이상이면 컬렉션을 사용하면 된다. 주로 List를 사용한다.`

다음을 참고하자.

- select findAll

MyBatis는 <where>, <if>같은 동적 쿼리 문법을 통해 편리한 동적 쿼리를 지원한다.

<if>는 해당 조건이 만족하면 구문을 추가한다.

<where>은 적절하게 where 문장을 만들어 준다.

예제에서 <if>가 모두 실패하게 되면 SQL ‘where’을 만들지 않는다.

예제에서 <if>가 하나라도 성공하면 처음 나타나는 ‘and’를 where로 변환해준다.

```java
<select id="findAll">
  select id, item_name, price, quantity
  from item
      <where>
          <if test="itemName != null and itemName != ''">
              and item_name like concat('%', #{itemName}, '%')
          </if>
          <if test="maxPrice != null">
              and price &lt;= #{maxPrice}
          </if>
          <!--xml에서 '<' 는 &lt로 써야한다. 이상을 표시하려면 &lt;=이렇게 한다.-->
      </where>
</select>
```

ex) 문법적으로 from item where and는 오류가 발생하는데 if문에서 하나라도 맞게 되면 and를 자동으로 제거 시켜준다. → “where item_name like concat ~~” 이런 형태가 된다.

- XML 특수문자

그런데 가격을 비교하는 조건을 보자

and pirce &lt;= #{maxPrice}

XML에서 태그가 시작하거나 종료할 때 < > 와 같은 특수문자를 사용하기 때문에,

XML 영역에 <, > 같은 특수 문자를 사용할 수 없다.

그래서 &lt;= 와 같이 표현한다.

```java
< -> &lt;
> -> &gt;
& -> &amp;
```

다른 해결 방안으로는 XML에서 지원하는 CDATA 구문 문법을 사용하는 것이다.

이 구문 안에서는 특수문자를 사용할 수 있다.

대신 이 구문 안에서는 XML TAG가 단순 문자로 인식되기 때문에 <if>, <where> 등이 적용되지 않는다.

- XML CDATA사용

```xml
<where>
    <if test="itemName != null and itemName != ''">
        and item_name like concat('%', #{itemName}, '%')
    </if>
    <if test="maxPrice != null">
        and price &lt;= #{maxPrice}
        <![CDATA[
        and price <= #{maxPrice}]]>
    </if>
</where>
```

특수 문자와 CDATA 각각 상황에 따른 장단점이 있으므로 원하는 방법을 그때그때 선택하면 된다.

- XML 파일 경로 수정하기

XML 경로를 항상 저렇게 resources/hello/itemservice/repository/mybatis/를 찾아서 하나하나씩 등록하는건 어렵다.

XML 파일을 원하는 위치에 두고 싶으면 application.properties에 다음과 같이 설정하면 된다.

```xml
mybatis.mapper-locations=classpath:mapper/**/*.xml
```

이렇게 하면 resources/mapper를 포함한 그 하위 폴더에 있는 XML을 XML 매핑 파일로 인식한다.

이 경우 파일 이름은 자유롭게 설정해도 된다. 

참고로 테스트의 [appliaction.properties](http://appliaction.properties) 파일도 함께 수정해야 테스트를 실행할 때 인식할 수 있다.

### MyBatis 적용3 - 분석

생각해보면 지금까지 진행한 내용중에 약간 이상한 부분이 있다.

ItemMapper 매퍼 인터페이스의 구현체가 없는데 어떻게 동작한 것일까?

- ItemMapper 인터페이스

```java
@Mapper
public interface ItemMapper {

    void save(Item item);

    void update(@Param("id") Long id, @Param("updateParam") ItemUpdateDto itemUpdateDto);

    Optional<Item> findById(Long id);

    List<Item> findAll(ItemSearchCond itemSearch);
}

```

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/a4e869dd-e1b8-4b92-96e4-0e67a83f478a)

1. 애플리케이션 로딩 시점에 MyBatis 스프링 연동 모듈은 @Mapper가 붙어있는 인터페이스를 조사한다.

1. 해당 인터페이스가 발견되면 동적 프록시 기술을 사용해서 ItemMapper 인터페이스의 구현체를 만든다.

1. 생성된 구현체를 스프링 빈으로 등록한다.

실제 동적 프록시 기술이 사용되었는지 간단히 확인해보자.

```java
@Override
public Item save(Item item) {
log.info("itemMapper class = {}",itemMapper.getClass());
    itemMapper.save(item);
    return item;
}
```

클래스를 확인해 보니, 프록시 객체이다.

```java
h.i.r.mybatis.MyBatisRepository : itemMapper class = class com.sun.proxy.$Proxy68
```

- 참고

`동적 프록시 기술은 스프링 핵심원리 - 고급편에서 자세히 설명한다.`

- 매퍼 구현체

마이바티스 스프링 연동 모듈이 만들어주는 ItemMapper의 구현체 덕분에 인터페이스 만으로 편리하게 XML의 데이터를 찾아서 호출 할 수 있다.

원래 마이바티스를 사용하려면 더 번잡한 코드를 거쳐야 하는데, 이런 부분을 인터페이스 하나로 매우 깔끔하고 편리하게 사용할 수 있다.

매퍼 구현체 예외 변환까지 처리해준다.

MyBatis에서 발생한 예외를 스프링 예외 추상화인 DataAccessException에 맞게 변환해서 반환해준다.

JdbcTemplate이 제공하는 예외 변환 기능을 여기서도 제공한다고 이해하면 된다.

- 정리

매퍼 구현체 덕분에 마이바티스를 스프링에 편리하게 통합해서 사용할 수 있다.

매퍼 구현체를 사용하면 스프링 예외 추상화도 함께 적용된다.

마이바티스 스프링 연동 모듈이 많은 부분을 자동으로 설정해 주는데, 데이터베이스 커넥션, 트랜잭션과 관련된 기능도 마이바티스와 함께 연동하고, 동기화 해준다.

- 참고

마이바티스 스프링 연동 모듈이 자동으로 등록해주는 부분은 MyBatisAutoConfiguration 클래스를 참고하자.

## MyBatis 기능 정리 1 - 동적 쿼리

MyBatis에서 자주 사용하는 주요 기능을 공식 메뉴얼이 제공하는 예제를 통해 간단히 정리해보자.

MyBatis 공식 메뉴얼 : https://mybatis.org/mybatis-3/ko/index.html

MyBatis 스프링 공식 메뉴얼 : http://mybatis.org/spring/ko/indxe.html

### 동적 SQL

마이바티스가 제공하는 최고의 기능이자 마이바티스를 사용하는 이유는 바로 동적 SQL 기능 때문이다.

동적 쿼리를 위해 제공되는 기능은 다음과 같다.

- if
- choose(when, otherwise)
- trim (where, set)
- foreach

```java
<select id="findActiveBlogWithTitleLike" resultType="Blog">
    SELECT * FROM BLOG
    WHERE state = 'ACTIVE'
    <if test="title != null">
        AND title like #{title}
    </if>
</select>
```

- 해당 조건에 따라 값을 추가할지 말지 판단한다.
- 내부 문법은 OGNL을 사용한다. 자세한 내용은 OGNL을 검색하자.

```java
<select id="findActiveBlogLike" resultType="Blog">
    SELECT * FROM BLOG WHERE state = 'ACTIVE'
    <choose>
        <when test="title != null">
            AND title like #{title}
        </when>
        <when test="author != null and author.name != null">
            AND author_name like #{author.name}
        </when>
        <otherwise> // 위의 경우가 하나도 만족하지 않을 경우.
            AND featrued = 1
        </otherwise>
    </choose>
</select>
```

자바의 switch 구문과 유사한 구문도 사용할 수 있다.

- trim, where, set

```java
<select id="findActiveBlogLike" resultType="Blog">
    SELECT * FROM BLOG
    WHERE

    <if test="state != null">
        state = #{state}
    </if>
    
    <if test="title != null">
        AND title like #{title}
    </if>

    <if test="author != null and author.name != null">
        AND author_name like #{author.name}
    </if>

</select>
```

이 예제의 문제점은 문장이 모두 만족하지 않을 때 발생한다.

```java
SELECT * FROM BLOG
WHERE
```

만족하지 않으면 WHERE을 남기고 끝나기 때문에 BadSQLException이 발생한다.

```java
SELECT * FROM BLOG
WHERE
AND title like 'someTitle'
```

또한 title만 만족할 때도 문제가 발생한다.

- 어떻게 해결해야 하는가?

결국 WHERE문을 언제 넣어야 할지 상황에 따라서 동적으로 달라지는 문제가 있다.

<where>을 사용하면 이런 문제를 해결할 수 있다.

```java
<select id="findActiveBlogLike" resultType="Blog">
    SELECT * FROM BLOG
    <where>
        <if test="state != null">
             state = #{state}
        </if>
    
        <if test="title != null">
            AND title like #{title}
        </if>

        <if test="author != null and author.name != null">
            AND author_name like #{author.name}
        </if>
    </where>
</select>
```

<where>라는 문장이 없으면 where을 추가하지 않는다.

문장이 있으면 where을 추가한다.

만약 and가 먼저 시작된다면 and를 지운다.

참고로 다음과 같이 trim이라는 기능으로 사용해도 된다. 이렇게 정의하면 <where>과 같은 기능을 수행한다.

참고로 다음과 같이 trim이라는 기능으로 사용해도 된다.

이렇게 정의하면 <where>와 같은 기능을 수행한다.

```java
<trim prefix="WHERE" prefixOverrides="AND | OR">
    ...
</trim>
```

문장의 처음에 AND, OR이 있으면 WHERE로 대체하겠다는 의미이다.

- foreach

```java
<select id="selectPostIn" resultType="domain.blog.Post">
    SELECT *
    FROM POST P
    <where>
        <foreach item="item" index="index" collection="list"
             open="ID in (" separator="," close=")" nullable="true">
                  #{item}
        </foreach>
    </where>
</select>
```

컬렉션을 반복 처리할 때 사용한다.

where in (1,2,3,4,5,6) 과 같은 문장을 쉽게 완성할 수 있다.

파라미터로 List를 전달하면 된다.

JPA같은 경우는 그냥 객체를 넘기면 위와 같은 작업을 자동으로 처리해 준다.

동적 쿼리에 대한 자세한 내용은 다음을 참고하자.

https://mybatis.org/mybatis-3/ko/dynamic.sql.html

## MyBatis 기능 정리2 - 기타 기능

### 애노테이션으로 SQL 작성

다음과 같이 XML 대신에 애노테이션에 SQL을 작성할 수 있다.

```java
@Select("select id, item_name, price, quantity from item where id = #{id}
Optional<Item> findById(Long id);
```

@Insert, @Update, @Delete, @Select 기능이 제공된다.

이 경우 XML에는 <select id=”findById”> ~ </select>는 제거해야 한다.

`동적 SQL이 해결되지 않으므로 간단한 경우에만 사용한다.`

`그냥 XML로 쓰지 실제로 잘 쓰지는 않는다고 한다.`

애노테이션으로 SQL 작성에 대한 더 자세한 내용은 다음을 참고하자.

https://mybatis.org/mybatis-3/ko/java-api.html

### 문자열 대체(String Substitution)

#{} 문법은 ?를 넣고 파라미터를 바인딩하는 PreparedStatement를 사용한다.

때로는 파라미터 바인딩이 아니라 문자 그대로를 처리하고 싶은 경우도 있다.

이때는 ${}를 사용하면 된다.

다음 예제를 보자.

ORDER BY ${columnName}

```java
@Select("select * from user where ${column} = #{value}")
User findByColumn(@Param("column") String column, @Param("value") String value);
```

즉, ?로 파라미터 바인딩을 할 수 없는 경우에는 ${}을 써서 데이터를 받아온다는 것이다.

- 주의

${}를 사용하면 SQL 인젝션 공격을 당할 수 있다.

따라서 가급적 사용하면 안된다.

사용하더라도 매우 주의깊게 사용해야 한다.

### 재사용 가능한 SQL 조각

```xml
<select id="findById" resultType="Item">
    select id, item_name, price, quantity
    from item
    ...
</select>

<select id="findAll" resultType="Item">
    select id, item_name, price, quantity
    from item
    ...
</select>
```

위의 코드를 보면 SQL이 똑같이 중복이 된다.

```java
<sql id="userColumns"> ${alias}.id,${alias}.username, ${alias}.password </sql>
```

이때 위의 코드 처럼 sql을 정의해놓는다.

```java
<select id="selectUsers" resultType="map">
    select
        <include refid="userColumns"><property name="alias" value="t1"/><include>,
        <include refid="userColumns"><property name="alias" value="t2"/><include>
    from some_table t1
        cross join some_table t2
</select>
```

그러면 위의 코드처럼 sql id로 불러와서 데이터를 입력할 수 있게 된다.

```xml
<sql id="sometable">
    ${prefix}Table
</sql>

<sql id="someinclude">
    from
        <include refid="${include_target}"/>
</sql>

<select id="select" resultType="map">
    select
        field1, field2, field3
    <include refid="someinclude">
        <property name="prefix" value="Some"/>
        <property name="include_target" value="sometable"/>
    </include>
</select>
```

프로퍼티 값을 전달할 수 있고, 해당 값은 내부에서 사용할 수 있다.

### Result Maps

결과를 매핑할 때 테이블은 user_id이지만 객체는 id이다.

이 경우 컬럼명과 객체의 프로퍼티 명이 다르다. 그러면 다음과 같이 별칭 (’as’)를 사용하면 된다.

```xml
<select id="selectUsers" resultType="User">
    select
        user_id as "id",
        user_name as "userName"
        hashed_password as "hashedPassword"
    from some_table
    where id = #{id}
</select>
```

별칭을 사용하지 않고도 문제를 해결할 수 있는데, 다음과 같이 resultMap을 선언해서 사용하면 된다.

```xml
<resultMap id="userResultMap" type="User">
    <id property="id" column="user_id" />
    <result property="username" column="username"/>
    <result property="password" column="password"/>
</resultMap>

<select id="selectusers" resultMap="userResultMap">
    select user_id, user_name, hashed_password
    from some_table
    where id = #{id}
</select>

```

위 처럼 resultMap을 내가 직접 정해준다. 객체의 property와 데이터베이스 column명을 정해준뒤에 resultMap에다가 id명을 넣어주면 끝난다.

- 복잡한 결과 매핑

MyBatis도 매우 복잡한 결과에 객체 연관관계를 고려해서 데이터를 조회하는 것이 가능하다.

이때는 <association>, <collection> 등을 사용한다.

이 부분은 성능과 실효성 측면에서 많은 고민이 필요하다.

JPA는 객체와 관계형 데이터베이스를 ORM 개념으로 매핑하기 떄문에 이런 부분이 자연스럽지만, MyBatis에서는 들어가는 공수도 많고, 성능을 최적화하기도 어렵다.

따라서 해당기능을 사용할 때는 신중하게 사용해야 한다.

해당 기능에 대한 자세한 내용은 공식 메뉴얼을 참고하자.

- 참고

결과 매핑에 대한 자세한 내용은 다음을 참고하자

https://mybatis.org/mybatis-3/ko/sqlmap-xml.html#Result_Maps
