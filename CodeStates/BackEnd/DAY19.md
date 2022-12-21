# Stream

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

### 여성의 수 리턴

```java

members.stream().filter(m -> m.getGender() == "Female").count();

static class Member {
public Member(String name, String gender) {
      String gender;
      this.gender = gender;
		}

public String getGender() {
      return gender;
    }
}
```

### 남자 수의 평균나이 리턴

```java
return members.stream().filter(m-> m.getGender() == "Male").mapToDouble(m->m.getAge()).average().orElse(0.0);

static class Member {
    String gender;
    int age;

    public Member(String name, String gender, int age) {
      this.gender = gender;
      this.age = age;
    }

    public String getGender() {
      return gender;
    }

    public int getAge() {
      return age;
    }
  }
}
```

### 스트림 중복제거, 정렬후 배열로 리턴

```java
return names.stream()
            .distinct()
            .sorted()
            .toArray(String[]::new);

```

### 스트림 중복제거, “김”으로 시작하는것만 뽑아서 정렬후 배열로 리턴

```java
return names.stream()
        .distinct()
        .filter(m -> m.startsWith("김"))
        .sorted()
        .toArray(String[]::new);
```

### 스트림의 최대값 리턴

```java
try{
    return Arrays.stream(arr).max().getAsInt();
    }catch(Exception e){
      return null;
}
```

### 배열중 가장 길이가 긴 길이 리턴

```java
return Arrays.stream(strArr)
            .mapToInt(String::length)
            .max()
            .getAsInt();
```

### 두개의 스트림 합치기

```java
Stream<String> strs1 = list1.stream();
Stream<String> strs2 = list2.stream();

Stream<String> strs3 = Stream.concat(strs1,strs2);
return strs3.collect(Collectors.toList());
```

### 스트림 원소 2배로 만들고 리스트로 리턴

```java
return list.stream().map(m -> m*2).collect(Collectors.toList());
```

### 조건에 맞는 원소 수를 세어 boolean 반환
```java
long hotDays = Arrays.stream(temperature)
              .filter(m -> m >= 30)
              .count();       

return (hotDays >= 3)
```
