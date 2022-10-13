org.springframework.dao.InvalidDataAccessResourceUsageException: could not execute statement; SQL [n/a]; nested exception is org.hibernate.exception.SQLGrammarException: could not execute statement

잡기 어려운 문제였다.

Local 환경에서는 H2, Mysql 모두 다 작동확인이 되었는데, EC2에 있는 MYSQL에 올리기만하면 오류가 발생한다는것이다.

[](https://2vup.com/ubuntu-remove-mysql/)

[[MySQL] AWS EC2에 설치한 MySQL 외부 접속 허용하기](https://kingofbackend.tistory.com/195)

[lower_case_table_names Settings in MySQL 8.0.12](https://stackoverflow.com/questions/51803216/lower-case-table-names-settings-in-mysql-8-0-12)
