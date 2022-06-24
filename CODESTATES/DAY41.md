# DAY41,42

Spring MVC [API 계층]

## 학습 목표

Spring MVC가 무엇인지 말로 설명할 수 있다.

Spring MVC의 동작방식과 구성요소를 이해할 수 있다.

API엔드 포인트인 Controller의 구성요소를 이해할 수 있다.

실제 동작하는 Controller의 기본 기능을 구현할 수 있다.

DTO가 무엇인지 이해할 수 있다.

DTO Validation이 무엇인지 이해할 수 있다.

Controller에 DTO클래스를 적용할 수 있다.

### Spring MVC란?

Spring의 모듈중 웹 계층을 담당하는 몇가지 모듈이 있는데, 특히 Servlet API를 기반으로 클라이언트의 요청을 처리하는 모듈이 “spring-webmvc”이다.

Spring Web MVC를 줄여서 Spring MVC라고 부른다.

### 서블릿(Servlet)이란?

클라이언트의 요청을 처리하도록 특정 규약에 맞추어서 Java코드로 작성하는 클래스 파일.

아파치 톰캣은 서블릿들이 웹 애플리케이션으로 실행이 되도록 해주는 서블릿 컨테이너중 하나다.

### Model이란?

웹 애플리케이션이 클라이언트의 요청을 전달 받으면 요청 사항을 처리하기 위한 작업을 한다.

처리한 작업의 결과 데이터를 클라이언트에게 응답으로 돌려줘야하는데, 이때 클라이언트에게 응답으로 돌려주는 작업의 처리 결과 데이터를 Model이라고 한다.

클라이언트의 요청 사항을 구체적으로 처리하는 영역을 서비스 계층(Service Layer)라고하며, 실제로 요청사항을 처리하기 위해 Java코드로 구현한것을 비즈니스 로직 (Business Logic)이라고 한다.

### View란?

위의 Model 데이터를 이용해서 웹브라우저와 같은 클라이언트 애플리케이션 화면에 보여지는 Resource를 제공하는 역할을 한다.

1. HTML 페이지의 출력

Thymeleaf,FreeMarker,JSP+JSTL,Tiles가 있다.

2. PDF, Excel등의 문서 형태로 출력

Model 데이터를 가공해서 PDF나 Excel문서를 만들어서 클라이언트 측에 전송하는 방식

3. XML,JSON등 특정 형식의 포맷으로의 변환

Model 데이터를 특정 프로토콜 형태로 변환해서 변환된 데이터를 클라이언트 측에 전송하는 방식

### Controller란?

클라이언트 측의 요청을 직접적으로 전달 받는 EndPoint로써 Model과 View의 중간에서 상호작용을 해주는 역할을 한다.

클라이언트 측의 요청을 받아서 비즈니스 로직을 거친 후에 Model데이터가 만들어지면 , 이 Model데이터를 View로 전달하는 역할을 한다.

### MVC의 처리흐름

Client가 요청 데이터 전송 → Controller가 요청 데이터 수신 → 비즈니스 로직 처리 → Model 데이터 생성 → Controller에게 Model 데이터 전달 → Controller가 View에게 Model 데이터 전달 → View가 응답 데이터 생성

![Untitled](https://user-images.githubusercontent.com/70310271/175284012-40035b83-e44c-40c6-a64d-decd7401f810.png)


1. 클라이언트가 요청을 전송하면 DisptacherServlet이라는 클래스에 요청 전달
2. DispatcherServlet은 클라이언트의 요청을 처리할 Controller에 대한 검색을 HandlerMapping 인터페이스에 요청.
3. HandlerMapping은 클라이언트 요청과 매핑되는 Controller정보를 다시 DispatcherServelt에게 리턴

Controller정보에는 해당 Controller안에 있는 Handler메서드 정보를 포함하고 있다.

Handler메서드는 Controller 클래스안에 구현된 요청 처리 메서드를 의미한다.

4. 요청을 처리할 Controller클래스를 찾았으니 이제는 실제로 클라이언트 요청을 처리할 Handler메서드를 찾아서 호출한다.

DisPatcherVervlet은 Handler메서드를 직접 호출하지 않고, HandlerAdapter에게 Handler 메서드 호출을 위임한다.

5. HandlerAdapter는 DispatcherServlet으로부터 전달 받은 Controller정보를 기반으로 해당 Controller의 Handler 메서드를 호출한다.
6. Controller의 Handler 메서드는 비즈니스 로직처리후 리턴받은 Model 데이터를 HandlerAdapter에게 전달한다.
7. HandlerAdapter는 전달 받은 Model데이터와 VIew정보를 다시 DispatcherServlet에게 전달한다.
8. DispatcherServlet은 전달받은 View정보를 다시 ViewResolver에게 전달해서 View검색을 요청한다.
9. ViewResolver는 View정보에 해당하는 View를 찾아서 View를 다시 리턴해준다.
10. DispatcherServlet은 ViewResolver로부터 전달받은 View 객체를통해 Model데이터를 넘겨주면서 클라이언트에게 전달할 응답 데이터를 생성을 요청한다.
11. View는 응답 데이터를 생성해서 다시 DispatcherServlet에게 전달한다.
12. DiscpatcherServlet은 View로 부터 전달받은 응답데이터를 최종적으로 클라이언트에게 전달한다.

DispatcherServlet이 애플리케이션의 가장 앞단에 배치되어 다른 구성요소들과 상호작용하면서 클라이언트의 요청을 처리하는 패턴은 Front Controller Pattern이라고한다.

### Java패키지 구조를 어떻게 잡으면 좋을까?

### 기능 기반 패키지 구조(package-by-feature)

애플리케이션의 패키지를 애플리케이션에서 구현해야하는 기능을 기준으로 패키지를 구성하는것

하나의 기능을 완성하기 위한 계층별 (API계층, 서비스 계층, 데이터 엑세스 계층)클래스들이 모여있다.

![Untitled 1](https://user-images.githubusercontent.com/70310271/175284019-19d96226-6d30-4df5-bd85-129ccd73422f.png)

### 계층 기반 패키지 구조(package-by-layer)

패키지를 하나의 계층으로보고 클래스들을 계층별로 묶어서 관리하는 구조

![Untitled 2](https://user-images.githubusercontent.com/70310271/175284037-8ce34bb3-a158-433e-a27a-f0b507c3a71f.png)

Controller, DTO패키지는 API계층,

Model,Service패키지는 비즈니스 계층.

Repository는 데이터 액세스 계층.

`테스트와 리팩토링이 용이하고 향후에 마이크로 서비스 시스템으로 분리가 상대적으로 용이한 기반 패키지 구조 사용을 권장한다.`

![Untitled 3](https://user-images.githubusercontent.com/70310271/175284044-10531c41-716f-42ab-82ff-cfe76d72092f.png)

### @SpringBootApplication의 역할

1. 자동 구성을 활성화
2. 애플리케이션 패키지네에서 @Component가 붙은 클래스를 검색한 후, Spring Bean으로 등록하는 기능을 활성화한다.
3. @Configuration이 붙은 클래스를 자동으로 찾아주고 추가적으로 Spring Bean을 등록하는 기능을 활성화 한다.

### SpringApplication.run(Section3Week1Application.class,args)의 역할

Spring 애플리케이션을 부트스트랩하고 실행하는 역할을 한다.

### BootStrap이란?

애플리케이션이 실행되기전 여러가지 설정 작업을 수행하여 실행 가능한 애플리케이션으로 만드는 단계를 의미

![Untitled 4](https://user-images.githubusercontent.com/70310271/175284057-fb799c7b-9ffd-45e1-80fc-7e9cf69d5e70.png)

### @RestController의 역할

Spring MVC에서는 특정 클래스에 @RestController를 추가하면 해당 클래스가 REST API 리소스를 처리하기 위한 API 엔드포인트로 동작함을 정의한다.

@RestController가 추가된 클래스는 애플리케이션 로딩 시 , Spring Bean으로 등록해준다.

### @RequestMapping

클라이언트의 요청과 클라이언트 요청을 처리하는 핸들러 메서드(Handler Method)를 매핑해주는 역할을 한다.

Controller 클래스 레벨에 ㅊ추가하여 클래스 전체에 사용되는 공통 URL(Base URL 설정을 한다)

![Untitled 5](https://user-images.githubusercontent.com/70310271/175284069-16ed7096-adf9-4005-a15e-785c8bf59381.png)

### @RequestMapping

produces 애트리뷰트는 응답 데이터를 어떤 미디어 타입으로 클라이언트에게 전송할지를 설정한다.

JSON 형식의 데이터를 응답데이터로 전송하겠다는 의미로 MediaType.Application_json_value 값을 설정했다.

### @PostMember

클라이언트의 요청 데이터를 서버에 생성할 때 사용하는 애너테이션

### @RequestParam

핸들러 메서드 파라미터의 한 종류로

주로 클라이언트 쪽에서 전송하는 요청 데이터를 쿼리 파라미터 또는 폼데이터 ,x-www-form-urlencoded 형식으로 전송하면 이를 서버쪽에서 전달받을때 사용하는 애너테이션

### Return값

json형식의 데이터를 전송받아야하기 때문에 json형식에 맞게 작성하였음.

![Untitled 6](https://user-images.githubusercontent.com/70310271/175284087-0bb4a710-49fe-4a23-b4b7-cfb9fbed9225.png)

### @GetMapping

클라이언트가 서버에 리소스를 조회할때 사용하는 애너테이션

### @PathVariable

핸들러 메서드의 파라미터 종류중 하나

member-id에 딱 맞게 들어간다.

![Untitled 7](https://user-images.githubusercontent.com/70310271/175284103-305edeff-daeb-4269-8d84-621941ab713e.png)

@GetMapping에 별도의 URI를 지정해주지 않았기 때문에 클래스 레벨의 URI(”/v1/members”)에 매핑된다.

## 실습

![Untitled 8](https://user-images.githubusercontent.com/70310271/175284114-c4cff500-af57-47e1-a2b7-56dd2beb7604.png)

이해하지 못했다가 이해한점들.

Q1. 왜 @RequestParam이 아닌 @PathVariable을 써야만 하는가?

@PostMapping의 인자는 @PathVariable인자에 들어가 memberId에 저장된다.

![Untitled 9](https://user-images.githubusercontent.com/70310271/175284133-cda8e3d1-8be8-4e1f-9595-0b286506a190.png)

Postman으로 memberId에 1의 값을 넣을필요가 없다.


왜냐하면, PostMapping의 인자, 즉, 주소값으로 넣어준 값을 POST하겠다는 의미이기 때문이다.

RequestParam으로 받은 인자들(email,name,phone)은 완전히 별개로 작동한다.

```java
return new ResponseEntity<>(HttpStatus.OK)
// 처음에 map을 넣어주지 않았더니 계속 아무 값도 나오지않았다.
return new ResponseEntity<>(map,HttpStatus.OK)
// map을 넣어주어야만 값이 제대로 반환 되어져서 나온다.
```

### DTO란?

Data Transfer Object이다.

```xml

@RestController
@RequestMapping("/v1/members")
public class MemberController {
    @PostMapping
    public ResponseEntity postMember(@RequestParam("email") String email,
                                     @RequestParam("name") String name,
                                     @RequestParam("phone") String phone) {
        Map<String, String> map = new HashMap<>();
        map.put("email", email);
        map.put("name", name);
        map.put("phone", phone);

        return new ResponseEntity<Map>(map, HttpStatus.CREATED);
    }
```

```xml
@RestController
@RequestMapping("/v1/members")
public class MemberController {
    @PostMapping
    public ResponseEntity postMember(MemberDto memberDto) {
        return new ResponseEntity<MemberDto>(memberDto, HttpStatus.CREATED);
    }

		...
		...
}
```

코드가 간결해진다.

아직 비즈니스 로직은 없지만, Map이 사라지고 MemberDto객체를 클래스의 생성자 파라미터로 전달하도록 바뀌었다.

```java
public class MemberDto {
    @Email
    private String email;
    private String name;
    private String phone;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
```

DTO클래스는 이렇게 Getter,Setter로 이루어져있다.

### @RequestBody

JSON형식의 Request Body를 MemberPostDto 클래스의 객체로 변환시켜주는 역할을한다.

### @ResoponseBody

JSON형식의 Response Body를 클라이언트에게 전달하기 위해 DTO 클래스의 객체를 Response Body로 변환하는 역할을 한다.

Spring MVC에서는 핸들러메서드에 @ResponseBody애너테이션이 붙거나 핸들러메서드의 리턴값이 ResponseEntity일 경우, 내부적으로 HttpMessageConverter가 동작하게 되어 응답객체를 JSON형식으로 바꿔준다.

## DTO유효성 검증

프론트 쪽에서 유효성 검사를 진행했다고 하더라도 서버쪽에서 한번더 유효성검사를 진행해야한다.

프론트쪽에서 진행하는 유효성 검사는 사용자 편의성때문에 진행하는것이다.

@PathVariable이 추가된 변수에 유효성 검증이 정상적으로 수행되려면 @Validated 애너테이션을 반드시 붙여주어야한다.

![Untitled](https://user-images.githubusercontent.com/70310271/175541074-f99ceffe-5a28-4e46-a6ac-8e0d24f66609.png)

![Untitled 1](https://user-images.githubusercontent.com/70310271/175541100-985bfda3-c1b3-4104-8282-00b11e033435.png)

지금까지 DTO클래스의 유효성 검증을 위해서 사용한 애너테이션은 Jakarta Bean Validation이라는 유효성 검증을 위한 표준 스펙에서 지원하는 내장 애너테이션들이다.
