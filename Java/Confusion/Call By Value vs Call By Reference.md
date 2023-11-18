### 기존에 내가 알던 내용

Call By Value는 값을 복사해서 매개변수로 넣는 것이다. (얕은 복사)

Call By Reference는 주소값을 복사해서 매개변수로 넣는것이다. (깊은복사)

### 제대로 배운 내용

Call By Value, Call By Reference

`함수에 인자가 들어왔을 때, 매개변수가 값을 복사하느냐, 주소값을 참조하느냐를 결정하는 개념이다.`

- 내가 직면한 문제

```java
class Member{
    public void changeTeam(team){
        this.team = team;
        team.getMembers().add(this);
        //여기서 this.team의 내용을 바꿔야지 team의 내용을 바꾸면 안된다고 생각했다.
    }
}
```

- 내가 무엇을 헷갈렸을까?

메소드에 입력값(파라미터)에 원시값(Primitive Type)을 전달하는 것과 객체(Reference Type)을 전달하는 것에는 큰 동작 차이가 있다는점을 알지 못했다.

참조값(주소값) 복사는 배열 뿐만 아니라, 클래스, 리스트, 맵 등 primitive 타입이 아닌 모든 타입에 대해서 적용된

```java
public class main
{
    public static void main(String[] args)
    {
        Sample sample = new Sample();

        int var = 1; // primitive 타입 변수 int
        int[] arr = { 1 }; // reference 타입 변수 int[] 배열

        // 변수 자체를 보냄 (call by value)
        add_value(var);
        System.out.println(var); // 1 : 값 변화가 없음

        // 배열 자체를 보냄 (call by reference)
        add_reference(arr);
        System.out.println(arr[0]); // 101 : 값이 변화함
    }

    static void add_value(int var_arg) {
        var_arg += 100;
    }

    static void add_reference(int[] arr_arg) {
        arr_arg[0] += 100;
    }
}
```
