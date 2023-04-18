# RequestDispatcher란?

RequestDispatcher는 클라이언트로부터 최초에 들어온 요청을 JSP/Servlet 내에서 원하는 자원으로 요청을 보내는 역할을 수행하거나, 특정 자원에 처리를 요청하고 처리 결과를 얻어오는 기능을 수행하는 클래스이다.

ex) /a.jsp 로 들어온 요청을 /a.jsp 내에서 RequestDispatcher를 사용하여 b.jsp로 요청을 보낼 수 있다.

또는

a.jsp에서 b.jsp로 처리를 요청하고 b.jsp에서 처리한 결과 내용을 a.jsp의 결과에 포함시킬 수 있다.

왜 HttpServletResponse.sendRedirect()를 사용하지 않고

굳이 RequestDispatcher를 사용하게 되었는가?

![image](https://user-images.githubusercontent.com/70310271/232816939-bad8a664-254d-4737-a46d-26ddec0c0fd6.png)

리다이렉트는 두번의 HTTP 트랜잭션이 발생하기 때문에, 서버측에서는 최초에 받은 요청중에 처리한 내용을 리다이렉트 된 요청 안에서 공유할수 없기 때문이다.

여기서 중요한 점이 나오는데,

리다이렉트 하는 방식은 현재 어플리케이션 이외에 다른 자원의 경로를 요청할 수 있다.

하지만 RequestDispatcher는 서블릿이 속해 있는 웹 어플리케이션 범위 내에서만 요청을 제어할 수 있다.

출처 : https://dololak.tistory.com/502
