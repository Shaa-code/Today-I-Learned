# 람다식(Lambda Expression)

람다식의 도입으로 인해, 자바는 객체지향언어인 동시에 함수형 언어가 되었다.

## 람다식이란?

메서드를 하나의 ‘식(expression)’으로 표현한 것이다.

메서드를 람다식으로 표현하면 메서드의 이름과 반환값이 없어진다

그래서 람다식을 ‘익명함수(anonymous function)’이라고도 한다.

### 왜 사용하는가?

원래는 새로 클래스를 만들거나, 객체를 생성해야만 메서드를 사용할 수 있었는데,

람다식 자체만으로 새로 클래스를 만들거나 객체를 만들지 않고도 값이 반환할 수 있게 때문이다.

람다식은 메서드의 매개변수로전달되어지는것이 가능하다.

메서드의 결과로 반환될 수도 있다.

결국 메서드를 변수처럼 다루기 위해서 사용되는것이다.

### 메서드와 함수의 차이

메서드는 함수와 같은 의미이지만, 특정 클래스에 반드시 속해야한다는 제약이 있다.

그래서 기존의 함수와 같은 의미의 다른 용어를 선택하게 되었다.

하지만, 람다식을 통해 메서드가 하나의 독립적인 기능을 하기 때문에, 함수라는 용어를 사용하게 된다.

## 람다식 작성하기

식은 연산결과가 자동적으로 반환값이 된다.

이떄는 ‘문장(statemnet)’이 아닌 ‘식’이므로 끝에 ‘;’를 붙이지 않는다.

1. 메서드에서 이름과 반환타입을 제거하고 매개변수 선언부와 몸통{} 사이에 ‘→’를 추가한다.

```java
~~int max~~(int a, int b) {return a > b ? a : b;}
//
(int a , int b) ->  ~~{return~~ a > b ? a : b~~;}~~

(~~int~~ a , ~~int~~ b) -> a > b ? a : b 

(a, b) -> a > b ? a : b // 타입이 추론이 가능한 경우(대부분) 생략이 가능하다.

```

(int a, b) → a > b ? a : b와 같이 두 매개변수중 어느 하나의 타입만 생략하는것은 허용되지 않는다

```java
(a) -> a * a //  a -> a * a -> OK
(int a) -> a * a // int a -> a * a -> ERROR
```

매개변수가 1개면 괄호를 생략할 수 있다. 

```java
(String name, int i) → { System.out.println(name + “=” + i) };
(String name, int i) → System.out.println(name + “=” + i);
```

괄호 안의 문장이 1개면 {}를 생략할 수 있다.

```java
(int a , int b) -> {return a > b ? a : b;} //OK
(int a , int b) -> return a > b ? a : b    // 에러
```

return이 있으면 생략 불가능.

```java
int roll() {return (int) Math.random()*6;}
() → {return (int) Math.random()*6}
() -> (int) (Math.random() * 6)
```

매개변수가 없어도 작성이 가능하다.

```java
int sumArr(int[] arr){
    int sum = 0;
    for(int i : arr)
        sum += i;
    return sum;
}

(int[] arr) -> {
    int sum = 0;
    for(int i : arr)
        sum += i;
    return sum;
}
```

정리해보자, 언제사용하면 좋을까?

굳이 이름을 적고싶지 않을때 사용한다.

바로 값을 return 하고 싶을때 사용한다.

### 함수형 인터페이스(Functional Interface)

지금까지 람다식이 메서드와 동등한것처럼 설명해 왔지만,

사실 람다식은 익명클래스의 객체와 동등하다.

```java
(int a , int b) -> a > b ? a : b

new Object() {
    int max(int a , int b){
        return a > b ? a : b;
    }
}
```

람다식으로 정의된 익명 객체의 메서드를 어떻게 호출할 수 있을까?

람다의 타입은 무엇일까? 참조형이니까 클래스 또는 인터페이스만 가능하다.

또한 람다식과 동등한 메서드가 정의되어있어야한다.

왜냐하면 참조변수로 익명 객체(람다식)의 메서드를 호출하기 위함이다.

MyFunction 인터페이스가 있다고 가정해보자.

```java
interface MyFunction {
    public abstract int max(int a, int b);
}
```

```java
MyFunction f = new Myfunction() {
                   public int max(int a, int b){
                       return a > b ? a : b;
                       }
               };
//
int big = f.max(5,3); // 익명 객체의 메서드를 호출
```

MyFunction인터페이스에 정의된 메서드 max()는 람다식 ‘(int a , int b) → a > b ? a : b’와 메서드의 선언부가 일치한다.

```java
MyFunction f = (int a, int b) -> a > b ? a : b; //익명 객체를 람다식으로 대체
int big = f.max(5,3); // 익명 객체의 메서드 호출
```

이 처럼 MyFunction 인터페이스를 구현한 익명 객체를 람다식으로 대체가 가능한 이유는

람다식도 실제로는 익명객체이고, MyFucntion인터페이스를 구현한 익명 객체의 메서드max()와 람다식의 매개변수의 타입과 개수 그리고 반환값이 일치하기 때문이다.

위와 같은 이유로 인터페이스를 통해 람다식을 다루기로 결정하였으며, 람다식을 다루기 위한 인터페이스를 ‘함수형 인터페이스(Functional Interface)’라고 부르기로 했다.

단, 함수형 인터페이스에는 오직 하나의 추상 메서드만 정의 되어 있어야 한다는 제약이 있다.

그래야 람다식과 인터페이스의 메서드가 1:1로 연결될 수 있기 때문이다.

반면에 static메서드와 default메서드의 개수에는 제약이 없다.

‘@FunctionalInterface’를 붙이면 컴파일러가 함수형 인터페이스를 올바르게 정의하였는지 확인해주므로 꼭 붙이도록하자!.

```java
List<String> list = Arrays.asList(”abc”, “aaa”, “bbb”, “ddd” , “aaa”);
    
Collections.sort(list, new Comparator<String>()){
    public int compare(String s1, String s2){
        return s2.compareTo(s1);
    } // 긴 코드
});

->

Collections.sort(list (s1,s2)) -> s2.compareTo(s1)); // 간결한 코드
```

### 함수형 인터페이스 타입의 매개변수와 반환타입

```java
@FunctionalInterface
interface MyFunction{
    void myMethod(); //추상 메서드
}
```

메서드의 매개변수가 MyFunction타입이면, 이 메서드를 호출할 때 람다식을 참조하는 참조변수를 매개변수로 지정해야한다는 뜻이다.

```java
void aMethod(**MyFunction f**){ // 매개변수의 타입이 함수형 인터페이스
    f.myMethod();           //MyFunction에 정의된 메서드 호출
}
    ....
MyFunction f = () -> System.out.println("myMethod()");
aMethod(f);
```

또는 참조변수 없이 직접 람다식을 매개변수로 지정하는것도 가능하다.

```java
aMethod(()-> System.out.println("myMethod()"));
```

메서드의 반환타입이 함수형 인터페이스타입이라면, 함수형 인터페이스의 추상메서드와 동등한 람다식을 가리키는 참조변수를 반환하거나 람다식을 직접 반환할 수 있다.

보다시피 메서드로 람다를 주고받을 수 있다.

```java
MyFucntion myMethod(){
    MyFunction f = () -> {};
    return f; // 이 줄과 윗 줄을 한줄로 줄이면, return () -> {};
}
```

```java
@FunctionalInterface
interface MyFunction{
    void run();
}

class LambdaEX1{
    static void execute(MyFunction f){
        f.run();
    }

    static MyFunction getMyFunction(){
        MyFunction f = () -> System.out.println("f3.run()");
        return f;
    }

    public static void main(String[] args){
        MyFunction f1 = () -> System.out.println("f1.run()");
        MyFunction f2 = new MyFunction(){
            public void run(){
                System.out.println("f2.run()");
            }
        };
        MyFunction f3 =getMyFunction();

        f1.run();
        f2.run();
        f3.run();

execute(f1);
execute( () -> System.out.println("run()") );
    }
}
```

### 람다식의 타입과 형변환

`함수형 인터페이스로 람다식을 참조할 수 있는 것일 뿐, 람다식의 타입이 함수형 인터페이스의 타입과 일치하는것은 아니다.`

람다식은 익명 객체이다. 정확히는 타입은 있지만 컴파일러가 임의로 이름을 정하기 때문에 알 수 가 없다.

MyFucntoin은 ‘interface MyFunction’{void method();}로 가정

```java
MyFunction f = (MyFunction)(()->{}); // 양변의 타입이 다르므로 형 변환 필요
```

람다식은 MyFunction 인터페이스를 직접 구현하지 않았지만, 이 인터페이스를 구현한 클래스 객체와 완전히 동일하기 때문에 위와 같은 형변환을 허용한다. 그리고 생략이 가능하다.

`람다식은 분명히 객체인데도, Object타입으로 형변환 할 수 없다.`

람다식은 오직 함수형 인터페이스로만 형 변환이가능하다.

```java
Object obj = (Object(() -> {}); //에러. 함수형 인터페이스로만 형 변환 가능
```

```java
@FunctionalInterface
interface MyFunction{
    void myMethod();
}

class LambdaEx2{
    public static void main(String[] args) {
        MyFunction f = () -> {};
        Object obj = (MyFunction)(() -> {});
        String str = ((Object)(MyFunction)(()->{})).toString();
        System.out.println(f);
        System.out.println(obj);
        System.out.println(str);

        //System.out.println(() -> {}); // 에러 람다식은 Object타입으로 형변환 불가능.
        System.out.println((MyFunction)(() -> {}));
        //System.out.println((MyFunction(() -> {}).toString())); // 에러
        System.out.println(((Object)(MyFunction)( () -> {})));
    }
}
```

//return

LambdaEx2$$Lambda$15/0x0000000800067c40@3f3afe78
LambdaEx2$$Lambda$16/0x0000000800066040@7f63425a
LambdaEx2$$Lambda$17/0x0000000800066440@880ec60
LambdaEx2$$Lambda$18/0x0000000800065840@39ba5a14
LambdaEx2$$Lambda$19/0x0000000800065c40@340f438e

원래 타입은 ‘외부클래스이름$$Lambda$번호 이지만 람다식의 타입은 위와 같다.

모두 람다식으로 출력된다는걸 확인하자.

### 외부 변수를 참조하는 람다식

```java
@FunctionalInterface
interface MyFunction{
    void myMethod();
}

class Outer {
    int val = 10; // Outer.this.val

    class Inner {
        int val = 20; // this.val

        void method(int i) {//void method(final int i)}
            int val = 30; // final int val = 30;
            //i = 10;       // 에러. 상수의 값을 변경할 수 없음.

            MyFunction f = () -> { //매개변수자리에 (i) 외부 지역변수와 이름이 중복.
                System.out.println("i : " + i);
                System.out.println("val : " + val);
                System.out.println("this.val : " + ++this.val);
                System.out.println("Outer.this.val :" + ++Outer.this.val);
            };

            f.myMethod();
        }
    }
}

class LambdaEx3{
    public static void main(String[] args) {
        Outer outer = new Outer();
        Outer.Inner inner = outer.new Inner();
        inner.method(100);
    }
}
```

람다식 내에서 지역변수 i와 val을 참조하고 있으므로 람다식 내에서나 다른 어느 곳에서도 이 변수들의 값을 변경하는 일은 허용되지 않는다.

Inner클래스와 Outer클래스의 인스턴스 변수인 this.val과, Outer.this.val은 상수로 간주되지 않으므로 값을 변경해도된다.

외부 지역변수와 같은 이름의 람다식 매개변수는 허용되지 않는다.

### java.util.function패키지

일반적으로 자주 쓰이는 형식의 메서드를 함수형 인터페이스로 미리 정의해두었다.

이유는 매번 새로운 함수형 인터페이스를 정의해서 복잡하게 만들지 말고

함수형 인터페이스에 정의된 메서드 이름도 통일되고, 재사용성이나 유지보수 측면에서도 좋기 때문이다.

| 함수형 인터페이스 | 메서드 | 설명 |
| --- | --- | --- |
| java.lang.Runnable | void run() | 매개변수도 없고, 반환값도 없음. |
| Supplier<T> | T get() → T | 매개변수는 없고 반환값만 있음. |
| Consumer<T> | T→ void accept(T t) | 매개변수만 있고 반환값은 없음. |
| Function<T,R> | T→R apply(T t) → R | 일반적인 함수. 하나의 매개변수를 받아서 결과를 반환 |
| Predicate<T> | T→boolean test(T t) → boolean | 조건식을 표현하는데 사용됨.
매개변수는 하나, 반환 타입은 boolean |

‘T’는 ‘Type’을, ‘R’은 ‘Return’을 의미한다.

### 조건식의 표현에 사용되는 Predicate

수학에서 결과로 true 또는 false를 반환하는 함수를 ‘predicate’라고 한다.

```java
Predicate<String> isEmptyStr = s -> s.length() == 0;
String s = "";

if(isEmptyStr.test(s))
    System.out.println("This is an empty String.");
```

### 매개변수가 두 개인 함수형 인터페이스

매개변수의 개수가 2개인 함수형 인터페이스는 이름앞에 접두사 ‘Bi’가 붙는다.

| 함수형인터페이스 | 메서드 | 설명 |
| --- | --- | --- |
| BiConsumer<T,U> | T,U → void accept(T t, U u) | 두개의 매개변수만 있고, 반환값이 없음. |
| BiPredicate<T,U> | T,U → boolean test(T t, U u) → boolean | 조건식을 표현하는데 사용됨.
매개변수는 둘, 반환값은 boolean |
| BiFunction<T,U,R> | T,U → R apply(T t, U u) → R | 두 개의 매개변수를 받아서 하나의 결과를 반환 |

매개변수의 타입으로 보통 ‘T’를 사용하므로, 알파벳에서 ‘T’의 다음 문자인 ‘U’,’V’,’W’를 매개변수의 타입으로 사용 하는 것 일뿐 별다른 의미는 없다.

### 왜 Supplier는 없는걸까?

Supplier는 매개변수는 없고 반환값만 존재한다,

메서드는 하나의 값만 반환할 수 있고 두 개의 값을 반환할 수 없으므로 BiSupplier는 존재할 수 없다.

두개 이상의 매개변수를 갖는 함수형인터페이스가 필요하다면 직접 만들어 써야한다.

```java
@FunctionalInterface
interface TriFunction<T,U,V,R>{
    R apply(T t, U u, V v);
}
```

### UnaryOperator와 BinaryOperator

Function의 또 다른 변형이다.

매개변수의 타입과 반환타입이 모두 일치한다는점을 제외하고는 Function과 같다.

| 함수형 인터페이스 | 메서드 | 설명 |
| --- | --- | --- |
| UnaryOperator<T> | T→T apply(T t) → T | Function의 자손, Function과 달리 매개변수와 결과의 타입이 같다. |
| BinaryOperator<T> | T,T → apply(T t, T t)→ T | BiFunction의 자손, BiFunction과 달리 매개변수와 결과의 타입이 같다. |

### 컬렉션 프레임워크과 함수형 인터페이스

컬렉션 프레임워크의 인터페이스에 다수의 디폴트 메서드가 추가되었다.

그 중 일부는 함수형 인터페이스를 사용하는데, 그 목록이다.

| 인터페이스 | 메서드 | 설명 |
| --- | --- | --- |
| Collection | boolean removeIf(Predicate<E> filter) | 조건에 맞는 요소를 삭제 |
| List | void replaceAll(UnaryOperator<E> operator) | 모든 요소를 변환하여 대체 |
| Iterable | void forEach(Consumer<T> action) | 모든 요소에 작업 action을 수행 |
| Map | V compute(K key, BiFunction<K,V,V>,f) | 지정된 키의 값에 작업 f를 수행 |
|  | V computeIfAbsent(K key, Function<K,V> f) | 키가 없으면, 작업 f수행 후 추가 |
|  | V computeIfPresent(K key, BiFunction<K,V,V> f) | 지정된 키가 있을때, 작업 f 수행 |
|  | V merge(K key, V value, BiFunction<V,V,V> f | 모든 요소에 병합작업 f를 수행 |
|  | void forEach(BiConsumer<K,V> action) | 모든 요소에 작업 action을 수행 |
|  | void replaceAll(BiFunction<K,V,V>f) | 모든 요소에 치환작업 f를 수행 |

‘compute’로 시작하는 메서드들은 맵의 value를 변환하는 일을 하고 merge()는 Map을 병합하는 일을 한다.

```java
class LambdaEx4{
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        for(int i = 0 ; i<10 ; i++)
            list.add(i);

        list.forEach(i -> System.out.print(i+","));
        System.out.println();

        list.removeIf(x -> x % 2 == 0 || x % 3 == 0);
        System.out.println(list);

        list.replaceAll(i->i*10);
        System.out.println(list);

        Map<String, String> map = new HashMap<>();
        map.put("1","1");
        map.put("2","2");
        map.put("3","3");
        map.put("4","4");

        map.forEach((k,v) -> System.out.print("{"+k+","+v+"},"));
        System.out.println();
    }
}
```

//return

0,1,2,3,4,5,6,7,8,9,
[1, 5, 7]
[10, 50, 70]
{1,1},{2,2},{3,3},{4,4},

### 기본형을 사용하는 함수형 인터페이스

기본형 대신 Wrapper클래스를 사용하는것은 비효율적이다.

보다 효율적으로 처리할 수 있도록 기본형을 사용하는 함수형 인터페이스들이 제공된다.

| 함수형 인터페이스 | 메서드 | 설ㄹ명 |
| --- | --- | --- |
| DoubleToIntFunction | double → int applyAsInt(double) → int | AToBFunction은 입력이 A타입 출력이 B타입 |
| ToIntFunction<T> | T → int applyAsInt(T value) → int  | ToBFunction은 출력이 B타입이다. |
| intFunction<R> | Int → R apply(T t, U u) → R | AFunction은 입력이 A타입이고 출력은 지네릭타입 |
| ObjIntConsumer<T> | T,int → void accept(T t, U u) | ObjAFunction은 입력이 T, A타입이고 출력은 없다. |

```java
class LambdaEx6{
    public static void main(String[] args) {
        IntSupplier s = () -> (int)(Math.random() * 100)+1;
        IntConsumer c = i -> System.out.print(i+", ");
        IntPredicate p = i -> i % 2 == 0;
        IntUnaryOperator op = i -> i / 10 * 10;

        int[] arr = new int[10];

        makeRandomList(s,arr);
        System.out.println(Arrays.toString(arr));
        printEvenNum(p,c,arr);
        int[] newArr = doSomething(op, arr);
        System.out.println(Arrays.toString(newArr));
    }

    static void makeRandomList(IntSupplier s, int[] arr){
        for(int i =0 ; i< arr.length; i++){
            arr[i] = s.getAsInt();
        }
    }
    static void printEvenNum(IntPredicate p , IntConsumer c, int[] arr){
        System.out.print("[");
        for(int i : arr){
            if(p.test(i))
                c.accept(i);
        }
        System.out.println("]");
    }
    static int[] doSomething(IntUnaryOperator op, int[] arr){
        int[] newArr = new int[arr.length];

        for(int i=0; i<newArr.length; i++){
            newArr[i] = op.applyAsInt(arr[i]);
        }
        return newArr;
    }
}
```

//return 

[80, 7, 58, 60, 36, 43, 91, 41, 59, 44]
[80, 58, 60, 36, 44, ]
[80, 0, 50, 60, 30, 40, 90, 40, 50, 40]

IntUnaryOperator대신 Function을 사용하면 에러가 발생한다.

```java
Function f = (a) → 2 * a;
```

매개변수 a와 반환값의 타입을 추정할 수 없기 때문이다.

```java
Function<Integer,Integer> f = (a) → 2*a;
```

Function과 IntFunction을 사용할 수 도 있지만 , IntUnaryOperator가 오토박싱 언박싱 횟수가 적어 성능이 좋다.

```java
IntFunction<Integer> f = (a) → 2 * a;
```

IntFunction, ToIntFunction, IntToLongFunction은 있어도InToIntFucntion은 없는데, IntUnaryOperator가 그 역할을 하기 때문이다.

`매개변수의 타입과 반환타입이 일치할때는 Function대신 UnaryOperator를 쓰자.`

### Function의 합성과 Predicate의 결합

```java
default <V> Function<T,V> andThhen(Function<? super R, ? extends V> after)
default <V> Function<V,R> compose(Function<? super V, ? extends T> before)
static <T> Function<T,T> identity()

default Predicate<T> and (Predicated<? super T> other)
default Predicate<T> or (Predicate<? super T> other)
default Predicate<T> negate()
static <T> Predicate<T> isEqual(Object targetRef)
```

### Function의 합성

수학에서 두 함수를 합성해서 합성함수를 만들수 있다.

Java에서는 두 람다식을 합성해서 새로운 람다식을 만들 수 있다.

f.andThen(g) 순서는 f를 먼저 적용하고 그 다음에 g를 적용한다.

f.compose(g)는 g를 먼저 적용하고 f를 후에 적용한다.

```java
default <V> Function<T,V> andThen(Function<? super R, ? extends V> after)
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f304563e-c6d0-4d75-808f-0f4ad97d2cbf/Untitled.png)

```java
default <V> Function<V,R> compose(Function<? super V, ? extends T> before)
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/38fbcadb-75e4-4e0f-aff4-1b26564af671/Untitled.png)

```java
1.f.andThen(g)
Function<String, Integer> f = (s) -> Integer.parseInt(s, 16);
Function<Integer,String> g = (i) -> Integer.toBinaryString(i);
Function<String,String> h = f.andThen(g);

System.out.println(h.apply("FF")); // "FF" -> 255 -> "11111111"

2.f.compose(g)
Function<Integer,String> g = (i) -> Integer.toBinaryString(i);
Function<String, Integer> f = (s) -> Integer.parseInt(s, 16);
Function<Integer,Integer> h = f.compose(g);

System.out.println(h.apply(2)); // 2 -> "10" -> 16

```

compose를 해주면 넣는 순서만 바뀐다고 쉽게 기억하자.

identity()는 함수를 적용하기 이전과 이후가 동일한 ‘항등 함수’가 필요할 때 사용한다.

```java
Function<String, String> f = x -> x;
Function<String, String> f = Fucntion.identity(); // 위의 문장과 동일하다.

System.out.println(f.apply("AAA")); //AAA가 그대로 출력됨
```

### Predicate의 결합

```java
Predicate<Integer> p = i -> i < 100;
Predicate<Integer> q = i -> i < 200;
Predicate<Integer> r = i -> i % 2 == 0;
Predicate<Integer> notP = p.negate(); // i >= 100

//100 ≤ i && (i< 200 || i%2 ==0)
Predicate<integer> all = notP.and(q.or(r));
System.out.println(all.test(150)); // true
```

그리고 static메서드인 isEqual()은 두 대상을 비교하는 Predicate를 만들 때 사용한다.

isEqual()의 매개변수로 비교 대상을 하나 지정하고, 또 다른 비교대상은 test()의 매개변수로 지정한다.

### 메서드 참조

람다식이 하나의 메서드만 호출하는 경우에는 ‘메서드 참조(method reference)’라는 방법으로 람다식을 더욱 간략히 할 수 있다.

```java
Function<String, Integer> f = (String s) -> Integer.parseInt(s);
```

문자열을 정수로 변환하는 람다식

```java
Integer wrapper(String s){
    return Integer.parseInt(s);
}
```

```java
Function<String, Integer> f = (String s) -> Integer.parseInt(s);
Function<String, Integer> f = Integer::parseInt;
```

컴파일러는 생략된 부분을 우변의 parseInt메서드의 선언부로부터, 또는 좌변의 Function인터페이스에 지정된 지네릭 타입으로부터 쉽게 알아낼 수 있다.

```java
BiFunction<String, String, Boolean> f = (s1, s2) -> s1.equals(s2); 
```

```java
BiFunction<String, String, Boolean> f = (s1, s2) -> s1.equals(s2);
BiFunction<String, String, Boolean> f = String::equals;
```

이 경우도 참조변수f 의 타입을 보고 람다식이 두개의 String타입의 매개변수를 받는 다는것을 알수 있다.

즉, 람다식의 매개변수들은 없어도 된다.

Boolean을 반환하는 equals라는 이름의 메서드는 다른 클래스에도 존재할 수 있기 때문에 equals앞에 클래스 이름은 반드시 필요하다.

메서드 참조를 사용할 수 있는 경우가 한가지 더 있는데, 이미 생성된 객체의 메서드를 람다식에서 사용한 경우에는 클래스 이름 대신 그 객체의 참조변수를 적어줘야한다.

```java
MyClass obj = new MyClass();
Function<String, Boolean> f = (x) -> obj.equals(x); //람다식
Function<String, Boolean> f2 = obj::equals;        //메서드 참조
```

| 종류 | 람다 | 메서드 참조 |
| --- | --- | --- |
| static메서드 참조 | (x) → ClassName.method(x) | ClassName::method |
| 인스턴스메서드 참조 | (obj, x) → obj.method(x) | ClassName::method |
| 특정 객체 인스턴스 메서드 참조 | (x) → obj.method(x) | obj::method |

하나의 메서드만 호출하는 람다식은

‘클래스이름::메서드이름’ OR ‘참조변수::메서드이름’으로 바꿀 수 있다.

### 생성자의 메서드 참조

생성자를 호출하는 람다식도 메서드 참조로 변환할 수 있다.

```java
Supplier<MyClass> s = () → new MyClass(); // 람다식
Supplier<MyClass> s = MyClass::new;
```

매개변수가 있는 생성자라면, 매개변수의 개수에 따라 함수형 인터페이스를 사용하면된다.

```java
Function<Integer, MyClass> f = (i) -> MyClass(i);
Function<Integer, MyClass> f2 = MyClass::new;

BiFunction<Integer, String, Myclass> bf = (i,s) -> new MyClass(i,s);
BiFunction<Integer, String, Myclass> bf2 = MyClass::new; // 메서드 참조
```

배열을 생성할때 표현방식.

```java
Function<Integer, int[]> f = x -> new int[x];
Function<Integer, int[]> f2 = int[]::new;
```

메서드 참조는 코드를 간략히하는데 유용해서 많이 사용되므로

람다식을 메서드 참조로 변환하는 연습을 많이해서 빨리 익숙해질 필요가 있다.
