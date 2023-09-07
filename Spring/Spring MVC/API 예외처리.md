## API 예외처리 하는법

대부분 오류가 발생하면 그냥 4xx, 5xx와 같은 사이트를 보여주면 된다.

하지만, API는 오류 화면을 보여주는 건 기본이고, API에 어떤 오류가 발생했는 지를 명확히 보여줘야한다.

```java
@Slf4j
@RestController
public class ApiExceptionController {

    @GetMapping("/api/members/{id}")
    public MemberDto getMember(@PathVariable("id") String id){
        if(id.equals("ex")){
            throw new RuntimeException("잘못된 사용자");
        }
        return new MemberDto(id, "hello " + id);
    }

    @Data
    @AllArgsConstructor
    static class MemberDto{
        private String memberId;
        private String name;
    }

}
```

![Untitled](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/62de8701-6357-4a03-b637-25df4f8f6b56)

ex로 오류를 넘기니 그냥 HTTP 페이지를 보여준다.

JSON으로 통신을 하고 있기 때문에, JSON을 보냈으면, JSON으로 받아야한다.

데이터를 받는 입장에서는 HTML 문서를 해석을 할 수가 없기 때문이다.

클라이언트는 정상 요청이든, 오류 요청이든 JSON이 반환되기를 기대한다.

문제를 해결하기 위해 오류 페이지 컨트롤러도 JSON응답을 할 수 있도록 수정해야한다.

### 해결법

WAS로 예외가 넘어온다. 이때 WAS는 WebServerCustomizer에서 추가된 오류페이지를 확인하고

“/error-page/500”로 다시 요청을 보낸다. 이때, ErrorPageController에서 호출된 API가 있는데 이전에는 

```java
@RequestMapping("/error-page/500")
public String errorPage500(HttpServletRequest request, HttpServletResponse response){
log.info("errorPage 500");
    printErrorInfo(request);
    return "error-page/500";
}
```

간단히 위 코드를 호출하여 에러페이지를 반환했지만,

```java
//포스트맨에서 통신할 때 ACCEPT 타입에 따라서 결과가 달라진다.
@RequestMapping(value = "/error-page/500", produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<Map<String, Object>> errorPage500Api(HttpServletRequest request, HttpServletResponse response){
log.info("API errorPage 500");

    Map<String, Object> result = new HashMap<>();
    //에러에서 순서는 딱히 중요하지 않아 HashMap을 사용한다.
    Exception ex = (Exception) request.getAttribute(ERROR_EXCEPTION);
    result.put("status", request.getAttribute(ERROR_STATUS_CODE));
    result.put("message", ex.getMessage());

    Integer statusCode = (Integer) request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
    return new ResponseEntity<>(result, HttpStatus.valueOf(statusCode));
}
```

이 코드를 추가로 작성해 두어 같은 URL일 때, 더 구체적으로 ACCEPT 타입이 JSON형태인 메서드를 먼저 호출하게 만든다.

## 스프링 부트의 기본 예외 처리

스프링에는 오류가 던져 졌을 때, WAS까지 올라가게 된다.

이전에는 위처럼 에러를 처리하는 컨트롤러를 직접 만들어줬지만,

스프링에서는 기본적으로 예외처리를 담당하는 기본 컨트롤러가 존재한다.

그리고, JSON 형태로 요청을 했을 때 오류가 발생하면, 아래처럼 오류를 나타내 준다.

![Untitled 1](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/47e377df-b134-407e-a3d6-529d566b6af4)

```java
@Controller
@RequestMapping("${server.error.path:${error.path:/error}}")
public class BasicErrorController extends AbstractErrorController {

@RequestMapping(produces = MediaType.TEXT_HTML_VALUE)
	public ModelAndView errorHtml(HttpServletRequest request, HttpServletResponse response) {
		HttpStatus status = getStatus(request);
		Map<String, Object> model = Collections
			.unmodifiableMap(getErrorAttributes(request, getErrorAttributeOptions(request, MediaType.TEXT_HTML)));
		response.setStatus(status.value());
		ModelAndView modelAndView = resolveErrorView(request, response, status, model);
		return (modelAndView != null) ? modelAndView : new ModelAndView("error", model);
	}

@RequestMapping
	public ResponseEntity<Map<String, Object>> error(HttpServletRequest request) {
		HttpStatus status = getStatus(request);
		if (status == HttpStatus.NO_CONTENT) {
			return new ResponseEntity<>(status);
		}
		Map<String, Object> body = getErrorAttributes(request, getErrorAttributeOptions(request, MediaType.ALL));
		return new ResponseEntity<>(body, status);
	}
```

이렇게 2가지 상황이 모두 있다.

하지만 이 경우도 이렇게 작동 한다는 것만 알아두자.

뒤에서 구체적인 예외 스펙을 우리가 정의해서 내보낼 수 있게 하는 @ExceptionHandler를 배운다. 

예외가 기본 예외처리를 통해 처리되면, HTTP.Status가 500으로 처리된다.

하지만, 우리는 발생하는 예외에 따라서 400, 404 등등 다른 상태코드도 처리하고 싶어진다.

### HandlerExceptionResolver

스프링 MVC는 컨트롤러 밖으로 예외가 던져진 경우 예외를 해결하고, 동작을 새로 정의할 수 있는 방법을 제공한다.

줄여서 “ExceptionResolver”라고 부른다.

![Untitled 2](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/b333ff3c-a90c-4ddf-8367-338eb01ecf7d)

![Untitled 3](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/65123113-d181-4d0b-946a-355a45ffcc62)

ExceptionResolver가 작동하면 이전의 방식과 다르게 DispatcherServlet에서 예외를 해결하는 시도를 하는데, 이때 ExceptionResolver가 예외를 잡아서 처리한다.

feat) ExceptionResolver로 해결해도 postHandle()은 호출되지 않는다.

```java
public interface HandlerExceptionResolver{
    ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex);
}
```

```java
@Slf4j
public class MyHandlerExceptionResolver implements HandlerExceptionResolver {
    @Override
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {

        try {
            //WAS에서 받아온 에러가 IllegalArgumentException이라면, response에 sendError를 넣어줌.
            if (ex instanceof IllegalArgumentException) {
log.info("IllegalArgumentException resolver to 400");
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
                return new ModelAndView();
                //ModelAndView()에는 아무것도 들어있지 않다.
                //즉, View에서 렌더링을 하지 않고, WAS로 간다.
                //그럼 WAS는 sendError를 보고 ErrorPage를 뒤져서 400번대 페이지를 반환해주는 것이다.
            }
        }catch(IOException e){
log.error("resolver ex", e);
        }

        //return null로 두면,지정된 에러를 찾지 못했을 때,계속해서 에러가 WAS 쪽으로 나아간다. (구체적으로는 다음에 등록해둔 ExceptionResolver를 찾아간다.)
        return null;
    }
}

```

WebConfig에 등록을 해줘야 한다.

```java
@Override
public void extendHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers){
    resolvers.add(new MyHandlerExceptionResolver());
}
```

등록할 때, configureHandlerExceptionResolver()를 사용하면 스프링이 기본으로 등록하는 ExceptionResolver가 제거된다. 그러므로 extendHandlereExceptionResolver를 사용하는게 좋다.

### 반환값에 따른 동작 방식

HandlerExceptionResolver의 반환값에 따른 `DispatcherServlet의 동작방식(필요하면 디스패처 서블릿 뜯어봐라)`은 다음과 같다.

1. 비어있는 ModelAndView를 반환

에러를 없던 것처럼 처리를 해버리고 뷰를 렌더링하지 않고 정상 흐름으로 서블릿이 리턴된다.

1. ModelAndView 지정

ModelAndView에 View, Model등의 정보를 지정해서 반환하면 뷰를 렌더링한다.

1. null

null을 반환하면 다음 ExceptionResolver를 찾아서 실행한다.

만약 처리할 수 있는 ExceptionResolver가 없으면 예외처리가 안되고 기존에 발생한 예외를 서블릿 밖으로 던진다.

### ExceptionResolver는 어떻게 활용될 수 있는가?

1. 예외를 던질 때 상태 코드가 500으로 나오던것을 다른 상태코드로 바꿀 수 있다.

예외를 response.sendError(xxx) 호출로 변경해서 서블릿에서 상태 코드에 따른 오류를 처리하도록 위임한다.

이후 WAS는 서블릿 오류페이지를 찾아서 내부 호출을 한다.

ex) 스프링 부트가 설정한 /error가 호출됨.

1. 뷰 템플릿 처리

ModelAndView에 값을 채워서 예외에 다른 새로운 오류 화면을 뷰 렌더링해서 고객에게 제공할 수 있다.

1. API 응답 처리

response.getWriter().println(”hello”);처럼 HTTP 응답바디에 직접 데이터를 넣어 줄 수 도 있다.

JSON 형태로 넣어주면 API의 응답처리를 할 수도 있다.

### HandlerExceptionResolver 활용

예외가 발생하면 WAS까지 예외가 던져지고, WAS에서 오류 페이지 정보를 찾아서 다시 ‘/error’를 호출하는 과정은 너무 복잡하다.

ExceptionResolver를 활용하면 예외가 발생했을 때 이런 복잡한 과정 없이 여기에서 문제를 깔끔하게 해결할 수 있다.

//빈 ModelAndView를 준다는게 어떤 의미인지 정확히 몰랐는데, 우선에 비어있는 ModelAndView를 DispatcherServlet에 전달하고, 이후 View에서 render(model)을 호출한다. 그래서 아마 정상적인 과정을 진행하기 위해 비어있는 ModelAndView를 보내는 것 같다.

## ExceptionResolver

예외를 처리하는 Resolver가 따로 존재하는데,

HandlerExceptionResolverComposite에 다음 순서대로 등록된다.

1순위 → ExceptionHandlerExceptionResolver

2순위 → ResponseStatusExceptionResolver

3순위 → DefaultHandlerExceptionResolver

순서대로 실행된다.

ExceptionHandlerExceptionResolver

@ExceptionHandler를 처리한다. API 예외처리는 대부분 이 기능으로 해결한다.

ResponseStatusExceptionResolver

HTTP 상태코드를 지정해준다.

ex) ResponseStatus(value = HttpStatus.NOT_FOUND)

DefaultHandlerExceptionResolver

스프링 내부 기본 예외를 처리한다.

### ResponseStatusExceptionResolver

@ResponseStatus가 달려있는 예외

ResponseStatusException 예외

```java
@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "잘못된 요청 오류")
public class BadRequestException extends RuntimeException{
}
```

위와 같은 에러를 작성해둔다.

```java
@GetMapping("/api/response-status-ex1")
public String responseStatusEx1(){
    throw new BadRequestException();
}
```

이후 요청을 하면 아래처럼 깔끔하게 JSON으로 오류가 떨어진다.

![Untitled 4](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/1f4793e2-b7a6-41ee-84d9-932438676fe9)

```java
protected ModelAndView applyStatusAndReason(int statusCode, @Nullable String reason, HttpServletResponse response)
      throws IOException {

   if (!StringUtils.hasLength(reason)) {
      response.sendError(statusCode);
   }
   else {
      String resolvedReason = (this.messageSource != null ?
            this.messageSource.getMessage(reason, null, reason, LocaleContextHolder.getLocale()) :
            reason);
      response.sendError(statusCode, resolvedReason);
   }
   return new ModelAndView();
}
```

끝까지 타고 들어가보면 별거 없다. 그냥 애너테이션에 넣은 데이터를 뽑아서 sendError를 넣어줄 뿐이다.

```java
@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "error.bad")
public class BadRequestException extends RuntimeException{
}
```

이 오류 방식 자체를 각 메서드에 넣지 않고, message로도 받을 수 있도록 제공한다.

```java
//messages.properties
error.bad=잘못된 요청 오류입니다. 메시지 사용
```

![Untitled 5](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/09f6a195-5830-49fe-aa4a-2e97662b0f75)

- 애노테이션 방식의 단점

@ResponseStatus는 개발자가 직접 변경할 수 없는 예외에는 적용할 수 없다.

내가 코드를 수정할 수 없는 라이브러리에서 발생하는 예외코드에는 적용할 수 없다는 소리이다.

추가로 애노테이션을 사용하기 때문에 조건에 따라 400,500을 처리해주는 것 즉, 동적으로 변경하는 것도 어렵다.

이때는 ResponseStatusException을 애노테이션이 아니라, 따로 터트리면 된다.

```java
 @GetMapping("/api/response-status-ex2")
    public String responseStatusEx2(){
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"error.bad",new IllegalArgumentException());
}
```

이런식으로 말이다.

### DefaultHandlerExceptionResolver

스프링 내부에서 발생하는 스프링 예외를 해결한다.

대표적으로 파라미터 바인딩 시점에 타입이 맞지않으면 내부에서 TypeMismatchException이 발생하는데, 이 경우 예외가 발생했기 때문에 그냥 두면 서블릿 컨테이너까지 올라가고, 결과적으로 500오류가 발생한다.

```java
@GetMapping("/api/default-handler-ex")
public String defaultException(@RequestParam Integer data){
    return "ok";
}
```

그런데 파라미터 바인딩은 대부분 클라이언트가 HTTP 요청 정보를 잘못 호출해서 발생하는 문제이다.

다행히 스프링에서는 이런 경우 HTTP 상태 코드는 400을 사용하도록 되어 있다.

DefaultHandlerExceptoinResolver는 이것을 500오류가 아니라 HTTP 상태코드 400 오류로 변경한다.

```java
protected ModelAndView handleTypeMismatch(TypeMismatchException ex,
			HttpServletRequest request, HttpServletResponse response, @Nullable Object handler) throws IOException {

		response.sendError(HttpServletResponse.SC_BAD_REQUEST);
		return new ModelAndView();
	}
```

스프링 내부 오류를 어떻게 처리할지 수 많은 내용이 정의되어 있다.

위의 두 경우를 알아보았는데,

HandlerExceptionResolver 자체가 직접 사용하기에는 복잡하다.

response에 직접 데이터를 넣어야해서 불편하고 번거롭다.

ModelAndView를 반환한다는 점에서, API통신에도 잘 맞지 않는다.

스프링은 이 문제를 해결하기 위해 @ExceptionHandler라는 혁신적인 예외처리 기능을 제공한다.

### @ExceptionHandler

지금까지 살펴본 BasicErrorController는 400,500밖에 던져주지 못하고, HandlerExceptionResolver는 직접 구현하려니 굉장히 번거롭다.

ex) BasicErrorController의 예시

![Untitled 6](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/af34431c-13bf-434f-82ee-b5b0b3c109b9)

거의, 서블릿 시절로 돌아간 느낌이다..

만약 컨트롤러마다, 같은 RuntimeException예외가 발생한다면, 세부 사항은 다르게 오류를 보여줘야한다.

이럴때, RuntimeException 로직에 if (상품컨트롤러){}, if(주문컨트롤러){} 이런식으로 코드를 짜고 있으면 굉장히 지저분해진다.

이런 문제를 해결하기 위해 사용하는게 ExceptionHandler이다.

`실무에서 API 예외처리는 대부분 이 기능을 사용한다.`

```java
@Slf4j
public class ApiExceptionV2Controller {
    @ExceptionHandler(IllegalArgumentException.class)
    public ErrorResult illegalExHandler(IllegalArgumentException e){
        log.error("[exceptionHandler] ex", e);
        return new ErrorResult("BAD", e.getMessage());
    }
}
```

Controller에 ExceptionHandler가 있는지 찾아본다.

컨트롤러에 있다고해서 컨트롤러에서 실행 되는건 아니고, 오류가 발생하면 DispatcherServlet까지 올라가서, ExceptionResolver를 찾아본다. 여기서 @ExceptoinHandler가 Controller에 있는지 확인한다.

그런데 이때, ErrorResult는 예외로서 오류로 작동해야 함에도 불구하고, 200 OK를 내려준다.

이걸 수정하기 위해서는 @ResponseStatus를 붙여서 바꿔주면 된다.

```java
@ResponseStatus(HttpStatus.BAD_REQUEST)
@ExceptionHandler(IllegalArgumentException.class)
public ErrorResult illegalExHandler(IllegalArgumentException e){
    log.error("[exceptionHandler] ex", e);
    return new ErrorResult("BAD", e.getMessage());
}
```

이렇게하면, 오류코드는 있지만 정상흐름으로 인식되고 다시 서블릿 컨테이너로 올라가지 않는다. 

afterCompletion과 View나 JSON형태로 정상 처리가 되고, WAS로도 정상응답이 나가게 된다.

@ExceptionHandler는 Controller 안에서만 적용된다.

그리고 메서드의 파라미터로 넣은 클래스의 자식까지 예외를 잡아준다.

즉

```java
@Slf4j
public class ApiExceptionV2Controller {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    public ErrorResult illegalExHandler(IllegalArgumentException e){
        log.error("[exceptionHandler] ex", e);
        return new ErrorResult("BAD", e.getMessage());
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResult> userExHandler(UserException e){
        log.error("[exceptionHandler] ex", e);
        ErrorResult errorResult = new ErrorResult("USER-EX", e.getMessage());
        return new ResponseEntity(errorResult, HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler
    public ErrorResult exHandler(Exception e){
        log.error("[exceptionHandler] ex",e);
        return new ErrorResult("EX","내부 오류");
    }

    @GetMapping("/api2/members/{id}")
    public MemberDto getMember(@PathVariable("id") String id){
        if(id.equals("ex")){
            throw new RuntimeException("잘못된 사용자");
        }
        if(id.equals("bad")){
            throw new IllegalArgumentException("잘못된 입력 값");
        }
        if(id.equals("user-ex")){
            throw new UserException("사용자 오류");
        }
        return new MemberDto(id, "hello " + id);
    }
}
```

즉, 코드를 이렇게 넣게되면, V2Controller안에서만 오류를 잡으며, IllegalArgumentException이 아니고, UserException도 아니면 조상인 Exception에서 모두 잡아준다.

- 우선순위

```java
@ExceptionHandler(부모예외.class)
public String 부모예외처리()(부모예외 e) {}

@ExceptionHandlere(자식예외.class)
public String 자식예외처리()(자식예외 e) {}

```

자식 예외 하나로 모든 예외를 처리할 수 있지만, 같이 있으면 자식 예외가 먼저 처리된다는 사실만 알고 있으면 된다.

- 여러 Exception을 한번에 받을 수도 있다.

```java
@ExceptionHandler({AException.class, BException.class})
public String ex(Exception e){
    log.info("exception e",e);
}
```

- 예외 생략

class를 생략하면, 메서드 파라미터에 있는 예외가 자동으로 지정된다.

```java
@ExceptionHandler
public ResponseEntity<ErrorResult> userExHandle(UserException e) {}
```

- HTML 오류 화면

```java
@ExceptionHandler(ViewException.class)
public ModelAndView ex(ViewException e){
    log.info("exceptoin e", e);
    return new ModelAndView("error");
}
```

## @ControllerAdvice

@ExceptionHandler를 사용해서 예외를 깔끔하게 처리할 수 있게 되었지만, 정상 코드와 예외 처리 코드가 하나의 컨트롤러에 섞여있다.

@ControllerAdvice 또는 @RestControllerAdvice를 사용하면 둘을 분리할 수 있다.

마치 AOP로 컨트롤러를 제어하는것처럼, 대상으로 지정한 여러 컨트롤러에 @ExceptionHandler, @InitBinder 기능을 부여해주는 역할을 한다.

@ControllerAdvice에 대상을 지정하지 않으면 모든 컨트롤러에 적용된다 (글로벌)

@RestControllerAdvices는  @RestController와 차이가 같다.

```java
@ControllerAdvice(annotation = RestController.class) // @RestController이 붙은 컨트롤러
public class ExampleAdvice1 {}

@ControllerAdvice("org.example.controllers") //하위 패키지 모두 적용
public class ExampleAdvice2 {}
// 이 방식으로 상품이 관련된 컨트롤러가 있는곳, 주문이 관련된 컨트롤러가 있는곳을 나눌 수 있다.

@ControllerAdvice(assignableTypes = {ControllerInterface.class, AbstractController.class}) // 부모 컨트롤러나, 특정 컨트롤러를 지정하는 방법
public class ExampleAdvice3 {}
```

이 때, 패키지 지정의 경우 해당 패키지와 그 하위에 있는 컨트롤러가 대상이 된다.

`컨트롤러를 패키지로 나눠야 하는 이유가 이거였구나.`

API 예외처리를 패키지 단위로 몰아서 처리하기 위함..

option으로 주려면, basePackage = “org.example.controllers”를 입력하면 된다.

```java
@Slf4j
@RestController
public class ApiExceptionV2Controller {

    @GetMapping("/api2/members/{id}")
    public MemberDto getMember(@PathVariable("id") String id){
        if(id.equals("ex")){
            throw new RuntimeException("잘못된 사용자");
        }
        if(id.equals("bad")){
            throw new IllegalArgumentException("잘못된 입력 값");
        }
        if(id.equals("user-ex")){
            throw new UserException("사용자 오류");
        }
        return new MemberDto(id, "hello " + id);
    }

    @Data
    @AllArgsConstructor
    static class MemberDto{
        private String memberId;
        private String name;
    }
}

```

```java
@Slf4j
@RestControllerAdvice(basePackages = "hello.exception.api")
public class ExControllerAdvice {

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler
    public ErrorResult exHandler(Exception e){
        log.error("[exceptionHandler] ex",e);
        return new ErrorResult("EX","내부 오류");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    public ErrorResult illegalExHandler(IllegalArgumentException e){
        log.error("[exceptionHandler] ex", e);
        return new ErrorResult("BAD", e.getMessage());
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResult> userExHandler(UserException e){
        log.error("[exceptionHandler] ex", e);
        ErrorResult errorResult = new ErrorResult("USER-EX", e.getMessage());
	        return new ResponseEntity(errorResult, HttpStatus.BAD_REQUEST);
    }

}

```

이렇게 컨트롤러와 예외를 따로 분리할 수 있다.
