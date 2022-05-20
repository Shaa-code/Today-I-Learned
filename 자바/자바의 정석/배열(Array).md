### 배열의 선언과 생성

| 선언방법 | 선언 예 |
| --- | --- |
| 타입[] 변수이름; | int[] score; String[] name; |
| 타입 변수이름[]; | int score[]; String name[]; |


저자의 경우 대괄호를 타입에 붙이는 쪽을 선호한다.

대괄호가 변수 일름의 일부라기 보다는 타입의 일부로 보기 때문이다.

### 배열의 생성

```java
int[] score; -> 선언
score = new int[5] -> 생성
```

각 배열요소는 자동적으로 int의 기본값(default)인 0으로 초기화된다.

### 배열의 길이와 인덱스

배열의 요소(element) : 생성된 배열의 각 저장공간

접근방식 : ‘배열이름[인덱스]’

1. 배열의 길이는 양의 정수이어야 한다.
2. 최대값은 int타입의 최대값, 약 20억이다. (사실상 너무커서 제약없음)
3. 배열의 길이는 0이 될 수도 있다.

### 배열이름.length

`자바에서는 JVM이 모든 배열의 길이를 별도로 관리`하며, ‘배열이름.length’를 통해서 배열의 길이에 대한 정보를 얻을 수 있다.

배열은 한번 생성하며 길이를 변경할 수 없기 때문에, 이미 생성된 배열의 길이는 변하지 않는다.

따라서 ‘배열이름, length’는 상수다. 즉, 값을 읽을 수만 있을 뿐 변경할 수 없다.

### 배열의 초기화

for문으로 배열을 초기화하려면, 저장하려는 값에 일정한 규칙이 있어야만 가능하기 때문에 자바에서는 다음과 같이 배열을 간단히 초기화 할 수 있는 방법을 제공한다.

```java
int[] score = new int[] {50,60,70,80,90}; -> new int[] 생략가능
int[] score = {50,60,70,80,90};

---

int[] score;
score = new int[]{50,60,70,80,90} -> OK
score = {50,60,70,80,90} -> ERROR 선언과 생성을 따로하면 오류가 발생함.

---

int add(int[] arr){}
int result = add(new int[]{100,90,80,70,60});
int result = add({100,90,80,70,60});
```

모두 길이가 0인 배열을 생성하는법.

```java
int[] score = new int[0];
int[] score = new int[]{};
int[] score = {};
```

참조변수의 기본값은 null이지만, 배열을 가리키는 참조변수는 null대신 길이가 0인 배열로 초기화하기도 한다.

### 배열의 출력

초기화도 for문으로 사용한것처럼 출력도 for문 처럼 한다.

```java
int[] iArr= {100,95,80,70,60};
for(int i = 0; i< iArr.length; i++){
		System.out.println(iArr[i]);
}
#System.out.print(iArr[i]+",") -> 줄 안바꾸고 ','로 요소 구분.
#System.out.println(Arrays.toString(iArr)); 사용가능. -> return : [100,95,80,70,60]
```

예외적으로 char배열은 println메서드로 출력하면 각 요소가 구분자 없이 그대로 출력되는데, 이것은 println메서드가 char배열일 때만 이렇게 동작하도록 작성되었기 때문이다.

```java
char[] chArr = {'a','b','c','d'};
System.out.println(chArr); -> abcd 출력
```

### 배열의 복사

```java
int[] arr = new int[5];
int[] tmp = new int[arr.length*2];
for(int i = 0; i < arr.length; i++)
		tmp[i] = arr[i];
arr = tmp;
```

비용이 많이 들기 때문에, 처음부터 배열의 길이를 넉넉하게 잡아줘서 새로 배열을 생성해야하는 상황이 가능한 적게 발생하도록 해야 한다.

단순히 값만 복사하는게아니라, 참조하며 이름만 다를뿐 물리적으로 동일한 배열이된다.

배열은 참조변수를 통해서만 접근할 수 있기 때문에, 자신을 가리키는 참조변수가 없는 배열은 사용할 수 없다. 이렇게 쓸모없게 된 배열은 JVM의 가비지 컬렉터에 의해서 자동적으로 메모리에서 제거된다.

### System.arraycopy()를 이용한 배열의 복사

for문은 배열의 요소 하나하나에 접근해서 복사하지만,

arraycopy()는 지정된 범위의 값들을 한번에 통째로 복사한다.

각 요소들이 연속적으로 저장되어 있다는 배열의 특성 때문에 이렇게 처리가 가능한 것이다.

```java
for(int i = 0 ; i < num.length; i++) { newNum[i] = num[i]; }

System.arraycopy(num, 0, newNum,0, num.length)

-> num[0]에서 newNum[0]으로 num.lgenth개의 데이터를 복사한다.
```

```java
public static void main(String[] args) {
       char[] abc = {'A','B','C','D'};
       char[] num = {'0','1','2','3','4','5','6','7','8','9'};
       System.out.println(abc);
       System.out.println(num);

       char[] result = new char[abc.length+num.length];
       System.out.println(result);
       System.arraycopy(abc,0,result,0,abc.length);
       System.arraycopy(num,0,result, abc.length, num.length);
       System.out.println(result);
    }
```

이런식으로 사용한다.

num.length는 개수로 생각하면 편하다.

### 배열의 활용

1. 총합과 평균을 구함.
2. 최대값과 최소값을 구함.
3. 섞기(Shuffle) → 랜덤값을 구하기위함.
4. 정렬하기
5. 빈도수 구하기

```java
public static void main(String[] args) {
        int[] numArr = new int[10];

        for (int i = 0 ; i < numArr.length; i++){
            numArr[i] = i;
            System.out.print(numArr[i]);
        }
        System.out.println();

        for(int i=0; i < 100; i++){
            int n = (int)(Math.random() * 10);
            int tmp = numArr[0]; # 0이 아니라 i로 해도됨
            numArr[0] = numArr[n]; #0이 아니라 i로 해도됨
            numArr[n] = tmp;
        }
        for (int i=0; i< numArr.length ; i++)
            System.out.print(numArr[i]);
    }
```

이렇게 배열의 첫번째 원소와 무작위로 선택된 원소를 계속해서 바꾸는 방식으로도 랜덤한 수를 추출할 수 있다.

0이 아닌 i로 한다면 첫번째 원소가 아니라, 각 원소들이 랜덤으로 바뀌게 되는것이다.

```java
public static void main(String[] args) {
        int[] ball = new int[45];
        for (int i = 0; i< ball.length; i++){
            ball[i] = i+1;
        }
        int temp = 0;
        int j = 0;

        for(int i =0; i< 6 ;i++){
            j = (int) (Math.random() * 45);
            temp = ball[i];
            ball[i] = ball[j];
            ball[j] = temp;
        }

        for (int i = 0 ; i<6 ; i++)
            System.out.printf("ball[%d]=%d%n",i,ball[i]);
    }
```

로또예제는 직접 생각했을때, 하나하나 랜덤으로 만들어서 뽑는다 생각했는데, 미리 모두 섞어넣고, 섞여있는 것을 그냥 고르는 방식으로도 구현할 수 있다는걸 배웠다.

### 임의의 값으로 배열 채우기

```java
for (i = 0; i < arr.length; i++) {
		arr[i] = (int) (Math.random() *5);
}
```

```java
public static void main(String[] args) {
        int[] numArr = new int[10];

        for(int i = 0 ; i < numArr.length ; i++){
            System.out.print(numArr[i] = (int)(Math.random() * 10));
        }
        System.out.println();

        for( int i = 0 ; i < numArr.length-1 ; i++){
            boolean changed = false;

            for (int j=0; j< numArr.length-1-i; j++) {
                if(numArr[j] > numArr[j+1]){
                    int temp = numArr[j];
                    numArr[j] = numArr[j+1];
                    numArr[j+1] = temp;
                    changed = true;
                }
            }
            if (!changed) break;

            for(int k=0; k<numArr.length;k++)
                System.out.print(numArr[k]);
            System.out.println();
        }
    }
```

### 왜 numArr.length-1-i인가?

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c7ee080a-63ba-4c20-b75f-c4c25c6f61a1/Untitled.png)

버블정렬이 한번 수행될때마다. 가장뒤에서 1칸씩 앞으로 이동한 범위내에서 원소를 비교해야하기 때문이다.

```java
public static void main(String[] args) {
    int[] numArr = new int[10];
    int[] counter = new int[10];

    for(int i = 0 ; i < numArr.length; i++){
        numArr[i] = (int)(Math.random() * 10);
        System.out.print(numArr[i]);
    }
    System.out.println();

    for (int i=0 ; i <numArr.length; i++){
        counter[numArr[i]]++; //핵심 !
    }

    for (int i =0 ; i< numArr.length ; i++){
        System.out.println(i + "개수 :" +counter[i]);
    }
}
```

나온 원소의 갯수를 세는 알고리즘 counter[numArr[i]]++을 사용해서 표현한다.

## String배열

String배열의 선언과 생성

```java
String[] name = new String[3];
```

| 자료형 | 기본값 |
| --- | --- |
| boolean | false |
| char | ‘\u0000’ |
| byte,short,int | 0 |
| long | 0L |
| float | 0.0f |
| double | 0.0d 또는 0.0 |
| 참조형 변수 | null |

참조형 변수를 간단히 참조변수라고 하며, 모든 참조형 변수에는 객체가 메모리에 저장된 주소인 4byte의 정수값(0x0~0xffffffff) 또는 null이 저장된다.

### String배열의 초기화

참조형 배열의 경우 저장되는 것은 객체의 주소이다.

```java
String[] name = new String[]{"Kim","Park","Yi"};
String[] name = {"Kim", "Park", "Yi"};
```

### char배열과 String클래스

String클래스는 char배열에 여러가지 기능을 추가하여 확장한것이다.

그래서 char배열을 사용하는 것보다 String클래스를 사용하는것이 문자열을 다루기 더 편리하다.

`String객체는 읽을수만 있을뿐 내용을 변경할 수 없다.`

```java
String str = "Java";
str = str + "8";
System.out.println(str);
```

### String클래스의 주요 메서드

| 메서드 | 설명 |
| --- | --- |
| char charAt(int index) | 문자열에서 해당 위치(index)에 있는 문자를 반환한다. |
| int length() | 문자열의 길이를 반환한다. |
| String substring(int from, int to) | 문자열에서 해당 범위(from~to)에 있는 문자열을 반환한다. (to는 범위제외) |
| boolean equals(Object obj) | 문자열의 내용이 obj와 같은지 확인한다. 같으면 결과는 true, 다르면 false가 된다. |
| char[] toCharArray() | 문자열을 문자배열(char[])로 변환해서 반환한다. |

문자열을 비교할때는 ‘==’가 아닌 equals()를 사용해야한다.

이 메서드는 대소문자를 구분한다는점에 주의하자.

대소문자를 구분하지 않고 비교하려면 equals()대신 equalsIgnoreCase()를 사용해야한다.

### char배열과 String클래스의 변환

```java
char[] chArr = {'A','B','C'};
String str = new String(chArr);
char[] tmp = str.toCharArray()
```

### 커맨드 라인을 통해 입력받기

프로그램을 실행할 때 클래스 이름뒤에 공백문자로 구분하여 여러개의 문자열을 프로그램에 전달 할 수 있다.

c:\jdk.18\work\ch5>java MainTest abc 123

```java
public static void main(String[] args) {
				if(arg!=null) //넣어주지 않으면 null이되어 오류가 발생함.
        System.out.println("매개변수의 개수:"+args.length);
        for(int i=0;i< args.length; i++){
            System.out.println("args["+i+"] = \"" + args[i] + "\"");
        }
    }
```

## 다차원 배열

### 2차원 배열의 선언과 인덱스

| 선언방법 | 선언 예 |
| --- | --- |
| 타입[][] 변수이름; | int[][] score; |
| 타입 변수이름[][]; | int score[][]; |
| 타입[] 변수이름[]; | int[] score[]; |

int[][] score = new int[4][3]

```java
public static void main(String[] args) {
        int[][] score = {{100, 100, 100}, {20, 20, 20}, {30, 30, 30}, {40, 40, 40}};
        int sum = 0;
        for (int i = 0; i < score.length; i++) {
            for (int j = 0; j < score[i].length; j++) {
                System.out.printf("score[%d][%d]=%d\n", i, j, score[i][j]);
            }
        }

        for (int[] tmp : score) { //for(int i : score)로하면 에러난다.  1차원임.
            for (int i : tmp) {
                sum += i;
            }
            System.out.println("sum=" + sum);
        }
    }
```

### 가변 배열

배열의 마지막 차수를 지정하지 않음으로써 유동적인 가변배열을 구성한다.

2차원 예시

```java
int[][] score = new int[5][] // 열을 지정하지 않는다.
score[0] = new int[3]; //1행에 3열 선언
score[1] = new int[3]; //2행에 3열 선언
score[2] = new int[3]; //3행에 3열 선언
score[3] = new int[3]; //4행에 3열 선언
score[4] = new int[3]; //5행에 3열 선언

int[][] score = new int[5][]; // 열을 지정하지 않는다.
score[0] = new int[4]; //1행에 4열 선언
score[1] = new int[3]; //2행에 3열 선언
score[2] = new int[2]; //3행에 2열 선언
score[3] = new int[2]; //4행에 2열 선언
score[4] = new int[3]; //4행에 3열 선언
```

```java
public static void main(String[] args) {
        final int SIZE = 10;
        int x = 0 , y = 0;

        char[][] board = new char[SIZE][SIZE];
        byte[][] shipBoard = {
        //  1 2 3 4 5 6 7 8 9
            {0,0,0,0,0,0,1,0,0},
            {1,1,1,1,0,0,1,0,0},
            {0,0,0,0,0,0,1,0,0},
            {0,0,0,0,0,0,1,0,0},
            {0,0,0,0,0,0,0,0,0},
            {1,1,0,1,0,0,0,0,0},
            {0,0,0,1,0,0,0,0,0},
            {0,0,0,1,0,0,0,0,0},
            {0,0,0,0,0,1,1,1,0},
        };

        for (int i = 1; i<SIZE; i++)
            board[0][i] = board[i][0] = (char)(i+'0');
        Scanner scanner = new Scanner(System.in);

        while(true){
            System.out.printf("좌표 입력.");
            String input = scanner.nextLine();

            if(input.length()==2){
                x = input.charAt(0) - '0';
                y = input.charAt(1) - '0';

                if( x==0 && y==0)
                    break;
            }
            if(input.length() != 2 || x<= 0 || x>= SIZE || y<=0 || y>=SIZE){
                System.out.println("입력오류. 다시입력.");
                continue;
            }
            board[x][y] = shipBoard[x-1][y-1]==1 ? 'O' : 'X';

            for(int i = 0 ; i < SIZE; i++)
                System.out.println(board[i]);
            System.out.println();
```

이런식으로 좌표에 표시하며 구현이 가능하다.

```java
public static void main(String[] args) {
        final int SIZE = 5;
        int x = 0, y= 0, num= 0;

        int[][] bingo = new int[SIZE][SIZE];
        Scanner scanner = new Scanner(System.in);
        
        //1~SIZE*SIZE 범위로 초기화
        for(int i=0; i<SIZE;i++) {
            for (int j = 0; j < SIZE; j++)
                bingo[i][j] = i * SIZE + j + 1;
        }
        
        //shuffle
        for(int i = 0; i < SIZE; i++){
            for(int j =0;j<SIZE;j++){
                x = (int)(Math.random() * SIZE);
                y = (int)(Math.random() * SIZE);

                int tmp= bingo[i][j];
                bingo[i][j] = bingo[x][y];
                bingo[x][y] = tmp;
            }
        }
        do{
            for(int i =0 ; i<SIZE ; i++){
                for(int j=0; j<SIZE; j++)
                    System.out.printf("%2d ", bingo[i][j]);
                System.out.println();
            }
            System.out.println();

            System.out.printf("1~%d의 숫자입력하세요.",SIZE*SIZE);
            String tmp = scanner.nextLine();
            num = Integer.parseInt(tmp);

            // 같으면 0으로 저장
            outer:
            for(int i = 0; i< SIZE; i++){
                for(int j=0;j<SIZE;j++){
                    if (bingo [i][j]==num){
                        bingo[i][j] = 0 ;
                        break outer;
                    }
                }
            }
        }while(num!=0);
    }
```

필요할때 뜯어보자.

배열을 두고, 입력된 숫자만 0으로 바꾸는 알고리즘이다.

```java
public static void main(String[] args) {
        int[][] m1 = {
            {1,2,3},
            {4,5,6}
        };
        int[][] m2 = {
            {1,2},
            {3,4},
            {5,6}
        };

        final int ROW = m1.length;
        final int COL = m2[0].length;
        final int M2_ROW = m2.length;

        int[][] m3 = new int[ROW][COL];
        for(int i=0; i<ROW; i++)
            for(int j=0; j<COL;j++)
                for(int k=0;k<M2_ROW;k++)
                    m3[i][j] += m1[i][k] * m2[k][j];

        for(int i =0; i<ROW;i++){
            for(int j =0; j<COL;j++){
                System.out.printf("%3d ", m3[i][j]);
            }
            System.out.println();
        }
    }
```

행렬 곱은 나중에 라도 배울수 있게끔 해놓기

```java
import java.util.*;

public class Ex1 {
    public static void main(String[] args){
        String[][] words = {
                {"chair","의자"},
                {"computer","컴퓨터"},
                {"integer","정수"}
        };

        Scanner scanner = new Scanner(System.in);

        for(int i=0; i< words.length;i++){
            System.out.printf("Q%d. %s의 뜻은?",i+1,words[i][0]);

            String tmp = scanner.nextLine();

            if(tmp.equals(words[i][1])){
                System.out.printf("정답잆니다. \n\n");
            }else{
                System.out.printf("틀렸습니다. 정답은 %s입니다.\n\n",words[i][1]);
            }
        }
    }
}
```

여기서 abc는 args[0], 123은 args[1]로 전달된다.
