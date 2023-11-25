### 제네릭 메서드란?

하나의 메서드로 여러 타입의 인자와 리턴타입을 가질 수 있는 메소드

- 제네릭 타입의 종류

| 타입 | 설명 |
| --- | --- |
| <T> | Type |
| <E> | Element |
| <K> | Key |
| <V> | Value |
| <N> | Number |

<String> 안의 String을 Type Argument(타입인자)라고 정의한다.

<Integer>같이 타입을 명시하는 구문을 영어로 **type witness라고 정의**

### 제네릭 메서드를 사용하기 이전에, 왜 <T>를 붙여줘야 하지 생각을 해보았다.

```java
1. private static <T> List<T> add(List<T> list, String element);
2. private static List<T> add(List<T> list, String element);
```

1번 코드를 보면, 제네릭 타입을 선언해 주었기 때문에, List<T>에 사용되는 T가 타입을 추론하기 위한 ‘T’라는걸 명시해주는 역할을 한다.

그런데, 2번 코드를 보면, List<T>를 List<Message>처럼 T가 하나의 객체로 인식된다.

즉, <T>를 제거하면, 그건 클래스 제네릭이 되어버린다.

한마디로, <T>를 반환타입 앞에 명시해주지 않으면 이게 여러 타입을 받기 위한 제네릭 메서드인지, 하나의 메서드만 받기위한 클래스 제네릭인지 구분을 할 수 없게 된다.

### 왜 제네릭 메서드를 사용하지?

```java
private static List<String> add(List<String> list, String element){
    list.add(element);
    return list;
}
```

이런 메서드가 있다.

그런데, 이 메서드 하나로 List에 여러가지 원소를 담고 싶다.

```java
private static List<String> add(List<String> list, Integer element){
    list.add(element);
    return list;
}
```

하지만 위처럼 Integer를 넣으면 오류가 발생한다.

```java
private static List<Integer> add(List<Integer> list, Integer element){
    list.add(element);
    return list;
}
```

쉽게 처리하자면 위와 같은 메서드를 하나 더 오버로딩 해줄 수 있다.

하지만, 제네릭을 사용하면 하나의 메서드로 String, Integer 외에도 모든 타입의 List를 반환할 수 있게끔 만들 수 있다.

```java
private static <T> List<T> add(List<T> list, T element){
    list.add(element);
    return list;
}
```

조금 더 나아가서 List가 아니라 Collection을 반환하도록 해보자.

```java
private static <T> Collection<T> add(Collection<T> list, T element){
    list.add(element);
    return list;
}
```

이렇게 만들면 쉽게 Collection에도 여러 타입들을 대응하여 반환할 수 있다.

하지만, 만약 인자로 들어오는 타입으로 반환을 하고 싶다면 아래의 코드처럼 메서드를 호출 하는 쪽에서 항상 타입캐스팅을 해줘야 한다.

```java
Collection AddList = add(list,"hello");

List<String> addList = AddList; // Collection을 반환하기에 컴파일 오류 발생.
List<String> addList = (List<String>)AddList; // 이렇게 타입을 변환해줘야 함
```

위의 경우에도 제네릭 메서드를 이용하면 저런 타입 캐스팅 코드를 없앨 수 있음.

```java
private static <T,R extends Collection<T>> R add(R collection, T element){
    collection.add(element);
    return collection;
}
```

이렇게 구현하면 List가 들어올 때 List를 반환, Set이 들어오면 Set을 반환해서

다른 곳에서 이 메서드를 호출 할 때 타입 캐스팅을 할 필요가 없어진다.

### 제네릭의 이해

```java
private static <T,R>
```

2개의 인자를 제네릭 타입으로 사용할 거다. 하나는 원소, 하나는 반환값.

```java
private static <T,R extends Collection<T>>
```

그런데, 이 제네릭 타입들은 둘다 Collection<T>의 인터페이스나 클래스 혹은 하위 타입이다.

R은 Collection에서 받은 것이라서, .add가 가능하다.

### 왜 extends를 하는지 이유를 알아보자.

```java
<T extends Number>
```

T extends Number가 없을 때는 T 타입의 data가 실제로 Interger로 설정되어도 Integer가 가지고 있는 기능을 사용할 수 없다.

왜냐하면 컴파일 시점에 T가 어떤 것이 올지 몰라, 가장 최상위 클래스인 Object의 기능만 사용할 수 있기 때문이다.

`만약, <T extends Number>를 해두었다면, 캐스팅을 하지 않고도 Number의 속성을 받아 올 수 있게된다.`

속성을 받아 올 수 있다는 말은, Number 클래스에서 사용하는 메서드를 사용할 수 있음을 의미한다.

extends를 해두면, Object 대신 extends를 한 객체(Number)를 받게되어, 굳이 따로 캐스팅을 하지 않아도 Number로써 사용할 수 있게끔 만들어 주는게 핵심이다.

이게 반환할 때 항상 “(Integer)intValue = Integer.parseInt(들어온 것)” 이렇게 타입을 변환 해줬는데, Number로 반환이 되기 때문에, 딱히 문제가 없는 것이다.)

### 타입 추론

- 매개변수를 통한 타입추론

```java
public static <K, V> boolean methodName(K key, V value) {
    return true;
}
```

<String, Integer>method(”key”,3) 이렇게 둘 필요가 없다.

method(”key”,3)만 두어도

“key”는 String으로 추론 K → String이겠군..

3은 Integer타입으로 추론 할 수 있고 V는 Integer이겠군 이런식으로 추론한다.

- 반환 값을 활용한 타입 추론

```java
public static <T> List<T> emptyList() {
    return new ArrayList<T>();
}
```

List의 반환타입이 Integer인걸로 봐서, T는 Integer이겠군..
