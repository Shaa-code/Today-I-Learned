# DAY22

### JSON이란?

JavaScipt Object Notation의 줄임말이다.

서로 다른 프로그램 사이에서 데이터를 교환하기 위한 포맷

### 왜 필요한거지?

서로 다른 프로그램 사이 데이터를 전송하는데 규격을 맞출 필요가 있었다.

필요성 1. Reciever와 Sender가 같은 프로그램을 사용해야한다는점.

필요성 2. String처럼 범용적으로 읽을 수 있어야함.

### 일반 Map구조와 다른 JSON만의 특징

1. JSON은 Key : Value에 반드시 “”(쌍따옴표)를 감싸야한다.
2. JSON은 Key : Value에 공백이 없다.

### 재귀를 활용한 JSON 변환 구현

```java
public String stringify(Object data) throws JsonProcessingException {

    //입력된 값이 null, Integer, Boolean
    if (data == null || data instanceof Integer || data instanceof Boolean) {
      return "" + data;
    }

    //입력된 값이 String일 경우
    if (data instanceof String) {
      return "\"" + data + "\"";
    }

    //입력된 값이 Object[]일 경우
    if (data instanceof Object[]) {
      String ret = "[";
      int i = 0;
      for (Object o : (Object[]) data) {
        if (i != 0)
          ret += ",";
        ret += stringify(o);
        i++;
      }
      ret += "]";
      return ret;
    }
    //입력된 값이 HashMap일 경우

    if (data instanceof HashMap) {
      HashMap<?,?> Map = (HashMap<?,?>) data;
      String ret = "{";
      int i = 0;
      int length = Map.size();
      for (Object o : Map.keySet()) {
        ret += stringify(o) + ":";
        ret += stringify(Map.get(o));
      if (length != 0 && i != length - 1)
        ret += ",";
      i++;
    }
      ret += "}";
      return ret;
    }
    //지정되지 않은 타입의 경우에는 "null"을 리턴합니다.
    return null;
```
