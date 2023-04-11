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
