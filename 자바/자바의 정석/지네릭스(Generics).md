## 지네릭스란?

지네릭스란 다양한 타입의 객체들을 다루는 메서드나 컬렉션 클래스에 컴파일 시의 타입체크(compile-time type check)를 해주는 기능이다.

쉽게 받아들였다. → 특정한 자료형만 받고싶을 때 사용한다.

### 컴파일시 타입을 체크하면 뭐가 좋지?

첫번째 : 의도하지 않은 타입의 객체가 저장되는것을 막는다. → 객체 타입의 안정성

두번째 : 저장된 객체를 꺼내올때 원래의 타입과 다른 타입으로 잘못 형변환되어 발생할 수 있는 오류를 줄인다. → 코드가 간결해짐

### 구체적인 예시

조금더 구체적인 예시를 들어보면, ArrayList에서, 여러객체를 담을때도 있지만, 한 객체를 담을때가 더 많다, 이때 꺼낼때마다 타입체크를 하고 형변환을 하면 불편한데, 이 문제를 지네릭스가 해결해준다.

## 지네릭 클래스의 선언

### 클래스에 선언하는 지네릭

```java
class Box{
    Object item;
    
    void setItem(Object item) {this.item = item;}
    Object getItem() {return item;}
}

---

class Box<T>{ //지네릭 타입 T를 선언
    T item;
    
    void setItem(T item){this.item = item;}
    T getItem() {return item;}
    
}
```

Box<T>에서 T를 ‘타입 변수(Type variable)’이라고 정의한다. // Type의 첫글자를 따온것이다.

타입 변수는 T가 아닌 다른것을 사용해도 된다. ArrayList<E>의 경우 Element의 첫글자이다.

타입 변수가 여러개인 경우, Map<K,V>와 같이 콤마’,’를 구분자로 나열하면 된다.

K는 Key를 의미하고, V는 Value를 의미한다.

`기억할것은 기호의 종류만 다를 뿐 ‘임의의 참조형 타입’을 의미한다는것을 기억하자.`

이전에는 리턴타입으로 Object타입의 참조변수를 많이 사용했고, Object를 매번 필요한 자료형에 맞게끔 형변환을 해주었지만, 이젠 Object 타입을 하나하나 정해주는 대신에, 지네릭스타입을 지정하기만 하면 되는것이다.

우선에 위의 예제를 예시로 들어 쉽게 설명하자면, `Box를 생성할것인데, 타입을 내가 마음대로 지정할수 있는 객체를 생성하겠다는 것이다.`

### 지네릭스 용어

```java
class Box<T> {}

---

1. Box<T> : 지네릭 클래스(Generic Class) // 'T의 Box' 또는 'T Box'라고 읽는다.

2. T : 타입 변수(Type Variable) 또는 타입 매개변수(Type Parameter) // T는 타입문자이다.

3. Box : 원시 타입(Raw Type)

---

Box<String> b = new Box<String>();

1. 타입 매개변수에 타입을 지정하는것을 '지네릭 타입 호출'이라고 정의.
ex) Box<String> 부분이 '지네릭 타입 호출'에 해당 한다.

2. 지정된 타입 'String'을 매개 변수화된 타입(Parameterized Type)이라고 한다.
ex) Box<String>에서 <String> 빨간색으로 표시된 부분이 '매개변수화된 타입'에 해당한다.
```

### 지네릭스의 제한

1. 클래스의 static멤버를 타입변수 T로 사용할 수 없다.

```java
class Box<T>{
    static T item;
    static int compare(T t1, T t2) {};
}
```

왜 그럴까? 당연하게도 static멤버는 인스턴스 변수를 참조할 수 없기때문에 불가능하다.

1. 지네릭 타입의 배열의 생성이 허용되지 않는다.

```java
class Box<T>{
    T[] itemArr;
        ...
    T[] toArray() {
        T[] tmpArr = new T[itemArr.length];
        ...
        return tmpArr;
    }
        ...
}
```

왜 그럴까? new 연산자 때문인데, new연산자는 컴파일 시점에 타입 T가 무엇인지 정확히 알아야하지만, Box<T>클래스를 컴파일 하는 시점에서 T가 어떤 타입이 될지 알 수 없기 떄문이다.

조금더 쉽게 설명하자면,

일반적으로 String[] tmpArr = new String[itemArr.length];이 되어야하는데 컴파일을 할때, 

컴퓨터가 불러오는 순서가 java의 소스코드가 아니라 java.lang.*패키지에 먼저 접근한다. 이때, 패키지 안에, new연산자가, T를 접근하려고 하는데 T라는 타입은 어디에도 정의되지 않은 타입이기 떄문에, 오류가 발생하는것. 즉, 아직 어떤값인지 정해지지 않았기 때문에 불가능한것이다.

// 맞는지 모르겠지만, 내가 배운 배경지식내에서 추론하고 넘어감.

instanceof연산자도 new연산자와 같은 이유로 T를 피연산자로 사용할수 없다

꼭 지네릭 배열을 생성하려면 new연산자 대신 Reflection API의 배열을 생성한다.

또는 newInstance()와 같이 동적 객체를 생성하는 메서드로 배열을 생성하거나, Object배열을 생성해서 복사한 다음에 ‘T[]’로 형변환하는 방법 등을 사용한다.

### 지네릭 클래스의 객체 생성과 사용

```java
class Box<T>{
    ArrayList<T> list = new ArrayList<T>();

    void add(T item) {list.add(item);}
    T get(int i) {return list.get(i);}
    ArrayList<T> getList() {return list;}
    int size() {return list.size();}
    public String toString() {return list.toString();}
}
```

1. 참조변수와 생성자에 Parameterized Type이 일치해야한다.

```java
Box<Apple> appleBox = new Box<Apple>(); -> OK
Box<Apple> appleBox = new Box<Grape>(); -> ERROR
```

혹시 기억안날 까봐 적어두는데, 

“참조 변수”란?

appleBox처럼 클래스로 부터 생성된 인스턴스변수를 의미한다.

“생성자”란?

Box() 처럼 인스턴스가 생성될때 호출되는 인스턴스 초기화 메서드이다.

1. 두 타입이 상속관계에 있어도 참조변수와 생성자의 Parameterized Type이 일치해야한다.

```java
Box<Fruit> applexBox = new Box<Apple>(); // ERROR 상속 관계여도 타입이 다르면 오류가 나옴.
```

1. 객체는 다르더라도, 두 지네릭 클래스의 타입이 상속관계이고, Parameterzied Type 같으면 된다.

```java
Box<Apple> appleBox = new FruitBox<Apple>(); // 다형성의 경우 가능하다.
```

1. jdk1.7부터는 추정이 가능한 경우 타입을 생략할 수 있게되었다.

```java
Box<Apple> appleBox = new Box<Apple>();
Box<Apple> appleBox = new Box<>();
```

1. `다른 객체는 받을수 없지만, 상속일때, 추가는 가능함.` // 문제

```java
Box<Apple> appleBox = new Box<Apple>();
appleBox.add(new Apple()); // OK.
appleBox.add(new Grape()); // 에러. Box<Apple>에는 Apple객체만 추가가능

---

Box<Fruit> fruitBox = new  Box<Fruit>();
fruitBox.add(new Fruit()); // OK.
fruitBox.add(new Apple()); // OK. void add(Fruit item)
```

왜 가능하지? // 잘모르겠다. → 사실 2번과 대치되는 개념아닌가?

```java
ArrayList<T> list = new ArrayList<T>();

void add(T item) { list.add(item); } 이므로 list에 추가되는건, 

void add(Fruit item)은 가능하기 때문이다.

void add(Apple item)도 가능하다.
```

ArrayList에 객체를 추가할때는, 뭔가 다른게 있는걸까?

### 제한된 지네릭 클래스

지네릭 클래스는 매개변수에 임의의 모든 종류의 타입을 지정할 수 있다.

그것의 범위를 줄여서 제한하는 방식을 채택하려고 한다.

```java
class FruitBox<T extends Fruit>{
    ArrayList<T> list = new ArrayList<T>();
    ...
}
```

```java
FruitBox<Apple> appleBox = new FruitBox<Apple>(); //자손 가능
FruitBox<Toy> toyBox = new FruitBox<Toy>(); // 자손이 아님.
```

```java
FruitBox<Fruit> fruitBox = new FruitBox<Fruit>();
fuitBox.add(new Apple()); //자손 가능
fruitBox.add(new Grape()); // 자손 가능
```

만일 클래스가 아니라 `인터페이스를 구현해야 한다는 제약이 필요할때도, ‘extends’를 사용한다.`

implements를 사용하지 않는다는점에 주의하자!

```java
interface Eatable {}
class FruitBox<T extends Eatable> {...}
```

클래스 Fruit의 자손이면서 Eatable인터페이스도 구현해야한다면 아래와 같이 ‘&기호로 연결한다.

```java
class FruitBox<T extends Fruit & Eatable> {...}
```

```java
class Fruit implements Eatable{
    public String toString() {return "Fruit";}
}

class Apple extends Fruit {public String toString() {return "Apple";}}
class Grape extends Fruit {public String toString() {return "Grape";}}
class Toy {public String toString(){return "Toy";}}

interface Eatable{}

class FruitBoxEx2{
    public static void main(String[] args){
        FruitBox<Fruit> fruitBox = new FruitBox<Fruit>();
        FruitBox<Apple> appleBox = new FruitBox<Apple>();
        FruitBox<Grape> grapeBox = new FruitBox<Grape>();

        fruitBox.add(new Fruit());
        fruitBox.add(new Apple());
        fruitBox.add(new Grape());
        appleBox.add(new Apple());
        grapeBox.add(new Grape());
    }
}

class FruitBox<T extends Fruit & Eatable> extends Box<T>{} // 제한을 이렇게 건다.

class Box<T>{
    ArrayList<T> list = new ArrayList<T>();

    void add(T item) {list.add(item);}
    T get(int i) {return list.get(i);}
    ArrayList<T> getList() {return list;}
    int size() {return list.size();}
    public String toString() {return list.toString();}
}

```

//return

fruitBox-[Fruit, Apple, Grape]
appleBox-[Apple]
grapeBox-[Grape]

보다 시피 FruitBox에는 Fruit의 자손이면서, Eatable을 구현한 클래스만 타입 매개변수 T에 대입될 수 있다.

### 와일드 카드

```java
class Juicer{
    static Juice makeJuice(FruitBox<Fruit> box) {
        String tmp = "";
        for(Fruit f : box.getList()) tmp += f + " ";
        return new Juice(tmp);
    }
}
```

지네릭 클래스가 아님, 지네릭클래스여도 static메서드에서 매개변수 T를 사용할 수 없음.

FruitBoxFruit>을 고정한 상태로는 makeJuice의 매개변수가 될수 엇다.

```java
FruitBox<Fruit> fruitBox = new FruitBox<Fruit>();
FruitBox<Apple> appleBox = new FruitBox<Apple>();

System.out.println(Jucier.makeJuice(fruitBox)); //자손 가능.
System.out.println(Jucier.makeJuice(appleBox)); //자료형이 같아야함.

```

이렇게 하면 오류가 발생함.

이것을 해결해보자.

```
static Juice makeJuice(FruitBox<Fruit> box){
    String tmp = "";
    for(Fruit f : box.getList()) tmp += f + " ";
    return new Juice(tmp);
}

static Juice makeJuice(FruitBox<Apple> box){
    String tmp = "";
    for(Fruit f : box.getList()) tmp += f + " ";
    return new Juice(tmp);
}
```

위와 같이 오버로딩하면, 컴파일 에러가 발생한다.

지네릭 타입이 다른것만으로는 오버로딩이 성립하지 않기 때문이다.

지네릭타입은 컴파일러가 컴파일 할때만 사용하고 제거해버린다.

즉, 위의 두 메서드는 오버로딩이 아니라 ‘메서드 중복 정의’이다.

이때 사용하기 위해 고안된것이 와일드 카드이다!

```java
<? extends T> 와일드 카드의 상한 제한. -> T와 그 자손들만 가능.
<? super T> 와일드 카드의 하한 제한. -> T와 그 조상들만 가능
<?> 제한없음. 모든 타입이 가능. <? extends Object>와 동일
```

지네릭 클래스와 달리 와일드 카드에는 ‘&’을 사용할 수 없다.

와일드 카드를 사용하면 아래와 같이 해결이 가능하다.

```java
static Juice makeJuice(FruitBox<? extends Fruit> box){
    String tmp = "";
    for(Fruit f : box.getList()) tmp += f + " ";
    return new Juice(tmp);
}
```

```java
FruitBox<Fruit> fruitBox = new FruitBox<Fruit>();
FruitBox<Apple> appleBox = new FruitBox<Apple>();

System.out.println(Jucier.makeJuice(fruitBox)); // 가능함
System.out.println(Jucier.makeJuice(appleBox)); // 가능함.
```

다만 for문에서 box에 저장된 요소를 Fruit타입의 참조변수로 못받는다.

```java
for(Fruit f : box.getList()) tmp += f + " ";// 에러
```

그러나 실제로 테스트 해보면 문제없이 컴파일된다.

```java
class FruitBox<T extends Fruit> extends Box<T> {}
```

지네릭 클래스 FruitBox를 제한했기 때문이다.

컴파일러는 FruitBox의 요소들이 Fruit의 자손이란걸 알고 있기 떄문에 컴파일이 된다.

```java
class Fruit{
    public String toString() {return "Fruit";}
}
class Apple extends Fruit{
    public String toString() {return "Apple";}
}
class Grape extends Fruit{
    public String toString() {return "Grape";}
}

class Juice {
    String name;

    Juice(String name) {
        this.name = name + "Juice";
    }

    public String toString() {
        return name;
    }
    //toString은 오버라이딩시 자동으로 메서드가 호출된다는점 알고있자.
}

class Juicer{
    static Juice makeJuice(FruitBox<? extends Fruit> box){
        String tmp = "";

        for(Fruit f : box.getList())
            tmp += f + " ";

        return new Juice(tmp);
    }
}

// 위 구조에서 참조변수와 반환값을 헷갈려하고있다. 확실히 알고넘어가자.
// Juice.makeJuice가 아니라 Juicer.makeJuice이다.
 

class FruitBoxEx3{
    public static void main(String[] args){
        FruitBox<Fruit> fruitBox = new FruitBox<Fruit>();
        FruitBox<Apple> appleBox = new FruitBox<Apple>();

        fruitBox.add(new Apple());
        fruitBox.add(new Grape());
        appleBox.add(new Apple());
        appleBox.add(new Apple());

        System.out.println(Juicer.makeJuice(fruitBox));
        System.out.println(Juicer.makeJuice(appleBox));
    }
}

class FruitBox<T extends Fruit> extends Box<T> {}

class Box<T>{
    ArrayList<T> list = new ArrayList<T>();
    void add(T item) {list.add(item);}
    T get(int i){return list.get(i);}
    ArrayList<T> getList() {return list;}
    int size() {return list.size();}
    public String toString() {return list.toString();}
}
```

하나하나씩 뜯어보며 이해하자!

```java
class Fruit {
    String name;
    int weight;

    Fruit(String name, int weight) {
        this.name = name;
        this.weight = weight;
    }

    public String toString() {
        return name + "(" + weight + ")";
    }
}

class Apple extends Fruit{
    Apple(String name, int weight){
        super(name, weight);
    }
}

class Grape extends Fruit{
    Grape(String name, int weight){
        super(name, weight);
    }
}

class AppleComp implements Comparator<Apple>{
    public int compare(Apple t1, Apple t2){
        return t2.weight - t1.weight;
    }
}

class GrapeComp implements Comparator<Grape>{
    public int compare(Grape t1, Grape t2){
        return t2.weight - t1.weight;
    }
}

class FruitComp implements Comparator<Fruit>{
    public int compare(Fruit t1, Fruit t2){
        return t2.weight - t1.weight;
    }
}

class FruitBoxEx4{
    public static void main(String[] args){
        FruitBox<Apple> appleBox = new FruitBox<Apple>();
        FruitBox<Grape> grapeBox = new FruitBox<Grape>();

        appleBox.add(new Apple("GreenApple",300));
        appleBox.add(new Apple("GreenApple",100));
        appleBox.add(new Apple("GreenApple",200));

        grapeBox.add(new Grape("GreenGrape",400));
        grapeBox.add(new Grape("GreenGrape",300));
        grapeBox.add(new Grape("GreenGrape",200));

        Collections.sort(appleBox.getList(), new AppleComp());
        // 이런식으로 쓰는구나 Comparator정렬 오호.. 위에 Comp를 확인하자.
        Collections.sort(grapeBox.getList(), new GrapeComp());

        System.out.println(appleBox);
        System.out.println(grapeBox);
        System.out.println();

        Collections.sort(appleBox.getList(), new FruitComp());
        Collections.sort(grapeBox.getList(), new FruitComp());

        System.out.println(appleBox);
        System.out.println(grapeBox);
    }
}

class FruitBox<T extends Fruit> extends Box<T> {}

class Box<T> {
    ArrayList<T> list = new ArrayList<T>();

    void add(T item) {
        list.add(item);
    }

    T get(int i){
        return list.get(i);
    }

    ArrayList<T> getList() {return list;}

    int size(){
        return list.size();
    }

    public String toString(){
        return list.toString();
    }
}
```

정렬이 일어나는 원리를 뜯어보자.

```java
static <T> void sort(List<T> list, Comparator<? super T> c)

static <T> void sort(List<T> list, Comparator<T> c)
```

T에 Apple을 대입해보자대입해보자.

```java
static void sort(List<Apple> list, Comparator<Apple> c)
```

-> Comparator<Apple>찾아감. 하지만 Comparator<Grape>가 오면 작동하지 않음.

타입만 다를뿐 완전같은 코드라서 자손이 생길때마다 반복해서 코드를 만들어줘야하기때문에.

이문제를 해결하기 위해 하한 제한의 와일드 카드를 적용한다.

```java
static void sort(List<Apple> list, Comparator<? super Apple> c)
```

이 코드의 의미는 Comparator의 매개변수로 Apple과 그 조상이 가능하다는 뜻이다.

Comparator<Apple>, Comparator<Fruit>, Comparator<Object>중의 하나가 두번째 매개변수로 올 수 있다는뜻이다. 

처음부터 FirstComp를 만들고 이것을 기준으로 사용하면 여러개를 사용안해도된다는걸 알고있자.

```java
class FruitComp implemnets Comparator<Fruit>{
    public int compare(Fruit t1, Fruit t2){
        return t1.weight - t2.weight;
    }
}
    ...

Collections.sort(appleBox.getList(),new FruitComp());
Collections.sort(grapeBBox.getList(),new FruitComp());
```

\<? super T\>가 습관적으로 따라 붙는다.

그럴때는 그냥 와일드 카드를 무시하고 Comparator<T>로 생각하자.

## 지네릭 메서드

메서드 선언부에 지네릭 타입이 선언된 메서드를 지네릭 메서드라 한다.

### 왜 사용하는가?

1. 클래스내부에 static메서드를 선언해주기 위해서 사용한다.

일반적으로는 가능한데, 지네릭이 붙은 클래스는 static선언이 불가능하다.

```java
public class Student<T>{
    static T name;
}

//student클래스가 인스턴스가 되기전에 static은 메모리에 올라간다.
//이때 name의 타입인 T가 결정되지 않기 때문에 위처럼 사용 불가능.

public class Student<T>{
    static T getName(T name){
        return name;
    }
}

//static 변수와 마찬가지로 Student 클래스가 인스턴스화 되기전에 메모리에 올라가는데 T타입이 정해지지 않음.

class Studnet<T>{
    static <T> T getOneStudent(T id){
        return id;
    }
}

//위 문제를 해결가능
//제네릭 메서드는 호출시에 매개타입을 지정하기 때문에 static이 가능하다.
//인스턴스가 생성될때마다 <T>가 지정되기 때문에, 지역변수라고 생각하면 편하다.
```

1. 호출할때, 타입을 확인하기 위함.
2. 매개변수의 타입이 복잡할때, 앞으로 빼서 간결하게 만들어주기 위함.

출처 : [https://devlog-wjdrbs96.tistory.com/201](https://devlog-wjdrbs96.tistory.com/201)

Collections.sort()가 바로 지네릭메서드이다.

```java
static <T> void sort(List<T> list, Comparator<? super T> c) 
```

위치는 `반환 타입 앞에 위치한다는것만 기억하자.`

`지네릭 클래스에 정의된 타입 매개변수와 지네릭 메서드에 정의된 타입 매개변수와 지네릭 메서드에 정의된 타입 매개변수는 전혀 별개의 것이다.` 

같은 타입 문자 T를 사용해도 같은 것이 아니라는것에 주의해야한다.

지네릭 메서드는 지네릭 클래스가 아닌 클래스에도 정의될 수 있다.

static멤버에는 타입 매개변수를 사용할 수 없지만, 메서드에 지네릭 타입을 선언하고 사용하는것은 가능하다.

이 타입 매개변수는 메서드 내에서만 지역적으로 사용될 것이므로 메서드가 static이건 아니건 상관이없다.

같은 이유로 내부 클래스에 선언된 타입문자가 외부클래스의 타입문자와 같아도 구별될 수 있다.

```java
static Juice makeJuice(FruitBox<? extends Fruit> box){...}

-> 지네릭 메서드로 변환!

static <T extends Fruit> Juice makeJuice(FruitBox<T> box) {...}
```

이 메서드를 호출 하기 위해서는

```java
FruitBox<Fruit> fruitBox = new FruitBox<Fruit>();

System.out.println(Juicer.<Fruit>makeJuice(fruitBox));
```

타입변수에 타입을 붙여주어야한다.

그러나 대부분의 경우 컴파일러가 타입을 추정할 수 있기 때문에 생략해도 된다.

```java
System.out.println(<Fruit>makeJuice(fruitBox)); // 에러. 클래스이름 생략 불가능.
System.out.println(this.<Fruit>makeJuice(fruitBox)); // 가능.
System.out.println(Juicer.<Fruit>makeJuice(fruitBox)); // 가능.
```

단지 기술적인 이유에 의한 규칙이다.

같은 클래스내에 있는 멤버들끼리는 this,클래스이름을 생략 후 메서드 이름만으로 호출이 가능하다.

대입된 타입이 있을때는 반드시 써줘야한다.

```java
public static void printAll(ArrayList<? extends Product> list,      // 1번 쓰임
                            ArrayList<? extends Product> list2){    // 2번 쓰임
    for(Unit u : list) {
        System.out.println(u);
    }
}

->
                //1번으로 간략화
public static <T extends Product> void printAll(ArrayList<T> list,
                                                ArrayList<T> list2){ 
    for (Unit u : list){
        System.out.println(u);
    }
}
```

이렇게 매개변수의 타입이 복잡할때도 타입을 별도로 선언 함으로써 코드를 간략히 할 수 있다.

### 2개 겹쳐진 지네릭스

```java
public static<T extends Comparable<? super T>> void sort (List<T> list)
```

686페이지 나중에 참조하자 집중력도 떨어진 상태라 무슨소린지 이해를 못하겠다.. 

### 지네릭 타입의 형변환

```java
Box box = null;
Box<Object> objBox = null;

box = (Box)objBox; // 가능하다. 경고.
objBox = (Box<Object>)box; // 가능하다. 경고.
```

Generic 타입과 Non-Generic 타입간의 형변환은 항상 가능하다.

```java
Box<Object> objBox = null;
Box<String> strBox = null;

objBox = (Box<Object>)strBox; //에러. Box<String> -> Box<Object>
strBox = (Box<String>)objBox; //에러. Box<Object> -> Box<String>
```

대딥된 타입이 다른 지네릭 타입간에는 형변환이 불가능하다.

```java
Box<? extend Object> wBox = new Box<String>(); // 가능할까?

FruitBox<? extends Fruit> box = new FruitBox<Fruit>(); //가능
FruitBox<? extends Fruit> box = new FruitBox<Apple>(); //가능
FruitBox<? extends Fruit> box = new FruitBox<Grape>(); //가능
```

가능하다. Box<String>이 Box<? extends Object>로 형변환이 된다.

해석 순서 다시보자

```java
Optional<?> EMPTY = new Optional<?>();
-> 
Optional<? extends Object> EMPTY = new Optional<>();
->
Optional<? extends Object> EMPTY = new Optional<Object>();
```

모두 같은 말이다. <>안에 생략된 타입은 “?”가 아니라 ‘Object’인걸 기억하자 !

```java
Optional<?> EMPTY = new Optional<?>(); // 에러 미확인 타입의 객체는 생성이 불가능하다.
Optional<?> EMPTY = new Optional<Object>();  // 가능하다.
Optional<?> EMPTY = new Optional<>();  // 바로 위 코드와 동일한 의미이다.
```

### 왜 Optional<Object>가 아니라 Optional<?>을 사용하는걸까?

Optional<T>로 형변환이 가능하기 때문이다.

```java
Optional<?> wopt = new Optional<Object>();
Optional<Object> oopt = new Optional<Object();

Optional<String> sopt = (Optional<String>)wopt; // 가능. 형변환 가능
Optional<String> sopt = (Optional<String>)oopt; // 오류. 형변환 불가능
```

형변환을 하고싶다면, 직접은 불가능하고 간접적으로 가능하다.

```java
Optional<Object> → Optional<T> // 불가능 하다
Optional<Object> → Optional<?> → Optional<T> //가능하다.
```

와일드카드가 사용된 지네릭 타입끼리도 형변환이 가능하다.

```java
FruitBox<? extends Object> objBox = null;
FruitBox<? extends String> strBox = null;

strBox = (FruitBox<? extends String>)objBox; //가능
objBox = (FruitBox<? extends Object>)strBox; //가능
```

### 지네릭 타입의 제거

컴파일러는 지네릭 타입을 이용해서 소스파일을 체크하고, 필요한 곳에 형변환을 넣어준다.

즉, 컴파일된 파일(*.class)에는 지네릭 타입에 대한 정보가 없다.

이렇게 하는 이유는, 지네릭이 도입되기 이전의 소스코드와의 호환성을 유지하기 위해서이다.

아직까지 원시 타입을 사용해서 코드를 작성하는것을 허용한다.

지네릭 타입의 제거 과정은 꽤 복잡하다. 기본적인 과정만 알고 넘어가자.

1. 지네릭 타입의 경계(Bound)를 제거한다.
- <T extends Fruit>라면 T는 Fruit로 치환된다.
- <T>인 경우는 T는 Object로 치환된다.
- 클래스 옆의 선언은 제거된다.

```java
class Box<T extends Fruit>{
    void add(T t) {
        ...
    }
}

->

class Box {
    void add(Fruit t) {
        ...
    }
}
```

1. 지네릭 타입을 제거한 후에 타입이 일치하지 않으면, 형변환을 추가한다.
- List의 get()은 Object타입을 반환하므로 형변환이 필요하다.

```java
T get(int i) {
    return list.get(i);
}

->

Fruit get(int i) {
    return (Fruit)list.get(i);
}
```

```java
static Juice makeJuice(FruitBox<? extends Fruit> box){
    String tmp = "";
    for(Fruit f : box.getList()) tmp += f + " ";
    return new Juice(tmp);
}

->

static Juice makeJuice(FruitBox box){
    String tmp = "";
    Iterator it = box.getList().iterator();
    while(it.hasNext()){
        tmp += (Fruit)it.next() + " ";
    }
    return new Juice(tmp);
}
```
