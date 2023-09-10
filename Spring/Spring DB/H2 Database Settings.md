이전 버전에서는 처음 시작해서 jdbc URL에 jdbc:h2:~/test를 입력하면 test.mv.db를 만들어 주었다.

하지만 버전이 올라가면서 test.mv.db 파일을 자동으로 만들어주지 않는다.

내가 직접 만들어야 한다.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/d4fe41cf-b401-420a-8e69-1290cdb40c8d)

jdbc URL을 jdbc:h2:~/test로 들어가는 건

Test.mv.db에 직접 접근하는 것이므로 TCP를 사용하여 접근하도록 설정을 바꿔주자.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/17a92899-8c13-43ea-84e8-0f76e49c8a51)

jdbc URL → jdbc:h2:tcp://localhost/~/test

```java
create table member(
    member_id varchar(10),
    money integer not null default 0,
    primary key (member_id)
);

insert into member(member_id, money) values ('hi1',10000);
insert into member(member_id, money) values ('hi2',20000);
```

넣고 나오는지 테스트 해보자.
