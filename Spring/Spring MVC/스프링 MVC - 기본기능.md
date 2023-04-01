### War와 Jar의 차이

JSP를 쓰거나, 따로 빌드된 웹 어플리케이션을 사용할꺼면 War를 사용해라.

Jar를 사용하면 항상 내장 톰캣을 사용하고 webapp 경로를 사용하지 않는다.

War 또한 내장 서버도 가능하다. 하지만 주로 외부서버에 배포하는 목적으로 사용된다.

스프링 부트에 “Jar”를 사용하면 ‘/resources/static/index.html’ 위치에 index.html을 두면 Welcome페이지로 처리해 준다.

### 로깅 간단히 알아보기

로그 라이브러리는 Logback, Log4J, Log4J2 등 수많은 라이브러리가 있다.

이것을 통합해서 인터페이스로 제공하는 것이 바로 SLF4J 라이브러리이다.

쉽게 이야기해서 SLF4J는 인터페이스이고, 그 구현체로 Logback 같은 로그 라이브러리를 선택하면 된다.

```java
log.trace("trace = {}",name); // level 1
log.debug("debug = {}",name); // level 2
log.info("info = {}",name); //level 3
log.warn("warn log = {}", name); //level 4
log.error("error log = {}", name); //level 5
```

로그의 레벨을 설정해서 보고 싶은 레벨을 볼수 있다.

### 로그 레벨 설정법

```java
//전체 로그 레벨 설정
logging.level.root = info
logging.level.hello.springmvc = trace
```

[application.properties](http://application.properties)에 로 레벨을 설정 할 수 있다.

로컬서버에서는 trace

개발서버에서는 debug

운영서버에서는 info

print는 운영서버에서도 계속 사용되기 때문에, 시스템에 큰 부하가 된다.

### 로그 선언 방법

```java
private Logger log = LoggerFactory.getLogger(getClass());

private static final Logger log = LoggerFactory.getLogger(Xxx.class)

@Slf4j // 롬복을 사용 할 수도 있다.
```

### 로그 호출

```java
1. log.info("info log = {}", name)
2. log.info("info log = " + name)
```

2번 방식으로 사용하면 안된다.

이유 :

만약에 log.trace(”info log = “ + name)을 사용했다면

자바언어의 특성상 name 이라는 변수를 “info log = “와 합치는 연산을 진행하고 저장을 해서 가지고 있는다.

하지만 우리는 info를 사용할것이라, trace는 사용하지도 않는다. 그럼에도 불구하고 연산이 진행되서 결국에는 낭비가 되기 때문에 2번 처럼 사용하면 안되는 것이다.

1번 같은 경우는 파라미터만 넘기고 아무 연산을 하지 않고 중단된다.

하지만 2번 같은 경우는 연산을 실행한 후에 문자열을 저장하고 메서드를 호출하지만, 어차피 쓰지 않음으로 낭비되는 것이다.

`// 여전히 해소 되지 않는 질문`

파라미터를 넘기는것도 연산이라고 생각하는데 내부에서는 어떻게 처리 되는지 

실무 에서는 항상 로그를 사용해야 한다.

### 매핑정보

@RestController는 반환값으로 뷰를 찾는것이 아니라, HTTP 메시지 바디에 바로 입력한다.

### 로그 사용시 장점

쓰레드 정보, 클래스 이름 같은 부가 정보를 함께 볼 수 있고, 출력 모양을 조정 할 수 있다.

시스템 아웃 콘솔에만 출력하는 것이 아니라,

파일이나 네트워크 등, 로그를 별도의 위치에 남길 수 있다.

특히 파일로 남길 때는 일별, 특정 용량에 따라 로그를 분할 하는 것도 가능하다.

성능도 일반 sout보다 좋다. (내부 버퍼링, 멀티 쓰레드 등등) 그래서 실무에서는 꼭 로그를 사용해야 한다.

### @RestController

원래 Controller는 반환값이 String이면 뷰 이름으로 인식된다.

그래서 뷰를 찾고 뷰가 랜더링된다.

반면에 @RestController는 HTTP메시지 바디 부분에 입력한다.

### 주의 할 점

“/hello-basic” 과 “/hello-basic/”은 원래는 다른 URL이다.

하지만 스프링은 같은 요청으로 매핑한다ㅏ.

### @PathVariable

PathVariable은 말그대로 `URI Path에 있는 내용을 Variable화 해서 가져오는 애노테이션`이다.

```java
@GetMapping("/hello/{userId}")
public String mappingMethod(@PathVariable("userId") String data){
    log.info("log.info = {}",data);
    return "ok";
}
```

@PathVariable의 이름과 파라미터 이름이 같으면 생략할 수 있다.

```java
@GetMapping("/hello/{userId}")
    public String mappingMethod(@PathVariable String userId){
    log.info("log.info = {}",userId);
    return "ok";
}
```

최근 HTTP API는 리소스 경로에 식별자를 넣는 스타일을 선호한다.

PathVariable을 다중으로 사용하면 어떻게 될까?

```java
@GetMapping("/hello/users/{userId}/orders/{orderId}")
    public String mappingMethod(@PathVariable String userId, @PathVariable String order
d){
    log.info("log.info = {} {}",userId,orderId);
    return "ok";
}
```

파라미터 순서대로 매핑이 된다.

### 옵션 params는 뭐지?

```java
@GetMapping(value = "/hello/users/{userId}/orders/{orderId}", params = "mode=debug")
public String mappingMethod(@PathVariable String userId, @PathVariable String orderId){
    log.info("log.info = {} {}",userId,orderId);
    return "ok";
}
```

params 옵션은 URI 주소 위에 지정한 옵션 파라미터가 달려있지 않으면 그 메서드는 호출되지 않는다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/43936692-52d9-46a0-b72e-0ce31b95e263/Untitled.png)

마치 비밀번호를 거는 것과 비슷한 느낌이다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ae3845a0-ad5e-4b84-84f3-6a6db04f1bbd/Untitled.png)

- 종류

params = “mode”

params = “!mode”

이런식으로 걸 수 있는데, 나중에 찾아서 하자.

### 옵션 headers는 뭐지?

```java
@GetMapping(value = "/hello/users/{userId}/orders/{orderId}", headers = "mode=hi")
public String mappingMethod(@PathVariable String userId, @PathVariable String orderId){
    log.info("log.info = {} {}",userId,orderId);
    return "ok";
}
```

말 그대로 헤더에 mode, hi를 넣어줘야만 메서드가 작동한다.

### 미디어 타입 조건 매핑 (설명이 부족함)

- 옵션 Consumes

```java
@PostMapping(value = "/hello/consume", consumes = "application/json")
public String mappingConsumes(){
    log.info("mappingConsumes");
    return "ok";
}
```

우선에 이런게 있다 정도만 알고 넘어가자.

HTTP 요청의 Content-Type 헤더를 기반으로 미디어 타입으로 매핑한다.

만약 맞지 않으면 HTTP 415 상태코드 (Unssuported Media Type)을 반환함.

- 옵션 produces

```java
@PostMapping(value = "/hello/produce", produces = "text/html")
public String mappingProduces(){
    log.info("mappingConsumes");
    return "ok";
}
```

produces는 Accept 헤더에 해당해야만 메서드를 실행한다.

이때, “text/html”을 직접 쳐서 넣기보다 MediaType.TEXT_HTML_VALUE 와 같이 미리 정의되어있는 상수를 사용하는것이 좋다.

```java
@Slf4j
@RestController
public class RequestHeaderController {

    @RequestMapping("/headers")
    public String headers(HttpServletRequest request,
                          HttpServletResponse response,
                          HttpMethod httpMethod,
                          Locale locale,
                          @RequestHeader MultiValueMap<String,String> headerMap,
                          @RequestHeader("host") String host,
                          @CookieValue(value = "myCookie", required = false) String cookie){

        log.info("request={}", request);
        log.info("response={}", response);
        log.info("httpMethod={}", httpMethod);
        log.info("locale={}", locale);
        log.info("headerMap={}", headerMap);
        log.info("header host={}", host);
        log.info("myCookie={}", cookie);

        return "ok";
    }
}
```

각 메서드들을 객체로서 받아올 수 있다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2bd2f0f2-dacf-4330-b96c-e5986780ac5e/Untitled.png)

### MultiValueMap은 뭐지?

Map과 비슷하다. 하지만 하나의 키에 여러 값을 받을 수 있다는 차이가 있다.

HTTP Header, HTTP 쿼리 파라미터와 같이 하나의 키에 여러 값을 받을 때 사용한다.

ex) keyA=value1&keyA=value2

```java
MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
map.add("keyA", "value1");
map.add("keyA", "value2");

List<String> values = map.get("keyA");
```

이렇게 map.get(”keyA”)를 하면 해당 하는 값에 대한 배열이 반환된다.

## 클라이언트에서 서버로 요청을 보내는 방법

1. 쿼리 파라미터 - GET

ex) hello-spring/userId=3&age=17

1. HTML Form - POST

메시지 바디에 쿼리 파라미터 형식으로 전닳한다.

1. HTTP Message body에 데이터를 직접 담아서 요청

```java
@RequestMapping("/request-param-v1")
public void requestParamV1(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String username = request.getParameter("username");
    int age = Integer.parseInt(request.getParameter("age"));
    log.info("username = {}, age = {}",username, age);
    response.getWriter().write("ok");
} // 가장 기본적인 형태이다.

@ResponseBody
@RequestMapping("request-param-v2")
public String requestParamV2(@RequestParam("username") String memberName,
                             @RequestParam("age") int age){
    log.info("username={} , age={}",memberName, age);
    return "ok";
}

@ResponseBody
@RequestMapping("request-param-v3")
public String requestParamV3(@RequestParam String username,
                             @RequestParam int age){
    log.info("username={} , age={}", username, age);
    return "ok";
} // RequestParam의 변수명이 같으면 @RequestParam("내용")) "내용" 생략 가능

@ResponseBody
@RequestMapping("request-param-v4")
public String requestParamV4(String username, int age){
    log.info("username={} , age={}", username, age);
    return "ok";
} // String, int 등의 단순 타입이면 @RequestParam도 생략이 가능하다.
```

애노테이션을 완전히 생략해도 상관없기는 하지만, 너무 없는것도 이해하기가 난해하다.

@RequestParam이 있으면 명확하게 요청 파라미터에서 데이터를 읽는 다는 것을 알 수 있다.

### 필수 파라미터도 설정할 수 있다.

```java
@ResponseBody
@RequestMapping("request-param-v4")
public String requestParamRequired(
        @RequestParam(required = false) String username,
        @RequestParam(required = true) int age){

log.info("username={} , age={}", username, age);
    return "ok";
}
```

기본 값이 필수이다.

기본형 타입(ex) int)에는 null을 넣을 수 없다는점 알고 있어야한다.

null을 받을 수 있는 Integer로 변경하거나 defaultValue를 사용해야한다.

### 필수 파라미터인데 안 넣으면 defaultValue가 출력된다.

```java
@ResponseBody
@RequestMapping("request-param-v4")
public String requestParamRequired(
        @RequestParam(required = false, defaultValue = "guest") String username,
        @RequestParam(required = true, defaultValue = "-1") int age){

log.info("username={} , age={}", username, age);
    return "ok";
}
```

### 파라미터에 Map도 사용할 수 있다.

```java
@ResponseBody
@RequestMapping("request-param-map")
public String requestParamMap(
        @RequestParam Map<String, Object> paramMap){
log.info("username={} , age={}", paramMap.get("username"), paramMap.get("age"));
    return "ok";
}
```

하지만 중복될 수 있으므로, 값이 1개가 확실하다면 “Map”을 사용해도 되지만, 그렇지 않다면 MultiValueMap을 사용하자.

### @ModelAttribute

실제 개발을 하면 요청파라미터를 받아서 필요한 객체를 만들고 그 객체에 값을 넣어 주어야 한다.

```java
@RequestParam String username;
@RequestParam int age;

HelloData data = new HelloData();

data.setUsername(username);
data.setAge(age)
```

이 과정을 완전히 자동화 하는데 사용한다.

```java
@ResponseBody
@RequestMapping("model-attribute-v1")
public String modelAttributeV1(@RequestParam String username,
                               @RequestParam int age){
    HelloData helloData = new HelloData();
    helloData.setUsername(username);
    helloData.setAge(age);

    log.info("username={} , age={}", username, age);
    return "ok";
}
```

```java
@ResponseBody
@RequestMapping("model-attribute-v1")
public String modelAttributeV1(@ModelAttribute HelloData helloData){
    log.info("username={} , age={}", helloData.getUsername(),helloData.getAge());
    log.info("helloData= {}",helloData); // toString()이 @Data에 포함되어 있어서 가능하다.
    return "ok";
}
```

진짜 HelloData객체를 생성한 뒤에 그 안의 데이터 값에 파라미터값들을 매핑 해준다.

SpringMVC에서 @ModelAttribute가 있으면 이렇게 실행한다.

1. HelloData 객체를 생성한다.
2. 요청 파라미터의 이름으로 HelloData 객체의 프로퍼티를 찾는다.

그리고 해당 프로퍼티의 setter를 호출해서 파라미터의 값을 입력(바인딩)한다.

### 프로퍼티(Property)란?

객체에 getUsername(), setUsername() 메서드가 있으면, 이 객체는 username 이라는 프로퍼티를 가지고 있다고 한다.

username 프로퍼티의 값을 변경하면 setUsername()이 호출되고, 조회하면 getUsername()이 호출된다.

ex) setXXX → XXX(프로퍼티) , getXXX → XXX(프로퍼티)

### @ModelAttribute에 만약 틀린 값이 들어가면 어떻게 되지?

BindExceptoin오류가 난다.

### @ModelAttribute의 생략

@ModelAttribute는 생략할 수 도 있다.

그런데 @RequestParam도 생략할 수 있어서 혼란이 발생한다.

스프링에서 정해놓은 규칙이 있다.

1. String, int, Integer 같은 단순 타입은 @RequestParam을 사용한다.
2. 나머지는 모두 @ModelAttribute를 사용한다. (Argument Resolver로 지정해둔 타입 외)

### 질문할점

1. RestController란 무엇인가?

이 클래스 내에 있는 모든 메서드들에 ResponseBody를 붙이겠다는 의미이다.

2. ResponseBody란 무엇인가?

응답객체인 HttpResponseBody에 바로 값을 넣는것이다.

3. RequestMapping이란 무엇인가?

RequestURI와 Controller를 Mapping하기 때문에 RequestMapping(Controller)라고 한다.

이전에 paramMap을 활용해서 URI와 Controller를 매핑하던 방식이 있었다.

RequestMapping은 애노테이션을 활용해 paramMap에 URI와 Controller 매핑하는 방식이다.

과거에는 Controller를 매핑 했지만, 유연성이 높아져 URI와 Method를 매핑한다.

4. RequestParam이란 무엇인가?

데이터를 보낸다는 점에서 PathVariable과 같다.

RequestURI로 들어온 쿼리파라미터를 캐치해서 변수로 담는 역할을 한다.

5. PathVariable은 무엇인가?

RequestURI로 들어온 쿼리 파라미터를 캐치하여 변수로 담는 역할을 한다.

6. PathVariable과 RequestParam의 차이는 무엇인가?

PathVariable은 {변수이름}을 표시해줘야한다. 그리고 defaultValue를 설정할 수 없다.

RequestParam은 defaultValue를 설정할 수 있다. 그게 끝이다.

즉, 필수이고 변수이름을 Path에 표시해서 보고 싶으면 PathVariable을 쓰면 되고

파라미터 값을 받아와서 없다면 기본값을 설정해야한다면, RequestParam을 쓰면된다.

7. Controller와 RequestMapping의 차이는 무엇인가?

컨트롤러는 컴포넌트 스캔의 대상이 될 뿐이다. 즉, 하나의 빈이 될 뿐인 것이다.

앞에서 배운것과 달리 조금 더 디테일하게 들어가면서 RequestMapping은 핸들러가 아니라, HandlerMethod를 매핑하게 된다.

RequestMapping은 주소와 핸들러 메서드를 매핑하는 작업이다.

```java
@Override
protected boolean supportsInternal(HandlerMethod handlerMethod) {
	  return true;
}

@Override
protected ModelAndView handleInternal(HttpServletRequest request,
		HttpServletResponse response, HandlerMethod handlerMethod) throws Exception {

    ModelAndView mav;
    checkRequest(request);
    
    ....

    return mav;
}
```

8. RequestMapping과 RequestParam의 차이는 무엇인가?

RequestMapping은 URI와 HandlerMethod를 Map에 매핑하는것이다.

RequestParam은 URI Path에 있는 Param을 가져와서 변수에 넣는것이다.
