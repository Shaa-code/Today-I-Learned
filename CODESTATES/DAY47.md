# DAY47



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
