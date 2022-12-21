# 로컬환경에서는 MySQL이 잘 작동하는데 EC2에서는 작동하지 않는다?

개발을 하는 동안, 프론트 분들과 API를 테스트하며 굉장히 많은 오류와 마주했지만, 어느정도 시간을 들이면 해결할 수 있었다.

하지만 이 어려운 문제는 배포할 시기가 다가왔을때, AWS EC2에 배포한 서버의 데이터베이스를 H2에서 MySQL 교체할때 발생했다.

조금 자세히 알아보자.

## 오류
EC2에 MySQL을 설치하고 배포를 하였는데, Postman에 글쓰기 API 요청을 보내보자 아래와 같은 오류가 발생했다.

```jsx
org.springframework.dao.InvalidDataAccessResourceUsageException: could not execute statement;
SQL [n/a]; nested exception is org.hibernate.exception.SQLGrammarException: could not execute statement
```

금방 해결할 수 있을 것이라 생각했지만 오랫동안 구글에 검색해봐도 명확한 해답이 나오지 않았다.

검색으로 찾아낸 실마리인 예외(SQLGrammarException)는 데이터베이스의 Column을 인식할 수 없기 때문에 발생하는 문제였다.


## 원인 탐색
이후로는 원인을 직접 찾아보고자 했다.

### *의문1. Local에서는 H2, MySQL 데이터베이스 둘 다 너무 잘 작동하는데, 왜 EC2에서만 작동하지 않는걸까?*

로컬환경에서는 H2에서 MySQL로 설정되도록 YML파일을 설정해 주었고, 실제로 아무 문제 없이 잘 작동하는것까지 확인을 했다.

### *해결시도1. 예외에 보이듯이 DAO(Data Access Object) 에서 발생하므로, 해당 Repository의 코드를 문제인가?*

수정해보고자 했지만, 로직에는 전혀 문제가 없었다.

실제로 로컬환경에서는 잘 작동 했었기 때문에, 코드는 상관없는 문제가 분명했다.

### *해결시도2. EC2에 올라간 MySQL의 버전에 문제가 있는걸까?*

처음에는 EC2에 MySQL이 버전이 맞지 않다고 판단 했었지만, MYSQL 8.0.12 즉, 최신버전으로 사실상 문제가 없다고 판단했다.

### *해결시도3. IOS에서 작업하던 파일을 Window에서 작업하면 파일 인코딩 과정에서 문제가 발생할 때가 있었는데 그 때문 아닐까?*

위 상황과 비슷하게 Window에서 작업하던 파일이 Linux에 들어가면 발생하는 문제가 아닐까 생각했다.

하지만, 작성한 코드에 따라 Spring Data JPA에서 MySQL에 새로운 테이블들을 모두 만들어주기 때문에 Column명 변환은 문제가 없었다.

### *해결시도4. 아무리 생각해도 문제가 될 수 있는점은 운영체제 밖에 없었다.*

이와 관련해서 구글링을 해보니, 마침내 모든 이유에 합당한 원인을 찾을 수 있었다.

```jsx
Window에서의 MySQL은 Column을 인식할때, 대소문자를 구분하지 않는다.

Linux에서의 MySQL은 Column을 인식할때, 대소문자를 구분한다.
```

### 더 어려운 난관에 봉착..

해결방법은 MySQL 설정 config에 “lower_case_table_names = 1” 을 넣어주면 끝이었다.

원인을 찾아서 이제 해결할 만하다고 생각했지만, 그 이후가 더 난이도가 높아졌다.

그 이유는, 위에 언급한 옵션을 넣으면 MySQL이 시작되지 않는 문제가 발생하기 때문이다.

왜 실행이 안되는지 계속해서 구글링 하며 찾은 끝에,

MySQL 8.0 이후 버전에서는 초기화 할 때만 config 설정이 가능하다는 글을 발견했다.

영어 공식문서에 초기화 할때만 이라고 적혀있는데, 처음보는 입장에서 여기서 말하는 초기화가 어떤 작업인지 정확히 이해할수가 없었다.

MySQL 초기화에 대해 검색을 해도 잘 나오지 않아

"MySQL은 초기화 옵션은 한번 실행하면 변경할 수 없습니다." 라는 정보를 토대로 추론하며 초기화를 스스로 정의내렸다.

초기화란!

설치되고 가장 첫번째로 MySQL을 시작할때 진행되는 config 설정이다.

즉, 최초의 실행 이전에 config를 설정해 두어야한다.

그렇게 어렵게 초기화를 시킨 후, 더 이상 오류 없이 잘 작동하도록 만들 수 있었다.

### 느낀점

자료가 충분하지 않을때, 개발을 하는건 어렵지만 그 만큼 실력이 느는것같다.

### Reference

[[Ubuntu] Mysql 완전 삭제, 재설치](https://2vup.com/ubuntu-remove-mysql/)

[[MySQL] AWS EC2에 설치한 MySQL 외부 접속 허용하기](https://kingofbackend.tistory.com/195)

[lower_case_table_names Settings in MySQL 8.0.12](https://stackoverflow.com/questions/51803216/lower-case-table-names-settings-in-mysql-8-0-12)
