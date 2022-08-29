자바 정파 EJB → 너무 어렵고 코드가 더러워지고,

POJO(Plain Old Java Object) → 차라리 오래된 방식의 순수한 자바로 돌아가자.

### 스프링이란?

스프링은 문맥에 따라 다르게 사용된다.

스프링 프레임워크, 스프링부트, 스프링 데이터, 스프링 세션, 스프링 시큐리티, 스프링 RestDoc 스프링 배치, 스프링 클라우드

스프링 DI 컨테이너 기술 등

### 스프링 부트

스프링을 편리하게 사용할 수 있도록 지원, 최근에는 기본으로 사용

단독으로 실행할 수 있는 스프링 애플리케이션을 쉽게 생성

Tomcat같은 웹서버를 내장해서 별도의 웹서버를 설치하지 않아도됨

손쉬운 빌드 구성을 위한 starter 종속성 제공

스프링과 3rd parth(외부) 라이브러리 자동 구성

메트릭, 상태 화가인, 외부 구성 같은 프로덕션 준비기능 제공

관례에 의한 간결한 설정

### 스프링은 왜 만들었는가?

스프링은 자바 언어 기반의 프레임워크이다.

`자바 언어의 가장 큰 특징인 객체지향의 특징을 살려내는 프레임워크`

스프링은 좋은 객체 지향 애플리케이션을 개발할 수 있게 도와주는 프레임워크

객체 지향 프로그래밍은 프로그램을 `유연하고 변경이 용이하게 만들기 때문`에 대규모 소프트우ㅔ어 개발에 많이 사용된다.

역할과 구현으로 구분하면 세상이 단순해지고, 유연해지며 변경도 편리해진다.

- 클라이언트는 대상의 역할(인터페이스)만 알면된다.
- 클라이언트는 구현 대상의 내부 구조를 몰라도 된다.
- 클라이언트는 구현 대상의 내부구조가 변경되어도 영향을 받지 않는다.
- 클라이언트는 구현 대상 자체를 변경해도 영향을 받지 않는다.

역할 = 인터페이스

구현 = 인터페이스를 구현한 클래스, 구현 객체

객체를 설계할 때 역할과 구현을 명확히 분리

객체 설계시 역할(인터페이스)를 먼저 부여하고, 그 역할을 수행하는 구현 객체 만들기

혼자 있는 객체는 없다.

클라이언트 : 요청 , 서버 : 응답

수많은 객체 클라이언트와 객체 서버는 서로 협력관계를 가진다.

오버라이딩은 자바 기본 문법

오버라이딩된 메서드가 실행

`다형성으로 인터페이스를 구현한 객체를 실행시점에 유연하게 변경할 수 있다.`

물론 클래스 상속 관계도 다형성, 오버라이딩 적용가능

`Client는 MemberRepository의 기능을 알고 있다. == Client는 MemberRepository에 의존한다.`

Client는 기능만 알고있으면 된다. 의존한다는것은 기능을 알고있다는 의미이다.

다형성의 본질은 협력이라는 객체사이의 관계에서 시작해야한다.

클라이언트를 변경하지 않고, 서버의 구현 기능을 유연하게 변경할 수 있다.

`이렇게 역할과 구현을 분리하면 유연하고 변경이 용이하고 클라이언트에 영향을 주지 않으면서도 확장 가능한 설계가 가능하다.`

`위를 보면 알겠지만 인터페이스를 설계하는 단계가 가장 중요하다`.

### 좋은 객체지향 설계의 5가지 원칙(SOLID)

1. SRP(Single Responsibility Principle) 단일 책임 원칙

한 클래스는 하나의 책임만 가져야한다.

하나의 책임이라는것은 모호하다.

클 수도 있고, 작을 수 도 있다.

문맥과 상황에 따라 다르다.

- `중요한 기준은 변경이다. 변경이 있을때 파급효과가 적으면 단일 책임원칙을 잘 따른것`
- UI 변경, 객체의 생성과 사용을 분리

1. OCP(Open/Closed Principle) 개방 폐쇄 원칙

소프트웨어 요소는 확장에는 열려있으나 변경에는 닫혀 있어야한다.

인터페이스를 구현한 새로운 클래스를 하나 만들어서 새로운 기능을 구현

MemberService 클라이언트가 구현 클래스를 직접 선택

- MemberRepository m = new MemoryMemberRepository(); //기존 코드
- Memberepository m = new JdbcMemberRepository(); //변경 코드

하지만 보다시피 구현 객체를 변경하려면 클라이언트 코드를 변경해야한다.

다형성을 사용하고 있지만 OCP원칙을 지킬수는 없다.

이 문제를 어떻게 해결해야하는가? → IoC, DI, 스프링컨테이너가 필요하다.

객체를 생성하고 연관관계를 맺어주는 별도의 조립, 설정자가 필요하다.

1. LSP(Liskov Substitution Principle) 리스코프 치환 원칙

프로그램의 객체는 프로그램의 정확성을 깨뜨리지 않으면서 하위타입의 인스턴스로 바꿀 수 있어야한다.

다형성에서 하위 클래스는 인터페이스 규약을 다 지켜야 한다는점, 다형성을 지원하기 위한 원칙, 인터페이스를 구현한 구현체는 믿고사용하려면 이 원칙이 필요하다.

`인터페이스를 정의했으면 그 기능에 일치하도록 구현할 수 있어야한다.`

1. ISP(Interface Segregation Principle) 인터페이스 분리 원칙

특정 클라이언트를 위한 인터페이스 여러개가 범용 인터페이스 하나보다 낫다.

자동차 인터페이스 → 운전 인터페이스, 정비 인터페이스로 분리

사용자 클라이언트 → 운전자 클라이언트, 정비사 클라이언트로 분리

분리하면 정비 인터페이스 자체가 변해도 운전자 클라이언트에 영향을 주지 않음.

인터페이스가 명확해지고, 대체 가능성이 높아진다.

1. DIP(Dependency Inversion Principle) 의존관계 역전 원칙

프로그래머는 “추상화에 의존해야지, 구체화에 의존하면 안된다.” 의존성 주입은 이 원칙을 따르는 방법 중 하나다.

구현 클래스에 의존하지 말고, 인터페이스에 의존해라.

역할에 의존하게 해야한다는것과 일치한다. 클라이언트가 인터페이스에 의존해야 유연하게 구현체를 변경할 수 있다.

OCP에서 설명한 MemberService는 인터페이스에 의존하지만, 구현 클래스도 동시에 의존한다.

MemberService 클라이언트가 구현 클래스를 직접 선택

MemberRepository m = new MemoryMebmerRepository(); → DIP 위반

추상화에 의존해야하는데, 구체화에 의존하였기 떄문이다.

 

다형성 만으로는 쉽게 부품을 갈아 끼우듯이 개발할 수 없다.

다형성 만으로는 구현 객체를 변경할 때 클라이언트 코드도 함께 변경된다.

다형성 만으로는 OCP, DIP를 지킬 수 없다.

스프링은 다음 기술로 다형성, + OCP, DIP를 가능하게 지원한다.

DI(Dependency Injection): 의존관계 , 의존성 주입

DI 컨테이너 제공

클라이언트 코드의 변경없이 기능 확장

쉽게 부품을 교체하듯이 개발

옛날 개발자들이 좋은 객체 지향 개발을 하려고 OCP,DIP원칙을 지키면서 개발을 해보니 할일이 너무 많아서, 프레임워크로 만들어버렸다.

순수하게 자바로 OCP,DIP원칙들을 지키면서 개발을 해보면, 결국 스프링 프레임워크를 만들게 된다. (정확히는 DI 컨테이너)

DI 개념은 말로 이해가 안된다. 코드로 짜봐야한다.

실무에서의 고민 → 나중에 깨닫게 될듯.

인터페이스를 도입하면 추상화라는 비용이 발생한다.

기능을 확장할 가능성이 없다면, 구체 클래스를 직접사용하고, 향후 꼭 필요할 때 리팩터링해서 인터페이스를 도입하는것도 방법이다.

## 회원 도메인 설계

1. 회원을 가입하고 조회할 수 있다.

첫번째 인지 → 클라이언트는 회원가입과 조회가 가능하다.

1. 회원은 일반과 VIP 두가지 등급이 있다.
2. 회원데이터는 자체 DB를 구축할 수 있고 , 외부시스템과 연동할 수 있다.

두번째 인지 → 우선에 메모리 회원저장소에서 I/O만 확인하면서 나중에 DB가 결정되면 그때 가서 DB회원 저장소를 만들어 교체하면 되겠다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/456c2d7c-54d3-455c-8e81-91373b307b93/Untitled.png)

이걸 토대로 회원 클래스 다이어그램을 그린다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/28e6140f-312f-44e4-a191-f5571faf3656/Untitled.png)

MemberService : 회원서비스

MemberServiceImpl : 회원서비스를 구현한 구현체

MemberRepository : 회원 저장소(연동할곳)

MemoryMemberRepository : 메모리 회원 저장소 (메모리 상에서 멤버 테스트해볼 Re pository)

DbMemberRepository : DB 회원 저장소

회원 객체 다이어그램

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/441b180c-8fee-406f-82d8-e3a5a8fdffd1/Untitled.png)

클라이언트 객체가 회원 서비스 객체를 참조하고, 회원서비스는 메모리 회원 저장소 객체를 참조한다.

테스트 코드 작성법 

```java
public class MemberServiceTest {

    MemberService memberService = new MemberServiceImpl(); //우선에 있어야함

    @Test
    void join(){
        //given //회원이 주어졌다고 가정,
        Member member = new Member(1L,"memberA",Grade.VIP);
        //when //회원가입이 들어왓을때, 1번 회원을 찾는다.
        memberService.join(member);
        Member findMember = memberService.findMember(1L);
        //then //처음 Member와 1번 사람이 같다면? 테스트 통과.
        Assertions.assertThat(member).isEqualTo(findMember);
    }
}

```

## 주문과 할인 도메인 설계

회원은 상품을 주문할 수 있다.

회원 등급에 따라 할인 정책을 적용할 수 있다.

할인 정책은 모든 VIP는 1000원을 할인해주는 고정 금액 할인을 적용해달라.

할인 정책은 변경가능성이 높다. 회사의 기본 할인정책을 해결을 아직 정하지 못했고, 오픈 직전까지 고민을 미룬다.

최악의 경우 할인을 적용하지 않을 수 도 있다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/adbcfabf-9533-4b9f-b685-ae327306a49a/Untitled.png)

클라이언트가 주문을 생성하고, 회원을 조회한후, Grade를 파악해서, 할인을 적용시킨다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1357d28c-aaf3-4ecd-bd8a-c8a81b2b8d43/Untitled.png)

할인 정책 역할과, 회원 저장소 역할 모두 바꿔 끼울 수 있도록 설계한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5a53b4fe-054e-4d3a-bc29-34ab4085dd1e/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/19d0053c-9262-4790-b4d9-84754f3c308f/Untitled.png)

실제로 동적으로 객체의 참조관계를 나타낸것.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f3bfa65d-a66d-4e8e-9d59-8e2f43a423bc/Untitled.png)

새로운 할인 정책을 적용하려고 하니까 문제가 생긴다.

```java
private final DiscountPolicy discountPolicy = new RateDiscountPolicy();
```

discountPolicy 추상(인터페이스)에도 의존하고 있고, RateDiscountPolicy 구체(구현클래스)에도 의존하고 있다.

즉, 계속해서 구현 클래스를 수정을 해주어야한다는 소리이다.

그래서 FixDisocuntPolicy를 RateDiscountPolicy로 변경하는 순간 OrderServiceImpl의 소스코드도 함께 변경해야한다.

그럼 어떻게 이 문제를 해결할 수 있을까?

순수하게 추상(인터페이스)에만 의존하도록 만들면 된다.

```java
public class OrderServiceImpl implements OrderService {
    //private final DiscountPolicy discountPolicy = new RateDiscountPolicy();
    private DiscountPolicy discountPolicy;
}
```

이렇게 만들면 된다. 그런데. 구현체가 없으면 어떻게 로직이 흐를 수 있는가?

불가능하다.

위 주석이 처리된 코드는 로미오 역할(인터페이스)을 하는 레오나르도 디카프리오(구현체,배우)가 줄리엣 역할(인터페이스)을 하는 여자 주인공(구현체, 배우)을 직접 초빙하는것과 같다.

디카프리오는 공연도 해야하고 동시에 여자주인공도 공연에 직접초빙(기획)하는 다양한 책임을 가지고 있다.

### 관심사를 분리해야한다.

공연 기획자는 공연 기획을 하고, 배우는 어떤 주인공이 선택되더라도 똑같이 공연을 할 수 있어야한다.

배우와 공연 기획자의 책임을 확실히 분리하자.

### 관심사를 분리하기 위해 AppConfig가 생겨난다.

애플리케이션의 정체 동작방식을 구성하기 위해, 구현객체를 생성하고 연결하는 책임을 가지는 별도의 설정 클래스를 만들자!

```java
public class AppConfig {

    public MemberService memberService() {
        return new MemberServiceImpl(new MemoryMemberRepository());
}

    public OrderService orderService() {
        return new OrderServiceImpl(
            new MemoryMemberRepository(),
            new FixDiscountPolicy());
    }
}
```

`AppConfig는 실제로 애플리케이션의 실제 동작에 필요한 구현 객체를 생성한다.`

MemberServiceImpl

MemoryMemberRepository

OrdereServiceImpl

FixDiscountPolicy

`AppConfig는 생성한 객체 인스턴스의 참조(레퍼런스)를 생성자를 통해서 주입(연결)해준다.`

MemberServiceImpl → MemoryMemberRepository

OrderServiceImpl → MemoryMemberRepository, FixDiscountPolicy

이제는 딴건 볼 필요가 없고 생성자만 보고 맞춰 끼워넣으면 된다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1ebe4c75-c61e-49ba-b482-a1ea7519a105/Untitled.png)

앞으로 객체의 생성과 연결은 AppConfig가 담당한다.

DIP 완성 : MemberServiceImpl은 MemberRepository인 추상에만 의존하면 된다.

이제 구체 클래스를 몰라도 된다.

관심사의 분리 : 객체를 생성하고 연결하는 역할과 실행하는 역할이 명확히 분리되었다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9da0ccd5-f5a3-4fc5-a84b-8e8c09ecaa5b/Untitled.png)

`appConfig 객체는 memoryMemberRepository객체를 생성하고 그 참조값을 memberServiceImpl을 생성하면서 생성자로 전달한다.`

클라이언트인 memberServiceImpl입장에서 보면 의존관계를 마치 외부에서 주입해주는것 같다고 해서 DI(Dependecy Injection) 의존성 주입이라고 한다.

AppConfig는 공연 기획자이다.

AppConfig는 애플리케이션이 어떻게 동작해야할지 전체 구성을 책임진다.

### AppConfig의 리팩토링

```java
public class AppConfig {
    public MemberService memberService() {
    return new MemberServiceImpl(new MemoryMemberRepository());
}
    public OrderService orderService() {
    return new OrderServiceImpl(new MemoryMemberRepository(),new FixDiscountPolicy());
    }
}
```

```java
public class AppConfig {

    public MemberService memberService(){
        return new MemberServiceImpl(MemberRepository());
    }

    public MemoryMemberRepository MemberRepository()   {
        return new MemoryMemberRepository();
    }

    public OrderService orderService(){
        return new OrderServiceImpl(MemberRepository(), discountPolicy());
    }

    public DiscountPolicy discountPolicy(){
        return new FixDiscountPolicy();
    }
}
```

new MemoryMemberReposiory()의 중복이 제거됨.

MemoryMemberRepository를 다른 구현체로 변경할때 한 부분만 변경하면 되게됨.

AppConfig를 보면 역할과 구현 클래스가 한눈에 들어옴 애플리케이션 전체 구성이 어떻게 되어있는지 빠르게 파악할 수 있음.

### 새로운 구조와 할인 정책 적용

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8d054093-97e9-4e76-b644-678cf01b9c3f/Untitled.png)

AppConfig의 등장으로 애플리케이션이 크게 사용영역과, 객체를 생성하고 구성(Configuration)하는 영역으로 분리되었다. 

### 제어의 역전 IoC(Inversion of Control)

기존의 프로그램은 클라이언트 구현 객체가 스스로 필요한 서버 구현객체를 생성하고 연결하고 실행했다. 한마디로 구현  객체가 프로그램의 제어 흐름을 스스로 조종했다. 개발자 입장에서는 자연 스러운 흐름이다.

반면에 AppConfig가 등장한 이후 구현 객체는 자신의 로직을 실행하는 역할만 담당한다.

프로그램의 제어흐름은 이제 AppConfig가 가져간다. 예를 들어서 ‘OrderServiceImpl’은 필요한 인터페이스들을 호출하지만 어떤 구현 객체들이 실행될지 모른다.

//이것을 제어 흐름이 역전되었다고 표현한다. 프로그램이 아니라 외부로 가져갔기 때문.

`프로그램에 대한 제어흐름에 대한 권한은 모두 AppConfig가 가지고 있다. 심지어 ‘OrderServiceImpl’도 AppConfig가 생성한다.`

‘OrderServiceImpl’도 AppConfig가 생성한다. 그리고 AppConfig는 ‘OrderServiceImpl’이 아닌 OrderService 인터페이스의 다른 구현 객체를 생성하고 실행할 수 도 있다.

`이렇듯 프로그램의 제어흐름을 직접 제어하는것이 아니라, 외부에서 관리하는것을 제어의 역전(IoC)라고 한다.`

### 의존관계 주입 DI(Dependency Injection)

‘OrderServiceImpl’은 ‘DiscountPolicy’에 의존하고 

이제 실제 어떤 구현 객체가 사용될지 모른다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8e5451df-690d-4816-a693-8380a277a9be/Untitled.png)

- 정적인 클래스 의존관계

클래스가 사용하는 import코드만 보고 의존관게를 판단할수 있다.

그림에서 보이는것 처럼 ‘OrderServiceImpl’은 MemberRepository,’DIscountPolicy’에 의존한다는건 알수 있다.

하지만 이러한 클래스 의존관계 만으로는 실제로 어떤 객체가 ‘OrderServiceImpl’에 주입될지 알 수 없다.

이런 부분을 동적인 객체 인스턴스 의존 관계 라고 한다.

- 동적인 객체 인스턴스 의존관계

`애플리케이션 실행 시점에 실제 생성된 객체 인스턴스의 참조가 연결된 의존관계이다.`

애플리케이션 *실행 시점(런타임)에 외부에서 실제 구현 객체를 생성하고 클라이언트에 전달해서 클라이언트와 서버의 실제 의존관계가 연결되는것을 의존관계 주입이라 한다.

객체 인스턴스를 생성하고 그 참조값을 전달해서 연결된다.

의존관계 주입을 사용하면 클라이언트 코드를 변경하지 않고, 클라이언트가 호출하는 대상의 타입 인스턴스를 변경할 수 있다.

의존관계 주입을 사용하면 정적인 클래스 의존관계를 변경하지 않고, 동적인 객체 인스턴스 읜존관계를 쉽게 변경할 수 있다.

### IoC 컨테이너, DI 컨테이너

`AppConfig 처럼 객체를 생성하고 관리하면서 의존관계를 연결해주는것을 “IoC 컨테이너” 또는 “DI컨테이너”라고한다.`

의존관계 주입에 초점을 찾우어 최근에는 주로 DI 컨테이너라고 한다.

또는 어샘블러, 오브젝트 팩토리 등으로 불리기도 한다.

### 스프링 컨테이너

```java
    public static void main(String[] args) {

//        AppConfig appConfig = new AppConfig();
//        MemberService memberService = appConfig.memberService();
//        OrderService orderService = appConfig.orderService();

        ApplicationContext applicationContext = new AnnotationConfigApplicationContext(AppConfig.class);
        MemberService memberService = applicationContext.getBean("memberService", MemberService.class);
        OrderService orderService = applicationContext.getBean("orderService", OrderService.class);

        Long memberId = 1L;
        Member member = new Member(memberId, "memberA", Grade.VIP);
        memberService.join(member);

        Order order = orderService.createOrder(memberId, "itemA", 10000);

        System.out.println("order = " + order);
    }
}
```

```java
public class MemberApp {
    public static void main(String[] args) {
//        AppConfig appConfig = new AppConfig();
//        MemberService memberService = appConfig.memberService();
//        MemberService memberService = new MemberServiceImpl();

        ApplicationContext applicationContext = new AnnotationConfigApplicationContext(AppConfig.class);
        MemberService memberService = applicationContext.getBean("memberService", MemberService.class);

        Member member = new Member(1L, "MemberA", Grade.VIP);
        memberService.join(member);

        Member findMember = memberService.findMember(1L);
        System.out.println("member = " + member.getName());
        System.out.println("findmember = " + findMember.getName());

    }
}
```

ApllicationContext를 스프링 컨테이너라 한다.

기존에는 개발자가 ‘AppConfig’를 사용해서 직접 객체를 생성하고 DI를 했지만, 이제부터는 스프링 컨테이너를 통해서 사용한다.

`스프링 컨테이너는 @Configuration’이 붙은 AppConfig를 설정(구성) 정보로 사용한다. 여기서 ‘@Bean’이라 적힌 메서드를 모두 호출해서 반환된 객체를 스프링 컨테이너에 등록한다.`

이렇게 스프링 컨테이너에 등록된 객체를 “스프링 빈” 이라 한다.

스프링 빈은 ‘@Bean’이 붙은 메서드 명을 스프링 빈의 이름으로 사용한다. (’memberService’,’orderService’)

이전에는 개발자가 필요한 객체를 ‘AppConfig’를 사용해서 직접 조회했지만, 이제부터는 스프링 컨테이너를 통해서 필요한 스프링 빈(객체)를 찾아야한다. 스프링 빈은 ‘applicationContext.getBean()’메서드를 사용해서 찾을 수 있다.

기존에는 개발자가 직접 자바코드로 모든것을 했다면 이제부터는 스프링 컨테이너에 객체를 스프링 빈으로 등록하고 스프링컨테이너에서 스프링 빈을 찾아서 사용하도록 변경되었다.

코드가 약간 더 복잡해진것 같은데, 스프링 컨테이너를 사용하면 어떤 장점이 있을까?

### 스프링 컨테이너와 스프링 빈

ApplicationContext 를 스프링 컨테이너라 한다.

ApplicationContext는 인터페이스다. (즉, ApplicationContext의 구현체 중의 하나이다.)

스프링 컨테이너는 XML을 기반으로 만들 수 있고, 애노테이션 기반의 자바 설정 클래스로 만들수도 있다.

스프링 컨테이너는 BeanFactory, ApplicationContext로 구분해서 이야기한다.

BeanFactory를 직접사용하는 경우는 거의없으므로 일반적으로 ApplicationContext를 스프링 컨테이너라 한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ab7d0e8a-8804-4031-891c-292ac7310476/Untitled.png)

new AnnotationConfigApplicationContext(AppConfig.class)명령어를 받으면

스프링 컨테이너가 생성된다. 그 안에는 빈 저장소라는게 들어있다.

이제 AppConfig.class를 보고 구성정보를 받아온다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ee07cc88-6497-4788-851f-b197d2108374/Untitled.png)

어떻게 메서드가 빈이 되는거지? 생각했는데, Bean을 등록할때, 메서드는 빈이름으로 들어가기 때문이고, return값을 빈 객체로 받기 때문이다.

스프링 컨테이너는 설정 클래스 정보에서 하나씩 호출해서 빈이름, 빈객체 이렇게 2개씩 모두 담아둔다.

빈 이름은 메서드 이름을 사용하는게 일반적이고

빈 이름을 직접 부여할 수 도 있다.

@Bean(name=”memberService2”)

빈 이름은 항상 다른 이름을 부여해야한다. 같은 이름을 부여하면, 다른 빈이 무시되거나, 기존 빈을 덮어버리거나 설정에 따라 오류가 발생한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b1816880-51a9-4bc7-b273-e2e73a2efa80/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/803d1d04-db92-4500-8f76-f9834c2e40f1/Untitled.png)

스프링 컨테이너는 설정 정보를 참고해서 의존관계를 주입(DI)해야한다.

스프링은 빈을 생성하고, 의존관계를 주입하는 단계가 나누어져 있다. 그런데 이렇게 자바코드로 스프링빈을 등록하면 생성자를 호출하면서 의존관계주입도 한번에 처리된다. 여기서는 이해를 돕기위해 개념적으로 나누어 설명했다.

```java
@Test
    @DisplayName("모든 빈 출력")
    void findAllBean() {
        String[] beanDefinitionNames = ac.getBeanDefinitionNames();
        for (String beanDefinitionName : beanDefinitionNames) {
            Object bean = ac.getBean(beanDefinitionName);
            System.out.println("name = " + beanDefinitionName + "object = " + bean);
        }
    }
```

ac.getBeanDefinitionNames() : 스프링에 등록된 모든 빈 이름을 조회한다.

ex) memberServiceobject

ac.getBean() : 빈이름으로 빈 객체(인스턴스)를 조회한다.

ex) hello.core.member.MemberServiceImpl@3fb6cf60

스프링 컨테이너에서 스프링 빈을 찾는 가장 기본적인 조회방법

ac.getBean(빈이름, 타입)

ac.getBean(타입)

조회 대상 스프링 빈이없으면 예외 발생

NoSuchBeanDefinitionException : No bean named ‘xxxxx’ available

```java
public class ApplicationContextBasicFindTest {

    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

    @Test
    @DisplayName("빈 이름으로 조회")
    void findBeanByName(){
        MemberService memberService = ac.getBean("memberService", MemberService.class);
        Assertions.assertThat(memberService).isInstanceOf(MemberServiceImpl.class);
    }

    @Test
    @DisplayName("구체 타입으로 조회")
    void findBeanByName2(){
        MemberService memberService = ac.getBean("memberService",MemberServiceImpl.class);
        Assertions.assertThat(memberService).isInstanceOf(MemberServiceImpl.class);
    } // 구체화된건 좋지않은코드임. 하지만 현실에서 쓰일대가 있음.

    @Test
    @DisplayName("이름 없이 타입으로만 조회")
    void findBeanByType(){
        MemberService memberService = ac.getBean( MemberService.class);
        Assertions.assertThat(memberService).isInstanceOf(MemberServiceImpl.class);
    } 

    @Test
    @DisplayName("빈 이름으로 조회X")
    void findBeanByNameX(){
       // ac.getBean("xxxxx",MemberService.class);
        org.junit.jupiter.api.Assertions.assertThrows(NoSuchBeanDefinitionException.class,
                () -> ac.getBean("xxxxx",MemberService.class));
    }
}
```

### 스프링 빈조회 동일한 타입이 둘이상

타입으로 조회시 같은 타입의 스프링빈이 둘 이상이면 오류가 발생한다.

이때는 빈 이름을 지정하자.

ac.getBeansOfType()을 사용하면 해당 타입의 모든 빈을 조회할 수 있다.

```java

AnnotaionConfigApplicationContext ac = new AnnotationConfigApplicationContext(SameBeanConfig.class)
MemberRepository memberRepository = ac.getBean("memberRepository1", MemberRepository.class) // 이름을 지정해줌

@Configuration
static class SameBeanConfig{
    @Bean
    public MemberRepository memberRepository1(){
    return new MemoryMemberRepository();
}

    @Bean
    public MemberRepository memberRepository2(){
    return new MemoryMemberRepository();
}
}
```

### 스프링 빈 조회 - 상속관계 (어디에 쓰는지 몰라서 핵심만 알고 넘어간다)

부모 타입으로 조회를하면 자식 타입도 함께 조회된다.

그래서 Object타입으로 조회를하면 모든 스프링빈을 조회한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b517d918-ee33-48e5-9a01-b1a8225785a6/Untitled.png)

### BeanFactory와 ApplicationContext

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a1f78bb0-bf0b-4e56-8451-3008847b162a/Untitled.png)

### BeanFactory

는 스프링 컨테이너의 최상위 인터페이스다.

스프링 빈을 관리하고 조회하는 역할을 담당한다.

getBean()을 제공한다.

지금까지 우리가 사용했던 대부분의 기능은 BeanFactory가 제공하는 기능이다.

### ApplicationContext

BeanFacotry기능을 모두 상속받아서 제공한다.

빈을 관리하고 검색하는 기능을 BeanFactory가 제공해주는데, 그러면 둘 차이가 뭘까?

애플리케이션을 개발할때는 빈을 관리하고 조회하는 기능은 물론이고 수많은 부가기능이 필요하다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c10d544e-ddcc-4571-9156-f5dc7369ae6c/Untitled.png)

- 메시지 소스를 활용한 국제화기능

예를 들어서 한국에서 들어오면한국어로 영어권에서 들어오면 영어로 출력

- 환경변수

로컬, 개발, 운영등을 구분해서 처리한다.

- 애플리케이션 이벤트

이벤트를 발행하고 구독하는 모델을 편리하게 지원

- 편리한 리소스 조회

파일, 클래스패스, 외부 등에서 리소스를 편리하게 조회

### 다양한 설정 형식 지원 - 자바코드 XML

스프링 컨테이너는 다양한 형식의 설정 정보를 받아드릴 수 있게 유연하게 설계되어 있다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dad4c28b-e64b-4420-b80e-50718f5694fb/Untitled.png)

애노테이션 기반의 자바코드를 가장 많이 사용한다.

new AnnotationConfigApplicationContext(Appconfig.class)

AnnotationConfigApplicationContext 클래스를 사용하면서 자바 코드로된 설정 정보를 넘기면 된다.

XML 설정을 사용하면 컴파일 없이 빈 설정 정보를 변경할 수 있는 장점이 있긴하지만

스프링부트가 나오면서 잘 사용하지 않는다. 

### Java코드 기반

```java
@Bean
public MemberService memberService(){
    return new MemberServiceImpl(MemberRepository());
}

@Bean
public OrderService orderService(){
    return new OrderServiceImpl(MemberRepository(), discountPolicy());
}
@Bean
public MemoryMemberRepository MemberRepository()   {
    return new MemoryMemberRepository();
}

@Bean
public DiscountPolicy discountPolicy(){
    return new RateDiscountPolicy();
}
```

### XML기반

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://
www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="memberService" class="hello.core.member.MemberServiceImpl">
        <constructor-arg name="memberRepository" ref="memberRepository" />
    </bean>

    <bean id="memberRepository"
          class="hello.core.member.MemoryMemberRepository" />

    <bean id="orderService" class="hello.core.order.OrderServiceImpl">
        <constructor-arg name="memberRepository" ref="memberRepository" />
        <constructor-arg name="discountPolicy" ref="discountPolicy" />
    </bean>

</beans>
```

거의 내용이 비슷하다는걸 알 수 있다.

### 스프링 빈 설정 메타 정보 - BeanDefinition

스프링은 어떻게 다양한 설정 형식을 지원할 수 있을까?

BeanDefinition라는 추상화 덕분이다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ff334bfa-3a75-423f-876f-f4a527119b3d/Untitled.png)

XML을 읽어서 BeanDefinition을 만든다.

자바 코드를 읽어서 BeanDefinition을 만든다.

`스프링 컨테이너는 자바코드인지 XML인지 몰라도돈다. 오직 BeanDefinition만 알면된다.`

설계자체를 추상화에 의존하도록 설계한것이다. 

BeanDefinition을 빈 설정 메타정보라 한다.

@Bean, <bean>당 각각 하나씩 메타정보가 생성된다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8540971f-6b57-40ed-813a-a8b3f6cd54d0/Untitled.png)

AnnotationConfigApplicationContext는 AnnotatedBeanDefinitionReader를 사용해서

AppConfig.class를 읽고 BeanDefinition을 생성한다.

GenericXmlApplicationContext는 XMLBeanDefinitionReader를 사용해서 appConfig.xml설정 정보를 읽고 BeanDefintion을 생성한다.

새로운 형식의 설정 정보가 추가되면, XxxBeanDefintionReader를 만들어서 BeanDefinition을 생성하면 된다.

### 싱글톤 컨테이너

스프링은 태생이 기업용 온라인 서비스 기술을 지원하기 위해 탄생했다.

대부분의 스프링 애플리케이션은 웹 애플리케이션이다.

웹 애플리케이션은 보통 여러 고객이 동시에 요청을 한다.

```java
public class SingletonTest {

    @Test
    @DisplayName("스프링 없는 순수한 DI 컨테이너")
    void pureContainer(){
        AppConfig appConfig = new AppConfig();

        MemberService memberService1 = appConfig.memberService();
        MemberService memberService2 = appConfig.memberService();

        System.out.println("memberService1 = " + memberService1);
        System.out.println("memberService2 = " + memberService2);

        Assertions.assertThat(memberService1).isNotSameAs(memberService2);
    }
}

//return
memberService1 = hello.core.member.MemberServiceImpl@79d8407f
memberService2 = hello.core.member.MemberServiceImpl@5fbe4146
```

대용량 트래픽이 몰리게 되면, 초당 50000개씩 객체를 만들어 내야할수도 있다.

메모리에 과부하가 걸리게된다. (사실 가비지컬렉터 성능이 좋아 이정도는 무리는 없다. 하지만 효율적으로 개발할 수 있다면 좋을것이다.)

해결 방안은 해당 객체가 딱 1개만 생성되고, 공유하도록 설계하면 된다. → 싱글톤 패턴

클래스의 인스턴스가 딱 1개만 생성되는것을 보장하는 디자인 패턴이다.

그래서 객체 인스턴스를 2개 이상 생성하지 못하도록 막아야한다.

어떻게 구체적으로 구현하는가? 여러방법들이 있다.

`private 생성자를 사용해서 외부에서 임의로 new 키워드를 사용하지 못하도록 막아야한다.`

```java
public class SingletonService {

    //1. static 영역에 객체를 딱 1개만 생성해둔다.
    private static final SingletonService instance = new SingletonService();

    //2.public으로 열어서 객체 인스턴스가 필요하면 이 static메서드를 통해서만 조회하도록 허용한다.
    public static SingletonService getInstance(){
        return instance;
    }
    //3.생성자를 private로 선언해서 외부에서 new 키워드를 사용한 객체 생성을 못하게 막는다.
    private SingletonService(){};

    public void logic(){
        System.out.println("Singleton Logic Called!");
    }
}
```

```java
@Test
@DisplayName("싱글톤 테스트")
void SingletonServiceTest(){
    SingletonService singletonService1 = SingletonService.getInstance();
    SingletonService singletonService2 = SingletonService.getInstance();

    System.out.println("singletonService1 = " + singletonService1);
    System.out.println("singletonService2 = " + singletonService2);
}

//return
singletonService1 = Singleton.SingletonService@17f7cd29
singletonService2 = Singleton.SingletonService@17f7cd29
```

스프링 컨테이너는 처음부터 싱글톤으로 관리해준다 

### 싱글톤 패턴의 문제점

싱글톤 패턴을 구현하는 코드 자체가 많이 들어간다.

의존관계상 클라이언트가 구체 클래스에 의존한다. → DIP위반

클라이언트가 구체 클래스에 의존해서 OCP원칙을 위반할 가능성이 높다.

테스트하기 어렵다.

내부 속성을 변경하거나 초기화하기 어렵다

private 생성자로 자식 클래스를 만들기 어렵다.

결론적으로 유연성이 떨어진다.

안티패턴으로 불리기도 한다.

`그러나, 스프링에서는 싱글톤 패턴에서 발생할 수 있는 모든 단점을 해결한다.`

### 싱글톤 컨테이너

스프링 컨테이너는 싱글톤 패턴을 적용하지 않아도 객체 인스턴스를 싱글톤으로 관리한다.

스프링 컨테이너는 싱글톤 컨테이너 역할을 한다. 이렇게 싱글톤 객체를 생성하고 관리하는 기능을 `“싱글톤 레지스트리”`라 한다.

```java
@Test
@DisplayName("스프링 컨테이너와 싱글톤")
void springContainer(){
    ApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);
    MemberService memberService1 = ac.getBean("memberService",MemberService.class);
    MemberService memberService2 = ac.getBean("memberService",MemberService.class);

    System.out.println("memberService1 = " + memberService1);
    System.out.println("memberService2 = " + memberService2);

    assertThat(memberService1).isSameAs(memberService2);
}
```

=

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d20e19f0-b0f5-4978-bb28-e29cf975df57/Untitled.png)

스프링 컨테이너 덕분에 고객의 요청이 올 때 마다 객체를 생성하는것이아니라, 이미 만들어진 객체를 공유해서 효율적으로 재사용할 수 있다.

기본방식은 싱글톤이다. 하지만, 요청할 때 마다 새로운 객체를 생성해서 반환하는 기능도 제공한다. (빈 스코프)

### 싱글톤 방식의 주의점

싱글톤 방식은 여러 클라이언트가 하나의 같은 객체 인스턴스를 고융하기 때문에 싱글톤 객체는 상태를 유지(stateful)하게 설계하면 안된다.

`무상태(stateless)로 설계해야 한다.`

1. 특정 클라이언트에 의존적인 필드가 있으면 안된다.
2. 특정 클라이언트가 값을 변경할 수 있는 필드가 있으면 안된다.
3. 가급적 읽기만 가능해야한다.
4. 필드 대신에 자바에서 공유되지 않는, 지역변수, 파라미터, ThreadLocal등을 사용해야한다.

`스프링 빈의 필드에 공유값을 설정하면 정말 큰 장애가 발생할 수 있다. (실무 경험담)`

  

```java
package Singleton;

public class StatefulService {

    private int price;

    public void order(String name, int price){
        System.out.println("name = " + name + " price " + price);
        this.price = price;
    }

    public int getPrice(){
        return price;
    }
}
```

```java
class StatefulServiceTest {

@Test
void statefulServiceSingleton(){
    ApplicationContext ac = new AnnotationConfigApplicationContext(TestConfig.class);
    StatefulService statefulService1 = ac.getBean(StatefulService.class);
    StatefulService statefulService2 = ac.getBean(StatefulService.class);

    //Thread1: 10000원 주문
    statefulService1.order("userA",10000);
    //Thread2: 20000원 주문
    statefulService2.order("userB",20000);

    //Thread1 주문 금액조회
    int price = statefulService1.getPrice();
    System.out.println("price = " + price);
    //기대값과 다르게 20000원이 나옴.
}

static class TestConfig{
    @Bean
    public StatefulService statefulService(){
        return new StatefulService();
    }
}

}
```

실무에서 이런 경우를 종종보는데, 이로 인해 정말 해결하기 어려운 큰 문제들이 터진다. (몇년에 한번씩은 꼭 만난다고 하신다.)

공유필드는 꼭 조심해야하고, 스프링 빈은 항상 무상태(Stateless)로 설계하자. 

### Configuration과 싱글톤

```java
@Configuration
public class AppConfig {

@Bean
public MemberService memberService() {
    return new MemberServiceImpl(memberRepository());
}

@Bean
public OrderService orderService() {
    return new OrderServiceImpl(
            memberRepository(),discountPolicy());
}

@Bean
public MemberRepository memberRepository() {
    return new MemoryMemberRepository();
}
}
```

코드 호출하는 순서를 보면

@Bean memberService → new MemoryMemberRepository()

@Bean orderService → new MemoryMemberRepository()

각각을 호출하면 같은것이 2번 생성된다. 그러면 싱글톤이 깨지는것아닐까?

직접 테스트 해보자.

```java
public class ConfigurationSingletonTest {

@Test
void configurationTest(){
    ApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

    MemberServiceImpl memberService = ac.getBean("memberService", MemberServiceImpl.class);
    OrderServiceImpl orderService = ac.getBean("orderService", OrderServiceImpl.class);
    MemberRepository memberRepository = ac.getBean("MemberRepository", MemberRepository.class);

    MemberRepository memberRepository1 = memberService.getMemberRepository();
    MemberRepository memberRepository2 = orderService.getMemberRepository();

    System.out.println("memberService -> memberRepository = " + memberRepository1);
    System.out.println("orderService -> memberRepository = " + memberRepository2);
    System.out.println("memberRepository = " + memberRepository);

    Assertions.assertThat(memberService.getMemberRepository()).isSameAs(memberRepository);
    Assertions.assertThat(orderService.getMemberRepository()).isSameAs(memberRepository);
}
}
```

직접 모두 테스트 해보았지만, 싱글톤을 보장한다.

메서드를 타고들어가며 5번 호출해야 정상인데, 딱 3번만 호출되었다.

자바의 문법을 따른다면, 5번 호출되어야 정상이다.

어디서 부터 조작된건지 확인해보자.

```
@Test
void configurationDeep(){
    ApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);
    AppConfig bean = ac.getBean(AppConfig.class);

    System.out.println("bean = " + bean.getClass());
}
```

순수 클래스라면, class hello.core.AppConfig가 출력되어야한다.

하지만, xxxCGLIB가 붙으면서 상당히 복잡해진다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d1dd334c-c73b-4532-898f-1b1ac0c88099/Untitled.png)

내가 만든 클래스가 아니라 스프링이 CGLIB라는 바이트 조작 라이브러리를 사용해서 AppConfig클래스를 상속받은 임의의 다른 클래스를 만들고 그 다른 클래스를 스프링 빈으로 등록한 것이다.

만약, memoryMemberRepository가 이미 있으면, 스프링 컨테이너에서 찾아서 반환,

컨테이너에서 없으면, 기존 로직을 호출해서 MemoryMemberRepository를 생성하고 스프링 컨테이너에 등록하기.

`AppConfig에 @Configuration이 없으면 작동하지 않는다.`

@Bean만 사용해도 스프링 빈으로 등록되지만, 싱글톤을 보장하지 않는다. 

### @ComponentScan

직접 등록해야할 스프링빈이 수십, 수백개가 되면 일일이 등록하기 힘들다.

그래서 스프링은 설정정보가 없어도 자동으로 스프링 빈을 등록하는 컴포넌트 스캔이라는 기능을 제공한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ed69c015-78b4-4e73-ba47-de0b3b37fa58/Untitled.png)

@Component가 붙은 클래스들을 모두 다 검색해서, 스프링 컨테이너에 자동으로 등록한다.

스프링 빈의 이름은 클래스명을 사용하지만, 맨 앞글자만 소문자를 사용한다.

빈으로 등록하는 방법에는 2가지가 있다.

첫번째, @Bean을 붙여주기

두번째 지금 배운, @Component 붙여서 Bean으로 만들어주는 방식

### @Autowired

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d6fe983a-c1ac-486a-9c9f-8a2f9859f5cc/Untitled.png)

생성자에 AutoWired를 붙이면, 스프링 컨테이너에서, 파라미터 타입이 같은 빈을 찾아서 주입해준다. 같은 타입이있으면 충돌이 나는데, 뒤에서 설명하겠다.

생성자에 파라미터가 많아도 다 찾아서 자동으로 주입해준다.

### 탐색 위치와 기본 스캔 대상

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/13878f83-86ba-480c-a474-96001cce2187/Untitled.png)

basePackages : 탐색할 패키지의 시작 위치를 지정한다. 이 패키지를 포함해서 하위 패키지를 모두 탐색한다.

basePackageClasses : 지정한 클래스의 패키지를 탐색 시작 위로 지정한다.

만약 지정하지 않으면 @CompnentScan이 붙은 설정 정보 클래스의 패키지가 시작 위치가 된다.

→ 권장하는 방법

설정 정보 클래스의 위치를 프로젝트 최상단에 둔다. (스프링부트가 기본으로 제공)

### 컴포넌트 스캔 기본대상

@Component : 컴포넌트 스캔에서 사용

@Controller: 스프링 MVC컨트롤러에서 사용

@Service : 스프링 비즈니스 로직에서 사용

@Repository : 스프링 데이터 접근 계층에서 사용

@Configuration : 스프링 설정 정보에서 사용

전부 스프링 빈으로 등록한다, 원리는 이 애너테이션들이 모두 @Component를 포함하고 있기 때문이다.

하지만 기억해 두어야한다.

애너테이션은 상속관계가 없다. 그래서 애너테이션이 특정 애너테이션을 들고 있는것을 인식할ㄹ 수 있는것은 자바언어가 지원하는게 아니라, 스프링이 지원하는 기능이다.

컴포넌트 스캔의 용도 뿐만아니라 부가 기능을 수행한다.

@Controller : 스프링 MVC 컨트롤러로 인식

@Repository : 스프링 데이터 접근 계층으로 인식하고, 데이터 계층의 예외를 스프링 예외로 변환한다.

@Configuration : 스프링 빈이 싱글톤을 유지하도록 추가처리한다.

@Service : 특별한 처리는 하지 않는다. 하지만, 핵심 비즈니스 로직이 여기 있다고 비즈니스 계층을 인식하는데 도움이된다.

useDefaultFilters 옵션은 기본적으로 켜져 있는데, 이 옵션을 끄면 기본 스캔 대상들이 제외된다.

### 필터

includeFilters : 컴포넌트 스캔 대상을 추가로 지정한다.

excludeFilters : 컴포넌트 스캔에서 제외할 대상을 지정한다.

### 중복등록과 충돌

컴포넌트 스캔에서 같은 빈 이름을 등록하면 어떻게 될까?

1. 자동 빈 등록 vs 자동 빈 등록

컴포넌트 스캔에 의해 자동으로 스프링 빈이 등록되는데, 이름이 같은 경우 스프링은 ConflictingBeanDefinitionException 오류를 발생시킨다.

1. 수동 빈 등록 vs 자동 빈 등록

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/442a1400-f58d-4da6-9293-56abb569c05b/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b0565a56-6e12-4669-82db-fb33645e69fc/Untitled.png)

이 경우 수동 빈 등록이 우선권을 가진다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/649afd41-91f8-444a-82cf-9feeabf8cd60/Untitled.png)

로그를 보니, Overriding 했다고 나온다.

하지만, 개발자가 의도해서 이런 결과가 만들어지기 보다는 여러 설정들이 꼬여서 이런결과가 나온다.

정말 잡기 어려운 버그가 만들어지는것이다.

그래서 최근 스프링 부트에서는 수동 빈 등록과 자동 빈 등록이 충돌나면 오류가 발생하도록 기본값을 바꾸었다.

그래서 테스트가 아닌 메인 클래스를 실행하면

```html
The bean 'memoryMemberRepository', defined in class path resource [hello/core/AutoAppConfig.class], could not be registered. A bean with that name has already been defined in file [C:\Users\Shaa\Desktop\core\out\production\classes\hello\core\member\MemoryMemberRepository.class] and overriding is disabled.
```

위와 같은 오류가 발생한다.

그럼에도 불구하고, 오버라이딩으로 진행하고 싶다면.

application.properties에 설정을 바꾸어주면 된다.

```html
spring.main.allow-bean-definition-overriding=true
```

## 의존관계 자동 주입

### 다양한 의존관계 주입방법

@Component

컴포넌트로 빈으로 등록한다.

- 생성자 주입 (항상 일어남)

![제목 없음.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/655fedd8-c6d7-400a-b034-259f52ae1866/%EC%A0%9C%EB%AA%A9_%EC%97%86%EC%9D%8C.png)

OrderServiceImpl은 객체가 만들어질때, 생성자 호출이 자동으로 되므로 빈을 등록하며 함께 항상 일어난다.

### `언제 쓰는가?`

불변,필수 의존관계에 사용

생성자가 딱 하나만 있다면 @Autowired를 생략해도된다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2a61aa1e-0ae5-4a4d-b2f6-6e4c6d2b0af0/Untitled.png)

이렇게 생성자가 2개가 되면 필요한곳에 @Autowired를 붙여줘야한다.

OrderServiceImpl 객체를 생성할때, 어떤 생성자를 호출하면서 @Autowired를 호출할지 알 수 없기때문이다.

- 수정자 주입()

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/91d49790-2ca0-4267-9e5e-1b65c07d2ecc/Untitled.png)

생성자처럼 객체가 생성될때 항상 만들어지는게 아니라서 선택적으로 필요한것만 넣을수도 있다.

@Autowired는 주입할 대상이 없으면 오류가 난다. , 주입할 대상 없이도 동작하게하려면

### `언제 쓰는가?`

선택, 변경 가능성이 있는 의존관계에 사용

get메서드 set메서드를 만들어 활용하는 규칙을 자바빈 프로퍼티 규약이라고 한다.

- 필드 주입 (잘 사용하지 않음)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f6d157df-e75a-4cb5-b528-8af2867199a4/Untitled.png)

코드가 간결해서 많은 개발자들을 유혹하지만 외부에서 변경이 불가능해서 테스트하기 힘들다는 치명적인 단점이 있다.

DI 프레임워크가 없으면 아무것도 할 수 없다.

### `언제 쓰는가?`

애플리케이션의 실제 코드와 관계없는 테스트코드

스프링 설정을 목적으로 하는 @Configuration 같은곳에서만 특별한 용도로 사용한다.

- 일반 메서드 주입

아무 메서드에나 Bean을 주입해서 사용할수 있기는하다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/df7610d9-59df-4a13-ba39-b13075b78bb0/Untitled.png)

## 옵션 처리

주입할 스프링 빈이 없어도 동작해야 할 때가 있다.

그런데 @Autowired만 사용하면 “required”옵션의 기본값이 “true”로 되어있어서 자동 주입 대상이 없으면 오류가 발생한다.

- @Autowired(required=false) : 자동 주입할 대상이 없으면 수정자 메서드 자체가 호출이 안된다.
- org.springframework.lang.@Nullable : 자동 주입할 대상이 없으면 null이 입력된다.
- Optional<> : 자동 주입할 대상이 없으면 “Optional.empty”가 입력된다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/769701db-3d18-4d7c-af4b-329e79f92e2f/Untitled.png)

보다시피 Member는 빈으로 등록되어있지 않다.

첫번째 메서드를 살펴보자. Autowired 를하면 원래 오류가 나와야하지만,

required를 false로 설정함으로써 수정자 메서드 자체를 호출하지 않는다.

두번째 메서드는 Autowired시, 원래 오류가 나와야하지만, 매개변수 타입에 @Nullable을 붙여주어 null이 나오게 만들었다.

세번째 메서드의 Autowired 또한 반환타입을 Optional로 받아 empty로 나오는걸 확인할 수 있다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7e2ae703-486b-437f-bf86-835a89cf98c9/Untitled.png)

실제로 작동하는걸 알아볼 수 있다.

`중요!`

@Nullable, Optional은 스프링 전반에 걸쳐서 지원된다.

예를 들어서 생성자 자동주입에서 특정 필드에만 사용해도 된다.

### 생성자 주입을 선택해라!

과거에는 수정자 주입과 필드주입을 많이 사용했지만, 최근에는 스프링을 포함한 DI프레임워크 대부분이 생성자 주입을 권장한다.

대부분의 의존관계 주입은 한번 이렁나면 애플리케이션 종료시점까지의 의존관계를 변경할 일이 없다.

오히려 대부분의 의존관게는 애플리케이션 종료전까지 변하면 안된다.

수정자 주입을 사용하면, setXxx메서드를 public으로 열어두어야한다.

누군가 실수로 변경할 수 도 있고, 변경하면 안되는 메서드를 열어두는 것은 좋은 설계방법이 아니다.

생성자 주입은 객체를 생성할 때 딱 1번만 호출되므로 이후에 호출되는 일이 없다. 따라서 불변하게 설계할 수 있다.

한마디로 불변을 위해서 생성자 주입을 선택하는게 좋다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/884a8f3e-3fa5-4a35-a480-a17f3415400b/Untitled.png)

만약 이렇게 수정자 주입으로 되어있을때는 이후 스프링 프레임워크가 아닌 순수 자바코드로 실행할때

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3a848525-7845-471d-9262-2c3a1ca4d142/Untitled.png)

NullPointException이 발생한다.

복잡한 상황에서는 코드에 뭐가 빠졌는지도 알아보기가 어렵다.

### final 키워드

fianl키워드를 생성자 주입에 사용해서 혹시라도 값이 설정되지 않는 오류를 컴파일 시점에 막아준다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cead4feb-34ce-4107-81bf-8fc76d0cca23/Untitled.png)

이처럼 생성자에 누락된것이 있는지 바로 확인할 수 있으므로 오류를 사전에 방지할 수 있다.

정리하자면, 첫번째로 프레임워크에 의존하지 않고, 순수한 자바 언어의 특징을 잘살리기 위함이다.

두번째, 기본으로 생성자 주입을 사용하고, 필수 값이 아닌 경우에는 수정자 주입 방식을 옵션으로 부여하면 된다.

즉, 생성자 주입과 수정자 주입을 동시에 활용하는것이다.

항상 생성자 주입을 선택하자. 그리고 가끔씩 옵션이 필요하면 수정자 주입을 선택하자.

### 롬복과 최신 트랜드

Getter, Setter, ToString, RequiredArgsConstructor

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cb266d15-e425-40e1-b299-e4a6daf88ce4/Untitled.png)

@RequiredArgsConstructor는 final을 붙였을때 오류가 안나게 필요한 생성자를 만들어준다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ce1bb678-b0f8-433a-98c4-d667d878e703/Untitled.png)

최근에는 생성자를 딱 1개 두고, @Autowired를 생략하는 방법을 주로 사용한다. 여기에 Lombok 라이브러리의 @RequiredArgsConstructor와 함께 사용하면 기능은 다 제공하면서 코드는 깔끔하게 사용할 수 있다.

### 변수타입을 조회할때 빈이 2개 이상일때의 문제

@Autowired는 타입(Type)으로 조회한다.

```java
@Autowired
private DiscountPolicy discountPolicy
```

타입으로 조회하기 때문에 ac.getBean(DiscountPolicy.class)와 유사하게 동작한다. (실제로는 더 많은 기능을 제공)

DiscountPolicy의 하위타입인 FixDiscountPolicy, RateDiscountPolicy 둘다 스프링 빈으로 선언해보자.

```java
@Component
public class FixDiscountPolicy implements DiscountPolicy{}

@Component
public class RateDiscountPolicy implements DiscountPolicy{}
```

이후 의존관계 자동 주입을 실행해보자.

```java
@Autowired
private DiscountPolicy discountPolicy
```

그러면 아래와 같은 오류가 발생한다.

```java
NoUniqueBeanDefinitionException: No qualifying bean of type 
'hello.core.discount.DiscountPolicy' available: expected single matching bean 
but found 2: fixDiscountPolicy,rateDiscountPolicy
```

하위 타입으로 지정할 수 도 있지만, 하위 타입으로 지정하는것은 DIP에 위배하고 유연성이 떨어진다. 그리고 이름만 다르고, 완전히 똑같은 타입의 스프링 빈이 2개 있을 때 해결이 안된다.

이제 해결하는 여러 방법들을 알아보도록 하자.

### @Autowired 필드명, @Qualifier, @Primary

@Autowired 타입 매칭을 시도하고, 이때 여러 빈이 있으면 필드 이름,파라미터 이름으로 빈 이름을 추가 매칭한다.

예를들어, DiscountPolicy가 처음에 rateDiscuntPolicy밖에 없다면

Autowired가 하나의 타입 매칭을 시도하고 하나밖에없으니 주입해준다.

하지만 rateDiscountPolicy와 fixDiscountPolicy 2개가 있다면,

DiscountPolicy가 타입매칭을 시도하고 2개가 있다고 나오니 추가적으로 필드이름, 파라미터이름으로 빈을 추가 매칭한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/54db53f7-593b-48e3-99b3-73a8e2cb8b0a/Untitled.png)

이 경우는 필드이름 rateDiscountPolicy가 같으니까, Discount

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/aee81da5-9f0f-4932-a811-73e31bd3f815/Untitled.png)

이 경우는 DisocuntPolicy와 파라미터 이름이 같으니까 rateDiscountPolicy를 채택한다.

### @Quilifier 사용

@Quilifier는 추가 구분자를 붙여주는 방법이다.

주입시 추가적인 방법을 제공하는것이지 빈 이름을 변경하는것은 아니다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b4e10749-a144-47a3-b163-aa09e1044037/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1025690b-bacf-46ae-8df0-aa445b690322/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b33eb77d-3b5f-44d5-afce-a5a212e329f5/Untitled.png)

각 변수 타입에 애너테이션을 달아주면 된다.

이때 @Qualifier(”mainDiscountPolicy”)가 없어서 못찾가 된다면, mainDiscountPolicy라는 이름의 스프링 빈을 추가로 찾게된다ㅏ.

하지만 @Qualifier는 @Qualifier를 찾는 용도로만 사용하는게 명확하고 좋다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dacba396-a801-468d-b6e1-c3dbb918bd2c/Untitled.png)

이렇게 직접 빈을 등록할때도 @Qualifier를 사용할 수 있다.

즉, @Qualifier끼리 매칭해보고 없으면 Bean이름으로 매칭한다. 또 없다면 NoSuchBeanDefinitionException예외가 발생한다.

### @Primary

@Primary는 우선순위를 정하는 방법이다.

@Autowired시에 여러 빈이 매칭되면 “@Primary”가 우선권을 가진다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b4d658da-65bf-4d0b-b2f4-03e073f571f7/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e83919da-6227-492d-b6f2-eb9a329da4e9/Untitled.png)

- 무엇을 쓰면 좋을까?

Quilifier는 주입받을 때 다음과 같이 모든 코드에 @Qualifier를 붙여주어야한다는 단점이 있다.

반면에 @Primary를 사용하면 @Qualifier를 붙일 필요가 없다.

스프링은 자동보다 수동이, 넓은 범위의 선택권 보다는 좁은 범위의 선택권이 우선 순위가 높다. 따라서 여기서도 Quilifier가 우선권이 높다.

### 애노테이션 직접 만들기

@Qualifier(”mainDiscountPolicy”) 이렇게 문자를 적으면 컴파일시 타입 체크가 안된다.

예를들어, Qualifier(”mainnDiscountPolicy”)이라고 오타가 들어가도, 동작해버린다. 이러면 오류를 찾아내기가 엄청 어려워 지므로 Annotation을 직접만드는게 좋다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cd6b9676-338b-4fcc-8a98-f89a5fbc0139/Untitled.png)

@Qualifier에 있는 애너테이션 내용을 복사해서 넣고 @Qualifier(”mainDiscountPolicy”)도 추가시켜준다.

이렇게 되면

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fedec0bf-8aae-4dd6-88d1-8ba3c351cf0c/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/12058247-a14d-4076-98e7-4e0e5e5bd6d3/Untitled.png)

Annotation에는 상속이라는 개념이 없다. 이렇게 여러

Annotation을 모아서 사용하는 기능은 스프링이 지원해주는 기능이다.

@Qualifier 뿐만아니라 다른 Annotation도 함께 조합해서 사용할 수 있다. 단적으로 @Autowired도 재정의 할 수 있다. 물론 스프링이 제고오하는 기능을 ㄹ뚜렷한 목적없이 무분별하게 재정의하는것은 유지보수에 더 혼란만 가중할 수 있다.

### 조회한 빈이 모두 필요할때, List, Map

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a8cb8de8-60e6-4e6f-9071-ee501fb73af2/Untitled.png)

DiuscountService는 Map으로 모든 DiscountPolicy를 주입받는다. 이때 fixDiscountPolicy, rateDiscountPolicy가 주입된다.

discount() 메서드는 discountCode로 fixDiscountPolicy가 넘어오면 map에서 fixDiscountPolicy 스프링빈을 찾아서 실행한다.

Q1. fixDiscountPolicy와 rateDiscountPolicy의 값을 넣어주지 않았는데, discount 함수에서 값을 찾을 수 있는 이유가 무엇일까?

의존관계 자동 주입시 주입 대상이 Map이면, Map에 지정된 특정 타입에 해당하는 빈을 다 조회하여 넣어주게 된다.

### 자동 수동의 올바른 실무 운영 기준

**편리한 자동기능을 기본으로 사용하자!**

그러면 어떤 경우에 컴포넌트 스캔과 자동주입을 사용하고, 어떤 경우에 설정 정보를 통해서 수동으로 빈을 등록하고, 의존관계도 수동으로주입해야할까?

스프링이 나오고 시간이 갈 수록 점점 자동을 선호하는 추세다.

스프링은 ‘@Component’ 뿐만 아니라 @Controller, @Service, @Repository 처럼 계층에 맞추어 일ㄹ반적인 애플리케이션 로직을 자동으로 스캔할 수 있도록 지원한다.

거기에 더해서 최근 스프링 부트는 컴포넌트 스캔을 기본적으로 사용하고, 스프링 부트의 다양한 스프링 빈들도 조건이 맞으면 자동으로 등록하도록 설계했다.

설정 정보를 기반으로 애플리케이션을 구성하는 부분과 실제 동작하는 부분을 명확하게 나누는것이 이상적이지만, 개발자 입장에서 스프링 빈을 하나 등록할 때, @Component만 넣어주면 끝나는 일을 @Configuration 설정 정보에 가서 @Bean을 적고, 객체를 생성하고, 주입할 대상을 일일이 적어주는 과정은 상당히 번거롭다.

또 관리할 빈이 많아서 설정 정보가 커지면 설정 정보를 관리하는 것 자체가 부담이 된다.

그리고 결정적으로 자동 빈 등록을 사용해도 OCP, DIP를 지킬 수 있다.

그러면 수동 빈 등록은 언제 사용하면 좋을까?

애플리케이션은 크게 업무로직과 기술지원 로직으로 나눌 수 있다.

업무 로직 빈 : 웹을 지원하는 컨트롤러, 핵심 비즈니스 로직이 있는 서비스, 데이터 계층의 로직을 처리하는 리포지토리등이 모두 업무 로직이다ㅏ. 보통 비즈니스 요구사항을 개발할 때 추가되거나 변경된다.

기술 지원 빈 : 기술적인 문제나 공통 관심사(AOP)를처리할 때 주로 사용된다. 데이터베이스 연결이나, 공통 로그 처리 처럼 업무로직을 지원하기 위한 하부 기술이나 공통 기술들이다.

업무로직은 숫자도 매우 많고, 한번 개발해야 하면 컨트롤러, 서비스, 리포지토리 처럼 어느정도유사한 패턴이 있다. 이런 경우 자동 기능을 적극 사용하는것이 좋다. **보통 문제가 발생해도 어떤곳에서 문제가 발생했는지 명확하게 파악하기 쉽다.**

기술 지원 로직은 업무 로직과 비교해서 그 수가 매우적고, 보통 애플리케이션 전반에 걸쳐서 광범위하게 영향을 미친다. 그리고 업무로ㅗ직은 문제가 발생했을 때 어디가 문제인지 명화가하게 잘 들어나지만, 기술 지원 로직은 적용이 잘 되고 있는지 아닌지 조차 파악하기 어려운 경우가 많다. 그래서 이런 기술 지원 로직들은 가급적 수동 빈 등록을 사용해서 명확하게 들어내는 것이 좋다.

**애플리케이션에 광범위하게 영향을 미치는 기술 지원 객체는 수동 빈으로 등록해서 설정 정보에 바로 나타나게 하는것이 유지보수 하기 좋다.**

수동 빈으로 등록하거나 또는 자동으로 하면 특정 패키지에 같이 묶어두는것이 좋다. 핵심은 보고 바로 이해가 되어야한다!

참고로 스프링과 스프링 부트가 자동으로 등록하는 수 많은 빈들은 예외다. 이런 부분들은 스프링 자체를 잘 이해하고 스프링의 의도대로 잘 사용하는게 중요하다.

스프링 부트의 경우 ‘DataSource 같은 데이터베이스 연결에 사용하는 기술 지원 로직까지 내부에서 자동으로 등록하는데, 이런 부분은 메뉴얼을 잘 참고ㅗ해서 스프링 부트가 의도ㅗ한 대로 편리하게 사용하면 된다. 반면에 스프링 부트가 아니라 내가 직접 기술 지원 객체를 스프링 빈으로 등록한다면 수동으로 등로고해서 명확하게 들어내는것이 좋다.

### 정리하자!

편리한 자동 기능을 기본으로 사용하자

직접 등록하는 기술 지원 객체는 수동 등록

다형성을 적극 활용하는 비즈니스 로직은 수동 등록을 고민해보자.

## 빈 생명주기 콜백

### 빈 생명주기 콜백 시작

데이터베이스 커넥션 풀이나, 네트워크 소켓처럼 애플리케이션 시작 시점에 필요한 연결을 미리 해두고, 애플리케이션 종료 시점에 연결을 모두 종료하는 작업을 진행하려면, 객체의 초기화와 종료 작업이 필요하다.

간단하게 외부 네트워크에 미리 연결하는 객체를 하나 생성한다고 가정해보ㅗ자. 실제로 네트워크에 연결하는 것은 아니고ㅗ, 단순히 문자만 출력하도록 했다. 이 NetworkClient는 애플리케이션 시작 시점에 connect() 를 호출해서 연결을 맺어두어야하고, 애플리케이션이 종료되면 disConnet()를 호출해서 연결을 끊어야한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/73104949-de1f-442a-8fd9-da23eb062f02/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1fce2abf-d8eb-4f63-8283-d49530ddcad0/Untitled.png)

```java
//결과값

생성자 호출, url = null
connect : null
call : null message = 초기화 연결 메시지
```

값이 제대로 나와야하는데 왜 안나오는것일까?

객체를 생성하는 단계에는 url이 없고, 객체를 생성한 다음 외부에서 수정자 주입을 통해서 setUrl()이 호출되어야 url이 존재하게 된다.

스프링 빈은 간단하게 다음과 같은 라이프 사이클을 가진다.

객체 생성 → 의존관계 주입

스프링 빈은 객체를 생성하고, 의존관계 주입이 다 끝난 다음에야 필요한 데이터를 사용할 수 있는 준비가 완료된다.

따라서 초기화 작업은 의존관계 주입이 모두 완료되고 난 다음에 호출해야 한다. 그런데 개발자가 의존관계 주입이 모두 완료된 시점을 어떻게 알 수 있을까?

스프링은 의존관계 중비이 완료되면 스프링 빈에게 콜백 메서드를 통해서 초기화 시점을 알려주는 다양한 기능을 제공한다.

또한 스프링은 스프링 컨테이너가 종료되기 직전에 소멸 콜백을 준다. 따라서 안전하게 종료작업을 진행할 수 있다.

스프링 빈의 이벤트 라이프사이클

스프링 컨테이너 생성 → 스프링 빈 생성 → 의존관계 주입 → 초기화 콜백 → 사용 → 소멸전 콜백 → 스프링 종료

초기화 콜백 : 빈이 생성되고, 빈의 의존관계 주입이 완료된 후 호출

소멸전 콜백 : 빈이 소멸되기 직전에 호출

스프링은 다양한 방식으로 생명주기 콜백을 지원한다.

참고 : 객체의 생성과 초기화를 분리하자.

생성자는 필수 정보(파라미터)를 받고, 메모리를 할당해서 객체를 생성하는 책임을 가진다.

반면에 초기화는 이렇게 생성된 값들을 활용해서 외부 커넥션을 연결하는 등 무거운 동작을 수행한다.

따라서 생성자 안에서 무거운 초기화 작업을 함께 하는것보다는 객체를 생성하는 부분과 초기화 하는 부분을 명확하게 나누는것이

유지보수 관점에서 좋다. 물론 초기화 작업이 내부 값들만 약간 변경하는 정도로 단순한 경우에는 생성자에서 한번에 다 처리하는게 더 나을 수 있다.

스프링은 크게 3가지 방법으로 빈 생명주기 콜백을 지원한다.

인터페이스(InitalizingBean, DisposableBean)

설정 정보에 초기화 메서드, 종료 메서드 지정

@PostConstruct, @PreDestory 애노테이션 지원

### 인터페이스 InitalizingBean, DisposableBean
