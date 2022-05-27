# DAY23

## 자료구조란?

여러 데이터의 묶음을 저장하고 사용하는 방법을 정의한것

## Stack이란?

데이터를 순서대로 쌓는 자료구조

## Stack 특징

- LIFO(Last In First Out)
- 데이터는 하나씩 넣고 뺄 수 있음
- 하나의 입출력 방향을 가지고 있음.

### Stack 문제 : 전 페이지, 현재 페이지, 앞 페이지 문제

```java
package com.codestates.coplit; 
import java.util.*;

public class Solution { 
    public ArrayList<Stack> browserStack(String[] actions, String start) {
    Stack<String> prevStack = new Stack<>();
    Stack<String> nextStack = new Stack<>();
    Stack<String> current = new Stack<>();
    ArrayList<Stack> result = new ArrayList<>();
        
    // TODO:

    current.push(start);
    for(String e : actions){
        //뒤로가기
        if(e.equals("-1")){
            if(!prevStack.empty()) {
                nextStack.push(current.pop());
                current.push(prevStack.pop());
            }
        //앞으로 가기
        } else if(e.equals("1")){
            if(!nextStack.empty()) {
                prevStack.push(current.pop());
                current.push(nextStack.pop());
            }
        // 새로운 페이지 
        } else {
            prevStack.push(current.pop());
            current.push(e);
            nextStack.clear();
        }   
    }

    result.add(prevStack);
    result.add(current);
    result.add(nextStack);
    return result;
    
    } 
}
```

![Untitled](https://user-images.githubusercontent.com/70310271/170537284-d3bdb07c-946f-4c84-b03f-fe50bbae6de9.png)


## Queue란?

데이터를 줄 세우는 자료구조

## Queue 특징

1. FIFO(First In First Out) : 먼저 들어간 데이터가 제일 처음에 나옴.
2. 데이터는 하나씩 넣고 뺼 수 있다.
3. 두 개의 입출력 방향을 가지고 있다.

###  문제 : 뒤의 원소가 앞의 최대값을 넘어야 단위로 자르는 문제

```java
public class Solution { 
    public int paveBox(Integer[] boxes) {
    // TODO:
        int max = Integer.MIN_VALUE;
        int tmp = Integer.MIN_VALUE;
        int cnt = 0;
    for(int i = 0; i< boxes.length ; i++){
        if(boxes[i] > max){
            max = boxes[i];
            cnt = 1;
        }else{
             cnt++;
        }
        if(cnt > tmp)
            tmp = cnt;
        }
        return tmp;
    }
}
```

![Untitled 1](https://user-images.githubusercontent.com/70310271/170533961-6e84f99e-3215-4262-a093-e5ef68cdecd5.png)
