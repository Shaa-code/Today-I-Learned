# JDBC 이해

### JDBC 등장 이유

![Untitled](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/856f39dd-3f05-470a-8fc1-dbf5cff948c6)

1. 커넥션 연결 → 주로 TCP/IP를 사용해서 Connection을 연결한다.
2. SQL 전달 → 애플리케이션 서버는 DB가 이해할 수 있는 SQL을 연결된 커넥션을 통해 DB에 전달한다.
3. 결과 응답 → DB는 전달된 SQL을 수행하고 그 결과를 응답한다. 애플리케이션 서버는 응답 결과를 활용한다.

과거 20년전에는 각각의 데이터베이스(MySQL, Oracle 등)마다 커넥션을 연결하는 방법, SQL을 전달하는 방법, 결과를 응답 받는 방법이 모두 달랐다.

여기서 발생하는 2가지 큰 문제가 있다.

1. 데이터베이스를 다른 종류의 데이터베이스로 변경하면 애플리케이션 서버에 개발된 데이터베이스 사용 코드도 함께 변경해야 한다. ( DB 바뀔 때마다 자바코드 다 바꾸면.. 흐.. )
2. 개발자가 각각의 데이터베이스 마다 커넥션 연결, SQL 전달, 그리고 그 결과를 응답받는 방법을 새로 학습해야 한다.

`이런 문제를 해결하기 위해서 JDBC라는 자바 표준이 등장한다.`

### JDBC 표준 인터페이스

JDBC(Java DataBase Connectivity)은 자바에서 데이터베이스에 접속 할 수 있도록 하는 자바 API다.

JDBC는 데이터베이스에서 자료를 쿼리하거나 업데이트 하는 방법을 제공한다.


![Untitled 1](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/57ca87e9-32d0-497f-a289-ef92f5a79e76)

java.sql.Connection → 연결

java.sql.Statement → SQL을 담은 내용

java.sql.ResultSet → SQL 요청 응답

자바는 이렇게 표준 인터페이스를 정의해 두었다.

이제부터 개발자는 이 표준 인터페이스만 사용해서 개발하면 된다.

그런데 인터페이스만 있다고 해서 기능이 동작하지는 않는다.

이 JDBC 인터페이스를 각각의 DB벤더(회사)에서 자신의 DB에 맞도록 구현해서 라이브러리로 제공하는데, 이것을 JDBC 드라이버라고 한다.

ex) MySQL DB에 접근 할 수 있는 것은 MySQL JDBC 드라이버라고 정의, Oracle DB에 접근할 수 있는 것은 Oracle JDBC 드라이버라 정의.

![Untitled 2](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/2de64067-9e74-45f1-898b-6f1a7ab9c356)

![Untitled 3](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/7c873406-56b2-4144-ae92-88673d68bc9d)

- 정리

JDBC의 등장으로 2가지 문제가 해결되었다.

1. 데이터베이스를 다른 종류의 데이터베이스로 변경하면 애플리케이션 서버의 데이터베이스 사용 코드도 함께 변경해야 하는 문제

애플리케이션 로직은 이제 JDBC 표준 인터페이스에만 의존한다.

따라서 데이터베이스를 다른 종류의 데이터베이스로 변경하고 싶으면 JDBC 구현 라이브러리만 변경하면 된다.

따라서 다른 종류의 데이터베이스로 변경해도 애플리케이션 서버의 사용코드를 그대로 유지할 수 있다.

1. 개발자가 각각의 데이터베이스마다 커넥션 연결, SQL 전달, 그리고 그 결과를 응답 받는 방법을 새로 학습해야 하는 문제

개발자는 JDBC 표준 인터페이스 사용법만 학습하면 된다.

한번 배워두면 수십개의 데이터베이스에 모두 동일하게 적용할 수 있다.

- 표준화의 한계

JDBC의 등장으로 많은 것이 편리해졌지만, 가각의 데이터베이스마다 SQL, 데이터타입 등의 일부 사용법이 다르다.

ANSI SQL 이라는 표준이 있기는 하지만 일반적인 부분만 공통화했기 때문에 한계가 있다.

대표적으로 실무에서 기본으로 사용하는 페이징 SQL은 각각의 데이터베이스마다 사용법이 다르다.

결국 데이터베이스를 변경하면 JDBC 코드는 변경하지 않아도 되지만 SQL은 해당 데이터베이스에 맞도록 변경해야한다.

참고로 JPA(Java Persistence API)를 사용하면 이렇게 각각의 데이터베이스마다 다른 SQL을 정의해야 하는 문제도 많은 부분 해결할 수 있다.

### JDBC와 최신 데이터 접근 기술

JDBC는 1997년에 출시될 정도로 오래된 기술이고, 사용하는 방법도 복잡하다.

그래서 최근에는 JDBC를 직접 사용하기 보다는 JDBC를 편리하게 사용하는 다양한 기술이 존재한다.

대표적으로 SQL Mapper와 ORM 기술로 나눌 수 있다.

![Untitled 4](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/b134a852-4ded-4b86-a05a-ebc20bada66c)

- SQL Mapper

![Untitled 5](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/f2464df2-8574-4527-8890-ed757d6afd64)

장점 :

JDBC를 편리하게 사용하도록 도와준다.

JDBC만 사용하면 SQL응답을 객체로 변환하기 힘든데,

SQL응답 결과를 객체로 편리하게 변환해준다.

JDBC의 반복 코드를 제거해준다.

단점 : 

개발자가 SQL을 직접 작성해야 한다.

실무에서 SQL을 직접 사용한다고 하면 JDBC를 직접 사용하는 경우는 없고, JdbcTemplate나, MyBatis를 이용한다.

대표기술 : Spring JdbcTemplate, MyBatis

- ORM 기술

![Untitled 6](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/4980d50d-9f04-440e-b9cc-64ab19387c02)

- ORM은 객체를 관계형 데이터베이스 테이블과 매핑해주는 기술이다.

이 기술 덕분에 개발자는 반복적인 SQL을 직접 작성하지 않고,

ORM 기술이 개발자 대신에 SQL을 동적으로 만들어 실행해준다.

추가로 각각의 데이터베이스마다 다른 SQL을 사용하는 문제도 중간에서 해결해준다.

대표 기술 : JPA, Hibernate, EclipseLink

JPA는 자바 진영의 ORM 표준 인터페이스이고, 이것을 구현한 것으로 하이버네이트와 이클립스 링크 등의 구현 기술이 있다.

객체를 넣어주면 알아서 SQL을 만들어서 데이터베이스에 전달해준다.

- SQL Mapper vs ORM 기술

SQL Mapper와 ORM 기술 둘다 각각 장단점이 있다.

SQL Mapper는 SQL만 직접 작성하면 나머지 번거로운 일은 SQL Mapper가 대신 해결해준다.

SQL Mapper는 SQL만 작성할 줄 알면 금방 배워서 사용할 수 있다.

ORM기술은 SQL 자체를 작성하지 않아도 되어서 개발 생산성이 매우 높아진다.

편리한 반면에 쉬운 기술은 아니므로 실무에서 사용하려면 깊이있게 학습해야 한다.

- 중요!

이런 기술들도 내부에서는 모두 JDBC를 사용한다 따라서 JDBC를 직접 사용하지는 않더라도, JDBC가 어떻게 동작하는지 기본 원리를 알아두어야 한다.

그래야 해당 기술들을 더 깊이있게 이해할 수 있고, 무엇보다 문제가 발생했을 때 근본적인 문제를 찾아서 해결할 수 있다.

`JDBC는 자바 개발자라면 꼭 알아두어야하는 필수 기본 기술이다.`

```java
@Slf4j
public class DBConnectionUtil {

    public static Connection getConnection(){
        try {
            Connection connection = DriverManager.getConnection(URL,USERNAME,PASSWORD);
            log.info("get connection = {}, class = {}", connection, connection.getClass());
            return connection;
        }catch(SQLException e){
            throw new IllegalStateException(e);
            //Check Exception을 RuntimeException으로 바꿈.

        }
    }
}
```

데이터베이스에 연결하려면 JDBC가 제공하는 DriverManager.getConnection(..)을 사용하면 된다.

이렇게 하면 라이브러리에 있는 데이터베이스 드라이버를 찾아서 해당 드라이버가 제공하는 커넥션을 반환해준다.

여기서는 H2 데이터베이스 드라이버가 작동해서 실제 데이터베이스와 관계를 맺고 그 결과를 반환해준다.

![Untitled 7](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/bee3de2f-20fd-4939-afcd-71b07386d1cb)

이 Driver가 찾아서 연결한다.

```java
@Slf4j
public class DBConnectionUtilTest {

    @Test
    void connection(){
        Connection connection = DBConnectionUtil.getConnection();
        assertThat(connection).isNotNull();
    }
}

//[Test worker] INFO hello.jdbc.connection.DBConnectionUtil - get connection = conn0: url=jdbc:h2:tcp://localhost/~/test user=SA, class = class org.h2.jdbc.JdbcConnection
```

getConnection()으로 가져온 jdbcConnection 객체이다.

위 로그에서 볼 수 있다시피, org.h2.jdbc.jdbcConnection가 있는데, 이 class의 정체가 H2 데이터베이스 드라이버가 제공하는 H2 전용 Connection이다.

이 커넥션은 당연하게도 JDBC 표준 커넥션 인터페이스인 java.sql.Connection 인터페이스를 구현하고 있다.

### JDBC DriverManager 연결 이해

![Untitled 8](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/766c3be7-73bf-4418-bee4-f201ac9a5835)

JDBC는 java.sql.Connection 표준 커넥션 인터페이스를 정의한다.

H2 데이터베이스 드라이버는 JDBC Connection 인터페이스를 구현한 ‘org.h2.jdbc.JdbcConnection 구현체를 제공한다.

즉, h2.jdbc.jdbcConnection을 가져왔기 때문에 이제 통신을 할 수 있는 것이다.

### DriverManager 커넥션 요청 흐름

![Untitled 9](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/d4a33dfd-72bc-4d58-a9be-d99130a763b0)

`JDBC가 제공하는 DriverManager는 라이브러리에 등록된 DB 드라이버들을 관리하고, 커넥션을 획득하는 기능을 제공한다.`

1. 애플리케이션 로직에서 커넥션이 필요하면 DriverManager.getConnection()을 호출한다.
2. DriverManager는 라이브러리에 등록된 드라이버 목록을 자동으로 인식한다.

이 드라이버들에게 순서대로 다음 정보를 넘겨서 커넥션을 획득할 수 있는지 확인한다.

URL → ex) jdbc:h2:tcp://localhost/~/test

이름, 비밀번호 등 접속에 필요한 추가 정보

여기서 각각의 드라이버는 URL 정보를 체크해서 본인이 처리할 수 있는 요청인지 확인한다.

ex) URL이 jdbc:h2로 시작하면 h2 데이터베이스에 접근하기 위한 규칙이다.

따라서 H2 드라이버는 본인이 처리할 수 있으므로 실제 데이터베이스에 연결해서 커넥션을 획득하고 이 커넥션을 클라이언트에 반환한다.

반면에 URL이 jdbc:h2로 시작했는데 MySQL 드라이버가 먼저 실행되면 이 경우 본인이 처리할 수 없다는 결과를 반환하게 되고, 다음 드라이버에게 순서가 넘어간다.

1. 이렇게 찾아진 커넥션 구현체가 클라이언트에 반환된다.

우리는 H2 데이터베이스 드라이버만 라이브러리에 등록했기 때문에 H2 드라이버가 제공하는 H2 커넥션을 제공받는다. 물론 이 H2 커넥션은 JDBC가 제공하는 java.sql.Connection 인터페이스를 구현하고 있다.

H2 데이터베이스 드라이버 라이브러리

```java
runtimeOnly 'com.h2database:h2' //h2-x.x.xxx.jar
```

- schema.sql

```java
drop table member if exists cascade;
create table member (
    member_id varchar(10),
    money interger not null default 0,
    primary key (member_id)
);
```

```java
@Slf4j
public class MemberRepositoryV0 {

    public Member save(Member member) throws SQLException {
        String sql = "insert into member(member_id, money) values (?, ?)";

        Connection con = null;
        PreparedStatement pstmt = null;

        try {
            con = getConnection();
            pstmt = con.prepareStatement(sql);
            pstmt.setString(1, member.getMemberId());
            pstmt.setInt(2,member.getMoney());
            //values (?, ?) 부분을 매핑해 줘야한다.
            return member;

        } catch (SQLException e){
            log.error("db error", e);
            throw e;
        } finally{
            pstmt.close(); //이 코드에서 Exception이 발생하면, con.close()가 실행이 안된다.
            con.close();
        }
}
```

executeUpdate()는 int를 반환하는데 영향받은 DB row 수를 반환한다.

여기서 하나의 row를 등록했으므로 1을 반환한다.

`//Statement는 SQL을 그대로 실행, PreparedStatement는 (?, ?)을 처리할 수 있는 객체임`

- 리소스 정리

쿼리를 실행하고 나면 리소스를 정리해야한다.

`리소스를 정리할 때는 항상 역순으로 진행해야한다.`

예외가 발생하든 발생하지 않든 항상 수행되야 하므로, finally 구문에 주의해서 작성해야한다.

만약 이 부분을 놓치게 되면, 커넥션이 끊어지지 않고 계속 유지되는 문제가 발생할 수 있다.

이런 것을 리소스 누수라고 하는데, `결과적으로 커넥션 부족으로 장애가 발생할 수 있다.`

- 참고

SQL Injection 공격을 예방하기 위해서는 PreparedStatement를 통한 파라미터 바인딩 방식을 사용해야 한다.

- ResultSet

ResultSet은 아래 처럼 생긴 데이터 구조이다.

최초의 커서는 데이터를 가리키고 있지 않기 때문에 rs.next()를 최초 한번은 호출해야 데이터를 조회할 수 있다.

![Untitled 10](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/2f482172-c9cf-4f56-8e23-4a3840fde60b)

rs.getString(”member_id”) → 현재 커서가 가리키고 있는 위치의 member_id 데이터를 String 타입으로 반환한다.

rs.getInt(”money”) → 현재 커서가 가리키고 있는 위치의 money 데이터를 int타입으로 반환한다.

- 최종 코드

```java
/**
 * JDBC - DriverManager사용
*/

@Slf4j
public class MemberRepositoryV0 {

    public Member save(Member member) throws SQLException {
        String sql = "insert into member(member_id, money) values (?, ?)";

        Connection con = null;
        PreparedStatement pstmt = null;

        try {
            con = getConnection();
            pstmt = con.prepareStatement(sql); //values (?, ?) 부분을 매핑 해준다.
            pstmt.setString(1, member.getMemberId());
            pstmt.setInt(2,member.getMoney());
            pstmt.executeUpdate(); //Statement를 통해 준비된 SQL을 커넥션을 통해 실제 데이터베이스에 전달한다.

            return member;

        } catch (SQLException e){
log.error("db error", e);
            throw e;

        } finally{
            close(con,pstmt,null);
        }

    }

    public Member findById(String memberId) throws SQLException {
        String sql = "select * from member where member_id = ?";

        Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try{
            con = getConnection();
            pstmt = con.prepareStatement(sql);
            pstmt.setString(1,memberId);
            rs = pstmt.executeQuery(); // 쿼리를 실행한 결과들을 담고있는 데이터를 ResultSet에 반환함.
            if (rs.next()) { //한번은 호출 해줘야 함 Cursor가 아무것도 안가르키고 있다가 next() 호출함으로써 다음을 지정함.
                Member member = new Member();
                member.setMemberId(rs.getString("member_id"));
                member.setMoney(rs.getInt("money"));
                return member;
            }else{
                throw new NoSuchElementException("member not found memberId=" + memberId);
            }

        } catch (SQLException e) {
log.error("error", e);
            throw e;

        } finally {
            close(con, pstmt, rs);
        }
    }

    public void update(String memberId, int money) throws SQLException {
        String sql = "update member set money=? where member_id=?";

        Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try{
            con = getConnection();
            pstmt = con.prepareStatement(sql);
            pstmt.setInt(1,money);
            pstmt.setString(2,memberId);
            int resultSize = pstmt.executeUpdate();
log.info("resultSize = {}", resultSize);

        } catch (SQLException e) {
log.error("error", e);
            throw e;

        } finally {
            close(con, pstmt, rs);
        }
    }

    public void delete(String memberId) throws SQLException {
        String sql = "delete from member where member_id=?";

        Connection con = null;
        PreparedStatement pstmt = null;

        try{
            con = getConnection();
            pstmt = con.prepareStatement(sql);
            pstmt.setString(1,memberId);
            pstmt.executeUpdate();
        } catch (SQLException e) {
log.error("error", e);
            throw e;
        } finally {
            close(con, pstmt, null);
        }

    }

    private void close(Connection con, Statement stmt, ResultSet rs){

        if (rs != null){
            try{
                rs.close();
            } catch (SQLException e) {
log.info("error", e);
            }
        }

        if(stmt != null) {
            try{
                stmt.close(); //Exception이 발생하면 바로 Catch를 하기 때문에 문제가 발생하지 않는다.
            }catch (SQLException e){
log.info("error", e);
            }
        }

        if(con != null){
            try{
                con.close();
            }catch (SQLException e){
log.info("error",e);
            }
        }
    }

    private Connection getConnection() {
       return DBConnectionUtil.getConnection();
    }

}

```

- 테스트코드

```java
@Slf4j
class MemberRepositoryV0Test {

    MemberRepositoryV0 repository = new MemberRepositoryV0();

    @Test
    void crud() throws SQLException {
        //save
        Member member = new Member("memberV1", 10000);
        repository.save(member);

        //findById
        Member findMember = repository.findById(member.getMemberId());
        log.info("findMember = {}", findMember);
        assertThat(findMember).isEqualTo(member); //이것도 @Data에 @EqualsAndHashCode가 있기 때문에 가능한거다.

        //update: money: 10000 -> 20000
        repository.update(member.getMemberId(),20000);
        Member updatedMember = repository.findById(member.getMemberId());
        assertThat(updatedMember.getMoney()).isEqualTo(20000);

        //delete
        repository.delete(member.getMemberId());
        //삭제 되었는데 어떻게 검증을 할 수 있지? -> 우리가 지정해 둔 오류가 나는걸로 검증한다.
        assertThatThrownBy(() -> repository.findById(member.getMemberId()))
                .isInstanceOf(NoSuchElementException.class);

    }
}
```

삭제되었을 경우에도 테스트코드를 찾을 수 있다. (키워드 : 삭제 테스트코드)

- 참고

마지막에 회원을 삭제할 수 있기 때문에 테스트가 정상 수행되면, 이제부터는 같은 테스트를 반복해서 실행할 수 있게 된다.

물론 테스트 중간에 오류가 발생해서 삭제 로직을 수행할 수 없다면 테스트를 반복해서 실행할 수 없게 된다.

이때 트랜잭션을 활용하면 이 문제를 깔끔하게 해결할 수 있다.
