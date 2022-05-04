# DAY8
<br/>

개념적인 내용들은 원래 작성했던, Java의 정석 문서에 추가해서 복습했다.

<br/>

## 코플릿을 풀면서 실수 했던 목록들에 대해서 적어둔다.

### 파이썬을 쓰던 습관이 있어서 자료형 선언 안해줌.

int hi = 5 인데 hi = 5; 라고 적고 시작해버림 계속 연습하자!


```java
public class Solution{
double pi;
// TODO : 선언되어 있는 변수 pi에 실수 3.14를 할당하세요.
public void assignment() {
//코드는 아래 라인에 작성해야 합니다.
pi = 3.14;
    }
}
```

double 형이기 떄문에 3.14f라고 적으면 안된다.

기본 자료형이 double이기 떄문에 그냥 3.14로 적던지 3.14d를 적던지 둘중에 하나만 해야된다.

### Java char는 유니코드 2byte를 사용한다.

<br/>

‘0’ → 48 암기하자.

‘9’ → 57 암기하자.

### 어떻게 char를 int로 바꾸지?

<br/>

```java
public class  Solution { 
  public int plusRightType(){
    // TODO : 변수 score에 숫자 100이 할당되도록 하기 코드를 수정하세요.
    int score = 99 + '1'; // 해당 부분을 수정해야 합니다.

    //하단의 코드는 수정하지 말아야 합니다.
    return score;
  }
}

//1. int score = 99 + Character.getNumericValue('1'); 으로 바꾼다.// 암기되있어야된다.
//2. int score = 99 + Integer.parseInt(String.valueOf('1')); //
//3. int score = 99 + '1'-'0'; -> '1' - '0' 49 - 48이 되므로 약간의 꼼수지만. 잘 먹힌다.
```

말그대로 문자 1을 숫자 100으로 바꿔보아라.

1. 첫번째 방법, Character.GetNumericValue(’1’)
2. 두번째 방법, Integer.parseInt(String.valueOf(’1’))
3. 세번째 방법, ‘1’ - ‘0’을해서 숫자를 맞춰주는 방법;

valueOf는 메소드 안의 해당객체를 “String”으로 변환하는 객체이다.

String객체로 형변환하는것이다.

<br/>

### 어떻게 int를 char로 바꾸지?

```java
public class Solution { 
    public char convertToChar(int num) {
        char result = (char)(num);
        return result;
    }
}

//1. char result = (char)(num + '0');
//2. char result = Character.forDigit(num,10[REDIX]);
```

첫번째 방법 : 그냥 (char)캐스팅 연산자를 사용해서 바꾼다.

두번째 방법 : ‘0’을 더해준다. (2byte UNICODE)

String str1 = str1.toUpperCase(); 이렇게 적으면 당연히 안된다.

String은 선언이기 때문에

str1 = str1.toUpperCase()로 해주면 썻던것을 재 활용 할 수 있다.

<br/>

### Math.floor는 double을 반환한다.

```java
public class Solution { 
    public int computeAverageLengthOfWords2(String word1, String word2) {
        int len1 = word1.length(), len2 = word2.length();
        int avg = (len1 + len2) / 2;
	
        return (int)Math.floor(avg);
    } 
}
```

다시 int로 바꿔줘야한다는것 반드시 알고있자!

<br/>

### if,else문과 3항 연산자를 변환해서 사용하자.

```java
if(str1.equals(str2))
    {
        return true;
    } else {
        return false;
    }

->

// 삼항연산자가 떠오르긴 하는데 연습이 안돼있었다.

if(str1.equalsIgnoreCase(str2)) ? return true : return false;
// 삼항 연산자는 if문이 필요없다 !

-> if를 제거하자

str1.equalsIgnoreCase(str2) ? return true : return false;
// 삼항 연산자는 if문이 아니다 !
->

return str1.equalsIgnoreCase(str2) ? true : false;
값을 나타내므로 3항 연산자는 return처럼 값을 보내줘야한다.
```

if/else문 : ‘문(statement)’으로서 if자체로는 아무런 `값을 만들어 내지 않는다.`

삼항연산자 : ‘식(expression)’으로서 `값을 만들어 낸다.`

```java
public class Solution { 
    public boolean compareOnlyAlphabet(String str1, String str2) {
    return str1.equalsIgnoreCase(str2) ? true : false;
  }
}
```

삼항 연산자를 써서 풀어내면 이렇게 된다.

<br/>

### String.format()을 쓰자!

```java
public class Solution { 
    public String showTime(int hour, int min, int sec) {
    return String.format("현재 시각은 %d시 %d분 %d초 입니다.",hour,min,sec);
	}
}
```

C언어에서 printf처럼 쓰던것을 Java에서는 String.format(%d,5);이렇게 표현할 수 있다.!

String.format은 반환이 String이고 바로 return으로 반환시키면 깔끔하다!
