### 컬렉션 프레임 워크란?

데이터 군을 저장하는 클래스들을 표준화한 설계.

프레임워크는 표준화된 프로그래밍 방식을 의미한다.

Java API문서에서는 컬렉션 프레임워크를 ‘데이터 군’을 다루고 표현하기 위한 단일화된 구조(Architecture)’라고 정의하고 있다.

jdk1.2 이전 까지는 Vector, Hashtable, Properties와 같은 컬렉션 클래스, 다수의 데이터를 저장할수 있는 클래스들을 서로 다른 각자의 방식으로 처리했다.

인터페이스와 다형성을 이용한 객체지향적 설계를 통해 표준화되어 있기 떄문에 사용법을 익히기에도 편리하고 재사용성이 높은 코드를 작성할 수 있다는 장점이 있다.

### 컬렉션 프레임워크의 핵심 인터페이스

List와 Set을 구현한 컬렉션 클래스들은 서로 많은 공통부분이 있어서, 공통 된 부분을 다시 뽑아 Collection인터페이스를 정의할 수 있었지만, Map인터페이스는 이들과는 전혀 다른 형태로 컬렉션을 다룬다.

나중에 필요하다면, 컬렉션 프레임워크의 실제 소스를 분석해보자.

객체지향적인 설계능력을 향상시키는데 많은 도움이 된다고 한다.

jdk1.5부터 iterable인터페이스가 추가되고 이를 Collection인터페이스가 상속받도록 변경되었으나 이것은 단지 인터페이스들의 공통적인 메서드인 iterator()를 뽑아서 중복을 제거하기 위한 것에 불과하므로 상속계층도에서 별의미가 없다.

Vector, Stack, Hashtable, Properties와 같은 클래스들은 컬렉션 프레임워크가 만들어지기 이전부터 존재하던것이기 때문에 컬렉션 프레임워크의 명명법을 따르지 않는다.

Vector나 Hashtable과 같은 기존의 컬렉션 클래스들은 호환을 위해, 설계를 변경해서 남겨 두었지만 가능하면 사용하지 않는것이 좋다.

그 대신에 새로추가된 ArrayList와 HashMap을 이용하자.

![Untitled](https://user-images.githubusercontent.com/70310271/169659033-3f352c2c-4d00-4f77-b979-fce0d0dc1f6a.png)

### Collection인터페이스

List와 Set의 조상인 Collection인터페이스에 저장된 메서드

사실 Object가 아닌 ‘E’이다. (지네릭스 배우면 이해하게된다.)

### 왜 boolean으로 반환하지?

boolean add(Object o)같은 경우, 객체가 컬렉션에 추가되면 true, 그렇지 않으면 false를 반환한다. //신호를 주기 위해서다.

### List인터페이스

List인터페이스는 중복을 허용하면서 저장순서가 유지되는 컬렉션을 구현하는데 사용된다.

![Untitled 1](https://user-images.githubusercontent.com/70310271/169659056-384ea4fc-7833-47fe-ab64-27805818d197.png)

### ArrayList

ArrayList는 기존의 Vector를 개선한 것으로 Vector와 구현원리와 기능적인 측면에서 동일하다.

`Vector는 기존에 작성된 소스와의 호환성을 위해서 계속 남겨 두고 있을 뿐이기 때문에 Vector보다는 ArrayList를 사용하자.`

ArrayList는 Object배열을 이용해서 데이터를 순차적으로 저장한다.

```java
public class ArrayList extends AbstractList
    implements List, RandomAccess, Cloneable, java.io.Serializable{
    transient Object[] elementData; //Object 배열
}
```

```java
class ArrayListEx1 {
    public static void main(String[] args) {
        ArrayList list1 = new ArrayList(10);
        list1.add(new Integer(5));
        list1.add(new Integer(4));
        list1.add(new Integer(2));
        list1.add(new Integer(0));
        list1.add(new Integer(1));
        list1.add(new Integer(3));

        ArrayList list2 = new ArrayList(list1.subList(1,4));
        print(list1, list2);

        Collections.sort(list1);
        Collections.sort(list2);
        print(list1, list2);

        System.out.println("list1.containsAll(list2):" + list1.containsAll(list2));

        list2.add("B");
        list2.add("C");
        list2.add(3, "A");
        list2.set(3, "AA");
        print(list1, list2);

        System.out.println("list1.retainAll(list2):" + list1.retainAll(list2));
        // list2와의 공통요소 이외에는 모두 삭제된다.
        print(list1, list2);

        for (int i = list2.size()-1 ; i >= 0; i--){
            if(list1.contains(list2.get(i)))
                list2.remove(i);
        }
        print(list1,list2);
    }

    public static void print(Object list1, Object list2){
        System.out.println("list1 :" + list1);
        System.out.println("list2 :" + list2);
    }
}
```

return :

list1 :[5, 4, 2, 0, 1, 3]
list2 :[4, 2, 0]
list1 :[0, 1, 2, 3, 4, 5]
list2 :[0, 2, 4]
list1.containsAll(list2):true
list1 :[0, 1, 2, 3, 4, 5]
list2 :[0, 2, 4, AA, B, C]
list1.retainAll(list2):true
list1 :[0, 2, 4]
list2 :[0, 2, 4, AA, B, C]
list1 :[0, 2, 4]
list2 :[2, AA, B, C] // Wrong Value : for (int i = 0 ; i < list2.size() ; i++)

![Untitled 2](https://user-images.githubusercontent.com/70310271/169659065-4902da3e-b936-4909-bb23-92103408abec.png)

`Collection은 인터페이스이고, Collections는 클래스임에 주의하자.`

### 왜 하필 i의 증가가 아니라 감소로 하는가?

한 요소가 삭제될때 삭제되고 난후의 공간에 뒤에 나열되어있던 객체들이 밀리면서 앞으로 이동한다.

그래서 끝에서부터 내려오는식으로 삭제해야만한다.

```java
class ArrayListEx2{
    public static void main(String[] args){
        final int LIMIT = 10;
        String source = "0123456789abcdefghijABCDEFGHIJ!@#$%^&*()ZZZ";
        int length = source.length();

        List list = new ArrayList(length/LIMIT + 10);

        for (int i = 0; i < length; i += LIMIT){
            if(i + LIMIT < length)
                list.add(source.substring(i, i + LIMIT));
            else
                list.add(source.substring(i));
        }

        for(int i = 0; i < list.size(); i++){
            System.out.println(list.get(i));
        }
    }
}
```

멀티 프로세싱할때, 데이터 자르는 원리도 이와 똑같으므로 반드시 연습해두자!

### 왜 length/LIMIT + 10에서 굳이 10을 더해주는가?

ArrayList를 생성할때, 저장할 요소의 개수를 고려해서 실제 저장할 개수보다 약간 여유있는 크기로 하는것이 좋다. 생성할 때 지정한 크기보다 더 많은 객체를 저장하면 자동적으로 크기가 늘어나기는 하지만 `이 과정에서 처리시간이 많이 소요되기 때문이다.`

```java
class VectorEx1{
    public static void main(String[] args){
        Vector v = new Vector(5);
        v.add("1");
        v.add("2");
        v.add("3");
        print(v);

        v.trimToSize();
        System.out.println("After trimToSize()"); //capacity가 사이즈에 맞게 변환됨.
        print(v); //새로 배열이 생성된 후 가비지컬렉터에 의해 메모리에서 제거

        v.ensureCapacity(6);
        System.out.println("After ensureCapacity()");
        print(v); // 이 또한 기존의 인스턴스가 아닌 새로운 인스턴스이다.

        v.setSize(7);
        System.out.println("After setSize(7)");
        print(v); //size가 capcity안이면 기존의 인스턴스, 초과하면 새로 생성

        v.clear();
        System.out.println("After clear()");
        print(v); // 
    }

    public static void print(Vector v){
        System.out.println(v);
        System.out.println(v.size());
        System.out.println("capacity :" + v.capacity());
    }
}
```

Vector는 capacity가 부족할 경우 자동적으로 기존의 크기보다 2배의 크기로 증가된다.

그래서 위의 코드에서 v.setSize(7)가 실행되면 v의 capacity는 12가 된다.

생성자 Vector(int initialCapacity, int capacityIncrement)를 사용해서 인스턴스를 생성한 경우에는 지정해준 capacityIncrement만큼 증가하게 된다.

```java
public class MyVector implements List{
    Object[] data = null;
    int capacity = 0;
    int size = 0;

    public MyVector(int capacity){
        if (capacity < 0)
            throw new IllegalArgumentException("유효하지 않은 값입니다. :"+ capacity);

        this.capacity = capacity;
        data = new Object[capacity]; // 이렇게 생성자로 배열을 선언하는 방식이 있구나.
    }

    public MyVector(){
        this(10);
    }

    public void ensureCapacity(int minCapacity){
        if(minCapacity - data.length > 0)
            setCapacity(minCapacity);
    }

    public boolean add(Object obj){
        ensureCapacity(size+1);
        data[size++] = obj;
        return true;
    }

    public Object get(int index){
        if(index < 0 || index >= size)
            throw new IndexOutOfBoundsException("범위를 벗어났습니다.");
        return data[index];
    }

    public Object remove(int index) {
        Object oldObj = null;

        if (index < 0 || index >= size)
            throw new IndexOutOfBoundsException("범위를 벗어남");

        oldObj = data[index];

        if (index != size - 1) {
            System.arraycopy(data, index + 1, data, index, size - index - 1)
        } //index+1의 데이터를 한칸 index로 밀어서 처리하는 알고리즘 작성

        data[size - 1] = null;
        size--; //데이터가 삭제되어 데이터가 줄었으므로 size값 1감소
        return oldObj;
    }

    public boolean remove(Object obj){
        for(int i = 0 ; i < size; i++){
            if(obj.equals(data[i])){
                remove(i);
                return true;
            }
        }
        return false;
    }

    public void trimToSize(){
        setCapacity(size);
    }

    private void setCapacity(int capacity){
        if(this.capacity == capacity) return; //크기가 같으면 변경하지 않는다.

        Object[] tmp = new Object[capacity];
        System.arraycopy(data,0,tmp,0,size);
        data = tmp;
        this.capacity = capacity;
    }

    public void clear(){
        for (int i = 0 ; i < size; i++)
            data[i] = null;
        size = 0;
    }

    public Object[] toArray(){
        Object[] result = new Object[size];
        System.arraycopy(data,0,result,0,size);

        return result;
    }

    public boolean isEmpty() {return size == 0;}
    public int capacity() {return capacity;}
    public int size() {return size;}

    //public int size();
    //public boolean isEmpty();
    public boolean contains(Object o){return false;}
    public Iterator iterator() {return null;}
    //public Object[] toArray();
    public Object[] toArray(Object a[]){return null;}
    //public boolean add(Object o);
    //public boolean remove(Object o);
    public boolean containsAll(Collection c ) {return false;}
    public boolean addAll(Collection c) {return false;}
    public boolean addAll(int index, Collection c) {return false;}
    public boolean removeAll(Collection c) {return false;}
    public boolean retainAll(Collection c) {return false;}
    //public void clear();
    public boolean equals(Object o){return false;}
    //public int hashCode();
    //public Object get(int index);
    public Object set(int index, Object element){return null;}
    public void add(int index, Object element){}
    //public Object remove(int index);
    public int indexOf(Object o){return -1;}
    public int lastIndexOf(Object o){return -1;}
    public ListIterator listIterator() {return null;}
    public ListIterator listIterator(int index) {return null;}
    public List subList(int fromIndex, int toIndex){return null;}

    default void sort(Comparator c){} //jdk1.8부터
    default Spliterator spliterator(){} //jdk1.8부터
    default void replaceAll(UnaryOperator operator){} //jdk1.8부터
}
```

List인터페이스의 메서드 중 주석처리한것은 코드를 정상적으로 동작하도록 구현한 것이고, 주석처리하지 않은 것은 컴파일만 가능하도록 최소한으로 구현한 것이다.

인터페이스를 구현할 때 인터페이스에 정의된 모든 메서드를 구현해야 한다.

일부 메서드만 구현했다면 추상클래스로 선언해야한다.

그러나 jdk1.8부터 List인터페이스에 3개의 디폴트 메서드가 추가되었으며, 이들은 구현하지 않아도된다.

인터페이스들 직접 다 구현해보면 좋을테지만 contains,equals,set,add,indexOf,lastIndexOf,toString은 직접 구현해보는게 좋다.

### LinkedList

배열의 단점을 극복하기 위해 사용한다.

1. 크기를 변경할 수 없다.
- 크기를 변경할 수 없으므로 새로운 배열을 생성해서 데이터를 복사해야한다.
- 실행속도를 향상시키기 위해서는 충분히 큰 크기의 배열을 생성해야 하므로 메모리가 낭비된다.

1. 비순차적인 데이터의 추가 또는 삭제에 시간이 많이 걸린다.
- 차례대로 데이터를 추가하고 마지막에서부터 데이터를 삭제하는 것은 빠르지만,
- 배열의 중간에 데이터를 추가하려면, 빈자리를 만들기 위해 다른 데이터들을 복사해서 이동해야한다.

이 단점을 보완하기 위해서 Linked List라는 자료구조가 고안되었다.

링크드 리스트의 각 node들은 자신과 연결된 다음 요소에 대한 참조(주소값)와 데이터로 구성되어 있다.

```java
class Node{
    Node next; // 다음 요소의 주소를 저장
    Object obj; // 데이터를 저장
}
```

### 링크드 리스트의 단점

이동방향이 단방향이기 때문에, 다음요소에 대한 접근은 쉽지만 이전요소에 대한 접근은 어렵다.

### 이중 연결리스트(Doubly LinkedList)

이점을 보완한 것이 더블 링크드 리스트(이중 연결리스트, doubly linked list)이다.

```java
class Node{
    Node next; // 다음 요소의 주소를 저장
    Node previous; // 이전 요소의 주소를 저장
    Object obj; // 데이터를 저장
```

### 이중 원형 연결리스트 (Doubly Circular LinkedList)

단순히 더블 링크드 리스트의 첫번째요소와 마지막 요소를 서로 연결시킨것이다.

마치 TV의 마지막 채널에서 채널을 증가시키면 첫번째 채널로 이동하고 첫번째 채널에서 채널을 감소시키면 마지막 채널로 이동하는것과 같다.

실제로 LinkedList클래스는 이름과 달리 더블 링크드 리스트로 구현되어 있다.

이는 링크드 리스트의 단점인 낮은 접근성(Accesaability)를 높이기 위한것이다.

마지막에 중복되는 내용들이 조금 있다.

LinkedList는 Queue인터페이스(jdk1.5)와 Deque인터페이스(jdk1.6)을 구현하도록 변경되었는데,

마지막 22개의 메서드는 Queue인터페이스와 Deque인터페이스를 구현하면서 추가된 것이다.

```java
public class Test{
    public static void main(String[] args) {
        ArrayList al = new ArrayList(2000000);
        LinkedList ll = new LinkedList();

        System.out.println("순차추가");
        System.out.println("ArrayList : " +add1(al));
        System.out.println("LinkedList : " +add1(ll));
        System.out.println();
        System.out.println("중간에 추가하기");
        System.out.println("ArrayList : " +add2(al));
        System.out.println("LinkedList : " +add2(ll));
        System.out.println();
        System.out.println("중간에서 삭제하기");
        System.out.println("ArrayList : " +remove2(al));
        System.out.println("LinkedList : " +remove2(ll));
        System.out.println();
        System.out.println("순차적으로 삭제하기");
        System.out.println("ArrayList : " +remove1(al));
        System.out.println("LinkedList : " +remove1(ll));
    }

    public static long add1(List list){
        long start = System.currentTimeMillis();
        for(int i = 0; i<1000000 ; i++) list.add(i+"");
        long end = System.currentTimeMillis();
        return end - start;
    }

    public static long add2(List list){
        long start = System.currentTimeMillis();
        for(int i = 0; i < 10000; i++) list.add(500,"x");
        long end = System.currentTimeMillis();
        return end - start;
    }

    public static long remove1(List list){
        long start = System.currentTimeMillis();
        for(int i = list.size()-1; i>=0; i--) list.remove(i);
        long end = System.currentTimeMillis();
        return end - start;
    }

    public static long remove2(List list){
        long start = System.currentTimeMillis();
        for(int i = 0; i < 10000; i++) list.remove(i);
        long end = System.currentTimeMillis();
        return end = start;
    }
}
```

순차추가 // 배열의 크기가 충분하다는 가정하에 ArrayList가 더 빠르다.
ArrayList : 50
LinkedList : 107

중간에 추가하기 //확실히 LinkedList가 참조만 끊었다 연결시키기 때문에 빠르다.
ArrayList : 2041
LinkedList : 10

중간에서 삭제하기 // 위와 같은원리이다. 밀고 복사하는 원리이기 때문에 ArrayList가 더 오래걸린다.
ArrayList : 1245
LinkedList : 108

순차적으로 삭제하기 //마지막 데이터부터 역순으로 삭제해나가는건 ArrayList가 빠름
ArrayList : 7
LinkedList : 23

```java
class ArrayListLinkedListTest2 {
    public static void main(String args[]) {
        ArrayList al = new ArrayList(1000000);
        LinkedList ll = new LinkedList();
        add(al);
        add(ll);

        System.out.println("=접근시간테스트=");
        System.out.println("=ArrayList : " +access(al));
        System.out.println("=LinkedList : " +access(ll));
    }

    public static void add(List list){
        for (int i =0 ; i< 100000; i++) list.add(i+"");
    }

    public static long access(List list) {
        long start = System.currentTimeMillis();
        for (int i = 0; i < 10000; i++) list.get(i);
        long end = System.currentTimeMillis();
        return end - start;
    }
}
```

=접근시간테스트=
=ArrayList : 1
=LinkedList : 94

배열의 메모리구조 → 인덱스가 n인 데이터의 주소 = 배열의 주소 + n * 데이터 타입의 크기

LinkedList는 불연속적으로 위치한 각 요소들이 연결된 것이라 처음부터 n번째 데이터까지 차례대로 따라가야만 원하는 값을 얻을 수 있다.

그래서 LinkedList는 데이터가 많을수록 접근시간(읽기시간)은 느려진다.

일반적으로 데이터의 개수가 변하지 않는 경우라면, ArrayList가 최상의 선택이 되겠지만,

데이터 개수의 변경이 잦다면 LinkedList를 사용하는 것이 더 나은 선택이 될것이다.

두 클래스의 장점을 이용해서 두 클래스를 조합해서 사용하는 방법도 생각해 볼 수 있다.

처음에 작업하기 전에 데이터를 저장할 때는 ArrayList를 사용한 다음, 작업할 때는 LinkedList로 데이터를 옮겨서 작업하면 좋은 효율을 얻을 수 있을 것이다.

```java
ArrayList al = new ArrayList(1000000);
for(int i = 0; i<100000; i++) al.add(i+"");

LinkedList ll = new LinkedList(al);
for(int i = 0 ; i < 1000; i++) ll.add(500, "X");
```

## Stack과 Queue

Stack은 PUSH - POP // LIFO → 0,1,2 → 2,1,0

`스택은 넣은 순서 반대로 나온다.`

Queue는 OFFER - POLL // FIFO → 0,1,2 → 0,1,2

`큐는 넣은 순서 그대로 나온다.`

Stack은 ArrayList로 구현하는것이 좋다.

왜? ArrayList의 마지막원소를 하나씩 빼는 알고리즘이 LinkedList보다 빠르기 때문이다.

Queue는 LinkedList로 구현하는것좋다.

왜? 0,1,2로 들어왔을때, 0,1,2로 나가야한다.

즉, 첫번째 원소 ‘0’을 먼저 제거하기 때문에, ArrayList로 구현할시 2번째 index부터, 끝까지 복사하는 로직을 계속 반복하기에 느려진다.

그러나 링크드 리스트는 0만 딱 제거하면 되기 때문에, 

```java
class StackQueueEx{
    public static void main(String[] args){
        Stack st = new Stack();
        Queue q = new LinkedList();

        st.push("0");
        st.push("1");
        st.push("2");

        q.offer("0");
        q.offer("1");
        q.offer("2");

        System.out.println("= Stack =");
        while(!st.empty()){
            System.out.println(st.pop());
        }

        System.out.println("= Queue =");
        while(!q.isEmpty()){
            System.out.println(q.poll());
        }
    }
}
```

자바에서는 스택을 Stack클래스로 구현하여 제공하고 있지만 큐는 Queue인터페이스로만 정의해 놓았을뿐 별도의 클래스를 제공하고 있지 않다.

대신 Queue인터페이스를 구현한 클래스들이 있어서 이 들 중 하나를 선택해서 사용하면 된다.

 

### Stack 직접 구현하기

```java
class MyStack extends Vector {
    public Object push(Object item){
        addElement(item);
        return item;
    }

    public Object pop() {
        Object obj = peek();
        removeElementAt(size()-1);
        return obj;
    }

    public Object peek(){
        int len = size();
        if(len == 0)
            throw new EmptyStackException();
        return elementAt(len-1);
    }

    public boolean empty(){
        return size() == 0;
    }

    public int search(Object o){
        int i = lastIndexOf(o);

        if(i >= 0){
            return size() - i; // Stack은 맨위에 저장된 객체를 index 1로 정의한다.(0인데?)
        }

        return -1;
    }
}
```

### 스택과 큐의 활용

스택의 활용 예시 - 수식계산, 수식괄호검사, 워드프로세서의 undo/redo, 웹브라우저의 뒤로/앞으로

큐의 활용 예시 - 최근사용문서, 인쇄작업대기목록, 버퍼(buffer)

막상 봐도 어떻게 활용해야할지 잘 모르겠다. → 이럴땐 많은 예제들을 살펴보고 유추할수 있다.

```java
class StackEx1{
    public static Stack back = new Stack();
    public static Stack forward = new Stack();

    public static void main(String[] args){
        goURL("1.네이트");
        goURL("2.야후");
        goURL("3.네이버");
        goURL("4.다음");

        printStatus();

        goBack();
        System.out.println("= '뒤로' 버튼을 누른 후 =");
        printStatus();

        goBack();
        System.out.println("= '뒤로' 버튼을 누른 후 =");
        printStatus();

        goForward();
        System.out.println("= '앞으로' 버튼을 누른 후 =");
        printStatus();

        goURL("codechobo.com");
        System.out.println("= 새로운 주소로 이동 후 =");
        printStatus();
    }

    public static void printStatus(){
        System.out.println("back : " + back);
        System.out.println("forward : " + forward);
        System.out.println("현재화면은 '" + back.peek()+"' 입니다.");
        System.out.println();
    }

    public static void goURL(String url){
        back.push(url);
        if(!forward.empty())
            forward.clear();
    }

    public static void goForward(){
        if(!forward.empty())
            back.push(forward.pop());
    }

    public static void goBack(){
        if(!back.empty())
            forward.push(back.pop());
    }
```

스택 2가지를 만들어 넣고 서로 추가했다 뺏다를 반복하는 구조이다.

워드프로세서의 되돌리기 기능(undo/redo) 역시 이와 같은 방식으로 되어있다.

```java
class ExpValidCheck{
    public static void main(String[] args){
        if(args.length != 1){
            System.out.println("Usage : java ExpValidCheck \"EXPRESSION\"");
            System.out.println("Example : java ExpValidCheck \"((2+3)*1)+3\"");
            System.exit(0);
        }

    Stack st = new Stack();
    String expression = args[0];

    System.out.println("expression :"+expression);

    try{
        for(int i = 0 ; i < expression.length(); i++){
            char ch = expression.charAt(i);

            if(ch=='('){
                st.push(ch+""); // ch가 아니라 ch+""인 이유가 뭘까?
            }else if(ch==')'){
                st.pop();
            }
        }

        if(st.isEmpty()){
            System.out.println("괄호가 일치합니다.");
        } else {
            System.out.println("괄호가 일치하지 않습니다.");
        }
    } catch(EmptyStackException e) {
        System.out.println("괄호가 일치하지 않습니다.");
        }
    }
}
```

‘(’가 넣어진 만큼 ‘)’가 반환이 되면, 괄호의 개수가 똑같으므로 괄호가 일치함을 알 수 있는 알고리즘이다.

```java
class QueueEx1{
    static Queue q = new LinkedList();
    static final int MAX_SIZE = 5;

    public static void main(String[] args){
        System.out.println("help를 입력하면 도움말을 볼 수 있습니다.");

        while(true){
            System.out.print(">>");
            try{
                Scanner s= new Scanner(System.in);
                String input = s.nextLine().trim();

                if("".equals(input)) continue;

                if(input.equalsIgnoreCase("q")){
                    System.exit(0);
                } else if(input.equalsIgnoreCase("help")){
                    System.out.println(" help - 도움말을 보여줍니다.");
                    System.out.println(" q또는 Q - 프로그램을 종료합니다.");
                    System.out.println(" history - 최근에 입력한 명령어를 " + MAX_SIZE + "개 보여줍니다.");
                } else if(input.equalsIgnoreCase("history")){
                    int i = 0;
                    save(input);

                    LinkedList tmp = (LinkedList)q;
                    ListIterator it = tmp.listIterator();

                    while(it.hasNext())
                        System.out.println(++i+"."+it.next());

                } else {
                    save(input);
                    System.out.println(input);
                }

            } catch(Exception e){
                    System.out.println("입력오류.");
                }
        }
    }

    public static void save(String input){
        if(!"".equals(input))
            q.offer(input);

        if(q.size() > MAX_SIZE)
            q.remove(); //5개 넘으면 그냥 초기화 시키고 다시 쌓는방식
    }
}
```

하나하나씩 뜯어보는시간이 너무 소중하다.

### PriorityQueue

Queue인터페이스의 구현체 중의 하나로, 저장한 순서에 관계없이 우선순위가 높은것부터 꺼내게 된다는 특징이 있다.

그리고 null은 저장할 수 없다.

null을 저장하면 NullPointerException이 발생한다.

PriorityQueue는 저장공간으로 배열을 사용하며, 각 요소를 ‘힙(heap)’이라는 자료구조의 형태로 저장한다. 힙은 잠시후에 배울 이진 트리의 한 종류로 가장 큰 값이나 가장 작은 값을 빠르게 찾을 수 있다는 특징이 있다.

자료구조의 Heap은 JVM의 Heap과는 이름만 같을뿐 다른 것이다.

힙은 이진트리의 한 종류로 가장 큰 값이나 가장 작은 값을 빠르게 찾을 수 있다는 특징이 있다.

```java
class PriorityQueueEx{
    public static void main(String[] args){
        Queue pq = new PriorityQueue();
        pq.offer(3);
        pq.offer(1);
        pq.offer(5);
        pq.offer(2);
        pq.offer(4);
        System.out.println(pq);

        Object obj = null;
        while((obj = pq.poll()) != null)
            System.out.println(obj);
    }
}

```

객체를 저장할 수도 있지만, 객체의 크기를 비교할 수 있는 방법을 제공해야 한다.

위의 경우 컴파일러가 Integer로 오토박싱해준다. Integer는 Number의 자손들이고, 자체적으로 숫자를 비교하는 방법을 정의하고 있다.

### Deque(Double - Ended Queue)

Queue의 변형으로, 한 쪽 끝으로만 추가/삭제할 수 있는 Queue와 달리, Deque(덱, 또는 디큐라고 읽음)은 양쪽 끝에 추가/삭제가 가능하다.

Deque의 조상은 Queue이며, 구현체로는 ArrayDeque과 LinkedList 등.

![Untitled 3](https://user-images.githubusercontent.com/70310271/169659091-55fc960f-89b3-436b-97c0-f2676da781d1.png)


보다시피 스택처럼 쓸수도 있다.

## Iterator, ListIterator, Enumeration

Iterator, ListIterator, Enumeration은 모두 컬렉션에 저장된 요소를 접근하는데 사용되는 인터페이스이다.

Enumeration은 Iterator의 구버젼이며, ListIterator는 Iterator의 기능을 향상시킨것이다.

### Iterator

### 왜? Iterator를 사용하는가?

한마디로, 말하자면 다형성 때문이다.

집합체를 다룰때, 개별적인 클래스에 대해 데이터를 읽는 방법을 알아야하기 때문에 각 컬렉션에 접근이 힘들어진다. 이때 Iterator를 쓰게되면 어떤 컬랙션이라도 동일한 방식으로 접근이 가능하여 그 안에 있는 항목들에 접근할 수 있는 방법을 제공하기 때문이다.

//무슨 객체타입을 불러온지 은닉되어 알 수 없을때, Iterator로 데이터에 접근하는 방식으로 사용하지 않을까 추측한다.

컬렉션에 저장된 요소들을 읽어오는 방법을 표준화하였다.

컬렉션에 저장된 각 요소에 접근하는 기능을 가진 iterator인터페이스를 정의하고, Collection인터페이스에는 ‘Iterator(Iterator를 구현한 클래스의 인스턴스)’를 반환하는 iterator()를 정의하고 있다.

```java
public interface Iterator{
    boolean hasNext();
    Object next();
    void remove();
}

public interface Collection {
    ...
    public Iterator iterator();
    ...
}
```

ArrayList에 저장된 요소들을 출력하기 위한 코드

```java
Collection c = new ArrayList(); // 다른 컬렉션으로 변경하고 싶다면 ArrayList()만 고치면된다.
Iterator it = c.iterator();

while(it.hasNext()){
    System.out.println(it.next());
}
```

Iterator를 이용해서 컬렉션의 요소를 읽어오는 방법을 표준화 했기 때문에 이처럼 코드의 재사용성을 높이는 것이 가능한 것이다.

이처럼 공통 인터페이스를 정의해서 표준을 정의하고 구현하여 표준을 따르도록 함으로써 코드의 일관성을 유지하여 재사용을 극대화하는 것이 객체지향 프로그래밍의 중요한 목적중 하나이다.

Map인터페이스를 구현한 컬렉션 클래스는 키(key)와 값(value)을 쌍(pair)로 저장하고 있기 때문에 iterator()를 직접 호출할 수 없고, 그 대신 keySet()이나 entrySet()과 같은 메서드를 통해서 키와 값을 각각 따로 Set의 형태로 얻어온 후에 다시 iterator()를 호출해야 Iterator를 얻을 수 있다.

```java
Map map = new HashMap();
...
Iterator it = map.entrySet().iterator();

->

Set eSet = map.entrySet();
Iterator it = eSet.iterator();
```

List클래스들은 저장순서를 유지하기 때문에 iterator를 이용해서 읽어 온 결과 역시 저장순서와 동일하지만 Set클래스들은 각 요소간의 순서가 유지되지 않기 때문에 Iterator를 이용해서 저장된 요소들을 읽어와도 처음에 저장된 순서와 같지 않다.

### LiterIterator와 Enumeration

Enumeration은 컬렉션 프레임워크가 만들어지기 이전에 사용하던 것으로 Iterator의 구버젼이다.

이전 버전으로 작성된 소스와의 호환을 위해서 남겨 두고 있을뿐이므로 가능하면 Enumeration대신 Iterator를 사용하자.

ListIterator는 Iterator를 상속받아서 기능을 추가한 것으로, 컬렉션의 요소에 접근할 때 Iterator는 단방향으로만 이동할 수 있는 데 반해 `ListIterator는 양방향으로의 이동이 가능하다.`

다만 ArrayList나 LinkedList와 같이 List인터페이스를 구현한 컬렉션에서만 사용할 수 있다.

### Enumeration

### LiterIterator

메서드 중에서 ‘선택적 기능’이라고 표시된 것들은 반드시 구현하지 않아도된다.

하지만, 인터페이스로부터 상속받은 메서드는 추상메서드라 메서드의 몸통(body)를 반드시 만들어 주어야하므로 다음과 같이 처리한다.

```java
public void remove(){
    throw new UnsupportedOperationException()
}
```

`단순히 public void remove() {};와 같이 구현하는것보다 이처럼 예외를 던져서 구현되지 않은 기능이라는것을 메서드를 호출하는 쪽에서 알리는 것이 좋다.`

그렇지 않으면 호출하는 쪽에서는 소스를 구해보기 전까지는 이 기능이 바르게 동작하지 않는 이유를 알 방법이 없다.

// 이부분부터 잘 이해가 안됬음. 다시 복습할것

remove메서드의 선언부에 예외처리를 하지 않은 이유는 UnsupportedOperationException이 RuntimeException의 자손이기 때문이다.

Iterator의 remove()는 단독으로 쓰일 수 없고, next()와 같이 써야한다.

특정위치의 요소를 삭제하는 것이 아니라 읽어온 것을 삭제한다.

next()의 호출없이 remove()를 호출하면, IllegalStateException이 발생한다.

### 어디에 쓰는가?

이메일을 가져올때, 메일을 읽어만 올것인지(copy), 메일을 가져오면서 서버에서 삭제할 것(move)인지를 선택할 수 있다. 이와같은 기능을 구현하고자 할때 쓸 목적으로 remove()를 정의해 놓은 것이다.

단순히 서버에서 읽어오기만 할때는 next()를 사용하면 되고, 읽어 온 메일을 서버에 남기지 않고 지울때는 next()와 함께 remove()를 사용하면 이와같은 기능을 구현할 수 있다.

```java
class IteratorEx2{
    public static void main(String[] args){
        ArrayList original = new ArrayList(10);
        ArrayList copy1 = new ArrayList(10);
        ArrayList copy2 = new ArrayList(10);

        for(int i = 0; i < 10 ; i++)
            original.add(i+"");

        Iterator it = original.iterator();
        while(it.hasNext())
            copy1.add(it.next());

        System.out.println("= Original에서 copy1으로 복사");
        System.out.println("original: " + original);
        System.out.println("copy1: "+copy1);
        System.out.println();

        it = original.iterator();

        while(it.hasNext()){
            copy2.add(it.next());
            it.remove();
        }

        System.out.println("=Original에서 copy2로 이동(move) =");
        System.out.println("original :"+original);
        System.out.println("copy2 : "+copy2);
    }
}
```

이런 방식으로 구현할 수 있다.

```java
public class MyVector2 extends MyVector implements Iterator {
    int cursor = 0;
    int lastRet = -1;

    public MyVector2(int capacity) {
        super(capacity);
    }

    public MyVector2() {
        this(10);
    }

    public String toString() {
        String tmp = "";
        Iterator it = iterator();

        for (int i = 0; it.hasNext(); i++) {
            if (i != 0) tmp += ", ";
            tmp += it.next();
            return "[" + tmp + "]";
        }

        public Iterator iterator () {
            cursor = 0;
            lastRet = -1;
            return this;
        }

        public boolean hasNext () {
            return cursor != size();
        }

        public Object next () {
            Object next = get(cursor);
            lastRet = cursor++;
            return next;
        }

        public void remove () {
            if (lastRet == -1) {
                throw new IllegalStateException();
            } else {
                remove(lastRet);
                cursor--;
                lastRet = -1;
            }
        }
    }
}
```

이코드 예제 622페이지에 설명이 있는데, 어디에 왜 쓰는지를 모르겠다.

### Arrays

Arrays클래스에는 배열을 다루는데 유요한 메서드가 정의되어 있다.

같은 기능의 메서드가 배열의 타입만 다르게 오버로딩되어있어 많아보이지만 실제로는 그리 많지 않다.

Arrays에 정의된 메서드는 모두 static메서드이다.

### 배열의 복사 - copyOf(), copyOfRange()

copyOf()는 배열 전체를, copyOfRange()는 배열의 일부를 복사해서 새로운 배열을 만들어 반환한다.

늘 그렇듯이 copyOfRange()에 지정된 범위의 끝은 포함되지 않는다.

```java
int[] arr =new int[5];
Arrays.fill(arr, 9);
Arrays.setAll(arr, ()) -> (int)
```

### 배열 채우기 - fill(), setAll()

fill은 배열의 모든 요소를 지정된 값으로 채운다.

setAll()은 배열을 채우는데 사용할 함수형 인터페이스를 매개변수로 받는다.

이 메서드를 호출할 때는 함수형 인터페이스를 구현한 객체를 매개변수로 지정하던가 아니면 람다식을 지정해야한다.

```java
int[] arr = new int[5];
Arrays.fill(arr,9); // arr=[9,9,9,9,9]
Arrays.SetAll(arr,() -> (int)(Math.random()*5+1); // {1,5,2,1,1} 
```

setAll()메서드는 이 람다식이 반환한 임의의 정수로 배열을 채운다.

### 배열의 정렬과 검색 - sort(), binarySearch()

sort()는 배열을 정렬할 때, 그리고 배열에 저장된 요소ㅗ를 검색 할 때는 binarySearch()를 사용한다. 

```java
int[] arr = {3,2,0,1,4};

Arrays.sort(arr); // 배열 정렬
System.out.println(Arrays.toString(arr)); // [0,1,2,3,4]
int idx = Arrays.binarySearch(arr,2) // idx = 2
```

### 배열의 비교와 출력 - equals, toString()

이미 많이 써서 익숙하다.

다차원 배열에서는 deepEquals()를 사용해야한다는점만 알고있자.

### 배열을 List로 변환 - asList(Object... a)

asList()는 배열을 List에 담아서 반환한다.

매개변수의 타입이 가변인수라서 배열 생성없이 저장할 요소들만 나열하는 것도 가능하다.

```java
List list = Arrays.asList(new Integer[] {1,2,3,4,5}); // list = [1,2,3,4,5]
List list = Arrays.asList(1,2,3,4,5);
list.add(6); // UnsupportedOperationException 예외발생

->

List list = new ArrayList(Arrays.asList(1,2,3,4,5)); // 크기변경이 필요하다면 이렇게활용.
```

주의점! asList()가 반환한 List의 크기를 변경할 수 없다는 점.

즉, 추가 또는 삭제가 불가능하다. , 저장된 내용은 변경 가능하다.

만일 크기를 변경할 수 있는 List가 필요하다면 ArrayList로 받으면 된다.

### parallelXXX(), spliterator(), stream()

parallel로 시작하는 이름의 메서드는, 보다 빠른 결과를 얻기 위해 여러 쓰레드가 작업을 나누어 처리하도록 한다.

spliterator()는 여러 쓰레드가 처리할 수 있게 하나의 작업을 여러 작업으로 나누는 Spliterator를 반환하며, stream()은 컬렉션을 스트림으로 변환한다.

### Comparator와 Comparable

**Comparable은 비교 대상(매개 변수)과 자기 자신을 비교한다.**

**Comparator는 매개 변수인 두 객체를 비교한다**

Comparable 인터페이스는 compareTo() 메서드를 사용해 객체를 정렬한다.

Integer, String, File, Date와 같은 클래스는 자체적으로 Comparable 인터페이스를 구현하여 인스턴스 간 크기를 비교한다.

`그래서 Comparable을 구현한 클래스는 정렬이 가능하다는 것을 의미한다.`

```java
public interface Comparator{
    int compare(Object o1, Object o2);
    boolean equals(Object obj);
}

public interface Comparable{
    public int compareTo(Object o);   
}
```

Comparable은 java.lang패키지에 있고, Comparator는 java.util패키지에 있다.

```java
public final class Integer extend Number implements Comparable{
    ...
    public int compareTo(Object o){
        return compareTo((Integer)o);
    }

    public int compareTo(Integer anotherInteger){
        int thisVal = this.value;
        int anotherVal = anotherInteger.value;

        return (thisVal< anotherVal ? -1 : (thisVal == anotherVal ? 0 : 1));
    }
    ...
}
```

Integer클래스의 일부인데, compareTo는 저렇게 구현되어 있다.

TreeSet에 Integer인스턴스를 저장했을때 정렬되는 기준이 compareTo메서드에 의한것이다.

정렬기준을 바꾸고 싶다면 Comparator를 사용하면된다.

### Hash에 대한 정의를 우선 하고 넘어가자.

Hashtable : 해시함수를 거쳐 만들어진 key와 해시함수를 거치기 전 데이터인 value를 무어 함께 저장하는 자료구조.

HashFunction : 일정 값이 input으로 들어가면 고정된 길이의 값을 output으로 반환해주는 함수

Hashing :

특정 Value가 Hash함수를 거쳐 Key값을 반환하고 Key:Value형태로 해쉬 테이블에 저장되는 모든 과정

시간 복잡도 : (O)1

해시 함수로 처리한 결과값(키값)이 같을때 해결방법

1. chaining : 기존값과 새로운 값을 연결리스트를 이용해 연결함.
2. open addressing : 충돌이 일어나면 비어있는 다른 버켓에 저장함.

자바에서 HashTable vs HashMap

HashMap은 보조 해시 함수를 사용해서 충돌이 덜 발생함.

HashMap은 동기화를 지원하지 않음. 동기화를 지원하는 HashTable은 더 느림.

### Set인터페이스

Set인터페이스는 중복을 허용하지 않고 저장순서가 유지되지 않는 컬렉션 클래스를 구현하는데 사용된다.

![Untitled 4](https://user-images.githubusercontent.com/70310271/169659101-f52bbd61-c879-4e1d-b00b-b5f2e7660c68.png)

### Map인터페이스

Map인터페이스는 키(key)와 값(value)을 하나의 쌍으로 묶어서 저장하는 컬렉션 클래스를 구현하는데 사용된다.

Map이란 개념은 어떤 두 값을 연결한다는 의미에서 붙여진 이름이다.

![Untitled 5](https://user-images.githubusercontent.com/70310271/169659105-ab6740a9-d7d8-4062-874e-7ab0e99bbd64.png)

values()에서는 반환타입이 Collection이고, keySet()에서는 반환타입이다.

그 이유는 Map인터페이스에서 값(value)는 중복을 허용하기 때문에 Collection타입으로 반환하고, 키(key)는 중복을 허용하지 않기 때문에 Set타입으로 반환한다.

### Map.Entry인터페이스

Map.Entry인터페이스는 Map인터페이스의 내부 인터페이스이다.

내부 클래스와 같이 인터페이스도 인터페이스 안에 인터페이스를 정의하는 내부 인터페이스(inner interface)를 정의할 수 있다.

Map에 저장되는 key-value쌍을 다루기 위해 내부적으로 Entry인터페이스를 정의해 놓았다.

이것은 보다 객체지향적으로 설계하도록 유도하기 위한것으로 Map인터페이스를 구현하는 클래스에서는 Map.Entry인터페이스도 함께 구현해야한다.

```java
public interface Map{
    ...
    public static interface Entry{
        Object getKey();
        Object getValue();
        Object setValue(Object value);
        boolean equals(Object o);
        int hashCode();
    }
}
```

```java
class ComparatorEx {
    public static void main(String[] args) {
        String[] strArr = {"cat", "Dog", "lion", "tiger"};

        Arrays.sort(strArr); // String의 Comparable구현에 의한 정렬
        System.out.println("strArr=" + Arrays.toString(strArr));

        Arrays.sort(strArr, String.CASE_INSENSITIVE_ORDER); // 대소문자 구분안함
        System.out.println("strArr=" + Arrays.toString(strArr));

        Arrays.sort(strArr, new Descending()); // 역순 정렬
        System.out.println("strArr=" + Arrays.toString(strArr));
    }
}

class Descending implements Comparator{
    public int compare(Object o1, Object o2){
        if( o1 instanceof Comparable && o2 instanceof Comparable){
            Comparable c1 = (Comparable)o1;
            Comparable c2 = (Comparable)o2;
            return c1.compareTo(c2) * -1;
            // -1을 곱해서 기본 정렬방식의 역으로 변경한다.
            //또는 c2.compareTo(c1)와 같이 순서를 바꿔도 된다.
        }
        return -1;
    }
}
```

//return

strArr=[Dog, cat, lion, tiger]
strArr=[cat, Dog, lion, tiger]
strArr=[tiger, lion, cat, Dog]

```java
static void sort(Object[] a)// 객체배열에 저장된 객체가 구현한 Comparable에 의한 정렬
static void sort(Object[] a, Comparator c) // 지정한 Comparator에 의한 정렬

public static final Comparator CASE_INSESITIVE_ORDER
//이 Comparator를 이용하면 대소문자 구분없이 정렬할 수 있다.
Arrays.sort(strArr, String.CASE_INSESITIVE_ORDER);
//대소문자 구분없이 정렬
```

String의 Comparable구현은 문자열 사전순이다.

문자열의 오름차순 정렬은 공백, 숫자, 대문자, 소문자 순이다.

즉, 유니코드 순서가 작은값부터 큰값으로 정렬되는것이다.

대소문자를 구분하지 않고 비교하는 Comparator를 상수의 형태로 제공한다.

compare()의 매개변수가 Object타입이기 때문에 compareTo()를 바로 호출할 수없으므로 먼저 Comparable로 형변환해야한다는것만 확인하자.

## HashSet

HashSet은 Set인터페이스를 구현한 가장 대표적인 컬렉션이다.

Set인터페이스의 특징대로 HashSet은 중복된 요소를 저장하지 않는다.

HashSet은 저장 순서를 유지하지 않으므로, `저장순서를 유지하고자 한다면 LinkedHashSet을 사용해야한다.`

HashSet은 내부적으로 HashMap을 이용해서 만들어졌으며, HashSet이란 이름은 해싱(hashing)을 이용해서 구현했기 때문에 붙여진 것이다.

//그냥 편하게 Set이라 생각하자. 구현할때, HashMap을 쓴것일 뿐이다.

load factor는 컬렉션 클래스에 저장공간이 가득 차기전에 미리 용량을 확보하기 위한 것으로 이 값을 0.8로 지정하면, 저장공간의 80%가 채워졌을 때 용량이 두배로 늘어난다. 기본값은 0.75,즉 75%이다.

```java
class HashSetEx1{
    public static void main(String[] args){
        Object[] objArr = {"1",new Integer(1),"2","2","3","3","4","4","4"};

        Set set = new HashSet();

        for(int i = 0 ; i < objArr.length; i++){
            set.add(objArr[i]);
        }

        System.out.println(set);

    }
}
```

//return

[1, 1, 2, 3, 4]

String인스턴스와 Integer인스턴스는 다른 객체이기 때문에 중복으로 간주하지 않는다.

```java
class HashSetEx1{
    public static void main(String[] args){
        Set set = new HashSet();

        for (int i = 0; set.size() <6 ; i++){
            int num = (int) (Math.random()*45) + 1;
            set.add(new Integer(num));
        }

        List list = new LinkedList(set);

        Collections.sort(list);

        System.out.println(list);
    }
}
```

sort는 인자로 List인터페이스 타입을 필요로 한다.

```java
class Bingo{
    public static void main(String[] args){
        Set set = new HashSet();
        //Set set = new LinkedHashSet();
        int[][] board = new int[5][5];

        for(int i = 0 ; set.size() < 25; i++){
            set.add((int)(Math.random()*50)+1+"");
        }

        Iterator it = set.iterator();

        for(int i = 0 ; i < board.length; i++){
            for(int j = 0; j < board[i].length; j++){
                board[i][j] = Integer.parseInt((String)it.next());
                System.out.print((board[i][j] < 10 ? " " : " ") +board[i][j]);
            }
            System.out.println();
        }
    }
}
```

//return

23 46 47 27 49
28 29 30 31 32
14 36 37 15 39
17 1 2 3 4
7 8 40 43 21

여러번 실행해보면, 같은 숫자가 비슷한 위치에 나온다. 그 이유는

HashSet은 저장된 순서를 보장하지 않고 자체적인 저장방식에 따라 순서가 결정된다.

```java
class Test{
    public static void main(String[] args) {
        HashSet set = new HashSet();

        set.add("abc");
        set.add("abc");
        set.add(new Person("David", 10));
        set.add(new Person("David", 10));

        System.out.println(set);
    }

    static class Person {
        String name;
        int age;

        Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        public String toString() {
            return name + ":" + age;
        }
    }
}

```

같은 사람으로 인식하려는 의도로 작성하였지만, 실행결과를 보면 두 인스턴스의 name과 age의 값이 같음에도 불구하고 서로 다른것으로 인식하여 ‘David:10’이 두번 출력되었다.

클래스의 작성의도대로 이 두 인스턴스를 같은것으로 인식하게 하려면 어떻게 해야하는걸까?

```java
class Test1{
    public static void main(String[] args) {
        HashSet set = new HashSet();

        set.add("abc");
        set.add("abc");
        set.add(new Person2("David", 10));
        set.add(new Person2("David", 10));

        System.out.println(set);
    }

    static class Person2 {
        String name;
        int age;

        Person2(String name, int age) {
            this.name = name;
            this.age = age;
        }

        public boolean equals(Object obj) {
            if (obj instanceof Person2) {
                Person2 tmp = (Person2) obj;
                return name.equals(tmp.name) && age == tmp.age;
            }

            return false;
        }

        public int hashCode() {
            return (name + age).hashCode();
        }

        public String toString() {
            return name + ":" + age;
        }
    }
}
```

HashSet의 add메서드는 새로운 요소를 추가하기 전에 기존에 저장된 요소와 같은 것인지 판별하기 위해 추가하려는 `요소의 equals()와 hashCode()를 호출한다.`

equals()와 hashCode()를 목적에 맞게 오버라이딩하면된다.

해시코드는 해시 알고리즘에 의해 생성된 정수값이다.

```java
public int hashCode(){
    return (name+age).hashCode();
}
```

위의 코드를 jdk1.8부터 추가된 java.util.Objects클래스의 hash()를 이용해서 작성한다.

```java
public int hashCode(){
    return Objects.hash(name,age); // int hash(Object... values)
}
```

오버라이딩을 통해 작성된 hashCode()는 세가지 조건을 만족시켜야한다.

1. 실행 중인 애플리케이션 내의 동일한 객체에 대해서 여러 번 hashCode()를 호출해도 동일한 int값을 반환해야한다. 하지만, 실행시마다 동일한 int값을 반환할 필요는 없다. (단, equals메서드의 구현에 사용된 멤버변수의 값이 바뀌지 않았다고 가정한다.

```java
Person2 p = new Person2("David",10);
int hashCode1 = p.hashCode();
int hashCode2 = p.hashCode();

p.age = 20;
int hashCode3 = p.hashCode();
```

hashCode1과 hashCode2는 실행마다 값이달라 질 수 있지만, 서로 동일한 해시코드를 반환한다.

멤버변수 age가 변경된 후에는 hashCode메서드를 호출한 결과이므로

hashCode3와는 hashCode1,hashCode2가 달라도된다.

String클래스는 문자열의 내용으로 해시코드를 만들어 내기 때문에 내용이 같은 문자열에 대한 hashCode()호출은 항상 동일한 해시코드를 반환한다. 반면에 OBject클래스는 객체의 주소로 해시코드를 만들어 내기 때문에 실행할 때마다 해시코드값이 달라질 수 있다.

1. equals메서드를 이용한 비교에 의해서 true를 얻은 두객체에 대해 각각 hashCode()를 호출해서 얻은 결과는 반드시 같아야한다.

```java
Person2 p1 = new Person2("David", 10);
Person2 p2 = new Person2("David", 10);

boolean b = p1.equals(p2);

int hashCode1 = p1.hashCode();
int hashCode2 = p2.hashCode();
```

b의 값이 true라면, hashCode1과 hashCode2는 같아야한다.

1. equals메서드를 호출했을 때 false를 반환하는 두 객체는 hashCode() 호출에 대해 같은 int값을 반환하는 경우가 있어도 괜찮지만, 해싱(hasing)을 사용하는 컬렉션의 성능을 향상시키기 위해서는 다른 int값을 반환하는 것이 좋다.

`위의 코드에서 변수 b의값이 false일지라도 hashCode1과 hashCode2의 값이 같은 경우가 발생하는 것을 허용한다.`

하지만, 해시코드를 사용하는 Hashtable이나, HashMap과 같은 컬렉션의 성능을 높이기 위해서는 가능한 한 서로 다른 값을 반환하도록 hashCode()를 잘 작성해야한다.

`서로 다른 객체에 대해서 해시코드값이 중복되는 경우가 많아질수록 해싱을 사용하는 Hashtable,HashMap과 같은 컬렉션의 검색속도가 떨어지기 때문이다.`

```java
class HashSetEx5{
    public static void main(String args[]){
        HashSet setA = new HashSet();
        HashSet setB = new HashSet();
        HashSet setHab = new HashSet();
        HashSet setKyo = new HashSet();
        HashSet setCha = new HashSet();

        setA.add("1"); setA.add("2"); setA.add("3");
        setA.add("4"); setA.add("5");
        System.out.println("A = "+setA);

        setB.add("4"); setB.add("5"); setB.add("6");
        setB.add("7"); setB.add("8");
        System.out.println("B = "+setB);

        Iterator it = setB.iterator();
        while(it.hasNext()){
            Object tmp = it.next();
            if(setA.contains(tmp))
                setKyo.add(tmp);
        }

        it = setA.iterator();
        while(it.hasNext()){
            Object tmp = it.next();
            if(!setB.contains(tmp))
                setCha.add(tmp);
        }

        it = setA.iterator();
        while(it.hasNext()){
            setHab.add(it.next());
        }

        it = setB.iterator();
        while(it.hasNext())
            setHab.add(it.next());

        System.out.println("A 교 B = "+setKyo);
        System.out.println("A 합 B = "+setHab);
        System.out.println("A 차 B = "+setCha);
    }
}
```

//return

A = [1, 2, 3, 4, 5]
B = [4, 5, 6, 7, 8]
A 교 B = [4, 5]
A 합 B = [1, 2, 3, 4, 5, 6, 7, 8]
A 차 B = [1, 2, 3]

사실 Set은 중복을 허용하지 않으므로 HashSet의 메서드를 호출하는 것만으로도 간단하게 합집합(addAll), 교집합(retainAll), 차집합(removeAll)을 구할 수 있다.

## TreeSet

TreeSet은 이진트리 형태로 데이터를 저장하는 컬렉션 클래스이다.

이진 검색 트리는 정렬, 검색, 범위검색(Range Search)에 높은 성능을 보이는 자료구조이다.

TreeSet은 이진 검색 트리의 성능을 향상시킨 ‘Red-Black tree’로 구현되어 있다.

Set인터페이스로 구현되었기에, 중복된 데이터의 저장을 허용하지 않으며 정렬된 위치에 저장하므로 저장순서를 유지하지도 않는다.

```java
class TreeNode{
    TreeNode left;
    Object element;
    TreeNode right;
}
```

예를 들어, 이진검색트리에 7,4,9,1,5의 순서로 값을 저장한다고 가정했을때,

![Untitled 6](https://user-images.githubusercontent.com/70310271/169659114-8dbff43d-9cfa-4116-94d4-ed14cecfaf56.png)

컴퓨터는 알아서 값을 비교하지 못하므로,

TreeSet에 저장되는 객체가 Comparable을 구현하던가 아니면, TreeSet에게 Comparator를 제공해서 두 객체를 비교할 방법을 알려줘야 한다.

그렇지 않으면 TreeSet에 객체를 저장할 때 예외가 발생한다.

트리는 데이터를 순차적으로 저장하는 것이 아니라 저장위치를 찾아서 저장해야하고, 삭제하는 경우 트리의 일부를 재구성해야하므로 링크드 리스트보다 데이터의 추가/삭제 시간은 더 걸린다. 대신 배열이나 링크드 리스트에 비해 검색과 정렬기능이 더 뛰어나다.

### 이진검색트리(binary search tree)

- 모든 노드는 최대 두개의 자식노드를 가질 수 있다.
- 왼쪽 자식노드의 값은 부모노드값보다 작고 오른쪽 자식노드의 값은 부모노드의 값보다 커야한다.
- 노드의 추가 삭제에 시간이 걸린다. (순차적으로 저장하지 않으므로)
- 검색(범위검색)과 정렬에 유리하다.
- 중복된 값을 저장하지 못한다.

```java
class TreeSetLotto{
    public static void main(String[] args){
        Set set = new TreeSet();

        for(int i = 0; set.size() < 6; i++){
            int num = (int)(Math.random()*45) + 1;
            set.add(num); // set.add(new Integer(num));
        }
        System.out.println(set);
    }
}
```

이전과의 코드와는 다르게 정렬하는 코드가 빠져있는데, 그 이유는

`TreeSet은 저장할 때 이미 정렬하기 때문에 읽어올 때 따로 정렬할 필요가 없기 때문이다.`

```java
class TreesetEx1{
    public static void main(String[] args){
        TreeSet set = new TreeSet();

        String from = "b";
        String to = "d";

        set.add("abc"); set.add("alien"); set.add("bat");
        set.add("car"); set.add("Car"); set.add("disc");
        set.add("dance"); set.add("dZZZZ"); set.add("dzzzz");
        set.add("elephant"); set.add("elevator"); set.add("fan");
        set.add("flower");

        System.out.println(set);
        System.out.println("range search : from " + from + " to " + to);
        System.out.println("result1 : " + set.subSet(from,to));
        System.out.println("result2 : " + set.subSet(from,to + "zzz"));

    }
}
```

//return

[Car, abc, alien, bat, car, dZZZZ, dance, disc, dzzzz, elephant, elevator, fan, flower]
range search : from b to d
result1 : [bat, car]
result2 : [bat, car, dZZZZ, dance, disc]

d로 시작하는 단어중에서 ‘dzzz’다음에 오는 단어는 없을것이기 때문에 d로 시작하는 모든 단어들이 포함될 것이다.

가능하다면 대문자 또는 소문자로 통일해서 저장하는것이 좋다.

반드시 대소문자가 섞여 있어야 하거나 다른 방식으로 정렬해야하는경우 Comparator를 이용하면 된다.

`문제가 발생한다면 ASCII코드에서 대문자가 소문자보다 앞에있다는점을 고려해보자.`

복습 ! → 정렬순서는 공백, 숫자, 대문자, 소문자이다.

```java
class Asciiprint{
    public static void main(String[] args){
        char ch = ' ';
        for(int i = 0; i < 95; i++)
            System.out.print(ch++);
    }
}
```

모르겠으면 검색하던지 그냥 공백부터 돌려보자.

```java

class TreeSetEx2{
    public static void main(String[] args){
        TreeSet set = new TreeSet();
        int[] score = {80,95,50,35,45,65,10,100};

        for(int i = 0 ; i < score.length ; i++)
            set.add(new Integer(score[i]));

        System.out.println("50보다 작은 값 :" + set.headSet(new Integer(50)));
        System.out.println("50보다 큰 값 :" + set.tailSet(new Integer(50)));
    }
}
```

//return

50보다 작은 값 :[10, 35, 45]
50보다 큰 값 :[50, 65, 80, 95, 100]

![Untitled 7](https://user-images.githubusercontent.com/70310271/169659120-525cd2c7-9238-4619-b817-95fd6aa5c912.png)

## HashMap과 Hashtable

Hashtable은 HashMap으로 발전했다.

Hashmap은 Map을 구현했으므로 앞에서 살펴본 Map의특징, 키(key)와 값(value)를 묶어서 하나의 데이터(entry)로 저장한다는 특징이 있다.

해싱(hashing)을 사용하기 떄문에 많은 양의 데이터를 검색하는데 있어서 뛰어난 성능을 보인다.

```java
public class HashMap extends AbstractMap implements Map, Cloneable, Serializable{
    transient Entry[] table;
    ...
    static class Entry implements Map.Entry{
        final Object key;
        Object value;
        ...
    }
}
```

key와 value는 별개의 값이 아니기 때문에, 하나의 클래스로 정의해서 하나의 배열로 다루는것이 데이터(integrity)적인 측면에서 더 바람직하다.

```java
Object[] key;
Object[] value;

-> Non_OOP

Entry[] table;
class Entry{
    Object key;
    Object value;
}

-> OOP_Code
```

```java
class HashMapEx1{
    public static void main(String[] args){
        HashMap map = new HashMap();
        map.put("myId","1234");
        map.put("asdf","1111");
        map.put("asdf","1234");

        Scanner s = new Scanner(System.in);

        while(true){
            System.out.println("id와 password를 입력해주세요.");
            System.out.print("id : ");
            String id = s.nextLine().trim();

            System.out.print("password : ");
            String password = s.nextLine().trim();
            System.out.println();

            if(!map.containsKey(id)){
                System.out.println("입력하신 id는 존재하지 않습니다." + " 다시 입력해주세요.");
                continue;
            }

            if(!(map.get(id)).equals(password)){
                System.out.println("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
            } else {
                System.out.println("id와 비밀번호가 일치합니다.");
                break;
            }
        }
    }
}
```

3개의 데이터의 쌍을 저장했지만, 실제로는 2개 밖에 저장되지 않는다.

중복되었기 때문인데, 이렇게 중복될시에는 기존의 값을 덮어쓴다.

그래서 키 ‘asdf’에 연결된 값은 ‘1234’이다.

Hashtable은 키(key)나 값(value)으로 null을 허용하지 않지만, HashMap은 허용한다.

그래서 ‘map.put(null,null);’이나 ‘map.get(null);’과 같이 할 수 있다.

map.get은 key에 대한 value를 반환한다.

```java
class HashMapEx2{
    public static void main(String[] args){
        HashMap map = new HashMap();
        map.put("김자바", new Integer(100));
        map.put("이자바", new Integer(100));
        map.put("강자바", new Integer(80));
        map.put("안자바", new Integer(90));

        Set set = map.entrySet();
        Iterator it = set.iterator();

        while(it.hasNext()){
            Map.Entry e = (Map.Entry)it.next();
            System.out.println("이름 : "+ e.getKey() + ", 점수 : " + e.getValue());
        }

        set = map.keySet();
        System.out.println("참가자 명단 : " + set);

        Collection values = map.values();
        it = values.iterator();

        int total = 0;
        while(it.hasNext()){
            Integer i = (Integer)it.next();
            total += i.intValue();
        }

        System.out.println("총점 : " + total);
        System.out.println("평균 : " + (float)total/set.size());
        System.out.println("최고점수 : "+ Collections.max(values));
        System.out.println("최고점수 : "+ Collections.min(values));
    }
}
```

entrySet() → [안자바=90, 김자바=100, 강자바=80, 이자바=100] 이렇게 들어간다.

```java
class HashMapEx2{
    public static void main(String[] args){
        HashMap map = new HashMap();
        map.put("김자바", new Integer(100));
        map.put("이자바", new Integer(100));
        map.put("강자바", new Integer(80));
        map.put("안자바", new Integer(90));

        Set set = map.entrySet();
        Iterator it = set.iterator();

        while(it.hasNext()){
            //System.out.println(it.next());
            Map.Entry e = (Map.Entry)it.next();
            System.out.println("이름 : "+ e.getKey() + ", 점수 : " + e.getValue());
        }

        set = map.keySet();
        System.out.println("참가자 명단 : " + set);

        Collection values = map.values();
        it = values.iterator();

        int total = 0;
        while(it.hasNext()){
            Integer i = (Integer)it.next();
            total += i.intValue();
        }

        System.out.println("총점 : " + total);
        System.out.println("평균 : " + (float)total/set.size());
        System.out.println("최고점수 : "+ Collections.max(values));
        System.out.println("최고점수 : "+ Collections.min(values));
    }
}
```

//return

이름 : 안자바, 점수 : 90
이름 : 김자바, 점수 : 100
이름 : 강자바, 점수 : 80
이름 : 이자바, 점수 : 100
참가자 명단 : [안자바, 김자바, 강자바, 이자바]
총점 : 370
평균 : 92.5
최고점수 : 100
최고점수 : 80

it.next()를 돌리면 이렇게 된다.

배열에 대한 pos는 next()가 호출될때마다 게속해서 변화한다는점을 알고 있자!

안자바=90
이름 : 김자바, 점수 : 100
강자바=80
이름 : 이자바, 점수 : 100

```java
class HashMapEx3{
    static HashMap phoneBook = new HashMap();

    public static void main(String[] args) {
        addPhoneNo("친구", "이자바", "010-111-1111");
        addPhoneNo("친구", "김자바", "010-222-2222");
        addPhoneNo("친구", "김자바", "010-333-3333");
        addPhoneNo("회사", "김대리", "010-444-4444");
        addPhoneNo("회사", "김대리", "010-555-5555");
        addPhoneNo("회사", "박대리", "010-666-6666");
        addPhoneNo("회사", "이과장", "010-777-7777");
        addPhoneNo("세탁", "이자바", "010-888-8888");

        printList();
    }

    static void addPhoneNo(String groupName, String name, String tel){
        addGroup(groupName);
        HashMap group = (HashMap)phoneBook.get(groupName);
        group.put(tel,name);
    }

    static void addGroup(String groupName){
        if(!phoneBook.containsKey(groupName))
            phoneBook.put(groupName, new HashMap());
    }

    static void addPhoneNo(String name, String tel){
        addPhoneNo("기타", name, tel);
    }

    static void printList(){
        Set set = phoneBook.entrySet();
        //System.out.println(set);
        Iterator it = set.iterator();
        //System.out.println(it);
        while(it.hasNext()){
            Map.Entry e = (Map.Entry)it.next();
            //System.out.println(e);
            Set subSet = ((HashMap)e.getValue()).entrySet();
            //System.out.println(subSet);
            Iterator subIt = subSet.iterator();

            System.out.println(" * "+e.getKey() + "[" + subSet.size() + "]");

            while(subIt.hasNext()){
                Map.Entry subE = (Map.Entry)subIt.next();
                String telNo = (String)subE.getKey();
                String name = (String)subE.getValue();
                System.out.println(name + " " + telNo);
            }
            System.out.println();
        }
    }
}
```

//System.out.println(set);

[세탁={010-888-8888=이자바}, 친구={010-111-1111=이자바, 010-222-2222=김자바, 010-333-3333=김자바}

//System.out.println(it);

java.util.HashMap$EntryIterator@776ec8df

//System.out.println((HashMap)e.getValue());

{010-777-7777=이과장, 010-444-4444=김대리, 010-555-5555=김대리, 010-666-6666=박대리}

배열

//System.out.println(e);

회사={010-777-7777=이과장, 010-444-4444=김대리, 010-555-5555=김대리, 010-666-6666=박대리}

//System.out.println(subSet);

[010-777-7777=이과장, 010-444-4444=김대리, 010-555-5555=김대리, 010-666-6666=박대리]

### 해싱과 해시함수

해싱이란 해시함수(hash function)를 이용해서 데이터를 해시테이블(hash table)에 저장하고 검색하는 기법을 말한다. 해시함수는 데이터가 저장되어 있는 곳을 알려주기 때문에 다량의 데이터 중에서도 원하는 데이터를 빠르게 찾을 수 있다.

해싱을 구현한 컬렉션 클래스로 HashSet, HashMap, Hashtable등이 있다.

해싱에서 사용하는 자료구조는 배열과 링스크드 리스트의 조합이다.

### TreeMap

이진 검색트리의 형태로 키와 값의 쌍으로 이루어진 데이터를 저장한다. 그래서 검색과 정렬에 적합한 컬렉션 클래스.

검색에 관한한 대부분의 경우에서 HashMap이 TreeMap보다 더 뛰어나다.

하지만, 범위검색이나 정렬이 필요한 경우에는 TreeMap을 사용하자!

### Properties

Properties는 HashMap의 구버전인 Hashtable의 상속받아 구현.

Hashtable은 키와 값을 (Object, Object)의 형태로 저장.

Properties는 (String, String)의 형태로 저장하는 단순화된 컬렉션클래스.

```java
class Properties{
    public static void main(String[] args) {
        Properties prop = new Properties();
        
        prop.setProperty("timeout", "30");
        prop.setProperty("language", "kr");
        prop.setProperty("size", "10");
        prop.setProperty("capacity", "10");

        Enumeration e = prop.propertyNames();

        while (e.hasMoreElements()) {
            String element = (String) e.nextElement();
            System.out.println(element + "="prop.getProperty(element));
        }

        System.out.println();
        prop.setProperty("size", "20");
        System.out.println("size=" + prop.getProperty("size"));
        System.out.println("capacity=" + prop.getProperty("capacity", "20"));
        System.out.println("loadfactor=" + prop.getProperty("loadfacotr", "0.75"));

        System.out.println(prop);
        prop.list(System.out);
    }
}
```

setProperty()는 단순히 hashtable의 put메서드를 호출한다.

값이 있으면 Object타입을 반환 없으면 null을 반환한다.

// 사실상 너무 옛날 컬렉션이라 쓰일지도 모르겠다. 필요할때 다시 찾아보자.

key에 문자’=’를 포함시키고자 한다면 escape문자 ‘\’를 사용하여 ‘\=’와 같이 표현한다.

### Collections

Arrays가 배열과 관련된 메서드를 제공하는것 처럼, Collections는 컬렉션과 관련된 메서드를 제공한다.fill(), copy(), sort(), binarySearch() 등의 메서드는 두 클래스에 모두 포함되어 있으며 같은 기능을 한다. 

`다시 말하지만, java.util.Collection은 인터페이스고, java.util.Collections는 클래스이다.`

### 컬렉션의 동기화

멀티 쓰레드 프로그래밍에서는 하나의 객체를 여러 쓰레드가 동시에 접근할 수 있기 때문에 데이터의 일관성을 유지하기 위해서는 공유되는 객체에 동기화가 필요하다.

Vector와 Hashtable과 같은 구버젼의 클래스들은 자체적으로 동기화 처리가 되어있는데, 멀티쓰레드 프로그래밍이 아닌 경우에는 불필요한 기능이 되어 성능을 떨어뜨리는 요인이된다.

그래서 새로 추가된 ArrayList와 HashMap과 같은 컬렉션은 동기화를 자체적으로 처리하지 않고 필요한 경우에만 java.util.Collections클래스의 동기화 메서드를 이용해서 동기화처리가 가능하도록 변경하였다.

동기화가 필요할 때 해당하는것을 사용하면된다.

```java
static Collection synchronizedCollection(Collection c)
static List synchronizedList(List list)
static Set synchronizedSet(Set s)
static Map synchronizedMap(Map m)
static SortedSet synchronizedSortedSet(SortedSet s)
static SortedMap synchronizedSortedMap (SortedSetMap m)

List syncList = Collections.synchhronizedList(new ArrayList(...));//이렇게쓴다.
```

기억할건. `Collections로 한 객체에 여러개의 쓰레드를 동시 접근할수 있다.`

### 변경불가 컬렉션 만들기

`데이터 보호를 위해서 컬렉션을 읽기전용으로 만들어야할때 사용하는 메서드`

```java
static Collection unmodifiableCollection Collection c)
static List unmodifiableList(List list)
static Set unmodifiableSet(Set s)
static Map unmodifiableMap(Map m)
static NavigableSet unmodifiableNavigableSet(NavigableSet s)
static SortedSet unmodifiableSortedSet(SortedSet s)
static NavigableMap unmodifiableNavigableMap(NavigableMap m)
static SortedMap unmodifiableSortedMap(SortedMap m)
```

### 싱클톤 컬렉션 만들기

단 하나의 객체만을 저장하는 컬렉션을 만들때 사용하는 메서드.

```java
static Lst singletonList(Object o)
static Set singleton(Object o)
static Map singletonMap(Object key, Object value)
```

매개변수로 저장할 요소를 지정하면, 해당 요소를 저장하는 컬렉션을 반환한다 그리고 반환된 컬렉션은 변경할 수 없다.

### 한 종류의 객체만 저장하는 컬렉션 만들기

컬렉션에 모든 종류의 객체를 저장할 수 있다는 것은 장점이기도 하고 단점이기도 하다.

대부분의 경우 한 종류의 객체를 저장하며, 컬렉션에 지정된 종류의 객체만 저장할 수 있도록 제한하고 싶을때 아래의 메서드를 사용한다.

```java
static Collection checkedCollection(Collection c, Class type)
static List chckedList(List list, Class type)
static Set checkedSet(set s, Class type)
static Map checkedMap(Map m, Class keyType, Class valueType)
static Queue checkedQueue(Queue queue, Class type)
static NavigableSet checkedNavigableSet(NavigableSet s, Class type)
static SortedSet checkedSortedSet(SortedSet s, Class type)
static NavigableMap chekcedNavigableMap(NavigableMap m, Class keyType, Class valueType)
static SortedMap checkedSortedMap(SortedMap m, Class keyType, Class valueType)
```

```java
List list = new ArrayList();
List checkedList = checkedList(list, String.class);
checkedList.add("abc");
checkedList.add(new Integer(3));
```

`컬렉션에 저장할 요소의 타입을 제한하는것은 지네릭스로 간단히 처리할 수 있는데도 이러한 메서드를 제공하는 이유는 호환성 때문이다.`

지네릭스는 jdk1.5부터 도입된 기능으로 그 이전에는 이 코드들이 필요하다.

```java
class CollectionsEx{
    public static void main(String[] args){
        List list = new ArrayList();
        System.out.println(list);

        addAll(list, 1,2,3,4,5);
        System.out.println(list);

        rotate(list, 2);
        System.out.println(list);

        swap(list, 0,2);
        System.out.println(list);

        shuffle(list);
        System.out.println(list);

        sort(list, reverseOrder());
        System.out.println(list);

        sort(list);
        System.out.println(list);

        int idx = binarySearch(list, 3);
        System.out.println("index of 3 = " + idx);

        System.out.println("max = "+max(list));
        System.out.println("min = "+min(list));
        System.out.println("min = "+max(list, reverseOrder()));

        fill(list, 9);
        System.out.println("list="+list);

        //list와 같은 크기의 새로운 list를 생성하고 2로 채운다. 단 결과는 변경 불가.
        List newList = nCopies(list.size(), 2);
        System.out.println("newList="+newList);

        System.out.println(disjoint(list,newList)); //공통요소가 없으면 true

        copy(list, newList);
        System.out.println("newList="+newList);
        System.out.println("list="+list);

        replaceAll(list,2,1);
        System.out.println("list="+list);
        Enumeration e = enumeration(list);
        ArrayList list2 = list(e);

        System.out.println("list2="+list2);
    }
}
```

//return

[]
[1, 2, 3, 4, 5]
[4, 5, 1, 2, 3]
[1, 5, 4, 2, 3]
[3, 4, 1, 5, 2]
[5, 4, 3, 2, 1]
[1, 2, 3, 4, 5]
index of 3 = 2
max = 5
min = 1
min = 1
list=[9, 9, 9, 9, 9]
newList=[2, 2, 2, 2, 2]
true
newList=[2, 2, 2, 2, 2]
list=[2, 2, 2, 2, 2]
list=[1, 1, 1, 1, 1]
list2=[1, 1, 1, 1, 1]

굉장히 유용한 Collections들이니 꼭 연습해두자.

![Untitled 8](https://user-images.githubusercontent.com/70310271/169659134-c66e29a6-0596-4c1a-ad7d-0309596db120.png)

