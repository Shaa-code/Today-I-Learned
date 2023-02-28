# 서블릿,JSP,MVC 패턴

### 싱글톤

서블릿만을 사용할것이기 때문에, Repository를 Singleton으로 만들어야한다.

싱글톤으로 만들때는 외부에서 호출하지 못하게 private로 생성자를 막아주어 아무나 생성을 할 수 없도록 만들어야한다.

```java
public class Singleton {

    private static Singleton instance = new Singleton();

    private Singleton() {
        // 생성자는 외부에서 호출못하게 private 으로 지정해야 한다.
    }

    public static Singleton getInstance() {
        return instance;
    }

}
```

### 서블릿을 활용한 코드

```java
@WebServlet(name = "memberSaveServlet", urlPatterns = "/servlet/members/save")
public class MemberSaveServlet extends HttpServlet {

    private MemberRepository memberRepository = MemberRepository.getInstance();

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String username = req.getParameter("username");
        int age = Integer.parseInt(req.getParameter("age"));

        Member member = new Member(username, age);
        memberRepository.save(member);
        resp.setContentType("text/html");
        resp.setCharacterEncoding("utf-8");
        PrintWriter w = resp.getWriter();
        w.write("<html>\n" +
                "<head>\n" +
                " <meta charset=\"UTF-8\">\n" + "</head>\n" +
                "<body>\n" +
                "성공\n" +
                "<ul>\n" +
                "    <li>id="+member.getId()+"</li>\n" +
                "    <li>username="+member.getUsername()+"</li>\n" +
                " <li>age="+member.getAge()+"</li>\n" + "</ul>\n" +
                "<a href=\"/index.html\">메인</a>\n" + "</body>\n" +
                "</html>");
    }
}
```

서블릿을 활용한 코드는 정적 HTML과 다르게, member.getId()처럼 동적으로 데이터를 받을 수 있게 된다는점이 다르다.

이런 방식은 자바코드에 HTML을 넣는방식이라 굉장히 코드를 입력하기도 보기도 힘들다. 특히 디버깅은 거의 불가능한 수준이다.

그래서 차라리, HTML문서에 동적으로 변경해야하는 부분만 자바코드를 넣도록 만들려는 시도가 템플릿 엔진이 나온 이유이다.

템플릿 엔진에는 JSP, Thymeleaf, Freemaker, Velocity등이 있다.

### JSP

JSP는 성능과 기능면에서 다른 템플릿 엔진과의 경쟁에서 밀리면서, 점점 사장되어가는 추세이다.

```java
<%@ page import="hello.servlet.domain.member.MemberRepository" %>
```

자바의 import문과 일치한다.

“<% ~ %>” → 자바 코드 입력할 수 있음

“<%= ~~ %> → 자바 코드 출력할 수 있음.

```java
<%@ page import="java.util.List" %>
<%@ page import="hello.servlet.domain.member.MemberRepository" %>
<%@ page import="hello.servlet.domain.member.Member" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
    MemberRepository memberRepository = MemberRepository.getInstance();
    List<Member> members = memberRepository.findAll();
%>

<html>
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    
    <body>
        <a href="/index.html">메인</a>
        <table>
            <thead>
                <th>id</th>
                <th>username</th>
                <th>age</th>
            </thead>
    
            <tbody>
            <%
            for (Member member : members) {
                out.write("    <tr>");
                out.write("    <td>" + member.getId() + "</td>");
                out.write("    <td>" + member.getUsername() + "</td>");
                out.write("    <td>" + member.getAge() + "</td>");
            }
            %>
            </tbody>
        </table>
    </body>
</html>
```

JSP코드도 비즈니스 로직 코드가 JSP에 있어야하고 뷰에 해당하는 부분도 같이 나타낸다. → 지저분하고 복잡하다.

서블릿보다는 나은거 같긴한데, 여전히 굉장히 지저분하다.

그래서 MVC 패턴이 만들어지게 된다.

### MVC패턴

하나의 서블릿 또는 JSP로 처리하던 시각적 영역과 비즈니스 로직 영역을,

Controller과 View 라는 영역으로 역할을 서로 나눈것이다.

MVC모델이란,

Controller에서 비즈니스 로직을 처리한후 Model에 데이터를 전달한다.

View는 또 Model에 있는 데이터를 참조해서 값을 반영한다.

Controller는 HTTP 요청을 받아서 파라미터를 검증하고, 비즈니스 로직을 실행한다. 그리고 View에 전달할 결과 데이터를 조회해서 Model에 담는다.

Model은 View에 출력할 데이터를 담아둔다. 그래서 View가 필요한 데이터를 모두 모델에 담아서 전달해주기 때문에 View는 화면을 렌더링하는 일에 집중할 수 있다.

View는 모델에 담겨있는 데이터를 사용해서 화면을 그리는 일에 집중한다.

꼭 HTML 말고도 XML , Excel같은 파일로 만들수도 있지만 가장 많이 사용하는건 HTML이다.

### Model은 어떻게 다루는가?

서블릿을 컨트롤러로 사용하고, JSP를 뷰로 사용해서 MVC패턴을 적용한다.

Model은 HttpServletRequest 객체를 사용한다.

request는 내부에 데이터 자장소를 가지고 있는데,

request.setAttribute(), request.getAttribute()를 사용하면 데이터를 보관하고 조회할 수 있다.

### HTML에서 Form을 사용할때 주의할점

```java
<form action="save" method="post"> //상대경로이다. 현재 폴더에서 ./save로 이동한다.
<form action="/save" method="post"> //절대경로이다. /save로 이동한다.
```

보통은 절대경로로 설정한다.

### WEB-INF와 일반 디렉토리의 차이

일반 디렉토리에 담겨있는 jsp는”localhost:8080/jsp/members/new-form.jsp”를 호출하면 불러와진다.

즉, 외부에서 자원에 접근할 수 있다.

WEB-INF안에 있는 파일들은 서버에서만 호출할 수 있고 외부(ex : 브라우저)에서는 호출할 수 없다.

![image](https://user-images.githubusercontent.com/70310271/219955282-5975c4f1-f24c-4e14-bd6e-b37722aa2eb0.png)

경로에는 존재하지만 보다시피 404에러가 난다.

WEB-INF는 “webapp/WEB-INF”의 경로를 사용한다.

### redirect와 forward의 차이

redirect는 실제 클라이언트(웹 브라우저)에 응답이 나갔다가 302면, 클라이언트가 redirect 경로로 다시 요청한다.

따라서 클라이언트가 인지할 수 있고, URL 경로도 실제로 변경된다.

웹브라우저 서버로 호출이 2번 된다

![image](https://user-images.githubusercontent.com/70310271/220139339-ea1e387e-9fcf-4b48-bf88-a8a4da7d46d0.png)

![image](https://user-images.githubusercontent.com/70310271/220139556-57546fe8-a4e0-48bd-a63c-f1db07a2b35b.png)

“forward”는 클라이언트가 서버에 요청을 하면 서버 내부에서 호출이 일어나 처리해 URL을 반환하기 때문에 클라이언트가 전혀 인지할 수 없다.

### JSP에서 request와

```java
<ul>
    <li>id=<%=((Member)req.getAttribute("member")).getId()%></li>
    <li>username=<%=((Member)req.getAttribute("member")).getUsername()%></li>
    <li>age=<%=((Member)req.getAttribute("member")).getAge()%></li>
</ul>
```

위 코드는 작동하지 않는다.

Controller에서는 변수명을 req,resp라고 사용해도 상관없지만 jsp에서는 그렇게 사용할 수 없다.

```java
<%@ page import="hello.servlet.domain.member.Member" %> //import 필수

...

<ul>
    <li>id=<%=((Member)request.getAttribute("member")).getId()%></li>
    <li>username=<%=((Member)request.getAttribute("member")).getUsername()%></li>
    <li>age=<%=((Member)request.getAttribute("member")).getAge()%></li>
</ul>
```

첫줄처럼 import를 해와야함은 물론이고 이렇게 반드시 request라고 적어줘야만 작동한다.

JSP에서 저런식으로 받아올수도 있지만, Model에 내용을 바로 받아오는 표현식인 “${}”을 사용하면 훨씬 간단하다.

원리는 req에서 getAttribute()를 하는 과정과 같다.
