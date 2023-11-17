### 왜 같은 값인데 다르다고 나오는걸까?

```java
if(principal.getMember().getUserId() != (communication.getMember().getUserId())){
    throw new BusinessLogicException(ExceptionCode.CAN_NOT_MODIFY_COMMUNICATION);
}
```

```java
if(!principal.getMember().getUserId().equals(communication.getMember().getUserId())){
    throw new BusinessLogicException(ExceptionCode.CAN_NOT_MODIFY_COMMUNICATION);
}
```

### 문제해결

객체가 같은 메모리상에 있다. → Identity

객체가 같은 값을 가지고 있다. → Equality

### String객체와 String 리터럴에 대해

`찾아보니 String 리터럴을 제외한 모든 리터럴 들은 Stack에 저장된다.`

```java
String str1 = new String("abc");
String str2 = "abc";
```

new 연산자는 메모리의 heap영역에 할당된다.

리터럴 방식의 초기화는 String Constant Pool 영역에 할당된다.

String Constant Pool 영역은 Java Heap Memory내에 문자열 리터럴을 저장한 공간이면 HashMap으로 구현되어 있다.

한 번 생성된 문자열 리터럴은 변경될 수 없으며, 리터럴 문자를 생성하면 내부적으로 String.intern()이 호출된다.

String Pool에 같은 값이 있는지 찾고 있다면 그 참조값을 반환, 없다면 Pool에 문자열을 등록 후 해당 참조값이 반환되는 형태이다.

원래 이 pool은 heap 영역이 아니라 Perm 영역에 존재했었다.

Perm 영역은 실행 시간(Runtime)에 가변적으로 변경할 수 없는 고정된 사이즈이기 때문에 intern()의 호출시에 저장 공간이 부족할 수 있어 OOM(Out Of Memory)가 발생할 수 있어 변경되었다.

Java 8 부터 Perm영역은 사라졌고 MetaSpace 영역이 그 자리를 대신하게 되었다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b52adea8-e675-498d-ab0d-3a497cdc7312/Untitled.png)

intern() 메서드는 해당 문자열을 pool에서 찾고 있으면 해당 참조 값을 가지고 오고 그렇지 않다면 새로집어 넣고 주소값을 반환해 준다.

```java
String str = "bepoz"
String str2 = "bepoz";
String str3 = new String("bepoz").intern();
System.out.println(str==str2); //true
System.out.println(str==str3); //true
```

new 연산자 뒤에 intern()메서드만 붙여주면 false값이 true로 바뀐다.

이유는 intern() 메서드로 인해 String Constant Pool 에서 해당 문자열을 찾고 그 참조 값을 가지고 오기 때문이다.

== 은 컴퓨터 내부의 메모리에 같은 주소를 사용해서 비교한다.

`String을 제외한 리터럴은 Stack에 저장된 주소이고, String은 Heap에 저장된 주소이다.`

```java
String a = "aaa"
String b = a;
String c = new String("aaa");

sout(a.equals(b)) -> true
sout(a == b) -> true // 같은 메모리 주소상 매핑
sout(a == c) -> false // 다른 메모리 주소상 매핑
sout(a.equals(c)) -> true 
```

배우기로는 equals는 내부에서 객체의 값들을 서로 비교한다고 한다.

`그런데 내부를 들여다보면 내부의 주소가 일치하는지 검증하는 == 로 되어있다.`

어떻게 된 일일까?

```java
String a = new String("aaa");
String b = new String("aaa");
a.equals(b); -> true

public boolean equals(Object anObject) {
    if (this == anObject) {
        return true;
    }
    if (anObject instanceof String) {
        String anotherString = (String)anObject;
        int n = value.length;
        if (n == anotherString.value.length) {
            char v1[] = value;
            char v2[] = anotherString.value;
            int i = 0;
            while (n-- != 0) {
                if (v1[i] != v2[i])
                    return false;
                i++;
            }
            return true;
        }
    }
    
    return false;
}
```

그 이유는 String이면 객체를 String으로 변환해서 객체들의 내용이 같은지(Equality)를 비교하기 때문이다.

정리하자면 equals()는 객체를 비교할 때는 일반적으로 주소로 비교한다.

`하지만, String의 경우에는 Object를 String으로 캐스팅하여 글자가 같은지 비교한다.`

- 좋은 자료

[Lombok @Data의 @EqualsAndHashCode이 뭐하는 애일까?](https://velog.io/@gloom/Lombok-Data의-EqualsAndHashCode이-뭐하는-애일까)

- 최종 정리
1. == 는 객체가 위치한 메모리 주소가 같은지 비교한다.
2. equals는 객체가 위치한 메모리 주소가 같은지 비교하는게 기본이고 String 한정 내용을 비교한다.
3. HashCode()는 객체 내부의 내용을 비교한다!
