# java.lang패키지와 유용한 클래스

## java.lang패키지

java.lang패키지의 클래스들은 import문 없이도 사용할 수 있게 되어있다.

### Object클래스

| Object클래스의 메서드 | 설명 |
| --- | --- |
| protected Object clone() | 객체 자신의 복사본을 반환한다. |
| public boolean equals(Object obj) | 객체 자신과 객체obj가 같은 객체인지 알려준다. (같으면 true) |
| protected void finalize() | 객체가 소멸될 때 가비지 컬렉터에 의해 자동적으로 호출된다. </br> 이 때 수행되어야하는 코드가 있을 때 오버라이딩한다.(거의 사용X) |
| public Class getClass() | 객체 자신의 클래스 정보를 담고있는 Class인스턴스를 반환한다. |
| public int hashCode() | 객체 자신의 해시코드를 반환한다. |
| public String toString() | 객체 자신의 정보를 문자열로 반환한다. |
| public void notify() | 객체 자신을 사용하려고 기다리는 쓰레드를 하나만 깨운다. |
| public void notifyAll() | 객체 자신을 사용하려고 기다리는 모든 쓰레드를 깨운다. |
| public void wait() </br> public void wait(long timeout) </br> public void wait(long timeout, int nanos) | 다른 쓰레드가 notify()나 notifyAll()을 호출할 때 까지 현재 쓰레드를 무한히 또는 지정된 시간(timeout,nanos)동안 기다리게 한다.(timeout은 1/1000초, nanos는 1/1000000000초(10^9)) |

Object클래스는 멤버변수는 없고 오직 11개의 메서드만 가지고있다.

이 메서드들은 모든 인스턴스가 가져야할 기본적인것들이다.

### equals(Object obj)

```java
public boolean equals(Object obj){
    return (this == obj);
}
```

Object클래스에 정의되어있는 equals의 실제 내용이다.

객체를 생성할 때, 메모리의 비어있는 공간을 찾아 생성하므로 서로 다른 두 개의 객체가 같은 주소를 갖는 일은 있을 수 없다.

두 개 이상의 참조변수가 같은 주소값을 갖는것(한 객체를 참조하는것)은 가능하다.

```java
class EqualsEx1{
    public static void main(String[] args){
        Value v1 = new Value(10);
        Value v2 = new Value(10);

        if (v1.equals(v2))
            System.out.println("v1 == v2");
        else
            System.out.println("v1 != v2");

        v2 = v1;

        if (v1.equals(v2))
            System.out.println("v1 == v2");
        else
            System.out.println("v1 != v2");
    }
}

class Value{
    int value;
    Value(int value){
        this.value = value;
    }
}

/*
//return
v1 != v2
v1 == v2
*/
```

equal메서드는 주소값으로 비교를 하기 때문에, 두 Value인스턴스의 멤버변수 value의 값이 10으로 서로 같을지라도 equals메서드로 비교한 결과는 false일 수 밖에 없다.

```java
class EqualEx2{
    public static void main(String[] args){
        Person p1 = new Person(8011081111222L);
        Person p2 = new Person(8011081111222L);

        if(p1 == p2)
            System.out.println("p1 == p2");
        else
            System.out.println("p1 != p2");

        if(p1.equals(p2))
            System.out.println("p1 == p2");
        else
            System.out.println("p1 != p2");
    }
}

class Person{
    long id;

    public boolean equals(Object obj){
        if(obj instanceof Person)
            return id == ((Person)obj).id; // 형변환이 중요하다.
        else
            return false;
    }

    Person(long id){
        this.id = id;
    }
}
```

equals메서드로 Value인스턴스가 가지고 있는 value값을 비교하도록 하는방법.

String클래스 역시 그대로 사용하는것이 아니라 이처럼 오버라이딩을 통해서 String인스턴스가 갖는 문자열 값을 비교하도록 되어있다.

그렇기 떄문에 같은 내용의 문자열을 갖는 두 String인스턴스에 equals메서드를 사용하면 항상 true값을 얻는것이다.

String클래스뿐만 아니라, Date, File, wrapper클래스(Integer, Double 등)의 equals메서드도 주소값이 아닌 내용을 비교하도록 오버라이딩되어 있다. 그러나 의외로 StringBuffer클래스는 오버라이딩되어있지 않다.

### hashCode()

이 메서드는 해싱(hashing)기법에 사용되는 ‘해시함수(hash function)’을 구현한 것이다.

해싱은 데이터관리기법 중의 하나인데, 다량의 데이터를 저장하고 검색하는데 유용하다.

해시함수는 찾고자하는 값을 입력하면, 그 값이 저장된 위치를 알려주는 해시코드(hash code)를 반환한다.

Object클래스에 정의된 hashCode메서드는 객체의 주소값으로 해시코드를 만들어 반환하기 때문에 32bit JVM에서는 서로 다른 두 객체는 결코 같은 해시코드를 가질 수 없었지만, 64bit JVM에서는 8byte 주소값으로 해시코드(4 byte)를 만들기 때문에 해시코드가 중복될 수 있다.

클래스의 인스턴스변수 값으로 객체의 같고 다름은 판단해야하는 경우라면, equals메서드 뿐 만 아니라 hashCode메서드도 적절히 오버라이딩해야 한다.

같은 객체라면 hashCode메서드를 호출했을 떄의 결과값인 해시코드도 같아야하기 때문이다.

```java
class HashcodeEx1{
    public static void main(String[] args){
        String str1 = new String("abc");
        String str2 = new String("abc");

        System.out.println(str1.equals(str2));
        System.out.println(str1.hashCode());
        System.out.println(str2.hashCode());
        System.out.println(System.identityHashCode(str1));
        System.out.println(System.identityHashCode(str2));
    }
}

//return
true
96354
96354
2003749087
1324119927
```

System.identityHashCode(Object obj)메서드는 객체의 주소값으로 해시코드를 생성하기때문에 모든 객체에 대해 항상 다른 해시코드값을 반환할 것을 보장한다.

### toString()

이 메서드는 인스턴스에 대한 정보를 문자열(String)으로 제공할 목적으로 정의한것이다.

인스턴스의 정보를 제공한다는것은 대부분 인스턴스 변수에 저장된 값들을 문자열로 표현한다는 뜻이다.

```java
public String toString(){
    return getClass().getName()+"@"+Integer.toHexString(hashCode());
}
```

실제 정의된 코드

toString()을 호출하면 클래스의 이름에 16진수의 해시코드를 얻게될것이다.

```java
class CardToString{
    public static void main(String[] args){
        Card c1 = new Card();
        Card c2 = new Card();

        System.out.println(c1.toString());
        System.out.println(c2.toString());
    }
}

class Card{
    String kind;
    int number;

    Card() {
        this("SPADE",1);
    }

    Card(String kind, int number){
        this.kind = kind;
        this.number = number;
    }
}

/*
// return
Card@4eec7777
Card@3b07d329
*/
```

서로 다른 인스턴스에 대해서 toString()을 호출하였으므로 클래스의 이름은 같아도 해시코드값이 다르다는것을 확인할 수 있다.

```java
class ToStringTest{
    public static void main(String args[]){
        String str = new String("KOREA");
        java.util.Date today = new java.util.Date();

        System.out.println(str);
        System.out.println(str.toString());
        System.out.println(today);
        System.out.println(today.toString());
    }
}

/*

//return
KOREA
KOREA
Sat Apr 09 06:11:08 KST 2022
Sat Apr 09 06:11:08 KST 2022

*/
```

Date클래스의 경우, Date인스턴스가 갖고있는 날짜와 시간을 문자열로 변환하여 반환하도록 오버라이딩되어있다.

### clone()

이 메서드는 자신을 복제하여 새로운 인스턴스를 생성하는 일을 한다.

어떤 인스턴스에 대해 작업을 할 때, 원래의 인스턴스는 보존하고 clone메서드드를 이용해서 새로운 인스턴스를 생성하여 작업을 하면 작업 이전의 값이 보존되므로 작업에서 실패해서 원래의 상태로 되돌리거나 변경되기전의 값을 참고하는데 도움이 된다.

Object클래스에 정의된 clone()은 단순히 인스턴스 변수의 값만 복사하기 때문에 참조타입의 인스턴스 변수가 있는 클래스는 완전한 인스턴스 복제가 이루어지지 않는다.

예를들어 배열의 경우, 복제된 인스턴스도 같은 배열의 주소를 갖기 때문에 보고제된 인스턴스의 작업이 원래의 인스턴스에 영향을 미치게된다.

//deep copy된다는 말인가?

```java

class CloneEx1{
    public static void main(String[] args){
        Point original = new Point(3,5);
        Point copy = (Point)original.clone();
        System.out.println(original);
        System.out.println(copy);
    }
}

class Point implements Cloneable { // Cloneable인터페이스 구현
    int x, y;

    Point(int x, int y){
        this.x = x;
        this.y = y;
    }

    public String toString(){
        return "x=" + x + " , y= " + y;
    }

    public Object clone(){ // 접근제어자를 protected에서 public으로 변경
        Object obj = null;
        try{
            obj = super.clone(); // try-catch 내에서 조상클래스 clone()을 호출
        } catch(CloneNotSupportedException e){}
        return obj;
    }
}
```

clone()을 사용하려면, 먼저 복제할 클래스가 Cloneable인터페이스를 구현해야한다.

clone()을 오버라이딩하면서 접근 제어자를 protected에서 public으로 변경해야한다.

그래야만 상속관계가 없는 다른 클래스에서 clone()을 호출 할 수 있다.

```java
public class Object{
    protected native Object clone() throws CloneNotSupportedException;
}
```

Object클래스의 clone()은 Cloneable을 구현하지 않은 클래스 내에서 호출되면 예외를 발생시킨다.

Cloneable 인터페이스를 구현한 클래스의 인스턴스만 clone()을 통한 복제가 가능한데,

그 이유는 인스턴스의 데이터를 보호하기 위해서이다.

Cloneable인터페이스가 구현되어 있다는것은 클래스 작성자가 복제를 허용한다는 의미이다.

### 공변 반환타입

JDK1.5부터 ‘공변 반환타입(Covariant return type)’이라는것이 추가되었다.

이 기능은 오버라이딩할 때 조상 메서드의 반환타입을 자손클래스의 타입으로 변경을 허용하는 것이다.

예전에는 오버라이딩할 때 조상에 선언된 메서드의 반환타입을 그대로 사용해야했다.

```java
public Point clone(){ //반환 타입을 Object에서 Point로 변경
    Object obj = null;
    try {
        obj = super.clone();
    } catch(CloneNotSupportedException e){}
    return (Point)obj; // Point타입으로 형변환한다.
}
```

보다시피, return으로 (Point)를 받기 떄문에, 조상의 타입이 아닌, 실제로 반환되는 자손 객체의 타입으로 반환할수 있어서, `이후에 계속해서 번거롭게 캐스팅연산자를 쓰지 않아도 된다는 장점이 있다.`

```java
class CloneEx2{
    public static void main(String[] args){
        int[] arr = {1,2,3,4,5};
        int[] arrClone = arr.clone();
        arrClone[0] = 6;

        System.out.println(Arrays.toString(arr));
        System.out.println(Arrays.toString(arrClone));
    }
}
```

Object클래스에는 protected로 정의되어있는 clone()을 배열에서는 public으로 오버라이딩하였기 때문에 직접 호출이 가능한것이라는점 잊지말자.

일반적으로는 배열을 복사할때, 새로운 배열을 생성한 다음 System.arraycopy()를 이용해서 내용을 복사한다.

```java
int[] arr = {1,2,3,4,5};
int[] arrClone = = arr.clone();

int[] arr = {1,2,3,4,5};
int[] arrClone = new int[arr.length];
System.arraycopy(arr,0,arrClone,0,arr.length);
```

두 코드는 같은 결과를 얻는다.

java.util패키지의 Vector, ArrayList, LinkedList, HashSet,Treeset,HashMap, TreeMap, Calendar, Date 들은 clone()과 같은 방식으로 복제가 가능하다.

clone()으로 복제가 가능한 클래스인지 확인하려면 Clonable을 구현하였는지 확인하면 된다.

### 얕은 복사와 깊은 복사

clone()은 단순히 객체에 저장된 값을 그대로 복제할 뿐, 객체가 참조하고 있는 객체까지 복제하지는 않는다.

원본과 복제복이 같은 객체를 공유하면 shallow copy

원본이 참조하고 있는 객체까지 복제하는것을 deep copy

```java
class Circle implements Cloneable {
    Point p;
    double r;

    Circle(Point p) {
        this.p = p;
        this.r = r;
    }

    public Circle shallowCopy() {
        Object obj = null;
        try {
            obj = super.clone();
        } catch (CloneNotSupportedException e) {}
        return (Circle) obj;
    }

    public Circle deepCopy(){
        Object obj = null;
        try{
            obj = super.clone();
        } catch(CloneNotSupportedException e) {}
        Circle c = (Circle)obj; // 새로 c를 만들고
        c.p = new Point(this.p.x, this.p.y); // 새로 객체를 할당받아

        return c; // 새로운 c를 반환한다.
    }

    public String toString() {
        return "[p=" + p + ", r=" + r + "]";
    }
}

class Point{
    int x, y;

    Point(int x, int y){
        this.x = x;
        this.y = y;
    }

    public String toString(){
        return "("+x+", "+y+")";
    }
}

class ShallowDeepCopy{
    public static void main(String[] args){
        Circle c1 = new Circle(new Point(1,1));
        Circle c2 = c1.shallowCopy();
        Circle c3 = c1.deepCopy();

        System.out.println(c1);
        System.out.println(c2);
        System.out.println(c3);

        c1.p.x = 9;
        c1.p.y = 9;

        System.out.println("c1변경후");
        System.out.println(c1);
        System.out.println(c2);
        System.out.println(c3);
    }
}

/*

//return

[p=(1, 1), r=0.0]
[p=(1, 1), r=0.0]
[p=(1, 1), r=0.0]
c1변경후
[p=(9, 9), r=0.0]
[p=(9, 9), r=0.0]
[p=(1, 1), r=0.0]

*/
```

### getClass()

이 메서드는 자신이 속한 클래스의 Class객체를 반환하는 메서드이다.

```java
public final class Class implements ...{ //Class클래스
        ...
}
```

Class객체는 클래스의 모든 정보를 담고 있으며, 클래스 당 1개만 존재한다.

클래스 파일이 ‘클래스 로더(ClassLoader)’에 의해서 메모리에 올라갈 때, 자동으로 생성된다.

먼저 기존에 생성된 클래스 객체가 메모리에 존재하는지 확인하고, 있으면 객체의 참조를 반환하고 없으면 클래스 패스(classpath)에 지정된 경로를 따라서 클래스 파일을 찾는다.

못 찾으면 ClassNotFoundException이 발생하고, 찾으면 해당 클래스 파일을 읽어서 Class객체로 변환한다.

파일 형태로 저장되어 있는 클래스를 읽어서 Class클래스에 정의된 형식으로 변환하는 것이다.

클래스 파일을 메모리에 로드하고 변화나하는 일은 클래스 로더가 한다.

### Class객체를 얻는 방법

클래스의 정보가 필요할 때, 먼저 Class객체에 대한 참조를 얻어 와야 하는데, 해당 Class객체에 대한 참조를 얻는 방법은 여러가지가 있다.

```java
Class cObj = new Card().getClass(); // 생성된 객체로부터 얻는방법

Class cObj = Card.class; //클래스 리터럴(*.class)로 부터 얻는 방법

Class cObj = Class.forName(”Card”) // 클래스 이름으로 부터 얻는 방법
```

왜 사용하는 거지?

forName()의 특정 클래스 파일, 예를 들어 데이터베이스 드라이버를 메모리에 올릴 때 주로 사용한다.

Class객체를 이용하면 클래스에 정의된 멤버의 이름이나 개수 등 , 클래스에 대한 모든 정보를 얻을 수 있기 때문에 Class객체를 통해서 객체를 생성하고 메서드를 호출하는 등 보다 동적인 코드를 작성할 수 있다.

```java
Card c = new Card(); // new연산자를 이용해서 객체 생성
Card c = Card.class.newInstance(); // Class객체를 이용해서 객체 생성
```

newInstance()는 InstantiationException이 발생할 수 있으므로 예외처리가 필요하다.

동적으로 객체를 생성하고 메서드를 호출하는 방법에 대해 더 알고 싶다면, ‘리플렉션 API(reflection API)’로 검색하면 된다.

```java
final class Card{
    String kind;
    int num;

    Card() {
        this("SPADE",1);
    }

    Card(String kind, int num){
        this.kind = kind;
        this.num = num;
    }

    public String toString() {
        return kind + ":" + num;
    }
}

class ClassEx1{
    public static void main(String[] args) throws Exception{
        
        Card c = new Card("HEART", 3);
        Card c2 = Card.class.newInstance();

        Class cObj = c.getClass();

        System.out.println(c);
        System.out.println(c2);
        System.out.println(cObj.getName());
        System.out.println(cObj.toGenericString());
        System.out.println(cObj.toString());
    }
}
```

## String클래스

기존의 다른 언어에서는 문자열을  char형의 배열로 다루었으나 자바에서는 문자열을 위한 클래스를 제공한다.

String클래스는 아주 중요하다.

### 변경 불가능한(immutabble) 클래스

String클래스에는 문자열을 저장하기 위해서 문자형 배열 참조변수(char[]) value를 인스턴스 변수로 정의해놓고 있다. 인스턴스 생성 시 생성자의 매개변수로 입력받는 문자열은 이 인스턴스변수(value)에 문자형 배열(char[])로 저장되는 것이다.

String클래스는 앞에 final이 붙어 있으므로 다른 클래스의 조상이 될 수 없다.

```java
public final class String implements java.io.Serializable, Comparable{
    priavte char[] value;
    ...
}
```

한번 생성된 String인스턴스가 갖고있는 문자열은 읽어 올 수만 있고, 변경할 수는 없다.

‘+’연산자를 이용해서 문자열을 결합하는 경우 인스턴스 내의 문자열이 바뀌는 것이 아니라 새로운 문자열(”ab”)이 담긴 String인스턴스가 생성되는 것이다.

이처럼 덧셈연산자’+’를 사용해서 문자열을 결합하는 것은 매 연산 시 마다 새로운 문자열을 가진 String인스턴스가 생성되어 메모리공간을 차지하게 되므로 가능한 결합횟수를 줄이는것이 좋다.

// 가비지컬렉터가 알아서 제거해주는것이 아닌가?

문자열간의 결합이나 추출 등 문자열을 다루는 작업이 많이 필요한 경우에는 String클래스 대신 StringBuffer클래스를 사용하는것이 좋다.

StringBuffer인스턴스에 저장된 문자열은 변경이 가능하므로 하나의 StringBuffer인스턴스만으로도 문자열을 다루는 것이 가능하다.

### 문자열의 비교

문자열을 만들 때는 두가지 방법, 문자열 리터럴을 지정하는 방법과 String클래스의 생성자를 사용해서 만드는 방법이 있다.

```java
String str1 = "abc";
String str2 = "abc";
String str3 = new String("abc");
String str4 = new String("abc");

str1 == str2
0x100 == 0x100
//true

str3 == str4
0x200 == 0x300
//false
```

String클래스의 생성자를 이용한 경우에는 new연산자에 의해서 메모리할당이 이루어지기 때문에 항상 새로운 String인스턴스가 생성된다.

그러나 문자열 리터럴은 이미 존재하는것을 재사용하는것이다.

문자열 리터럴은 클래스가 메모리에 로드될때 자동적으로 미리 생성된다.

```java
class StringEx1{
    public static void main(String[] args){
        String str1 = "abc";
        String str2 = "abc";
        System.out.println("String str1 = \"abc\";");
        System.out.println("String str2 = \"abc\";");

        System.out.println("str1 == str2 ? "+(str1 == str2));
        System.out.println("str1.equals(str2) ? "+(str1.equals(str2)));
        System.out.println();

        String str3 = new String("\"abc\"");
        String str4 = new String("\"abc\"");

        System.out.println("String str3 = new String(\"abc\");");
        System.out.println("String str4 = new String(\"abc\");");

        System.out.println("str3 == str4 ? " + (str3 == str4));
        System.out.println("str3.equals(str4) ? " + str3.equals(str4));
    }
}

/*
String str1 = "abc";
String str2 = "abc";
str1 == str2 ? true
str1.equals(str2) ? true

String str3 = new String("abc");
String str4 = new String("abc");
str3 == str4 ? false
str3.equals(str4) ? true
[String의 equals()는 두 문자열의 내용을 비교하도록 오버라이딩 되어있다.]
*/
```

### == 와 equals의 차이점

==(연산자)는 주소를 비교하고

equals(메서드)또한 기본적으로 객체의 주소가 같은지 비교한다.

```java
public boolean equals(Object obj){
    return (this == obj);
}
```

하지만 String의 equals()는 두 문자열의 내용을 비교하도록 오버라이딩 되어있다.

### 문자열 리터럴

`자바 소스파일에 포함된 모든 문자열 리터럴은 컴파일 시에 클래스 파일에 저장된다.`

이때 같은 내용의 문자열 리터럴은 한번만 저장된다.

문자열 리터럴도 String인스턴스이고, 한번 생성하면 내용을 변경할 수 없으니 하나의 인스턴스를 공유하면 되기 때문이다.

직접 컴파일 후 class파일을 헥사에디터로 뜯어봐라.

```java
class StringEx2{
    public static void main(String[] args){}
        String s1 = "AAA"; //0x100
        String s2 = "AAA"; //0x100
        String s3 = "AAA"; //0x100
        String s4 = "BBB";
}
```

String리터럴들은 컴파일시에 클래스파일에 저장된다.

“AAA”를 담고 있는 String인스턴스가 하나 생성된 후, 참조변수 s1, s2, s3는 모두 이 String인스턴스를 참조하게 된다. [이름없는 String인스턴스(0x100)]

클래스파일에는 소스파일에 포함된 모든 리터럴의 목록이 있다.

해당 클래스 파일이 클래스 로더에 의해 메모리에 올라갈 때, 이 리터럴의 목록에 있는 리터럴들이 JVM내에 있는 ‘상수 저장소(constant pool)’에 저장된다.

### 빈 문자열(Empty String)

길이가 0인 배열이 존재할 수 있을까? 가능하다.

char형 배열도 길이가 0인 배열을 생성할 수 있고, 이 배열을 내부적으로 가지고 있는 문자열이 바로 빈 문자열이다.

‘String s = “”;’과 같은 문장이 있을 때, 참조변수 s가 참조하고 있는 String인스턴스는 내부에 ‘new char[0]과 같이 길이가 0인 char형 배열을 저장하고 있는것이다.

C언어에서는 길이가 0인 배열을 선언할 수 없다.

`C언어에서는 문자열의 끝에 null 문자가 항상 붙지만, 자바에서는 null문자를 사용하지 않는다.`

`대신 문자열의 길이정보를 따로 저장한다.`

```java
String s = null; -> String s = ""; // 빈 문자열로 초기화
char c = '\u0000'; -> char c = ' '; // 공백으로 초기화
```

일반적으로 변수를 선언할때, 각 타입의 기본값으로 초기화 하지만 String은 참조형 타입의 기본값인 null보다는 빈 문자열로, char형은 기본값인 ‘\u0000’ 대신 공백으로 초기화 하는것이 보통이다.ㄹㄴ

```java
class StringEx3{
    public static void main(String[] args){
        //길이가 0인 char배열을 생성한다.
        char[] cArr = new char[0]; // char[] cArr = {};와 같다.
        String s = new String(cArr); // String s = new String("");와 같다.

        System.out.println("cArr.length = " +cArr.length);
        System.out.println("@@@"+s+"@@@");
    }
}

/*
cArr.length = 0;
*/
```

길이가 0이긴해도 배열이 생성되고, 생성된 배열의 주소값이 참조변수 cArr에 저장된다.

### String클래스의 생성자와 메서드

String클래스 내에 정의된 생성자와 메서드중 자주 쓰이는것들의 목록.

| 메서드 | 설명 | 예제 | 결과 |
| --- | --- | --- | --- |
| String(String s) | 주어진 문자열(s)를 갖는 String인스턴스를 생성한다. | String s = new String(”Hello”); | s = “Hello” |
| String(char[] value) | 주어진 문자열(value)를 갖는 String인스턴스를 생성한다. | char[] c ={’H’,’e’,’l’,’l’,’o’}; </br> String s = new String(c); | s = “Hello” |
| String(StringBuffer buf) | StringBuffer인스턴스가 갖고 있는 문자열과 같은 내용의 String인스턴스를 생성한다. | StringBuffer sb = new StringBuffer(”Hello”);</br> String s = new String(sb); | s = “Hello” |
| char charAt(int index) | 지정된 위치(index)에 있는 문자를 알려준다. | String s = “Hello” </br> char c = s.charAt(1); | c = ‘e’ |
| int compareTo(String str) | 문자열(str)과 사전순서로 비교한다.</br> 같으면 0을, 사전순으로 이전이면 음수를, 이후면 양수를 반환한다. | int i = “aaa”.compareTo(”aaa”); </br> int i2 = “aaa”.compareTo(”bbb”); </br> int i3 = “bbb”.compareTo(”aaa”); | i = 0 </br>i2 = -1 </br> i3 = 1 |
| String concat(String str) | 문자열(str)을 뒤에 덧붙인다. | String s= “Hello”;
String s2 = s.concat(” World”); | s2 = “Hello World” |
| boolean contains(CharSequence s) | 지정된 문자열(s)가 포함되었는지 검사한다. | String s = “abcedfg”; </br> boolean b = s.contains(”bc”); | b = true |
| boolean endsWith(String suffix) | 지정된 문자열(suffix)로 끝나는지 검사한다. | String file = “Hello.txt”;
</br> boolean b = file.endsWith(”txt”) | b = true |
| boolean equals(Object obj) | 매개변수로 받은 문자열(obj)과 String인스턴스의 문자열을 비교한다. obj가 String이 아니거나 문자열이 다르면 false를 반환한다. | String s = “Hello”; </br> boolean b = s.equals(”Hello”); </br> boolean b2 = s.equals(”hello”); | b = true </br> b2 = false |
| boolean equalsIgnoreCase(String str) | 문자열과 String인스턴스의 문자열을 대소문자 구분없이 비교한다. | String s = “Hello”; </br> boolean b = </br> s.equalsIgnoreCase(”HELLO”);</br> boolean b2 = s.equalsIgnoreCase(”heLLo”); | b = true </br> b2  = true |
| int indexOf(int ch) | 주어진 문자(ch)가 문자열에 존재하는지 확인하여 위치(index)를 알려준다. </br> 못 찾으면 -1을 반환한다. | String s = “Hello”; </br> int idx1 = s.indexOf(’o’); </br> int idx2 = s.indexOf(’k’); | idx1 = 4 </br> idx2 = -1 |
| int indexOf(int ch, int pos) | 주어진 문자(ch)가 문자열에 존재하는지 지정된 위치(pos)부터 확인하여 위치(index)를 알려준다. 못 찾으면 -1을 반환한다.(index는 0부터 시작) | String s = “Hello”; </br> int idx1 = s.indexOf(’e’, 0); </br> int idx2 = s.indexOf(’e’, 2); | b = 1 </br> b2 = -1 |
| int indexOf(String str) | 주어진 문자열이 존재하는지 확인하여 그 위치(index)를 알려준다. 없으면 -1을 반환한다. | String s = “ABCDEFG”; </br> int idx = s.indexOf(”CD”); | idx = 2 |
| String intern() | 문자열을 상수풀(constant pool)에 등록한다. </br> 이미 상수풀에 같은 내용의 문자열이 있을 경우 그 문자열의 주소값을 반환한다. | String s = new String(”abc”); </br> String s2 = new String(”abc”); </br> boolean b = (s==s2); </br>boolean b2 = s.equals(s2); </br> boolean b3 =(s.intern() == s2.intern()); | b = false </br> b2 = true </br> b3 = true |
| int lastIndexOf(int ch) | 지정된 문자 또는 문자코드를 문자열의 오른쪽 끝에서부터 찾아서 위치(index)를 알려준다. 못찾으면 -1을 반환한다. | String s = “java.lang.Object”; </br> int idx1 = s.lastIndexOf(’.’); </br> int idx2 = s.indexOf(’.’); | idx1 = 9 </br> idx2 = 4 |
| int lastIndexOf(String str) | 지정된 문자열을 인스턴스의 문자열 끝에서 부터 찾아서 위치(index)를 알려준다. 못 찾으면 -1을 반환한다. | String s = “java.lang.java”; </br> int idx1 = s.lastIndexOf(”java”); </br> int idx2 = s.indexOf(”java”); | idx1 = 10 </br> idx2 = 0 |
| int length() | 문자열의 길이를 알려준다. | String s = “Hello”; </br> int length = s.length(); | length =5 |
| String replace(char old, char new) | 문자열 중의 문자(old)를 새로운 문자(new)로 바꾼 문자열을 반환한다. | String s = “Hello”; </br> String s1 = s.replace(’H’,’C’); | s1 = “Cello” |
| String replace(CharSequence old, CharSequence new) | 문자열 중의 문자열(old)을 새로운 문자열(new)로 모두 바꾼 문자열을 반환한다. | String s = “Hellollo”; </br> String s1 = s.replace(”ll”,”LL”); | s1 = “HeLLoLLo” |
| String replaceAll(String regex, String replacement) | 문자열 중에서 지정된 문자열(regex)과 일치하는 것을 새로운 문자열(replacement)로 모두 변경한다. | String ab = “AABBAABB”; </br> String r = ab.replaceAll(”BB”,”bb”) | r = “AAbbAAbb” |
| String replaceFirst(String regex, String replacement) | 문자열 중에서 지정된 문자열(regex)과 일치하는 것 중 첫번째 것만 새로운 문자열(replacement)로 변경한다. | String ab = “AABBAABB”; </br> String r= ab.replaceFirst(”BB”,”bb”); | r = “AAbbAABB” |
| String[] split(String regex) | 문자열을 지정된 분리자(regex)과 일치하는 것을 새로운 문자열(replacement)로 모두 변경한다. | String animals = “dog,cat,bear”; </br> String[] arr = animals.split(”,”); | arr[0] = “dog” </br> arr[1] = “cat” </br> arr[2] = “bear” |
| String[] split(String regex,int limit) | 문자열을 지정된 분리자(regex)로 나누어 문자열배열에 담아 반환한다. 단, 문자열 전체를 지정된 수(limit)로 자른다. | String animals = “dog,cat,bear”; </br> String[] arr = animals.split(”,”,2); | arr[0] = “dog” </br> arr[1] = “cat,bear” |
| boolean startsWith(String prefix) | 주어진 문자열(prefix)로 시작하는지 검사한다. | String s = “java.lang.Object”; </br> boolean b = s.startsWith(”java”); | b = true </br> b2 = false |
| String substring(int begin) </br> String substring(int begin, int end) | 주어진 시작위치(begin)부터 끝 위치(end) 범위에 포함된 문자열을 얻는다. 이 때, 시작위치의 문자는 범위에 포함되지만, 끝 위치의 문자는 포함되지 않는다. (begin ≤ x < end) | String s = “java.lang.Object”; </br> String c = s.substring(10); </br> String p = s.substring(5,9); | c = “Object” </br> p = “lang” |
| String toLowerCase() | String인스턴스에 저장되어있는 모든 문자열을 소문자로 변환하여 반환한다. | String s = “Hello” </br> String s1 = s.toLowerCase(); | s1 = “hello” |
| String toString() | String인스턴스에 저장되어 있는 문자열을 반환한다. | String s = “Hello”; </br> String s1 = s.toString(); | s1 = “Hello” |
| String toUpperCase() | String인스턴스에 저장되어있는 모든 문자열을 대문자로 변환하여 반환한다. | String s = “Hello”; </br> String s1 = s.toUpperCase(); | s1 = “HELLO” |
| String trim() | 문자열의 왼쪽 끝과 오른쪽 끝에 있는 공백을 없앤 결과를 반환한다. | String s = “      Hello World   “ </br> String s1 = s.trim(); | s1 = “Hello World” |
| static String valueOf(boolean b) </br> static String valueOf(char c) </br> static String valueOf(int i) </br> static String valueOf(long l) </br> static String valueOf(float f) </br> static String valueOf(double d) </br> static String valueOf(Object o) | 지정된 값을 문자열로 변환하여 반환하다. </br> 참조변수의 경우, toString()을 호출한 결과를 반환한다. | String b = String.valueOf(true); </br> String c = String.valueOf(’a’); </br> String i = String.valueOf(100); </br> String l = String.valueOf(100L); </br> String f = String.valueOf(10f); </br> String d = String.valueOf(10.0); </br> java,util.Date dd = new java.util.Date(); </br> String date = String.valueOf(dd); | b = “true” </br> c = “a” </br> i = “100” </br> l = “100” </br> f = “10.0” </br> d = “10.0” </br> date = “Wed Jan 27 21:26:29 KST 2016” |

CharSequence는 JDK1.4부터 추가된 인터페이스로 String, StringBuffer 등의 클래스가 구현하였다.

contains(CharSequence s), repalce(CharSequence old, CharSequence new) 는 JDK1.5부터 추가되었다.

[java.util.Date](http://java.util.Date) dd = new java.util.Date();에서 생성된 Date인스턴스는 현재시간을 갖는다.

### join()과 StringJoiner

join()은 여러 문자열 사이에 구분자를 넣어서 결합한다.

구분자로 문자열을 자르는 split()과 반대의 작업을 한다고 생각하면 이해하기 쉽다.

```java
class Test{
    public static void main(String[] args){
        String animals = "dog,cat,bear";
        String[] arr = animals.split(",");
        String str = String.join("-",arr);
        System.out.println(str); // dog-cat-bear
    }
}
```

java.util.StringJoiner클래스를 사용해서 문자열을 결합할 수도 있다.

```java
class Test{
    public static void main(String[] args) {
        StringJoiner sj = new StringJoiner(",", "[", "]"); // delimiter, prefix, suffix
        String[] strArr = {"aaa", "bbb", "ccc"};
        for (String s : strArr)
            sj.add(s.toUpperCase());
        System.out.println(sj.toString()); // [AAA,BBB,CCC]
    }
}
```

join()과 java.util.StringJoiner는 JDK1.8부터 추가되었다.

### 유니코드의 보충문자

매개변수의 타입중 char도 있고 int도 있다.

ex) char charAt(int index)

유니코드는 원래 2byte, 즉 16비트 문자체계이다. 하지만 이걸로 모자라 20비트로 확장하게 되었다.

그래서 하나의 문자를 char타입으로 다루지 못하고, int타입으로 다룰 수 밖에 없다.

새로 추가된 문자들을 ‘보충 문자(supplementary character)’라고 하는데,

String클래스의 메서드 중에서는 보충 문자를 지원하는 것이 있고 지원하지 않는것도 있다.

이들을 구분하는 방법으로 매개변수가 ‘int ch’ 또는 ‘char ch’이다.

`하지만 보충 문자를 사용할 일은 거의 없기 떄문에 이정도만 알아두자.`

확장된 유니코드(20bit)가 적용된것은 JDK1.5부터이다.

### 문자 인코딩 변환

getBytes(String charsetName)을 사용하면, 문자열의 문자 인코딩을 다른 인코딩으로 변경할 수 있다.

자바가 UTF-16을 사용하지만, 문자열 리터럴에 포함되는 문자들은 OS의 인코딩을 사용한다.
한글 윈도우즈의 경우 문자 인코딩으로 cp949를 사용하며 utf-8

사용가능한 문자 인코딩 목록은 ‘System.out.println(java.nio.charset.Charset.availableCharsets());로 모두 출력할 수 있다.

```java
class StringEx5{
    public static void main(String[] args) throws Exception {
        String str = "가";

        byte[] bArr = str.getBytes("UTF-8");
        byte[] bArr2 = str.getBytes("CP949");

        System.out.println("UTF-8:" + joinByteArr(bArr));
        System.out.println("CP949:" + joinByteArr(bArr2));

        System.out.println("UTF-8:" + new String(bArr, "UTF-8"));
        System.out.println("CP949:" + new String(bArr2, "CP949"));
}

    static String joinByteArr(byte[] bArr){
        StringJoiner sj = new StringJoiner(":","[","]");

        for(byte b: bArr)
            sj.add(String.format("%02X",b));

        return sj.toString();
        }
}

/*
//return
UTF-8:[EA:B0:80]
CP949:[B0:A1]
UTF-8:가
CP949:가
*/
```

UTF-8은 한글 한 글자를 3byte로 표현하고, cp949는 2byte로 표현한다.

문자 “가”는 UTF-8로 ‘0xEAB080’이고, CP949로 ‘0xB0A1’이다.

문자 인코딩은 CP949는 MS949라고도 한다.

### String.format()

format()은 형식화된 문자열을 만들어내는 간단한 방법이다.

printf()와 사용법이 완전히 똑같다.

```java
String str = String.format("%d 더하기 %d는 %d입니다.", 3,5,3+5);
System.out.println(str); // 3 더하기 5는 8입니다.
```

### 기본형 값을 String으로 변환

숫자로 이루어진 문자열을 숫자로, 또는 그반대로 변환하는법

숫자에 빈 문자열 “”을 더해주면 문자가 된다.

이외에도 valueOf()를 사용하는 방법도 있다.

성능은 valueOf()가 더 좋다.

하지만, 빈 문자열을 더하는 방법이 간단하고 편하기 때문에 성능향상이 필요한 경우에만 valueOf()를 쓰자.

```java
class Test {
    public static void main(String[] args) throws Exception {
        int i = 100;
        String str1 = i + "";
        String str2 = String.valueOf(i);
        System.out.println(str1);
        System.out.println(str2);
    }
}
```

참조변수에 String을 더하면, 참조변수가 가리키는 인스턴스의 toString()을 호출하여 String을 얻은 다음 결합한다.

### String을 기본형 값으로 변환

```java
int i = Integer.parseInt("100");
int i2 = Integer.valueOf("100"); // Integer i2 = Integer.valueOf("100")
```

valueOf()의 반환 타입은 int가 아니라 Integer인데, 곧 배울 오토박싱(auto-boxing)에 의해 Integer가 int로 자동변환된다.

예전에는 parseInt()와 같은 메서드를 많이 썻는데, 메서드의 이름을 통일하기 위해 valueOf()가 나중에 추가되었다. valueOf(String s)는 메서드 내부에서 그저 parseInt(String s)를 호출할 뿐이므로,

두 메서드는 반환 타입만 다르지 같은 메서드다.

```java
public static Integer valueOf(String s) throws NumberFormatException{
    return Integer.valueOf(parseInt(s,10)); //10은 10진수를 의미.
}
```

parseint(s, 10)은 parseint(s)와 같다.

| 기본형 → 문자열 | 문자열 → 기본형 |
| --- | --- |
| String String.valueOf(boolean b)
String String.valueOf(char c)
String String.valueOf(int i)
String String.valueOf(long l)
String String.valueOf(float f)
String String.valueOf(double d) | boolean Boolean.parseBoolean(String s)
byte Byte.parseByte(String s)
short Short.parseShort(String s)
int Integer.parseInt(String s)
long Long.parseLong(String s)
float Float.parseFloat(String s)
double Double.parseDouble(String s) |

byte,short을 문자열로 변경할 때는 String valueOf(int i)를 사용하면 된다.

문자열 “A”를 문자 ‘A’로 변환하려면 char ch = “A”.charAt(0);

```java
class StringEx6{
    public static void main(String[] args){
        int iVal = 100;
        String strVal = String.valueOf(iVal); // int를 String으로 변환.

        double dVal = 200.0;
        String strVal2 = dVal + "";

        double sum = Integer.parseInt("+"+strVal) + Double.parseDouble(strVal2);
        //"+"는 양수를 뜻함 .
        double sum2 = Integer.valueOf(strVal) + Double.valueOf(strVal2);

        System.out.println(String.join("",strVal,"+",strVal2,"=")+sum);
        System.out.println(strVal+"+"+strVal2+"="+sum2);
    }
}
/*
//return
100+200.0=300.0
100+200.0=300.0
*/
```

```java
int val = Integer.parseInt(" 123 ".trim());
```

이와 같이 문자열에 공백이 있으면, 변환시 예외(NumberFormatException)가 발생하므로.

습관적으로 trim()을 해주도록하자!

‘+’가 포함된 문자열이 parseint()로 변환가능하게 된 것은 JDK1.7부터이다.

integer클래스의 static int parseint(String s, int radix)를 사용하면 16진수 값으로 표현된 문자열도 변환할 수 있기 때문에 대소문자 구별없이 a,b,c,d,e,f도 사용할 수 있다.

int result = integer.parseInt(”a”,16);의 경우 result에는 정수값 10이 저장된다.

```java
class StringEx7{
    public static void main(String[] args){
        String fullName = "Hello.java";

        int index = fullName.indexOf('.');

        String fileName = fullName.substring(0, index);

        String ext = fullName.substring(index+1);

        System.out.println(fullName + "확장자를 제외한 이름 :" + fileName);
        System.out.println(fullName + "의 확장자 :" + ext);
    }
}

/*
Hello.java확장자를 제외한 이름 Hello
Hello.java의 확장자 java
*/
```

Tip) end에서 start값을 빼면 subbstring에 의해 추출될 글자의 수가 된다.

substring의 철자에 주의하자. subString이라고 많이들 실수한다.

## StringBuffer클래스와 StringBuilder클래스

### StringBuilder클래스

왜 사용하는가?

String +”문자열“+”문자열“할때, 매번 새로운 인스턴스를 생성해야한다.

`인스턴스를 생성하지 않고 한 문자에 계속해서 붙여주는 클래스이다.`

.append()를 사용한다.

String클래스는 인스턴스를 생성할 때 지정된 문자열을 변경할 수 없지만 StringBuffer클래스는 변경이 가능하다.

### StringBuffer클래스

String + “문자열” + “문자열”을할때, 매번 새로운 인스턴스를 생성해야한다.

인스턴스를 생성하지 않고 16개의 버퍼를 두고 문자를 계속 추가하는 방식이다.

.append()는 concat()과 같은 결과를 내지만, 내부적으로 처리속도가 훨씬 빠르다.

`문자열을 추가,삭제,삽입하는일이 필요하다면 StringBuffer를 쓰는게 적합하다.`

짧게 다시 정리해보자.

Buffer에서 .append(), capacity(), delete()로 버퍼의 내용삭제, deleteCharAt(), insert()

### append()

```
StringBuffer str = new StringBuffer("Java");
System.out.println("문자열 : " + str);
System.out.println(str.append(" programming"));
System.out.println("append() 메서드 호출 후 문자열 : " + str);
```

//return

문자열 : Java
Java programming
append() 호출 후 : Java programming

### capacity()

```
StringBuffer str01 = new StringBuffer();
StringBuffer str02 = new StringBuffer("Java");
System.out.println(str01.capacity());
System.out.println(str02.capacity());
```

//return

16
20

### Insert()

```
StringBuffer str = new StringBuffer("Java Programming!!");
System.out.println("문자열 : " + str);
System.out.println(str.insert(4, "Script"));
System.out.println("insert() 메서드 호출 후 문자열 : " + str);
```

//return

문자열 : Java Programming!!
JavaScript Programming!!
insert() 호출 후 : JavaScript Programming!!

### delete()

```java
StringBuffer str = new StringBuffer("Java Oracle");
System.out.println("문자열 : " + str);
System.out.println(str.delete(4, 8));
System.out.println(str.deleteCharAt(1));
System.out.println("deleteCharAt() 호출 후  : " + str);
```

//return

문자열 : Java
Java programming
append() 호출 후 : Java programmin

내부적으로 문자열 편집을 위한 버퍼(buffer)를 가지고 있으며, StringBuffer인스턴스를 생성할 때 그 크기를 지정할 수 있다.

```java
public final class StringBuffer implements java.io.Serializable{
    private char[] value;
}
```

StringBuffer인스턴스가 생성될 때, char형 배열이 생성되며 이 때 생성된 char형 배열을 인스턴스변수 value가 참조하게 된다.

### StringBuffer의 생성자

StringBuffer인스턴스를 생성할 때, 버퍼의 크기를 지정해주지 않으면 16개의 문자를 저장할 수 있는 크기의 버퍼를 생성한다.

```java
public StringBuffer(int length){
    value = new char[length];
    shared = false;
}

public StringBuffer(){
    this(16); // 버퍼의 크기를 지정하지 않으면 버퍼의 크기는 16이된다.
}

public StringBuffer(String str){
   this(str.length() + 16); // 지정한 문자열의 길이보다 16이 더 크게 버퍼를 생성한다.
   append(str);
}
```

버퍼의 크기가 작업하려는 문자열의 길이보다 작을때는 내부으로 버퍼의 크기를 증가시키는 작업시 수행된다.

배열의 길이는 변경돌 수 없기에 새로운 길이의 배열을 생성한 후에 이전 배열의 값을 복사해야한다.

```java
char[] newValue = new char[newCapacity];

System.arraycpoy(value, 0, newValue, 0, count);
value = newValue; //StringBuffer클래스의 인스턴스 변수 value는 길이가 증가된 새로운 배열을 참조하게 된다.
```

### StringBuffer의 변경

```java
StringBuffer sb = new StringBuffer("abc");
sb.append("123"); // sb.append("123").append("ZZ");도 가능
sb.append("ZZ");
```

append()는 반환타입이 StringBuffer인데 자신의 주소를 반환한다.

그러므로 다시 append()를 호출할 수 있는것이다.

만일 append()의 반환타입이 void라면 이렇게 할 수 없었을 것이다.

### StringBuffer의 비교

StringBuffer클래스는 equals메서드를 오버라이딩하지 않아서 StringBuffer클래스의 equals메서드를 사용해도 등가비교연산자(==)로 비교한것과 같은 결과를 얻는다.

```java
class StringBufferEx1{
    public static void main(String[] args){
        StringBuffer sb = new StringBuffer("abc");
        StringBuffer sb2 = new StringBuffer("abc");

        System.out.println("sb == sb2 ? " + (sb == sb2));
        System.out.println("sb.equals(sb2) ? " + sb.equals(sb2));

        String s = sb.toString();
        String s2 = sb2.toString();

        System.out.println("s.equals(s2) ? " + s.equals(s2));
    }
}
```

//return
sb == sb2 ? false
sb.equals(sb2) ? false
s.equals(s2) ? true

toString()은 오버라이딩 되어 있기에, StringBuffer인스턴스에 toString()을 호출하면, 담고있는 문자열을 String으로 반환한다.

`즉, StringBuffer인스턴스에 담긴 문자열을 비교하기 위해서는 StringBuffer인스턴스에 toString()을 호출해서 String인스턴스를 얻은 다음, 여기에 equals메서드를 사용해서 비교해야한다.`

### StringBuffer클래스의 생성자와 메서드

| 메서드 | 설명 | 예제 | 결과 |
| --- | --- | --- | --- |
| StringBuffer() | 16문자를 담을 수 있는 버퍼를 가진 StringBuffer 인스턴스를 생성한다. | StringBuffer sb = new StringBuffer(); | sb = “” |
| StringBuffer(int length) | 지정된 개수의 문자를 담을 수 있는 버퍼를 가진 StringBuffer인스턴스를 생성한다. | StringBuffer sb = new StringBuffer(10); | sb = “” |
| StringBuffer(String str) | 지정된 문자열 값(str)을 갖는 StringBuffer 인스턴스를 생성한다. | StringBuffer sb = new StringBuffer(”Hi”); | sb = “Hi” |
| StringBuffer append(boolean b)
StringBuffer append(char c)
StringBuffer append(char[] str)
StringBuffer append(double d)
StringBuffer append(float f)
StringBuffer append(int i)
StringBuffer append(long l)
StringBuffer append(Object obj)
StringBuffer append(String str) | 매개변수로 입력된 값을 문자열로 반환하여 StringBuffer인스턴스가 저장하고 있는 문자열의 뒤에 덧붙인다. | StringBuffer sb= new StringBuffer(”abc”);
StringBuffer sb2 = sb.append(true);
sb.append(’d’).append(10.0f);
StringBuffer sb3 = sb.append(”ABC”).append(123); | sb = “abctrued10.0ABC123”
sb2 = “abctrued10.0ABC123”
sb3 = “abctrued10.0ABC123” |
| int capacity() | StringBuffer인스턴스의 버퍼크기를 알려준다.
length()는 버퍼에 담긴 문자열의 길이를 알려준다. | StringBuffer sb = new StringBuffer(100);
sb.append(”abcd”);
int bufferSize = sb.capacity();
int stringSize = sb.length(); | bufferSize = 100;
stringSize = 4
//sb에 담긴 문자열이 “abcd” |
| char charAt(int index) | 지정된 위치(index)에 있는 문자를 반환한다. | StringBuffer sb = new StringBuffer(”abc”);
char c = sb.charAt(2) | c = ‘c’ |
| StringBuffer delete(int start, int end) | 시작위치(start)부터 끝 위치(end) 사이에 있는 문자를 제거한다.
단, 끝 위치의 문자는 제외. | StringBuffer sb = new StringBuffer(”0123456”);
StringBuffer sb2 = sb.delete(3,6); | sb = “0126”
sb2 = “0126” |
| StringBuffer deleteCharAt(int index) | 지정된 위치(index)의 문자를 제거한다. | StringBuffer sb = new StringBuffer(”0123456”);
sb.deleteCharAt(3); | sb = “0123456” |
| StringBuffer insert(int pos, boolean b)
StringBuffer insert(int pos, char c)
StringBuffer insert(int pos, char[] str)
StringBuffer insert(int pos. double d)
StringBuffer insert(int pos, float f)
StringBuffer insert(int pos, int i)
StringBuffer insert(int pos, long l)
StringBuffer insert(int pos, Object obj)
StringBuffer insert(int pos, String str) | 두번째 매개변수로 받은 값을 문자열로 변환하여 지정된 위치(pos)에 추가한다.
pos는 0부터 시작 | StringBuffer sb= new StringBuffer(”0123456”);
sb.insert(4,’.’); | sb = “0123,456” |
| int length() | StringBuffer인스턴스에 저장되어 있는 문자열의 길이를 반환한다. | StringBuffer sb = new StringBuffer(”0123456”);
int length = sb.length(); | length = 7 |
| StringBuffer replace(int strat, int end, String str) | 지정된 범위(start~end)의 문자들을 주어진 문자열로 바꾼다.
end위치의 문자는 범위에 포함되지 않음(start≤ x < end) | StringBuffer sb = new StringBuffer(”0123456”);
sb.replace(3,6,”AB”); | sb = “012AB6” |
| StringBuffer reverse() | StringBuffer인스턴스에 저장되어 있는 문자열의 순서를 거꾸로 나열한다. | StringBuffer sb= new StringBuffer(”0123456”);
sb.reverse(); | sb = “6543210” |
| void setCharAt(int index, char ch) | 지정된 위치의 문자를 주어진 문자(ch)로 바꾼다. | StringBuffer sb= new StringBuffer(”0123456”);
sb.setCharAt(5,’o’); | sb = “01234o6” |
| void setLength(int newLength) | 지정된 길이로 문자열의 길이를 변경한다.
길이를 늘리는 경우에 나머지 빈 공간을 널문자 ‘\u0000’로 채운다. | StringBuffer sb= new StringBuffer(”0123456”);
sb.setLength(5);

StringBuffer sb2= new StringBuffer(”0123456”);
sb2.setLength(10);
String str = sb2.toString().trim(); | sb = “01234”
sb2 = “0123456    “
str = “0123456” |
| String toString() | StringBuffer인스턴스의 문자열을 String으로 반환 | StringBuffer sb= new StringBuffer(”0123456”);
String str = sb.toString(); | str = “0123456” |
| String substring(int start)
String substring(int start, int end) | 지정된 범위 내의 문자열을 String으로 뽑아서 반환한다.
시작위치(start)만 지정하면 시작위치부터 문자열 끝까지 뽑아서 반환한다. | StringBuffer sb = new StringBuffer(”0123456”);
String str = sb.substring(3);
String str2 = sb.substring(3,5); | str = “3456”
Str2 = “34” |

## 자주쓰는 것은 한번만 더 연습해보고 넘어가자.

### compareTo()

```java
class TestCompareTo {
    public static void main(String[] args) {
        String str = new String("abcd");
        System.out.println("문자열 : "+ str);
        System.out.println(str.compareTo("bcef"));
        System.out.println(str.compareTo("Abcd"));
        System.out.println(str.compareToIgnoreCase("Abcd"));
    }
}
```

compareTo는 누가 더 큰 기준으로 하는가?

str을 기준으로 한다.

str에 abcd의 주소가 담겨있고. 

abcd < bcef 이면, 사전순으로 str이 더 작기 때문에 -1로 표현된다.

### concat()

```java
class Testconcat {
    public static void main(String[] args) {
        String str = new String("Java");
        System.out.println(str.concat("수업"));
        System.out.println("concat 후 : "+ str);
    }
}
```

//return

Java수업
concat 후 : Java

### indexOf()

```java
class TestindexOf {
    public static void main(String[] args) {
        String str = new String("Oracle Java");
        System.out.println("문자열 : " +str);
        System.out.println(str.indexOf('o'));
        System.out.println(str.indexOf('a'));
        System.out.println(str.indexOf("Java"));
        System.out.println("indexOf() 후 : " + str);
    }
}
```

//return

문자열 : Oracle Java
-1
2
7
indexOf() 메서드 호출 후 원본 문자열 : Oracle Java

### StringBuilder란?

StringBuffer는 멀티쓰레드에 안전(Thread safe)하도록 동기화되어 있다.
동기화가 StringBuffer의 성능을 떨어뜨린다는것만 이해하면 된다.

멀티쓰레드로 작성된 프로그램이 아닌경우, StringBuffer의 동기화는 불필요하게 성능만 떨어뜨리게 된다.

그래서 StringBuffer에서 쓰레드의 동기화만 뺀 StringBuilder가 새로 추가되었다.

```java
StringBuffer sb; -> StringBuilder sb;
sb = new StringBuffer(); -> sb = new StringBuilder();
sb.append("abc");
```

StringBuffer도 충분히 성능이 좋기 때문에 성능향상이 반드시 필요한 경우를 제외하고는 기존에 작성한 코드에서 StringBuffer를 StringBuilder로 굳이 바꿀 필요는 없다.

지금까지 작성해온 프로그램은 전부 싱글 쓰레드로 작성된 것이다.

String으로 만든 객체는 변경될수 없다.

그래서 String객체는 항상 어떤 작업을 할때마다, 객체를 새로생성한다.

그래서 StringBuilder를 사용하면 객체를 만들고 어떤 작업을해도 처음에 만들어진 한가지 객체에서 작업을 계속 이어간다.

즉 String연산이 많아지면, StringBuilder를 사용한다.

## Math클래스

Math클래스의 생성자는 접근 제어자가 private이기 때문에 다른 클래스에서 Math인스턴스를 생성할 수 없게 되어있다.

그 이유는 클래스 내에 인스턴스변수가 하나도 없어서 인스턴스를 생성할 필요가 없기 떄문이다.

Math클래스의 메서드는 모두 static이며,

```java
public static final double E = 2.7182818284590452354;
public static final double PI = 3.14159265358979323846;
```

### 올림, 버림, 반올림

round() 메서드는 항상 소수점 첫째자리에서 반올림을 해서 정수값(long)을 결과로 돌려준다.9

예를들어, 90.7552라는 값을 소수점 셋째자리에서 반올림한 후 소수점 두 자리의 값만을 얻고 싶다.

```java
과정

1. 원래 값에 100을 곱한다.

    90.7552 * 100 -> 9075.52

2. 위의 결과에 Math.round()를 사용한다.

    Math.round(9075.52) -> 9076

3. 위의 결과를 다시 100.0으로 나눈다.

    9076 / 100.0 -> 90.76
    9076 / 100 -> 90
```

`100.0대신 100으로 나누면 정수형간의 연산이 되고 이 연산에서는 반올림이 이루어지지 않는다는걸 꼭 기억하자.`

```java
class MathEx1 {
    public static void main(String args[]) {
        double val = 90.7552;
        out.println("round(" + val + ")=" + round(val));

        val *= 100;
        out.println("round(" + val + ")=" + round(val));

        out.println("round(" + val + ")/100 = " + round(val) / 100);
        out.println("round(" + val + ")/100 = " + round(val) / 100.0);

        out.println();

        out.printf("ceil(%3.1f)=%3.1f%n", 1.1, ceil(1.1));
        out.printf("floor(%3.1f)=%3.1f%n", 1.1, floor(1.1));
        out.printf("round(%3.1f)=%d%n", 1.1, round(1.1));
        out.printf("round(%3.1f)=%d%n", 1.1, round(1.5));
        out.printf("rint(%3.1f)=%f%n", 1.5, rint(1.5));
        out.printf("round(%3.1f)=%d%n", -1.5, round(-1.5));
        out.printf("rint(%3.1f)=%f%n", -1.5, rint(-1.5));
        out.printf("ceil(%3.1f)=%f%n", -1.5, ceil(-1.5));
        out.printf("floor(%3.1f)=%f%n", -1.5, floor(-1.5));
    }
}

/*
round(90.7552)=91
round(9075.52)=9076
round(9075.52)/100 = 90
round(9075.52)/100 = 90.76

ceil(1.1)=2.0
floor(1.1)=1.0
round(1.1)=1
round(1.1)=2
rint(1.5)=2.000000 rint()도 round()처럼 소수점 첫 째자리에서 반올림하지만, 반환값이 double이다.
round(-1.5)=-1
rint(-1.5)=-2.000000 그리고 두 정수 정가운데 있는 값은 가장 가까운 짝수 정수를 반환한다. (-1.0은 홀수 ,-2.0은 짝수)
ceil(-1.5)=-1.000000
floor(-1.5)=-2.000000
*/
```

### 예외를 발생시키는 메서드

메서드 이름에 ‘Exact’가 포함된 메서드들이 jdk1.8부터 새로 추가되었는데, 

이들은 정수형간의 연산에서 발생할 수 있는 `오버플로우(overflow)를 감지하기 위한것이다.`

```java
int addExact(int x, int y); // x + y
int subtractExact(int x, int y); // x - y
int multiplyExcat(int x, int y); // x * y
int incrementExact(int a); // a++
int decrementExact(int a); // a--
int negateExact(int a); // -a
int toIntExact(long value); // (int)value - int로의 형변환
```

위 메서드들은 오버플로우가 발생하면, 예외(ArithmeticException)을 발생시킨다.

-a → “~a+1”

‘~a’의 결과가 int의 최대값이면, 여기에 1을 더하니, 오버플로우가 발생할 수 있는것이다.

```java
class MathEx2 {
    public static void main(String[] args) {
        int i = Integer.MIN_VALUE;

        out.println("i =" + i);
        out.println("-i=" + (-i));

        try {
            out.printf("negateExact(%d) = %d\n", 10, negateExact(10));
            out.printf("negateExact(%d) = %d\n", -10, negateExact(-10));
            out.printf("negateExact(%d) = %d\n", i, negateExact(i)); //예외발생
        } catch (ArithmeticException e) {
            out.printf("negateExact(%d) = %d\n", (long) i, negateExact((long) i));
        }
    }
}
```

### 삼각함수와 지수,로그

```java
class MathEx3 {
    public static void main(String args[]) {
        int x1 = 1, y1 = 1;
        int x2 = 2, y2 = 2;

        double c = sqrt(pow(x2-x1, 2) + pow(y2 - y1, 2));
        double a = c * sin(PI/4);
        double b = c * cos(PI/4); //double b = c * cos(toRadians(45));

        out.printf(" a= %f\n", a);
        out.printf(" b= %f\n", b);
        out.printf(" c= %f\n", c);
        out.printf("angle=%f rad\n", atan2(a,b));
        out.printf("angle=%f degree\n\n",atan2(a,b) * 180 / PI);
        out.printf("angle=%f degree\n\n", toDegrees(atan2(a,b)));
        out.printf("24 * log10(2)=%f\n", 24 * log10(2));
        out.printf("53 * log10(2)=%f\n\n", 53 * log10(2));
    }
}
```

atan2메서드는 직각 삼각형에서 두변의 길이 a,b를 알면 끼인각을 구해준다.

### StrictMath클래스

Math클래스는 최대한의 성능을 얻기위해 JVM이 설치된 OS의 메서드를 호출해서 사용한다.

OS에 의존적인 계산을 하고있는것이다.

처리 방법 설정이 OS마다 다를 수 있기 떄문에 자바로 작성된 프로그램임에도 불구하고 컴퓨터마다 결과가 다를 수 있다.

이러한 차이를 없애기 위해 성능은 다소 포기하는 대신, 어떤 OS에서 실행되어도 항상 같은 결과를 얻도록 Math클래스를 새로 작성한 것이 StrictMath클래스이다.

### Math클래스의 메서드

자주 쓰는것만 정리.

| 메서드 | 설명 | 예제 | 결과 |
| --- | --- | --- | --- |
| static double abs(double a)
static float abs(float f)
static int abs(int f)
static long abs(long f) | 주어진 값의 절대값을 반환한다. | int i = Math.abs(-10);
double d = Math.abs(-10.0); | i = 10
d = 10.0 |
| static double ceil(double a) | 주어진 값을 올림하여 반환한다. | double d = Math.ceil(10.1);
double d2 = Math.ceil(-10.1);
doubble d3 = Math.ceil(10.000015); | d = 11.0
d2 =-10.0
d3 = 11.0 |
| static double floor(double a) | 주어진 값을 내림하여 반환한다. | double d = Math.floor(10.8);
double d2 = Math.floor(-10.8); | d = 10.0
d2 = -11.0 |
| static double max(double a , double b)
static float max(float a, float b)
static int max(int a, int b)
static long max(long a, long b) | 주어진 두 값을 비교하여 큰 쪽을 반환한다. | double d = Math.max(9.5, 9.50001);
int i = Math.max(0, -1); | d = 9.50001
i = 0 |
| static double min(double a, double b)
static float min(float a, float b)
static int min(int a, int b)
static long min(long a, long b) | 주어진 두 값을 비교하여 작은 쪽을 반환한다. | double d = Math.min(0.5, 9.50001);
int i = Math.min(0, -1); | d = 9.5
i = -1 |
| static double random() | 0.0~1.0 범위의 임의의 double값을 반환한다. (1.0은 범위에 포함되지 않는다.) | double d = Math.random();
int i = (int)(Math.random() * 10)+1 | 0.0 ≤ d < 1.0
1 ≤ i < 11 |
| static double rint(double a) | 주어진 double값과 가장 가까운 정수값을 double형으로 반환한다.
단, 두 정수의 정가운데 있는 값(1.5, 2.5, 3.5 등)은 짝수를 반환 | double d = Math.rint(1.2);
double d2 = Math.rint(2.6);
double d3 = Math.rint(3.5);
double d4 = Math.rint(4.5); | d = 1.0
d2 = 3.0
d3 = 4.0
d4 = 4.0 |
| static long round(double a)
static long round(float a) | 소수점 첫째자리에서 반올림한 정수값(long)을 반환한다.
매개변수의 값이 음수인 경우, round()와 rint()의 결과가 다르다는 것에 주의하자. | long l = Math.round(1.2);
long l2 = Math.round(2.6);
long l3 = Math.round(3.5);
long l4 = Math.round(4.5);
double d = 90.7552;
double d2 = Math.round(d*100)/100.0; | l = 1
l2 = 3
l3 = -4
l4 = -5
d = 90.7552
d2 = 90.76 |

## 래퍼(warpper) 클래스

객체지향 개념에서는 모든것은 객체로 다루어져야한다.
그러나 자바에서는 8개의 기본형을 객체로 다루지 않는데 이것이 바로 자바가 완전한 객체지향 언어가 아니라는 얘기를 듣는 이유다.

`그 대신 높은 성능을 얻을 수 있었다.`

언제 사용하는가?

기본형(primitive type) 변수를 어쩔수 없이 객체로 다뤄야 하는경우.

매개변수로 객체를 요구할 때, 기본형 값이 아닌 객체로 저장해야할 때, 객체간의 비교가 필요할 때 등등의 경우에는 기본형 값들을 객체로 변환하여 작업을 수행해야한다.

이때 래퍼(wrapper)클래스를 사용한다.

래퍼 클래스의 생성자는 매개변수로 문자열이나 각 자료형의 값들을 인자로 받는다.

이때 주의해야할 것은 생성자의 매개변수로 문자열을 제공할 때, 각 자료형에 알맞는 문자열을 사용해야한다는것이다.

```java
public final class Integer extends Number implements Comparable{
    ...
    private int value; // 생성자의 인자로 주어진 각 자료형에 알맞은 값을 내부적으로 저장하고 있음.
    ...
}
```

Integer클래스의 실제코드

| 기본형 | 래퍼클래스 | 생성자 | 활용예 |
| --- | --- | --- | --- |
| boolean | Boolean | Boolean(boolean value)
Boolean(String s) | Boolean b = new Boolean(true);
Boolean b2 = new Boolean(”true”); |
| char | Character | Character(char value) | Character c = new Character(’a’); |
| byte | Byte | Byte(byte value)
Byte(String s) | Byte b = new Byte(10);
Byte b2 = new Byte(”10”); |
| short | Short | Short(short value)
Short(String s) | Short s = new Short(10);
Short s2 = new Short(”10”); |
| int | Integer | Integer(int value)
Integer(String s) | Integer i = new Integer(100);
Interger i2 = new Integer(”100”); |
| long | Long | Long(long value)
Long(String s) | Long l = new Long(100);
Long l2 = new Long(”100”); |
| float | Float | Float(double value)
Float(float value)
Float(String s) | Float f = new Float(1.0);
Float f2 = new Float(1.0)f;
Float f3 = new Float(”1.0f”); |
| double | Double | Double(double value)
Double(String s) | Double d = new Double(1.0);
double d2 = new Double(”1.0”); |

```java
class WrapperEX1{
    public static void main(String[] args){
        Integer i = new Integer(100);
        Integer i2 = new Integer(100);

        System.out.println("i == i2 ? " + (i==i2));
        System.out.println("i.equals(i2) ? "+i.equals(i2));
        System.out.println("i.compareTo(i2) = "+i.compareTo(i2)); // 사전순서로 비교
        System.out.println("i.toString() = "+i.toString());

        System.out.println("MAX_VALUE = " + Integer.MAX_VALUE);
        System.out.println("MIN_VALUE = " + Integer.MIN_VALUE);
        System.out.println("SIZE = " + Integer.SIZE+ "bits");
        System.out.println("BYTES = " + Integer.BYTES+ "bytes");
        System.out.println("TYPE = " + Integer.TYPE);
    }
}
```

//return

/*
i == i2 ? false
i.equals(i2) ? true
i.compareTo(i2) = 0
i.toString() = 100
MAX_VALUE = 2147483647
MIN_VALUE = -2147483648
SIZE = 32bits
BYTES = 4bytes
TYPE = int
*/

래퍼 클래스들은 모두 equlas()가 오버라이딩 되어 있어서 주소값이 아닌 객체가 가지고 있는 값을 비교한다.

하지만 오토박싱 된다고 해도 Integer객체에 비교 연산자를 사용할 수 없다. `대신 comapreTo()를 사용해야한다.`

toString또한 오버라이딩 되어있다. 이외에도 래퍼 클래스들은 MAX_VALUE,MIN_VALUE, SIZE, BYTES, TYPE등의 static상수를 공통적으로 가지고 있다.

### Number클래스

이 클래스는 추상클래스로 내부적으로 숫자를 멤버변수로 갖는 래퍼 클래스의 조상이다.

숫자와 관련된 래퍼 클래스들은 모두 NUMBER클래스의 자손이다.

- Object
    - Boolean
    - Character
        
        
    - Number
        1. Byte
        2. Short
        3. Integer
        4. Long
        5. Float
        6. Double
        7. BigInteger
        8. BigDecimal
        
    

BigInteger와 BigDecimal

BigInteger는 long으로도 다룰 수 없는 큰범위의 정수.

BigDecimal은 double로도 다룰 수 없는 큰 범위의 부동 소수점수를 처리하기 위한것.

```java
public abstract class Number implements java.io.Serializable{

    public abstract int intValue();
    public abstract long longValue();
    public abstract float floatValue();
    public abstract double doubleValue();

    public byte byteValue(){
        return (byte)intValue();
    }

    public short shortValue(){
        return (short)intValue();
    }

}
```

### 문자열을 숫자로 변환하기

```java
int i = new Integer("100").intValue();
int i2 = Integer.parseInt("100");
Integer i3 = Integer.valueOf("100");
```

| 문자열 → 기본형 | 문자열 → 래퍼 클래스 |
| --- | --- |
| byte b = Byte.parseByte(”100”);
short s = Short.parseShort(”100”);
int i = Integer.parseInt(”100”);
long l = Long.parseLong(”100”);
float f= Float.parseFloat(”3.14”);
double d = Double.parseDouble(”3.14”); | Byte b= Byte.valueOf(”100”);
Short s = Short.valueOf(”100”)
Integer i = Integer.valueOf(”100”);
Long l = Long.valueOf(”100”);
Float f = Float.valueOf(”3.14”);
Double d = Double.valueOf(”3.14”) |

jdk1.5부터 도입된 ‘오토박싱(autoboxing)’기능 떄문에 반환값이 기본형일때와 래퍼클래스일때의 차이가 없어졌다.

그냥 구별없이 valueOf를 쓰는것도 괜찮은 방법이다.

`단, 성능은 valueOf()가 조금 더 느리다.`

```java
static int parseInt(String s, int radix)

static Integer valueOf(String s, int radix)
```

```java
class WrapperEx2 {
    public static void main(String[] args) {
        int i = new Integer("100").intValue();
        int i2 = Integer.parseInt("100");
        Integer i3 = Integer.valueOf("100");

        int i4 = Integer.parseInt("100", 2);
        int i5 = Integer.parseInt("100", 8);
        int i6 = Integer.parseInt("100", 16);
        int i7 = Integer.parseInt("FF", 16);
        //int i8 = Integer.parseInt("FF"); // NumberFormatException 발생

        Integer i9 = Integer.valueOf("100", 2);
        Integer i10 = Integer.valueOf("100", 8);
        Integer i11 = Integer.valueOf("100", 16);
        Integer i12 = Integer.valueOf("FF", 16);
        //Integer i13 = Integer.valueOf("FF"); // NumberFormatException 발생

        System.out.println(i);
        System.out.println(i2);
        System.out.println(i3);
        System.out.println("100(2) -> " + i4);
        System.out.println("100(8) -> " + i5);
        System.out.println("100(16) -> " + i6);
        System.out.println("FF(16) -> " + i7);

        System.out.println("100(2) -> " + i9);
        System.out.println("100(8) -> " + i10);
        System.out.println("100(16) -> " + i11);
        System.out.println("FF(16) -> " + i12);
    }
}

/*
//return
100
100
100
100(2) -> 4
100(8) -> 64
100(16) -> 256
FF(16) -> 255
100(2) -> 4
100(8) -> 64
100(16) -> 256
FF(16) -> 255
*/
```

### 오토박싱 & 언박싱(Autoboxing & Unboxing)

jdk1.5이전에는 기본형과 참조형 간의 연산이 불가능 했기 때문에, 래퍼 클래스로 기본형을 객체로 만들어서 연산해야했다.

```java
int i = 5;
Integer iObj = new Integer(7);
int sum = i + iObj; // 에러. 기본형과 참조형 간의 덧셈 불가(jdk1.5이전)

//int sum = i + iObj.intValue(); // 컴파일러가 자동으로 타입에 맞는 값으로 변환해주는 메서드를 추가해줌.
```

그러나 이제는 기본형과 참조형 간의 덧셈이 가능하다.

컴파일러가 자동으로 변환하는 코드를 넣어주기 때문이다.

이 외에도 내부적으로 객체 배열을 가지고 있는 Vector클래스나 ArrayList클래스에 기본형 값을 저장해야할 때나 형변환이 필요할때도 컴파일러가 자동적으로 코드를 추가해준다.

```java
class WrapperEx3{
    public static void main(String[] args){
        int i = 10;

        Integer intg = (Integer)i;
        Object obj = (Object)i;

        Long lng = 100L;

        int i2 = intg + 10;
        long l = intg + lng;

        Integer intg2 = new Integer(20);
        int i3 = (int)intg2;

        Integer intg3 = intg2 + i3;

        System.out.println("i = " +i );
        System.out.println("intg = " + intg);
        System.out.println("obj = " + obj);
        System.out.println("lng = " + lng);
        System.out.println("intg + 10 = " + i2);
        System.out.println("intg + lng = " + i);
        System.out.println("intg2 = " + intg2);
        System.out.println("i3 = " +i3);
        System.out.println("intg2 + i3 = " + intg3);

    }
}
/*
//return
i = 10
intg = 10
obj = 10
lng = 100
intg + 10 = 20
intg + lng = 10
intg2 = 20
i3 = 20
intg2 + i3 = 40
*/
```

지금까지 배워온 것과는 달리 기본형과 참조형 간의 형변환도 가능할 뿐만 아니라, 심지어는 참조형간의 연산도 가능하다.

```java
Integer intg = (integer)i; -> Integer intg = Integer.valueOf(i);
Object obj = (Object)i; -> (Object)Integer.valueOf(i);
Long lng = 100L; -> Long lng = new Long(100L);
```

## 유용한 클래스

자주 사용되는 중요한 클래스들

### java.util.Objects 클래스

Object클래스의 보조 클래스로 모든 메서드가 ‘static’이다.

이 클래스는 객체의 비교나 null check에 유용하다.

### isNull, nonNull, requireNonnull

isNull()은 해당 객체가 널인지 확인해서 null이면 true를 반환하고 아니면 false를 반환한다.

즉, nonNull() == !Objects.isNull(obj)와 같다.

```java
static boolean isNull(Object obj)
static boolean nonNull(Object obj)
```

requireNonNull()은 해당 객체가 널이 아니어야하는 경우에 사용한다.

만일 객체가 널이면, NullPointerException을 발생시킨다.

두번째 매개변수로로 지정하는 문자열은 예외의 메시지가 된다.

```java
static <T> T requireNonNull(T obj)
static <T> T requireNonNull(T obj, String message)
static <T> T requireNonNull(T obj, Supplier<String> messageSupplier)
```

```java
void setName(String name){
    if(name == null)
        throw new NullPointerException("name must not be null");
    this.name = name;
}

// 매개변수의 유효성 검사 한줄로 끝낼 수 있음

void setName(String name){
    this.name = Objects.requireNonNull(name, "name must not be null");
}
```

### compare

Objects에는 compare()가 추가되었다.

compare()는 두 비교대상이 같으면 0, 크면 양수, 작으면 음수를 반환한다.

```java
static int compare(Object a, Object b, Comparator c)
```

### equals

Object클래스에 정의된 equals()는 Objects클래스에도 정의되어 있다.

Objects클래스의 equal()은 null검사를 하지 않아도 된다.

```java
if(a! =null && a.equal(b)){...}

if(Objects.equals(a,b){...} //매개변수의 값이 null인지 확인할 필요가 없다.
```

equals()의 내부에서 a와 b의 널 검사를 하기 때문에 따로 널 검사를 위한 조건식을 따로 넣지 않아도된다.

```java
public static boolean equals(Object a, Object b){
    reutrn (a == b) || (a != null && a.equals(b));
} // a와 b가 모두 null인 경우에는 참을 반환한다는점 빼고는 특별한것이 없다.
```

deepEquals메서드는 객체를 재귀적으로 비교하기 때문에 다차원 배열의 비교도 가능하다.

```java
String[][] str2D = new String[][]{{"aaa","bbb"},{"AAA","BBB"}};
String[][] str2D_2 = new String[][]{{"aaa","bbb"},{"AAA","BBB"}};

System.out.println(Objects.equals(str2D, str2D_2)); // false
System.out.println(Objects.deepEquals(str2D, str2D_2)); // true
```

위와 같이 두 2차원 문자열 배열을 비교할 때, equals()와 반복문을 함께사용해야하는데, deepEquals를 쓰면 간단히 끝난다.

### toString()

Objects의 toString()은 equals()처럼, 내부적으로 널검사를 한다.
또한 두번째 메서드 o가 널일때, null대신 사용할 값을 지정할 수 있어서 유용하다.

```java
static String toString(Object o)
static String toString(Object o, String nullDefault)
```

### hashCode

내부적으로 널검사를 한후, Object클래스의 hashCode()를 호출한다.

```java
static int hashCode(Object o)
static int hash(Object... values)
```

```java
class ObjectsTest{
    public static void main(String[] args){
        String[][] str2D = new String[][]{{"aaa","bbb"},{"AAA","BBB"}};
        String[][] str2D_2 = new String[][]{{"aaa","bbb"},{"AAA","BBB"}};

        System.out.print("str2D ={");
        for(String[] tmp : str2D)
            System.out.print(Arrays.toString(tmp));
        System.out.println("}");

        System.out.print("str2D_2{");
        for(String[] tmp : str2D_2)
            System.out.print(Arrays.toString(tmp));
        System.out.println("}");

        System.out.println("equals(str2D, str2D_2)=" + Objects.equals(str2D, str2D_2));
        System.out.println("deepEquals(str2D, str2D_2)=" + Objects.deepEquals(str2D, str2D_2));

        System.out.println("isNull(null) = " + Objects.isNull(null));
        System.out.println("nonNull(null) = " + Objects.nonNull(null));
        System.out.println("hashCode(null)= " + Objects.hashCode(null));
        System.out.println("toString(null)= " + Objects.toString(null));
        System.out.println("toString(null,\"\")= " + Objects.toString(null, ""));

        Comparator c= String.CASE_INSENSITIVE_ORDER; // 대소문자 구분 안하는 비교

        System.out.println("compare(\"aa\",\"bb\")= " +Objects.compare("aa","bb",c));
        System.out.println("compare(\"bb\",\"aa\")= " +Objects.compare("bb","aa",c));
        System.out.println("compare(\"ab\",\"AB\")= " +Objects.compare("ab","AB",c));

    }
}

/*
str2D ={[aaa, bbb][AAA, BBB]}
str2D_2{[aaa, bbb][AAA, BBB]}
equals(str2D, str2D_2)=false
deepEquals(str2D, str2D_2)=true
isNull(null) = true
nonNull(null) = false
hashCode(null)= 0
toString(null)= null
toString(null,"")= 
compare("aa","bb")= -1
compare("bb","aa")= 1
compare("ab","AB")= 0
*/
```

static import문을 사용했음에도 불구하고 Object클래스의 메서드와 이름이 같은 것들은 충돌이 난다.

즉, 컴파일러가 구별할 수 없으므로, 클래스의 이름을 붙여줄 수 밖에 없다.

String클래스에 상수로 정의되어 있는 Comparator를 사용해 compare()를 호출 했다.

## java.util.Random클래스

Math.random()은 내부적으로 Random클래스의 인스턴스를 생성해서 사용하는 것이므로 둘 중에서 편한것을 사용하면 된다.

```java
double randNum = Math.random();
double randNum = new Random().nextDouble();

int num = (int)(Math.random() * 6) + 1;
int num = new Random().nextInt(6) + 1;
```

Math.random()과 Random의 가장 큰차이점은, 종자값(seed)를 설정할 수 있다는점이다.
종자값이 같은 Random 인스턴스들은 항상 같은 난수를 같은 순서대로 반환한다.

### Random클래스의 생성자와 메서드

```java
public Random(){
    this.System.currentTimeMillis()); // Random(long seed)를 호출한다.
}
```

System.currentTimeMillis()는 현재시간을 천분의 1초단위로 변환해서 반환한다.

| 메서드 | 설명 |
| --- | --- |
| Random() | 현재시간(System.currentTimeMillis())을 종자값(seed)으로 이용하는 Random인스턴스를 생성한다. |
| Random(long seed) | 매개변수 seed를 종자값으로 하는 Random인스턴스를 생성한다. |
| boolean nextBoolean() | boolean타입의 난수를 반환한다. |
| void nextBytes(byte[] bytes) | bytes배열에 byte타입의 난수를 채워서 반환한다. |
| double nextDouble() | double타입의 난수를 반환한다.(0.0≤ x <1.0) |
| float nextFloat() | float타입의 난수를 반화나한다.(0.0 ≤ x <1.0) |
| double nextGaussian() | 평균은 0.0이고 표준편차는 1.0인 가우시안(Gaussian)분포에 따른 double형의 난수를 반환한다. |
| int nextInt() | int타입의 난수를 반환한다.(int의 범위) |
| int nextInt(int n) | 0 ~ n의 범위에 있는 int값을 반환한다. (n은 범위에 포함되지 않음.) |
| long nextLong() | long타입의 난수를 반환한다. (long의 범위) |
| void setSeed(long seed) | 종자값을 주어진 값(seed)으로 변경한다. |

```java
class RandomEx1{
    public static void main(String[] args){
        Random rand = new Random(1);
        Random rand2 = new Random(1);

        System.out.println("= rand =");
        for(int i = 0; i<5; i++)
            System.out.println(i + ":" + rand.nextInt());

        System.out.println();
        System.out.println("= rand2 =");
        for(int i = 0; i < 5 ; i++)
            System.out.println(i + ":" + rand2.nextInt());
    }
}

/*
= rand =
0:-1155869325
1:431529176
2:1761283695
3:1749940626
4:892128508

= rand2 =
0:-1155869325
1:431529176
2:1761283695
3:1749940626
4:892128508
*/
```

같은 종자값을 갖는 Random인스턴스는 시스템이나 실행시간 등에 관계없이 항상 같은 값을 같은 순서로 반환할 것을 보장한다.

연습

```java
class RandomEx2{
    public static void main(String[] args){
        Random rand = new Random();
        int[] number = new int[100];
        int[] counter = new int[10];

        for(int i = 0 ; i < number.length ; i++){
            System.out.print(number[i] = rand.nextInt(10));
        }
        System.out.println();

        for(int i = 0 ; i < number.length ; i++)
            counter[number[i]]++;

        for (int i = 0 ; i< counter.length ; i++)
            System.out.println( i + "의 개수 :" +printGraph('#',counter[i]) + " " + counter[i]);

    }

    public static String printGraph(char ch, int value){
        char[] bar = new char[value]; //value 크기 만큼의 char배열을 만든다.
        for (int i =0; i< bar.length; i++)
            bar[i] = ch; //배열에 모두 #을 넣는다.

        return new String(bar); //String으로 변환한후에 객체를 생성한다.
    }
}

/*
7299902147876473366977370830531060655311508909102104614447937995534513438929899005874794681263025251
0의 개수 :############ 12
1의 개수 :########## 10
2의 개수 :####### 7
3의 개수 :########### 11
4의 개수 :########## 10
5의 개수 :########## 10
6의 개수 :######## 8
7의 개수 :########### 11
8의 개수 :####### 7
9의 개수 :############## 14
*/
```

```java
class RandomEx3{
    public static void main(String[] args){
        for (int i = 0 ; i < 10 ; i++)
            System.out.print(getRand(5,10)+",");
        System.out.println();

        int[] result =fillRand(new int[10], new int[]{2,3,7,5});

        System.out.println(Arrays.toString(result));
    }

    public static int[] fillRand(int[] arr, int from, int to){
        for(int i = 0 ; i < arr.length; i++)
            arr[i] =getRand(from, to);
        return arr;
        // 배열 arr을 from과 to범위의 값들로 채워서 반환한다.
    }

    public static int[] fillRand(int[] arr, int[] data){
        for(int i = 0 ; i < arr.length; i++)
            arr[i] = data[getRand(0, data.length-1)];
        return arr;
        //배열 arr을 배열 data에 있는 값들로 채워서 반환한다.
    }

    public static int getRand(int from, int to){
        return (int)(Math.random() * (Math.abs(to-from)+1)) + Math.min(from, to);
        //from과 to범위의 정수(int)값을 반환한다. from과 to 모두 범위에 포함된다.
    }
}

```

자주 사용되는 코드는 메서드로 만들어 놓으면 여러모로 도움이 되므로 잘 정리해두자! → 자산이다.

```java
class RandomEx4{
    final static int RECORD_NUM = 10;
    final static String TABLE_NAME = "TEST_TABLE";
    final static String[] CODE1 = {"010","011","017","018","019"};
    final static String[] CODE2 = {"남자","여자"};
    final static String[] CODE3 = {"10대","20대","30대","40대","50대"};

    public static void main(String[] args){
        for(int i = 0 ; i < RECORD_NUM ; i++){
            System.out.println(" INSERT INTO " + TABLE_NAME
                    + "VALUES ("
                    + " '"  + getRandArr(CODE1) + "'"
                    + ", '" + getRandArr(CODE2) + "'"
                    + ", '" + getRandArr(CODE3) + "'"
                    + ", " + getRand(100,200) // 100~200 사이의 값을 얻는다.
                    + "); ");
        }
    }

    public static String getRandArr(String[] arr){
        return arr[getRand(arr.length-1)]; // 배열에 저장된 값 중 하나를 반환한다.
    }

    public static int getRand(int n) {return getRand(0,n);}

    public static int getRand(int from,int to){
        return (int)(Math.random() *(Math.abs(to-from+1)))+Math.min(from,to);
    }

}

/*
//return
INSERT INTO TEST_TABLE VALUES ( '011', '여자', '50대', 147); 
INSERT INTO TEST_TABLE VALUES ( '017', '여자', '10대', 124); 
INSERT INTO TEST_TABLE VALUES ( '018', '여자', '40대', 144); 
INSERT INTO TEST_TABLE VALUES ( '017', '여자', '10대', 198); 
INSERT INTO TEST_TABLE VALUES ( '019', '남자', '40대', 156); 
INSERT INTO TEST_TABLE VALUES ( '019', '여자', '20대', 146); 
INSERT INTO TEST_TABLE VALUES ( '010', '여자', '50대', 115); 
INSERT INTO TEST_TABLE VALUES ( '010', '남자', '20대', 117); 
INSERT INTO TEST_TABLE VALUES ( '019', '남자', '50대', 161); 
INSERT INTO TEST_TABLE VALUES ( '010', '여자', '40대', 185); 
*/
```

불연속적인 값을 배열에 저장한후, 배열의 index를 임의로 얻어서 배열에 저장된 값을 읽어오는법.

### 정규식(Regular Expression) - java.util.regex패키지

실무에서 연습 했었고 패턴은 필요할때 찾아서 하면된다.

Java에서의 사용법만 알고 넘어가자.

```java
class RegularEx1{
    public static void main(String[] args){
        String[] data = {"bat", "baby", "bonus", "cA", "ca", "co","c.","c0","car","combat","count","date","disc"};
        Pattern p = Pattern.compile("c[a-z]*");
            //정규식을 매개변수로 Pattern클래스의 static메서드인 Pattern compile(String regex)을 호출하여 Pattern인스턴스를 얻는다.
        for(int i = 0 ; i < data.length ; i++){
            Matcher m = p.matcher(data[i]);
            //정규식으로 비교할 대상을 매개변수로 Pattern클래스의 Matcher matcher(CharSequence input)를 호출해서 Matcher인스턴스를 얻는다.
            if(m.matches())
            //Matcher인스턴스에 boolean matches()를 호출해서 정규식에 부합하는지 확인한다.
                System.out.print(data[i] + ",");
        }
    }
}
```

Pattern은 정규식을 정의하는데 사용되고 Matcher는 정규식(패턴)을 데이터와 비교하는 역할을 한다.

```java
class RegularEx3{
    public static void main(String[] args){
        String source = "HP: 011-1111-1111, HOME : 02-999-9999 ";
        String pattern = "(0\\d{1,2})-(\\d{3,4})-(\\d{4})"; // ()으로 grouping을 할수 있다.

        Pattern p = Pattern.compile(pattern);
        Matcher m = p.matcher(source);

        int i = 0;
        while(m.find()){
            System.out.println( ++i + ": " + m.group() + " -> " + m.group(1)
                                + "," + m.group(2) + "," + m.group(3));
        }
    }
}
```

find()는 주어진 소스 내에서 패턴과 일치하는 부분을 찾아낸 다음, 다시 find를 호출하면 이전에 발견한 패턴과 일치하는 부분의 다음부터 다시 패턴매칭을 시작한다.

즉,위의 예제에서 while(m.find())는 011-1111-1111을 매칭 했다가, 02-999-9999를 다시 반복하여 매칭한다는 의미이다.

```java
class RegularEx4{
    public static void main(String[] args){
        String source = "A broken hand works, but not a broken heart.";
        String pattern = "broken";
        StringBuffer sb = new StringBuffer();

        Pattern p = Pattern.compile(pattern);
        Matcher m = p.matcher(source);
        System.out.println("source :" + source);

        int i = 0;

        while(m.find()){
            System.out.println(++i + "번째 매칭:"+ m.start() + "~" + m.end()); // m.start(),m.end()는 해당하는 index값을 반환한다.

            m.appendReplacement(sb, "drunken");
            /*
            처음으로 m.appendReplacement(sb, "drunken");가 호출되면
            source의 시작부터 "broken"을 찾은 위치까지의 내용에 "drunken"을 더해서 저장한다.

            //sb에 저장된 내용 : "A drunken"

            m.find()는 첫 번째로 발견된 위치의 끝에서부터 다시 검색을 시작하여 두 번째
            "broken"을 찾게 된다. 다시 m.appendReplacement(sb,"drunken");이 호출
            //sb에 저장된 내용 : "A drunken hand works, but not a drunken

            m.appendTail(sb);가 호출되면 마지막으로 치환된 이후의 부분을 sb에 덧붙인다.
            //sb에 저장된 내용 : "A drunken hand works, but not a drunken heart.
             */
        }
        m.appendTail(sb);
        System.out.println("Replacement count : "+ i);
        System.out.println("result : "+ sb.toString());

    }
}
```

## java.util.Scanner클래스

Scanner는 화면, 파일, 문자열과 같은 입력소스로 부터 문자데이터를 읽어오는데 도움을 줄 목적으로 jdk1.5부터 추가되었다.

```java
Scanner(String source)
Scanner(File source)
Scanner(InputStream source)
Scanner(Readable source)
Scanner(ReadableByteChannel source)
Scanner(Path source) // jdk1.7부터 추가
```

Scanner는 정규 표현식을 이용한 라인단위의 검색을 지원하며 구분자(delimiter)에도 정규 표현식을 사용할 수 있어서 복잡한 형태의 구분자도 처리가 가능하다.

```java
Scanner useDelimiter(Pattern pattern)
Scanner useDelimiter(String pattern)
```

jdk1.6부터는 화면 입출력만 전문적으로 담당하는 java.io.Console이 새로 추가되었다.

하지만 Console은 이클립스와 같은 IDE에서 잘 동작하지 않는다.

```java
// jdk1.5이전
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
String input = br.readLine();

// jdk1.5이후(java.util.Scanner)
Scanner s = new Scanner(System.in);
String input = s.nextLine();

// jdk1.6이후(java.io.Console) - 이클립스에서 작동안함.
Console console = System.console();
String input = console.readLine();
```

```java
boolean nextBoolean()
byte nextByte()
short nextShort()
int nextInt()
long nextLong()
double nextDouble()
float nextFloat()
String nextLine()
```

실제 입력된 데이터의 형식에 맞는 메서드를 사용하지 않으면, InputMismatchException이 발생한다.

### next()와 nextLine의 차이

next() → It read input from the input device till the space character.

nextLine() → It read input from the input device till the line change.

### 예제하나씩 다 뜯어보면서 깊이 이해하자.

```java
class ScannerEx1{
    public static void main(String[] args){
        Scanner s = new Scanner(System.in);
        String[] argArr = null;

        while(true){
            String prompt = ">>";
            System.out.print(prompt);
            String input = s.nextLine();

            input = input.trim();
            argArr = input.split(" +"); // 정규표현식임

            String command = argArr[0].trim();

            if("".equals(command)) continue;

            command = command.toLowerCase();

            if(command.equals("q")){ //
                System.exit(0);
            } else{
                for(int i = 0 ; i < argArr.length; i++)
                    System.out.println(argArr[i]);
            }
        }
    }
}
```

```java
class ScannerEx2{
    public static void main(String[] args) throws Exception{
        Scanner sc = new Scanner(new File("C:\\Users\\(Username)\\IdeaProjects\\Helloworld\\src\\data2.txt"));
        int sum = 0;
        int cnt = 0;

        while (sc.hasNextInt()){
            sum += sc.nextInt();
            cnt++;
        }

        System.out.println("sum" +sum);
        System.out.println("average="+ (double)sum/cnt);
    }
}
```

```java
class ScannerEx3{
    public static void main(String[] args) throws Exception{
        Scanner sc = new Scanner(new File("src/data3.txt"));
        int cnt = 0;
        int totalSum = 0;

        while (sc.hasNextLine()){
            String line = sc.nextLine();
            Scanner sc2 = new Scanner(line).useDelimiter(",");
            int sum = 0;

            while(sc2.hasNextInt()){
                sum += sc2.nextInt();
            }
            System.out.println(line + ", sum = "+ sum);
            totalSum += sum;
            cnt++;
        }
        System.out.println("line: " + cnt + ", Total: " + totalSum);
    }
}
```

‘,’를 구분자로 한라인에 여러 데이터가 저장되어있으면, 먼저 라인별로 읽은 다음에 다시 ‘,’를 구분자로 하는 Scanner를 이용해서 각각의 데이터를 읽어야한다.

### java.util.StringTokenizer클래스

StringTokenizer는 긴 문자열을 지정된 구분자(delimiter)를 기준으로 토큰(token)이라는 여러개의 문자열로 잘라내는 데 사용된다.

```java
1. StringTokenizer st = new StringTokenizer("100,200,300,400", ",");
2. String[] result = "100,200,300,400".split(",");
3. Scanner sc = new Scanner("100,200,300,400").useDelimiter(",");

// 3가지 모두 다 같은 결과를 얻는다.
// 2번 ,3번 방식의 경우, 정규표현식을 사용해야한다.
```

`Tokenizer는 인자로 String 과 Delimiter 넣는것만 기억하자 !`

```java
class Test {
    public static void main(String[] args) {
        String str = "This is a string example using StringTokenizer";
        StringTokenizer tokenizer = new StringTokenizer(str);
        System.out.println(str);
        System.out.println();

        System.out.println("total tokens : "+tokenizer.countTokens());
        while(tokenizer.hasMoreTokens()){
            System.out.println(tokenizer.nextToken());
        }

        System.out.println("total tokens : "+tokenizer.countTokens());
    }
}
```

StringTokenizer는 구분자로 단 하나의 문자 밖에 사용하지 못하기 때문에 보다 복잡한 형태의 구분자로 문자열을 나누어야 할 때는 어쩔 수 없이 정규식을 사용하는 메서드를 사용해야 할것이다.

- int countTokens()

남아있는 token의 개수를 반환한다. 전체 token의 개수가 아닌 현재 남아있는 token개수이다. 

- boolean hasMoreElemnets(), boolean hasMoreTokens()

두 메서드의 성능적인 차이는 없습니다. 둘다 동일한 값을 반환합니다.

메서드는 현재 위치 뒤에 있는경우 true, 아니면 false

- Object nextElement(), String nextToken()
- 다음의 토큰을 반환한다.

두가지 메서드는 같은 객체를 반환하는데 반환형은 다르다. 

nextElement는 Object를, nextToken은 String을 반환한다.

### Split()과 StringTokenizer의 차이는 뭘까?

- 반환의 측면
    1. StringTokenizer
    
    String str = “A,B,,C”;
    
    //return → A,B,C
    
    StringTokenizer는 공백을 반환하지 않는다.
    
    String str = “A,B,C,”;
    
    //return → A,B,C
    
    1. Split
    
    String str = “A,B,,C”;
    
    //return → A,B,’ ‘,C
    
    Split은 공백을 반환한다.
    
    String str = “A,B,C,”;
    
    //return → A,B,C;
    
    String split[] = str.split(”,”-1);
    
    //return → A,B,C,’’
    

- 속도의 측면
    
    Split은 인자로 regex를 사용한다.
    
    즉, 상대적으로 느리다. 
    
    StringTokenizer는 일반 문자열을 사용한다.
    
    즉, 상대적으로 빠르다.
    

| 생성자 / 메서드 | 설명 |
| --- | --- |
| StringTokenizer(String str, String delim) | 문자열(str)을 지정된 구분자(delim)로 나누는 StringTokenizer를 생성한다. (구분자는 토큰으로 간주되지 않음.) |
| StringTokenizer(String str, String delim, boolean returnDelims) | 문자열(str)을 지정된 구분자(delim)로 나누는 StringTokenizer를 생성한다.
returnDelims의 값을 true로 하면 구분자도 토큰으로 간주된다. |
| int countTokens() | 전체 토큰의 수 를 반환한다. |
| boolean hasMoreTokens() | 토큰이 남아있는지 알려준다. |
| String nextToken() | 다음 토큰을 반환한다. |

```java
class StringTokenizerEx1{
    public static void main(String[] args){
        String source = "100,200,300,400";
        StringTokenizer st = new StringTokenizer(source, ",");
        while(st.hasMoreTokens()){
            System.out.println(st.nextToken());
        }
    }
```

//return
100
200
300
400

```java
class StringTokenizerEx2{
    public static void main(String[] args){
        String expression = "x=100*(200+300)/2";
        StringTokenizer st = new StringTokenizer(expression, "+-*/=()",true);
        //세번째 매개변수를 true로 설정함으로써 구분자도 토큰으로 간주된다.
        while(st.hasMoreTokens()){
            System.out.println(st.nextToken());
        }
    }
}
```

//return
x
=
100
*
(
200
+
300
)
/
2

StringTokenizer는 단 한 문자의 구분자만 사용할 수 있기 때문에, “+-*/=()” 전체가 하나의 구분자가 아니라 각각의 문자가 모두 구분자라는 것에 주의해야한다.

만일 구분자가 두 문자 이상이라면, Scanner나 String클래스의 split메서드를 사용해야 한다.

```java
class StringTokenizerEx3{
    public static void main(String args[]){
        String source = "1,김천재,100,100,100|2,박수재,95,80,90|3,이자바,80,90,90";
        StringTokenizer st = new StringTokenizer(source,"|");

        while(st.hasMoreTokens()){
            String token = st.nextToken();
            StringTokenizer st2 = new StringTokenizer(token, ",");
            while(st2.hasMoreTokens())
                System.out.println(st2.nextToken());
            System.out.println("-----");
        }
    }
}
/*
//return
1
김천재
100
100
100
-----
2
박수재
95
80
90
-----
3
이자바
80
90
90
-----
 */
```

복습할 예제 논리 확실히 다 이해하기. // 얻어 갈게 많은 예제다.

```java
class StringTokenizerEx4{
    public static void main(String[] args){
        String input = "삼십만삼천백십오";
        System.out.println(input);
        System.out.println(hangulToNum(input));
    }

    public static long hangulToNum(String input){
        long result = 0;
        long tmpResult = 0;
        long num = 0;

        final String NUMBER = "영일이삼사오육칠팔구";
        final String UNIT = "십백천만억조";
        final long[] UNIT_NUM ={10,100,1000,10000,(long)1e8,(long)1e12};

        StringTokenizer st = new StringTokenizer(input, UNIT, true);

        while(st.hasMoreTokens()){
            String token = st.nextToken();
            int check = NUMBER.indexOf(token); // 숫자면 그대로, 아니면 -1반환함.

            if(check==-1){
                if("만억조".indexOf(token)==-1){
                    tmpResult += (num != 0 ? num : 1 ) * UNIT_NUM[UNIT.indexOf(token)];
                } else {
                    tmpResult += num;
                    result += (tmpResult != 0 ? tmpResult : 1) * UNIT_NUM[UNIT.indexOf(token)];
                }
                num = 0;
            } else{
                num = check;
            }
        }
        return result + tmpResult + num;
    }
}
/* //return
삼십만삼천백십오
303145
*/
```

```java
class StringTokenizerEx5{
    public static void main(String[] args){
        String data = "100,,,200,300";

        String[] result = data.split(",");
        StringTokenizer st = new StringTokenizer(data,",");

        for(int i=0; i< result.length;i++)
            System.out.print(result[i]+"|");

        System.out.println("개수 : " + result.length);

        int i =0;
        for(;st.hasMoreTokens();i++)
            System.out.print(st.nextToken() + "|");

        System.out.println("개수 : "+ i);
    }
}
/* //return 
100|||200|300|개수 : 5 <- split()
100|200|300|개수 : 3 <- StringTokenizer()
*/
```

split()은 빈 문자열도 토큰으로 인식하는 반면 StringTokenizer는 빈 문자열을 토큰으로 인식하지 않기 때문에 인식하는 토큰의 개수가 서로 다른것을 알 수 있다.

이 외에도 성능의 차이가 있는데, split()은 데이터를 토큰으로 잘라낸 결과를 배열에 담아서 반화나하기 때문에 데이터를 토큰으로 바로바로 잘라서 반환하는 StringTokenizer보다 성능이 떨어질 수 밖에 없다.

그러나 데이터의 양이 많은 경우가 아니라면 별 문제가 되지 않으므로 크게 신경쓸 부분은 아니다.

## java.math.Biginteger클래스

가장 큰 정수형 타입인 long으로 표현할 수 있는 값은 10진수 19자리 정도인데, 이보다 더 큰값을 다룰때 BigInteger를 사용한다.

BigInteger는 내부적으로 int배열을 사용해서 값을 다룬다.

그래서 long타입보다 훨씬 큰 값을 다룰 수 있는것이다.

대신 성능은 long타입보다 떨어질 수 밖에 없다.

```java
final int signum ; // 부호. 1(양수) 0, -1(음수) 셋중의하나
final int[] mag; // 값(magnitude);

BigInteger val 
```

BigInteger는 final로 선언되있으므로 Immutable이다.

부호를 따로 저장하고, 배열에는 값자체만 저장한다.

signum에 따라, 2의 보수법에 맞게 mag의 값을 변환해서 처리한다.

즉, 부호만 다른 두 값의 mag는 같고 signum은 다르다.

### BigInteger의 생성

문자열로 숫자를 표현하는것이 일반적이다.
정수형 리터럴로는 표현할 수 있는 값에 한계가 있기 때문이다.

// 큰값이라 리터럴로는 메모리에 선언도 안될듯하다.

```java
BigInteger val;
val = new BigInteger("12345678901234567890"); //문자열로 생성
val = new BigInteger("FFFF",16); // n진수(radix)의 문자열로 생성
val = BigInteger.valueOf(123456789L); // 숫자로 생성
```

### 다른 타입으로의 변환

BigInteger를 문자열, 또는 byte배열로 변환하는 메서드는 다음과 같다.

```java
String toString() // 문자열로 변환
String toString(int radix) // 지정된 진법(radix)의 문자열로 변환
byte[] toByteArray() // byte배열로 변환
```

BigInteger도 Number로부터 상속받은 기본형으로 변환하는 메서드들을 가지고 있다.

```java
int intValue()
long longValue()
float floatValue()
double doubleValue()

byte byteValueExact()
int intValueExact()
long longValueExact()
```

정수형으로 변환하는 메서드 중에서 이름 끝에 ‘Exact’가 붙은 것들은 변환한 결과가 변환한 타입의 범위에 속하지 않으면 ArithmeticException을 발생시킨다.

### BigInteger의 연산

```java
BigInteger add(BigInteger val) //this + val
BigInteger subtract(BigInteger val) //this - val
BigInteger multiply(BigInteger val) // this * val
BigInteger divide(BigInteger val) // this / val
BigInteger remainder(BigInteger val) // this %val
```

remainder와 mod는 둘다 나머지를 구하는 메서드지만, mod는 나누는값이 음수면 ArithmeticException을 발생시킨다는점이 다르다.

### 비트 연산 메서드

워낙 큰 숫자를 다루기 위한 클래스 이므로 성능을 향상키시기 위해 비트단위로 연산을 수행하는 메서드들을 많이 가지고 있다.

```java
int bitCount() // 2진수로 표현했을 때, 1의 개수(음수는 0의 개수)를 반환
int bitLength() // 2진수로 표현했을 때, 값을 표현하는데 필요한 bit수
boolean testBit(int n) // 우측에서 n+1번째 비트가 1이면 true, 0이면 false
BigInteger setBit(int n) // 우측에서 n+1번째 비트를 1로 변경
BigInteger clearBit(int n) // 우측에서 n+1번째 비트를 0으로 변경
BigInteger flipBit(int n) // 우측에서 n+1번째 비트를 전환(1->0, 0->1)
```

n의 값은 배열의 index처럼 0부터 시작하므로, 우측에서 첫번째 비트는 n이 0이다.

### BigInteger에서 정수가 짝수인지 확인 하는법.

```java
BigInteger bi = new BigInteger(”4”);
if(bi.remainder(new BigInteger(”2”)).equals(BigInteger.ZERO)){...}
```

이렇게 계산하지 말고, 짝수는 제일 오른쪽 비트가 0이다.

즉, testBit(0)으로 마지막 비트를 0인지 확인해서 짝수인지 구별하는게 훨씬 효율적이다.

```java
BigInteger bi = new BigInteger("4");
if(!bi.testBit(0)){} //또는 if(bi.testBit(0) == false)
```

가능하면 산술연산 대신 비트연산으로 처리하자.

```java
class BigIntegerEx{
    public static void main(String[] args) throws Exception{
        for (int i = 1; i< 100; i++){
            System.out.printf("%d! = %s %n", i ,calcFactorial(i));
            Thread.sleep(300);
        }
    }

    static String calcFactorial(int n){
        returnfactorial(BigInteger.valueOf(n)).toString();
    }

    static BigInteger factorial(BigInteger n){
        if(n.equals(BigInteger.ZERO))
            return BigInteger.ONE;
        else // return n * factorial(n-1);
        return n.multiply(factorial(n.subtract(BigInteger.ONE)));
    }
}
```

BigInteger로는 99!까지, 그 이상도 얼마든지 가능하다.

BigInteger의 최대값은 $\pm2^{Integer.MAX\_VALUE}$

MAX_VALUE는 10진수로 10의 6억 제곱이다. 

### java.math.BigDecimal클래스

double타입으로 표현할 수 있는 값은 상당히 범위가 넓지만 정밀도가 최대 13자리 밖에 되지 않고 실수형의 특성상 오차를 피할 수 없다.

BigDecimal은 실수형과 달리 정수를 이용해서 실수를 표현한다.

실수의 오차는 10진 실수를 2진 실수로 정확히 변환할 수 없는 경우가 있기 때문에 발생한다.

그렇기 때문에 오차가 없는 2진 정수로 변환하여 다루는것이다.

$정수 \times 10^{-scale}$

scale은, 0부터 Integer.MAX_VALUE사이의 범위에 있는 값이다.

BigDecimal은 정수를 저장하는데 BigInteger를 사용하ㅏㄴ다.

BigInteger처럼 BigDecimal도 Immutable이다.

```java
private final BigInteger intVal; //정수(unsacled value)
private final int scale; //지수(sacle)
private transient int precision; //정밀도(precision) - 정수의 자릿수
```

```java
BigDecimal val = new BigDecimal("123.45"); // 12345*10^{-2}
System.out.println(val.unscaledValue()); // 12345
System.out.println(val.scale()); // 2
System.out.println(val.precision()); // 5
```

### BigDecimal의 생성

```java
Bigdecimal val;

val = new BigDecimal(”123,4567890”); // 문자열로 생성
val = new BigDecimal(123.456); // double타입의 리터럴로 생성
val = new BigDeicmal(123456); // int, long타입의 리터럴로 생성가능
val = BigDecimal.valueOf(123,456); // 생성자 대신 valueOf(double)사용
val = BigDecimal.valueOf(123456); // 생성자 대신 valueOf(int)사용

System.out.println(new BigDecimal(0.1)); // 0.10000000000000000555111...
System.out.println(new) // 0.1
```

double타입의 값을 매개변수로 갖는 생성자를 사용하면 오차가 발생할 수 있다.

### 다른 타입으로의 변환

```java
String toPlainString() // 오직 숫자로만 표현가능.
String toString() // 필요하면 지수형태로 표현할 수 있음.

BigDecimal val = new BigDecimal(1.0e-22);
System.out.println(val.toPlainString()); // 0.00000000000000000000010...
System.out.println(val.toString()); // 1.000000000000000048...5E-22
```

BigDecimal의 기본형 변환 메서드

```java
int intValue()
long longValue()
float floatValue()
double doubleValue()
```

BigDecimal을 정수형으로 변환하는 메서드 중에서 이름 끝에 ‘Exact’가 붙은 것들은 변환한 결과가 변환한 타입의 범위에 속하지 않으면 ArtithmeticException을 발생시킨다.

```java
byte byteValueExact()
short shortValueExact()
int intValueExact()
long longValueExact()
BigInteger toBigIntegerExact()
```

### BigDecimal의 연산

BigInteger와 같으니 위를 참고하자.

반환타입이 BigDeimal인 경우 새로운 인스턴스가 반환된다.

```java
                                            //value,  scale, precision
BigDecimal bd1 = new BigDecimal("123.456"); //123456,   3,       6
BigDecimal bd2 = new BigDecimal("1.0");     //10,       1,       2
BigDecimal bd3 = bd1.multiply(bd2);         //1234560,  4,       7
```

곱셈에서는 두 피연산자의 scale을 더하고, 나눗셈에서는 뺸다.

덧셈과 뺄셈에서는 둘 중에서 자리수가 높은 쪽으로 맞추기 위해서 두 scale중에서 큰쪽이 결과가 된다.

### 반올림 모드 - divide()와 setScale()

나눗셈의 결과를 어떻게 반올림(roundingMode)처리할 것인가와, 몇번째 자리(scale)에서 반올림할 것인지를 지정할 수 있다.

BigDecimal이 아무리 오차없이 실수를 저장한다해도 나눗셈에서 발생하는 오차는 어쩔 수 없다.

```java
BigDecimal divid(BigDecimal divisor)
BigDecimal divide(BigDecimal divisor, int roundigMode)
BigDecimal divide(BigDecimal divisor, RoundingMode roundingMode)
BigDecimal divide(BigDecimal divisor, int scale, int roundingMode)
BigDecimal divide(BigDecimal divisor, int scale, RoundingMode roundingMode)
BigDecimal divide(BigDecimal diviosor, MathContext mc)
```

| 상수 | 설명 |
| --- | --- |
| CEILING | 올림 |
| FLOOR | 내림 |
| UP | 양수일 때는 올림, 음수일때는 내림 |
| DOWN | 양수일 때는 내림, 음수일때는 올림 |
| HALF_UP | 반올림(5이상 올림, 5미만 버림) |
| HALF_EVEN | 반올림(반올림 자리의 값이 짝수면 HALF_DOWN, 홀수면 HALF_UP) |
| HALF_DOWN | 반올림(6이상 올림, 6미만 버림) |
| UNNECESSARY | 나눗셈의 결과가 딱 떨어지는 수가 아니면, ArithmeticException 발생 |

```java
BigDecimal bigd = new BigDecimal("1.0");
BigDecimal bigd2 = new BigDecimal("3.0");

System.out.println(bigd.divide(bigd2)); //ArithmeticException 발생.
System.out.println(bigd.divide(bigd2, 3, RoundingMode.HALF_UP)); // 0.333
```

### java.math.MathContext

이 클래스는 반올림 모드와 정밀도(precision)을 하나로 묶어 놓은것이다.

divide()에서는 scale이 소수점 이하의 자리수를 의미하는데, MathContext에서는 precision이 정수와 소수점 이하를 모두 포함한 자리수를 의미한다는 것이다.

```java
BigDecimal bd1 = new BigDecimal("123.456");
BigDecimal bd2 = new BigDecimal("1.0);

System.out.println(bd1.divide(bd2,2,HALF_UP)); // 123.46
System.out.println(bd1.divide(bd2,new MathContext(2,HALF_UP))); // 1.2E+2
```

MathContext를 이용한 결과는 precision을 가지고 반올림 하므로 bd1의 precision인 12346에서 세 번째 자리에서 반올림해서 precision은 12000이 아니라 12가 된다. 여기에 scale이 반영되어 ‘1.2E+2’가 된다.

### scale의 변경

BigDecimal을 10으로 곱하거나 나누는 대신 scale의 값을 변경함으로써 같은 결과를 얻을 수 있다.

BigDecimal의 scale을 변경하려면, setSacle()을 이용하면 된다.

```java
BigDecimal setScale(int newScale)
BigDecimal setScale(int newScale, int roundingMode)
BigDecimal setScale(int newScale, RoundingMode mode)
```

setScale()로 scale값을 줄이는 것은 10의 n제곱으로 나누는것과 같으므로, divide()를 호출할 때 처럼 오차가 발생할 수 있고 반올림모드로 지정해 주어야한다.
