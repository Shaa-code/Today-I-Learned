# 애너테이션(Annotation)

### 애너테이션이란?

프로그램의 소스코드 안에 다른 프로그램을 위한 정보를 미리 약속된 형식으로 포함 시킨것.

애너테이션은 주석처럼 프로그래밍 언어에 영향을 미치지 않으면서도 다른 프로그램에 유용한 정보를 제공할 수 있다는 장점이 있다.

```java
@Test // 이 메서드가 테스트 대상임을 테스트 프로그램에게 알린다.
public void method() {...}
```

테스트 프로그램에게 테스트할 메서드를 일일이 알려주지 않고, 해당 메서드 앞에 애너테이션만 붙이면된다.

JDK에서 제공하는 표준 애너테이션은 주로 컴파일러를 위한 것으로 컴파일러에게 유용한 정보를 제공한다.

### 표준 애너테이션

| @Override | 컴파일러에게 오버라이딩하는 메서드라는것을 알린다. |
| --- | --- |
| @Deprecated | 앞으로 사용하지 않을 것을 권장하는 대상에 붙인다. |
| @SuprressWarnings | 컴파일러의 특정 경고메시지가 나타나지 않게 해준다. |
| @SafeVarags | 지네릭스 타입의 가변인자에 사용한다. (jdk1.7) |
| @FunctionalInterface | 함수형 인터페이스라는 것을 알린다. |
| @Native | native메서드에서 참조되는 상수 앞에 붙인다. (jdk1.9) |
| @Target* | 애너테이션이 적용가능한 대상을 지정하는데 사용된다. |
| @Documneted* | 애너테이션 정보가 javadoc으로 작성된 문서에 포함되게 한다. |
| @Inherited* | 애너테이션이 자손 클래스에 상속되도록 한다. |
| @Retention* | 애너테이션이 유지되는 범위를 지정하는데 사용한다. |
| @Repeatable* | 애너테이션을 반복해서 적용할 수 있게 한다. (jdk1.8) |

### @Override

메서드 앞에만 붙일 수 있는 애너테이션으로, 조상의 메서드를 오버라이딩하는것이라는걸 컴파일러에게 알려주는 역할을 한다.

```java
class Parent{
    void parentMethod() {}
}

class Child extends Parent{
    @Override
    void parentmethod() {} // 오버라이딩하려 했으나 실수로 이름을 잘못적음
}
```

//return

C:\Users\Shaa\IdeaProjects\Helloworld\src\hi.java:45:9
java: method does not override or implement a method from a supertype

`컴파일러가 같은 이름의 메서드가 조상에 있는지 확인하고 없으면, 에러메시지를 출력한다.`

필수는 아니지만, 알아내기 어려운 실수를 미연에 방지해주므로 반드시 붙이도록하자!

### @Deprecated

더 이상 사용되지 않는 필드나 메서드에 ‘@Deprecated’를 붙인다.

ex)

Java API DATE클래스의 getDate()의 코드

```java
int getDate()
    Deprecated.
    As of JDK version 1.1, replaced by Calendar.get(Calendar.DAY_OF_MONTH)
```

```java
class NewClass{
    int newField;
    int getNewField() {return newField;}

    @Deprecated int oldField;
    @Deprecated int getOldField() {return oldField;}
}

class AnnotationEx2{
    public static void main(String[] args) {
        NewClass nc = new NewClass();
        nc.oldField = 10;
        System.out.println(nc.getOldField());
    }
}
```

IDE마다 다른것 같은데, -Xlint : deprecation이라고 표시를 해줌.

Intellij는 그냥 밑줄을 그어서 표시해줌. 

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8cc72837-30ec-4fe0-ba21-fc954e59adf7/Untitled.png)

//return

10

컴파일시에 ‘-Xlint:deprecation’옵션을 붙여서 다시 컴파일하면, 자세한 내용을 보여준다.

### @FunctionalInterface

컴파일러가 ‘함수형 인터페이스’를 올바르게 선언했는지 확인하고, 잘못된 경우 에러를 발생시킨다.

```java
@FunctionalInterface
public interface Runnable{
    public abstract void run(); // 추상메서드
}
```

함수형 인터페이스는 추상 메서드가 하나뿐이어야한다는 제약이 있다.

필수는 아니지만, 붙이면 실수를 방지할 수 있으므로 ‘함수형 인터페이스’를 선언할 때는 이 애너테이션을 반드시 붙이자.

### @SuppressWarnings

컴파일러가 보여주는 경고메시지가 나타나지 않게 억제해준다.

```java
@SuppressWarnings("unchecked")    //지네릭스와 관련된 경고를 억제
ArrayList list = new ArrayList(); //지네릭 타입을 지정하지 않음.
list.add(obj);                    //여기서 경고 발생

@SuppressWarnings({"deprecation","unchecked","varargs"})
```

묵인해야 하는 경고가 발생하는 대상에 반드시 ‘@SuppressWarnings’를 붙여서 컴파일 후에 어떤 경고 메시지도 나타나지 않게 해야한다.

jdk버젼이 올라가면서 계속 추가되고있다.

주로 사용되는건, “deprecation”, “unchecked”, “rawtypes”, “varargs”정도가 있다.

deprecation → @Deprecated로 발생한 경고

unchecked → 지네릭스로 타입을 지정하지 않았을때 발생하는 경고

rawtypes → 지네릭스를 사용하지 않아서 사용하는 경고

varargs → 가변인자의 타입이 지네릭타입일때 발생하는 경고

들을 억제할때사용한다.

```java
class NewClass{
    int newField;

    int getNewField(){
        return newField;
    }

    @Deprecated
    int oldField;

    @Deprecated
    int getOldField(){
        return oldField;
    }
}

class AnnotationEx3{
    @SuppressWarnings("deprecation")
    public static void main(String[] args) {
        NewClass nc = new NewClass();

        nc.oldField = 10;
        System.out.println(nc.getOldField());

        @SuppressWarnings("unchecked")
        ArrayList<NewClass> list = new ArrayList<>();
        list.add(nc);
    }
}
```

//return

10

합쳐서 main에 @SuppressWarnings({"deprecation","unchecked"})이렇게 선언할 수도 있는데,

`나중에 추가된 코드에서 발생할 수도 있는 경고까지 억제될 수 있어서 바람직하지 않다.`

### @SafeVarargs // 다시 복습할것.

언제사용하는가?

이 타입은 타입안정성이 있다고 컴파일러에게 알릴때 사용한다.

asList()가 호출되는 부분을 컴파일러가 체크해서 타입 T가 아닌 다른타입이 못들어가게되어있다.

하지만, Object[]파일은 모든 타입의 객체가 들어갈수있어서 위험하다고 경고를낸다.

이때 ArrayList<T>를 생성하려고할때, 안정성을 컴파일러에게 알려서 경고가 발생하지 않도록 한다.

refiable == re + ify + able 다시 ~화 할 수있는 (컴파일 후에도 타입정보가 유지도면 reifiable 타입이다.

메서드에 선언된 가변인자의 타입이 non-reifiable타입일 경우, 해당 메서드를 선언하는 부분과 호출하는 부분에서 unchecked 경고가 발생한다.

해당코드에 문제가 없다면 이 경고를 억제하기 위해 ‘@SafeVarargs’를 사용해야한다.

static이나 final이 붙은 메서드와 생성자에만 붙일수 있다.

즉, 오버라이드 될 수 있는 메서드에는 사용할 수 없다.

컴파일이후에도 제거되지 않는 타입 reifiable타입, 제거되는 타입 non-reifiable타입

@SafeVarargs로 ‘unchecked’ 경고는 억제할 수 있지만, ‘varargs’경고는 억제할수 없다.

습관적으로 SafefVarargs와 SuppressWarning(”varargs”)를 같이 붙여야한다.

```java
@SafeVarargs                 // 'unchecked'경고를 억제한다.
@SuppressWarning("varargs")  // 'varargs'경고를 억제한다.
public static <T> List<T> asList(T... a){
    return new ArrayList<>(a);
}
```

@SupressWanrnings(”varargs”)를 붙이지 않아도 경고없이 컴파일 된다.

-Xlint옵션을 붙여서 컴파일 해보면, ‘varargs’경고가 발생한것을 확인할 수 있다. 그래서 가능하면 이 두 애너테이션을 항상 같이 사용하는것이 좋다.

### 메타 애너테이션

애너테이션에 붙이는 애너테이션으로 애너테이션을 정의할 때, 애너테이션의 적용대상(Target)이나 유지기간(Retention)등을 지정하는데 사용된다. 

### @Target

애너테이션이 적용가능한 대상을 지정하는데 사용된다.

```java
@Target({TYPE,FIELD,METHOD, PARAMETER,CONSTRUCTOR, LOCAL_VARIABLE})
@Retention(RetentionPolicy.SOURCE)
public @interface SuppressWarnings {
    String[] value();
}
```

| 대상 타입 | 의미 |
| --- | --- |
| ANNOTATION_TYPE | 애너테이션 |
| CONSTRUCTOR | 생성자 |
| FIELD | 필드(멤버변수, enum상수) |
| LOCAL_VARIABLE | 지역변수 |
| METHOD | 메서드 |
| PACKAGE | 패키지 |
| PARAMETER | 매개변수 |
| TYPE | 타입(클래스, 인터페이스, enum) |
| TYPE_PARAMETER | 타입 매개변수(jdk 1.8) |
| TYPE_USE | 타입이 사용되는 모든곳(jdk1.8) |

```java
import static java.lang.annotation.ElementType.*;

@Tartget({FIELD, TYPE, TYPE_USE}) // 적용대상이 FIELD, TYPE, TYPE_USE
public @interface MyAnnotation {} //

@MyAnnotation // 적용대상이 TYPE인 경우
class MyClass{
    @MyAnnotation // 적용대상이 FIELD인 경우
    int i;

    @MyAnnotation // 적용대상이 TYPE_USE인 경우
    MyClass mc;
}
```

### @Retention

애너테이션이 유지(retetion)되는 기간을 지정하는데 사용된다.

애너테이션의 유지 정책(retetion policy)의 종류는 다음과 같다.

| 유지 정책 | 의미 |
| --- | --- |
| SOURCE | 소스 파일에만 존재. 클래스 파일에는 존재 하지 않음. |
| CLASS | 클래스 파일에 존재, 실행시에 사용 불가. 기본값 |
| RUNTIME | 클래스 파일에 존재, 실행시에 사용가능. |

컴파일러가 사용하는 애너테이션은 유지정책이 ‘SOURCE’이다.

컴파일러를 직접 작성할것이 아니면 이 유지정책은 필요없다.

```java
@Target (ElementType.METHOD)
@Retention(RetentionPolicy.SOURCE)
public @interface Override {}
```

유지 정책을 ‘RUNTIME’으로 하면, 실행 시에 ‘리플렉션(reflection)’을 통해 클래스 파일에 저장된 애너테이션의 정보를 읽어서 처리할 수 있다.

‘@FucntionalInterface’는 ‘@Override’처럼 컴파일러가 체크해주는 에너테이션이지만, 실행 시에도 사용되므로 유지정책이 ‘RUNTIME’으로 되어있다.

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface FunctionalInterface()
```

유지정책 ‘CLASS’는 컴파일러가 애너테이션의 정보를 클래스 파일에 저장할 수 있게는 하지만, 클래스 파일이 JVM에 로딩 될 때는 애너테이션의 정보가 무시되어 실행시에 애너테이션에 대한 정보를 얻을 수 없다.

이것이 ‘CLASS’가 유지정책의 기본값임에도 불구하고 잘 사용되지 않는 이유이다.

지역변수에 붙은 애너테이션은 컴파일러만 인식할 수 있으므로, 유지정책이 ‘RUNTIME’인 애너테이션을 지역변수에 붙여도 실행시에는 인식되지 않는다.

### @Documented

애너테이션에 대한 정보가 javadoc으로 작성한 문서에 포함되도록 한다.

자바에서 제공하는 기본 애너테이션 중에 ‘@Override’와 ‘@SuppressWarnings를 제외하고는 모두 이 메타애너테이션이 붙어있다.

### @Inherited

애너테이션이 자손 클래스에 상속되도록 한다.

조상클래스에 이 애너테이션을 붙이면, 자손클래스도 이 이너테이션이 붙은것과 같이 인식된다.

```java
@Inherited //SupperAnno가 자손까지 영향을 미치게함.
@interface SupperAnno{}

@SuperAnno
class Parent{}
class Child extends Parent{} // CHild에 에너테이션이 붙은것으로 인식

```

### @Repeatable

Repeatable가 붙은 애너테이션은 여러번 붙일 수 있다.

```java
@Repeatable (ToDOs.class)
@interface ToDo{
    String value();
}
```

예를 들어, @ToDo라는 애너테이션이 위와 같이 정의되어 있을 때, 다음과 같이 MyClass클래스에 ‘@ToDo’를 여러번 붙이는것이 가능하다.

```java
@ToDo(”delete test codes.”)

@ToDo(”override inherited methods”)

class MyClass{

    ...

}
```

일반적인 애너테이션과 달리 같은 이름의 애너테이션이 여러개가 하나의 대상에 적용될 수 있기 떄문에, 이 애너테이션들을 하나로 묶어서 다룰 수 있는 애너테이션도 추가로 정의해야한다.

```java
@interface ToDOs {// 여러개의 ToDo애너테이션을 담을 컨테이너 ToDos
    ToDo[] value(); // ToDo애너테이션 배열타입의 요소를 선언. 이름이 반드시 value이어야함
}

@Repeatable(ToDos.class) // 괄호안에 컨테이너 애너테이션을 지정해줘야한다.
@interface ToDo{
    String value();
}
```

### @Native

네이티브 메서드(native method)에 의해 참조되는 ‘상수 필드(constant field)에 붙이는 애너테이션이다.

```java
@Native public static final long MIN_VALUE = 0x8000000000000000L;
```

`네이티브 메서드는 JVM이 설치된 OS의 메서드를 말한다.`

네이티브 메서드는 보통 C언어로 작성되어 있는데,  자바에서는 메서드의 선언부만 정의하고 구현은 하지 않는다.

그래서 추상 메서드처럼 선언부만 있고 몸통이없다.

```java
public class Object{
    private static native void registerNatives();
    static {
        registerNatives();
    }

    protected native Object clone() throws CloneNotSupportedException;
    public final native Class<?> getClass();
    public final native void notify();
    public final native void notifyAll();
    public final native void wait(long timeout) throws InterruptedException;
    public native int hashCode();
    ...
}
```

이처럼 Object클래스의 메서드들은 대부분 네이티브 메서드이다.

호출하는 방법은 자바의 일반 메서드와 다르지 않다. 하지만실제로 호출되는것은 OS의 메서드이다.

아무런 내용도 없는 네이티브 메서드를 선언해 놓고 호출한다고 되는 것은 아니고,

자바에 정의된 네이티브 메서드와 OS의 메서드를 연결해주는 작업이 추가로 필요하다.

이 역할은 JNI(Java Native Interface)가 한다. → 책의 범위를 벗어남.

### 애너테이션 타입 정의하기

```java
@interface 애너테이션이름{
    타입 요소이름(); // 애너테이션의 요소를 선언한다.
    ...
}
```

### 애너테이션의 요소

애너테이션 내에 선언된 메서드를 ‘애너테이션의 요소(element)’라고 한다.

```java
@interface TestInfo{
    int count();
    String testedBy();
    String[] testTools();
    TestType testType(); // enum TestType {FIRST, FINAL}
    DateTime testDate(); // 자신이 아닌 다른 애너테이션(@DateTime)을 포함할 수 있다.
}

@interface DateTime{
    String yymmdd();
    String hhmmss();
}
```

애너테이션에도 인터페이스처럼 상수를 정의할 수 있지만, 디폴트 메서드는 정의할 수 없다.

애너테이션의 요소는 반환값이 있고 매개변수는 없는 추상 메서드의 형태를 가지며, 상속을 통해 구현하지 않아도 된다. 다만, 애너테이션을 적용할 때 이 요소들의 값을 빠짐 없이 지정해주어야한다.

요소의 이름도 같이 적어주므로 순서는 상관없다.

```java
@TestInfo(
    count = 3, testedBy = "Kim",
    TestTools = {"Junit", "AutoTester"},
    testType = TestType.FIRST,
    testDate = @DateTime(yymmdd = "160101", hhmmss="235959")
)

public class NewClass {...}
```

애너테이션의 각 요소는 기본값을 가질 수 있다.

기본값이 있는 요소는 애너테이션을 적용할 때 값을 지정하지 않으면 기본값이 사용된다.

```java
@interface TestInfo{
    int count() default 1;
}

@TestInfo // @TestInfo(count = 1)과 동일
public class NewClass{...}
```

애너테이션 요소가 오직 하나뿐이고 이름이 value인 경우, 애너테이션을 적용할 때 요소의 이름을 생략하고 값만 적어도 된다.

```java
@interface TestInfo{
    String value();
}

@TestInfo("passed") // @TestInfo(value="passed"와 동일)
class NewClass {...}
```

요소타입이 배열인 경우, 괄호를 사용해서 여러개의 값을 지정할 수 있다.

```java
@interface TestInfo{
    String[] testTools();
}

@Test(testTools = {"JUnit","AutoTester"}) // 값이 여러개인 경우
@Test(testTools = "JUnit") // 값이 하나일 때는 괄호 {} 생략가능
@Test(testTools = {}) //값이 없을 때는 괄호{}가 반드시 필요
```

기본값을 지정할 때도 마찬가지로 괄호{} 사용가능.

```java
@interface TestInfo{
    String[] info() default {"aaa","bbb"}; // 기본값이 여러개 인 경우. 괄호{}사용
    String[] info2() default "ccc"; // 기본값이 하나인 경우. 괄호 생략가능
}

@TestInfo // @TestInfo(info = "aaa","bbb", info2 ="ccc"와 동일)
@TestInfo(info2={}) // @TestInfo(info={"aaa","bbb"}, info2={})와 동일
class NewClass {...}
```

요소의 타입이 배열일때도 요소의 이름이 value이면, 요소의 이름을 생략할 수 있다.

```java
@interface SuppressWarning{
    String[] value();
}

@SupperssWarning(value = {"deprecation", "unchecked"})
@SuppreesWarning({"deprecation","unchecked"})
class NewClass {...}
```

그래서 애너테이션을 적용할 때 요소의 이름을 생략할 수 있는 것이다.

### java.lang.annotation.Annotation

모든 애너테이션의 조상은 Annotation이다.

하지만, 애너테이션의 상속은 허용되지 않는다.

실제로 Annotation은 애너테이션이 아니라 일반적인 인터페이스로 정의되어있다.

```java
public interface Annotation{
    boolean equals(Object obj);
    int hashCode();
    String toString();
    
    Class<? extends Annotation> annotationType();
}
```

모든 애너테이션의 조상인 Annotation인터페이스가 위와 같이 정의되어 있기 때문에,

모든 애너테이션 객체에 대해 equals(), hashhCode(), toString()과같은 메서드를 호출하는것이 가능하다.

### 마커 애너테이션 Marker Annotation

값을 지정할 필요가 없는 경우, 애너테이션의 요소를 하나도 정의하지 않을 수 있다.

Serializable이나 Cloneable인터페이스처럼, 요소가 하나도 정의되지 않은 애너테이션을 마커 애너테이션이라고 한다.

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.SOURCE)
public @interface Override {} // 마커 애너테이션. 정의된 요소가 하나도 없다.

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.SOURCE)
public @interface Test {} // 마커 애너테이션 정의된 요소가 하나도 없다.
```

### 애너테이션 요소의 규칙

- 요소의 타입은 기본형, String, enum, 애너테이션, Class만 허용된다.
- ()안에 매개변수를 선언할 수 없다.
- 예외를 선언할 수 없다.
- 요소를 타입 매개변수로 정의할 수 없다.

클래스 객체에는 해당 클래스에 대한 모든 정보를 가지고 있는데, 애너테이션의 정보도 포함되어있다.
