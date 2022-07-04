# DAY47

수정예정

### DDD(Domain Driven Development)

고객이 음식을 주문하는 과정 주문받은 음식을 처리하는 과정, 조리된 음식을 배달하는 과정등의 도메인 지식(Domain Knowledge)들을 서비스 계층에서 비즈니스로직으로 구현하는것.

### Aggregate이란?

비슷한 범주의 연관된 업무를 하나로 그룹화 해놓은 그룹.

![Untitled](https://user-images.githubusercontent.com/70310271/176925451-91009429-aa96-4cc0-ba63-1bb9d94fcd9b.png)

회원 애그리거트, 주문 애그리거트, 음식 애그리거트, 결제 애그리거트

### Aggregate Root란?

각각의 애그리거트에는 해당 애그리거트를 대표하는 도메인이 존재한다.

Aggregate를 대표하는 도메인을 DDD에서는 Aggregate Root라고한다.

어떤 도메인을 Aggreate Root로 설정해야할까?

회원포인트를 알려면, 회원정보를 알아야한다. 즉, 회원정보 도메인이 Aggregate Root가 된다.

![Untitled 1](https://user-images.githubusercontent.com/70310271/176925460-1b142ed6-1ba1-4a06-adb0-9b00deed6ffb.png)

**주문 테이블의 이름이 ‘ORDER’가 아니라 ‘ORDERS’인 이유**

‘ORDER’는 SQL 쿼리문에서 테이블의 로우(Row)를 정렬하기 위해 사용하는 **‘ORDER BY’**라는 예약어에 사용되기 때문에 테이블이 생성될 때 에러를 발생할 수 있습니다.

### Entity 구현

![Untitled 2](https://user-images.githubusercontent.com/70310271/177170454-a5f58d6c-c5cb-49f8-9fae-a63b153528f4.png)

1. memberId를 PK로 만든다. → 멤버변수에 @Id애너테이션을 붙여 식별자로 지정한다.

![Untitled 3](https://user-images.githubusercontent.com/70310271/177170468-ac95db77-8a9c-4b6c-baad-62e9375217be.png)

`Member클래스는 데이터베이스 테이블에서 MEMBER테이블과 매핑과 매핑된다.`

@Table을 추가하지 않으면 기본적으로 클래스명이 테이블의이름과 매핑이 된다.

Order는 SQL쿼리문에서 사용하는 예약어 이므로, @Table(”ORDERS”)를 사용한다.

![Untitled 4](https://user-images.githubusercontent.com/70310271/177170480-d350ab9c-b77e-4da8-8ada-ee7d94d4a21e.png)

`Order클래스는 ORDERS테이블과 매핑된다.`

Order클래스에 Member클래스를 외래키처럼 추가했다.

AggregateRefernece클래스로 감싸, 직접적인 객체참조가 아닌 ID참조로 되게 만들었따.

`즉, AggregateReference의 용도는 1:N 애그리거트 루트간 ID참조이다.`

@MappedCollection(idColumn = “ORDER_ID”)는 엔티티 클래스간에 연관관계를 맺어주는 정보를 의미한다.

![Untitled 5](https://user-images.githubusercontent.com/70310271/177170502-763f385d-de13-42e8-9ff8-2a28c830328c.png)

