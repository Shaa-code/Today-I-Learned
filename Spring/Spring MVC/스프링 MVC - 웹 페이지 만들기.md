### @Data에 대해서

핵심 도메인에서 @Data은 내가 생각지도 못하게 동작할 위험이 있기 때문에, 사용하지 않는게 좋다.

DTO정도로만 사용할 때는 Data를 사용해도 문제가 없다.

### 실무에서 사용하는 저장법

```java
private static final Map<Long,Item> store = new ConcurrentHashMap

private static long sequence = 0L;
```

HashMap보다는 ConcurrentHashMap

long 보다는 AtomicLong

모두 동시성을 제어할 수 있기 때문이다.

```java
public List<Item> findAll(){
    return new ArrayList<>(store.values());
}
```

그냥 store.values()를 반환해도 된다. 하지만 ArrayList로 한번 더 감싸는 이유는 혹시라도 ArrayList에 값을 넣어도 store에 변함이 없게 하기 위함이다.

//무슨 소린지 잘 모르겠다.

### DTO를 왜 굳이 만들어서 사용하는가?

Main Domain 객체를 그냥 계속해서 사용하면,

개발자 입장에서 set을 할 수도 있고, Id도 사용하지 않았기 때문에 id도 사용할 수 있는데 왜 안쓰지? 이런식으로 생각할 수 있다.

즉, 메인 도메인만을 활용하는 것은 명확한 의사를 전달하기가 어렵다.

또한 실수로 set을 해버리면 큰일나기 때문이다.

### 웹 퍼블리셔의 역할

HTML 마크업 작업을 해주시는 분이 웹 퍼블리셔이다.

### HTML을 편리하게 개발하기 위해서 부트스트랩을 사용한다.

부트 스트랩은 HTML,CSS,JS 프레임워크이다.

하나의 CSS로 휴대폰, 테블릿, 데스크탑까지 다양한 기기에서 작동한다.

다양한 기능을 제공해서, 사용자가 쉽게 웹사이트를 제작, 유지, 보수 할 수 있도록 도와준다.

### 실무에서 백엔드 개발자가 Admin페이지를 만들때 사용하면 꿀이다.

### 주의점

이렇게 정적 리소스가 공개되는 /resources/static 폴더에 HTML을 넣어두면, 실제 서비스에서도 공개된다.

서비스를 운영한다면 지금처럼 공개할 필요없는 HTML을 두는 것은 주의하자.
