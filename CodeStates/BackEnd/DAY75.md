# DAY75

### 프로젝트 리액터

리액터는 리액티브 스트림즈 표준사양을 구현한 구현체 중 하나이다.

### Reactor의 특징

- Non-Blocking

요청 쓰레드가 차단이 되지 않는다 정도로만 기억하고 넘어가자

- Publisher 타입으로 Mono[0|1]와 Flux[N]이라는 2가지 타입을 제공한다.

Mono[0|1]에서 0과 1의 의미는 0건 또는 1건의 데이터를 emit 할 수 있음을 의미한다.

Flux[N]에서 N의 의미는 여러 건의 데이터를 emit할 수 있음을 의미한다.

MSA기반 애플리케이션들은 요청 쓰레드가 차단되는 Blocking 통신을 사용하기에는 무리가 있다.

Non-Blocking 통신을 완벽하게 지원하는 Reactor는 MSA구조에 적합한 라이브러리라고 볼 수 있다.

![Untitled](https://user-images.githubusercontent.com/70310271/184192276-5c2af161-32cb-465b-9616-2fa88fb05c9b.png)

Publisher가 끊임없이 들어오는 데이터를 emit하는것과 달리 Subscriber의 처리속도가 느린경우를 대처하기 위한 개념

Backpressure라는 Subscriber의 처리속도가 Publisher의 emit 속도를 따라가지 못할 때 적절하게 제어하는 전략을 의미한다.

```java
import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;

public class HelloReactorExample {
    public static void main(String[] args) throws InterruptedException {
Flux    // (1)
.just("Hello", "Reactor")               // (2)
.map(message -> message.toUpperCase())  // (3)
.publishOn(Schedulers.parallel())       // (4)
.subscribe(System.out::println,         // (5)
error -> System.out.println(error.getMessage()),  // (6)
() -> System.out.println("# onComplete"));        // (7)

        Thread.sleep(100L);
    }
}
```

Flux는 Reactor Sequence의 시작점이다.

Reactor Sequence를 여러건 처리하겠다는 의미이다.

just() Operator는 원본 데이터 소스로부터 데이터를 emit하는 Publisher의 역할을 한다.

map() Operator는 Publisher로 부터 전달받은 데이터를 가공하는 Operator이다.

just() Operator에서 emit된 영문 문자열을 대문자로 변환하고 있다.

publishOn() Operator는 ReactorSequence에서 쓰레드 관리자 역할을 하는 Scheduler를 지정하는 Operator이다.

subscribe()는 파라미터로 총 세개의 람다 표현식을 가지는데, 첫번째 파라미터는 Publisher가 emit한 데이터를 전달받아 처리하는 역할을 한다.

두번째 파라미터는 Reactor Sequence상에서 에러가 발생할 경우, 해당 에러를 전달 받아서 처리하는 역할을 한다.

세번째 파라미터는 Reactor Sequence가 종료된 후 어떤 후처리를 하는 역할을 한다.

### 마블 다이어그램

구슬 모양의 동그라미는 하나의 데이터를 의미하며, 다이어그램 상에서 시간의 흐름에 따라 변화하는 데이터의 흐름을 표현한다.

![Untitled 1](https://user-images.githubusercontent.com/70310271/184192298-5cc77c14-3f4a-46e9-b418-870915065055.png)

Mono의 마블 다이어그램

![Untitled 2](https://user-images.githubusercontent.com/70310271/184192315-fac2e18b-5ef0-4c94-a675-d8422029dc06.png)

Flux의 마블 다이어그램

### Scheduler

Reactor Sequence 상에서 처리되는 동작들을 하나 이상의 쓰레드에서 동작하도록 별도의 쓰레드를 제공해준다.

Non-Blocking 통신을 위한 비동기 프로그래밍을 위해 탄생했기 때문에 여러 쓰레드를 손쉽게 관리해주는 Scheduler는 Reactor에서 중요한 역할을 한다.
