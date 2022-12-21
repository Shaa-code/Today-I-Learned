# 스트림(Stream)

## 스트림이란?

각 컬렉션에는 같은 기능의 메서드들이 중복해서 정의되어있다,

ex)Collections.sort(), Arrays.sort()

위와 같은 메서드를 하나로 묶어서 해결하기 위한것이 스트림이다.

스트림은 데이터소스를 추상화하고, 데이터를 다루는데 자주 사용되는 메서드들을 정의해 놓았다.

```java
String[] strArr = {"aaa","ddd","ccc"};
List<String> strList = Arrays.asList(strArr);
```

이 데이터 소스를 기반으로하는 스트림

```java
Stream<String> strStream1 = strList.stream();
Stream<String> strStream2 = Arrays.stream(strArr);
```

두 스트림으로 데이터를 읽어서 출력하는법

```java
strStream1.sorted().forEach(System.out::println);
strStream2.sorted().forEach(System.out::println);
```

데이터소스를 추상화하였다는것은, 데이터 소스가 무엇이던 간에 같은 방식으로 다룰 수 있게 되었다는것과 코드의 재사용성이 높아진다는것을 의미한다.

스트림을 이용하면, 배열이나 컬렉션뿐만 아니라 파일에 저장된 데이터도 모두 같은 방식으로 다룰 수 있다.

### 스트림은 데이터 소스를 변경하지 않는다.

스트림은 데이터 소스로 부터 데이터를 읽기만 한다.

필요하다면, 정렬된 결과를 컬렉션이나 배열에 담아서 반환할수 있다.

//정렬된 결과를 새로운 List에 담아서 반환한다.

```java
List<String> sortedList = strStream2.sorted().collect(Collectors.toList());
```

### 스트림은 일회용이다.

Iterator와 비슷하다. Iterator로 컬렉션의 요소를 모두 읽고나면 다시 사용할 수 없다.

스트림도 한번 사용하면 닫혀서 다시 사용할 수 없다.

필요하다면 다시 생성해야한다.

```java
strStream1.sorted().forEach(System.out::println);
int numOfStr = strStream1.count(); //ERROR 스트림이 이미 닫혔음.
```

### 스트림은 작업을 내부 반복으로 처리한다.

스트림을 이용한 작업이 간결할 수 있는 비결중 하나가 바로 ‘내부 반복’이다.

### 내부 반복 이란?

반복문을 메서드의 내부에 숨길 수 있다는것을 의미한다.

forEach()는 스트림에 정의된 메서드 중의 하나로 매개변수에 대입된 람다식을 데이터 소스의 모든 요소에 적용한다.

```java
for(String str : strList)
    System.out.println(str);

->

stream.forEach(System.out::println); // (str) -> System.out.println(str)
```

 즉, forEach()는 메서드 안으로 for문을 넣은것이다.

```java
void forEach(Consumer<? super T> action) {
    Objects.requireNonNull(action); // 매개변수의 널 체크
    
    for (T t : src){
        action.accept(T);
    }
}

```

### 스트림의 연산

스트림에 정의된 메서드 중에서 데이터 소스를 다루는 작업을 수행하는 것을 연산(operation)이라고 한다.

```java
stream.distinct().limit(5).sorted().forEach(System.out::println)
```

스트림이 제공하는 연산은 중간연산과 최종연산으로 분류할 수 있다.

중간 연산 : 연산결과를 스트림으로 반환하기 때문에 중간 연산을 연속해서 연결 할 수 있다.

최종 연산 : 스트림의 요소를 소모하면서 연산을 수행하므로 단 한번만 연산이 가능하다.

```java
String[] strArr = {"dd", "aaa","CC","cc","b"};
Stream<String> stream = Stream.of(strArr); // 문자열 배열이 소스인 스트림
Stream<String> filterdStream = stream.filter(); // 걸러내기 (중간 연산)
Stream<String> distinctedStream = stream.distinct(); // 중복제거 (중간 연산)
Stream<String> sortedStream = stream.sort(); // 정렬(중간 연산)
Stream<String> limitedStream = stream.limit(5); // 스트림 자르기(중간 연산)
int total = stream.count(); // 요소 개수세기(최종연산)
```

반환 타입을 잘보면 이해하기 쉽다.

| 중간 연산 | 설명 |
| --- | --- |
| Stream<T> distinct() | 중복을 제거 |
| Stream<T> filter(Predicate<T> predicate) | 조건에 안 맞는 요소 제외 |
| Stream<T> limit(long maxSize) | 스트림의 일부를 잘라낸다. |
| Stream<T> skip(long n) | 스트림의 일부를 건너뛴다. |
| Stream<T> peek(Consumer<T> action) | 스트림의 요소에 작업수행 |
| Stream<T> sorted() </br>Stream<T> sorted(Compartor<T> comparator) | 스트림의 요소를 정렬한다. |
| Stream<R> map(Function<T,R> mapper) </br>DoubleStream mapToDouble(ToDoubleFunction<T> mapper) </br>IntStream mapToInt (ToIntFunction<T> mapper) </br>LongStream mapToInt (ToIntFunction<T> mapper) </br>Stream<R> flatMap(Function<T,Stream<R>> mapper)</br>DoubleStream flatMapToDouble(Function<T,DoubleStream>  </br>IntStream flatMapToInt(Function<T,IntStream> m) </br>LongStream flatMapToLong(Function<T,LongStream> m) | 스트림의 요소를 변환한다. |

| 최종 연산 | 설명 |
| --- | --- |
| void forEach(Consumer<? super T> action </br> void forEachOrdered(Consumer<? super T> action | 각 요소에 지정된 작업 수행 |
| long count() | 스트림의 요소의 개수 반환 |
| Optional<T> findAny() // 아무거나 하나 </br> Optional<T> findFirst() // 첫번째 요소 | 스트림 요소 하나를 반환 |
| boolean allMatch(Predicate<T> p) //모두 만족하는지 </br> boolean anyMatch(Predicate<T> p) // 하나라도 만족하는지 </br> boolean nonMatch(Predicate<> p) // 모두 만족하지 않는지 | 주어진 조건을 모든 요소가 만족시키는지, 만족시키지 않는지 확인 |
| Object[] toArray() </br> A[] toArray(IntFunction<A[]> generator) | 스트림의 모든 요소를 배열로 반환 |
| Optional<T> reduce(BinaryOperator<T>accumulator) </br> T reduce(T idetity, BinaryOperator<T> accumulator)</br> U reduce(U identity, BiFunction<U,T,U> accmulator,BinaryOperator<U> combiner) | 스트림의 요소를 하나씩 줄여가면서(Reduce) 계산한다. |
| R collect(Collector<T,A,R> collector) </br> R collect(Supplier<R> supplier, BiConsumer<R,T> accumulator, BiConsumer<R,R> combiner) | 스트림의 요소를 수집한다. </br> 주로 요소를 그룹화하거나 분할한 결과를 컬렉션에 담아 반환하는데 사용된다. |

Optional은 일종의 Wrapper Class로 내부에 하나의 객체를 저장할 수 있다.

### 지연된 연산

스트림 연산에서 한 가지 중요한 점은 최종연산이 수행되기 전까지는 중간연산이 수행되지 않는다는것이다.

중간된 연산을 호출하는 것은 단지 어떤 작업이 수행되어야하는지를 지정해주는 것일 뿐이다.

### Stream<Integer>와 IntStream

요소의 타입이 T인 스트림은 기본적으로 Stream<T>이지만, 오토박싱&언박싱으로 인한 비효율을 줄이기 위해 데이터 소스의 요소를 기본형으로 다루는 스트림 IntStream,LongStream,DoubleStream이 제공된다.

Stream<integer>대신 IntStream을 사용하는것이 더 효율적이고, IntStream에는 int타입의 값으로 작업하는데 유용한 메서드를 포함되어 있다.

### 병렬 스트림//쓰레드 배우고 다시 돌아올것.

스트림으로 데이터를 다룰때 장점 중의 하나가 바로 병렬처리가 쉽다는것이다.

```java
int sum = strStream.parallel()
                   .mapToInt(s -> s.length())
                   .sum();
```

parallel()과 sequential()은 새로운 스트림을 생성하는것이 아니라 그저 스트림의 속성을 변경할 뿐이다.

## 스트림 만들기

### 컬렉션

컬렉션의 최고 조상인 Collection에 stream()이 정의되어 있다.

```java

List<Integer> list = Arrays.asList(1,2,3,4,5)
Stream<Integer> intStream = list.stream();

//Stream<T> Collection.stream()
intStream.forEach(System.out::println);
```

### 배열

```java
Stream<String> strStream = Stream.of("a","b","c");
//Stream<T> Stream.of(T... values)
Stream<String> strStream = Stream.of(new String[] {"a","b","c"});
//Stream<T> Stream.of(T[])
Stream<String> strStream = Arrays.stream(new String[]{"a","b","c"});
//Stream<T> Arrays.stream(T[])
Stream<String> strStream = Arrays.stream(new String[]{"a","b","c"},0,3);
//Stream<T> Arrays.stream(T[] array, int startInclusive, int endExclusive)
```

문자열 스트림은 이렇게 생성하면 된다.

```java
IntStream IntStream.of(int... values)
IntStream IntStream.of(int[])
IntStrea Arrays.stream(int[])
IntStream Arrays.stream(int[] arrray, int startInclusive, int endExclusive)
```

Int,Long,Double도 앞부분만 바꾸면 된다.

### 특정 범위의 정수

```java
IntStream intStream = IntStream.range(1,5)
//IntStream IntStream.range(int begin, int end) //1,2,3,4

IntStream IntStream.rangeClosed(int begin, int end)
//IntStream inStream = IntStream.rangeClosed(1, 5) //1,2,3,4,5
```

연속된 정수를 스트림으로 생성해서 반환하는 함수 range(), rangeClosed()

### 임의의 수

Random클래스에 포함된 인스턴스 메서드이다.

```java
IntStream ints() // Integer.MIN_VALUE <= ints() <= Integer.MAX_VALUE
LongStream longs() // Long.MIN_VALUE <= longs() <= Long.MAX_VALUE
DoubleStream doubles() // 0.0 <= doubles() <= 1.0

IntStream intStream = new Random().ints();
IntStream.limit(5).forEachh(System.out::println);
```

반환스트림은 크기가 정해지지 않은 무한 스트림(infinite stream)이다.

즉, limit()도 같이 사용해서 스트림의 크기를 제한해 주어야한다.

limit()은 스트림의 개수를 지정하는데 사용된다.

그냥 처음부터 매개변수에 streamSize를 넣어 유한 스트림을 생성해도된다.

```java
IntStream ints(long streamSize)
LongStream longs(long streamSize)
DoubleStream doubles(long streamSize)

intStream intStream = new Random().ints(5); //크기가 5인 난수 스트림 반환
```

지정된 범위의 난수를 발생시키는 방법.

```java
IntStream ints(int begin, int end)
LongStream longs(long begin, long end)
DoubleStream doubles(double begin, double end)
IntStream ints(long streamSize, int begin, int end)
LongStream longs(long streamSize, long begin, long end)
DoubleStream doubles(long streamSize, double begin, double end)
```

### 람다식 - iterate(), generate()

람다식을 매개변수로 받아서, 람다식에 의해 계산되는 값들을 요소로하는 무한 스트림을 생성한다.

```java
Stream<Integer> evenStream = Stream.iterate(0, n->n+2); // 0,2,4,6
//static <T> Stream<T> iterate(T seed, UnaryOperator<T> f)
```

generate는 iterate()와 달리, 이전 결과를 이용해서 다음 요소를 계산하지 않는다.

```java
Stream<Double> randomStream = Stream.generate(Math::random);
Stream<Integer> oneStream = Stream.generate(()->1);
//static <t> Stream<T> generate(Supplier<T> s)
```

generate()에 정의된 매개변수의 타입은 Supplier<T>이므로 매개변수가 없는 람다식만 허용된다.

Iterator, generate에 의해 생성된 스트림은 기본형 스트림타입의 참조변수로 다룰 수 없다.

```java
IntStream evenStream = Stream.iterate(0, n-> n+2); // Error
IntStream evenStream = Stream.iterate(0, n-> n+2).mapToInt(Integer::valueOf);
Stream<Integer> stream = evenStream.boxed(); // IntStream -> Stream<Integer>

DoubleStream randomStream = Stream.generate(Math::random); // Error
```

굳이 해야한다면 mapToInt()와 같은 메서드로 변환을 해야한다.

IntStream타입의 스트림을 Stream<Integer>로 변환하려면 boxed()를 사용하면 된다.

### 파일

java.nio.file.Files는 파일을 다루는데 필요한 유용한 메서드들을 제공한다.

list()는 지정된 디렉토리(dir)에 있는 파일의 목록을 소스로 하는 스트림을 생성해서 반환한다.

```java
Stream<Path> Files.list(Path dir)
```

Path는 하나의 파일 또는 경로를 의미한다.

스트림을 생성하는 메서드가 더 있지만, 우선 생략한다.

파일의 한 행을 요소로하는 스트림 생성 메서드도 있다.

```java
Stream<String> Files.lines(Path path)
Stream<String> Files.lines(Path path, Charset cs)
Stream<String> lines() // BufferedReader클래스의 메서드
```

### 빈 스트림

스트림 연산 결과가 하나도 없을때, null보다 빈 스트림을 반환하는것이 낫다.

```java
Stream emptyStream = Stream.empty(); //empty()는 빈 스트림을 생성해서 반환
long count = emptyStream.count(); //count의 값은 0
```

### 두 스트림의 연결

두 스트림이 같은 타입이라는 전제하에, 두 스트림을 하나로 연결할 수 있다.

```java
String[] str1 = {"123", "456", "789"};
String[] str2 = {"ABC", "abc", "DEF"};

Stream<String> strs1 = Stream.of(str1);
Stream<String> strs2 = Stream.of(str2);
Stream<String> strs3 = Stream.concat(Strs1,strs2);
```

## 스트림의 중간연산

### 스트림 자르기 - skip(), limit()

```java
IntStream intStream = IntStream.rangeClosed(1,10);
IntStream.skip(3).limit(5).forEach(System.out::print);
//[1,2,3,4,5,6,7,8,9,10] -> [4,5,6,7,8,9,10] -> [4,5,6,7,8]
//Stream<T> skip(long n)
//Stream<T> limit(long maxSize)
```

### 스트림 요소 걸러내기 - filter(), distinct()

distinct()는 스트림에서 중복된 요소들을 제거한다.

filter()는 주어진 조건(Predicate)에 맞지 않는 요소를 걸러낸다.

```java
IntStream intStream = IntStream.of(1,2,2,3,3,3,4,5,5,6);
IntStream.distinct().forEach(System.out::print); // 1,2,3,4,5,6
```

```java
IntStream intStream = IntStream.rangeClosed(1,10); // 1~10
int Stream.filter(i -> i % 2 == 0) forEach(System.out::print) // 2

IntStream.filter(i -> i % 2 != 0 && i % 3 != 0).forEach(System.out::print); 157
IntStream.filter(i -> i % 2 != 0).filter(i-> i % 3 != 0).forEach(System.out::print);
```

중간 연산이므로 여러번 사용할수도 있다.

### 정렬 - sorted()

스트림을 정렬할때는 sorted()를 사용한다.

```java
Stream<String> strStream = Stream.of("dd", "aaa","CC","cc","b");
strStream.sorted().forEach(System.out::print); // CCaaabccdd
```

Comparator대신 int값을 반환하는 람다식을 사용할 수 도 있다.

Comparator를 지정하지 않으면 기본 정렬 기준(Comparable)으로 정렬한다.

| 문자열 스트림 정렬 방법 | 출력결과 |
| --- | --- |
| strStream.sorted() // 기본정렬</br>strStream.sorted(Comparator.naturalOrder()) // 기본정렬 </br>strStream.sorted((s1,s2)→ s1.compareTo(s2)) // 람다식도 가능 </br>strStream.sorted(String::compareTo); //위의 문장과 동일 | CCaaabccdd |
| strStream.osrted(Comparator.reverseOrder()) // 기본 정렬의 역순 </br>strStream.sorted(Comparator.<String>naturalOrder.reversed()) | ddccbaaaCC |
| strStream.sorted(String.CASE_INSENSITIVE_ORDER))//대소문자 구분안함 | aaabCCccdd |
| strStream.sorted(String.CASE_INSENSITIVE_ORDER.reversed()) | ddCCccbaaa |
| strStream.sorted(Comparator.comparing(String::length)) // 길이 순 정렬 </br> strStream.sorted(Comparator.comparingInt(String::length)) // no오토박싱 | bddCCccaaa |
| strStream.sorted(Comparator.comparing(String::length).reversed()) | aaaddCCccb |

더 깊은 내용은 다시 책을 찾아보던지, 필요할때 검색을 하도록 하자.

```java
class StreamEx1{
    public static void main(String[] args) {
        Stream<Student> studentStream = Stream.of(
                new Student("이자바",3,300),
                new Student("김자바",1,200),
                new Student("안자바",2,100),
                new Student("박자바",2,150),
                new Student("소자바",1,200),
                new Student("나자바",3,290),
                new Student("감자바",3,180),
        );
        studentStream.sorted(Comparator.comparing(Student::getBan) // 반별정렬
                .thenComparing(Comparator.naturalOrder())) // 기본정렬
                .forEach(System.out::println);
    }
}
class Student implements Comparable<Student>{
    String name;
    int ban;
    int totalScore;
    Student(String name, int ban, int totalScore){
        this.name = name;
        this.ban = ban;
        this.totalScore = totalScore;
    }

    public String toString(){
        return String.format("[%s, %d ,%d]",name,ban,totalScore);
    }

    String getName() {return name;}
    int getBan() {return ban;}
    int getTotalScore() {return totalScore;}

    public int compareTo(Student s){
        return s.totalScore - this.totalScore;
    }
}
```

### 변환 - map()

스트림의 요소에 저장된 값중에서 원하는 필드만 뽑아내거나 특정형태로 변환해야할때 사용하는것.

```java
Stream<R> map(Function<? super T, ? extends R> mapper)
```

ex) 파일 이름만 뽑고 싶다.

```java
Stream<File> fileStream = Stream.of(new File("Ex1.java"),new File("Ex1"), new File("Ex1.bak") ,new File("Ex2.java"), new File("Ex1.txt"));

//map()으로 Stream<File>을 Stream<String>으로 변환
Stream<String> filenameStream = fileStream.map(File.getName);
filenameStream.forEach(System.out::println);

fileStream.map(File::getName) // Stream<File> -> Stream<String>
    .filter(s -> s.indexOf('.')!= -1 // 확장자가 없는것은 제외
    .map(String::toUpperCase) // Stream<String> -> Stream<String>
    .distinct() // 중복제거
    .forEach(System.out::print); // JAVABAKTXT
```

### 조회 - peek()

연산과 연산사이 올바르게 처리되었는지 확인할 떄 사용한다.

```java
fileStream.map(File::getName) //Stream<File> -> Stream<String>
    .filter(s -> s.indexOf('.')!=-1 // 확장자가 없는것은 제외
    .peek(s -> System.out.printf("filename=%s%n",s)) // 파일명을 출력한다.
    .map(s -> s.substring(s.indexOf('.')+1)) //확장자만 추출
    .peek(s->System.out.printf("extension=%s%n",s)) // 확장자를 출력한다.
    .forEach(System.out::println);
```

```java
class StreamEx2 {
    public static void main(String[] args) {
        File[] fileArr = {new File("Ex1.java"), new File("Ex1.bak"), new File("Ex2.java"), new File("Ex1"), new File("Ex1.txt")};
        Stream<File> fileStream = Stream.of(fileArr);
        Stream<String> filenameStream = fileStream.map(File::getName);
        filenameStream.forEach(System.out::println); //

        fileStream = Stream.of(fileArr); // 스트림 다시 생성

        fileStream.map(File::getName) // Stream -> Stream<String>
                .filter(s -> s.indexOf('.')!=-1) // 확장자가 없는 것은 제외 Ex1삭제
                .map(s -> s.substring(s.indexOf('.')+1)) // Ex1.java -> java
                .map(String::toUpperCase) // java -> JAVA
                .distinct() // 중복제거
                .forEach(System.out::print);

    }
}
```

### mapToInt(), mapToLong(), mapToDouble()

map()은 연산의 결과로 Stream<T>타입의 스트림을 반환한다.

스트림의 요소를 숫자로 변환할때 사용한다.

```java
DoubleStream mapToDouble(ToDoubleFunction<? super T> mapper)
IntStream mapToInt(ToIntFunction<? super T> mapper)
LongStream mapToLong(ToLongFunction<? super T>mapper) 
```

```java
Stream<Integer> studentScoreStream = studentStream.map(Student::getTotalScore);

IntStream studentScoreStream = studentStream.mapToInt(Student::getTotalScore);
int allTotalScore = studentScoreStream.sum();
```

mapToInt를 사용하면 성적을 더할때 Integer를 int로 변환할 필요가 없다.

max()와 min()은 Stream에도 정의되어 있지만, 매개변수로 Comparator를 지정해야 한다는 차이가 있다.

| int | sum() | 스트림의 모든 요소의 총합 |
| --- | --- | --- |
| OptionalDouble | average() | sum() / (double) count() |
| OptionalInt | max() | 스트림의 요소 중 제일 큰 값 |
| OptionalInt | min() | 스트림의 요소중 제일 작은 값 |

이 메서드들은 최종연산이다.

```java
long totalScore = scoreStream.sum(); // sum()호출 이후 닫힘.
OptionalDouble average = socreStream.average(); // Error
```

스트림을 또 생성하면 불편하므로 summaryStatistics()라는 메서드가 따로 제공된다.

```java
class StreamEx4{
    public static void main(String[] args) {
        Stream<String[]> strArrStrm = Stream.of(
                new String[] {"abc","def","jkl"},
                new String[] {"ABC","GHI","JKL"}
        );

        //Stream<Stream<String>> strStrmStrm = strArrStrm.map(Arrays::stream);
        Stream<String> strStrm = strArrStrm.flatMap(Arrays::stream);

        strStrm.map(String::toLowerCase)
                .distinct()
                .sorted()
                .forEach(System.out::println);
        System.out.println();

        String[] lineArr = {
            "Believe or not It is true",
            "Do or do not There is no try"
        };

        Stream<String> lineStream = Arrays.stream(lineArr);
        lineStream.flatMap(line -> Stream.of(line.split(" +")))
                .map(String::toLowerCase)
                .distinct()
                .sorted()
                .forEach(System.out::println);
        System.out.println();

        Stream<String> strStrm1 = Stream.of("AAA","ABC","bBb","Dd");
        Stream<String> strStrm2 = Stream.of("bbb","aaa","ccc","dd");

        Stream<Stream<String>> strStrmStrm = Stream.of(strStrm1, strStrm2);
        Stream<String> strStream = strStrmStrm
                .map(s -> s.toArray(String[]::new))
                .flatMap(Arrays::stream);
        strStream.map(String::toLowerCase)
                .distinct()
                .forEach(System.out::println);
    }

}
```

### 

```java
IntSummaryStatistics stat = scoreStream.summaryStatistics();
long totalCount = stat.getCount();
long totalScore = stat.getSum();
double avgScore = stat.getAverage();
int minSocre = stat.getMin();
int maxScore = stat.getMax();
```

IntStream을 Stream<T>로 변환할 때는 mapToObj()를, Stream<Integer>로 변환할 때는 boxed()를 사용한다.

```java
IntStream intStream = new Random().ints(1,46); //1~45 사이의 정수
Stream<String> lottoStream = intStream.distinct().limit(6).sorted().mapToObj(i -> i+",");
lottoStream.forEach(System.out::print); //12,14,20,23,26,29
```

CharSequence에 정의된 chars()는 String이나 StringBuffer에 저장된 문자들을 IntStream으로 다룰 수있게 해 준다.

```java
IntStream charStream = “12345”.chars(); //default IntStream chars()
int charSum = charStream.map(ch -> ch-'0').sum();
```

### flatMap() - Stream<T[]>를 Stream<T>로 변환

Stream<T[]>를 Stream<T>로 다룰때 더 편리한 경우가 있다.

그때는 map대신 flatMap을 사용한다.

![Untitled](https://user-images.githubusercontent.com/70310271/169659601-c65ee510-a2a0-41f9-ad86-0da3db5b26c6.png)


```java
Stream<String[]> - map(Arrays::stream) -> Stream<Stream<String>>
```

![Untitled 1](https://user-images.githubusercontent.com/70310271/169659608-5ffce1a0-4d09-4c15-96f7-e696b68bb61e.png)

```java
Stream<String[]> - flatMap(Arrays::stream) -> Stream<String>
```

```java
class StreamEx4{
    public static void main(String[] args) {
        Stream<String[]> strArrStrm = Stream.of(
                new String[] {"abc","def","jkl"},
                new String[] {"ABC","GHI","JKL"}
        );

        //Stream<Stream<String>> strStrmStrm = strArrStrm.map(Arrays::stream);
        Stream<String> strStrm = strArrStrm.flatMap(Arrays::stream);

        strStrm.map(String::toLowerCase)
                .distinct() //abc,def,jkl,ghi
                .sorted() // abc, def, ghi, jkl
                .forEach(System.out::println);
        System.out.println();

        String[] lineArr = {
            "Believe or not It is true",
            "Do or do not There is no try"
        };

        Stream<String> lineStream = Arrays.stream(lineArr);
        lineStream.flatMap(line -> Stream.of(line.split(" +")))
                .map(String::toLowerCase)
                .distinct()
                .sorted()
                .forEach(System.out::println);
        System.out.println();

        Stream<String> strStrm1 = Stream.of("AAA","ABC","bBb","Dd");
        Stream<String> strStrm2 = Stream.of("bbb","aaa","ccc","dd");

        Stream<Stream<String>> strStrmStrm = Stream.of(strStrm1, strStrm2);
        Stream<String> strStream = strStrmStrm
                .map(s -> s.toArray(String[]::new))
                .flatMap(Arrays::stream);
        strStream.map(String::toLowerCase)
                .distinct()
                .forEach(System.out::println);
    }
}
```

## Optional<T>와 OptionalInt

Optional<T>은 지네릭 클래스로 ‘T타입의 객체’를 감싸는 래퍼 클래스이다. 그래서 Optional타입의 객체에는 모든 타입의 참조변수를 담을 수 있다.

```java
public final class Optional<T>{
    private final T value;
        ...
}
```

java.util.Optional은 jdk1.8부터 추가되었다.

최종 연산의 결과를 그냥 반환하는게 아니라 Optional객체에 담아서 반환하는 것이다.

이처럼 객체에 담아서 반환을 하면, 반환된 결과가 null인지 매번 if문으로 체크하는 대신 Optional에 정의된 메서드를 통해서 간단히 처리할 수 있다.

### 왜 사용하는가?

null체크를 위한 if문 없이도 NullPointerException이 발생하지 않는 보다 간결하고 안전한 코드를 작성하는것이 가능하기 때문이다.

Object클래스에 isNull(),nonNull(),requireNonNull()과 같은 메서드가 있는것도 널 체크를 위한 if문을 메서드 안으로 넣어서 코드의 복잡도를 낮추기 위한 것이다.

### Optional객체 생성

```java
String str = "abc";
Optional<String> optVal = Optional.of(str);
Optional<String> optVal = Optional.of("abc");
Optional<String> optVal = Optional.of(new String("abc"));
```

참조변수의 값이 null일 가능성이 있으면, of()가 아닌 ofNullable()을 사용한다.

```java
Optional<String> optVal = Optional.of(null); // NullPointerException 발생
Optional<String> optVal = Optional.ofNullable(null); // OK
```

Optional<T>타입의 참조변수를 기본값으로 초기화할 때는 empty()를 사용한다.

null로 초기화하는것이 가능하지만, empty()로 초기화하는것이 바람직하다.

```java
Optional<String> optVal = null; // 널로 초기화
Optional<String> optVal = Optional.<String>empty(); // 빈 객체로 초기화
```

### Optional객체의 값 가져오기

Optional객체에 저장된 값을 가져올때는 get()을 사용한다.

null일때는 NoSuchElementException이 발생한다.

이를 대비해 orElse()로 대체할 값을 지정할 수 있다.

```java
Optional<String> optVal = Optional.of("abc");
String str1 = optVal.get(); //optVal에 저장된 값을 반환. null이면 예외발생
String str2 = optVal.orElse(""); //optVal에 저장된 값이 null일 때는, ""를 반환
```

orElse()의 변형으로

null을 대체할 값을 반환하는 람다식을 지정할 수 있는 orElseGet()

null일 때 지정된 예외를 발생시키는 orElseThrow()

```java
T orElseGet (Supplier<? extends T> other)
T orElseThrow(Supplier<? extends X> exceptionSupplier)
```

사용하는 방법.

```java
String str3 = optVal2.orElseGet(String::new); // () -> new String()과 동일
String str4 = optVal2.orElseThrow(NullPointerException::new); // 널이면 예외발생
```

Stream처럼 Optional객체에도 filter(), map, flatMap()을 사용할 수 있다.

isPresent()는 Optional객체의 값이 null이면 false, 아니면 true를 반환한다.

ifPresent(Consumer<T> block)은 값이 있으면 주어진 람다식을 실행하고, 없으면 아무일도 하지 않는다.

```java
if(str!=null){
    System.out.println(str);
}

-> //present를 사용한 null구분

if(Optional.ofNullable(str).isPresent()){
    System.out.println(str);
} 

->

Optional.ofNullable(str).ifPresent(System.out::println);
//str이 null이 아닐ㄹ때만 값을 출력.
```

### Stream 클래스에 정의된 메서드 중에서 Optional<T>를 반환하는 것들.

```java
Optional<T> findAny()
Optional<T> findFirst()
Optional<T> max(Comparator<? super T> comparator)
Optional<T> min(Comparator<? super T> comparator)
Optional<T> reduce(BinaryOperator<T> accumulator)
```

Optional<T>를 결과로 반환하는 최종 연산 메서드들은 몇 개 없다.

### OptionalInt, OptionalLong, OptionalDouble

IntStream과 같은 기본형 스트림에는 Optional도 기본형을 값으로 하는 OptionalInt, OptionalLong, OptionalDouble을 반환한다.

| Optional클래스 | 값을 반환하는 메서드 |
| --- | --- |
| Optional<T> | T get() |
| OptionalInt | int getAsInt() |
| OptionalLong | long getAsLong() |
| OptionalDouble | double getAsDouble() |

```java
OptionalInt opt = OptionalInt.of(0); // OptionalInt에 0을 저장
OptionalInt opt2 = OptionalInt.empty(); // OptionalInt에 0을 저장
```

### opt와 opt2는 같은 객체일까?

그렇지 않다.

```java
System.out.println(opt.isPresent()); // true
System.out.println(opt2.isPresent()); // false

System.out.println(opt.getAsInt()); // 0
System.out.println(opt2.getAsInt()); // NoSuchElementException

System.out.println(opt.equals(opt2)); // false
```

그러나 Optional객체의 경우 null을 저장하면 비어있는것과 동일하게 취급한다.

```java
Optional<String> opt = Optional.ofNullable(null);
Optional<String> opt2 = Optional.empty();

System.out.println(opt.equals(opt2)) // true
```

## 스트림의 최종연산

### forEach()

forEach()는 peek()와 달리 스트림의 요소를 소모하는 최종연산이다.

반환 타입이 void이므로 스트림의 요소를 출력하는 용도로 많이 사용된다.

```java
vodi forEach(Consumer<? super T> action)
```

### 조건검사 - allMatch(), anyMatch(), noneMatch(),findFirst(),findAny()

```java
boolean allMatch (Predicate<? super T> predicate)
boolean anyMatch (Predictae<? super T> predicate)
boolean noneMatch(Predicate<? super T) predicate)
```

병렬 스트림인 경우에는 findFirst()대신 findAny()를 사용해야한다.

```java
Optional<Student> stu = stuStream.filter(s -> s.getTotalScore() <= 100).findFirst();
Optional<Student> stu = parallelStream.filter(s->s.getTotalScore() <= 100).findAny();
```

findAny()와 findFirst()의 반환 타입은 Optional<T>이며, 스트림의 요소가 없을때는 비어있는 Optional객체를 반환한다.

비어있는 Optional객체는 내부적으로 null을 저장하고 있다.

### 통계 - count(), sum() ,average(), max(), min()

기본형 스트림이 아닌 경우에는 통계와 관련된 메서드들은 3개 뿐이다.

```java
long count()
Optional<T> max(Comparator<? super T> comparator)
Optional<T> min(Comparator<? super T> comparator)
```

### 리듀싱 - reduce()

스트림의 요소를 줄여나가면서 연산을 수행하고 최종결과를 반환한다.

처음 두 요소를 가지고 연산한 결과를 가지고 그 다음 요소와 연산한다.

```java
Optional<T> reduce(BinaryOperator<T> accumulator)
```

연산결과의 초기값(identity)를 갖는 reduce()도 있는데, 이 메서드들은 초기값과 스트림의 첫번째 요소로 연산을 시작한다.

스트림의 요소가 하나도 없는 경우, 초기값이 반환되므로 반환타입이 Optional<T>가 아니라 T이다.

최종연산 count()와 sum()등은 내부적으로 모두 reduce()를 이용해서 쓰인다.

```java
int count = intStream.reduce(0 , (a,b) -> a+1);
int sum = intStream.reduce(0 , (a,b) -> a+b);
int max = intStream.reduce(Integer.MIN_VALUE, (a,b) -> a>b ? a:b);
int min = intStream.reduce(Integer.MAX_VALUE, (a,b) -> a<b ? a:b);
```

reduce의 사용법은 간단하다

```java
T reduce(T identity, BinaryOperator<T> accumulator){
    T a = identity;

    for(T b : stream)
        a = accumulator.apply(a, b);

    return a;
}
```

그저 초기값(identity)와 어떤 연산(Binary Operator)로 스트림의 요소를 줄여나갈 것인지만 결정하면 된다.

### collect()

스트림의 최종연산

collect()가 스트림의 요소를 수집하려면, 어떻게 수집할 것인가에 대한 방법이 정의되어 있어야하는데, 그 방법을 정의한 것이 바로 Collerctor이다.

컬렉터는 Collector인터페이스를 구현한 것으로, 직접 구현할 수도 있고 미리 작성된것을 사용할 수도 있다.

Collectors클래스는 미리 작성된 다양한 종류의 컬렉터를 반환하는 static메서드를 가지고 있다.

```java
collect() : 스트림의 최종연산, 매개변수로 컬렉터를 필요로한다.
Collector : 인터페이스, 컬렉터는 이 인터페이스를 구현해야한다.
Collectors : 클래스, static메서드로 미리 작성된 컬렉터를 제공한다.
```

### 스트림을 컬렉션과 배열로 변환
-toList(), toSet(), toMap(), toCollection(), toArray()

```java
List<String> names = stuStream.map(Student::getName).collect(Collectors.toList());

ArrayList<String> list = names.stream().collcet(Collectors.toCollection(ArrayList::new));

Map<String,Person> map = personStream.collect(Collectors.toMap(p->p.getRegId(), p->p));
```

스트림에 저장된 요소들을 ‘T[]’타입의 배열로 변환하려면, toArray()를 사용하면 된다.

```java
Student[] stuNames = studentStream.toArray(Student[]::new); // 가능
Student[] stuNames = studentStream.toArray(); // ERROR
Object[] stuNames = studentStream.toArray(); // 가능.
```

해당타입의 생성자 참조를 매개변수로 지정해줘야한다.

만일 매개변수를 지정하지 않으면 반환 되는 타입은 ‘Object[]’이다.

### 통계 - counting(), summingInt(), averagingInt(), maxBy(), minBy()

보다 간결한 코드를 위해 Collectors의 static메서드를 호추할때는 ‘Collectors.’를 생략했다.

```java
long count = stuStream.count();

long count = stuStream.collect(counting()); // Collectors.counting()

long totalScore = stuStream.mapToInt(Student::getTotalScore).sum();
long totalScore = stuStream.collect()

OptionalInt topScore = studentStream.mapToInt(Student::getToalScore).max();

Optional<Student> topStudent = stuStream.max(Comparator.comparingInt(Student::getTotalScore));

Optiional<Student> topStudent = stuStream.collect(maxBy(Comparator.comparingInt(Student::getTotalScore)));

IntSummaryStatistics stat stuStream.mapToInt(Student::getTotalScore).summaryStatistics();

IntSummaryStatistics stat = stuStream.collect(summarzingInt(Student::getTotalScore));
```

### 리듀싱 - reducing()

리듀싱 역시 collect()로 가능하다.

IntStream에는 매개변수 3개짜리 collect()만 정의되어 있으므로 boxed()를 통해 intStream을 Stream<Integer>로 변환해야 매개변수 1개짜리 collect()를 사용할 수 있다.

```java
int grandTotal = stuStream.map(Student::getTotalScore).reduce(0,Integer::sum);
int grandTotal = stuStream.coolect(reducing(0,Student::getTotalScore,Integer::sum);
```

### 문자열 결합 - joining()

스트림의 요소가 String이나 StringBuffer처럼 ChahrSequence의 자손인 경우에만 결합이 가능하므로 스트림의 요소가 문자열이 아닌 경우에는 먼저 map()을 이용해서 스트림의 요소를 문자열로 변환해야한다.

```java
String studentNames = stuStream.map(Student::getName).collect(joining());
String stduentNames = stuStream.map(Student::getname).collect(joining(","));
String studentNames = stuStream.map(Student::getName).collect(joining(",","[","]"));
```

### 그룹화와 분할 - groupingBy(), partitioningBy()

### partitioningBy()에 의한 분류

기본분할

```java
Map<Boolean, List<Student>> stuBySex = stuStream
                .collect(partitioningBy(Student::isMale)); // 학생들을 성별로 분할
List<Student> mleStudent = stuBySex.get(true); //Map에서 남학생 목록을 얻음
List<Student> femaleStudent = stuBySex.get(false); //Map에서 여학생 목록을 얻음
```

기본 분할 + 통계 정보

```java
Map<Boolean, Long> stuNumBySex = stuStream
                .collect(partitioningBy(Student::isMale, counting()));
System.out.println("남학생 수 :"+ stuNumBySex.get(true)); // 남학생 수 : 8
System.out.println("여학생 수 :"+ stuNumBySex.get(false)); // 여학생 수 : 10
```

1등 구하기

```java
Map<Boolean, Optional<Student>> topScoreBySex = stuStream
            .collect(
                     partitioningBy(Student::isMale,
                            maxBy(comparingInt(Student::getScore))
                    )
             );
System.out.println("남학생 1등 :"+ topScoreBySex.get(true));
System.out.println("여학생 1등 :"+ topScoreBySex.get(false));
// 남학생 1등 : Optional[[나자바, 남 , 1, 1, 300]]
// 여학생 1등 : Optional[[김지미, 여 , 1, 1, 250]]
```

1등 구하기 Optional이 아닌 Student객체로 받기

```java
Map<Boolean, Student> topScoreBySex = stuStream
            .collect(
                     partitioningBy(Student::isMale,
                         collectingAndThen(
                            maxBy(comparingInt(Student::getScore), Optional::get)
                         )
                    )
             );
System.out.println("남학생 1등 :"+ topScoreBySex.get(true));
System.out.println("여학생 1등 :"+ topScoreBySex.get(false));
// 남학생 1등 : [나자바, 남 , 1, 1, 300]
// 여학생 1등 : [김지미, 여 , 1, 1, 250]
```

성적이 150점 아래인 학생들의 불합격 처리

```java
Map<Boolean, Map<Boolean, List<Student>>> failedStuBySex = stuStream
    .collect(
         partitioningBy(Student::isMale,
               partitioningBy( s -> s.getScore() < 150)
         )
    );
List<Student> failedMaleStu = failedStuBySex.get(true).get(true);
List<Student> failedFemaleStu = failedStuBySex.get(false).get(true);
```

### groupingBy()에 의한 분류

stuStream을 반별로 그룹지어 Map에 저장

```java
Map<Integer, List<Student>> stuByBan = stuStream.collect(groupingBy(Student::getBan);

Map<Integer, List<Student>> stuByBan = stuStream.collect(groupingBy(Student::getBan, toList()); // toList() 생략가능

Map<Integer, List<Student>> stuByBan = stuStream.collect(groupingBy(Student::getHak, toCollection(HashSet::new)));
```

stuStream을 성적의 등급으로 그룹화

```java
Map<Student.Level, Long> stuBylevel = stuStream
      .collect(groupingBy( s -> {
             if(s.getScore() >= 200)      return Student.Level.High;
             else if(s.getScore() >= 100) return Student.Level.MID;
             else                         return Student.Level.LOw;
             }, counting())
       };
```

학년별로 그룹화후 다시 반별로 그룹화

```java
Map<Student.Level, Long> stuBylevel = stuStream
      .collect(groupingBy(Student:;getHak,
             groupingBy(Student::getBan)
      ));
```

각반의 1등 출력

```java
Map<Integer, Map<Integer, Student>> topStuByHakAndBan = stuStream
         .collect(groupingBy(Student::getHak,
                 groupingBy(Student::getBan,
                            collectingAndThen(
                                   maxBy(comparingInt(Student::getScore)),
                                   Optional::get
                             )
                 )
          ));
```

학년별과 반별로 그룹화 한 다음, 성적그룹으로 변환(mapping)하여 Set에 저장

```java
Map<Integer, Map<Integer, Student>> topStuByHakAndBan = stuStream
         .collect(groupingBy(Student::getHak,
                 groupingBy(Student::getBan,
                   mapping(s->{
                         if(s.getScore() >= 200) return Student.Level.High;
                         else if(s.getScore() >= 100 return Student.level.MID;
                         else return Student.level.LOW;
                         }, toSet())
                  )
          )
);                  
```

### Collector구현하기

직접 Collector를 작성해보자

```java
public interface Collector<T, A, R> {
    Supplier<A>        supplier();
    BiConsumer<A, T>   accumulator();
    BinaryOperator<A>  combiner();
    Function<A, R>     finisher();
    Set<Characteristics> characteristics(); // 컬렉터의 특성이 담긴 Set을 반환
    ...
}
```

```java
supplier() 작업 결과를 저장할 공간을 제공
accumulator() 스트림의 요소를 수집(collect)할 방법을 제공
combiner() 저장공간을 병합할 방법을 제공(병렬 스트림)
finisher() 결과를 최종적으로 변환할 방법을 제공
```

```java
Characteristics.CONCURRENT : 병렬로 처리할 수 있는 작업
Characteristics.UNORDERED : 스트림의 요소의 순서가 유지될 필요가 없는 작업
Characteristics.IDENTITY_FINISH : finisher()가 항등함수인 작업.
```

reduce()와 collect()의 차이에 대해서 궁금할것인데, 이 둘은 근본적으로 하는 일이 같다.

collect()는 그룹화와 분할, 집계 등에 유용하게 쓰이고, 병렬화에 있어서 reduce보다 collect()가 더 유리하다.
