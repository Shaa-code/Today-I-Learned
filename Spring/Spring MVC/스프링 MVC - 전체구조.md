## 전체구조를 알아야하는 이유

향후 문제가 발생했을 때 어떤 부분에서 문제가 발생했는지 쉽게 파악하고, 문제를 해결하기 위해서이다.

프론트 컨트롤러는 DispatcherServlet이다.

스프링부트는 DispatcherServlet를 자동으로 등록하는데 모든 경로(UrlPattern=”/”)에 대해서 매핑한다.

DispatcherServlet은 FrameworkServlet을 상속받고 있는데,

service()는 FrameworkServlet에 있고 얘를 실행시킨다.

FrameworkServlet.service()를 시작으로 여러 메서드가 호출되면서 DispactherServlet.doDispatch()가 호출된다.

핵심 로직은 doDispatch()에 있다.

누가 언제 어디서 무엇을 어떻게 왜

## 동작 순서

핸들러 조회 → 핸들러 어댑터 조회 → 핸들러 어댑터 실행 → 핸들러 실행 → ModelAndView 반환 → viewResolver 호출 → View 반환 → View Rendering

ModelAndView는 Model을 생성하고 ViewName을 잠깐 동안 저장해두기 위한 용도로 사용하고

View는 실제로 렌더링하고 forward하는 용도로 사용한다.

## 핸들러 매핑과 핸들러 어댑터

내가 만든 컨트롤러가 호출되려면 2가지가 필요하다.

1. HandlerMapping

핸들러 매핑에서 내가 만든 컨트롤러를 찾을 수 있어야한다.

ex) 스프링 빈의 이름으로 핸들러를 찾을 수 있는 핸들러 매핑이 필요하다.

1. HandlerAdapter

핸들러 매핑을 통해서 찾은 핸들러를 실행할 수 있는 핸들러 어댑터가 필요하다.

스프링 부트가 자동들록하는 핸들러 매핑과 핸들러 어댑터

- HandlerMapping

0 = RequestMappingHandlerMapping : 애노테이션 기반의 컨트롤러인 @RequestMapping에서 사용

1 = BeanNameUrlHandlerMapping : 스프링 빈의 이름으로 핸들러를 찾는다.

- HandlerAdapter

0 = RequestMappingHandlerAdapter : 애노테이션 기반의 컨트롤러인 @RequestMapping에서 사용한다.

1 = HttpRequestHandlerAdapter : HttpRequestHandler 처리

2 = SimpleControllerHandlerAdapter : Controller 인터페이스(애노테이션 X, 과거에 사용) 처리

이전에 배운것처럼 URI를 입력하면 HandlerMapping에서 빈 이름으로 핸들러를 찾는다.

다음 여러 어댑터들이 for문을 돌면서 해당 Handler를 처리할 수 있는지 검증하고 handle()을 처리한다. 그렇게 하면, 해당 컨트롤러의 처리를 끝낸 ModelAndView가 반환되고 모델을 활용해 View를 넣는다.

### ViewResolver

```java
@Component("springmvc/old-controller")
public class OldController implements Controller {
    @Override
    public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("OldController.handleRequest");
        return new ModelAndView("new-form");
    }
}
```

이는 작동은 하지만 페이지를 띄우지 못한다.

뷰 리졸버가 없기 때문이다.

feat) ModelAndView에 전체주소를 적으면 작동은 하지만 권장하지는 않는다.

뷰를 설정해주면 잘 나오게 된다.

application.properties에

spring.mvc.view.prefix=/WEB-INF/views/

spring.mvc.view.suffix=.jsp

을 넣어주면 잘 작동한다.

이유는 스프링부트가 InternalResourceViewResolver 라는 뷰 리졸버를 자동으로 등록한다.

이 뷰 리졸버가 application.properties에 있는 prefix와 suffix를 활용한다.

application.properties에 해주면 스프링부트가 아래 코드를 자동으로 생성하고 실행해 주는 것이다. (prefix, suffix 설정을 안 해주면 반환을 안해준다.)

```java
@Bean
InternalResourceViewResolver internalResourceViewResolver(){
   return new InternalResourceViewResolver("WEB-INF/views/",".jsp");
}
```

1 = BeanNameViewResolver : 빈 이름으로 뷰를 찾아서 반환한다.

ex) 엑셀 파일 생성 기능에 사용한다.

2 = InternalResourceViewResolver : JSP를 처리할 수 있는 뷰를 반환한다.

## 동작 순서

1. 핸들러 어댑터 호출

핸들러 어댑터를 통해 new-form이라는 논리 뷰 이름을 얻는다.

1. ViewResolver 호출

BeanNameViewResolver는 new-form이라는 이름의 스프링 빈으로 등록된 뷰를 찾아야하는데 없다.

InternalResourceViewResolver가 호출된다.

1. InternalResourceViewResolver

이 뷰 리졸버는 InternalResourceView를 반환한다.

1. InternalResourceView

JSP처럼 forward()를 호출해서 처리할 수 있는 경우에 사용.

1. view.render()

view.render() 가 호출되고 InternalResourceView는 forward()를 사용해서 JSP를 실행한다.

feat) JSP를 제외한 나머지 뷰 템플릿들은 forward() 과정없이 바로 렌더링 된다.

Thymeleaf 뷰 템플릿을 사용하면 ThymeleafViewResolver를 등록해야 한다.

최근에는 라이브러리만 추가하면 스프링부트가 이런 작업도 모두 자동화해준다.

## SpringMVC 시작하기

@RequestMapping

- RequestMappingHandlerMapping
- RequestMappingHandlerAdapter

### @Controller의 역할

1. 내부에 @Component가 있어 ComponentScan의 대상이 된다.
2. 스프링 MVCC에서 어노테이션 기반의 컨트롤러로 인식한다.

@RequestMapping은 요청 정보를 매핑한다.

해당 URL이 호출되면 이 메서드가 호출된다.

애노테이션을 기반으로 동작하기 때문에, 메서드의 이름은 임의로 지으면 된다.

```java
//@Controller
@Component
@RequestMapping
public class SpringMemberFormControllerV1 {
    @RequestMapping("/springmvc/v1/members/new-form")
    public ModelAndView process(){
        return new ModelAndView("new-form");
    }
}
```

컨트롤러 대신 @Component와 RequestMapping을 넣어도 된다.

물론 컴포넌트 애노테이션 없이 빈을 직접 등록해도 된다.
