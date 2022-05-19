## 열거형(enums)

C언어와 달리 존재하지 않다가 JDK1.5부터 추가됨.

### 열거형이란?

열거형은 서로 관련된 상수를 편리하게 선언하기 위한것.

자바의 열거형은 C언어의 열거형보다 더 향상된 것으로 열거형이 갖는 값 뿐만아니라 타입도 관리하기 때문에 보다 논리적인 오류를 줄일 수 있다.

```java
class Card{
    static final int CLOVER = 0;
    static final int HEART = 1;
    static final int DIAMOND = 2;
    static final int SPADE = 3;

    static final int TWO = 0;
    static final int THREE = 1;
    static final int FOUR = 2;

    final int kind;
    final int num;
}

-> 이렇게 바뀌었다 !

class Card{
    enum Kind {CLOVER , HEART, DIAMOND, SPADE}
    enum Value {TWO, THREE, FOUR}
    
    final Kind kind;
    final Value value;
}
```

```java
if(Card.CLOVER == Card.TWO) // true지만, false여야 의미상은 맞음.
if(Card.Kind.CLOVER == Card.Value.TWO) // 컴파일 에러, 값은 같지만 타입이 다름
```

C언어에서는 타입이 달라도 값이 같으면 조건식 결과가 true이다. 하지만

자바는 타입에 안전한 열거형(typesafe enum)이라서 실제 값이 같아도 타입이 다르면 컴파일 에러가 발생한다.

이처럼 값 뿐만 아니라 타입까지 체크하기 때문에 타입에 안전하다고 한다.

상수의 값이 바뀌면 해당 상수를 참조하는 모든 소스를 바꿔야하지만, 열거형 상수를 사용하면, 기존의 소스를 다시 컴파일하지 않아도 된다.

### 열거형의 정의와 사용

```java
enum 열거형이름 {상수명1 , 상수명2,...}
```

```java
class Unit{
    int x, y;
    Direction dir;

    void init(){
        dir = Direction.EAST;
    }
}
```

열거형 상수간의 비교에는 ‘==’를 사용할 수 있다.

비교가 가능하다는것은 그만큼 빠른 성능을 제공한다.

그러나 비교연산자는 사용할 수 없고, compareTo()는 사용가능하다.

```java
if(dir == Direction.EAST){
        x++;
} else if (dir > Direction.WEST){ // 비교연산자 불가능
        ...
} else if (dir.compareTo(Direction.WEST) > 0){ // 가능. "왼쪽이 크면+,같으면 0,작으면 "
        ...
}
```

### Swith문의 조건식에 열거형

```java
void move(){
    switch(dir){
        case EAST:x++;
            break;
        case WEST:x--;
            break;
        case SOUTH:y++;
            break;
        case NORTH:y--;
            break;
    }
}
```

이렇게도 사용할 수 있다.

case문에 열거형의 이름은 적지않고 상수의 이름만 적어야한다는 제약이 있다.

### 모든 열거형의 조상 - java.lang.Enum;

```java
Direction[] dArr = Driection.values();

for(Direction d : dArr) // for(Direction d : Direction.values())
    System.out.printf("%s = %d%n", d.name(), d.ordinal())
```

values()는 열거형의모든 상수를 배열에 담아 반환한다.

이 메서드는 모든 열거형이 가지고 있는 것으로 컴파일러가 자동으로 추가해준다.

ordinal()은 열거형 상수가정의 된 순서를 정수로 반환한다.

| 메서드 | 설명 |
| --- | --- |
| Class<E> getDeclaringClass() | 열거형의 Class객체를 반환한다. |
| String name() | 열거형 상수의 이름을 문자열로 반환한다. |
| int ordinal() | 열거형 상수가 정의된 순서를 반환한다. (0부터 시작) |
| T valueOf(Class<T> enumType, String name) | 지정된 열거형에서 name과 일치하는 열거형 상수를 반환한다. |

이외에도 values()처럼 컴파일러가 자동적으로 추가해주는 메서드

static E valueOf(String name)

이 메서드는 상수의 이름으로 문자열 상수에 대한 참조를 얻을 수 있게 해준다.

```java
enum Direction {EAST, NORTH, SOUTH, WEST}

class EnumEx1{
    public static void main(String[] args){
        Direction d1 = Direction.EAST;
        Direction d2 = Direction.valueOf("WEST");
        Direction d3 = Enum.valueOf(Direction.class, "EAST");

        System.out.println("d1="+d1);
        System.out.println("d2="+d2);
        System.out.println("d3="+d3);

        System.out.println("d1 == d2 ? "+ (d1==d2));
        System.out.println("d1 == d3 ? "+ (d1==d3));
        System.out.println("d1.equals(d3) ? "+ (d1.equals(d3)));
        //System.out.println("d2 > d3 ? "+ (d1 > d3));
        System.out.println("d1.compareTo(d3) ? "+(d1.compareTo(d3)));
        System.out.println("d1.compareTo(d2) ? "+(d1.compareTo(d2)));

        switch(d1){
            case EAST:
                System.out.println("The direction is EAST."); break;
            case SOUTH:
                System.out.println("The direction is SOUTH."); break;
            case WEST:
                System.out.println("The direction is WEST."); break;
            case NORTH:
                System.out.println("The direction is NORTH."); break;
            default:
                System.out.println("Invaild"); break;
        }

        Direction[] dArr = Direction.values();
        for(Direction d : dArr)
            System.out.printf("%s=%d%n", d.name(), d.ordinal());
    }
}
```

//return

d1=EAST
d2=WEST
d3=EAST
d1 == d2 ? false
d1 == d3 ? true
d1.equals(d3) ? true
d1.compareTo(d3) ? 0
d1.compareTo(d2) ? -3
The direction is EAST.
EAST=0
NORTH=1
SOUTH=2
WEST=3

### 열거형에 멤버 추가하기

Enum클래스에 정의된 oridnal()이 열거형 상수가 정의된 순서를 반환한다.

이 값을 열거형 상수의 값으로 사용하지 않는 것이 좋다.

이 값은 내부 용도로만 사용되기 위한것이기 때문이다.

얼겨형 상수의 값이 불연속적인 경우에는 상수의 이름옆에 원하는 값을 괄호()와 함께 적어주면 된다.

```java
enum Direction {
    EAST(1), SOUTH(5), WEST(-1), NORTH(10);

    private final int value;
    Direction(int value) {this.value = value;}

    public int getValue() {return value;}
}
```

지정된 값을 저장할 수 있는 인스턴스 변수와 생성자를 새로 추가해 주어야한다.

```java
Direction d = new Direction(1); // 에러
```

열거형의 생성자는 외부에서 호출할 수 없다.

`열거형의 생성자는 묵시적으로 private이기 때문이다.`

하나의 열거형 상수에 여러값을 지정할 수 도 있다.

다만 그에 맞게 인스턴스 변수와 생성자 등을 새로 추가해 주어야한다.

```java
enum Direction{
EAST(1,">"), SOUTH(2,"V"),WEST(3,"<",NORTH(4,"^");

private final int value;
private final String symbol;

Direction(int value, String symbol) {
    this.value = value;
    this.symbol = symbol;
}

public int getValue() {return value;}
public String getSymbol() {return symbol;}
}
```

### 열거형에 추상메서드 추가하기

```java
enum Transportation{
    BUS(100),TRAIN(150),SHIP(100),AIRPLANE(300);
    
    private final int BASIC_FARE;
    
    private Transportation(int basicFare){
        BASIC_FARE = basicFare;
    }
    
    int fare() {
        return BASIC_FARE;
        }
    }
}
```

```java
enum Transportation{
    BUS(100){int fare(int distance) {return distance * BASIC_FARE;}},
    TRAIN(150) {int fare(int distance) {return distance * BASIC_FARE;}},
    SHIP(100) {int fare(int distance) {return distance * BASIC_FARE;}},
    AIRPLANE(300) {int fare(int distance) {return distance * BASIC_FARE;}};
    
    abstract int fare(int distance);
    
    protected final int BASIC_FARE; //protected로 해야 상수에서 접근가능.
    
    Transportation(int basicFare){ //자동으로 private으로 설정되어있다.
        BASIC_FARE = basicFare;
    }
    
    public int getBasicFare() {return BASIC_FARE;}
}
```

### 왜 protected로 선언해야하지?

상수가 distance * BASIC_FARE를 호출하는데, 이때 BASIC_FARE는 private이면, 내부에서 밖에 안되기 때문이다.

열거형에 추상메서드를 구현할수는 있지만, 선언할 일은 그리 많지 않으므로 가볍게 참고만 하고 넘어가자.

### 열거형의 이해

```java
enum Direction {EAST, SOUTH, WEST, NORTH}
```

사실 열거형 상수 하나하나가 Direction객체이다. 위의 문장을 클래스로 정의한다면 다음과 같다.

```java
class Direction{
    static final Direction EAST = new Direction("EAST");
    static final Direction SOUTH = new Direction("SOUTH");
    static final Direction WEST = new Direction("WEST");
    static final Direction NORTH = new Direction("NORTH");

    private String name;

    private Direction(String name){
        this.name = name;
    }
}
```

Direction 클래스의 static 상수, EAST, SOUTH, WEST, NORTH의 값은 객체의 주소이고, 이 값은 바뀌지 않는 값으로 ‘==’로 비교가 가능하다.  

모든 열거형은 추상 클래스 Enum의 자손이다.

```java
abstract class Direction extends MyEnum{
    static final DirectionEAST= new Direciton("EAST"){
        Point move(Point p) {...};
    static final DirectionSOUTH= new Direciton("SOUTH"){
        Point move(Point p) {...};
    static final DirectionWEST= new Direciton("WEST"){
        Point move(Point p) {...};
    static final DirectionNORTH= new Direciton("NORTH"){
        Point move(Point p) {...};

    private String name;

    private Direction(String name) {
        this.name = name;
    }
}
```

이 내용을 보면 왜 열거형에 추상 메서드를 추가하면 각 열거형 상수가 추상메서드를 구현해야하는지 이해할 수 있게 된다.
