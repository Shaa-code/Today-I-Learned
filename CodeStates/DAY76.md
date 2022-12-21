## Spring WebFlux

Web Flux는 Spring MVC방식의 애플리케이션 보다 대량의 클라이언트 요청을 조금 더 효율적으로 처리할 수 있는 현대적인 애플리케이션 구현을 위한 기술이다.

- Spring WebFlux가 무엇인지 이해할 수 있다.
- Spring MVC와 Spring WebFlux를 비교 설명할 수 있다.
- Spring WebFlux의 Non-Blocking 요청 처리 결과를 샘플 코드를 통해 이해할 수 있다.

### Spring MVC와 Spring WebFlux의 차이

1. Spring WebFlux의 경우 Non-Blocking 통신을 지원하지만 Spring MVC의 경우 Non-Blocking이 아닌 Blocking 통신방식을 사용한다.
2. Spring WebFLux의 경우 Reactive Adapter를 사용해서 Reactor 뿐만아니라 RxJava등의 다른 리액티브 라이브러리를 사용할 수 있는 유연함을 제공하는 반면, Spring MVC의 경우 Servlet API의 스펙에 의존적이다.
3. Spring Security는 동일하게 사용하지만 Spring WebFLux는 서블릿 필터가 아닌 WebFilter를 사용해 리액티브 특성에 맞게 인증과 권한등의 보안을 적용한다.
4. Reactive Stack의 경우, 웹 계층에서는 Spring WebFlux를 사용하며 Servlet Stack의 경우, Spring MVC를 사용하낟.
5. Spring WebFlux의 경우 완전한 Non-Blocking 통신을 위해 리액티브 스택을 데이터 액세스 계층까지 확장한다.
    
    R2DBC(Reactive Relation Database Connectivity)는 관계형 데이터베이스에 Non-Blocking 통신을 적용하기 위한 표준사양이며 MYSQL,Orcale등의 데이터베이스 벤더에서는 R2DBC 사양에 맞는 드라이버를 구현해서 공급한다.
    
![Untitled](https://user-images.githubusercontent.com/70310271/184410635-bb9bab87-9774-4d0d-9d09-7f5ee27d0841.png)

```java
package com.codestates.coffee;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@Slf4j
@RestController
@RequestMapping("/v11/coffees")
public class SpringMvcMainCoffeeController {
    private final RestTemplate restTemplate;

    String uri = "http://localhost:7070/v11/coffees/1";

    public SpringMvcMainCoffeeController(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    @GetMapping("/{coffee-id}")
    public ResponseEntity getCoffee(@PathVariable("coffee-id") long coffeeId) {
        log.info("# call Spring MVC Main Controller: {}", LocalDateTime.now());
        
        // (1)  
        ResponseEntity<CoffeeResponseDto> response = restTemplate.getForEntity(uri, CoffeeResponseDto.class);
        return ResponseEntity.ok(response.getBody());
    }
}
```

Spring MVC 메인 애플리케이션 Controller

```java
package com.codestates.coffee;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Slf4j
@RestController
@RequestMapping("/v11/coffees")
public class SpringWebFluxMainCoffeeController {
    String uri = "http://localhost:5050/v11/coffees/1";

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{coffee-id}")
    public Mono<CoffeeResponseDto> getCoffee(@PathVariable("coffee-id") long coffeeId) throws InterruptedException {
        log.info("# call Spring WebFlux Main Controller: {}", LocalDateTime.now());

        // (1)
        return WebClient.create()
                .get()
                .uri(uri)
                .retrieve()
                .bodyToMono(CoffeeResponseDto.class);
    }
}
```

WebFlux 기반의 메인 애플리케이션 Controller

```java
package com.codestates.coffee;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v11/coffees")
public class SpringMvcOutboundCoffeeController {
    @GetMapping("/{coffee-id}")
    public ResponseEntity getCoffee(@PathVariable("coffee-id") long coffeeId) throws InterruptedException {
        CoffeeResponseDto responseDto = new CoffeeResponseDto(coffeeId, "카페라떼", "CafeLattee", 4000);

        // (1)
        Thread.sleep(5000);
        return ResponseEntity.ok(responseDto);
    }
}
```

Spring MVC 외부 애플리케이션 Controller

```
2022-07-27 14:17:16.707  INFO 17484 --- [           main] c.c.SpringMvcMainSampleApplication       : # 요청 시작 시간: 14:17:16.707955700

2022-07-27 14:17:16.833  INFO 17484 --- [nio-8080-exec-1] c.c.c.SpringMvcMainCoffeeController      : # call Spring MVC Main Controller: 2022-07-27T14:17:16.833451500  // (1-1) 첫 번째 요청
2022-07-27 14:17:21.984  INFO 17484 --- [           main] c.c.SpringMvcMainSampleApplication       : 14:17:21.984873800: coffee name: 카페라떼 // (1-2) 첫 번째 요청 처리 결과

2022-07-27 14:17:21.990  INFO 17484 --- [nio-8080-exec-2] c.c.c.SpringMvcMainCoffeeController      : # call Spring MVC Main Controller: 2022-07-27T14:17:21.990018700 // (2-1) 두 번째 요청
2022-07-27 14:17:26.999  INFO 17484 --- [           main] c.c.SpringMvcMainSampleApplication       : 14:17:26.999949600: coffee name: 카페라떼 // (2-2) 두 번째 요청 처리 결과

2022-07-27 14:17:27.003  INFO 17484 --- [nio-8080-exec-3] c.c.c.SpringMvcMainCoffeeController      : # call Spring MVC Main Controller: 2022-07-27T14:17:27.003373200
2022-07-27 14:17:32.010  INFO 17484 --- [           main] c.c.SpringMvcMainSampleApplication       : 14:17:32.010208600: coffee name: 카페라떼

2022-07-27 14:17:32.014  INFO 17484 --- [nio-8080-exec-4] c.c.c.SpringMvcMainCoffeeController      : # call Spring MVC Main Controller: 2022-07-27T14:17:32.014291900
2022-07-27 14:17:37.021  INFO 17484 --- [           main] c.c.SpringMvcMainSampleApplication       : 14:17:37.021770: coffee name: 카페라떼

2022-07-27 14:17:37.026  INFO 17484 --- [nio-8080-exec-5] c.c.c.SpringMvcMainCoffeeController      : # call Spring MVC Main Controller: 2022-07-27T14:17:37.026077900
2022-07-27 14:17:42.033  INFO 17484 --- [           main] c.c.SpringMvcMainSampleApplication       : 14:17:42.033187200: coffee name: 카페라떼
```

처리 결과 : 25초

```java
package com.codestates.coffee;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/v11/coffees")
public class SpringWebFluxOutboundCoffeeController {
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{coffee-id}")
    public Mono<CoffeeResponseDto> getCoffee(@PathVariable("coffee-id") long coffeeId) throws InterruptedException {
        CoffeeResponseDto responseDto = new CoffeeResponseDto(coffeeId, "카페라떼", "CafeLattee", 4000);

        // (1)
        Thread.sleep(5000);
        return Mono.just(responseDto);   // (2)
    }
}
```

Spring WebFlux 기반의 외부 애플리케이션 Controller

```
2022-07-27 15:09:20.022  INFO 20160 --- [           main] c.c.SpringWebFluxMainSampleApplication   : # 요청 시작 시간: 15:09:20.021338900
2022-07-27 15:09:20.960  INFO 20160 --- [ctor-http-nio-1] c.c.c.SpringWebFluxMainCoffeeController  : # call Spring WebFlux Main Controller: 2022-07-27T15:09:20.960358400 // (1) 첫 번째 요청 수신
2022-07-27 15:09:20.988  INFO 20160 --- [ctor-http-nio-1] c.c.c.SpringWebFluxMainCoffeeController  : # call Spring WebFlux Main Controller: 2022-07-27T15:09:20.988741200 // (2) 두 번째 요청 수신
2022-07-27 15:09:20.990  INFO 20160 --- [ctor-http-nio-1] c.c.c.SpringWebFluxMainCoffeeController  : # call Spring WebFlux Main Controller: 2022-07-27T15:09:20.990737800 // (3) 세 번째 요청 수신
2022-07-27 15:09:20.992  INFO 20160 --- [ctor-http-nio-1] c.c.c.SpringWebFluxMainCoffeeController  : # call Spring WebFlux Main Controller: 2022-07-27T15:09:20.992845800 // (4) 네 번째 요청 수신
2022-07-27 15:09:20.994  INFO 20160 --- [ctor-http-nio-1] c.c.c.SpringWebFluxMainCoffeeController  : # call Spring WebFlux Main Controller: 2022-07-27T15:09:20.994847    // (5) 다섯 번째 요청 수신
2022-07-27 15:09:26.215  INFO 20160 --- [ctor-http-nio-1] c.c.SpringWebFluxMainSampleApplication   : 15:09:26.215659900: coffee name: 카페라떼
2022-07-27 15:09:26.219  INFO 20160 --- [ctor-http-nio-1] c.c.SpringWebFluxMainSampleApplication   : 15:09:26.219924100: coffee name: 카페라떼
2022-07-27 15:09:26.220  INFO 20160 --- [ctor-http-nio-1] c.c.SpringWebFluxMainSampleApplication   : 15:09:26.220840500: coffee name: 카페라떼
2022-07-27 15:09:26.220  INFO 20160 --- [ctor-http-nio-1] c.c.SpringWebFluxMainSampleApplication   : 15:09:26.220840500: coffee name: 카페라떼
2022-07-27 15:09:26.220  INFO 20160 --- [ctor-http-nio-1] c.c.SpringWebFluxMainSampleApplication   : 15:09:26.220840500: coffee name: 카페라떼
```

처리 결과 6초

외부 애플리케이션 Controller에서 Thread.sleep(5000)으로 지연 시간을 주었다고 해서 메인 애플리케이션 Controller의 요청 처리 쓰레드가 Blocking 되지 않는다는것을 의미한다.
