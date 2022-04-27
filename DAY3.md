## 웹개발 이해하기


### HTML이란?


웹문서를 구조(Structure)적으로 표현하기 위한 언어


ex) 문, 벽, 전등의 설계도상 위치


### CSS란?


구조적인 문서를 시각적으로 표현(Presentation)하기 위한 언어.


ex) 벽의 색깔과 재질.


### Javascript란?


정적인 웹페이지를 브라우저를 통해 동적으로 상호작용(Interaction) 해주는언어


ex) 전등의 On/Off


## HTML 기초


### HTML의 기본구조와 문법


### 태그란?


<>로 묶인 HTML의 기본구성요소


### 트리구조로 내려간다.


```java
<!DOCTYPE html>
<html>

    <head> <!-- 머리 부분! -->
        <title>Page title</title>
    </head> <!-- 머리 부분! -->

    <body> <!-- 몸통 부분! -->
        <h1> Hello world </h1>
        <div> Contents here
            <span> Here too! </span>
        </div>
    </body> <!-- 머리 부분! -->

</html>
```

### 닫는 태그가 없는경우도 있다.

```java
<img src = "*.png"></img>
<img src = "*.png"> // 뒷 태그에 붙는 img 생략가능
```

이것을 "Self-Tag Closing"라고 한다.


### div는 한줄, span은 크기만큼!
```java
<div>div 태그는 한줄을 차지 합니다.</div>
<div>division 2</div>
<span>span태그는 컨텐츠 크기만큼 공간을 차지 합니다.</span>
<span>span 2</span>
<span>span 3</span>
<div>divisioXn 3</div>
```

![Untitled](https://user-images.githubusercontent.com/70310271/165532256-11120497-901f-4d39-804f-20c8d8b25991.png)


보다시피 div태그는 태그마다 개행되며 아래에 추가되는 반면,

span태그는 옆에 계속해서 추가되어 붙게된다.

```java
<img src ="https://images.unsplash.com/photo-1648737119359-510d4f551382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80"
//이미지 삽입
```

![Untitled 1](https://user-images.githubusercontent.com/70310271/165533183-6fce23c6-d501-4542-9682-eb9d58c496b9.png)


```java
<a href="https://peaceofm1nd.tistory.com/" target="_blank">티스토리</a>
```

target=”_blank”는 기존의 창에서 넘어가는것이 아닌 새 창에 띄우고 싶을때 사용하는 옵션이다.

코드 :

```html
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3 has nested list
        <ul>
	    <li>Item 3-1</li>
        </ul>
    </li>
</ul>
```
결과 :

![Untitled 2](https://user-images.githubusercontent.com/70310271/165533202-c591527d-740c-4fcb-bdc2-3e794f618b16.png)


코드 :

```html
<ol>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3 has nested list
        <ol>
            <li>Item 3-1</li>
        </il>
    </li>
</ol>
```
결과 :

![Untitled 3](https://user-images.githubusercontent.com/70310271/165533230-d2df20f0-8bd2-47b0-8e88-5cda53f393d7.png)


코드 :

```html
<body>
    <div>
         ID : <input type="text" placeholder="type here">
    </div>
    <div>
         PASSWORD : <input type="password" placeholder="type here">
    </div>
    <div>
        <input type="checkbox" checked> Remember ID
        <input type="checkbox">
    </div>
    <div>
        <input type="radio" name="choice" value="a"> a
        <input type="radio" name="choice" value="b"> b
    </div>

    <textarea></textarea>
    
    <div>
    <button>Submit</button>
    </div>
</body>
```

결과 :

![Untitled 4](https://user-images.githubusercontent.com/70310271/165533260-a8fce7f6-5c7a-4dc7-9922-e3f51c9d714d.png)


### 자주쓰는 input에 대해서 알아보자.

div가 한줄로 개행된다는점을 꼭 이해하고 응용할수 있어야한다.

checkbox의 chcked옵션은 페이지가 시작될때 이미 check된 채로 시작한다.

radio와 checkbox의 차이점

radio는 name을 기준으로 그룹을 지정해주어 여러개중 오직 하나만 선택할 수 있다.

checkbox는 여러개를 선택할 수 있다.

### 구성요소 정의

![Untitled 5](https://user-images.githubusercontent.com/70310271/165533297-cc62d776-e18d-47a9-ad45-fa4235a2f787.png)

[https://www.w3schools.com/html/exercise.asp?filename=exercise_html_attributes1](https://www.w3schools.com/html/exercise.asp?filename=exercise_html_attributes1)

굉장히 도움 많이 되니 필요할때마다 연습하자.

## CSS기초

HTML의 <body>에 해당하는 부분

```html
<body>
    <header>This is the header.</header>
    <div class="container">
      <nav>
        <h4>This is the navigation section.</h4>
        <ul>
          <li>Home</li>
          <li>Mac</li>
          <li>iPhone</li>
          <li>iPad</li>
        </ul>
      </nav>
      <main>
        <h1>This is the main content.</h1>
        <p>...</p>
      </main>
      <aside>
        <h4>This is an aside section.</h4>
        <p>...</p>
      </aside>
    </div>
    <footer>
      <ul>
        <li>개인정보 처리방침</li>
        <li>이용 약관</li>
        <li>법적 고지</li>
      </ul>
    </footer>
  </body>
```

CSS의 body에 해당하는 부분

```css
body{
color : #4a4a4a;
font-size : 20px;
margin : 0;
padding : 0;
background : #fff;
}
```

![Untitled 6](https://user-images.githubusercontent.com/70310271/165533387-6ff96acb-fe12-477d-9acf-5f282a7c3c80.png)


### 텍스트의 가운데 정렬을 하기 위한 속성

text-align : center

### 글자 색을 바꾸기 위한 속성

color

### 배경 색을 바꾸기 위한 속성

background OR background-color

### background 속성과 background-color 속성은 어떻게 다른가?

background옵션은 color 이외의 다른 옵션(color/ image/repeat /attachment /position)을 지정해 사용할 수 있는 반면background-color는 색깔만 지정할 수 있다.

### em의 의미는?

| px | em | percent |
| --- | --- | --- |
| 16px | 1.0000em | 100.00% |

em: 해당 요소(element)의 글꼴 크기를 1em으로 정의한다.

쉽게 기억해서 퍼센트를 조금 더 쉽게 나타낸 단위라고 기억하면 좋다.

### 작성한 CSS를 HTML에 적용하는 방법

```html
<link rel="stylesheet" href="index.css" />
```

`link 태그는 HTML 파일과 다른 파일을 연결하는 목적으로 사용.`

`link 태그의 rel은 연결하고자 하는 것과의 관계를 나타냄.`

예를들어 CSS는 약자그대로 Style Sheet 이므로 rel 속성에 정의된 “stylesheet” 를 초기화시켜주는것.

rel은 relation의 약자로 연결관계를 의미한다.

## ****기본적인 Selector 조작법****

### 첫번째 방법 : 태그에 id를 추가하여 스타일 적용

```html
<!-- HTML CODE -->
<h4> This is the navigation section.</h4>

...
...

<aside>
<h4>This is an aside section.</h4>
</aside>
```

이 방식은 HTML소스코드에 있는 모든 <h4>태그에 적용되므로 밑의 사진처럼 적용된다.

```css
/* CSS CODE */
h4 {
	color : red;
}
```

결과 :
	
![Untitled 7](https://user-images.githubusercontent.com/70310271/165533441-742a68e9-8e6f-4ec8-8613-bfcc9d5bcf67.png)


해결방안 :

```html
<!-- HTML CODE -->
<h4 id="navigation-title"> This is the navigation section.</h4>
```

id를 따로 지정해주고 ‘#‘ Selector를 사용해서 색깔을 따로 지정해준다.

```css
/* CSS CODE */
#navigation-title{
	color : red;
}
```

결과 :

![Untitled 8](https://user-images.githubusercontent.com/70310271/165534143-40dfb36b-bf9e-4295-a38a-47565b00c8b7.png)


### 두번째 방법 : 태그에 class를 추가하여 스타일을 적용

```css
<ul>
  <li class="menu-item">Home</li>
  <li class="menu-item">Mac</li>
  <li class="menu-item">iPhone</li>
  <li class="menu-item">iPad</li>
</ul>
```

```css
.menu-item{
    text-decoration : underline;
}
```

![Untitled 9](https://user-images.githubusercontent.com/70310271/165534177-76b3f0d9-66ff-4bde-91a3-642ee0c79b19.png)


### Id와 class의 차이

Id는 유일하게 하나에만 사용됨.

Class는 여러 곳에 사용이 가능함.

id는 CSS에서는 Selector 앞에 #을 사용함.

Class는 CSS에서는 Selector 앞에 .을 사용함.

### 세번째 방법 : 태그에 여러개의 class를 추가해 하나의 element에 적용하기

```css
<ul>
  <li class="menu-item selected">Home</li>
  <li class="menu-item">Mac</li>
  <li class="menu-item">iPhone</li>
  <li class="menu-item">iPad</li>
</ul>
```

```css
.menu-item{
    text-decoration : underline;
}
```

```css
.selected {
  font-weight: bold;
  color: #009999;
}
```

둘다 적용이 된 채로 들어간다.

![Untitled 10](https://user-images.githubusercontent.com/70310271/165534268-9368e337-8019-404a-b034-cd255e2b6d03.png)


다시 정리하자면,

| id | class |
| --- | --- |
| #으로 선택 | .으로 선택 |
| 한 문서에 단 하나의 요소에만 적용 | 동일한 값을 갖는 요소 많음 |
| 특정 요소에 이름을 붙이는 데 사용 | 스타일의 분류에 사용 |

### 텍스트 꾸미기

```css
.DecorateText{
    color : #155724; /* 글자 색상*/
    background-color: #d4edda; /* 배경 색상 */
    border-color : #c3e6cb; /* 테두리 색상 */
		font-family : "SF Pro KR", "MalgunGothic", "Verdana"; /* 폰트 */
    font-size : 24px /* 절대단위 : px, pt 상대단위: %, em, rem, ch, vw, vh 등 */
    font-weight : /* 굵기 */
		text-decoration : /* 밑줄, 가로줄 */
    letter-spacing : /* 자간 */
    line-height : /* 행간 */
    ...
}
```

글꼴이 없는경우 fallback 글꼴을 지정해둘 수 있다.

### 줄바꿈이 되는 박스 vs 옆으로 붙는 박스

위를 Hello world를 보자, 얘는 전체를 차지하고 있어서 다음에 무언가 나오면 바로 줄바꿈이 되는것임. 얘를 Block level Element 라고 함.
	
![Untitled 11](https://user-images.githubusercontent.com/70310271/165534323-bd5ade5a-cfee-4b8e-9b09-498d20b84a47.png)


밑의 “안녕하세요 생활코딩입니다.”를 보자. 빨간블록에 해당하는 인라인블록인 생활코딩 부분은 바로 다음은 줄바꿈이 되지 않았다. 얘를 Inline(OR inline-block) level Element라고 함.

|  | block | inline-block | inline |
| --- | --- | --- | --- |
| 줄바꿈 여부 | 줄바꿈이 일어남 | 줄바꿈이 일어나지 않음 | 줄바꿈이 일어나지 않음 |
| 기본적으로 갖는 너비(width) | 100% | 글자가 차지하는 만큼 | 글자가 차지하는 만큼 |
| width, height 사용 가능 여부 | 가능 | 가능 | 불가능 |

block 요소의 대표적인 예 : '<div>', '<p>'

Inline 요소의 대표적인 예 : '<span>'

span은 width와 height가 일반적으로 적용되지 않는다.

하지만 display : inline-block 이라는 설정을 해주면, width와 height 설정해 줄 수 있다.

![CSS BOX Model](https://user-images.githubusercontent.com/70310271/165534372-15fe86ce-382c-4ef6-8b32-689c1e106b64.png)

CSS BOX Model

### margin (바깥 여백)

각각의 값은 `시계 방향으로 돈다는것만 기억하자.`

top, right, bottom, left 순서이다.

코드 :
	
```css
p {
    border : 1px solid red;
}
```

결과 :
	
![Untitled 13](https://user-images.githubusercontent.com/70310271/165534483-4cd3b0f1-d4c7-4137-b20e-c6965d8d97e6.png)


코드 :

```css
p{
    border : 1px solid red;
    margin : 10px 20px 30px 40px;
}
```

결과 :
	
![Untitled 14](https://user-images.githubusercontent.com/70310271/165534509-d09ffa15-5c2e-46b7-8b54-7339c179dc44.png)


코드 :
	
```css
p {
    border : 1px solid red;
    margin : 10px 20px; 
}
```
	
결과 :

![Untitled 15](https://user-images.githubusercontent.com/70310271/165534526-cf352027-b439-40c9-ac07-68968724c27a.png)

코드 :

```css
p{
    margin : 10px;
}
```

결과 :
	
![Untitled 16](https://user-images.githubusercontent.com/70310271/165534547-47525c61-79f2-4165-a1e0-e4780f8a40d4.png)

```css
p {
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 30px;
  margin-left: 40px;
}
```

특정해서 속성을 줄수도 있다.


### Padding (안쪽 여백)
	
코드 :

```css
p {
    border : 1px solid red;
}
```

결과 :
	
![Untitled 17](https://user-images.githubusercontent.com/70310271/165534597-5bb0436a-5c91-4954-8b9e-f4a02534d336.png)


코드 :
	
```css
p{
    border : 1px solid red;
    padding : 10px 20px 30px 40px;
}
```

결과 :
	
![Untitled 18](https://user-images.githubusercontent.com/70310271/165534616-c3dae760-a1f9-4602-a8b2-e7d31e0e4a69.png)

코드 :

```css
p {
  height: 40px;
  overflow: auto;
}
```
	
height가 40이여서 Box가 찌그러질때, overflow: auto를 추가해주면, 오른쪽에 스크롤바가 추가되어 내리면서 확인할 수 있게된다.

결과 :
	
![Untitled 19](https://user-images.githubusercontent.com/70310271/165534635-e8792e30-41d0-45a6-a83b-e5fff990de09.png)


![Untitled 20](https://user-images.githubusercontent.com/70310271/165534649-3dafcfe1-b1bd-4c79-9c31-162bc93144f1.png)

코드 :

```css
<div id="container">
    <div id="inner">
    안쪽 box
    </div>
</div>
```
	
결과 :
	

![Untitled 21](https://user-images.githubusercontent.com/70310271/165534688-f513aad3-f8f3-4924-ad45-861780c8b293.png)

![Untitled 22](https://user-images.githubusercontent.com/70310271/165534735-a253395d-1448-4bc9-ad50-d01c54416978.png)

처음 레이아웃 디자인을 할 때 가장 많이 하는 실수가 있다.

박스에 적용할 여백을 고려하지 않고 박스의 크기를 디자인하는 경우인데,

이때, 자동으로 모든 박스에서 여백과 테두리를 포함해주는 크기로 계산해주는 코드가 있다.

앞으로 모든 요소에 이 코드를 추가하도록 한다.’
	
코드 :

```css
*{
    box-sizing : border-box;
}
```

결과 :

	
![Untitled 23](https://user-images.githubusercontent.com/70310271/165534789-8f0c2da0-1fe5-42db-84c5-f9505e8ef758.png)


borderbox 기준으로 계산을 하도록 하자!


	

	
	
비고


### CSS Selector

```
전체 셀렉터 : *{}

Tag 셀렉터 section, h1 {}

ID 셀렉터 #{}

Class 셀렉터 .widget{}
Class 셀렉터 .center{}

Attribute 셀렉터 a[href] {}
Attribute 셀렉터 p[id="only"] {}
Attribute 셀렉터 p[class~="out"] {}
Attribute 셀렉터 p[class|="out"] {}
Attribute 셀렉터 section[id^="sect"] {}
Attribute 셀렉터 div[class$="2"]{}
Attribute 셀렉터 div[class*="w"] {}

후손 셀렉터 header h1 {}

자식 셀렉터 header > p {}

인접 형제 셀렉터 section + p {}

형제 셀렉터 section ~ p {}

가상 클래스 a:link {}
가상 클래스 a:visited {}
가상 클래스 a:hover { }
가상 클래스 a:active { }
가상 클래스 a:focus { }

요소 상태 셀렉터 input:checked + span { }
요소 상태 셀렉터 input:enabled + span { }
요소 상태 셀렉터 input:disabled + span { }

구조 가상 클래스 셀렉터 p:first-child { }
구조 가상 클래스 셀렉터 ul > li:last-child { }
구조 가상 클래스 셀렉터 ul > li:nth-child(2n) { }
구조 가상 클래스 셀렉터 section > p:nth-child(2n+1) { }
구조 가상 클래스 셀렉터 ul > li:first-child { }
구조 가상 클래스 셀렉터 li:last-child { }
구조 가상 클래스 셀렉터 div > div:nth-child(4) { }
구조 가상 클래스 셀렉터 div:nth-last-child(2) { }
구조 가상 클래스 셀렉터 section > p:nth-last-child(2n + 1) { }
구조 가상 클래스 셀렉터 p:first-of-type { }
구조 가상 클래스 셀렉터 div:last-of-type { }
구조 가상 클래스 셀렉터 ul:nth-of-type(2) { }
구조 가상 클래스 셀렉터 p:nth-last-of-type(1) { }

부정 셀렉터 input:not([type="password"]) { }
부정 셀렉터 div:not(:nth-of-type(2)) { }

정합성 확인 셀렉터 input[type="text"]:valid { }
정합성 확인 셀렉터 input[type="text"]:invalid { }
```
