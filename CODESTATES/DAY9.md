# DAY9

오늘은 코플릿 문제만 주구장창 풀었다.

### return문에서의 if문을 사용하려는 습관

```java
public class Solution { 
	public boolean isOldEnoughToDrink(int age) {
    return if(age >= 18);
	}
}

-> return문에 if해놓고 왜인지 찾고 있었음.

public class Solution { 
	public boolean isOldEnoughToDrink(int age) {
    return age >= 18;
	}
}
```

### boolean형의 삼항연산자 습관

```java
public class Solution { 
	public boolean equalsTen(int num) {
    // TODO:
    return num == 10 ? true : false;
	}
}

-> true : false 안해줘도 자동으로 들어가는데 굳이 해주고있었음.

public class Solution { 
	public boolean equalsTen(int num) {
    // TODO:
    return num == 10;
	}
}

```

그냥 return해주면 된다.

### 어떤 값과 비교하지도 않고, 값이 나온다고 착각함.

```java
if(num % 3 && num % 5) return "FizzBuzz";
이러고 왜 안되지 거리고 있었음.
if(num % 3 && num % 5 == 0) return "FizzBuzz"; // ==0을 해줘야한다.

(num % 3 && num % 5) == 0) 이러면 안된다.

(num % 3 == 0 && num % 5 == 0)으로 해주었어야한다.
```

논리적으로 생각하지 않고 그냥 코드들을 쳐다보면 생기는 일이다. 정신차리자.

### case문과 if문 둘다 사용해서 풀어보기

```java
package com.codestates.coplit; 

public class Solution { 
	public int daysInMonth(int month) {

    /*
    int day=0;
    if(month == 1||month == 3||month == 5||month == 7||month == 8||month == 10 ||month == 12) day = 31;
    if(month == 4||month == 6||month == 9||month == 11) day = 30;
    if(month == 2) day = 28;
    return day;
    */

    int day = 0;
    switch(month){
      case 1 : case 3 : case 5: case 7: case 8: case 10: case 12:
      day = 31;
      break;
      
      case 4 : case 6 : case 9 : case 11:
      day = 30;
      break;
      
      default :
      day = 28;
      break;
    } 
    return day;
	} 
}
```

### 함수로 만들어 풀기

```java
public class Solution { 
	public boolean isEitherEvenAndLessThan9(int num1, int num2) {
    
    return (num1 % 2 == 0 || num2 % 2 ==0) && (num1 < 9 && num2 < 9);
	//return (EitherEven(num1,num2) && LessThan9(num1,num2));
	
  }

/*
  boolean EitherEven(int num1, int num2){
          return (num1 % 2 == 0 || num2 % 2 == 0);
      }

  boolean LessThan9(int num1, int num2){
      return (num1 < 9 && num2 < 9);
*/
}
```

```java
public class Solution { 
	public char convertScoreToGrade(int score) {
    // TODO:
    if (score>100 || score<0){ return 'X';
    } else if(score >= 90){return 'A';
    } else if(score >= 80){return 'B';
    } else if(score >= 70){return 'C';
    } else if(score >= 60){return 'D';
    } else return 'F';    
	} 
}
```

### switch문의 단점

`인자를 하나만 받아서 처리할 수 있다는게 단점이다.`

```java
if (score > 100 || score < 0){
			return "INVALID SCORE"
		}
    switch(first){
      case 9:
      grade = "A";
      case 8:
      grade = "B";
      case 7:
      grade = "C";
      case 6:
      grade = "D";
      default:
      grade = "F";
      }
		}
	// 생각해보면 알겠지만, 처리가 불가능해진다.
    String score_last(String grade){
      last = score % 10
      if(last<=2)
        grade += "-"
      if(last>=8)
        grade += "+"
    }
```

```java
public class Solution { 
	public String convertScoreToGradeWithPlusAndMinus(int score) {
    // TODO:
		String grade;

		if (score > 100 || score < 0){
			return "INVALID SCORE";
    } else if(score == 100){
      return "A+";
		} else if(score >= 90){
      grade = "A";
    } else if(score >= 80){
      grade = "B";
    } else if(score >= 70){
      grade = "C";
    } else if(score >= 60){
      grade = "D";
    } else
      grade = "F";
    

    if(!grade.equals("F")){
      int remain = score % 10;
      if(remain <= 2) grade += "-";
      if(remain >= 8) grade += "+";
    }
    return grade;
	} 
}
```

### 배수개념 코딩할줄 몰랐음.

i % 3? 뭐지?이러고 있음.

(i % 3 == 0)이다 기억하자.

### for문의 본질은 초깃값과 중간값에 있다.

`범위를 인식하는 직관이 가장 중요하다.`

for(초기식 , 조건식 , 증감식)

1 < x < 100 의 범위가 있다면 초기식에는 x > 1이 조건식에는 x < 100

이런 모양이 되는 직관이다.

`초기식은 위의 초기 지점, for문의 조건식에는 마지막값 범위 지정의 역할`

```java
public class Solution {
    public int makeMultiplesOfDigit2(int num1, int num2) {

        int cnt = 0;

        if(num1>num2){
            int tmp = num2;
            num2 = num1;
            num1 = tmp;
        }

        for(int i = num1; i <= num2 ; i++) {
            
            if ((i != 0) && (i % 2 == 0)) {
                cnt += 1;
            }
        }
        return cnt;
    }
}
```

### toCharArray()로 만든 배열은 arr[i]로 원소에 접근이 가능하고, 데이터를 바꿀수 있다.

### Int to Char와 Int to String을 잘 구분해야한다.

Int to Char : (char)i로 간단히 바꿀수 있고,

Int to String String.valueOf(’i’)를 사용해야한다.

### 안쪽의 for문이 바깥쪽의 for문에 종속되는 방식

```java
public class Solution { 
	public String makeMarginalString(String str) {
    // TODO:
    String ret = "";
    for( int i = 0 ; i < str.length() ; i++){
      for( int j = 0 ; j <= i ; j++){
        ret += str.charAt(j);
      }
    }return ret;
	}
}
```

a ab abc 이런 순으로 나타나는 규칙성이 보이면 2중 for문에 바깥쪽 for문을 따라가는 방식을 사용한다.


피타고라스 문제

```java
public class Solution { 
	public boolean isPythagorean(int side1, int side2, int side3) {
    // TODO:
		
		String[] arr = new String[3]{side1, side2 ,side3};
		
		tmp = Integer.MIN_VALUE;
		for(int i = 0; i < arr.length() ; i++){
			if(tmp < arr[i]){
				tmp = arr[i];
		}
		Math.pow(side1,2)

-> 신선하다.

public class Solution { 
	public boolean isPythagorean(int side1, int side2, int side3) {
    // TODO:
		
		int pow1 = side1 * side1;
		int pow2 = side2 * side2;
		int pow3 = side3 * side3;

		return ((pow1 == pow2 + pow3) || (pow2 == pow1 + pow3) || (pow3 == pow1 + pow2));
		}
	}
```

어떻게든 풀어보려고 하고 레퍼런스를 참고했는데, 아이디어 자체가 너무 신선하다.

`그냥 제곱해서 다 되는지 봐도 되잖아?` 의 아이디어였다.

성능 최적화에 집중해서, 하나만 걸려라는 아이디어를 구상하지 못한점이 아쉽다.

최선이 아니라면 차선이라도 발상 할 수 있어야 하는데.. 흠.. 연습이 필요해 보인다.

### 시계문제 (60초가 아니라 59초로 처리해야한다.)

```java

public class Solution {
	public String addOneSecond(int hour, int minute, int second) {
    // TODO:

    if(second == 60){
      second = 0;
      minute += 1;
      if(minute == 60){
        minute = 0;
        hour += 1;
        if(hour == 24){
          hour = 0;
        }
      }
    }
    return String.format("1초 뒤에 %d시 %d분 %d초 입니다",hour,minute,second+1);
	} 
}
```

```java
public class Solution {
	public String addOneSecond(int hour, int minute, int second) {
    // TODO:

    if(second == 59){
      second = 0;
      minute += 1;
    }else
      second += 1;
      
    if(minute == 60){
        minute = 0;
        hour += 1;
    }
      
    if(hour == 24){
      hour = 0;
        }
    return String.format("1초 뒤에 %d시 %d분 %d초 입니다",hour,minute,second);
  //return "1초 뒤에 " + hour + "시 " + minute + "분 " + second + "초 입니다";
		}
	}
}
```

나는 왜 따로 구분해야 할 부분을 인지하지 못했을까?

어떤 알고리즘이든 만들기전에, 이건 독립적으로 작동하는가 종속적으로 작동하는가를 먼저 따져보아야한다.

이 문제는 종속적으로 작동한다고 판단하였다.

하지만, 종속적으로도 구현해도 되고, 독립적으로 구현해도 문제가 되지 않는다.

구현을 할때는 독립적으로 구현해야만 작동한다.

`매초가 분 시에 종속된 구조라고 해서, 반드시 코드 또한 종속적으로 짜야하는건 아니다.`

따로 모듈화시켜 짜도 큰 문제가 없다.

아닐때도 구현해 주어야한다.



### Permutation 만들기

```java
package com.codestates.coplit; 

public class Solution { 
	public String makePermutations(String str) {
    // TODO:
    String ret = "";
    for(int i = 0 ; i < str.length() ; i++){
      for(int j = 0 ; j < str.length() ; j++){
        ret += String.valueOf(str.charAt(i);
        ret += String.valueOf(str.charAt(j));
        ret += ",";
      //ret = ret + str.charAt(left) + str.charAt(right) + ","; -> 가능
      //ret = str.charAt(left) + str.charAt(right) + ","; -> 불가능
      // charAt이 왼쪽에 먼저오면 char로 인식되어 int로 83이렇게 들어간다.
      // 그래서 왼쪽 맨끝에 ret이 오게 만들어 String으로 먼저 바뀌게끔 해줘야한다.
      }
      
    }if (ret == "") return ""; 
    return ret.substring(0,ret.length()-1);
	} 
}
```

내가 푼 방식인데, 3줄이 하닌 1줄로 쓰는방법도 존재한다.
