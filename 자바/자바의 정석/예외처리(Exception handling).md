## 예외처리(Exception handling)

### 프로그램 오류

컴파일 에러 : 컴파일 시에 발생하는 에러

`런타임 에러 : 실행 시에 발생하는 에러`

논리적 에러 : 실행은 되지만, 의도와 다르게 동작하는 것

자바에서는 실행 도중에 발생할 수 있는 프로그램 오류를 ‘에러’와 ‘예외’ 두가지로 구분하였다.

에러는 메모리 부족(OutOfMemoryError)이나 스택오버플로우(StackOverflowError)와 같이 일단 발생하면 복구할 수 없는 심각한 오류이다.

예외는 발생하더라도 수습될 수 있는 비교적 덜 심각한 것이다.

// 어떤 문제인지는 모르지만, 예외도 굉장히 큰 문제를 발생시킬수 있다.

에러(Error) : 프로그램 코드에 의해서 수습될 수 없는 심각한 오류

예외(Exception) : 프로그램 코드에 의해서 수습 될 수 있는 다소 미약한 오류

### 예외 클래스의 계층 구조

![Untitled](https://user-images.githubusercontent.com/70310271/169657502-badd68e3-489e-4dec-8a65-782a6cdb21c8.png)

모든 예외의 최고 조상은 Exception클래스이다.

- Exception : 주로 외부의 영향으로 발생할 수 있는 것들.
    
    IOException
    
    ClassNotFoundException
    
    ... (기타 등등)
    
    - RuntimeException : 주로 프로그래머의 실수에 의해서 발생될 수 있는 예외들.
        
        ArithmeticException : ex) 정수를 0으로 나눔
        
        ClassCastException : 클래스간의 형변환을 잘못하는 경우.(이게 어떻게 되지?)
        
        NullPointerException : 값이 null인 참조변수의 멤버를 호출
        
        ... (기타 등등)
        
        IndexOutOfBoundsException : 
        
        ArrayIndexOutOfBoundsException : 배열 범위 벗어남.
        

크게 2가지로 나눈다.

Exception클래스들 : 

사용자의 실수와 같은 외적인 요인에 의해 발생하는 예외

RuntimeException클래스들 : 

프로그래머의 실수로 발생하는 예외

### 예외처리하기 - try - catch문

Exception Handling

정의 : 프로그램 실행 시 발생할 수 있는 예외에 대비한 코드를 작성하는 것

목적 : 프로그램의 비정상 종료를 막고, 정상적인 실행상태를 유지하는것

발생한 예외를 처리하지못하면, 프로그램은 비정상으로 종료된다.

처리되지 못한 예외(Uncaught Exception)는 JVM의 ‘예외처리기(UncaughtExceptionHandler)’가 받아서 예외의 원인을 화면에 출력한다.

if문과 달리, try블럭이나 catch블럭 내에 포함된 문장이 하나뿐이어도 괄호{}를 생략할 수 없다.

```java
try {
    //그냥 실행할 문장들
} catch(Exception e) {
    //예외가 실행되었을때 처리됨.
} catch(Exception1 e1) {
    //예외1이 실행되었을때 처리됨.
}
```

```java
class ExceptionEx1{
    public static void main(String[] args){

        try {
            try {} catch (Exception e) {}
        } catch (Exception e) {
            try {} catch (Exception e) {} 
//에러. 변수 e가 중복선언됨.
        }

        try{} catch (Exception e){}
    }
}
```

java.lang.ArithmeticException: / by zero at ExceptionEx2.main(ExceptionEx2.java:7)

이렇게 오류가 main메서드(ExceptionEx2.java의 7번째 라인)에서 발생했다는것을 알려준다.

```java
class ExceptionEx2 {
    public static void main(String args[]) {
        int number = 100;
        int result = 0;

        for (int i = 0; i < 10; i++) {
            try {
                result = number / (int) (Math.random() * 10);
            } catch (ArithmeticException e){
                System.out.println("0");
            }
            System.out.println(result);
        }
    }
}
```

### try-catch문에서의 흐름

- try블럭 내에서 예외가 발생한 경우.
    1. 발생한 예외와 일치하는 catch블럭이 있는지 확인한다.
    2. 일치하는 catch블럭을 찾게 되면, 그 catch블럭 내의 문장들을 수행하고 전체 try-catch문을 빠져나가서 그 다음 문장을 계속해서 수행한다. 만일 일치하는 catch블럭을 찾지 못하면, 예외는 처리되지 못한다.
    
- try블럭 내에서 예외가 발생하지 않은 경우,
    1. catch블럭을 거치지 않고 전체 try-catch문을 빠져나가서 수행을 계속한다.

```java
class ExceptionEx5{
    public static void main(String[] args){
        System.out.println(1);
        System.out.println(2);
        try{
            System.out.println(3);
            System.out.println(0/0);
            System.out.println(4); // 실행X
        } catch(ArithmeticException e){
            System.out.println(5);
        }
        System.out.println(6);
    }
}
```

`System.out.println(4);는 실행되지 않는다는게 굉장히 중요하다.`

### 예외의 발생과 catch블럭

예외가 발생하면, 발생한 예외에 해당하는 클래스의 인스턴스가 만들어진다.

예를들어 ArithmeticException이 발생하면 ArithhmeticException인스턴스가 생성된다.

첫번째 catch블럭부터 차례로 내려가면서 catch블럭의 괄호내에 선언된 참조변수의 종류와 생성된 예외클래스의 인스턴스에 instanceof연산자를 이용해서 검사를 하게되는데, 검사 결과가 true인 catch를 만날때까지 검사는 계속된다.

모든 예외 클래스는 Exception클래스의 자손이므로, catch블럭의 괄호()에 Exception을 클래스 타입의 참조변수를 선언해 놓으면 어떤 종류의 예외가 발생하더라도 이 catch블럭에 의해서 처리된다.

### printStackTrace()와 getMessage()

예외가 발생했을때 생성되는 예외 클래스의 인스턴스에는 발생한 예외에 대한 정보가 담겨 있으며, getMessage()와 printStackTrace()를 통해서 이 정보들을 얻을 수 있다.

```java
class ExceptionEx8{
    public static void main(String args[]){
        System.out.println(1);
        System.out.println(2);
        try{
            System.out.println(3);
            System.out.println(0/0);
            System.out.println(4);
        } catch(ArithmeticException ae){
            ae.printStackTrace();
            System.out.println("예외메세지 : " + ae.getMessage());
        }
        System.out.println(6);
    }
}

//return

1
2
3
예외메세지 : / by zero
6
java.lang.ArithmeticException: / by zero
	at ExceptionEx8.main(CodeTest1.java:61)
```

printStackTrace() : 예외발생 당시의 호출스택(Call Stack)에 있었던 메서드의 정보와 예외 메시지를 화면에 출력한다. (java.lang.ArithmeticException: / by zero at ExceptionEx8.main(CodeTest1.java:61) 부분)

getMessage() : 발생한 예외클래스의 인스턴스에 저장된 메시지를 얻을 수 있다. (/ by zero 부분)

### 멀티 catch블럭

jdk1.7부터 여러 catch블럭을 ‘|’기호를 이용해서, 하나의 catch블럭으로 합칠 수 있게 되었다.

```java
try{
...
} catch (ExceptionA | ExceptionB e){
	e.printStackTrace();
}
```

`멀티 catch블럭에 사용되는 ‘|’는 논리 연산자가 아니라 기호다.`

부모 자손과의 관계에 있다면, 그냥 다음과 같이 조상클래스만 써주는것과 똑같다.

```java
try{
        ...
} catch (ParentException | ChildException e){
    e.printStackTrace();    
}
```

불필요한 코드는 제거하라는 의미에서 에러가 발생한다.

```java
try{
        ...
} catch (ParentException e){
    e.printStackTrace();
}
```

단점 : 하나의 catch블럭으로 여러 예외를 처리하는것이기 때문에 멀티 catch블럭 내에서는 실제로 어떤 예외가 발생한지 알수 없다.

굳이 사용하고 싶다면,

참조변수 e로 멀티 catch블럭에 ‘|’기호로 연결된 예외 클래스들의 공통 분모, 즉 조상 예외클래스에 선언된 멤버만 사용할 수 있다.

```java
try{
...
} catch( ExceptionA | ExceptionB e){
    e.methodA(); //ExceptionA에 선언된 methodA()는 호출불가.
    
if(e instanceof ExceptionA){
    ExceptionA e1 = (ExceptionA)e;
    e1.methodA(); // ExceptionA에 선언된 메서드 호출가능.
} else { //if(e instanceof ExceptionB)
    ...
}
```

![Untitled 1](https://user-images.githubusercontent.com/70310271/169657522-a7581a50-f254-4a66-a855-99c3ce732780.png)


멀티 catch블럭에 선언된 참조변수 e는 상수이므로 값을 변경할 수 없다는 제약이 있다.

이것은 여러 catch블럭이 하나의 참조변수를 공유하기 떄문에 생기는 제약으로 실제로 참조변수의 값을 바꿀 일은 없을것이다.

### 예외 발생시키기 // 반드시 다시와서 426페이지 복습할것.

키워드 throw를 사용해서 프로그래머가 고의로 예외를 발생시킬 수 있으며, 방법은 아래의 순서를 따르면 된다.

1. 예외클래스를 객체로 만든다.

Exception e = new Exception(”고의로 발생”)

1. 키워드 throw를 이용해 예외를 발생시킨다.

throw e;

Exception인스턴스를 생성할 때, 생성자에 String을 넣어주면, 이 String이 Exception 인스턴스에 메시지로 저장된다. 저장된 String은 GetMessage()로 얻을 수 있음.

```java
class ExceptionEx9{
    public static void main(String args[]){
        try{
            Exception e = new Exception("고의");
            throw e;
            //throw new Exception("고의") 한줄로 작성가능.
        } catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        System.out.println("정상종료");
    }
}
```

컴파일러가 예외처리를 확인하지 않는 RuntimeException클래스들은 ‘Unchecked예외’ → 굳이 예외처리 안해도됨., 보통 반드시 필요한 예외들만 선언한다.

예외처리를 확인하는 Exception클래스들은 ‘Checked예외’ → 반드시 예외처리해주어야함.

### 메서드에 예외 선언하기

```java
void method() throws Exception1, Exception2, ... ExceptionN{
// 메서드내용
}
```

자바에서는 메서드를 작성할 때 메서드 내에서 발생할 가능성이 있는 예외를 메서드의 선언부에 명시하여 이 메서드를 사용하는 쪽에서는 이에 대한 처리를 하도록 강요한다.

Java API문서를 통해 사용하고자하는 메서드의 선언부와 Throw를 보고이 메서드에서는 어떤 예외가 발생할 수 있으며 반드시 처리해주어야하는 예외는 어떤것들이 있는지 확인하는게 좋다.

사실 예외를 메서드의 throws에 명시하는 것은 예외를 처리하는것이 아니라.

`자신(예외가 발생할 가능성이 있는 메서드)을 호출한 메서드에게 예외를 전달하여 예외처리를 떠맡기는 것이다.`

예외를 전달받은 메서드가 또도시 자신을 호출한 메서드에게 전달할 수 있으며, 이런식으로 계속 호출스택에 있는 메서드들을 따라 전달되다가 제일 마지막에 있는 main메서드에서도 예외가 처리되지 않으면, main메서드마저 종료되어 프로그램이 전체가 종료된다.

```java
class ExceptionEx12{
    public static void main(String[] args) throws Exception{
        method1();
    }
    static void method1() throws Exception{
        method2();
    }
    static void method2() throws Exception{
        throw new Exception();
    }
}

//return

Exception in thread "main" java.lang.Exception
	at ExceptionEx12.method2(CodeTest1.java:99)
	at ExceptionEx12.method1(CodeTest1.java:96)
	at ExceptionEx12.main(CodeTest1.java:92)
```

method2()에서 예외발생. 이후 method1()에 예외넘김. 이후 method1은 main메서드에 예외넘김.

마지막 main에서조차 예외처리가 되어있지 않음으로 비정상 종료됨.

즉, 결국 어느 한 곳 에서는 반드시 try-catch문으로 예외처리를 해주어야한다.

Q1. throw를 한줄로 설명해보아라.

자기자신을 호출한 메서드의 방향으로 catch문을 찾아가는 여행이다.

```java
class ExceptionEx13 {
    public static void main(String[] args) {
        method1();
    }

    static void method1(){
        try {
            throw new Exception();
        } catch (Exception e) {
            System.out.println("method1에서 예외처리");
            e.printStackTrace();
        }
    }
}

//return
method1에서 예외처리
java.lang.Exception
	at ExceptionEx13.method1(CodeTest1.java:109)
	at ExceptionEx13.main(CodeTest1.java:104)
```

위 처럼 예외가 발생한 메서드(method1) 내에서 처리되어지면, 호출한 메서드(main메서드)에서는 예외가 발생했다는 사실조차 모르게된다.

```java
class ExceptionEx14{
    public static void main(String[] args){
        try{
            method1();
        } catch(Exception e){
            System.out.println("method1에서 예외처리");
            e.printStackTrace();
        }
    }

    static void method1() throws Exception {
        throw new Exception();
    }
}

//return
method1에서 예외처리
java.lang.Exception
	at ExceptionEx14.method1(CodeTest1.java:127)
	at ExceptionEx14.main(CodeTest1.java:120)
```

위 처럼 예외가 발생한 메서드에서 예외를 처리하지 않고 호출한 메서드로 넘겨주면, 호출한 메서드에서는 method1()을 호출한 라인에서 예외가 발생한 것으로 간주되어 이에대한 처리를 하게된다.

필요한 상황이 다르다.

1. 예외가 발생한 메서드 내에서 자체적으로 처리해도 되는 것은 메서드 내에서 try-catch문을 사용해서 처리한다.
2. 메서드에 호출시 넘겨받아야할 값을 다시 받아야하는 경우(메서드 내에서 자체적으로 해결이 안 되는 경우)에는 예외를 메서드에 선언해서, 호출한 메서드에서 처리해야한다.

### 이해하기 어려워서 내가 직접 설명한다.

우선 개념부터 잘못이해했다.

`throws는 Exception함수로 찾아가서 해결하는게 아니다.`

1. class ExceptionEx12를 확인하자.

throws는 method1()에서 시작된 호출이 method2()를 호출하고 마지막, method2에서 예외를 발생시킨다. 

```java
static void method2() throws Exception{
		try{
    throw new Exception();
    }catch(Exception){
        ...
    }
}
```

이때 method2에서 예외처리를 해주는것이 일반적인 상황일것이다 하지만,

method2안에서 예외처리를 하게되면 main에서는 어떤 오류가 발생한지 알 수 없게된다.

그렇기 떄문에, method2에서 발생한 예외를 상위 메서드인 method1로 던져주게되고

method1에서도 throws Exception1이 되어있기때문에 다시 상위메서드인 main으로 예외를 던지게 된다. 이때 마지막으로 main에서 Exception을 처리하게되는데 ExceptionEx14를 확인하면

```java
public static void main(String[] args){
    try{
        method1();
    }catch(Exception e){
        System.out.println("method1에서 예외처리");
        e.printStackTrace();
}
```

이렇게 main에서 Exception을 catch해주면 예외처리가 끝나게 되는 로직이다.



### finally 블럭

예외의 발생여부에 상관없이 실행되어야할 코드를 포함시킬 목적으로 사용된다.

```java
class FinallyTest{
    public static void main(String args[]){
        try{
            startInstall();
            copyFiles();
            deleteTempFiles(); // 같은게 2번 쓰임.
        } catch (Exception e){
            e.printStackTrace();
            deleteTempFiles(); // 같은게 2번 쓰임.
        }
    }
    static void startInstall(){}
    static void copyFiles(){}
    static void deleteTempFiles(){}
}
```

이 처럼 실행할때도 처리되어야하고, 예외처리 될때도 실행되어야한다면 finally를 사용해주는게 좋다.

```java
class FinallyTest{
    public static void main(String args[]){
        try{
            startInstall();
            copyFiles();
        } catch (Exception e){
            e.printStackTrace();
        } finally {
            deleteTempFiles();
        }
    static void startInstall(){}
    static void copyFiles(){}
    static void deleteTempFiles(){}
}
```

```java
class FinallyTest3{
    
    public static void main(String args[]){
        FinallyTest3.method1();
        System.out.println("method()의 수행을 마치고 main메서드로 돌아옴");
    }
    
    static void method1(){
        try{
            System.out.println("method1() 호출");
            return; // 현재 실행중인 메서드를 종료한다.
        } catch(Exception e){
            e.printStackTrace();
        } finally{
            System.out.println("method1() finally블럭 실행");
        }
    }
}

//return

method1() 호출
method1() finally블럭 실행
method()의 수행을 마치고 main메서드로 돌아옴

```

`try블럭에서 return문이 실행되는 경우에도 finally블럭의 문장들이 먼저 실행된 후에, 현재 실행중인 메서드를 종료한다.`

`catch블럭의 문장 수행중에 return문을 만나도 finally블럭의 문장들은 수행된다.`

Q1. finally를 한줄로 표현한다면?

말그대로 마침내 반드시 도달해서 실행하는 문장이다.

### 자동 자원 반환 - try - with - resources문 // (고급 개념이다. 필요할때 복습.)

왜 사용하는가? close()를 자동으로 호출하기 위해서 사용한다.

어떻게 사용되는가에 대해서 경험이 없으면 쉽게 추측하기가 어려운 개념이다.

필요할때 다시 찾아서 책으로 복습하자.

JDK1.7부터 try-with-resources문이라는 try-catch문의 변형이 새로 추가되었다.

```java
try{
    fis = new FileInputStream("score.dat");
    dis = new DataInputsStream(fis);
} catch(IOException ie){
    ie.printStackTrace();
} finally {
    dis.close(); // 작업 도중에 예외발생시 dis가 닫힘.
}
```

위 코드의 진짜 문제는 close()가 예외를 발생시킨다면 큰일난다.

```java
try{
    fis = new FileInputStream("score.dat");
    dis = new DataInputStream(fis);
} catch (IOException ie){
    ie.printStackTrace();
} finally {
    try {
        if(dis != null)
            dis.close();
    } catch(IOException ie){
        ie.printStackTrace();
    }
}
```

위와 같이 코드를 개선할 수 있는데 코드가 복잡해져서 별로 보기에 좋지 않다.

`또한 try블럭과 finally블럭에서 모두 예외가 발생하면, try블럭의 예외는 무시된다는것이다.`

(이해 앞부분 보고 반드시 이해하고 넘어갈것.)

```java
try (FileInputStream fis = new FIleInputStream("score.dat");
     DataInputStream dis = new DataInputStream(fis)){
    while(true){
        score = dis.readInt();
        System.out.println(score);
        sum += score;
        }
    }
} catch (EOFException e){
    System.out.println("총합 : " + sum);
} catch (IOException ie) {
    ie.printStackTrace();
}
```

try문의 괄호()안에 객체를 생성하는 문장을 넣으면, 이 객체는 따로 close()를 호출하지 않아도 try블럭을 벗어나는 순간 자동적으로 close()가 호출된다.

그 다음에 catch블럭 또는 finally블럭이 수행된다.

자동으로 객체의 close()가 호출되기 위해서는 클래스가 AutoCloseable이라는 인터페이스를 구현한 것이어야만 한다.

```java
public interface AutoCloseable{
    void close() throws Exception;
}
```

위의 인터페이스는 각 클래스에서 적절히 자원 반환작업을 하도록 구현되어 있다.

하지만, close()도 Exception을 발생시킬수 있는데,

만약 자동 호출된 close()에서 예외가 발생하면 어떻게 될까?

```java
class TryWithResourceEx {
    public static void main(String[] args) {
        try (CloseableResource cr = new CloseableResource()) {
            cr.exceptionWork(false);
        } catch (WorkException e) {
            e.printStackTrace();
        } catch (CloseException e) {
            e.printStackTrace();
        }
        System.out.println();

        try (CloseableResource cr = new CloseableResource()) {
            cr.exceptionWork(true); // 예외발생.
        } catch (WorkException e) {
            e.printStackTrace();
        } catch (CloseException e) {
            e.printStackTrace();
        }
    }
}

class CloseableResource implements AutoCloseable {
    public void exceptionWork(boolean exception) throws WorkException {
        System.out.println("exceptionWork(" + exception + ")호출");
        if (exception)
            throw new WorkException("WorkException 발생");
    }

    public void close() throws CloseException {
        System.out.println("close()가 호출");
        throw new CloseException("CloseException 발생");
    }
}

class WorkException extends Exception{
    WorkException(String msg) {super(msg);}
}

class CloseException extends Exception {
    CloseException(String msg) {super(msg);}
}
```

main메서드의 try-catch문.

첫번째는 close()에서만 예외 발생.

두번째는 exceptionWork()와 close()에서 모두 예외발생.

`두 예외가 동시에 발생할 수는 없기 때문에,` 실제 발생한 예외를 WorkException으로하고, CloseException은 억제된 예외로 다룬다.

억제된 예외에 대한 정보는 실제로 발생한 예외인 WorkException에 저장된다.

Q1. 왜 두 예외는 동시에 발생할 수 없는거지?

한 로직이 실행되면 빠져나와버리니까 

Throwable에는 억제된 예외와 관련된 다음과 같은 메서드가 정의되어있다.

void addSuppressed(Throwable exception) 억제된 예외 추가

Throwable[] getSuppressed() 억제된 예외(배열)를 반환

만일 기존의 try-catch문을 사용했다면 먼저 발생한 WorkException은 무시되고, 마지막으로 발생한 CloseException에 대한 내용한 출력될것.

### 사용자정의 예외 만들기

필요에 따라 프로그래머가 새로운 예외클래스를 정의하여 사용할 수 있다.

보통 Exception클래스 또는 RuntimeException클래스로 부터 상속받아 클래스를 만든다.

필요에 따라서 알맞은 예외 클래스를 선택할 수 있다.

가능하면 새로운 예외클래스를 만들기보다 기존의 예외클래스를 활용하자.

기존의 예외 클래스는 주로 Exception을 상속받아서 ‘checked예외’로 작성하는 경우가 많았지만,

요즘은 예외처리를 선택적으로 할 수 있도록 RuntimeException을 상속받아서 작성하는 쪽으로 바뀌어가고 있다.

‘check예외’는 반드시 예외처리를 해주어야 하기 때문에 예외처리가 불필요한 경우에도 try-catch 문을 넣어서 코드가 복잡해 지기 때문이다.

예외처리를 강제하도록 한 이유는 

프로그래밍 경험이 적은 사람들도 견고한 프로그램을 작성할수 있게 유도하기 위함 이었음.

하지만, 자바가 탄생하던 20년 전과 달리 프로그래밍 환경이 많이 달라짐.

소형가전기기,데스크탑 → 모바일, 웹 프로그래밍

예외들이 선택적으로 처리해도 되는 상황으로 바뀌는 경우가 종종 발생함.

```java
class NewExceptionTest {
    public static void main(String args[]) {
        try {
            startInstall();
            copyFiles();
        } catch (SpaceException e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            System.out.println("공간 확보후 다시 설치하시오");
        } catch (MemoryException me) {
            System.out.println("에러 메시지 : " + me.getMessage());
            me.printStackTrace();
            System.gc();
            System.out.println("다시 설치");
        } finally {
            deleteTempFiles();
        }
    }

    static void startInstall() throws SpaceException, MemoryException {
        if (!enoughSpace())
            throw new SpaceException("설치 공간 부족");
        if (!enoughMemory())
            throw new MemoryException("메모리 부족");
    }

    static void copyFiles() {}
    static void deleteTempFiles() {}
    static boolean enoughSpace() {
        return false;
    }
    static boolean enoughMemory(){
        return true;
    }
}

class SpaceException extends Exception{
    SpaceException(String msg){
        super(msg);
    }
}

class MemoryException extends Exception{
    MemoryException(String msg){
        super(msg);
    }
}

//
설치 공간 부족
공간 확보후 다시 설치하시오
SpaceException: 설치 공간 부족
	at NewExceptionTest.startInstall(CodeTest1.java:90)
	at NewExceptionTest.main(CodeTest1.java:72)
```

### 예외 되던지기(Exception re-throwing)

한 메서드에서 발생할 수 있는 예외가 여럿인 경우,

몇 개는 try-catch문을 통해서 메서드 내에서 자체적으로 처리하고, 그 나머지는 선언부에 지정하여 호출한 메서드에서 처리하도록 함으로써, 양쪽에서 나눠서 처리되도록 할 수 있다.

그리고 심지어 단 하나의 예외에 대해서도 예외가 발생한 메서드와 호출한 메서드, 양쪽에서 처리하도록 할 수 있다.

이것은 예외를 처리한 후 인위적으로 다시 발생시키는 방법을 통해서 가능한데, 이것을 ‘예외 되던지기(exception re-throwing)’라고 한다.

```java
class ExceptionEx17{
    public static void main(String[] args){
        try{
            method1();
        } catch(Exception e){
            System.out.println("main에서 예외처리");
        }
    }
    static void method1() throws Exception{
        try {
            throw new Exception();
        } catch (Exception e){
            System.out.println("method1에서 예외처리");
            throw e;
        }
    }
}
```

왜 사용하는가?

하나의 예외에 대해서 예외가 발생한 메서드와 이를 호출한 메서드 양쪽 모두에서 처리해줘야할 작업이 있을때 사용한다.

예외가 발생할 메서드에서는 try-catch문을 사용해서 예외처리를 해줌과 동시에 메서드의 선언부에 발생할 예외를 throws에 지정해줘야한다.

반환값이 있는 return문의 경우, catch블럭에도 return문이 있어야한다.

예외가 발생했을 경우에도 값을 반환해야하기 때문이다.

```java
static int method1() throws Exception{
    try{
        System.out.println("method1() 호출");
        return 0;
    } catch (Exception e){
        e.printStackTrace();
        return 1;
        throw new Exception(); // return문 대신 예외를 호출한 메서드로 전달.
    } finally {
        System.out.println("method1()의 finally블럭 실행.");
    }
}
```

fianlly문에도 return문을 사용할 수 있으며, try블럭이나 catch블럭의 return문 다음에 수행된다.

최종적으로 finally블럭 내의 return문의 값이 반환된다.

### 연결된 예외(Chained Exception)

아직까지 필요성을 느낄수가 없어서 학습효율이 떨어진다.

필요할때 다시 찾아오자 1권 책 444페이지.

한 예외가 다른 예외를 발생시킬 수도 있다.

예외A가 예외B를 발생시켰다면, A를 B의 ‘원인 예외(Cause Exception)’라고 한다.

Throwable initCause(Throwable cause) : 지정한 예외를 원인 예외로 등록

Throwable getCause() : 원인 예외를 반환

왜 발생한 예외를 그냥 처리하지 않고, 원인 예외로 등록해서 다시 예외를 발생시키는가?

`여러가지 예외를 하나의 큰 분류의 예외로 묶어서 다루기 위해서이다.`
