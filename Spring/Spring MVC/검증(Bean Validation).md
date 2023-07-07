@NotBlank, @NotNull, @Range(min = 1000, max = 1000000)

이런 검증 로직을 모든 프로젝트에 적용할 수 있게 공통화하고, 표준화 한 것이 바로 Bean Validation 이다.

### Bean Validation이란?

Bean Validation은 구현체가 아니라 Bean Validatich 2.0 (JSR-380)이라는 기술 표준이다.

마치 JPA가 표준 기술이고, 그 구현체로 하이버네이트가 있는 것과 같다.

Bean Validation을 구현한 기술중에 일반적으로 사용하는 구현체는 하이버네이트 Validator이다.

이름이 하이버네이트가 붙었지만, ORM과는 관련이 없다.

javax.validation으로 시작하면 특정 구현에 관계없이 제공되는 표준 인터페이스고, org.hibernate.validator로 시작하면 하이버네이트 validator 구현체를 사용할 때만 제공되는 검증기능이다.

실무에서는 대부분 하이버네이트 validator를 사용하므로 자유롭게 사용해도된다.

@NotBlank : 빈값 + 공백 허용X

@NotNull : null 허용X

```java
@Data
public class Item {

    private Long id;

    @NotBlank
    private String itemName;

    @NotNull
    @Range(min = 1000, max= 1000000)
    private Integer price;

    @NotNull
    @Max(9999)
    private Integer quantity;

    public Item() {
    }

    public Item(String itemName, Integer price, Integer quantity) {
        this.itemName = itemName;
        this.price = price;
        this.quantity = quantity;
    }
}
```

메시지를 바꾸고 싶으면

@NotBlank(message = “이렇게 바꾸면된다.”)

### 스프링 MVC는 어떻게 Bean Validator를 사용하는가?

spring-boot-starter-validation 라이브러리를 넣으면 자동으로 Bean Validator를 인지하고 스프링에 통합해준다.

LocalValidatorFactoryBean을 글로벌 Validator로 등록을 한다.

이 Validator는 @NotNull 같은 애노테이션을 보고 검증을 수행한다.

이렇게 글로벌 Validator가 적용되어 있기 때문에, @Valid, @Validated만 적용하면 된다.

검증 오류가 발생하면, FieldError, ObjectError를 생성해서 BindingResult에 담아준다.

### @Validated, @Valid

@Validated는 groups라는 기능을 포함하고 있다. (스프링 표준)

@Valid (자바 표준)

굳이 groups를 쓸게 아니라면 아무거나 사용해도 된다.

### 검증의 순서

데이터가 들어오면 @ModelAttribute 각각의 필드에 타입이 맞는지 변환하며 시도한다.

성공하면, Validator를 적용하고, 실패하면 typeMismatch로 FieldError를 추가한다.

생각해보면, 바인딩에 성공한 필드만 Bean Validation을 적용하는게 맞다.

타입변환에 성공해서 바인딩에 성공한 필드여야 BeanValidation 적용이 의미 있다.

`(일단 모델 객체에 바인딩 받는 값이 정상으로 들어와야 검증도 의미가 있다.)`

### @NotBlank

typeMismatch 오류 코드가 애노테이션 이름으로 등록된다.

ex)

NotBlank.item.itemName

NotBlank.itemName

NotBlank.java.lang.String

NotBlank

ex)

Range.item.price

Range.price

Range.java.lang.Integer

Range

`메세지랑 FieldError와 같이 왜 굳이 안쓰는거 배우는가 했더니.. 이거 때문에 그렇구나..`

그런데, Bean Validation의 내용을 바꾸고 싶으면 어떻게해야할까?

errors.properties에 넣어두면 된다.

```java
NotBlank={0} 공백X
Range={0}, {2} ~ {1} 허용
Max={0}, 최대 {1}
```

### Bean Validation 메시지 찾는 순서

1. 생성된 메시지 코드 순서대로 messageSource에서 메시지를 찾는다.
2. 애노테이션의 message 속성을 사용한다. → @NotBlank(message = “공백! {0}”)
3. 라이브러리가 제공하는 기본 값 사용 → 공백일 수 없습니다.

### Bean Validation에서 특정 필드(FieldError)가 아닌 해당 오브젝트 관련 오류(ObjectError)는 어떻게 처리할 수 있을까?

ScriptAssert()를 사용하면 된다.

```java
@Data
@ScriptAssert(lang = "javascript", script = "_this.price * _this.quantity >= 10000", message = "총합이 10000원 넘게 입력해주세요.")
public class Item {
   ...
}
```

이러면 메시지 코드에

ScriptAssert.item

ScriptAssert

2개가 생겨난다.

하지만 이렇게 사용할 수는 있지만, 제약이 많고 복잡하다. 그리고 실무에서는 검증 기능이 해당 객체의 범위를 넘어서는 경우들도 종종 등장한다. 그런 경우 대응이 어렵다.

`그래서 그냥 Java코드로 작성하는걸 추천한다고 하신다.`

`필드 오류를 해결할 때는 Bean Validation을 사용하고 오브젝트 오류를 처리할때는 자바코드로 처리하신다고 한다.`

### Bean Validation의 한계

만약 “등록시에는 id에 값이 없어도 된다. 하지만, 수정시에는 id값이 필수이다.” 라는 요구사항이 들어 왔을 때, Item에 itemId에 NotNull을 넣으면 서로 등록과 수정에서 충돌이 발생한다.

즉, 등록과 수정을 할때, 같은 Bean Validation을 적용할 수 없다.

이 문제를 어떻게 해결해야할까?

방법에는 2가지가 있다.

1. Bean Validation의 groups 기능 활용
2. Item을 직접사용하지 않고, ItemSaveForm, ItemUpdateForm 같은 폼 전송을 위한 별도의 모델 객체를 만들어서 사용한다.

### Bean Validation - groups

```
public interface SaveCheck {
}
```

위 처럼 비어있는 인터페이스를 만들어놓고, @NotNull과 같은 Validation Annotation에 groups 옵션으로 class를 넣어준다.

```java
public class Item {
    @NotNull(groups = UpdateCheck.class)
    private Long id;

    @NotBlank(groups = {SaveCheck.class, UpdateCheck.class})
    private String itemName;

    @NotNull(groups = {SaveCheck.class, UpdateCheck.class})
    @Range(min = 1000, max= 1000000)
    private Integer price;

    @NotNull(groups = {SaveCheck.class, UpdateCheck.class})
    @Max(9999)
    private Integer quantity;
}
```

이때, Controller의 메서드에 @Validated(UpdateCheck.class)를 넣어주면 메서드가 실행될 때, groups의 UpdateCheck가 들어가있는 클래스만을 걸러서 확인해준다.

```java
@PostMapping("/{itemId}/edit")
public String editV2(@PathVariable Long itemId, @Validated(UpdateCheck.class) @ModelAttribute Item item, BindingResult bindingResult) {
    itemRepository.update(itemId, item);
    return "redirect:/validation/v3/items/{itemId}";
}
```

하지만 딱봐도 느껴지는데, 굉장히 불편해 보인다.

아니나 다를까, groups는 실제로 잘 사용되지 않는다고 한다.

그 이유가 실무에서는 주로 다음에 등장하는 등록용 폼 객체와 수정용 폼 객체를 분리해서 사용하기 때문이라고 한다.

실무에서는 groups를 잘 사용하지 않는다.

그 이유는 바로 등록시 폼에서 전달하는 데이터가 Item 도메인 객체와 딱 맞아 떨어지지 않기 때문이다.

실무에서는 회원등록시 회원과 관련된 데이터만 받는게 아니라, 약관 정보도 추가로 받고, Item과 관계 없는 수 많은 부가 데이터가 넘어간다.

그래서 보통 Item을 직접 전달 받는 것이 아니라, 복잡한 폼의 데이터를 컨트롤러까지 전달할 별도의 객체를 만들어서 전달한다. (// 아.. 여기서 Data Transfer Object가 필요 한거구나..)

### 이름을 어떻게 지으면 좋을까?

ItemSave, ItemSaveForm, ItemSaveRequest, ItemSaveDto

의미를 명확히 구분할 수 있으면 되고, `일관성이 가장 중요하다.`

`영한님은 Form에서 넘어오므로 ItemSaveForm을 사용한다고 한다.`

### 등록 수정 뷰 템플릿이 비슷할때, 합치는게 좋을까?

장단점이 있어 고민하는게 좋지만, 어설프게 합치면 등록,수정에서 수만은 분기가 생기는데, 나중에 유지보수를 할 때 오히려 고통을 맛보므로, 어설픈 분기가 보이면 분리하도록 하자.

### Input을 DTO로 받아올 때, @Valid로 검증을 먼저 수행하는 구나..

//이전에 내가 프로젝트를 할때는 그냥 우선에 다 받은뒤에, 데이터베이스에 저장하기 전에 검증을 했는데, 생각해보니 굉장히 비효율적인 로직이었다..

```java
@Data
public class ItemSaveForm {

    @NotBlank
    private String itemName;

    @NotNull
    @Range(min = 1000, max = 1000000)
    private Integer price;

    @NotNull
    @Max(value = 9999)
    private Integer quantity;

}
```

클래스를 이렇게 만들어 놓고, 컨트롤러 단에서 메서드에 @ModelAttribute쪽에 @Validated나 @Valid를 사용해서 검증을 시도하고, 오류가 발생하면 오류를 담아두기위해 BindingResult도 파라미터에 같이 넣어준다.

```java
@PostMapping("/{itemId}/edit")
public String editV2(@PathVariable Long itemId, @Validated @ModelAttribute("item") ItemUpdateForm form, BindingResult bindingResult) {
    Item itemParam = new Item();
    itemParam.setItemName(form.getItemName());
    itemParam.setPrice(form.getPrice());
    itemParam.setQuantity(form.getQuantity());

    itemRepository.update(itemId, itemParam);
    return "redirect:/validation/v4/items/{itemId}";
}
```

이때 주의할 점은, 타임리프에 item으로 받아 쓰기 때문에, @ModelAttribute(”item”)이라고 명시를 해줘야만 model.addAttribute(”item”,form)형태로 들어간다.

그렇지 않으면 model.addAttribute(”form”,form)형태로 들어가 오류가 발생한다. 

### 하이버네이트 Validator 관련 링크

공식 사이트: http://hibernate.org/validator/
공식 메뉴얼: https://docs.jboss.org/hibernate/validator/6.2/reference/en-US/html_single/
검증 애노테이션 모음: https://docs.jboss.org/hibernate/validator/6.2/reference/en-US/html_single/#validator-defineconstraints-spec

### Bean Validation - HTTP Message Converter

@Valid, @Validated는 HttpMessageConverter(@RequestBody)에도 적용이 가능하다.

@ModelAttribute는 HTTP 요청 파라미터(URL 쿼리 스트링, POST Form)을 다룰 때 사용한다.

@RequestBody는 HTTP Body의 데이터를 객체로 변환할 때 사용한다. Json

```java
@Slf4j
@RestController
@RequestMapping("validation/api/items")
public class ValidationItemApiController {

    @ResponseBody
    @PostMapping("/add")
    public Object addItem(@RequestBody @Validated ItemSaveForm form, BindingResult bindingResult){

        log.info("API 컨트롤러 호출");

        if (bindingResult.hasErrors()){
            log.info("검증 오류 발생 errors={}", bindingResult);
            return bindingResult.getAllErrors();
        }

        log.info("성공 로직 실행");
        return form;
    }

}

```

이런식으로 사용하고 검증하면 된다.

실제로 bindingResult에 굉장히 많은 에러가 나오는데, 이중에서 필요한 것들만 받을 수 있는 객체를 만들어서 따로 내보내야 한다.

@ModelAttribute는 각각의 필드 단위로 세밀하게 적용된다.

그래서 특정 필드에 타입이 맞지 않는 오류가 발생해도 나머지 필드는 정상 처리할 수 있다.

하지만,

@RequestBody는 각각의 필드 단위로 적용되는게 아니라, 전체 객체 단위로 적용된다.

즉, MessageConverter가 작동에 성공해서 Item객체를 만들어야 @Valid, @Validated가 적용된다.

HttpMessageConverter단계에서 실패하면 예외가 발생하는데, 이때 원하는 모양으로 예외를 처리하는 방법은 뒤에 예외처리에서 다룬다.
