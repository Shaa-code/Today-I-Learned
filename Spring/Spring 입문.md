# Spring 입문

### Spring을 배우는 이유

실무에서 제대로 동작하는 웹 어플리케이션을 개발하기 위해서이다.

### 순서

- 스프링 프로젝트 생성
- 스프링 부트로 웹서버 실행
- 회원 도메인 개발
- 웹 MVC 개발
- DB 연동 - JDBC, JPA, 스프링 데이터 JPA
- 테스트 케이스 작성

### 목표

스프링 학습의 제대로 된 첫 길잡이 역할을 하기 위해서다.

### 학습방식

처음부터 끝까지 전부다 직접 코딩할것.

SpringBoot로 Spring Project를 생성하므로 SpringBoot로 생성한다.

스프링 관련 프로젝트를 만들어주는 사이트

start.spring.io

## 프로젝트 환경설정

### Maven Project VS Gradle Project

필요한 라이브러리를 불러오고 빌드하는 라이프사이클까지 관리해주는 툴.

과거에는 Maven, 요즘은 Gradle로 넘어왔다.

Group에는 일반적으로 기업명 그냥 Hello로

Artifact에는 결과물의 이름

다른건 그대로 두자.

Dependencies가 중요하다.

SpringBoot로 어떤 라이브러리를 쓸것인지 선택하는것이다.

HTML을 만들어주는 템플릿 엔진 Thymeleaf

### 프로젝트 구조를 잠깐 살펴보자

src에는 main과 test로 나누어져있다.

main 폴더안 java 안에 패키지와 소스파일이 있다.

test는 testcode들과 관련된 소스들이 들어간다.

build.gradle이 중요하다.

```java
plugins {
	id 'org.springframework.boot' version '2.6.7'
	id 'io.spring.dependency-management' version '1.0.11.RELEASE'
	id 'java'
} // 나중에 배우자.
// 우선에는 Gradle이 버전 설정하고 라이브러리 당겨오는 역할이구나만 이해하고 넘어가자.

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11'

repositories {
	mavenCentral()
} //사이트 설정한것인데, 여기서 자동으로 받으라고 설정되어있다.
// 필요하면 다운로드 사이트 추가 가능하다.

dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
	implementation 'org.springframework.boot:spring-boot-starter-web'
  //위 두개는 내가 선택한 템플릿 엔진
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
  //test라이브러리는 JUnit5라이브러리가 자동으로 들어간다.
}

tasks.named('test') {
	useJUnitPlatform()
}
```

Spring은 Tomcat을 내장하고 있어서 Tomcat을 띄우고 그위에 Spring을 올린다.

localhost:8080에 에러가 나올때는 어떻게 해야하나?

netstat -ano

taskkill pid [PID번호] /f 로 8080프로세스를 종료시킨후 실행.

### gradle을 통하지않고 intellij에서 바로 java를 띄어서 돌린다.

File - Settings - Preferences에서

build and run using을 사용한다.

gradle을 통해서 run을하면 느리다.

### External Library를 보면 당겨온 라이브러리가 보인다.

**스프링 부트 핵심 라이브러리**

- spring boot-starter-web
    - spinrg-boot-starter-tomcat : 톰캣(웹서버)
    - spring-webmvc : 스프링 웹 MVC
- spring-boot-starter-thymeleaf: 타임리프 템플릿 엔진(View)
- spring-boot-starter(공통): 스프링 부트 + 스프링 코어 + 로깅
    - spring-boot
        - spring-core
    - spring-boot-starter-logging
        - logback, slf4j

**테스트라이브러리**

- spring-boot-starter-test
    - junit : 테스트 프레임워크
    - mockito : 목 라이브러리
    - assertj : 테스트 코드를 좀 더 편하게 작성하게 도와주는 라이브러리
    - spring-test : 스프링 통합 테스트 지원
    

Spring은 2003년부터 쌓이기 시작해서 정말 방대한 라이브러리가 있다.

잘 찾는것이 중요하다.

[spring.io](http://spring.io) → projects → learn → Reference Doc. → 알아서 검색

### thymeleaf템플릿 엔진

thymeleaf 공식 사이트 : https://www.thymeleaf.org/

스프링 공식 튜토리얼 : [https://spring.io/guides/gs](https://spring.io/guides/gs)/serving-web-content/

컨트롤러에서 리턴값으로 문자를 반환하면 ‘viewResolver’가 화면을 찾아서 처리한다.

스프링부트 템플릿엔진 기본 viewName 매핑

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c173761a-9e16-44cc-a2f0-1274a1d7ac13/Untitled.png)

resources:templates/+{ViewName}+.html

spring-boot-devtools 라이브러리를 추가하면, html파일을 컴파일만 해주면 서버 재시작 없이 View파일 변경이 가능하다.

웹개발에는 3가지 방법이 있다.

### 정적 컨텐츠

파일을 그대로 브라우저에 내려주는것

스프링 부트는 정적 컨텐츠 기능을 자동으로 제공을 한다.

resources/static에 위치한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1220f609-b270-4a9a-866d-605649e6bbf3/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eb0dbae6-203e-4ade-887d-20ea892b4fec/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7747b31c-e170-4673-a4e5-53ba834c4946/Untitled.png)

### MVC와 템플릿엔진

jhp,php → 템플릿 엔진

html을 서버에서 프로그래밍해서 html을 동적으로 바꿔서 내려주는 방식을 템플릿엔진

모델, 뷰, 컨트롤러로 작동하는 방식이 MVC → 이 패턴으로 개발을 많이한다.

### API

XML이라는 JSON 포맷으로 내려준다.

Vue, React, JS에서 API만 쏴주고 알아서 정리하고, 내려는일을한다.
