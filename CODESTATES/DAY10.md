# DAY10

오늘도 코플릿 문제를 많이 접했다.

```java
package com.codestates.coplit; 

public class Solution { 
	public String getLongestWord(String str) {
    // TODO:

    String[] arr = str.split(" ");
    int tmp = Integer.MIN_VALUE;
    int idx = 0;
    for(int i = 0 ; i < arr.length ; i++){
      if(arr[i].length() > tmp) {
        tmp = arr[i].length(); // tmp에 i를 넣고 있었는데, tmp가 아닌 길이를 넣어줘야한다.
        idx = i;
      }
    }
    return arr[idx];
	}
}
```

### 짝수만을 요소로 갖는 배열 반환 (중요 !)

```java
package com.codestates.coplit; 

public class Solution { 
	public int[] getEvenNumbers(int[] arr) {
    int[] concatArray = new int[]{}; //가

    if(arr.length == 0) {
      return new int[]{};
    }

    for(int i = 0; i < arr.length; i++) {
      if(arr[i] % 2 == 0) {
        concatArray = Arrays.copyOf(concatArray, concatArray.length + 1);
         //한칸씩 계속 늘려줌.
        concatArray[concatArray.length - 1] = arr[i];
         //한칸씩 늘린칸에 대입함.
      }
    }

    return concatArray;
  }
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/37f449df-14ce-4c18-ab6e-5f9eeabf3b9a/Untitled.png)

1차원 가변배열은 선언이 안된다.

그럼 어떻게 상황에 대처해야할까?

아주 좋은 해답을 제시하고 있다.

1. int[] cancatArray = new int[]{} 로 빈배열을 우선에 받는다.
2. 이후 Arrays.copyOf를 활용해 if문에 걸릴때마다, concatArray의 길이를 1씩 확장시켜주면서 다시 대입하는 방식이다.

### CopyOfRange 은 배열을 복사한다.

```java
public class Solution { 
	public int[] getElementsAfter(int[] arr, int n) {
    if (n >= arr.length) {
			return new int[]{};
		}
    
		int[] result = Arrays.copyOfRange(arr, n, arr.length);
		return result;
	} 
}
```
![Untitled](https://user-images.githubusercontent.com/70310271/167455212-2f6c3a19-b7c8-4030-8836-092c5ec98cb5.png)

Arrays.copyOf(arr,5)는 처음부터 2까지를 복사한다.

만약 Arrays.copyOf(arr,7)이라면 빈 원소 2칸이 추가되는것이다.

### for문의 i와 index가 따로 움직일때 대처방법.

```java
package com.codestates.coplit; 
import java.util.*;

public class Solution { 
	public int[] getAllElementsButNth(int[] arr, int n) {
    if (n >= arr.length) {
       return arr;
    }

    int[] result = new int[arr.length - 1];
    int index = 0;
		
    for (int i = 0; i < arr.length; i++) {
      if (i == n) {
        continue;
      }
      result[index] = arr[i]; // 따로 index를 받았을때, 어떻게 증가시켜주지? 라고 생각했다.
      index++; //어렵게 생각하지 않고 그냥 바로 ++로 처리가능하다.
    }
    return result;
  }
}
```

### Arrays.toString 사용법과 replace 활용법

```java
class Test1{
    public static void main(String[] args) {
        int[] arr = new int[]{0, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8};
        String head = "010";
        int len = arr.length;
        String bodyArr = Arrays.toString(Arrays.copyOfRange(arr, len - 8, len - 4));
        System.out.println(bodyArr);
        String body = bodyArr
                .replaceAll(" ", "") //첫번째 공백제거
                .replaceAll(",", "") //두번째 쉼표제거
                .replace("[", "") //왼쪽 괄호제거
                .replace("]", "");//오른쪽 괄호제거
        System.out.println(body);
        String tailArr = Arrays.toString(Arrays.copyOfRange(arr, len - 4, len));
        String tail = tailArr
                .replaceAll(" ", "")
                .replaceAll(",", "")
                .replace("[", "")
                .replace("]", "");

        if (len == 11) {
            String headArr = Arrays.toString(Arrays.copyOfRange(arr, 0, 3));
            head = headArr
                    .replaceAll(" ", "")
                    .replaceAll(",", "")
                    .replace("[", "")
                    .replace("]", "");
        }
        return String.format("(%s)%s-%s", head, body, tail);
        //이렇게 String으로 반환시켜준다.
    }
}
```

Arrays.toString(arr) arr를 문자열로 반환시켜준다.

[1, 2, 3, 4]이렇게 return 되는데, 1234로 바꾸어준다.

### replaceAll과 replace의 차이점

replaceAll(’정규식’,’바꿀문자’)

replace(’기존문자’,’바꿀문자’)

간단하다 정규식이냐 아니냐의 차이이다.

특수문자가 들어가면,
