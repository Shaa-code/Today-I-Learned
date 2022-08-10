## 리액티브 프로그래밍

리액티브 프로그래밍이 무엇인지 이해할 수 있다.

리액티브 프로그래밍의 특징을 이해할 수 있다.

리액티브 스트림즈가 무엇인지 이해할 수 있다.

명령형 프로그래밍과 선언형 프로그래밍이 무엇인지 이해할 수 있다.

리액티브 프로그래밍을 학습하기 위한 사전 지식이 무엇인지 이해할 수 있다.

Spring MVC 기반의 애플리케이션과 Spring Reactive 기반의 애플리케이션의 차이점을 이해할 수 있다.

### 리액티브 시스템(Reactive System)이란?

리액티브 시스템 관점에서의 반응은 쓰레드의 Non-Blocking과 관련이 있다.

리액티브 시스템은 클라이언트의 요청에 대한 응답 대기 시간을 최소화 할 수 있도록 요청 쓰레드가 차단되지 않게 함으로써(Non-Blocking) 클라이언트에게 즉각적으로 반응하도록 구성된 시스템이라고 볼 수 있다.

### 리액티브 시스템의 설계 원칙

![Untitled](https://user-images.githubusercontent.com/70310271/183970380-7c5537db-bd15-46db-b167-3deee86e51e9.png)

- MEANS

리액티브 시스템에서 사용하는 커뮤니케이션 수단

- Message Driven
- 리액티브 시스템에서는 메시지 기반 통신을 통해 여러 시스템 간에 느슨한 결합을 유지한다.
- FORM

FORM은 메시지 기반 통신을 통해 리액티브 시스템이 어떤 특성을 가지는 구조로 형성되는지를 의미한다.

- Elastic
    - 시스템으로 들어오는 요청량이 적거나 많거나 상관없이 일정한 응답성을 유지하는것을 의미한다.
- Resillient
    - 시스템의 일부분에 장애가 발생하더라도 응답성을 유지하는것을 의미한다.
- VALUE

리액티브 시스템의 핵심가치가 무엇인지를 표현하는 영역이다.

- Responsive
    - 리액티브 시스템은 클라이언트의 요청에 즉각적으로 응답할 수 있어야함을 의미한다.
- Maintainable
    - 클라이언트의 요청에 대한 즉각적인 응답이 지속가능해야 함을 의미한다.
- Extensible
    - 클라이언트의 요청에 대한 처리량을 자동으로 확장하고 축소할 수 있어야함을 의미한다.

### 리액티브 프로그래밍이란?

### 리액티브 스트림즈

리액티브 스트림즈는 리액티브 프로그래밍을 위한 사양이다.

분명히 사양에 맞게 구현된 구현체가 존재한다.

- 리액티브 스트림즈의 구현체 종류

1. Project Reactor

리액티브 스트림즈를 구현한 대표적은 구현체로써 Spring과 궁합이 가장 잘 맞는 리액티브 스트림즈 구현체이다.

1. RxJava

.NET 기반의 리액티브 라이브러리를 넷플릭스에서 Java언어로 포팅한 JVM기반의 리액티브 확장 라이브러리이다.

1. Java Flow API

Flow API는 리액티브 스트림즈를 구현한 구현체가 아니라 리액티브 스트림즈 표준 사양을 Java 안에 포함시킨 구조이다.

```java
// 명령형 프로그래밍
class ImperativeProgrammingExample{
    public static void main(String[] args){
        List<Integer> numbers = List.of(1,3,6,7,8,11);
        int sum = 0;

        for(int number : numbers){
            if(number > 4 && (number % 2 == 0)){
                sum += number;
            }
        }
        System.out.println(sum);
    }
}
```

```java
// 선언형 프로그래밍
class DeclartiveProgramingExample {
    public static void main(String[] args) {
        List<Integer> numbers = List.of(1, 3, 6, 7, 8, 11);

        int sum = numbers.stream()
                .filter(number -> number > 4 && (number % 2 == 0))
                .mapToInt(number -> number)
                .sum();

        System.out.println(sum);
    }
}
```

Stream의 메서드 체인에는 이러이러한 작업을 해달라고 선언(요청)하는 람다 표현식만 넘겨주고, 최종 연산이 호출될 때 비로소 전달 받은 람다 표현식을 기반으로 동작을 수행한다.

성언형 프로그래밍 방식은 하나부터 열까지 개발자가 일일이 로직을 모두 작성하지 않는다.

정말 필요한 동작들을 람다 표현식으로 정의하고 구체적인 동작 수행은 Operation(연산) 메서드 체인에 위임한다.

```java
// 프로그래밍 기본 구조
public class HelloReactiveExample02 {
    public static void main(String[] args) {
        Mono.just("Hello, Reactive")
            .subscribe(message -> System.out.println(message));
    }
}
```

### 리액티브 프로그래밍에서 사용되는 용어 정의

```
import reactor.core.publisher.Flux;

import java.util.List;

public class ReactiveGlossaryExample {
    public static void main(String[] args) {
        Flux
            .fromIterable(List.of(1, 3, 6, 7, 8, 11))
            .filter(number -> number > 4 && (number % 2 == 0))
            .reduce((n1, n2) -> n1 + n2)
            .subscribe(System.out::println);

    }
}
```

- Publisher

리액티브 스트림즈 사야에서도 확인한 것 처럼 Publisher는 데이터를 내보내는 주체를 의미한다.

Flux가 Publiser 역할을한다.

- Emit

Publisher가 데이터를 내보내는것을 Emit 이라고 한다.

- Subscribe

Subscribe는 구독을 의미한다.

subscribe() 메서드를 호출하면 구독을 하는것이다.

- Signal

리액티브 프로그래밍 관련 문서를 보다보면 Signal이라는 용어를 많이 볼 수 있다.

Signal은 Publisher가 발생시키는 이벤트를 의미한다.

ex) subscribe()메서드가 호출되면 Publisher인 Flux는 숫자 데이터를 하나씩 emit한다.

이때 숫자데이터를 하나씩 emit하는 자체를 리액티브 프로그래밍에서는 이벤트가 발생하는것으로 간주하며, 이 이벤트 발생을 다른 컴포넌트에게 전달하는것을 Signal을 전송한다라고 표현한다.

- Operator

리액티브 프로그래밍에서 어떤 동작을 수행하는 메서드를 의미한다.

fromIterable(), filter(), reduce()등 메서드 하나하나를 Operator라고 한다.

- Sequence

Sequence는 Operator 체인으로 표현되는 데이터의 흐름을 의미한다.

Operator 체인으로 작성된 코드 자체를 하나의 Sequence라고 이해하면 된다.

- Upstream/ Downstream

Sequence 상의 특정 operator를 기준으로 위쪽의 Sequence 일부를 Upstream이라고 하며, 아래쪽 Sequence 일부를 Downstream이라고 표현한다.
