[[JPA] 연관관계 매핑 기초 #1 (연관관계의 필요성, 단방향 연관관계)](https://velog.io/@conatuseus/%EC%97%B0%EA%B4%80%EA%B4%80%EA%B3%84-%EB%A7%A4%ED%95%91-%EA%B8%B0%EC%B4%88-1-i3k0xuve9i)

1. 핵심적으로 이해할 수 있었던 부분만 기록한다.

### 객체 연관 관계 ( 1:N )

회원 객체(Member)는 Member.team 필드(멤버 변수)로 팀 객체와 연관관계를 맺습니다.

- 회원 객체와 팀 객체는 **단방향 관계**입니다. 회원은 Member.team 필드를 통해 팀을 알 수 있지만, 팀 객체로 소속된 회원들을 알 수 없기 때문입니다. member ➡️ team 의 조회는 member.getTeam()으로 가능하지만, team ➡️ member 를 접근하는 필드는 없습니다.

### 연관관계 쉽게 기억하기

```java
@Entity
public class Member {

  @Id @GeneratedValue
  private Long id;

  @Column(name = "USERNAME")
  private String name;

  @ManyToOne
  @JoinColumn(name = "TEAM_ID")
  private Team team;

  // Getter, Setter ...
}

@Entity
public class Team {

  @Id @GeneratedValue
  private Long id;
  private String name;

  // Getter, Setter ...
}
```

잠깐 생각해보자, Many가 붙은쪽은 중복된 값을 2개이상 가질수 있는지만 생각하면 된다.

ex) 두명의 사람이 있는데, 한 사람이, 1번팀, 다른 한 사람도 1번팀. 이렇게 중복될 수 있으면, Many가 붙는다고 기억하자.

### 연관관계 매핑 이전과 매핑 후 코드의 차이

연관관계 매핑 이전 코드

```
//회원 저장
Member member = new Member();
member.setName("conas");
member.setTeamId(team.getId());
em.persist(member);
```

연관관계 매핑 이후 코드

```
//회원 저장
Member member = new Member();
member.setName("conas");
member.setTeam(team); //단방향 연관관계 설정, 참조 저장
em.persist(member);
```

연관관계 매핑이전에는 team객체에 getId() 메서드를 호출하여, set을 해주었지만,

연관관계 이후에는 정말 간단하게 setTeam만 해주면된다.

### 아래와 같은 방식으로는 왜 안되었던걸까?

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e81d75ce-58d3-4801-bd90-b571694c88c5/Untitled.png)

원인 ) NullPointerException 오류가 발생한다. 이유는 간단하다.

answer객체에서 getBoard()를 하면 생성이 되어 있지 않기때문에, Null을 받아온다.

Null은 setBoardId() 메서드를 가지고 있지 않기 때문에, 실행시키면 NullPointerException 에러가 발생하는것이다.

해결 ) 아래처럼 바꾸어주면 잘 작동한다. board를 set해주지않으면, null일 뿐이다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ae6e1166-03e2-462b-b288-d1407ce15db6/Untitled.png)

### 연관관계의 수정

```
// 새로운 팀B
Team teamB = new Team();
teamB.setName("TeamB");
em.persist(teamB);

// 회원1에 새로운 팀B 설정
member.setTeam(teamB);
```

### 1 : N 매핑 관계의 객체의 관점

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6fb3a909-f9b5-4e7c-ac45-0d68adc0c443/Untitled.png)

객체의 관점에서보면 Member는 Team을 포함하고 있기 때문에, 바로 Join이 가능하다.

### 1 : N에서 1인쪽에 List가 있는 이유

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e77525fa-8b1c-4a41-be7c-8a835581bc10/Untitled.png)

Team Table에서 Member Table로 Join을 시도할때, 객체의 관점에서 보면, team은 member들을 다 가지고 있어야한다. 그래야 아래에 그린 예시처럼. Join이 가능하기 때문이다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7f64564c-7a90-4de6-8204-32165af761bc/Untitled.png)

### 반드시 지켜야하는 규칙 : 연관관계의 주인

양방향 매핑시, 두 연관관계중 하나를 연관관계의 주인으로 만들어야한다.

연관관계의 주인 만이 데이터베이스 연관관계와 매핑되고 외래 키를 관리(등록, 수정, 삭제) 할 수 있다. 반면에 주인이 아닌쪽은 읽기만 할 수 있다.

`착각하지말자!` mappedBy는 주인이 아님을 선언하는것이다!

### 그럼 왜 연관관계에 주인이 꼭 필요한것일까?

연관관계의 주인을 정한다는 것은 사실 외래 키 관리자를 선택하는 것입니다.

그림을 보면, 여기서는 회원 테이블에 있는 TEAM_ID 외래 키를 관리할 관리자를 선택해야 합니다. 

만약 회원 엔티티에 있는 Member.team을 주인으로 선택하면 자기 테이블에 있는 외래 키를 관리하면 됩니다.

하지만 팀 엔티티에 있는 Team.members를 주인으로 선택하면 물리적으로 전혀 다른 테이블의 외래 키를 관리해야 합니다. 

왜냐하면 이 경우 Team.members가 있는 Team 엔티티는 TEAM 테이블에 매핑되어 있는데 관리해야할 외래 키는 MEMBER에 있기 때문입니다.

데이터베이스 테이블의 다대일, 일대다 관계에서는 항상 다 쪽이 외래키를 가지므로 @ManyToOne에는 mappedBy 속성이 없다.

### 주의할점 !

```java
Member member1 = new Member("member1", "회원1");
em.persist(member1);

Member member2 = new Member("member2", "회원2");
em.persist(member2);

Team team1 = new Team("team1", "팀1");
team1.getMembers().add(member1);
team1.getMembers().add(member2);

em.persist(team1);
```

Team에서 getMembers().add()로 접근할 결우 TEAM_ID는 null이 나온다.

다시 한번 말하지만, 연관관계의 주인만이 외래 키의 값을 변경할 수 있다.

연관관계의 주인인 Member.team에 아무 값도 입력하지 않았기 때문에, TEAM_ID 외래 키의 값도 null이 저장된다.

### 그런데 정말 한쪽에만 데이터를 넣는게 올바른 방식일까?

그렇지않다. 데이터베이스에는 값이 제대로 들어갈지 모르겠지만, Java의 로직을 해결할때는, 데이터가 없어, 제대로 작동하지 않는다.

```java
public void test(){

 Team team1 = new Team("team1", "팀1");
 Member member1 = new Member("member1", "회원1");
 Member member2 = new Member("member2", "회원2");

 member1.setTeam(team1);
 member2.setTeam(team2);

 List<Member> members = team1.getMembers();
 System.out.println("members.size = " + members.size());
}
// 결과: member.size = 0
```

그러므로 위의 상태를 바꾸어 주어야한다.

```java
public void test(){

  Team team1 = new Team("team1", "팀1");
  em.persist(team1);

  Member member1 = new Member("member1", "회원1");
  member1.setTeam(team1);
  team1.getMembers().add(member1);
  em.persist(member1);

  Member member2 = new Member("member2", "회원2");
  member2.setTeam(team2);
  team1.getMembers().add(member2);
  em.persist(member2);
}
```

그런데 이렇게 만든다면, 실수로 둘중 하나만 호출해서 양방향이 깨질 수 있으므로

연관관계 편의 메서드를 만들면 좋다.

### 연관관계 편의 메서드

```java
public class Member{

  private Team team;

  public void setTeam(Team team) {
    this.team = team;
    team.getMembers().add(this);
  }
}
```

이렇게 메서드하나를 만들어 모두 함께 관리하도록 하자

`반드시 주의해야할 점!`

```java
member1.setTeam(team1)
member1.setTeam(team2)
```

위 코드 그대로 예를들어 작동시켰다고 생각해보자.

```java
member1.team = team1;
team1.getMembers().add(member1); // team1에는 member1이 들어가있음.

member1.team = team2;
team2.getMembers().add(member1); // team2로 변경하여 member1을 넣었다.
```

team2로 바꾸는걸 의도 했지만 List에 추가해주었기 때문에, 여전히 team1에는 member1이 들어있다.

즉, team1과 team2에 member1이 동시에 존재하는 오류가 발생한다.

그러므로 이를 방지해주기 위해 아래와 같이 코드를 작성해 주어야한다.

```java
public void setTeam(Team team){
    if( this.team != null ) {
        this.team.getMembers().remove(this);
    }
        this.team = team;
        team.getMembers().add(this);
}
```

혹시라도 발생할지 모르는, 무한루프 방지법

```java
public class User {

    ...
    
    public void setGroup(Group group) {
    	if(this.group != null) {
            this.group.getUser().remove(this)
        }
        this.group = group;
        // 이부분이 없으면 무한 루프에 걸린다.
        if(!group.getUsers().contains(this)) {
            group.addUser(this);
        }
    }
}

@Entity
public class Group {

    ...
    
    public void addUser(User user) {
    	this.users.add(user);
        // 이부분이 없으면 무한 루프에 걸린다.
        if (user.getGroup != this) {
            user.setGroup(this);
        }
    }
}
```

[[JPA] 다대일 관계 양방향 매핑 과 연관 관계 주인, 연관관계 편의 메소드](https://velog.io/@gillog/JPA-%EC%96%91%EB%B0%A9%ED%96%A5-%EB%A7%A4%ED%95%91%EA%B3%BC-%EC%97%B0%EA%B4%80-%EA%B4%80%EA%B3%84-%EC%A3%BC%EC%9D%B8)

김영한님 강의 참고할것.
