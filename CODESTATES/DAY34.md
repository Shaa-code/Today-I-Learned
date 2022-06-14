# DAY34

### Framework이란?

애플리케이션을 그 밑바다부터 일일이 전부 개발하는 것이 아니라 서로 다른 애플리케이션 간의 통신이나, 데이터를 데이터 저장소에 저장하는 등 다양한 기능들 역시 Framework가 라이브러리 형태로 제공함으로써 개발자가 애플리케이션의 핵심로직을 개발하는 것에 집중할 수 있도록 도와주는 도구.

### 용어 정리

main()메서드 처럼 애플리케이션의 시작되는 지점을 엔트리 포인트(Entry Point)라고 부른다.

클라이언트 측면에서 서버의 엔드포인트(Endpoint)란 클라이언트가 서버의 자원을 이용하기 위한 끝지점을 의미한다.)

## Library와 Framework의 차이점.

### 라이브러리란?

개발자가 짜 놓은 코드내에서 필요한 기능이 있으면 해당 라이브러리를 호출해서 사용하는 것이다.

즉, 애플리케이션 흐름의 주도권이 개발자에게 있는 것입니다.

### 프레임워크란?

Spring Framework에서 개발자가 작성한 코드를 사용해서 애플리케이션의 흐름을 만들어냅니다.

**즉, 애플리케이션 흐름의 주도권이 개발자가 아닌 Framework에 있는 것입니다.**

Servlet은 클라이언트 웹 요청 처리에 특화된 Java 클래스의 일종이라고 보시면 되는데, **Spring을 사용한 웹 요청을 처리할때에도 내부적으로는 Servlet을 사용한다**
라는 사실은 기억해두시면 좋을 것 같습니다.

## POJO란?

IoC/DI, AOP,PSA를 통해 달성되는것.

POJO(Plain Old Java Object) 프로그래밍이 필요한이유.

1. 특정 환경이나 기술에 종속적이지 않으면 재사용 가능하고, 확장 가능한 유연한 코드를 작성할 수 있다.
2. 저수준 레벨의 기술과 환경에 종속적인 코드를 애플리케이션 코드에서 제거 함으로써 코드가 깔끔해진다.
3. 코드가 깔끔해지기 때문에 디버깅하기도 상대적으로 쉽다.
4. 특정 기술이나 환경에 종속적이지 않기 떄문에 테스트 역시 단순해진다.
5. 객체지향적인 설계를 제한 없이 적용할 수 있다.

SPING은 POJO프로그래밍을 지향하는 Framework이다.

POJO코드를 작성하ㅣ 위해서 Spring에서는 세가지 기술을 지원한다.

IoC/DI, AOP, PSA이다.

### IoC(Inversion of Control)란?

애플리케이션 흐름의 주도권이 뒤바뀐것을 바로 IoC(Inversion of Control)이라고 한다.

서블릿 컨테이너의 경우, 클라이언트의 요청이 들어올때 마다 서블릿 컨테이너 내의 컨테이너 로직(service()메서드)가 서블릿을 직접 실행시켜 주기 때문에 main()메서드가 필요없다.

이런경우 서블릿과 웹 애플리케이션 간의 IoC(제어의 역전)의 개념이 적용되어 있는것이다.

### DI(Dependency Injection)란?

- 의존관계

```java
- MenuController(A)
public class MenuController{
    public static void main(String[] args){
        MenuService menuService = new MenuService();
        List<Menu> menuList = menuService.getMenuList();
    }
}

--- A,B는 서로 의존관계에 있음.

- MenuService(B)
public class MenuService{
    public List<menu> getMenuList(){
         return null;
    }
}
```

- 의존성 주입

```java
- CafeClient
public class MenuController{
    public static void main(String[] args){
        MenuService menuService = new MenuService();
        MenuController controller = new MenuController(menuService);
        List<Menu> menuList = menuService.getMenuList();
    }
}

- MenuController 
public class MenuController{
    private MenuService menuService;
    
    public MenuController(MenuService menuService){
        this.menuService = menuService;
    }

    public List<Menu> getMenus(){
        return menuService.getMenuList();
    }
}

- MenuService
public class MenuService {
    public List<Menu> getMenuList(){
        reutrn null;
    }
}
```

의존관계에서는 MenuService의 기능을 사용하기 위해 MenuController에서 MenuService의 객체를 new로 직접 생성한 반면에 의존성 주입에서는 MenuController 생성자로 MenuService의 객체를 전달받고 있다.

생성자를 통해서 어떤 클래스의 객체를 전달 받는 것을 ‘의존성 주입’이라고 한다.

생성자의 파라미터로 객체를 전달하는 것을 외부에서 객체를 주입한다고 표현한다.

클래스의 생정자로 객체를 전달 받는 코드가 있다면, 객체를 외부에서 주입받고있구나 즉, 의존성 주입이 이루어 지고있구나를 생각하면 된다.
