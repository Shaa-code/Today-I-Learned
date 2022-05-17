# DAY16
오늘은 컬렉션 프레임워크에 대한 실습을 해본날이다.

역시 페어와 함께하면 더 재미있다!

헷갈렸던 부분만 조금 기록해두자.

### ArrayList 의 여러 초기화 방식

```java
public class Solution { 
  public ArrayList<Integer> makeArrayList() {
    //TODO..

    ArrayList<Integer> arr = new ArrayList<>();
    for(int i = 0 ; i < 5 ; i++){
      arr.add(i+1);
    }return arr;
  
  }
}

//ArrayList<Integer> arr = new ArrayList<>(Arrays.asList(1,2,3,4,5));
```

### get()과 indexOf()를 잘 구분하자!

```java
public class Solution { 
  public Integer getNthElement(ArrayList<Integer> arrayList, int index) {
    
      if(arrayList.isEmpty()) return null;
      return arrayList.get(index);
      // get과 indexOf를 잘 구분해야한다.
      // indexOf()는 value를 받아 index를 반환
      // get()은 index를 받아 value를 반환
  }
}
```

### ArrayList의 원소를 제거 하는 방법

```java
class Test{
    public static void main(String[] args) {
    ArrayList<Integer> arr = new ArrayList<>(Arrays.asList(1,2,3,4,5));

		arr.clear(); -> []
    //1. clear()는 반환형이 아니라. inplace되는 방식이다.
    arr.removeAll(arr); -> [] removeAll(Collections)가 있어야한다.
    //2. removeAll은 인자를 따로 넣어주어야한다.
    System.out.println(arr);
    }
}
```

### ArrayList의 마지막 원소 리턴 방법

```java
public class  Solution { 
  public String getLastElement(ArrayList<String> arrayList) {
    if(arrayList.isEmpty()) return null;
    return arrayList.get(arrayList.size()-1);
  }
}
```

### ArrayList iterator를 활용한 접근방식

```java
public class Solution { 
  public int sumAllElements(ArrayList<Integer> arrayList) {
    Iterator it = arrayList.iterator();
    int sum = 0;
    while(it.hasNext()){
      sum += (int)(it.next());
    }return sum;
  }
}
```

### ArrayList에서 짝수끼리 더하는 방법

```java
public class Solution { 
  public int addOddValues(HashMap<Character, Integer> hashMap) {
    Iterator it = hashMap.values().iterator(); // hashMap.keySet.Iterator
    int sum = 0;  
      while(it.hasNext()){
          int tmp = (int)(it.next());
          if(tmp % 2 == 0)
              sum += tmp;
      }
    return sum;
  }
}
```

### 키값은 들어온 그대로의 타입을 취해주어야한다.

```java
hashMap.get(firstName); -> X //ex)Type이 String일때.
hashMap.get("firstName") -> O //ex)Type이 String일때,
```

### HashMap이 { Key : Array }의 형태일때 접근 방식

```java
public class Solution { 
  public HashMap<String, Integer> select(String[] arr, HashMap<String, Integer> hashMap) {
    HashMap<String, Integer> nHM = new HashMap<>(); 
    for(int i = 0 ; i < arr.length; i++){
      if(hashMap.containsKey(arr[i]))
        nHM.put(arr[i],hashMap.get(arr[i]));
    }
    return nHM;
  }
}
```

### HashMap에 글자 수 만큼 Count하는 방식

```java
public class Solution { 
  public HashMap<Character, Integer> countAllCharacter(String str) {
    if(str.isEmpty()) return null;
    HashMap<Character,Integer> charCountMap = new HashMap<>();
    char[] strArray = str.toCharArray();
    for( char x : strArray ){
      if(charCountMap.containsKey(x)){
        charCountMap.put(x,charCountMap.get(x)+1);
      }else{
        charCountMap.put(x,1);
      }
    }
    return charCountMap;
  }
}
```
