# DAY31

SQL이 어떻게 이루어져 있는지 이해한다.

SQL 기본 qurey문을 사용할 줄 안다.

Schema의 설계 방법과 나은 방향성을 고안한다.

서버와 클라이언트 사이에서 주고 받는 데이터를 database에 저장하여 영속성있게 저장할 수 있다.

### SQL이란?

Structured Query Language

### Query란?

질의문

검색창에 적는 검색어도 Query의 일종이다.

저장되어있는 정보를 필터하기 위한 질문이다.

### SQL이란?

데이터베이스용 프로그래밍 언어다.

데이터베이스에 Query를 보내 원하는 데이터만 필터링할 수 있다.

### 왜 Database가 필요한가?

In-Memory → 끄면 데이터가 사라진다.

File I/O → 원하는데이터만 가져올 수 없고 항상 모든 데이터를 가져온 뒤 서버에서 필터링함.

Database → 필터링 외에도 File I/O로 구현이 힘든 관리를 위한 여러 기능들을 가지고 있는 데이터에 특화된 서버

![Untitled 1](https://user-images.githubusercontent.com/70310271/172911170-a0d91e59-3517-4075-8446-fe6f777b3b62.png)

![Untitled](https://user-images.githubusercontent.com/70310271/172911165-6f67301b-9ef7-4a2e-9aad-535cab1e09ea.png)

