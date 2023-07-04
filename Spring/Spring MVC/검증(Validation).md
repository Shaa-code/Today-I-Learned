1. 타입 검증

가격, 수량에 문자가 들어가면 검증오류.

2. 필드 검증

상품명 필수, 공백

### 클라이언트에서 검증, 서버에서 검증

클라이언트 쪽에서는 Javascript를 조작할 수 있으므로 보안에 취약하다.

그리고 서버에서만 검증하면, Bad Request만 보내주며, 고객의 사용성이 떨어진다.

최종적으로 서버 검증은 필수이다.

### 서버에서 검증에 실패했을 때 어떻게 처리해야하지?

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/32815cde-aa30-4beb-9374-61463589ae28)

검증에 실패했다고해서, 그냥 오류만 날리고 끝이 아니다.

이전에 담아 두었던 데이터들을 그대로 가지고 다시 페이지에 보여줘야하며, 검증 오류의 결과 또한 사용자에게 보여줄 수 있어야 한다.

즉, 검증실패 시 모델에 다시 값들을 담아줘야하는 것이다.

오류처리를 할때 굳이 Javascript로 할 필요없이, th:class를 활용해서, class를 추가 해 줌으로써 오류를 처리할 수 있다.

### 실제로 처리하는 방법

```java
// 내가 한 방식
@PostMapping("/add")
public String addItem(@ModelAttribute Item item, RedirectAttributes redirectAttributes) {

    Map<String, String> errors = new HashMap<>();

    //item이 비어있을때,
    if(item.getItemName().isEmpty()){
        errors.put("ItemNameEmpty","상품의 이름을 입력해주세요.");
    }

    if(item.getPrice() == null || item.getPrice() >= 1000 || item.getPrice() <= 1_000_000){
        errors.put("ItemPriceEmpty","상품의 가격을 입력해주세요.");
    }

    if(item.getQuantity() == null || item.getQuantity() < 9999){
        errors.put("ItemQuantityEmpty","상품의 양을 입력해주세요.");
    }

    // 만약 오류가 없는건 어떻게 처리하지?
    Item savedItem = itemRepository.save(item);
    redirectAttributes.addAttribute("itemId", savedItem.getId());
    redirectAttributes.addAttribute("status", true);
    return "redirect:/validation/v1/items/{itemId}";
}
```

```java
//영한님 방식

Map<String, String> errors = new HashMap<>();

```

한 페이지내에서 계속 Javascript를 활용해서 수정해주는게 아니라,

계속해서 html을 다시 랜더링해서 다시 던져주는 방식인 것이다.

이렇게 하기 위해서는 addForm으로 가기전에, new Item()으로 빈 객체를 넣어줘야한다.

// 의문

계속 메서드 호출하는데.. 이게 맞나?  

Model과 ModelAttribute를 구분하지 못함.

### hasText()와 isEmpty()중 무엇을 사용하는게 좋을까?

- isEmpty()

```java
//isEmpty()
public static boolean isEmpty(@Nullable Object str) {
    return str == null || "".equals(str);
}
```

- hasText()

```java

public static boolean hasText(@Nullable String str) {
    return str != null && !str.isEmpty() && containsText(str);
}

private static boolean containsText(CharSequence str) {
    int strLen = str.length();
    
    for(int i = 0; i < strLen; ++i) {
      if (!Character.isWhitespace(str.charAt(i))) {
        return true;
      }
    }
    
    return false;
}
```

hasText는 null도 아니고, 비어있지도 않으며, `WhiteSpace를 체크해준다.`

차이는 WhiteSpace도 없어야 한다는 소리이다.

일반적으로 띄어쓰기가 없는게 좋으니 hasText를 주로 활용할 것이다.

### `Safe Navigation Operator`

평소에 우리가 경험하듯이, error.containsKey(’globalError’)를 했을때, error가 비어있으면 nullPointerException을 띄운다.

이걸 미연에 방지하기 위해, errors?.containsKey(’globalError’)를 사용하면,

errors가 비었을때 즉, null임을 인식하고, NullPointerException 대신, null을 반환해 준다.

이는 SpringEL 문법이다.

### 필드 오류 처리

오류를 처리할 때,

- th:class 를 활용해서 답을 얻은 방법.

```html
<input type="text" id="itemName" th:field="*{itemName}" th:class="${errors?.containsKey('itemName')} ? 'form-control field-error' : form-control" class="form-control" placeholder="이름을 입력하세요">
<div class="field-error" th:if="${errors?.containsKey('itemName)}" th:text="${errors['itemName']}">상품명 오류</div>
```

- th:class를 사용해서 처리할 수도 있지만, classappend를 활용해서 처리할 수도 있다.

```html
<input type="text" th:classappend="${errors?.containsKey('itemName')} ? 'field-error' : _" class="form-control">
```

만약 값이 없으면 ‘_’(No-Operation)을 사용해서 아무것도 하지 않는다.

아래의 방법이 더 깔끔해 보인다.

- 오류 CSS코드

```
.field-error{
    border-color: #dc3545;
    color: #dc3545;
}
```

### BindingResult

```java
if(!StringUtils.hasText(item.getItemName())){
    bindingResult.addError(new FieldError("item","itemName", "상품 이름은 필수 입니다."))
}
```

- 왜 FieldError 인가?

```java
errors.put(”itemName”, “상품 이름은 필수입니다.”);

bindingResult.addError(new FieldError(”item”, “itemName”, “상품 이름은 필수입니다.”));
```

구체적으로 멤버변수에 있는 문제라고 알려줄 수 있기 떄문이다.

- 중요 !

BindindResult는 @ModelAttribute 바로 다음에 와야한다.

왼쪽 파라미터에 있는 ModelAttribute의 객체의 Bind한 결과를 담고 있기 때문이다.

- 파라미터

objectName: 객체 이름

field: 오류가 발생한 필드 이름

defaultMessage: 오류 기본 메시지

- 글로벌 오류 제어법

```java
bindingResult.addError(new ObjectError("item", "가격 * 수량의 합은 10,000원 이상이어야 합니다. 현재 값 = " + resultPrice))
```

- th:errors=”*{itemName}”

Thymeleaf에서는 th:errors=””라는 문법을 통해 오류를 제어한다.

- 타임리프 스프링 검증 오류 통합

#field를 사용해서 BindingResult의 hasGlobalErrors()를 사용할 수 있다.

th:errors 는 해당 필드에 오류가 있으면 태그를 출력한다. th:if의 편의버전

th:errorclass : th:field에서 지정한 필드에 오류가 있으면 class 정보를 추가한다.

검증과 오류 메시지 공식 메뉴얼

[Tutorial: Thymeleaf + Spring](https://www.thymeleaf.org/doc/tutorials/3.0/thymeleafspring.html#validation-and-error-messages)

### BindingResult2

@ModelAttribute에 바인딩시에 타입 오류가 발생한다면,

BindingResult가 없으면 컨트롤러 호출을 안하고 400에러를 호출한다.

BindingResult가 있으면 컨트롤러를 호출시키고, bindingReuslt에 값을 담는다.

BindingResult는 Model에 자동으로 담긴다.

그런데 오류가 발생하면, 사용자가 입력한 값이 사라진다. 이때는 어떻게 남겨야하는가?

```java
if(!StringUtils.hasText(item.getItemName())){
    bindingResult.addError(new FieldError("item", "itemName", item.getItemName(),false, null, null, "상품 이름은 필수입니다."));
}
```

3번째 파라미터로 rejectedValue가 넘어간다. 그것을 제어하면 된다.

파리미터 목록

objectName : 오류 발생 객체일름

field: 오류가 발생한 필드

rejectedValue : 사용자가 입력한 값(거절된 값)

bindingFailure : 타입 오류 같은 바인딩 실패, 검증 실패를 구분해주는 값

codes : 메시지 코드

arguments : 메시지에서 사용하는 인자

defaultMessage: 기본 오류 메시지

- 어떻게 타입이 달라서 발생한 오류인데 데이터를 저장할 수 있는 것일까?

아… 그렇구나..

생각을 해보면, Integer price로 선언되어있는 멤버변수에 “qqqq”와 같은 문자를 넣으면 임시라도 저장을 하고 있을수가 없다.

이때 누가 데이터를 임시로 저장하고 있을까? 바로 FieldError가 오류 발생시 사용자 입력 값을  Object 타입으로 저장하는 기능을 제공한다.

- th:field=”*{price}”의 또다른 역할

타임리프의 th:field

정상 상황에서는 모델 객체의 값을 사용한다.

오류가 발생하면 FieldError에서 보관한 값을 사용해서 값을 출력한다.

### FieldError에서 오류코드를 메시지로 처리하는법

왜 하는가? 메시지로 처리하면 해당 값들을 간편하게 바꿀 수 있기 때문이며,

```java
//errors.properties
required.item.itemName=상품 이름은 필수입니다.
range.item.price=가격의 {0} ~ {1} 까지 허용합니다.
max.item.quantity=수량은 최대 {0}까지 허용합니다.
totalPriceMin=가격 * 수량의 합은 {0}원 이상이어야 합니다. 현재 값 = {1}
```

```java
if(item.getPrice() == null || item.getPrice() <= 1000 || item.getPrice() >= 1000000){
    bindingResult.addError(new FieldError("item","price", item.getPrice(),false, new String[]{"range.item.price"}, new Object[]{1000,1000000},"가격은 1,000이상 1,000,000만원 사이의 값으로 필수 입니다."));
}
```

이렇게 new String[]{}로 위의 텍스트를 받고 new Object[]{}로 인자를 순서대로 받는다.

만약 new String[]{}에서 데이터가 없으면 2번째것으로 나간다, 이 리스트에도 없으면 Default 값을 찾아가고 Default가 없으면 런타임 오류가 발생한다.

### FieldError, ObjectError의 코드를 줄이는법

rejectValue(), reject(0

BindingResult가 제공하는 rejectValue(), reject()를 사용하면 FieldError, ObjectError를 직접 생성하지 않고 깔끔하게 검증오류를 다룰 수 있다.

```java
@PostMapping("/add")
public String addItemV4(@ModelAttribute Item item, BindingResult bindingResult , RedirectAttributes redirectAttributes) {

  if(!StringUtils.hasText(item.getItemName())){
      bindingResult.rejectValue("itemName","required");
  }

  if(item.getPrice() == null || item.getPrice() <= 1000 || item.getPrice() >= 1000000){
      bindingResult.rejectValue("price","range", new Object[]{1000, 1000000},null);
  }

  if(item.getQuantity() == null || item.getQuantity() > 10000){
      bindingResult.rejectValue("quantity","max",null);
  }

  if(item.getPrice() != null && item.getQuantity() != null){
      int resultPrice = item.getPrice() * item.getQuantity();
      bindingResult.reject("totalPriceMin",new Object[]{10000,resultPrice},null);
  }

  if(bindingResult.hasErrors()){
      log.info("errors = {}", bindingResult);
      return "validation/v2/addForm";
  }

  Item savedItem = itemRepository.save(item);
  redirectAttributes.addAttribute("itemId", savedItem.getId());
  redirectAttributes.addAttribute("status", true);
  return "redirect:/validation/v2/items/{itemId}";
}
```

이렇게 rejectValue, reject를 사용할 수 있다.

이때 이 메서드들은 모두 FieldError를 활용해서 만들어진 메서드이다.

### 더 줄여보자.

위처럼 디테일하게 required.item.itemName을 찾아서 오류를 만들자!

혹은, required 만으로 오류를 만들자! 두가지다 사용해서 만들 수 있다.

이는 상황마다, 범용성에 따라 달라진다.

처음에는 범용성있게 간단한, required만 사용하다가,

나중에 세밀하게 작성해야겠다 싶을 때, 단계를 두어 깊이 들어가는게 좋다.

```java
#Level1
required.item.itemName: 상품 이름은 필수 입니다.

#Level2
required: 필수 값 입니다.
```

### 위처럼 단계별로 줄이기 위해서 Spring에서 구현해둔 객체가 있다.

MessageCodeResolver

```java
@Test
void messageCodesResolverObject(){
    String[] messageCodes = codesResolver.resolveMessageCodes("required", "item");
    for (String messageCode : messageCodes) {
        System.out.println("messageCode = " + messageCode);
    }
    Assertions.assertThat(messageCodes).containsExactly("required.item","required");
}

//결과
messageCode = required.item
messageCode = required
```

```java
@Test
void messageCodesResolverField(){
    String[] messageCodes = codesResolver.resolveMessageCodes("required", "item", "itemName", String.class);
    for (String messageCode : messageCodes) {
        System.out.println("messageCode = " + messageCode);
    }
    assertThat(messageCodes).containsExactly(
            "required.item.itemName",
            "required.itemName",
            "required.java.lang.String",
            "required"
    );
}
```

관련된 것들을 모두 다 만들어 버리는거구나..

### DefaultMessageCodesResolver의 기본 메시지 생성 규칙을 알고있자.

- 객체오류의 경우

```java
1. code + “.” Object name
2. code
```

ex) 오류코드가 : required, object name: item

```java
1. required.item
2. required
```

- 필드오류의 경우

```java
1. code + "." + object name + "." + field
2. code + "." + field
3. code + "." + field type
4. code
```

ex) 오류코드 : typeMismatch, object name "user", field "age", field type: int

```java
1. typeMismatch.user.age
2. typeMismatch.age
3. typeMismatch.int
4. typeMismatch
```

- 동작 원리

rejectValue()와 reject()의 내부에서 MessageCodeResolver를 사용한다.

FieldError, ObjectError의 생성자를 보면 여러 오류코드를 볼 수 있는데,

MessageCodesResolver가 생성된 순서대로 오류 코드를 보관한다.

```yaml
#required.item.itemName=상품 이름은 필수입니다.
#range.item.price=가격은 {0} ~ {1} 까지 허용합니다.
#max.item.quantity=수량은 최대 {0} 까지 허용합니다.
#totalPriceMin=가격 * 수량의 합은 {0}원 이상이어야 합니다. 현재 값 = {1}
#==ObjectError==
#Level1
totalPriceMin.item=상품의 가격 * 수량의 합은 {0}원 이상이어야 합니다. 현재 값 = {1}
#Level2 - 생략
totalPriceMin=전체 가격은 {0}원 이상이어야 합니다. 현재 값 = {1}
#==FieldError==
#Level1
required.item.itemName=상품 이름은 필수입니다.
range.item.price=가격은 {0} ~ {1} 까지 허용합니다.
max.item.quantity=수량은 최대 {0} 까지 허용합니다.
#Level2 - 생략
#Level3
required.java.lang.String = 필수 문자입니다.
required.java.lang.Integer = 필수 숫자입니다.
min.java.lang.String = {0} 이상의 문자를 입력해주세요.
min.java.lang.Integer = {0} 이상의 숫자를 입력해주세요.
range.java.lang.String = {0} ~ {1} 까지의 문자를 입력해주세요.
range.java.lang.Integer = {0} ~ {1} 까지의 숫자를 입력해주세요.
max.java.lang.String = {0} 까지의 문자를 허용합니다.
max.java.lang.Integer = {0} 까지의 숫자를 허용합니다.
#Level4
required = 필수 값 입니다.
min= {0} 이상이어야 합니다.
range= {0} ~ {1} 범위를 허용합니다.
max= {0} 까지 허용합니다.
```

이런 느낌으로 사용한다.

```java
ValidationUtils.*rejectIfEmptyOrWhitespace*(bindingResult, "itemName", "required");

if(!StringUtils.hasText(item.getItemName())){
    bindingResult.addError(new FieldError("item", "itemName", item.getItemName(),false, new String[]{"required.item.itemName"}, null, null));
}
```

위 코드 대신 아래의 코드를 사용해도 좋다.

### 어떻게 여전히 발생하는 웹에서 보이는 런타임에러를 해결하지?

### Validator 분리

이전의 코드를 보면 알겠지만, 컨트롤러가 굉장히 많은 검증을 진행해서 복잡하다.

### 그럼 어떻게 해야하는가?

Validator를 구현한 클래스를 따로 만들어서 처리한다.

```java
@Component
public class ItemValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return Item.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Item item = (Item) target;

        if(!StringUtils.hasText(item.getItemName())){
            errors.rejectValue("itemName","required");
        }

        if(item.getPrice() == null || item.getPrice() <= 1000 || item.getPrice() >= 1000000){
            errors.rejectValue("price","range");
        }

        if(item.getQuantity() == null || item.getQuantity() > 10000){
            errors.rejectValue("quantity","max");
        }
        ...
    }
}

```

파라미터로 넘어오는 class파일이 Item에 지원이 되는지 알아보는 로직이다.

왜 하필 class.isAssignableFrom(clazz)를 사용해야하는가?

그냥 클래스뿐만 아니라, 클래스의 하위 자식까지 검증해주기 때문에

== 보다는 isAssignableFrom을 사용한다.

### 굳이 왜 Validator를 구현해서 사용하는가?

간단하게, 만들어도 될것 같은데?

스프링이 Validator 인터페이스를 별도로 제공한 이유는 체계적으로 검증 기능을 도입하기 위해서다.

Validator 인터페이스를 사용해서 검증기를 만들면 스프링의 추가적인 도움을 받을 수 있다.

```java
public class ValidationItemControllerV2 {

    private final ItemRepository itemRepository;
    private final ItemValidator itemValidator;

    @InitBinder
    public void init(WebDataBinder dataBinder){
        dataBinder.addValidators(itemValidator);
    }

    ...
}
```

컨트롤러가 호출될 때마다, 항상 @InitBinder가 불려져서, WebDataBinder라는 곳에다가, itemValidator를 넣어둔다.

이렇게하면, 내가 파라미터에서 @Validated 를 사용하면, 자동으로 해당 메서드에 대한, 검증을 실시한다.

### 모든 컨트롤러에 적용되게는 못하는가?

가능하다.

실행 부인 ServiceApplication에 WebMvcConfigurer를 implement하고,

```java
public Validator getValidator(){
    return new ItemValidator();
}
```

이렇게 추가해주면 된다.

### 참고해야할 점.

@Validated, @Valid 둘다 사용가능하다.

javax.validation.@Valid를 사용하려면 build.gradle의 의존관계 추가가 필요하다.

implemnetation ‘org.springframework.boot:spring-boot-starter-validation’

`@Validated는 스프링 전용 검증 애노테이션이고, @Valid는 자바 표준 검증 애노테이션이다.`
