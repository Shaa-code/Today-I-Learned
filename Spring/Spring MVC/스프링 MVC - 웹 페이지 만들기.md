### @Data에 대해서

핵심 도메인에서 @Data은 내가 생각지도 못하게 동작할 위험이 있기 때문에, 사용하지 않는게 좋다.

DTO정도로만 사용할 때는 Data를 사용해도 문제가 없다.

### 실무에서 사용하는 저장법

```java
private static final Map<Long,Item> store = new ConcurrentHashMap

private static long sequence = 0L;
```

HashMap보다는 ConcurrentHashMap

long 보다는 AtomicLong

모두 동시성을 제어할 수 있기 때문이다.

```java
public List<Item> findAll(){
    return new ArrayList<>(store.values());
}
```

그냥 store.values()를 반환해도 된다. 하지만 ArrayList로 한번 더 감싸는 이유는 혹시라도 ArrayList에 값을 넣어도 store에 변함이 없게 하기 위함이다.

//무슨 소린지 잘 모르겠다.

### DTO를 왜 굳이 만들어서 사용하는가?

Main Domain 객체를 그냥 계속해서 사용하면,

개발자 입장에서 set을 할 수도 있고, Id도 사용하지 않았기 때문에 id도 사용할 수 있는데 왜 안쓰지? 이런식으로 생각할 수 있다.

즉, 메인 도메인만을 활용하는 것은 명확한 의사를 전달하기가 어렵다.

또한 실수로 set을 해버리면 큰일나기 때문이다.

### 웹 퍼블리셔의 역할

HTML 마크업 작업을 해주시는 분이 웹 퍼블리셔이다.

### HTML을 편리하게 개발하기 위해서 부트스트랩을 사용한다.

부트 스트랩은 HTML,CSS,JS 프레임워크이다.

하나의 CSS로 휴대폰, 테블릿, 데스크탑까지 다양한 기기에서 작동한다.

다양한 기능을 제공해서, 사용자가 쉽게 웹사이트를 제작, 유지, 보수 할 수 있도록 도와준다.

### 실무에서 백엔드 개발자가 Admin페이지를 만들때 사용하면 꿀이다.

### 주의점

이렇게 정적 리소스가 공개되는 /resources/static 폴더에 HTML을 넣어두면, 실제 서비스에서도 공개된다.

서비스를 운영한다면 지금처럼 공개할 필요없는 HTML을 두는 것은 주의하자.


### @PostConstruct란?

종속성 주입이 완료된 후 싫행되어야 하는 메서드에 사용된다.

- 왜 쓰는가?
1. 생성자가 호출되는 시점에 빈은 초기화 되어있지 않다.

이때 의존성 주입이 끝나고 실행됨이 보장됨으로 빈의 초기화 문제에서 자유롭다.

2. Bean이 여러번 초기화되는걸 방지할 수 있다.

## ThymeLeaf

### 기존의 HTML에 Thymeleaf 문법을 쓰면 어떻게 될까?

기존의 HTML문법은 사라지고, 타임리프 문법만 사용할 수 있게 바뀐다.

```html
<div class="col">
    <button class="btn btn-primary float-end"
            onclick="location.href='addForm.html'"
            th:onclick="|location.href='@{/basic/items/add}|"
            type="button">상품 등록</button>
</div>
```

Thymeleaf는 내추럴 템플릿이라고 불린다.

순수 HTML을 그대로 유지하면서 뷰 템플릿도 사용할 수 있는 타임리프의 특징을 natural templates라고 한다.

만약 HTML을 그냥 킨다고해도 구조가 깨지거나 오류가 발생하지 않고 그대로 켜지기 때문이다.

그냥 html에서는 th같은 문법은 모르니까 그냥 넘기는것이고, 알 수 있는 부분만 렌더링하기 때문이다.

### URL 링크 표현식

@{/basic/items/add}

“@{…}” → URL 링크 표현식이라고 정의한다.

URL 링크 표현식을 사용하면 서블릿 컨텍스트를 자동으로 포함한다. JSP를 굳이 써야할일이 있다면 나중에 배워보자.

- 고급

th:href = “@/basic/items/{itemId}(itemId=${item.id})}”

이렇게 사용하면 링크표현식 내에서 값을 매핑할 수 있다.

→ 최종적으로 “th:href = “@{|/basic/items/${item.id}|}” 이렇게 사용하는게 가장 좋다.

또한, 쿼리 파라미터도 지원한다.

ex) th:href = “@/basic/items/{itemId}(itemId=${item.id}, query=’test’)}”

→ http://localhost:8080/basic/items/1?query=test

### 리터럴 대체 문법

원래 타임리프에서 문자와 표현식은 분리해서 사용해야한다.

ex) <span th:text=”’Welcome to our application, ‘ + ${user.name} + ‘!’”>

다음과 같이 리터럴 대체 문법을 사용하면, 더하기 없이 편리하게 사용할 수 있다.

ex) <span th:text=”Welcome to our application, ${user.name}!|”>
    
### @ModelAttribute란?

기존 코드

```java
@PostMapping("/add")
public String save(@RequestParam String itemName,
                   @RequestParam int price,
                   @RequestParam Integer quantity,
                   Model model){

    Item item = new Item();
    item.setItemName(itemName);
    item.setPrice(price);
    item.setQuantity(quantity);

    itemRepository.save(item);

    model.addAttribute("item",item);
    return "basic/item";

}
```

여기서 만약에 @ModelAttribute를 쓰면, 자동으로 객체를 만들어주고, 초기화까지 자동으로 수행하는데, 파라미터로 들어오는 매개변수도 사용한다.

이때 model.addAttribute()에다가 이름도 자동으로 추가해준다.

즉, 요청파라미터를 처리하고, Model을 추가해서 

```java
@PostMapping("/add")
public String addItem2(@ModelAttribute("item") Item item){

    itemRepository.save(item);

    return "basic/item";

}
```

여기서 만약에 ModelAttribute의 매개변수를 빼줘도 객체명을 소문자로 바꾸어 만들어준다.

```
@PostMapping("/add")
public String addItem2(@ModelAttribute Item item){

    itemRepository.save(item);
    return "basic/item";

}
```
    
### 리다이렉트

스프링에서는 “redirect:/…”로 편리하게 리다이렉트를 지원한다.

컨트롤러에 매핑된 @PathVariable의 값은 redirect에도 사용 가능하다.
    
참고로 HTML Form에는 PUT, PATCH를 지원하지 않는다.

GET, POST만 지원한다.

PUT, PATCH는 오직 HTTP API전송에서만 가능하다.

스프링에서 히든 필드로 PUT, PATCH를 매핑하는 방법은 있지만, 사실상 HTTP POST요청으로 받는다.
