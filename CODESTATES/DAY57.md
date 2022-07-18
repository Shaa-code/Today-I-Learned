### API 문서화가 필요한 이유

API 문서화란?

클라이언트가 REST API 백엔드 애플리케이션에 요청을 전송하기 위해서 알아야 되는 요청 정보를 문서로 잘 정리하는것을 의미한다.

프론트엔드는 이 API문서 또는 API 스펙을 사용하기 때문이다.

과거 API는 수기로 직접 작성하기도 했지만, 너무나 비효율적이어서, 현재는 자동화된 도구가 있다.

### Swagger의 API 문서화 방식

[https://mvnrepository.com/artifact/io.springfox/springfox-swagger-ui/2.9.2](https://mvnrepository.com/artifact/io.springfox/springfox-swagger-ui/2.9.2)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/570a5424-e62b-466c-a785-d107d5051a0f/Untitled.png)

Swagger Denpendency 추가

Swagger는 API들을 하나씩 계속 추가시켜줘야한다.

애너테이션이 너무 많아진다는 단점이 있다.

```
@ApiOperation(value = "회원 정보 API", tags = {"Member Controller"})

@ApiOperation(value = "회원 정보 등록",notes = "회원 정보를 등록합니다.")

@ApiResponses(value = {
        @ApiResponse(code = 201, message = "회원등록 완료"),
        @ApiResponse(code = 404, message = "Member not found")

@ApiOperation(value = "회원 정보 조회", notes = "회원 식별자(memberId)에 해당하는 회원을 조회합니다.")

@ApiParam(name = "member-id", value = "회원 식별자", example = "1")
```

DTO에도 애너테이션을 모두 추가해주어야한다는 단점이 있다.

```java
@ApiModel("Member Post")  // (1)
@Getter
public class MemberPostDto {
    // (2)
    @ApiModelProperty(notes = "회원 이메일", example = "hgd@gmail.com", required = true)
    @NotBlank
    @Email
    private String email;

    // (3)
    @ApiModelProperty(notes = "회원 이름", example = "홍길동", required = true)
    @NotBlank(message = "이름은 공백이 아니어야 합니다.")
    private String name;

    // (4)
    @ApiModelProperty(notes = "회원 휴대폰 번호", example = "010-1111-1111", required = true)
    @Pattern(regexp = "^010-\\d{3,4}-\\d{4}$",
            message = "휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다.")
    private String phone;
}
```

### Spring Rest Docs의 Api 문서화 방식

Swagger와 다르게 Spring Rest Docs의 경우 애플리케이션 기능 구현과 관련된 코드에는 API문서생성을 위한 애너테이션 같은 어떠한 정보도 추가되지 않는다.

```java
given(mapper.memberPostToMember(Mockito.any(MemberDto.Post.class)))
                .willReturn(new Member());

given(memberService.createMember(Mockito.any(Member.class)))
                .willReturn(new Member());

given(mapper.memberToMemberResponse(Mockito.any(Member.class))).willReturn(responseDto);

        // when
        ResultActions actions =
                mockMvc.perform(
                        post("/v11/members")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        // then
        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.email").value(post.getEmail()))
                .andExpect(jsonPath("$.data.name").value(post.getName()))
                .andExpect(jsonPath("$.data.phone").value(post.getPhone()))
// API 문서화 관련 코드
                .andDo(document("post-member",

                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
requestFields(
                                List.of(
fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
fieldWithPath("name").type(JsonFieldType.STRING).description("이름"),
fieldWithPath("phone").type(JsonFieldType.STRING).description("휴대폰 번호")
                                )
                        ),
responseFields(
                                List.of(
fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
fieldWithPath("data.email").type(JsonFieldType.STRING).description("이메일"),
fieldWithPath("data.name").type(JsonFieldType.STRING).description("이름"),
fieldWithPath("data.phone").type(JsonFieldType.STRING).description("휴대폰 번호"),
fieldWithPath("data.memberStatus").type(JsonFieldType.STRING).description("회원 상태"),
fieldWithPath("data.stamp").type(JsonFieldType.NUMBER).description("스탬프 갯수")
                                )
                        )
              ));
    }
}
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4f6d55f3-43b1-4e96-96b0-e9f2074da3ca/Untitled.png)

스니핏(Snippet)은 일반적으로 코드의 일부 조각을 의마하는 경우가 많은데 여기서는 문서의 일부조각을 의미한다.

```
plugins {
	id 'org.springframework.boot' version '2.7.1'
	id 'io.spring.dependency-management' version '1.0.11.RELEASE'
	id "org.asciidoctor.jvm.convert" version "3.3.2"    // (1)
	id 'java'
}

group = 'com.codestates'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11'

repositories {
	mavenCentral()
}

// (2)
ext {
	set('snippetsDir', file("build/generated-snippets"))
}

// (3)
configurations {
	asciidoctorExtensions
}

dependencies {
       // (4)
	testImplementation 'org.springframework.restdocs:spring-restdocs-mockmvc'

  // (5)
	asciidoctorExtensions 'org.springframework.restdocs:spring-restdocs-asciidoctor'

	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
	implementation 'org.springframework.boot:spring-boot-starter-validation'
	implementation 'org.springframework.boot:spring-boot-starter-web'
	compileOnly 'org.projectlombok:lombok'
	runtimeOnly 'com.h2database:h2'
	annotationProcessor 'org.projectlombok:lombok'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
	implementation 'org.mapstruct:mapstruct:1.5.1.Final'
	annotationProcessor 'org.mapstruct:mapstruct-processor:1.5.1.Final'
	implementation 'org.springframework.boot:spring-boot-starter-mail'

	implementation 'com.google.code.gson:gson'
}

// (6)
tasks.named('test') {
	outputs.dir snippetsDir
	useJUnitPlatform()
}

// (7)
tasks.named('asciidoctor') {
	configurations "asciidoctorExtensions"
	inputs.dir snippetsDir
	dependsOn test
}

// (8)
task copyDocument(type: Copy) {
	dependsOn asciidoctor            // (8-1)
	from file("${asciidoctor.outputDir}")   // (8-2)
	into file("src/main/resources/static/docs")   // (8-3)
}

build {
	dependsOn copyDocument  // (9)
}

// (10)
bootJar {
	dependsOn copyDocument    // (10-1)
	from ("${asciidoctor.outputDir}") {  // (10-2)
		into 'static/docs'     // (10-3)
	}
}
```

1. (1)에서는 `.adoc` 파일 확장자를 가지는 AsciiDoc 문서를 생성해주는 Asciidoctor를 사용하기 위한 플러그인을 추가합니다.
2. (2)에서는 `ext` 변수의 `set()` 메서드를 이용해서 API 문서 스니핏이 생성될 경로를 지정합니다.
3. (3)에서는 AsciiDoctor에서 사용되는 의존 그룹을 지정하고 있습니다. :asciidoctor task가 실행되면 내부적으로 (3)에서 지정한 ‘`asciidoctorExtensions`’라는 그룹을 지정합니다.
4. (4)에서 'org.springframework.restdocs:spring-restdocs-mockmvc'를 추가함으로써 spring-restdocs-core와 spring-restdocs-mockmvc 의존 라이브러리가 추가됩니다.
5. (5)에서 spring-restdocs-asciidoctor 의존 라이브러리를 추가합니다. (3)에서 지정한 asciidoctorExtensions 그룹에 의존 라이브러리가 포함이 됩니다.
6. (6)에서는 :test task 실행 시, API 문서 생성 스니핏 디렉토리 경로를 설정합니다.
7. (7)에서는 :asciidoctor task 실행 시, Asciidoctor 기능을 사용하기 위해 :asciidoctor task에 `asciidoctorExtensions` 을 설정합니다.
8. (8)은 `:build` task 실행 전에 실행되는 task입니다. `:copyDocument` task가 수행되면 index.html 파일이 `src/main/resources/static/docs` 에 copy 되며, copy된 index.html 파일은 API 문서를 파일 형태로 외부에 제공하기 위한 용도로 사용할 수 있습니다.
    1. (8-1)에서는 `:asciidoctor` task가 실행된 후에 task가 실행 되도록 의존성을 설정합니다.
    2. (8-2)에서는 "`build/docs/asciidoc/"` 경로에 생성되는 index.html을 copy한 후,
    3. (8-3)의 "`src/main/resources/static/docs`" 경로로 index.html을 추가해 줍니다.
9. (9)에서는 `:build` task가 실행되기 전에 `:copyDocument` task가 먼저 수행 되도록 합니다.
10. (10)에서는 애플리케이션 실행 파일이 생성하는 `:bootJar` task 설정입니다.
    1. (10-1)에서는 `:bootJar` task 실행 전에 `:copyDocument` task가 실행 되도록 의존성을 설정합니다.
    2. (10-2)에서는 Asciidoctor 실행으로 생성되는 index.html 파일을 jar 파일 안에 추가해 줍니다.
    jar 파일에 index.html을 추가해 줌으로써 웹 브라우저에서 접속(`http://localhost:8080/docs/index.html`) 후, API 문서를 확인할 수 있습니다.

### @WebMvcTest

Controller를 테스트하기 위한 전용 애너테이션

```
@EnableJpaAuditing
@SpringBootApplication
public class Section3Week3RestDocsApplication {

	public static void main(String[] args) {
		SpringApplication.run(Section3Week3RestDocsApplication.class, args);
	}

}
```

`@EnableJpaAuditin` 을 xxxxxxApplication 클래스에 추가하게 되면 JPA와 관련된 Bean을 필요로 하기 때문에 `@WebMvcTest`애너테이션을 사용해서 테스트를 진행 할 경우에는 JpaMetamodelMappingContext를 Mock 객체로 주입해 주어야 한다.

### @SpringBootTest

애너테이션은 `@AutoConfigureMockMvc`과 함께 사용되어 Controller를 테스트 할 수 있는데, 프로젝트에서 사용하는 전체 Bean을 ApplicationContext에 등록하여 사용한다.

### @WebMvcTest

애너테이션의 경우 Controller 테스트에 필요한 Bean만 ApplicationContext에 등록하기 때문에 실행 속도는 상대적으로 빠르다.

다만, Controller에서 의존하고 있는 객체가 있다면 해당 객체에 대해서 Mock 객체를 사용하여 의존성을 일일이 제거해 주어야 한다.

결과적으로 `@SpringBootTest` 는 데이터베이스까지 요청 프로세스가 이어지는 통합 테스트에 주로 사용되고, `@WebMvcTest` 는 **Controller를 위한 슬라이스 테스트에 주로 사용한다.**

MemberController가 MemberService 와 MemberMapper의 메서드를 호출하지 않도록 관계를 단절 시킬 필요가 있다.

```
@MockBean
private MemberService memberService;

@MockBean
private MemberMapper mapper;
```

MemberController가 의존하는 객체와의 관계를 단절하기 위해 MemberService와 MemberMapper의 Mock Bean을 주입 받는다.

```java
.andDo(document(
"post-member",
getRequestPreProcessor(),
getResponsePreProcessor(),
requestFields(
List.of(
fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
fieldWithPath("name").type(JsonFieldType.STRING).description("이름"),
fieldWithPath("phone").type(JsonFieldType.STRING).description("휴대폰 번호")
)),
responseFields(
List.of(
fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
fieldWithPath("data.email").type(JsonFieldType.STRING).description("이메일"),
fieldWithPath("data.name").type(JsonFieldType.STRING).description("이름"),
fieldWithPath("data.phone").type(JsonFieldType.STRING).description("휴대폰 번호"),
fieldWithPath("data.memberStatus").type(JsonFieldType.STRING).description("회원 상태"),
fieldWithPath("data.stamp").type(JsonFieldType.NUMBER).description("스탬프 갯수")
)
)
));
```

1. `document()`는 API 스펙 정보를 전달받아서 실직적인 문서화 작업을 수행하는 RestDocumentationResultHandler클래스에서 가장 핵심 기능을 하는 메서드이다.

1. document의 첫번째 파라미터인 API 문서 스니핏의 식별자 역할을 한다.

“post-member”로 지정 했으므로 문서 스니핏은 post-member 디렉토리 하위에 생성된다.

1. getRequestPreProcessor(), getResponsepreProcessor()는 request와 response에 해당하는 문서 영역을 전처리하는 역할을 한다. 모든 테스트 케이스에서 재사용 할 수 있도록 한다.
    
    사용자지정함수이다. 내부에서는 preprocessRequest(prettyPrint()),preprocessResponse(prettyPrint())을 리턴한다.
    

1. requestField는 문서로 표현될 request body를 의미한다. List<FieldDescriptor>의 원소인 FieldDescriptor 객체가 request body에 포함된 데이터를 표현한다.

1. responseField 역시 response body를 의미하며, 파라미터로 전달되는 List<FieldDescriptor>의 원소인 FieldDescriptor 객체가 response body에 포함된 데이터를 표현한다.

1. FieldWithPath(”data.memberId”)의 data.memberId는 data 프로퍼티의 하위 프로퍼티를 의미한다.

ex)

```
 {
        "data": {
            "memberId": 1,            // data.memberId
            "email": "hgd@gmail.com", //data.email
            "name": "홍길동1",        //data.name
            "phone": "010-1111-1111", //data.phone
            "memberStatus": "활동중", //data.memberStatus
            "stamp": 0
        }
    }
}
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/20e89c96-322e-417d-aa10-727dfed1a6fc/Untitled.png)

테스트 케이스 실행후 생성된 Snippet

src/docs/asciidoc/index.adoc 파일을 직접 생성해주고,

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/15d605ef-a1a3-442d-9bc5-65b34ca18ccc/Untitled.png)

둘중에 하나로 빌드하면 generated-snippets에 있던, Snippet들이 하나로 모여 

### Asciidoc 문법

```
= 안녕  // = 문서의 제목 ( = , ===)의 갯수에 따라 크기가 작아짐
:sectnums:               // :sectnum: 목차에서 각 섹션에 넘버링
:toc: left               // :toc: 목차를 문서의 어느 위치에 구성할 것인지 설정
:toclevels: 4            // :toclevels: 목차에 표시할 제목의 level (==== 까지만 목차에 표시)

:toc-title: 제목입니다. // :toc-title: 목차의 제목을 지정할 수 있다.
:source-highlighter: prettify // :source-highlighter: 소스코드의 하이라이터를 설정한다.

image::https://spring.io/images/spring-logo-9146a4d3298760c2e7e49595184e1975.svg[spring]
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/398e5965-81be-4a28-b77e-b7561e4f3c37/Untitled.png)

```java
***

안녕하세요

***
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eca5840b-bcac-4e9d-95a3-ec63b16c2d30/Untitled.png)

## Asciidoctor

AsciiDoctor는 AsciiDoc 포맷의 문서를 파싱해서 HTML5, 매뉴얼 페이지, PDF및 EPUB3 등의 문서를 생성하는 툴 이다.

### 문서 스니핏을 템플릿 문서에 포함시키기

.curl-request에서 “.”은 스니핏 섹션 제목을 표현하기 위해 사용한다.

include는 스니핏을 템플릿 문서에 포함할때 사용하는 Asciidoctor에서 사용하는 매크로 중 하나이며 매크로를 사용하기 위한 표기법이다.

```
***
== MemberController
=== 회원 등록
.curl-request
include::{snippets}/post-member/http-request.adoc[]

.request-fields
include::{snippets}/post-member/request-fields.adoc[]

.http-response
include::{snippets}/post-member/http-response.adoc[]

.response-fields
include::{snippets}/post-member/response-fields.adoc[]

...
...
```
