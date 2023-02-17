# 서블릿,JSP,MVC 패턴

서블릿만을 사용할것이기 때문에, Repository를 Singleton으로 만들어야한다.

싱글톤으로 만들때는 외부에서 호출하지 못하게 private로 생성자를 막아주어 아무나 생성을 할 수 없도록 만들어야한다.

```
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
