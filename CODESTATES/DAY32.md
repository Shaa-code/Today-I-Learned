

### Schema란?

데이터베이스에서 데이터가 구성되는 방식과 서로 다른 엔티티간의 관계에 대한 설명이다.

| Teacher | Classes | Students |
| --- | --- | --- |
| Name | Name | Name |
| Department | Room Number | Email |
| Classes | Teacher | Classes |
|   | Students |  |

각각의 객체를(Teacher, Classes,Students)을 Entity라고 한다.

착각하지 말자(위 테이블에서 열은 각 행에 해당한다.) 

각각의 열을 에 해당하는 데이터들을 Record라고 한다.

ex) Classes[ Name : Cynthia / Department : Music / Classes : Music Theory ]

### 1:1 관계

![Untitled](https://user-images.githubusercontent.com/70310271/173101447-6239a3b4-cb18-4295-a243-8d892694914f.png)


굳이 이렇게 쓸 필요가 있을까?

Phonebook의 Phone_number를 User에 넣는게 훨씬 더 좋아 보인다.

보다시피 이런 이유로 1:1 관계는 잘 사용되지 않는다.

### 1:N 관계

한명의 선생님은 여러 클래스를 가르친다.

![Untitled 1](https://user-images.githubusercontent.com/70310271/173101466-74577157-2a61-4111-b7c2-0662a92b6e7d.png)

### N:N관계

한명의 학생은 여러 클래스 수업을 듣는다.

여러 클래스에서 학생들은 수업을 들을 수 있다.

![Untitled 2](https://user-images.githubusercontent.com/70310271/173101484-ece65d5b-5592-413c-b624-be7d7a63c987.png)

N:N 관계는 비즈니스에서 존재할수 없다. 2개의 1:N을 쪼개서 테이블 형태로 사용해야한다.
