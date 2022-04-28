## 배우기 전 알고 있어야할것.


잠깐 기억 을 더듬고 넘어가자.  


### 셀렉터 #이란?

id셀렉터로 css에서 특정아이디에 해당하는 부분을 꾸밀때 사용한다.  


### 셀렉터 .이란?


클래스셀렉터로 css에서 특정클래스에 해당하는 영역을 꾸밀때 사용한다.  

### 절대 단위와 상대 단위


절대 단위란, px처럼 인쇄를하기 위한 용도에 사용하기위한 단위이고

상대 단위란, rem, em가 예시가 될수 있는데, 스마트폰 처럼, 크기에 따라 변환해주어야하는것을 의미한다.

### CSS 박스모델이란?


margin(바깥 여백), border, padding(안쪽 여백), content.

### 박스 측정기준


content-box는 content를 기준으로 width를 설정하는것이고

border-box는 border를 기준으로 width를 설정하는것이다.

여백 때문에, border를 기준으로 width를 설정해야한다.

## Page Layout


![Untitled](https://user-images.githubusercontent.com/70310271/165781024-f59c3771-5e99-4a6d-92b9-a7de440c78b6.png)

직접 VSCode의 모양을 구현해 보자.

![Untitled 1](https://user-images.githubusercontent.com/70310271/165781066-3115e8f2-d3f5-4736-aea3-4005cb6c24e5.png)


우선 직접 구현하기 위해 첫번째로 알아야할 점이 있다.

### 화면을 나누는 방법


수직분할 : 정가운데를 갈라 좌,우로 배치

![Untitled 2](https://user-images.githubusercontent.com/70310271/165781105-fa0f15bf-22e8-4965-abb9-43c0299b8396.png)


수평분할 : 가운데를 갈라 창들을 상,하로 배치

![Untitled 3](https://user-images.githubusercontent.com/70310271/165781123-618fd802-d592-4b28-803a-a1272c249a39.png)


이후에 코드를 직접 구현해보자.


코드 :

```html
<!-- HTML -->
<div id="container"> // <!--container 열고-->

    <div class="component1"> <!--component1 열고-->
        <div class="icon">아이콘 1</div>
        <div class="icon">아이콘 2</div>
        <div class="icon">아이콘 3</div>
    </div> <!--component1 닫기-->

    <div class="component2"> <!--component2 열고-->
        <div class="row h40">영역1</div>
        <div class="row h40">영역2</div>
        <div class="row h20">영역3</div>
    </div> <!--component2 닫기-->

    <div class="component3"> <!--component3 열고-->
        <div class="row h80">영역4</div>
        <div class="row h20">영역5</div>
    </div> <!--component3 닫기-->

</div> // <!--container닫기-->

```

```css
/* CSS CODE */

#container{
    border : 1px solid blue;
    padding : 10px;
}

.component1{
    border : 1px solid red;
}

.component2{
    border : 1px solid green;
}

.component3{
    border : 1px solid purple;
}
```

![Untitled 4](https://user-images.githubusercontent.com/70310271/165781157-380d912d-e8c1-4dd3-8365-58b49dd73880.png)


이렇게 코드를 작성해보면 알겠지만, 사실상 HTML의 구조는 옆으로 가는것이 아니라 계속해서 밑으로만 내려간다.

우리가 원하는 VSCode처럼 만들기 위해서는 옆으로 옮겨주어야 한다.

이때 필요한것이 바로`‘flex’`이다.


### display : flex는 왜 사용하는걸까?

밑으로 내려가는것을 오른쪽으로 보내주기 위해서 사용한다.

다음의 코드를 한번 보자.

코드 :

```html
<!-- HTML -->
<div id="outer">
    <div class="box">box1</div>
    <div class="box">box2</div>
    <div class="box">box3</div>
</div>
```


```css
/* CSS CODE */
#outer{
    /* display : flex 추가전 */
    border : 1px dotted red; 
    padding 10px;
}

.box{
    border : 1px solid green;
    padding : 10px;
}
```


결과 :

![Untitled 5](https://user-images.githubusercontent.com/70310271/165781281-2a148b51-c234-4656-a023-47b5f7e1686b.png)


```css
/* CSS CODE */
#outer{
    display : flex; /* 추가후 */
    border : 1px dotted red;
    padding 10px;
}

.box{
    border : 1px solid green;
    padding : 10px;
}
```


![Untitled 6](https://user-images.githubusercontent.com/70310271/165781305-358e2b46-dba6-4a48-b56b-178bcf3b74e0.png)



### flex - grow의 비율 전환에 대해

느낌으로 이해하기가 어려우므로 영상을 참고하는것이 좋다.

[https://youtu.be/pgFyqS4oCIc?t=135](https://youtu.be/pgFyqS4oCIc?t=135) → 한번에 이해할 수 있을것이다.

flex - grow의 전환 비율의 직관이 바로 느껴지지 않아 1시간동안 찾아다니며 붙잡고 있었다...

코드 :


```html
<!-- HTML CODE -->
<div id="outer">
    <div class="box">1</div>
    <div class="box target">2</div>
    <div class="box">3</div>
    <div class="box">4</div>
    <div class="box">5</div>
</div>
```

```css
/* CSS CODE */
#outer {
    display: flex;
    border: 1px dotted red;
    padding: 10px;
  }
  
.box {
  border: 1px solid white;
  background-color: tomato;
  color : white;
  padding: 10px;
  flex : 1 1 auto;
}

.target {
  flex: 2 1 auto;
}
```


![Untitled 7](https://user-images.githubusercontent.com/70310271/165781341-44d5c9c8-7dab-4293-882d-dc0c59c6801d.png)


이 사진을 예로 들면, 

box[1,3,4,5]는 “난 1칸 짜리로 차지할거야.”

target[2]은 “난 2칸 짜리로 차지할거야”

그에 맞게 빨간 테두리 네모칸의 비중에 맞게 설정될 뿐인것이다.

### .box셀렉터의 grow가 0이 되면 어떻게 될까?

target은 혼자서 모든 자리를 차지하게 되는것이다.

코드 :

```css
/* CSS CODE */
#outer {
    display: flex;
    border: 1px dotted red;
    padding: 10px;
  }
  
.box {
  border: 1px solid white;
  background-color: tomato;
  color : white;
  padding: 10px;
  flex : 0 1 auto;
}

.target {
  flex: 3 1 auto;
}
```


결과 :

![Untitled 8](https://user-images.githubusercontent.com/70310271/165781366-b4bc51b3-51c2-46a2-808c-95a5244dd03b.png)


### .target셀렉터의 grow가 0이되면 어떻게 될까?

target은 사라지고 box들끼리 모든 자리를 차지하게 되는것이다.

코드 : 

```css
/* CSS CODE */
#outer {
    display: flex;
    border: 1px dotted red;
    padding: 10px;
  }
  
.box {
  border: 1px solid white;
  background-color: tomato;
  color : white;
  padding: 10px;
  flex : 3 1 auto;
}

.target {
  flex: 0 1 auto;
}
```

결과 :


![Untitled 9](https://user-images.githubusercontent.com/70310271/165781398-9caca038-0a85-44f8-9204-94405d711f63.png)


즉, flex-grow란 부모박스(전체) 중에 서로 차지하는 비율을 결정하는 것이다.

### flex-shirnk

flex-shirnk : 0; → 브라우저(Internet Explorer 또는 Chrome)를 커서로 당겨서 창을 줄여도 전혀 영향을 받지 않는다.

flex-shirnk : 1; → 브라우저(Internet Explorer 또는 Chrome)를 커서로 당겨서 창을 줄이면, 비율에 따라서 영향을 받아 줄어든다.

### flex-basis

`브라우저(Internet Explorer 또는 Chrome)를 커서로 당겨서 줄여도 크기내로 설정한 크기만큼 줄여지지 않는다.`

flex-basis : 300px; → 300px 이하로 줄어들지 않음.

코드 :


```html
<!--HTML CODE -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href ="vscode.css">
    <title>Document</title>

</head>
<body>
<div id = "container">
    <div class ="section1">
        <div class="icon">아이콘1</div>
        <div class="icon">아이콘2</div>
        <div class="icon">아이콘3</div>
    </div>

    <div class ="section2">
        <div class="module1">영역1</div>
        <div class="module1">영역2</div>
        <div class="module2">영역3</div>
    </div>

    <div class ="section3">
        <div class ="module3">영역4</div>
        <div class ="module4">영역5</div>
    </div>
</div>
</body>
</html>
```

```css
/*CSS CODE*/
:root{
    --line : 1.5px solid red; /* 바깥 경계선은 모두 빨간색이라 변수로 고정 */
    --hei : 600px; /* 높이는 고정이라 변수로 고정 */
}

#container{
    margin : 5px;
    display : flex;
}

.section1{
    
    flex-direction : column;
    display : flex;
    width : 10%;
    padding : 10px;
    border : var(--line);
    height : var(--hei);
    margin : 1px;
}

.section2{

    flex-direction : column;
    display : flex;
    width : 20%;
    border : var(--line);
    height : var(--hei);
    margin : 1px;
}

.section3{

    flex-direction : column;
    display : flex;
    width : 70%;
    border : var(--line);
    height : var(--hei);
    margin : 1px;
}

.icon{
    border : 1px solid orange;
    margin : 10px;
}

.module1{
    margin : 10px;
    border : 1px solid blue;
    flex-grow : 1
}

.module2{
    margin : 10px;
    border : 1px solid blue;
    height : 20%;
}

.module3{
    margin : 10px;
    border : 1px solid blue;
    flex-grow : 1
}

.module4{
    margin : 10px;
    border : 1px solid blue;
    height : 20%;
}

* {
    box-sizing: border-box;
  }
  
body {
    margin: 0;
    padding: 0;
}
```

결과 :

![Untitled 10](https://user-images.githubusercontent.com/70310271/165781439-0a9d9736-416e-4af6-ac6b-0b7647b27243.png)


### 레이아웃이란?

시각적 효과와 사용 목적을 고려하여 구성 배열하는 일, 또는 그 기술


### 와이어프레임이란?

웹이나 앱을 개발할때 레이아웃의 뼈대를 그리는 단계를 와이어 프레임이라고 한다.

와이어 프레임은 아주 단순하게 레이아웃과 제품의 구조를 보여주는 용도이다.


### 목업 (Mock-up)이란?

목업의 정의 : 실물 크기의 모형

실제 제품이 작동하는 모습과 동일하게 HTML문서와 CSS를 작성하는것.


### 웹 앱 태그 구조 잡기

1. 큰틀에서 영역을 나누자.

맨 위에서 VSCode를 나누었던것처럼, 큰 틀의 영역을 나누어 보자.

구체적으로는 시각적인 측면만 생각해볼수도 있고, 기능적인 측면을 생각해볼 수도 있다.

1. 태그 단위로 쪼개어 보자.

평소, 웹사이트를 둘러보면서 이 사이트는 어떻게 디자인되어 있는지를 계속 생각해보면서 태그 단위로 나누어보자.

클래스는 <li class=”comment”> → li.comment 처럼

아이디는 <div id = “writing-section”> → div#witing-section 처럼.

생각해보는 습관을 가지면 실력이 굉장히 빨리 늘것이다.

그리고, 정답확인은 브라우저에서 Ctrl + Shift + C 로 찍어보자.

    
ex) 네이버 댓글창

![Untitled 11](https://user-images.githubusercontent.com/70310271/165781494-c8ec9f3f-8627-4bb0-8f9e-f4969cd3012f.png)

```css
<div>
    <span><button>순공감순</button><button>최신순</button><button>공감비율순</button></span>
    <input type="text" placeholder="클린봇이 악성댓글을 감지합니다."><span><button>설정</button></span>
</div>
```
