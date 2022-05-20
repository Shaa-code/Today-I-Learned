# 코플릿5 (Stream)

### 스트림을 Int로 바꾸어 합을 구하는법

```java
list.stream().mapToInt(m -> m).sum();
```

### 스트림을 Double로 바꾸는방법

```java
list.stream().mapToDouble(m -> m).average().orElse(0.0)
```

왜 orElse(0.0)를 해주는가? // 나오는값은 OptionalDouble이다.

예외처리 되는경우 0.0을 넣기 위해서이다.

### 스트림에서 짝수요소만 추출

```java
Integer[] ret = list.stream().filter(m -> ((m % 2) == 0)).toArray(Integer[]::new);
    return Arrays.asList(ret);
            
// list.stream().filter(m -> ((m % 2) == 0))
//              .collect(Collectors.toList())
```
