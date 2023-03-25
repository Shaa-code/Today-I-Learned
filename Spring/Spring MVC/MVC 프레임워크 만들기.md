  # MVC 프레임워크 만들기

### 프론트 컨트롤러

항상 비즈니스 로직을 만들때, 공통된 로직들이 있다.

ex) viewPath 설정, forward 실행

이런 공통 로직들을 하나로 모으는것을 프론트 컨트롤러가 수행한다.

프론트 컨트롤러가 없을때는, 클라이언트가 각 서블릿을 호출했다.

이제는 viewPath와 forward를 프론트 컨트롤러가 수행하고, 필요한 서비스로직을 찾아주기만 하면 된다.

어노테이션을 없애도된다.

스프링 웹 MVC는 DispatcherServlet을 핵심으로 돌아가는데 얘도 결국 기능이 많은 서블릿이다.

그리고 이 서블릿이 프론트 컨트롤러 패턴으로 구현되어 있다.

![image](https://user-images.githubusercontent.com/70310271/221359995-29278a97-e489-47b9-b2bd-e01e5be1de7b.png)

초기 구조이다. 매핑정보를 토대로 컨트롤러를 호출한다.

## V2

![image](https://user-images.githubusercontent.com/70310271/221418508-bd80e8b7-d465-41b3-844b-f69f22e584ff.png)

FrontController는 요청하고자 하는 컨트롤러를 getRequestURI()를 통해 호출한다. 이후 서비스를 처리한 후 forward 하고자하는 주소를 넣은체 View를 반환한다. 이제 FrontController에서 render(req,resp)를 호출하면 forward(req,resp)되고 여기서 기억할것은, req에 forward할 주소와, 반환할 Model이 들어있다는 점이다.

## V3(서블릿 종속성 제거, ViewPath → ViewName으로)

![image](https://user-images.githubusercontent.com/70310271/222165687-d4a94415-6967-4756-b7f8-5bbb9350c0f0.png)

서블릿 종속성을 제거하기 위해서, 매번 컨트롤러를 호출할때마다, 새로 paramMap을 만들고 req에 있는 모든 파라미터들을 paramMap에 담는 방식을 사용하기 때문에 앞으로 컨트롤러에서 서블릿을 사용할 필요가 없어진다.

이제는 paramMap을 가지고 비즈니스로직을 작성할 수 있게 되었다.

디테일한 로직을 작성하는 경우에는 메서드로 뽑는것이 좋다.

```java
MyView myView = new MyView("/WEB-INF/views" + viewName + ".jsp");

```

이 부분도 명확히 역할을 알아보기 어려우면, 메서드로 빼주는것이다.

옵션 + 커맨드 + M

### 실제로 언제 오버로딩을 쓰는가?

```java
Object model = mv.getModel().get(viewName); -> X
req.setAttribute(viewName,model); -> X
myView.render(req,resp);
```

render를 하고 싶은데, render를 할때, model을 넣어줘야한다.

이때 기존의 render()가 있는데, 오버라이딩 해주면 좋다.

### 왠만하면 빼서 쓰자.

```java
public void render(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    model.forEach((key, value) -> request.setAttribute(key,value));
//  modelToAttribute(model, request)로 빼주면 가독성이 늘어난다.
    RequestDispatcher dispatcher = request.getRequestDispatcher(viewPath);
    dispatcher.forward(request,response);
}
```

모델을 request에 넣을때 setAttribute를 사용하지만, 템플릿 엔진마다 다르다. (JSP는 setAttribute를 사용)

paramMap은 request를 사용하지 않기 위해서, 미리 requestParameter들을 모두 받아놓기 위해서 만든다.

viewModel은 뷰 파일의 이름만으로 접근하도록 만들고, 모델을 저장해놓기 위해서 사용한다.

viewResolver는 저장한 모델들을, request에 모두 저장하는 역할을 하고 viewPath에 forward하는 역할을 한다.

핵심 아이디어 → 종속성을 제거하기 위해서는 request안에 있는 모든 데이터를 컨트롤러를 호출할때마다 어딘가에 저장해두면 된다.

### V4 - 단순하고 실용적인 컨트롤러

좋은 프레임워크는 아키텍처도 중요하지만 개발자가 개발을 단순하고 편하게 할 수 있는게 더 중요하다.

![image](https://user-images.githubusercontent.com/70310271/227724805-96274813-1b48-470c-9bde-a7dadfc383de.png)

기본적인 구조는 V3와 같지만 대신 컨트롤러가 ModelView를 반환하지 않고 ViewName을 반환한다.

프론트 컨트롤러가 모델은 만들어서 넘겨준다.

인터페이스에 모델 뷰가 없다는게 특징이다.

파라미터 설명 주석 → “/**”하고 엔터치면 바로 쫙 나온다.
