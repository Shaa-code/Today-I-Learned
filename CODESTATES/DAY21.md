# DAY20

### 재귀란?

한 문제를 동일한 구조의 더 작은 문제로 나눌수 있고, 그 작은 문제를 해결함으로써 전체 문제를 해결하는 방법을 재귀(Recursion)이라고 한다.

### 재귀 호출이란?

실행과정에서 자기자신을 호출하는 방식을 재귀호출이라고 한다.

### 재귀를 사용하는 이유는 무엇일까?

재귀 Call Stack에 계속해서 함수의 매개변수, 지역변수, 반환주소가 쌓이므로 비효율적이다.

그럼에도 불구하고, 코드가 간결하므로, 코드의 간결성이 Call Stack에 쌓이는 메모리보다 효용이 높을때 사용한다.

### 재귀를 사용하는 상황

1. 한 문제를 동일한 작은 문제로 나눌 수 있는 경우
2. 중첩된 반복문이 많거나 반복문의 중첩횟수를 예측하기 어려운 경우
3. 변수 사용을 줄여 mutable state(변경 가능한 상태)를 제거하여 변수를 변경하지 못하도록 유도하는 방식으로 프로그램 오류가 발생할 수 있는 가능성을 줄이는 경우

### 재귀적으로 사고하는법 가이드

1. 함수의 입력값과 출력값을 생각해라.

arrSum의 경우 int로 들어가서 int로 나온다.

- 표기 : arrSum [int] → int

1. 문제를 쪼개고 경우수를 나눠보자.

arrSum(new int[]{1,2,3,4}) 와 arrSum(new int[]{2,3,4} 를 구하는 방식은 같다.

1. 가장 단순한 문제부터 해결하기

가장 작은 값부터 계산하며 추론을 해보자.

재귀의 기초(base case)라고 부르는데, 재귀 호출이 멈추는 조건을 구성한다.

1. 복잡한 문제 해결하기

수학적 귀납법

1. n = 1 일때 성립함을 보인다.
2. n = k 일때 성립함을 가정하고 n = k + 1일때도 성립함을 보인다.

### 합을 재귀를 사용해 리턴하는법

```java
public class Solution { 
    public int sumTo(int num){
    //TODO..
        if(num == 0) return 0;
        int sum = 0;
        sum += num;
        if(num == 1) return sum;
        return num + sumTo(num - 1);
  }
}
```

![Untitled](DAY20%2008727e9184204af18c3662caca89317f/Untitled.png)

### 재귀를 이용한 홀수 찾기

```java
public class Solution { 
    public boolean isOdd(int num) {
    //TODO..
        if (num == 0) return false;
        if (num == 1) return true;

        if(num < 0 ) {
            return isOdd(-num); // 음수일때는 양수로 바꿔주어 다시 재귀반복.
        }

        return isOdd(num-2);
    }
}
```

![Untitled](DAY20%2008727e9184204af18c3662caca89317f/Untitled%201.png)

### 재귀를 이용한 팩토리얼

```java
public class Solution { 
    public int factorial(int num){
    //TODO..
    if(num == 0) return 1;
    return num*factorial(num-1);
  } 
}
```

![Untitled](DAY20%2008727e9184204af18c3662caca89317f/Untitled%202.png)

### 재귀를 이용한 피보나치

```java
public class Solution {  
    public int fibonacci(int num){
		//TODO..
    if(num <= 1){
        return num;
    }
    return fibonacci(num-2)+fibonacci(num-1);
}
```

핵심 아이디어 : 함수가 더해지는 모양이 나오면 아래처럼 두 갈래로 뻗어내려간다는점

![Untitled](DAY20%2008727e9184204af18c3662caca89317f/Untitled%203.png)

### 재귀를 이용한 배열의 합

```java
public class Solution { 
    public int arrSum(int[] arr){
    //TODO..
    if(arr.length == 0){
      return 0;
    }

    int head = arr[0];
    int[] tail = Arrays.copyOfRange(arr,1,arr.length);
    return head + arrSum()
    }

```

왜 잘 안풀렸나?

```java
int head = arr[0];
int[] tail = Arrays.copyOfRange(arr,1,arr.length);
head += head;
return arrSum(tail); // head는 return과 따로 더해야한다고 생각했으나 같이 반환시
//head + (head +arrSum(tail)) 이런식으로 코드가 리턴된다.
```

뭐가 문제일까?

1. if문으로 언제 재귀가 끝이나는지 종료시점에 대해서 생각하지 않았다.
2. 재귀라는것은 return으로 계속 반복되는 구조를 만들어야 한다.

![Untitled](DAY20%2008727e9184204af18c3662caca89317f/Untitled%204.png)

### 재귀를 이용한 배열의 곱

```java
public class Solution {  
    public int arrProduct(int[] arr){
    // TODO:
        if (arr.length == 0) return 1;
        int head = arr[0];
        int[] tail = Arrays.copyOfRange(arr,1,arr.length);
        return head * arrProduct(tail);
    } 
}
```

### 재귀를 이용한 배열의 길이

```java
public class Solution { 
    public int arrLength(int[] arr){
        if(arr.length == 0){
        return 0;
    }
        return 1 + arrLength(Arrays.copyOfRange(arr, 1, arr.length));
    }
}
```

핵심아이디어 함수가 돌때마다 int cnt = 0 을 1씩 더해주는 방법을 떠올렸는데,

그냥 [1+ 재귀함수]를 반복하면 된다. 그럼 count가 자동으로 되는 원리이다.

### 재귀를 이용해 배열의 요소제거

정답

```java
public class Solution { 
    public int[] drop(int num, int[] arr){
    // TODO:
        if(num == 0||arr.length == 0) return arr;
        int[] tail = Arrays.copyOfRange(arr,1,arr.length);
        return drop(num-1,tail);
    }
}
```

내가 푼 방식

```java
public class Solution { 
    public int[] drop(int num, int[] arr){
    // TODO:
        num--;
        if(num == 0); return 0;
        int[] tail = Arrays.copyOfRange(arr,1,arr.length);
        return drop(tail);
    } 
}
```

뭐가 문제일까?

drop을 재귀로 받기위해서 num을 내려야하는데, 어떻게 내릴것인가?에 집중했다.

num을 따로 내려주어야겠다고 생각했으나, 매개변수에서 내리는 방법이 있다는걸 배웠다.

![Untitled](DAY20%2008727e9184204af18c3662caca89317f/Untitled%205.png)

### 재귀를 이용해 배열의 마지막원소 제거

```java
public class Solution { 
    public int[] take(int num, int[] arr){
    // TODO:
    if(num >= arr.length()) return arr;
    return take(num,Arrays.copyOfRange(arr,0,arr.length-1));
    } 
}
```

![Untitled](DAY20%2008727e9184204af18c3662caca89317f/Untitled%206.png)

### 재귀를 이용해 논리곱 판단

```java
if(arr.length == 0) return true;
    boolean head = arr[0];
    if(head==false return false; // head==false -> !head로 표현할 수 있음.
    return and(Arrays.copyOfRange(arr,1,arr.length));
```

![Untitled](DAY20%2008727e9184204af18c3662caca89317f/Untitled%207.png)

### 재귀를 이용해 논리합 판단

```java
public class Solution { 
	public boolean or(boolean[] arr){
    // TODO:
    if(arr.length == 0) return false;
    boolean head = arr[0];
    if(head == true) return true;
    boolean[] tail = Arrays.copyOfRange(arr,1,arr.length);
    return or(tail);
	} 
}
```

![Untitled](DAY20%2008727e9184204af18c3662caca89317f/Untitled%208.png)

### 재귀를 이용해 배열 역순

```java
public class Solution { 
    public int[] reverseArr(int[] arr){
        if(arr.length == 0) { 
            return new int[]{};
        }
        int[] head = Arrays.copyOfRange(arr, arr.length - 1, arr.length);
        int[] tail = reverseArr(Arrays.copyOfRange(arr, 0, arr.length - 1));
        int[] dest = new int[head.length + tail.length];
        System.arraycopy(head, 0, dest, 0, head.length);
        System.arraycopy(tail, 0, dest, head.length, tail.length);

        return dest;
    } 
}
```

![Untitled](DAY20%2008727e9184204af18c3662caca89317f/Untitled%209.png)
