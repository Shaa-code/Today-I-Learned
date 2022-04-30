# DAY5 <br/> <br/>

오늘은 가상의 트위터 게시판를 페어 한 분과 같이 소통하며 구현해 보는 시간을 가졌다.
<br/> <br/>

## 페어 프로그래밍이란?

한명은 코드를 구현해보는쪽(드라이버), 한명은 설명하는쪽(네비게이터)을 맡아 진행하는방식이다.

난 전날밤 페어 프로그래밍이 어떻게 진행될지 궁금하였고 어떤 사람을 만나게 될지 기대되었다.

당일 날이 밝았고 처음 Zoom에 접속하여 페어 프로그래밍을 시작하면서 느꼇지만 구현하는쪽과 설명하는쪽을 결정하라는 말만 들었을뿐이었다.

사실상 주어진 재료와 설명서뿐 그저 1:1 화상 통화인 이 자리에서 진행 능력은 모두 개인재량에 달려있었다.

다행히도 난 조건없이 자유로울때 의사소통 능력과 생산성이 가장 크게 발휘되는 특성이 있다.

### 우선 빠르게 서로의 목표를 확인하고자 하였다.

서로 대화를 천천히 이어 나가보았는데, 페어분이 정말 처음 배우시는분이셔서 내가 도와줄 수 있는 부분이 많았다.

페어분이 처음 배우는 상태이시기 때문에, 난 전체적인 흐름 중에서 현재 만드는부분이 어느 영역에 속하는지 알려주고.

지금 현재의 기능이 무슨 역할을 하는지 큰 생각의 틀을 잡으실수 있도록 도와드려야겠다. 그렇게해서

과정을 따라가는데 어렵지 않도록 느끼도록 만들어드리는것을 목표를 잡았다.

페어분은 그렇게 전체적인 흐름을 잡으면 목표를 달성을 한것이고, 난 내가 몰랐던 부분들과 말하는 방식들을 한번더 되돌아 볼수 있는 시간을 가지는것이다.

### 사용할 도구를 지정해야만 했다.

난 Zoom 화면공유를 통해 1번 화면 코드창 + 2번 화면 그림판(아이패드)를 사용하여 쉽게 생각을 전달하려고 했지만, 상대방의 생각을 실시간으로 전달받기에는 다소 부족함이 있었다.

혹여나 잘못 잡혀있는 개념들을 번갈아가며 잡아주며 서로 실시간으로 소통하는 방식으로 진행하기로 결정한것이다.

코드를 직접 구현하시면서, 모르시는것이 있으면, 어떤 부분을 이해하지 못하고 계신지 계속해서 추론해보며 설명 능력을 늘릴수 있어서 너무 좋았다.

그리하여 어제 배운 내용을 토대로, 서로의 머리속에 추상화된 개념들을 바탕으로 Zoom 화이트보드 좌측 우측에 트위터 게시판 이미지(와이어프레임)을 그려나갔다.
<br/> <br/>

## 난 어떻게 상대방의 실수를 바라볼까?

### 첫번째 실수 : 페어분께서는 \<div class\>를 작성하실때 띄워쓰기를 하지 않으셨다.

![Untitled](https://user-images.githubusercontent.com/70310271/165984514-3a0fbf5b-b706-4b71-8e53-b3b662595ca4.png)

*왜 붙여쓰기를 하실 수 밖에 없으셨을까?*


조금이라도 알고있다면 실수라고 생각할 수 있겠지만, 완전히 처음이라면 실수가 아닐 수 있다. 

실수가 아니라면 이유는 추론해볼만하다..

_“’div’와 ‘class’를 구분하지 못하신것아닐까?”_

_“우선 따라가셔야한다는 압박감에 그냥 코드를 쳐보신게 아닐까?”_

아무튼, div와 class에 대한 개념이 아직 잡혀있지 않으신것같았다.

이후 혹시 “‘div’와 ‘class’의 차이점을 아실까요?” 라고 질문을 드렸더니, 역시!

이 부분을 잘 모른다고 하셔서, DAY2에서 배웠던, HTML 구성요소 부분의 정의의 내용을 처음부터 상세하게 알려드렸다.

![Untitled 1](https://user-images.githubusercontent.com/70310271/165984545-a7918045-0337-485b-b0ff-1307c51e3391.png)

<br/><br/>

페어분께서는 설명을 다 들으시고서는 “설명을 진짜 잘하시네요”라고 해주셔서 뿌듯했다. 😊

### 두번째 실수 : 태그(\<div\>)를 여셨으면 태그(\<\/div\>)를 다시 닫아주셔야되는데 그러지 않으셨다.

![Untitled 2](https://user-images.githubusercontent.com/70310271/165984577-adb0f2c4-051b-4220-bf8f-d5b6fc778153.png)

*왜 태그를 닫지 않을 수 밖에 없으셨을까?*

이 또한 HTML구성요소에 대한 이해가 부족해서라고 바로 추론 할 수 있었다.

위에서 HTML구성요소에 대해서 설명했기에 충분히 해결하실수 있을것이라고 판단했다.

하지만, 계속해서 질문하며 짚어드렸지만 이해를 못하고 계시는게 느껴졌다.

무언가, 한 단계 더 나아간 문제가 있었다.

내가 상대방의 인지과정과 추론과정중에 어떤 과정을 놓치고 있는걸까?

![Untitled 3](https://user-images.githubusercontent.com/70310271/165984598-12a23b86-4c2f-4182-8114-2a68fcf3ae73.png)

그렇게 고민에 빠져서 그림을 그려서 하나하나 짚어가며 설명해드리던 찰나에,

페어분께서는 _‘아..!’_ 하시며 문제에 대한 답을 들려주셨다.

```css
페어 : 이 태그가 영역을 만들어준다는건 알았는데, 음..

페어 : 태그의 앞부분만 적으면 영역이 생성되는 것인줄 알았어요!
```

`“태그의 닫음이 어떤 역할을 하는지에 대해서는 구체적인 설명이 없었다는것”`을 페어분을 통해서 알게되었다.

페어분께서는 내게 앞으로 한 구성요소에 대해 배울때 조금 더 세부적인 요소들의 의미를 한번 더 생각해보는 틀을 만들어 주신것이다.

그래서 정말 감사했다.

이후로도 습관을 만들어 드리기 위하여 태그를 닫는 순간부터 영역이 생기는 상상을 하시라고 페어가 진행되는 시간 동안 생각날때마다 계속 말해드렸다.

또한 많이 아는건 아니지만 내가 생각하고 있는 좋은 코드 습관들을 한번쯤 생각해보실 수 있게 설명드렸다.

<br>
<br>

## 한번쯤 생각해볼만한 좋은 습관들.


### 첫번째 습관 : 주석처리로 영역을 가시화하자.

![Untitled 4](https://user-images.githubusercontent.com/70310271/165984638-67c647b4-2237-4778-ba79-4242faaa2558.png)

<br/> <br/>

### 두번째 습관 : 들여쓰기로 영역을 시각화하자.

큰 틀로보면 바깥쪽 크게 한영역, 그리고 안에 한영역으로 즉 2개의 영역으로 나누어 쓴다.

이렇게 들여쓰기로도 영역을 구분하면 눈으로 보기 편하다고 설명 드렸다.

![Untitled 5](https://user-images.githubusercontent.com/70310271/165984671-7ffd8d66-1bc2-4bf7-9b1b-33c8e97d02f6.png)

![Untitled 6](https://user-images.githubusercontent.com/70310271/165984692-1c58af76-a4ab-46b3-9c9e-0754345f8274.png)


들여쓰기(Identation)할때, 탭쓰는게 좋나요?, 스페이스바 쓰는게 좋나요?

이외에도 id, class 중에 무엇을 언제쓰는지 잘 구분이 안가는데 어떻게 하면 좋을까요?

질문에 답을 하면서 서로 만들어나가다 보니, 시간이 너무 빨리 지나갔고 너무 보람찬 하루였다.

<br/> <br/>

코드 :

```html
<!--HTML CODE-->
<!DOCTYPE html>
<html lang="en">
  <head>

    <meta charset="utf-8" />
    <title>twittler</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" type="text/css" media="screen" href="main.css" />

  </head>

  <body>
    
    <!-- 전체적인 틀을 의미합니다 -->
    <div class = "outframe"> 
      
      <!-- 제목을 담당하는 부분입니다! -->
      <div id="greeting">Twittler</div>

      <!-- 글을 쓰는(Write)부분입니다! -->
      <div class = "component1">

        <div class = "Username">Username</div>
        <input id="usernameInput" type="text"></input>

        <div class = "Massage">Message</div>
        <textarea id ="messageInput"></textarea> <!--다른 태그 사용 권장.-->
        
        <div class="white"><button id="tweetButton">Tweet!</button></div>

      </div>

      <div></div>

      <!-- 글을 읽는(Read)부분입니다. -->
      <div class = "component2">

        <div class = "block">
          <button id="randomButton"><!--<span><img src="recycle"></span>-->check new tweet</button>
        </div>

          <!-- Tweet lists -->
        <section id="tweetlist" class="white"></section>
        <script src="script.js"></script>
      </div>
    
    </div>

  </body>

</html>
```

```css
/* CSS */
#greeting {
  font-size: 2em;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-weight: bold;
  border: 2px solid #ccc;
  border-radius: 1em;
  color: white;
  background-color: #eee;
  text-shadow: 0 0 5px #333;
  text-align: center;
  margin: 0.5em;
  padding: 0.5em;
}

.component1 {
  background-color: paleturquoise;
  margin: 1.25em;
  padding: 1em;
  border: black;
}

.Username {
  text-shadow: 0 0 5px #333;
  color: white;
}

.Massage {
  color: white;
  text-shadow: 0 0 5px #333;
}

#tweetButtton {
  margin: 1em;
  padding: 1.25em;
}

.component2 {
  background-color: gray;
  margin: 20px;
  border: black;
}

#randomButton {
  margin: 10px;
  padding: 20px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}

.block {
  background-color: powderblue;
}
```

결과 :

![Untitled 7](https://user-images.githubusercontent.com/70310271/165984714-b3301878-150a-4429-b106-ac087ed51e74.png)

우선 주말에 더 보완해서 수정해봐야겠다.
