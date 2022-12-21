# Debuging

![Untitled](https://user-images.githubusercontent.com/70310271/195103904-23a6c536-ad34-4f61-aea6-adf81d629b21.png)

![디버깅0](https://user-images.githubusercontent.com/70310271/195103592-716515bb-ed86-49c0-b1d9-74169307150b.jpg)

프로젝트를 진행하면서 서버와 로그인 부분을 담당하며 그에 대한 지식이 많이 늘게되었다.

하지만 특정 기술스택 보다도 가장 많이 활용한 기술은 디버깅이라고 생각한다.

매번 오류가 발생할 때 마다, 각 행들에 BreakPoint를 걸고 값이 들어가는지, 비어있는지를 확인하면서 오류가 발생한 원인들을 찾아나갔다.

특히 Spring Security 에서 인증 처리를 할 때 많은 오류들이 발생했는데, Security 내부 로직들을 한줄 씩 타고 들어가면서 결국 로그인 구현을 하는데 큰 도움을 준 디버깅 기능 세가지를 알아보자.

### 첫번째 기능 Resume

![디버깅 1](https://user-images.githubusercontent.com/70310271/195103625-0a28c311-ad4a-4f47-94e4-ea91c7975906.jpg)

![디버깅2](https://user-images.githubusercontent.com/70310271/195103651-fe57afc5-1373-4692-add9-5b4371dedaa5.jpg)

Resume의 기능은 다음 Break Point 까지 이동하는데

아래 화면에 가장 왼쪽에 보이는 빨간점이 BreakPoint에 해당한다.

눌러보면 첫번째로 보이는 BreakPoint에서, 다음 BreakPoint까지 모든 코드가 작동하는것을 확인할 수 있다..

이 기능은 전반적으로 코드가 잘 작동하는지 확인하는 용도로 사용할 수 있다.

![디버깅 1](https://user-images.githubusercontent.com/70310271/195103670-ec8f1f33-93db-468b-a99b-ed0e712a2531.jpg)

![디버깅4](https://user-images.githubusercontent.com/70310271/195104252-8bf29abc-ff2b-4a7c-abf1-1196bcddba6f.png)

### 두번째 기능 Step Over

아래 화면을 보면 첫번째 BreakPoint에서 바로 다음 라인으로 이동하는걸 확인할 수 있다.

이 기능은 변수에 원하는 값이 잘 들어가는지 확인하는 용도로 사용할 수 있었다.

![디버깅 1](https://user-images.githubusercontent.com/70310271/195103732-71e0f9b3-cb1c-462d-bc9d-412d3be82163.jpg)

![디버깅6](https://user-images.githubusercontent.com/70310271/195104350-6c015b08-4e55-4dc9-8267-7452f15d10a5.png)

### 세번째 기능은 Step Into

Step Into는 현재 Break된 라인에서 현재 실행하고 있는 메소드로 이동한다.

이 기능은 한 메서드가 어떤 방식으로 작동하는지 자세히 알아보고 싶을때 사용할 수 있었다.

기초적이긴 하지만 조금만 알고 있어도 정말 큰 도움을 받을 수 있다.
