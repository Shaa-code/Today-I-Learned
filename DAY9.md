### 아직 정리가 안됨. 코플릿 다 풀고나서 주말에 더 정리해서 올려야겠음.

if문의 안익숙함.

```java
public class Solution { 
	public boolean isOldEnoughToDrink(int age) {
    return if(age >= 18);
	}
}

-> 혼자 if해놓고 왜인지 찾고 있었음.

public class Solution { 
	public boolean isOldEnoughToDrink(int age) {
    return age >= 18;
	}
}
```

boolean형의 삼항연산자 숙련도

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

```java
if(num % 3 && num % 5) return "FizzBuzz";
이러고 왜 안되지 거리고 있었음.
if(num % 3 && num % 5 == 0) return "FizzBuzz"; // ==0을 해줘야한다.

(num % 3 && num % 5) == 0) 이러면 안된다.

(num % 3 == 0 && num % 5 ==0)으로 해주었어야한다.
```

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

풀면서 느낀 switch문의 단점. `인자를 하나만 받아서 처리할 수 있다는게 단점이다.`

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

배수개념 코딩할줄 몰랐음. i 3? 이러고 있음.

for 문의 초기값을 설정해야 중간값을 볼수 있다.

목적이 작으면 바꿔준다.

for문의 첫번째 칸은 초기값, for문의 중간은 마지막값이라는걸 알고 있어야한다.

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

### toCharArray()로 만든것은 arr[i]로 원소에 접근이 가능하고, 데이터를 바꿀수 있다.

### int to char와 int to String을 잘 구분해야한다.

그리고 

int to char는 (char)i로 간단히 바꿀수 있고

int to String은 String
